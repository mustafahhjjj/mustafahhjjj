# e-kurs.com Öğretmen Paneli PRD

## Ürün Vizyonu

e-kurs.com Öğretmen Paneli, öğretmene yalnızca rapor gösteren bir ekran değil; sınıfı kuran, canlı derste riskleri fark eden, öğrencinin gerçek seviyesini yorumlayan, MEB kazanımlarına göre görev atayan ve veli iletişimini hızlandıran bir öğretmen operasyon merkezi olmalıdır.

Hedef: IXL benzeri Live Hub, Diagnostic, SmartScore, Recommendation Wall, Analytics, Skill Plans ve Awards özelliklerini Türkiye K12/MEB bağlamına uyarlamak; e-kurs'u sınıf içi pedagojik müdahale aracı haline getirmek.

## Ana Kullanıcılar

- Sınıf öğretmeni: öğrencileri yönetir, ödev verir, canlı dersi izler, veli görüşmesine hazırlanır.
- Branş öğretmeni: kazanım bazlı performansı izler, eksik gruplara hedefli çalışma atar.
- Okul yöneticisi: sınıf/öğretmen/şube düzeyinde genel başarı ve risk raporunu görür.
- Veli: öğretmen tarafından paylaşılan sade raporları okur.

## Başarı Metrikleri

- Öğretmen panel açılış süresi: en fazla 2 saniye.
- Canlı sınıf olayı gecikmesi: en fazla 1 saniye.
- Öğrenci toplu içe aktarma hatası: %1 altında.
- Atanan görev tamamlama görünürlüğü: öğretmen için tek ekranda.
- Kırmızı bayrak müdahale süresi: 30 saniye altında.
- Veli raporu üretme süresi: 5 saniye altında.

## Sol Menü Mimarisi

1. Sınıf ve Öğrenci Yönetimi
2. Canlı Sınıf Merkezi
3. Teşhis ve Akıllı Puan
4. Analitik ve Raporlama
5. Müfredat ve Ders Planlama
6. Ödüller ve Sertifikalar
7. AI Asistan Özeti
8. Müdahale Merkezi
9. Çıktılar

## 1. Sınıf ve Öğrenci Yönetimi

### Amaç

Öğretmenin sınıfı hızlı kurmasını, öğrencileri güvenli biçimde sisteme almasını ve veli bağlantısını tamamlamasını sağlar.

### Özellikler

- Excel/CSV ile toplu öğrenci içe aktarma.
- Manuel öğrenci ekleme ve sınıf/şube taşıma.
- K-12 küçük yaş için resimli şifre üretimi.
- Öğrenci giriş QR kodu oluşturma.
- Yazdırılabilir giriş kartları: ad, sınıf, QR, resimli şifre, kısa yönerge.
- Veli e-posta/telefon alanları.
- Veli davet bağlantısı gönderme.
- Eksik veli bilgisi olan öğrencileri filtreleme.

### Kullanıcı Hikayeleri

- Öğretmen olarak 30 öğrencilik sınıfımı Excel ile tek seferde yüklemek istiyorum.
- Öğretmen olarak 2. sınıf öğrencilerime karmaşık şifre yerine resimli giriş kartı vermek istiyorum.
- Öğretmen olarak veli telefonlarını ekleyip veli panel daveti göndermek istiyorum.

### Kabul Kriterleri

- CSV şablonu indirilebilir olmalı.
- Hatalı satırlar yüklemeyi tamamen durdurmadan raporlanmalı.
- QR kartları A4 baskıya uygun PDF olarak çıkmalı.
- Öğretmen yalnızca kendi sınıfındaki öğrencileri düzenleyebilmeli.

### Veri Alanları

- studentId
- firstName
- lastName
- grade
- classCode
- parentName
- parentEmail
- parentPhone
- loginMode
- picturePasswordHash
- qrToken
- status

## 2. Canlı Sınıf Merkezi

### Amaç

Öğretmen derste veya ödev sırasında tüm öğrencilerin anlık çalışma durumunu görür ve hızlı müdahale eder.

### Özellikler

- Canlı aktivite akışı.
- Hangi öğrenci hangi kazanımda, kaçıncı soruda, kaç saniyedir çalışıyor.
- Durum renkleri:
  - Yeşil: aktif ve iyi ilerliyor.
  - Sarı: üretken zorlanma.
  - Kırmızı: üst üste hata veya yardım ihtiyacı.
  - Gri: 5+ dakika hareketsiz.
- Öğrenci kutucuğuna tıklayınca hızlı detay paneli.
- Öğrenci ekranına pop-up mesaj gönderme.
- Hazır mesaj şablonları:
  - Harika gidiyorsun.
  - Bu soruda önce verilenleri bulalım.
  - Birlikte inceleyelim.
  - Kısa bir mola verelim.
- Akıllı tahtaya en çok yanlış yapılan soruyu yansıtma.

### Teknik Gereksinimler

