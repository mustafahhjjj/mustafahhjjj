// e-kurs.com OYS technical services scaffold
// Runtime target: Node.js. Wire these pure functions to Express/Fastify, queues, DB, and provider SDKs in production.

const HEADER_ALIASES = {
  firstName: ['ad', 'adi', 'adı', 'ogrenci_adi', 'öğrenci adı', 'student_name', 'first_name'],
  lastName: ['soyad', 'soyadi', 'soyadı', 'surname', 'last_name'],
  grade: ['sınıf', 'sinif', 'class', 'grade', 'grade_level'],
  branch: ['şube', 'sube', 'branch'],
  parentPhone: ['veli telefonu', 'veli_telefonu', 'telefon', 'parent_phone', 'guardian_phone'],
  parentEmail: ['veli email', 'veli eposta', 'parent_email', 'guardian_email'],
  studentNo: ['okul no', 'öğrenci no', 'ogrenci_no', 'student_no']
};

function normalizeHeader(value) {
  return String(value || '')
    .trim()
    .toLocaleLowerCase('tr-TR')
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ');
}

function buildHeaderMap(headers) {
  const normalized = headers.map(normalizeHeader);
  const map = {};
  for (const [field, aliases] of Object.entries(HEADER_ALIASES)) {
    const index = normalized.findIndex((header) => aliases.includes(header));
    if (index >= 0) map[field] = index;
  }
  return map;
}

function parseRosterRows(headers, rows) {
  const map = buildHeaderMap(headers);
  const required = ['firstName', 'lastName', 'grade', 'branch'];
  const missing = required.filter((field) => map[field] === undefined);
  if (missing.length) return { items: [], errors: [{ row: 0, message: `Eksik sütun: ${missing.join(', ')}` }] };

  const items = [];
  const errors = [];

  rows.forEach((row, rowIndex) => {
    const item = {
      firstName: row[map.firstName],
      lastName: row[map.lastName],
      grade: Number(row[map.grade]),
      branch: row[map.branch],
      parentPhone: map.parentPhone === undefined ? null : row[map.parentPhone],
      parentEmail: map.parentEmail === undefined ? null : row[map.parentEmail],
      studentNo: map.studentNo === undefined ? null : row[map.studentNo]
    };

    if (!item.firstName || !item.lastName || !item.grade || !item.branch) {
      errors.push({ row: rowIndex + 2, message: 'Zorunlu öğrenci alanı eksik', item });
      return;
    }

    items.push(item);
  });

  return { items, errors };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function computeSmartScore(previousScore, event) {
  const previous = clamp(Number(previousScore || 0), 0, 100);
  const difficulty = clamp(Number(event.difficulty || 0.5), 0.1, 1.5);
  const consecutiveCorrect = Number(event.consecutiveCorrect || 0);
  const consecutiveWrong = Number(event.consecutiveWrong || 0);
  const remainingGapFactor = Math.max(0.08, (100 - previous) / 100);
  const difficultyWeight = 0.75 + difficulty;

  if (event.isCorrect) {
    const streakGain = Math.log1p(consecutiveCorrect + 1) * 9;
    const gain = Math.ceil(streakGain * difficultyWeight * remainingGapFactor);
    const next = clamp(previous + gain, 0, 100);
    return { score: next, isMastered: next >= 100, delta: next - previous };
  }

  const frustrationPenalty = event.frustrationStatus === 'frustrated' ? 1.4 : 1;
  const loss = Math.ceil((2 + consecutiveWrong) * difficultyWeight * frustrationPenalty);
  const next = clamp(previous - loss, 0, 100);
  return { score: next, isMastered: false, delta: next - previous };
}

function detectFrustration(recentAnswers, studentSkillAverageSeconds) {
  const lastThree = recentAnswers.slice(-3);
  if (lastThree.length < 3) return { status: 'stable', severity: 'none' };

  const allWrong = lastThree.every((answer) => !answer.isCorrect);
  const avgTime = lastThree.reduce((sum, answer) => sum + Number(answer.timeSpentSeconds || 0), 0) / 3;
  const avgClicks = lastThree.reduce((sum, answer) => sum + Number(answer.clickCount || 0), 0) / 3;
  const avgChanges = lastThree.reduce((sum, answer) => sum + Number(answer.answerChanges || 0), 0) / 3;
  const fastGuess = avgTime < Number(studentSkillAverageSeconds || 1) * 0.2;
  const highClickNoise = avgClicks >= 4 || avgChanges >= 2;

  if (allWrong && fastGuess && highClickNoise) return { status: 'frustrated', severity: 'high' };
  if (allWrong && fastGuess) return { status: 'frustrated', severity: 'medium' };
  if (allWrong) return { status: 'productive_struggle', severity: 'watch' };
  return { status: 'stable', severity: 'none' };
}

async function queueWeeklyWhatsAppReports({ classId, queue, parentReports }) {
  for (const report of parentReports) {
    if (!report.parentPhone || !report.whatsappOptIn) continue;
    await queue.add('weekly_parent_whatsapp', {
      classId,
      studentId: report.studentId,
      phone: report.parentPhone,
      message: report.message
    }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 30000 }
    });
  }
}

async function queueMondayAdminPdf({ schoolId, queue }) {
  await queue.add('monday_admin_pdf', {
    schoolId,
    reportType: 'weekly_school_summary'
  }, {
    attempts: 2,
    backoff: { type: 'fixed', delay: 60000 }
  });
}

function buildParentLlmPrompt(studentSummary) {
  return [
    'Sen e-kurs.com için veli iletişimi yazan pedagojik bir asistansın.',
    'Verileri kaygı yaratmadan, pozitif ve yapıcı dille açıkla.',
    'Tanı koyma. Veliye evde uygulanabilir tek kısa öneri ver.',
    'Mesaj 500 karakteri geçmesin.',
    '',
    `Veri: ${JSON.stringify(studentSummary)}`
  ].join('\n');
}

module.exports = {
  normalizeHeader,
  buildHeaderMap,
  parseRosterRows,
  computeSmartScore,
  detectFrustration,
  queueWeeklyWhatsAppReports,
  queueMondayAdminPdf,
  buildParentLlmPrompt
};
