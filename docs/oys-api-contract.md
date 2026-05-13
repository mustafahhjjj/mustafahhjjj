# e-kurs.com OYS API Contract

Bu sözleşme öğretmen panelinin Live Hub, Otonom AI Asistanı, Recommendations ve Analytics modülleri için hedef backend uçlarını tanımlar.

## Auth

Tüm uçlar öğretmen JWT/session yetkisi ister. Middleware şu kontrolleri yapmalıdır:

- Öğretmen sadece bağlı olduğu okul ve sınıfları okuyabilir.
- Yönetici okul kapsamındaki tüm sınıfları okuyabilir.
- Öğrenci canlı logları KVKK gereği minimum gerekli alanla döndürülür.

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
  "createdAt": "2026-05-13T13:00:00+03:00"
}
```

### SSE fallback

`GET /api/oys/live-classroom/events?classId=2A`

Tarayıcı WebSocket açamazsa EventSource ile aynı payload gönderilir.

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
- `GET /api/oys/reports/growth-tree?classId=2A`

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

## Exports

- `GET /api/oys/exports/class-report.csv?classId=2A`
- `GET /api/oys/exports/parent-report.pdf?studentId=stu-123`
- `POST /api/oys/certificates/mastery.pdf`

## SmartScore Inputs

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
