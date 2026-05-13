# e-kurs.com OYS API Contract

Bu sözleşme öğretmen panelinin IXL benzeri Live Hub, Recommendations ve Analytics modülleri için hedef backend uçlarını tanımlar.

## Auth

Tüm uçlar öğretmen JWT/session yetkisi ister. Middleware şu kontrolleri yapmalıdır:

- Öğretmen sadece bağlı olduğu okul ve sınıfları okuyabilir.
- Yönetici okul kapsamındaki tüm sınıfları okuyabilir.
- Öğrenci canlı logları KVKK gereği minimum gerekli alanla döndürülür.

## Live Classroom

### WebSocket

`GET /api/oys/live-classroom?classId=2A`

Event örneği:

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
  "status": "help",
  "createdAt": "2026-05-13T13:00:00+03:00"
}
```

### SSE fallback

`GET /api/oys/live-classroom/events?classId=2A`

Tarayıcı WebSocket açamazsa EventSource ile aynı payload gönderilir.

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
  ],
  "groups": [
    {
      "name": "Onluk bozma destek grubu",
      "skillCode": "MAT.2.3.2",
      "studentIds": ["stu-123", "stu-128"]
    }
  ]
}
```

## Analytics

`GET /api/oys/reports/trouble-spots?classId=2A`

Sınıfın %20+ bölümünün takıldığı soruları listeler.

`GET /api/oys/reports/student-trends?classId=2A&days=30`

Öğrenci bazında hız, doğruluk ve aktif süre trendi döndürür.

`GET /api/oys/reports/skill-score-alignment?classId=2A`

Kazanım bazında SmartScore ortalaması ve Mastery durumunu döndürür.

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
