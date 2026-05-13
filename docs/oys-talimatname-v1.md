# E-KURS.COM Öğretmen Yönetim Sistemi Talimatnamesi v1.0

Bu belge, e-kurs.com ÖYS modüllerinin yazılım, veri, yapay zeka ve arayüz sınırlarını tanımlar.

## 1. Veri Mimarisi

- İlişkisel veriler PostgreSQL veya MySQL üzerinde tutulur: öğrenci, öğretmen, okul, sınıf, abonelik, ödeme, görev ve sertifika kayıtları.
- Akan veri MongoDB veya Redis üzerinde tutulur: soru çözüm olayı, tıklama logu, ekranda bekleme süresi, aktif çözüm süresi, WebSocket canlı sınıf olayları.
- İlişkisel veritabanına saniye bazlı log yazılmaz.

## 2. Cron ve Cache

- Aylık gelişim raporu, sınıf hata ortalaması, müfredat hedef tahmini ve okul geneli trouble spot raporları gece cron ile hesaplanır.
- Öğretmen panelinde ağır sorgu çalıştırılmaz; rapor endpointleri cache üzerinden maksimum 2 saniye içinde cevap verir.
- Canlı sınıf ekranı cache değil WebSocket olay akışı kullanır.

## 3. WebSocket Event Sözleşmesi

Örnek canlı olay:

```json
{
  "type": "student_answered",
  "schoolId": "okul-001",
  "classId": "2A",
  "studentId": "stu-123",
  "skillCode": "MAT.2.3.2",
  "questionNo": 5,
  "answer": "C",
  "isCorrect": false,
  "thinkingSeconds": 46,
  "screenSeconds": 132,
  "activeSeconds": 51,
  "timestamp": "2026-05-13T13:00:00+03:00"
}
```

## 4. SmartScore Engine

- Klasik 100 üzerinden not sistemi yerine kazanım bazlı SmartScore kullanılır.
- Doğru cevaplar logaritmik artış sağlar; seri doğru cevaplar ustalığa yaklaştırır.
- Yanlış cevap sadece puan düşürmez; sistem bir alt seviye soru önerir.
- Her kazanım için hedef SmartScore 100, yani Ustalık seviyesidir.

## 5. Trouble Spots AI

- Aynı alt kazanımda sınıfın %40 veya fazlası hata yaparsa sistem bunu “Sınıf İçi Salgın Hata” olarak etiketler.
- Öğretmen ana sayfasında Crimson Red (#DC143C) kırmızı alarm olarak gösterilir.
- Önerilen aksiyon: telafi görevi atama, alt seviye soru seti, sınıf içi mini tekrar.

## 6. Predictive Analytics

- Öğrencinin test çözme hızı, doğru oranı, aktif süre oranı ve müfredat ilerlemesi analiz edilir.
- Dönem sonu hedefini kaçırma riski olan öğrenci için öğretmene otomatik telafi görevi önerilir.

## 7. UI/UX Codex

- Font: Inter veya Roboto.
- Başlık: 20px bold.
- Veri tablosu: 14px.
- Başarı/Aktif: Emerald Green (#50C878).
- Boşta/Bekliyor: Amber Orange (#FFBF00).
- Yardım gerekiyor: Crimson Red (#DC143C), canlı modülde yanıp sönen efekt.
- Büyük tablolar akordeon yapısına alınır.
- Mobilde tablolar kaydırılabilir/kart benzeri düzene döner.

## 8. Modül Dosyaları

- Öğretmen paneli: `/ogretmen-paneli.html`
- Yönetici paneli: `/yonetici-paneli.html`
- Ortak stil: `/css/oys-panel.css`
- Ortak etkileşim: `/js/oys-panel.js`

## 9. Sonraki Backend Entegrasyonları

- `/api/oys/live-classroom` WebSocket gateway.
- `/api/oys/reports/class-summary` cache rapor endpointi.
- `/api/oys/audit/student/:id` son 30 günlük çözüm günlüğü.
- `/api/oys/assignments/pin-skill` öğretmen görevi atama endpointi.
- `/api/oys/exports/parent-report.pdf` print-ready veli raporu.
- `/api/oys/certificates/mastery.pdf` ustalık sertifikası.
