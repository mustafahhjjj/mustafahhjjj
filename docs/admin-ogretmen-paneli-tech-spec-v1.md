# E-KURS.COM Yönetici ve Öğretmen Paneli Teknik Gereksinimleri V1.0

Bu doküman Frontend, Backend ve AI/Data Science ekiplerinin sprint planlarına doğrudan alınabilecek teknik görevleri tanımlar.

## 1. Veritabanı Mimarisi

### Relational Store

Önerilen ana store PostgreSQL'dir. MySQL kullanılacaksa identity, boolean ve JSON alanları uyarlanmalıdır.

Ana tablolar:

- organizations
- schools
- teachers
- classes
- students
- parents
- student_parent_links
- student_login_cards
- curriculum_skills
- questions
- question_choices
- assignments
- student_skill_progress
- textbook_maps
- award_rules
- student_awards
- certificates
- notification_jobs
- cached_reports

### Curriculum Şeması

`curriculum_skills` tablosu MEB uyumu için ana kaynaktır.

Zorunlu alanlar:

- `meb_code`: MEB kazanım kodu. Örnek: `M.8.1.2.1`
- `subject`: ders adı
- `grade_level`: sınıf seviyesi
- `domain`: öğrenme alanı
- `unit`: ünite/tema
- `topic`: konu
- `is_new_generation`: LGS/YKS tarzı yeni nesil işaretleyici
- `mastery_target`: varsayılan 100

### StudentTelemetry Şeması

Saniyelik öğrenci olayları ilişkisel veritabanına yazılmamalıdır. Redis Streams veya MongoDB kullanılmalıdır.

Önerilen event:

```json
{
  "type": "student_answered",
  "student_id": "uuid",
  "question_id": "uuid",
  "skill_code": "M.8.1.2.1",
  "time_spent_seconds": 42,
  "click_count": 5,
  "answer_changes": 2,
  "is_correct": false,
  "difficulty": 0.62,
  "smart_score": 58,
  "cognitive_tag": "place_value_borrowing_error",
  "frustration_status": "frustrated",
  "created_at": "2026-05-13T13:00:00+03:00"
}
```

### Organization Şeması

Kurum ve lisans yönetimi için:

- `school_id`
- `organization_id`
- `total_licenses`
- `used_licenses`
- `e_okul_sync_status`
- `whatsapp_provider`

## 2. Backend Geliştirme Talimatları

### Excel/CSV Parser

Amaç: yöneticilerin e-Okul'dan indirdiği öğrenci listelerini toplu aktarması.

Gereksinimler:

- CSV ve XLSX kabul edilmeli.
- Sütun adları farklı olsa bile eşleştirme yapılmalı.
- Örnek eş anlamlılar:
  - Ad: `ad`, `adı`, `ogrenci_adi`, `student_name`, `first_name`
  - Soyad: `soyad`, `soyadı`, `surname`, `last_name`
  - Sınıf: `sınıf`, `sinif`, `class`, `grade`
  - Şube: `şube`, `sube`, `branch`
  - Veli Telefonu: `veli telefonu`, `telefon`, `parent_phone`
- Dry-run modu olmalı.
- Hatalı satırlar import'u tamamen durdurmamalı.
- Import sonucu şu değerleri döndürmeli:
  - created_count
  - updated_count
  - skipped_count
  - row_errors

Önerilen Node kütüphaneleri:

- `xlsx`
- `csv-parse`
- `zod` veya `yup`

### WebSocket / SignalR

REST API Live Hub için yeterli değildir.

Gereksinimler:

- Node.js tarafında Socket.io veya `ws`.
- .NET tarafında SignalR.
- Öğrenci cevap verdiğinde öğretmen ekranına 1 saniye altında event gitmeli.
- Öğretmen bağlantısı classId bazlı room/channel'a alınmalı.
- Öğrenci eventleri stream store'a yazılmalı.
- SSE fallback sağlanmalı.

### WhatsApp API Entegrasyonu

