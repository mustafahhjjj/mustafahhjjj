// e-kurs.com OYS Live Classroom backend example
// Runtime target: Node.js + Express + ws.
// This is a developer scaffold; wire it to auth, PostgreSQL/MySQL, and Redis/Mongo streams before production.

const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/api/oys/live-classroom' });

app.use(express.json());

function requireTeacher(req, res, next) {
  // TODO: verify session/JWT and class ownership.
  req.teacher = { id: 'teacher-001', schoolId: 'school-001', classIds: ['2A'] };
  next();
}

function computeStatus(event) {
  if (event.consecutiveWrong >= 3) return 'help';
  if (event.idleSeconds >= 180) return 'idle';
  return 'active';
}

function computeSmartScore(previous, event) {
  const difficultyWeight = event.difficulty === 'hard' ? 1.25 : event.difficulty === 'easy' ? 0.75 : 1;
  const gain = event.isCorrect ? Math.ceil((100 - previous) * 0.12 * difficultyWeight) : -Math.ceil(6 * difficultyWeight);
  return Math.max(0, Math.min(100, previous + gain));
}

function detectMistakePattern(event) {
  if (event.consecutiveWrong >= 3 && event.thinkingSeconds > 40) return 'conceptual_gap';
  if (!event.isCorrect && event.thinkingSeconds < 8) return 'attention_error';
  if (!event.isCorrect) return 'procedure_error';
  return 'stable';
}

function normalizeAnswerEvent(raw) {
  const smartScore = computeSmartScore(raw.previousSmartScore || 50, raw);
  const mistakePattern = detectMistakePattern(raw);
  return {
    type: 'student_answered',
    classId: raw.classId,
    studentId: raw.studentId,
    studentName: raw.studentName,
    skillCode: raw.skillCode,
    questionId: raw.questionId,
    questionNo: raw.questionNo,
    isCorrect: Boolean(raw.isCorrect),
    consecutiveWrong: raw.consecutiveWrong || 0,
    thinkingSeconds: raw.thinkingSeconds || 0,
    activeSeconds: raw.activeSeconds || 0,
    screenSeconds: raw.screenSeconds || 0,
    smartScore,
    mistakePattern,
    status: computeStatus({ ...raw, smartScore, mistakePattern }),
    createdAt: new Date().toISOString()
  };
}

function broadcast(classId, payload) {
  const message = JSON.stringify(payload);
  for (const client of wss.clients) {
    if (client.readyState === 1 && client.classId === classId) client.send(message);
  }
}

wss.on('connection', (socket, req) => {
  const url = new URL(req.url, 'http://localhost');
  socket.classId = url.searchParams.get('classId') || '2A';
  socket.send(JSON.stringify({ type: 'connected', classId: socket.classId }));
});

app.post('/api/oys/events/student-answer', requireTeacher, (req, res) => {
  const event = normalizeAnswerEvent(req.body);
  // TODO: write event to Redis Stream or Mongo collection.
  // TODO: update relational student_skill_progress summary asynchronously.
  broadcast(event.classId, event);
  res.status(202).json({ ok: true, event });
});

app.get('/api/oys/recommendations', requireTeacher, (req, res) => {
  res.json({
    items: [
      {
        studentId: 'stu-123',
        studentName: 'Efe D.',
        skillCode: 'MAT.2.3.2',
        summary: 'Onluk bozma adımında kavramsal eksik yaşıyor.',
        actions: ['Alt seviye 3 alıştırma ata', 'Öğretmen ipucu gönder', 'Veli notu hazırla']
      }
    ],
    groups: [
      { name: 'Onluk bozma destek grubu', skillCode: 'MAT.2.3.2', studentIds: ['stu-123', 'stu-128'] }
    ]
  });
});

app.get('/api/oys/reports/trouble-spots', requireTeacher, (req, res) => {
  res.json({
    items: [
      { skillCode: 'MAT.2.3.2', question: '42 - 18 çıkarma problemi', errorRate: 0.58, action: 'Akıllı tahtaya yansıt' },
      { skillCode: 'MAT.2.6.1', question: '2 kare sağ, 1 kare yukarı', errorRate: 0.37, action: 'Yön oyunu ata' }
    ]
  });
});

if (require.main === module) {
  server.listen(process.env.PORT || 3001, () => {
    console.log('OYS Live Classroom example running');
  });
}

module.exports = { app, server, computeSmartScore, detectMistakePattern, normalizeAnswerEvent };
