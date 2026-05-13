# e-kurs.com OYS API Contract

Bu sözleşme öğretmen panelinin Roster, Live Hub, Diagnostic Arena, SmartScore, Skill Plans, Awards, Otonom AI Asistanı, Recommendations ve Analytics modülleri için hedef backend uçlarını tanımlar.

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

```json
{
  "classId": "2A",
  "studentId": "stu-123",
  "template": "together_review",
  "message": "Bu konuyu birlikte inceleyelim. Önce verilenleri işaretle."
}
```

### Project Question

`POST /api/oys/live-classroom/project-question`

Akıllı tahtaya sınıfta en çok yanlış yapılan soruyu gönderir.

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

```json
{
  "studentId": "stu-123",
  "grade": 6,
  "estimatedMathGradeLevel": 4.3,
  "estimatedTurkishGradeLevel": 5.1,
  "weakSkills": ["MAT.4.1.2", "MAT.5.2.1"],
  "nextBestActions": ["foundation_practice", "teacher_small_group"]
}
```

### Class Map

`GET /api/oys/diagnostic/class-map?classId=2A`

## SmartScore

`POST /api/oys/smart-score/recalculate`

SmartScore sadece doğru sayısından hesaplanmaz. Minimum girişler:

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

Çeldiricilere bilişsel etiket eklenmelidir.

```json
{
  "questionId": "q-778",
  "choices": [
    { "key": "A", "isCorrect": false, "cognitiveTag": "adds_denominators_directly" },
    { "key": "B", "isCorrect": false, "cognitiveTag": "operation_direction_error" },
    { "key": "C", "isCorrect": true, "cognitiveTag": "mastered" }
  ]
}
```

`GET /api/oys/assistant/misconceptions?classId=2A`

Sınıf bazında kök neden uyarısı döndürür.

## Frustration Engine

`POST /api/oys/telemetry/frustration-signal`

Girişler:

- `thinkingSeconds`
- `answerChanges`
- `rapidClicks`
- `eraseCount`
- `consecutiveWrong`
- `activeSeconds`
- `screenSeconds`

Çıkış:

```json
{
  "studentId": "stu-123",
  "state": "burnout_risk",
  "loadScore": 92,
  "teacherMessage": "Derin bir nefes al, biraz ara verelim mi?"
}
```

## AI Grouping

`GET /api/oys/assistant/groups?classId=2A`

K-Means veya benzeri kümeleme çıktısı:

```json
{
  "groups": [
    {
      "name": "Onluk bozma destek grubu",
      "level": "foundation",
      "studentIds": ["stu-123", "stu-128"],
      "recommendedActivity": "15 dakika tahtada onluk bozma tekrarı"
    }
  ]
}
```

## Generative Curriculum

`POST /api/oys/assistant/rewrite-question`

```json
{
  "studentId": "stu-123",
  "interest": "Futbol",
  "skillCode": "MAT.2.2.1",
  "questionSkeleton": "28 kalem + 15 kalem"
}
```

Yanıt, öğretmen onayına sunulmalıdır; doğrudan öğrenciye yayınlanmamalıdır.

## Parent Communication Bot

`GET /api/oys/assistant/parent-message?studentId=stu-123&period=weekly`

AI veli mesajı pozitif, yapıcı ve uygulanabilir ev önerisi içermelidir.

## Recommendations

`GET /api/oys/recommendations?classId=2A`

```json
{
  "items": [
    {
      "studentId": "stu-123",
      "studentName": "Efe D.",
      "skillCode": "MAT.2.3.2",
      "summary": "Onluk bozma adımında kavramsal eksik yaşıyor.",
      "actions": ["Alt seviye 3 alıştırma ata", "Öğretmen ipucu gönder", "Veli notu hazırla"]
    }
  ]
}
```

## Analytics

- `GET /api/oys/reports/trouble-spots?classId=2A`
- `GET /api/oys/reports/student-trends?classId=2A&days=30`
- `GET /api/oys/reports/skill-score-alignment?classId=2A`
- `GET /api/oys/reports/skill-score-grid?classId=2A`
- `GET /api/oys/reports/student-details?studentId=stu-123`
- `GET /api/oys/reports/progress-growth?classId=2A`
- `GET /api/oys/reports/growth-tree?classId=2A`

## Skill Plans & MEB Alignment

### MEB Curriculum

`GET /api/oys/curriculum/meb?grade=2&lesson=matematik`

### Pin Skill

`POST /api/oys/skill-plans/pin`

```json
{
  "classId": "2A",
  "skillCode": "MAT.2.3.2",
  "targetType": "class",
  "targetIds": ["2A"],
  "label": "Öğretmeninin Görevi"
}
```

### Textbook Mapping

- `POST /api/oys/textbook-map`
- `GET /api/oys/textbook-map?bookId=book-123`

```json
{
  "bookId": "book-123",
  "publisher": "MEB",
  "grade": 2,
  "lesson": "matematik",
  "unit": "Doğal Sayılar",
  "page": 34,
  "skillCodes": ["MAT.2.1.1", "MAT.2.1.2"]
}
```

## Assignments

`POST /api/oys/assignments`

```json
{
  "targetType": "group",
  "targetIds": ["stu-123", "stu-128"],
  "skillCode": "MAT.2.3.2",
  "title": "Onluk bozarak çıkarma telafi görevi",
  "difficulty": "foundation",
  "questionCount": 3,
  "dueAt": "2026-05-15T18:00:00+03:00"
}
```

## Awards & Certificates

### Class Awards

`GET /api/oys/awards/class?classId=2A`

### Award Rules

`POST /api/oys/awards/rules`

```json
{
  "name": "Toplama Ustası",
  "conditionType": "skill_mastery",
  "skillCode": "MAT.2.2.1",
  "threshold": 85,
  "visibility": "student_and_teacher"
}
```

### Certificates

`POST /api/oys/certificates/mastery.pdf`

### Leaderboard Settings

`PATCH /api/oys/leaderboard/settings`

```json
{
  "classId": "2A",
  "studentVisible": false,
  "teacherVisible": true,
  "sortBy": "weekly_growth"
}
```

## Exports

- `GET /api/oys/exports/class-report.csv?classId=2A`
- `GET /api/oys/exports/parent-report.pdf?studentId=stu-123`
- `POST /api/oys/certificates/mastery.pdf`