Desteklenebilir sağlayıcılar:

- Meta WhatsApp Business API
- Twilio
- MessageBird

Gereksinimler:

- Veli opt-in kontrolü zorunlu.
- Rate limit kuyruğu olmalı.
- Başarısız gönderimler retry stratejisiyle tekrar denenmeli.
- Mesaj içeriği AI tarafından üretildikten sonra öğretmen onayı gerektirebilir.
- Haftalık raporlar Cuma 17:00'de kuyruğa alınmalı.

## 3. AI / Data Science Talimatları

### SmartScore Algoritması

Amaç: 0-100 arasında dinamik ustalık puanı üretmek.

Girdiler:

- previous_score
- is_correct
- difficulty
- consecutive_correct
- consecutive_wrong
- thinking_seconds
- recent_accuracy
- cognitive_tag
- frustration_status

Kural:

- Üst üste doğru cevaplarda logaritmik büyüme uygulanır.
- Zor soru doğruysa artış daha yüksek olur.
- Yanlış cevapta düşüş sınırlı olmalı.
- Rastgele işaretleme şüphesinde artış engellenmeli.
- 100 olduğunda `is_mastered = true`.

Örnek pseudo-code:

```text
if is_correct:
  gain = log(1 + consecutive_correct) * difficulty_weight * remaining_gap_factor
else:
  loss = base_loss * difficulty_weight * frustration_penalty
score = clamp(previous_score + gain - loss, 0, 100)
if score >= 100: is_mastered = true
```

### Frustration Engine

Amaç: öğrencinin okumadan rastgele işaretlemeye başladığını veya tükenmişlik eşiğine yaklaştığını tespit etmek.

Kural:

- Son 3 soru yanlış.
- Öğrencinin bu kazanımdaki ortalama çözme süresinin %20'sinden kısa sürede cevaplanmış.
- Click/answer change davranışı artmış.
- Bu durumda `status = frustrated` ve öğretmen panelinde kırmızı bayrak.

Örnek pseudo-code:

```text
recent_wrong = last_3_answers all false
fast_guess = recent_avg_time < student_skill_avg_time * 0.20
high_click_noise = click_count >= 4 or answer_changes >= 2
if recent_wrong and fast_guess:
  status = frustrated
if recent_wrong and fast_guess and high_click_noise:
  severity = high
```

### LLM Veli/PDR Raporları

Kullanım alanları:

- Haftalık veli WhatsApp mesajı.
- PDR uzmanına risk özeti.
- Öğretmene müdahale önerisi.

Prompt standardı:

- Türkçe.
- Kısa.
- Kaygı yükseltmeyen.
- Pozitif ve yapıcı.
- Somut ev önerisi içeren.
- Tıbbi/psikolojik tanı koymayan.

Örnek sistem promptu:

```text
Sen e-kurs.com için veli iletişimi yazan pedagojik bir asistansın.
Verileri kaygı yaratmadan, pozitif ve yapıcı dille açıkla.
Tanı koyma. Veliye evde uygulanabilir tek kısa öneri ver.
Mesaj 500 karakteri geçmesin.
```

## 4. Frontend Geliştirme Talimatları

### Dashboard Görselleri

Kullanılabilir kütüphaneler:

- Chart.js
- Recharts
- ApexCharts

Grafikler:

- Pasta grafik: sınıfın İleri / Yeterli / Riskli dağılımı.
- Isı haritası: öğrenci x MEB kazanımı matrisi.
- Çizgi grafik: öğrenci gelişim trendi.
- Bar grafik: ödev tamamlama oranı.

### Live Hub UI

Gereksinimler:

- Öğrenciler kart olarak görünmeli.
- Kart kenar rengi WebSocket eventine göre değişmeli.
- CSS transition ile yumuşak geçiş olmalı.
- Kırmızı durumlar animasyonlu ama rahatsız etmeyecek şekilde olmalı.
- Kart tıklanınca hızlı detay + mesaj paneli açılmalı.

