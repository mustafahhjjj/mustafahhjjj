# e-kurs.com OYS API Contract

Bu sözleşme öğretmen panelinin Roster, Live Hub, Diagnostic Arena, SmartScore, Skill Plans, Awards, Otonom AI Asistanı, Recommendations, Analytics, WhatsApp bildirimleri ve background job modülleri için hedef backend uçlarını tanımlar.

## Auth

Tüm uçlar öğretmen JWT/session yetkisi ister. Middleware şu kontrolleri yapmalıdır:

- Öğretmen sadece bağlı olduğu okul ve sınıfları okuyabilir.
- Yönetici okul kapsamındaki tüm sınıfları okuyabilir.
- Öğrenci canlı logları KVKK gereği minimum gerekli alanla döndürülür.
- Veli bilgileri sadece sınıf öğretmeni, yetkili branş öğretmeni ve okul yöneticisi tarafından görülebilir.

## Roster & Student Management

### CSV Import

`POST /api/oys/roster/import`

```json
{
  "classId": "2A",
  "dryRun": false,
  "rows": [
    {
      "firstName": "Efe",
      "lastName": "D.",
      "studentNo": "102",
      "parentName": "Ayşe D.",
      "parentEmail": "veli@example.com",
      "parentPhone": "+905551112233"
    }
  ]
}
```

Yanıt hatalı satırları yüklemeyi tamamen durdurmadan raporlamalıdır.

### Template

`GET /api/oys/roster/template.csv`

### Student CRUD

- `GET /api/oys/classes/:classId/students`
- `POST /api/oys/students`
- `PATCH /api/oys/students/:studentId`
- `DELETE /api/oys/students/:studentId`

### K-12 Login Cards

- `POST /api/oys/login-cards/generate`
- `GET /api/oys/login-cards.pdf?classId=2A`

```json
{
  "classId": "2A",
  "mode": "qr_and_picture_password",
  "expiresAt": "2026-09-30T23:59:59+03:00"
}
```

### Parent Invite

`POST /api/oys/students/:studentId/parent-invite`

```json
{
  "channel": "sms",
  "phone": "+905551112233",
  "messageTone": "short_positive"
}
```

## Live Classroom

### WebSocket

`GET /api/oys/live-classroom?classId=2A`

```json
{
  "type": "student_answered",
  "classId": "2A",
  "studentId": "stu-123",
  "studentName": "Efe D.",
  "skillCode": "MAT.2.3.2",
  "questionNo": 5,
  "isCorrect": false,
  "consecutiveWrong": 3,
  "smartScore": 42,
  "mistakePattern": "conceptual_gap",
  "cognitiveTag": "place_value_borrowing_error",
  "frustrationState": "burnout_risk",
  "status": "help",
  "activeSeconds": 540,
  "screenSeconds": 1320,
  "createdAt": "2026-05-13T13:00:00+03:00"
}
```

### SSE fallback

`GET /api/oys/live-classroom/events?classId=2A`

Tarayıcı WebSocket açamazsa EventSource ile aynı payload gönderilir.

### Live Messaging

`POST /api/oys/live-classroom/message`

### Project Question

`POST /api/oys/live-classroom/project-question`

## Diagnostic Arena

`POST /api/oys/diagnostic/answer`

```json
{
  "studentId": "stu-123",
  "skillCode": "MAT.2.3.2",
  "questionId": "q-778",
  "difficulty": 0.54,
  "isCorrect": false,
  "thinkingSeconds": 46,
  "answerChanges": 2
}
```

### Student Level

`GET /api/oys/diagnostic/student-level?studentId=stu-123`

### Class Map

`GET /api/oys/diagnostic/class-map?classId=2A`

## SmartScore

`POST /api/oys/smart-score/recalculate`

Minimum girişler:

- `isCorrect`
- `difficulty`
- `consecutiveCorrect`
- `consecutiveWrong`
- `thinkingSeconds`
- `recentAccuracy`
- `skillMasteryHistory`
- `frustrationState`
- `cognitiveTag`

## Cognitive Misconception Diagnosis

`GET /api/oys/assistant/misconceptions?classId=2A`

Çeldiricilere bilişsel etiket eklenmelidir.

## Frustration Engine

`POST /api/oys/telemetry/frustration-signal`

Çıkış:

```json
{
  "studentId": "stu-123",
  "state": "frustrated",
  "severity": "high",
  "loadScore": 92,
  "teacherMessage": "Derin bir nefes al, biraz ara verelim mi?"
}
```

## AI Grouping

`GET /api/oys/assistant/groups?classId=2A`

## Generative Curriculum

`POST /api/oys/assistant/rewrite-question`

## Parent Communication Bot

`GET /api/oys/assistant/parent-message?studentId=stu-123&period=weekly`

AI veli mesajı pozitif, yapıcı ve uygulanabilir ev önerisi içermelidir.

## Recommendations

`GET /api/oys/recommendations?classId=2A`

## Analytics

- `GET /api/oys/reports/trouble-spots?classId=2A`
- `GET /api/oys/reports/student-trends?classId=2A&days=30`
- `GET /api/oys/reports/skill-score-alignment?classId=2A`
- `GET /api/oys/reports/skill-score-grid?classId=2A`
- `GET /api/oys/reports/student-details?studentId=stu-123`
- `GET /api/oys/reports/progress-growth?classId=2A`
- `GET /api/oys/reports/growth-tree?classId=2A`

## Skill Plans & MEB Alignment

- `GET /api/oys/curriculum/meb?grade=2&lesson=matematik`
- `POST /api/oys/skill-plans/pin`
- `POST /api/oys/textbook-map`
- `GET /api/oys/textbook-map?bookId=book-123`

## Assignments

`POST /api/oys/assignments`

## Awards & Certificates

- `GET /api/oys/awards/class?classId=2A`
- `POST /api/oys/awards/rules`
- `POST /api/oys/certificates/mastery.pdf`
- `PATCH /api/oys/leaderboard/settings`

## WhatsApp / Notification Services

### Queue Weekly Parent Reports

`POST /api/oys/notifications/weekly-parent-reports/queue`

```json
{
  "classId": "2A",
  "weekStart": "2026-05-11",
  "provider": "meta_whatsapp",
  "requireTeacherApproval": true
}
```

### Send Teacher Approved Message

`POST /api/oys/notifications/whatsapp/send`

```json
{
  "studentId": "stu-123",
  "parentId": "parent-456",
  "message": "Efe bu hafta problem çözmede çaba gösterdi...",
  "provider": "meta_whatsapp"
}
```

### PDR Alert

`POST /api/oys/notifications/pdr-alert`

```json
{
  "studentId": "stu-123",
  "reason": "frustration_threshold_exceeded",
  "severity": "high",
  "summary": "Son 3 soruda hızlı ve yanlış cevap paterni görüldü."
}
```

## Background Jobs

- `POST /api/oys/jobs/monday-admin-summary/run`
- `POST /api/oys/jobs/friday-parent-whatsapp/run`
- `GET /api/oys/jobs/:jobId/status`

Cron hedefleri:

- Pazartesi 08:00: yönetici PDF raporu ve okul müdürü e-postası.
- Cuma 17:00: haftalık veli WhatsApp kuyruk hazırlığı.
- Anlık: PDR uyarısı ve öğretmen panel bildirimi.

## Exports

- `GET /api/oys/exports/class-report.csv?classId=2A`
- `GET /api/oys/exports/parent-report.pdf?studentId=stu-123`
- `POST /api/oys/certificates/mastery.pdf`
