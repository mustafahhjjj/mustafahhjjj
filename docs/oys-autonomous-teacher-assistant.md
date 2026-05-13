# Otonom Öğretmen Asistanı Stratejisi

Bu strateji, e-kurs.com Öğretmen Paneli'ni IXL benzeri veri panosunun ötesine taşıyıp öğretmen için karar üreten asistana dönüştürür.

## Ana Menü Mimarisi

1. AI Asistan Özeti
2. Canlı Röntgen
3. Müdahale Merkezi
4. Sınıf Gelişim Ağacı
5. Live Hub
6. Öneri Duvarı
7. Beceri Analizi
8. Analytics
9. Çıktılar

## 1. Kavram Yanılgısı Teşhisi

Her çeldiriciye bilişsel etiket atanır. Öğrenci yanlış cevap verdiğinde sistem sadece yanlış şıkkı değil, o şıkkın temsil ettiği düşünme hatasını raporlar.

Örnek çıktı:

> Sınıftaki 5 öğrenci, işlem yaparken basamakları ayırmak yerine doğrudan rakamları eşleştiriyor. Bu öğrenciler için 3 dakikalık mikro-anlatım önerilir.

## 2. Bilişsel ve Duygusal Durum Radarı

Frustration Engine aşağıdaki sinyalleri izler:

- Soruda geçirilen süre
- Cevap değiştirme sayısı
- Silip tekrar yazma sayısı
- Hızlı tıklama oranı
- Üst üste yanlış sayısı
- Aktif çözüm süresi / ekranda kalma süresi

Durumlar:

- Akışta
- Üretken zorlanma
- Tükenmişlik eşiği

## 3. Dinamik Sınıf Gruplama

AI, öğrencileri benzer hata paternlerine göre çalışma gruplarına ayırır.

Örnek:

- İleri düzey grup: proje tabanlı zenginleştirme
- Orta grup: uygulama ve pekiştirme
- Temel grup: 15 dakikalık öğretmenli tekrar

## 4. Müfredat Üreticisi

Soru iskeleti sabit kalır, bağlam öğrencinin ilgisine göre yeniden yazılır. Öğretmen onayı olmadan öğrenciye yayınlanmaz.

Örnek:

- Futbol ilgisi: top, maç, skor bağlamı
- Uzay ilgisi: yıldız, görev, roket bağlamı
- Doğa ilgisi: fidan, bahçe, canlılar bağlamı

## 5. Veli İletişim Köprüsü

AI, teknik veriyi veliye pozitif ve yapıcı dile çevirir.

Mesaj şablonu:

> Sayın Veli, öğrenciniz bu hafta problem çözmede ilerleme gösterdi. Evde şu oyunu oynayarak destekleyebilirsiniz...

## Uygulanan Dosyalar

- `/ogretmen-paneli.html`
- `/css/oys-ai-assistant.css`
- `/js/oys-ai-assistant.js`
- `/docs/oys-api-contract.md`