Durum renkleri:

- Yeşil: iyi ilerliyor.
- Sarı: üretken zorlanma.
- Kırmızı: yardıma ihtiyaç / frustrated.
- Gri: boşta.

### Skill Score Heatmap

- Satır: öğrenci.
- Sütun: MEB kazanımı.
- Hücre: SmartScore.
- Koyu yeşil: mastery.
- Açık yeşil: iyi.
- Sarı/turuncu: gelişiyor.
- Kırmızı: eksik öğrenme.
- Mobilde yatay tablo yerine kart listesi.

### PWA

Öğretmen paneli tablet ve telefonda uygulama gibi çalışmalıdır.

Gereksinimler:

- manifest.json
- service worker
- offline fallback
- app icons
- installable PWA metadata
- canlı veri gerektiren ekranlarda offline uyarısı

## 5. Cron Jobs / Background Tasks

### Pazartesi 08:00

Yönetici özet PDF raporu oluşturulur.

Teknik akış:

1. Gece cache edilmiş rapor verisi okunur.
2. HTML rapor template'i render edilir.
3. Puppeteer ile PDF üretilir.
4. Okul müdürüne e-posta gönderilir.
5. `notification_jobs` kaydı güncellenir.

### Cuma 17:00

Velilere haftalık WhatsApp mesajları sıraya alınır.

Teknik akış:

1. Haftalık öğrenci özetleri alınır.
2. AI mesaj taslağı üretir.
3. Opt-in kontrol edilir.
4. Redis/Bull veya RabbitMQ kuyruğuna eklenir.
5. Provider rate limit'e göre gönderir.

### Anlık PDR Uyarıları

Eşik aşıldığında PDR uzmanının paneline bildirim düşer.

Tetikleyiciler:

- repeated_frustration
- chronic_absence
- severe_drop_in_accuracy
- screen_open_no_work_pattern

## 6. Sprint Dağılımı

### Sprint 1: Veri Temeli ve Import

- Organization schema
- Curriculum schema
- StudentTelemetry stream shape
- CSV/XLSX parser
- e-Okul sütun eşleştirme

### Sprint 2: Live Hub

- WebSocket/SignalR altyapısı
- öğrenci kartları
- renkli durum geçişleri
- canlı mesaj gönderme

### Sprint 3: SmartScore ve Frustration Engine

- puanlama mikroservisi
- frustration eventleri
- kırmızı bayrak sinyali
- PDR uyarı kanalı

### Sprint 4: Analytics ve Heatmap

- Chart dashboard
- skill score matrix
- student detail report
- progress/growth raporu

### Sprint 5: AI Raporlama ve WhatsApp

- LLM prompt katmanı
- veli mesaj taslakları
- WhatsApp provider adapter
- Cuma 17:00 queue

### Sprint 6: PWA ve Yönetici Raporları

- manifest/service worker
- offline fallback
- Pazartesi 08:00 PDF cron
- yönetici e-posta servisi

## 7. Güvenlik ve KVKK

- Öğretmen sadece kendi sınıfını görmeli.
- Veli iletişiminde opt-in şart.
- Telemetry eventleri minimum veriyle tutulmalı.
- PDR uyarıları rol bazlı görünmeli.
- LLM'e gönderilen veriler maskeleme katmanından geçmeli.
- Öğrenci adları gerektiğinde initials formatına indirgenmeli.

## 8. Kabul Kriterleri

- CSV import farklı sütun adlarıyla çalışır.
- Live Hub eventleri sayfa yenilemeden güncellenir.
- Frustration Engine son 3 hızlı yanlışta kırmızı bayrak üretir.
- SmartScore 100 olduğunda mastery işaretlenir.
- Heatmap kazanım bazlı eksik öğrenmeyi gösterir.
- WhatsApp kuyrukları rate limit'e uyar.
- Pazartesi PDF raporu otomatik oluşur.
- Öğretmen paneli PWA olarak kurulabilir.