- WebSocket birincil kanal.
- SSE fallback.
- Öğrenci olayları 1 saniye altında öğretmen ekranına düşmeli.
- Boşta algılama için activeSeconds ve screenSeconds ayrılmalı.

### Kabul Kriterleri

- Öğrenci 3 yanlış üst üste yapınca kutucuk kırmızı yanmalı.
- 5 dakika işlem yoksa gri duruma geçmeli.
- Öğretmen mesaj gönderince öğrenci ekranında modal/popup görünmeli.
- Canlı akış sayfa yenilenmeden güncellenmeli.

## 3. Sürekli Teşhis ve Akıllı Puanlama

### Amaç

Sistem öğrencinin gerçek seviyesini yalnızca doğru/yanlış sayısıyla değil; zorluk, tutarlılık, süre, hata türü ve kazanım geçmişiyle belirler.

### Özellikler

- Diagnostic Arena: öğrenci çalışırken arka planda seviye tahmini güncellenir.
- Adaptif soru zorluğu: doğru yaptıkça zorlaşır, yanlış yaptıkça temel seviyeye döner.
- Öğretmene gerçek seviye göstergesi:
  - Sınıf seviyesi
  - Ders seviyesi
  - Kazanım seviyesi
- SmartScore yerine e-kurs içinde kullanıcıya uygun ad:
  - Öğrenci tarafı: Öğrenme Puanı
  - Öğretmen tarafı: SmartScore / Ustalık Puanı
- 0-100 puan mantığı:
  - 0-39 başlangıç
  - 40-69 gelişiyor
  - 70-84 iyi
  - 85-94 çok iyi
  - 95-100 usta

### Puanlama Girdileri

- isCorrect
- difficulty
- consecutiveCorrect
- consecutiveWrong
- thinkingSeconds
- recentAccuracy
- skillMasteryHistory
- cognitiveTag
- frustrationState

### Kabul Kriterleri

- Aynı kazanımda 3 yanlış yapan öğrenciye daha temel öneri çıkmalı.
- Zor soruyu doğru yapan öğrencinin puanı kolay soruya göre daha fazla artmalı.
- Hızlı rastgele cevaplama puan artışını sınırlamalı.
- Öğretmen öğrencinin sınıf seviyesinden geri/ileri olduğu alanı görebilmeli.

## 4. Kapsamlı Analitik ve Raporlama

### Amaç

Öğretmen ders planı, veli görüşmesi ve sınıf içi tekrar kararlarını veriyle alır.

### Özellikler

- Trouble Spots: sınıfın en çok takıldığı kazanımlar, sorular ve kavram yanılgıları.
- Skill Score Grid: öğrenci x kazanım matrisi.
- Öğrenci detay karnesi:
  - çözülen soru
  - doğru/yanlış
  - aktif çalışma süresi
  - ekranda kalma süresi
  - gelişim grafiği
  - son 30 günlük günlük kayıt
- Progress & Growth:
  - ödev tamamlama yüzdesi
  - kazanım bazlı büyüme
  - sınıf ortalaması
- Rapor dışa aktarma:
  - Excel
  - Veli PDF
  - Yazdırılabilir sınıf raporu

### Kabul Kriterleri

- Trouble Spots öğretmene “derse buradan başla” tavsiyesi vermeli.
- Skill Score Grid mobilde kart görünümüne dönüşmeli.
- Öğrenci detay sayfasında aktif süre ile açık bırakma süresi ayrılmalı.
- Excel ve PDF çıktısı tek tıkla üretilebilmeli.

## 5. Müfredat ve Ders Planlama

### Amaç

MEB kazanımları, öğretmenin haftalık planı ve dijital pratikler tek akışta birleşir.

### Özellikler

- MEB kazanım havuzu.
- Kazanım kodu, sınıf, ders, tema, ünite ve konu eşleştirme.
- Öğretmen kazanımı yıldızlayarak öğrenci paneline sabitleyebilir.
- Skill Plan oluşturma:
  - sınıf geneli
  - grup
  - tek öğrenci
- Ders kitabı eşleştirmesi:
  - yayın adı
  - ünite/bölüm/sayfa
  - karşılık gelen dijital kazanım
- Haftalık ders planı görünümü.
- Otomatik görev önerisi.

### Kabul Kriterleri

- Öğretmen MEB kodu arayarak kazanıma ulaşabilmeli.
- Yıldızlanan kazanım öğrencinin panelinde “Öğretmeninin Görevi” olarak görünmeli.
- Ders kitabı sayfası seçilince ilgili dijital test önerilmeli.
- Aynı görev tekrar atanıyorsa öğretmene uyarı verilmeli.

## 6. Motivasyon ve Ödül Yönetimi

### Amaç

Öğretmen öğrencilerin motivasyonunu yönetebilir, başarıyı görünür kılar ve sınıf içinde olumlu pekiştirme sağlar.

### Özellikler

