# E-KURS.COM Öğretmen Yönetim Sistemi Talimatnamesi v1.0

Bu belge, e-kurs.com ÖYS modüllerinin yazılım, veri, yapay zeka ve arayüz sınırlarını tanımlar. Öğretmen panelinin merkezinde IXL benzeri Live Hub, SmartScore, Recommendations ve Analytics akışı bulunur.

## 1. Live Hub / Real-Time Diagnostic

- Öğretmen her öğrenciyi canlı kutucuk olarak görür.
- Kutucukta öğrenci adı, çalıştığı kazanım, soru numarası, üst üste yanlış sayısı ve SmartScore yer alır.
- 3+ aynı kazanım hatasında Crimson Red (#DC143C) kırmızı bayrak yanar.
- Duvar görünümü sınıfın anlık doğru/yanlış oranını ve kırmızı bayrak sayısını gösterir.
- En çok yanlış yapılan soru tek tıkla akıllı tahtaya yansıtılabilir.

## 2. Veri Mimarisi

- İlişkisel veriler PostgreSQL veya MySQL üzerinde tutulur: öğrenci, öğretmen, okul, sınıf, abonelik, ödeme, görev ve sertifika kayıtları.
- Akan veri MongoDB veya Redis üzerinde tutulur: soru çözüm olayı, tıklama logu, ekranda bekleme süresi, aktif çözüm süresi, WebSocket canlı sınıf olayları.
- İlişkisel veritabanına saniye bazlı log yazılmaz.

## 3. Cron ve Cache

- Aylık gelişim raporu, sınıf hata ortalaması, müfredat hedef tahmini ve okul geneli trouble spot raporları gece cron ile hesaplanır.
- Öğretmen panelinde ağır sorgu çalıştırılmaz; rapor endpointleri cache üzerinden maksimum 2 saniye içinde cevap verir.
- Canlı sınıf ekranı cache değil WebSocket olay akışı kullanır.

## 4. WebSocket Event Sözleşmesi

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
  "smartScore": 42,
  "mistakePattern": "conceptual_gap",
  "timestamp": "2026-05-13T13:00:00+03:00"
}
```

## 5. Recommendations

- Sistem her öğrenci için eksik giderme önerisi üretir.
- Örnek: “Öğrenci X onluk bozarak çıkarma adımında kavramsal eksik yaşıyor; alt seviye 3 alıştırma atayın.”
- Benzer hataları yapan öğrenciler otomatik çalışma grubu olarak etiketlenir.
- Öğretmen tek tıkla alıştırma atayabilir veya veli notu hazırlayabilir.

## 6. SmartScore Engine

- Klasik 100 üzerinden not sistemi yerine kazanım bazlı SmartScore kullanılır.
- Doğru cevaplar logaritmik artış sağlar; seri doğru cevaplar ustalığa yaklaştırır.
- Yanlış cevap sadece puan düşürmez; sistem bir alt seviye soru önerir.
- Her kazanım için hedef SmartScore 100, yani Tam Öğrenme seviyesidir.

## 7. Trouble Spots AI

- Aynı alt kazanımda sınıfın %20 veya fazlası takılırsa Trouble Spot raporuna girer.
- %40 ve üzeri hata “Sınıf İçi Salgın Hata” olarak kırmızı alarmdır.
- Rapor en çok yanlış yapılan soruyu, hata yüzdesini ve önerilen aksiyonu gösterir.

## 8. Students Trends ve Skill Score Alignment

- Students Trends son 30 gündeki hız ve doğruluk değişimini gösterir.
- Skill Score Alignment kazanım bazında hangi alanların Mastery seviyesine ulaştığını gösterir.
- Mastery barajı SmartScore 100’dür; 90+ mastery yakını, 50 altı risk olarak izlenir.

## 9. Predictive Analytics

- Öğrencinin test çözme hızı, doğru oranı, aktif süre oranı ve müfredat ilerlemesi analiz edilir.
- Dönem sonu hedefini kaçırma riski olan öğrenci için öğretmene otomatik telafi görevi önerilir.
- AI özeti hata paternini metinle açıklar: işlem hatası, kavramsal eksik, dikkat hatası, aktif süre problemi.

## 10. UI/UX Codex

- Font: Inter veya Roboto.
- Başlık: 20px bold.
- Veri tablosu: 14px.
- Başarı/Aktif: Emerald Green (#50C878).
- Boşta/Bekliyor: Amber Orange (#FFBF00).
- Yardım gerekiyor: Crimson Red (#DC143C), canlı modülde yanıp sönen efekt.
- Büyük tablolar akordeon yapısına alınır.
- Mobilde tablolar kart düzenine döner.

## 11. Modül Dosyaları

- Öğretmen paneli: `/ogretmen-paneli.html`
- Yönetici paneli: `/yonetici-paneli.html`
- Ortak stil: `/css/oys-panel.css`
- Ortak etkileşim: `/js/oys-panel.js`

## 12. Backend Entegrasyonları

- `/api/oys/live-classroom` WebSocket gateway.
- `/api/oys/recommendations/student/:id` kişisel öneri endpointi.
- `/api/oys/groups/similar-errors` otomatik grup endpointi.
- `/api/oys/reports/trouble-spots` cache rapor endpointi.
- `/api/oys/audit/student/:id` son 30 günlük çözüm günlüğü.
- `/api/oys/assignments/pin-skill` öğretmen görevi atama endpointi.
- `/api/oys/exports/parent-report.pdf` print-ready veli raporu.
- `/api/oys/certificates/mastery.pdf` ustalık sertifikası.
