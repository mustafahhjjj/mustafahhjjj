const defaultThemeBank={
  "Türkçe":["Okuma Anlama","Sözcük ve Anlam","Yazma Becerileri","Dil Bilgisi Temelleri","Metin Türleri"],
  "Türk Dili ve Edebiyatı":["Metin ve Anlam","Edebî Türler","Şiir Bilgisi","Roman ve Hikâye","Yazma ve Sözlü İletişim"],
  "Matematik":["Sayılar ve Nicelikler","İşlemler ve Cebirsel Düşünme","Geometri ve Ölçme","Veri ve Olasılık","Problem Çözme"],
  "Hayat Bilgisi":["Okulumuzda Hayat","Evimizde Hayat","Sağlıklı Hayat","Güvenli Hayat","Doğada Hayat"],
  "Fen Bilimleri":["Bilimsel Süreç","Canlılar ve Yaşam","Madde ve Değişim","Fiziksel Olaylar","Dünya ve Evren"],
  "Sosyal Bilgiler":["Birey ve Toplum","Kültür ve Miras","İnsanlar, Yerler ve Çevreler","Bilim, Teknoloji ve Toplum","Üretim, Dağıtım ve Tüketim"],
  "İngilizce":["Words and Greetings","Classroom Language","Friends and Family","Daily Life","Games and Review"],
  "Din Kültürü ve Ahlak Bilgisi":["Güzel Ahlak","İbadet Bilinci","Peygamberler ve Örnek Davranışlar","Değerlerimiz","Günlük Hayatta Din"],
  "T.C. İnkılap Tarihi ve Atatürkçülük":["Bir Kahraman Doğuyor","Milli Uyanış","Milli Mücadele","Atatürkçülük ve Çağdaşlaşma","Demokratikleşme"],
  "Bilişim Teknolojileri ve Yazılım":["Dijital Vatandaşlık","Bilgisayar Sistemleri","Algoritma","Kodlama Temelleri","Güvenli İnternet"],
  "Görsel Sanatlar":["Görsel İfade","Renk ve Biçim","Sanat Eseri İnceleme","Tasarım","Yaratıcı Üretim"],
  "Müzik":["Ritim","Ses ve Dinleme","Şarkılar","Müzik Kültürü","Yaratıcı Müzik"],
  "Beden Eğitimi ve Oyun":["Temel Hareketler","Oyunlar","Denge ve Koordinasyon","Sağlıklı Yaşam","Takım Çalışması"],
  "Beden Eğitimi ve Spor":["Hareket Becerileri","Spor Kültürü","Takım Oyunları","Sağlıklı Yaşam","Performans Takibi"],
  "İnsan Hakları, Yurttaşlık ve Demokrasi":["Hak ve Sorumluluk","Demokrasi Kültürü","Eşitlik","Katılım","Günlük Yaşamda Yurttaşlık"],
  "Trafik Güvenliği":["Trafik Kuralları","Yaya Güvenliği","Taşıt Güvenliği","Acil Durumlar","Güvenli Yolculuk"],
  "Fizik":["Kuvvet ve Hareket","Enerji","Elektrik","Dalgalar","Modern Fizik Temelleri"],
  "Kimya":["Kimyanın Temel Kanunları","Atom ve Periyodik Sistem","Kimyasal Türler","Karışımlar","Kimya ve Yaşam"],
  "Biyoloji":["Canlıların Yapısı","Hücre","Ekosistem","Kalıtım","İnsan Fizyolojisi"],
  "Tarih":["Tarih Bilimi","İlk ve Orta Çağ","Türk Tarihi","Osmanlı Tarihi","Çağdaş Dünya"],
  "Coğrafya":["Doğa ve İnsan","Harita Bilgisi","İklim ve Yer Şekilleri","Nüfus ve Yerleşme","Çevre ve Toplum"],
  "Felsefe":["Felsefeye Giriş","Bilgi Felsefesi","Ahlak Felsefesi","Varlık Felsefesi","Bilim ve Sanat Felsefesi"],
  "Görsel Sanatlar / Müzik":["Sanat Kültürü","Görsel Üretim","Müzik Kültürü","Yaratıcı İfade","Portfolyo"]
};
const gradeSubjects={
  "1-sinif":["Türkçe","Matematik","Hayat Bilgisi","Görsel Sanatlar","Müzik","Beden Eğitimi ve Oyun"],
  "2-sinif":["Türkçe","Matematik","Hayat Bilgisi","İngilizce","Görsel Sanatlar","Müzik","Beden Eğitimi ve Oyun"],
  "3-sinif":["Türkçe","Matematik","Hayat Bilgisi","Fen Bilimleri","İngilizce","Görsel Sanatlar","Müzik","Beden Eğitimi ve Oyun"],
  "4-sinif":["Türkçe","Matematik","Fen Bilimleri","Sosyal Bilgiler","İngilizce","Din Kültürü ve Ahlak Bilgisi","İnsan Hakları, Yurttaşlık ve Demokrasi","Trafik Güvenliği","Görsel Sanatlar","Müzik","Beden Eğitimi ve Oyun"],
  "5-sinif":["Türkçe","Matematik","Fen Bilimleri","Sosyal Bilgiler","İngilizce","Din Kültürü ve Ahlak Bilgisi","Bilişim Teknolojileri ve Yazılım","Görsel Sanatlar","Müzik","Beden Eğitimi ve Spor"],
  "6-sinif":["Türkçe","Matematik","Fen Bilimleri","Sosyal Bilgiler","İngilizce","Din Kültürü ve Ahlak Bilgisi","Bilişim Teknolojileri ve Yazılım","Görsel Sanatlar","Müzik","Beden Eğitimi ve Spor"],
  "7-sinif":["Türkçe","Matematik","Fen Bilimleri","Sosyal Bilgiler","İngilizce","Din Kültürü ve Ahlak Bilgisi","Görsel Sanatlar","Müzik","Beden Eğitimi ve Spor"],
  "8-sinif":["Türkçe","Matematik","Fen Bilimleri","T.C. İnkılap Tarihi ve Atatürkçülük","İngilizce","Din Kültürü ve Ahlak Bilgisi","Görsel Sanatlar","Müzik","Beden Eğitimi ve Spor"],
  "9-sinif":["Türk Dili ve Edebiyatı","Matematik","Fizik","Kimya","Biyoloji","Tarih","Coğrafya","İngilizce","Din Kültürü ve Ahlak Bilgisi","Beden Eğitimi ve Spor","Görsel Sanatlar / Müzik"],
  "10-sinif":["Türk Dili ve Edebiyatı","Matematik","Fizik","Kimya","Biyoloji","Tarih","Coğrafya","Felsefe","İngilizce","Din Kültürü ve Ahlak Bilgisi","Beden Eğitimi ve Spor","Görsel Sanatlar / Müzik"],
  "11-sinif":["Türk Dili ve Edebiyatı","Matematik","Fizik","Kimya","Biyoloji","Tarih","Coğrafya","Felsefe","İngilizce","Din Kültürü ve Ahlak Bilgisi","Beden Eğitimi ve Spor"],
  "12-sinif":["Türk Dili ve Edebiyatı","Matematik","Fizik","Kimya","Biyoloji","T.C. İnkılap Tarihi ve Atatürkçülük","Coğrafya","Felsefe","İngilizce","Din Kültürü ve Ahlak Bilgisi","Beden Eğitimi ve Spor"]
};
function slugifyTR(text){return text.toLocaleLowerCase('tr-TR').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
function tierOfGrade(grade){return grade<=4?'PRIMARY':grade<=8?'MIDDLE':'HIGH';}
function makeThemes(subject,grade){if(grade===2&&subject==='Matematik'){return[{title:'1. Tema: Sayılar ve Nicelikler (1)',description:'Doğal sayıları tanıma, okuma, yazma ve karşılaştırma çalışmaları.',topics:['Doğal Sayılar','Sayıları Okuma ve Yazma','Basamak Değeri','Sayıları Karşılaştırma','Ritmik Sayma','Sıra Bildiren Sayılar']},{title:'2. Tema: Sayılar ve Nicelikler (2)',description:'Sayı örüntüleri, sıralama, tahmin ve sayı doğrusu.',topics:['Sayı Örüntüleri','Sayıları Sıralama','Tahmin Etme','Yuvarlama','Sayı Doğrusu']},{title:'3. Tema: İşlemlerden Cebirsel Düşünmeye',description:'Toplama, çıkarma, problem ve eşitlik fikri.',topics:['Toplama İşlemi','Eldesiz Toplama','Eldeli Toplama','Çıkarma İşlemi','Onluk Bozarak Çıkarma','Toplama ve Çıkarma Problemleri','İşlem Önceliğine Hazırlık','Eşitlik Fikri']},{title:'4. Tema: Nesnelerin Geometrisi (1)',description:'Geometrik şekiller ve cisimlerle tanışma.',topics:['Geometrik Şekiller','Kare, Dikdörtgen, Üçgen, Çember','Kenar ve Köşe','Geometrik Cisimler','Küp, Kare Prizma, Dikdörtgen Prizma, Silindir, Küre']},{title:'5. Tema: Nesnelerin Geometrisi (2)',description:'Ölçme, zaman ve para problemleri.',topics:['Uzunluk Ölçme','Standart Olmayan Ölçme','Santimetre ve Metre','Zaman Ölçme','Saat Okuma','Para Problemleri']},{title:'6. Tema: Veriye Dayalı Araştırma',description:'Tablo, grafik ve veri yorumlama.',topics:['Veri Toplama','Tablo Oluşturma','Şekil Grafiği','Nesne Grafiği','Grafik Yorumlama']}];}
var base=defaultThemeBank[subject]||['Temel Kavramlar','Konu Bilgisi','Uygulama','Problem Çözme','Ünite Değerlendirme'];return[1,2,3].map(function(no){return{title:no+'. Ünite: '+base[no-1],description:subject+' dersi için MEB uyumlu örnek ünite iskeleti.',topics:base.map(function(t){return t+' '+no;})};});}
const mufredatData={};Object.keys(gradeSubjects).forEach(function(gradeKey){var grade=Number(gradeKey.split('-')[0]);mufredatData[gradeKey]={title:grade+'. Sınıf',tier:tierOfGrade(grade),lessons:{}};gradeSubjects[gradeKey].forEach(function(subject){var slug=slugifyTR(subject);mufredatData[gradeKey].lessons[slug]={title:subject,slug:slug,tier:tierOfGrade(grade),themes:makeThemes(subject,grade)};});});
window.mufredatData=mufredatData;window.slugifyTR=slugifyTR;