- Sertifika Merkezi:
  - 1000 soru çözen
  - bir ünitede usta olan
  - 10 günlük seri yapan
  - sınıf içi hedefi tamamlayan
- PDF başarı belgesi:
  - öğrenci adı
  - öğretmen adı
  - okul adı
  - kazanım adı
  - tarih
- Sanal ödül takibi:
  - rozetler
  - yıldızlar
  - sanal koleksiyonlar
  - gizli resim açma
- Leaderboard:
  - öğretmene özel görünüm
  - öğrenciye açık/gizli ayarı
  - rekabeti sevmeyen sınıflar için kapatma

### Kabul Kriterleri

- Öğretmen tek tıkla sertifika yazdırabilmeli.
- Leaderboard gizlilik ayarı sınıf bazında değişebilmeli.
- Ödül koşulları yönetici panelinden tanımlanabilmeli.
- Öğrenci ödülü kazandığında öğretmen panelinde bildirim oluşmalı.

## Backend API Haritası

### Roster

- POST /api/oys/roster/import
- GET /api/oys/roster/template.csv
- POST /api/oys/students
- PATCH /api/oys/students/:studentId
- POST /api/oys/students/:studentId/parent-invite
- POST /api/oys/login-cards/generate
- GET /api/oys/login-cards.pdf?classId=2A

### Live Classroom

- GET /api/oys/live-classroom?classId=2A
- GET /api/oys/live-classroom/events?classId=2A
- POST /api/oys/live-classroom/message
- POST /api/oys/live-classroom/project-question

### Diagnostics

- POST /api/oys/diagnostic/answer
- GET /api/oys/diagnostic/student-level?studentId=stu-123
- GET /api/oys/diagnostic/class-map?classId=2A
- POST /api/oys/smart-score/recalculate

### Analytics

- GET /api/oys/reports/trouble-spots?classId=2A
- GET /api/oys/reports/skill-score-grid?classId=2A
- GET /api/oys/reports/student-details?studentId=stu-123
- GET /api/oys/reports/progress-growth?classId=2A

### Skill Plans

- GET /api/oys/curriculum/meb?grade=2&lesson=matematik
- POST /api/oys/skill-plans
- POST /api/oys/assignments
- POST /api/oys/textbook-map
- GET /api/oys/textbook-map?bookId=book-123

### Awards

- GET /api/oys/awards/class?classId=2A
- POST /api/oys/awards/rules
- POST /api/oys/certificates/mastery.pdf
- PATCH /api/oys/leaderboard/settings

## Veri Modeli Taslağı

### Relational DB

- schools
- classes
- teachers
- students
- parents
- student_parent_links
- curriculum_skills
- textbook_maps
- assignments
- certificates
- award_rules
- student_awards
- leaderboard_settings

### NoSQL / Stream Store

- answer_events
- screen_events
- frustration_signals
- live_classroom_snapshots
- diagnostic_level_history

## Sprint Planı

### Sprint 1: Roster ve Giriş Kartları

- CSV import
- öğrenci CRUD
- veli bilgisi
- QR/resimli şifre kartı
- login card PDF

### Sprint 2: Live Classroom Hub

- WebSocket/SSE altyapısı
- canlı öğrenci grid
- renkli durumlar
- öğretmen mesajı
- boşta algılama

### Sprint 3: Diagnostic Arena ve SmartScore

- adaptif soru zorluğu
- öğrenme puanı algoritması
- gerçek seviye göstergesi
- kazanım bazlı mastery

### Sprint 4: Analytics Dashboard

- Trouble Spots
- Skill Score Grid
- öğrenci detay karnesi
- progress/growth raporu
- Excel/PDF export

### Sprint 5: MEB Skill Plans

- MEB kazanım havuzu
- yıldızlama/pinleme
- ders kitabı eşleştirme
- ödev atama akışı

### Sprint 6: Awards & Certificates

- rozet kural motoru
- sertifika PDF
- leaderboard ayarları
- öğretmen bildirimleri

## Riskler ve Önlemler

- Veri kalabalığı: öğretmen ana ekranında yalnızca en kritik 3 uyarı gösterilmeli.
- KVKK: canlı loglar minimum gerekli alanla tutulmalı; veli raporlarında hassas detay azaltılmalı.
- Rekabet baskısı: leaderboard öğrenciye kapatılabilir olmalı.
- Küçük yaş girişi: şifre yerine QR/resimli giriş öncelikli olmalı.
- Performans: ağır raporlar gece cache/cron ile hazırlanmalı.

## UI Kabul Standardı

- Öğretmen paneli yoğun veri sunsa da ekran tek bakışta okunmalı.
- Sol menü 6 ana operasyon başlığını taşımalı.
- Tablolar mobilde kart görünümüne dönüşmeli.
- Kırmızı yalnızca gerçek müdahale gerektiren durumlarda kullanılmalı.
- Excel/PDF/Sertifika aksiyonları her rapor modülünde ulaşılabilir olmalı.
