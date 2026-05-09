export type GradeGroup = "İlkokul" | "Ortaokul" | "Lise";

export const route = {
  home: "/",
  learning: "#ogrenme",
  grades: "#siniflar",
  subjects: "/pages/dersler.html",
  skills: "/pages/beceriler.html",
  questionBank: "/pages/soru-bankasi.html",
  exams: "/pages/deneme-sinavlari.html",
  homework: "/pages/odev-yardimi.html",
  recommendations: "/pages/akilli-oneriler.html",
  awards: "/pages/oduller.html",
  analytics: "/pages/analiz.html",
  parent: "/pages/veli.html",
  teacher: "/pages/ogretmen.html",
  student: "/pages/ogrenci.html",
  plans: "/pages/kazanim-planlari.html",
};

export const navLinks = [
  { label: "Öğrenme", href: "#ogrenme" },
  { label: "Sınıflar", href: "#siniflar" },
  { label: "Dersler", href: route.subjects },
  { label: "Beceriler", href: route.skills },
  { label: "Soru Bankası", href: route.questionBank },
  { label: "Deneme Sınavları", href: route.exams },
  { label: "Ödev Yardımı", href: route.homework },
  { label: "Akıllı Öneriler", href: route.recommendations },
  { label: "Ödüller", href: route.awards },
  { label: "Analiz", href: route.analytics },
  { label: "Veli", href: route.parent },
  { label: "Öğretmen", href: route.teacher },
];

export const megaMenu = [
  { title: "Sınıf-ders-beceri", items: ["1-4 ilkokul becerileri", "5-8 ortaokul kazanımları", "9-12 lise hazırlığı", "Video dersler"] },
  { title: "Çalışma araçları", items: ["Test çöz", "Ödev yardımı", "Günlük tekrar", "Çıkmış sorular"] },
  { title: "Panel ve rapor", items: ["Öğrenci hedefleri", "Veli raporu", "Öğretmen analizi", "Ödül sistemi"] },
];

export const trustStats = [
  { value: "12", label: "sınıf seviyesi" },
  { value: "18K+", label: "beceri ve kazanım" },
  { value: "120K+", label: "test sorusu" },
  { value: "7/24", label: "dijital öğrenme asistanı" },
];

export const features = [
  { title: "Türkiye K12 yol haritası", description: "1. sınıftan 12. sınıfa kadar sınıf, ders, konu ve beceri akışı net biçimde görünür.", icon: "🧭", href: "#siniflar" },
  { title: "Kişiselleştirilmiş öğrenme", description: "Öğrencinin seviyesine uyum sağlayan sistem, sıradaki doğru çalışmayı önerir.", icon: "🎯", href: route.recommendations },
  { title: "Veli ve öğretmen içgörüleri", description: "Günlük başarı takibi, eksik kazanımlar, ödev durumu ve sınıf analizi tek ekrandadır.", icon: "📊", href: route.analytics },
] as const;

export const gradeTabs: GradeGroup[] = ["İlkokul", "Ortaokul", "Lise"];

export const grades = Array.from({ length: 12 }, (_, i) => {
  const grade = i + 1;
  const group: GradeGroup = grade <= 4 ? "İlkokul" : grade <= 8 ? "Ortaokul" : "Lise";
  const lessons = grade <= 4 ? 7 : grade <= 8 ? 7 : 11;
  return {
    group,
    grade,
    name: `${grade}. sınıf`,
    href: `/pages/sinif-${grade}.html`,
    description:
      group === "İlkokul"
        ? "Temel okuryazarlık, matematik, hayat bilgisi ve günlük tekrarlarla sağlam başlangıç."
        : group === "Ortaokul"
          ? "Kazanım odaklı konu anlatımı, testler, LGS temeli ve düzenli beceri pratiği."
          : "Yazılı, TYT-AYT hazırlığı, ders bazlı ilerleme ve sınav stratejisi.",
    lessons,
    skills: 260 + grade * 34,
    tests: 520 + grade * 115,
    videos: 120 + grade * 24,
  };
});

export const subjectGroups = [
  { level: "İlkokul", subjects: ["Türkçe", "Matematik", "Hayat Bilgisi", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce", "Din Kültürü"] },
  { level: "Ortaokul", subjects: ["Türkçe", "Matematik", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce", "Din Kültürü", "T.C. İnkılap Tarihi"] },
  { level: "Lise", subjects: ["Türk Dili ve Edebiyatı", "Matematik", "Geometri", "Fizik", "Kimya", "Biyoloji", "Tarih", "Coğrafya", "Felsefe", "İngilizce", "Din Kültürü"] },
];

export const learningModules = ["Konu anlatımı", "Beceri çalışması", "Test çöz", "Video ders", "Kolay / orta / zor sorular", "Ünite sınavı", "Deneme sınavı", "Çıkmış sorular", "Günlük tekrar", "Ödev yardımı"];

export const skillSamples = [
  { title: "1. Sınıf Matematik", skills: "350+ beceri", videos: "300+ video", questions: "1200+ soru" },
  { title: "1. Sınıf Türkçe", skills: "220+ beceri", videos: "150+ video", questions: "900+ soru" },
  { title: "5. Sınıf Matematik", skills: "500+ beceri", videos: "350+ video", questions: "2000+ soru" },
  { title: "8. Sınıf Fen Bilimleri", skills: "420+ beceri", videos: "250+ video", questions: "1500+ soru" },
  { title: "12. Sınıf Matematik", skills: "600+ beceri", videos: "400+ video", questions: "2500+ soru" },
];

export const planCards = [
  { title: "MEB kazanımları", description: "Sınıf ve ünite bazında kazanım listeleriyle çalışmayı planla.", cta: "Kazanım planlarını aç", href: route.plans },
  { title: "Ünite planları", description: "Haftalık akış, konu anlatımı, video ve test adımlarını birlikte gör.", cta: "Ünite planı seç", href: route.plans },
  { title: "Yazılı hazırlık", description: "Okul sınavları için kolaydan zora hazırlanmış çalışma setleri.", cta: "Yazılıya hazırlan", href: route.exams },
];

export const recommendationBullets = ["Eksik konuyu bulur", "Uygun zorlukta soru önerir", "Günlük hedef verir", "Zayıf kazanımları tekrar ettirir", "Öğrenciye özel çalışma planı oluşturur"];

export const panelCards = [
  { id: "ogrenci-paneli", eyebrow: "Öğrenci paneli", title: "Bugün ne çalışacağını bilen öğrenci", href: route.student, items: ["Günlük hedef", "Çözülen soru", "Doğru oranı", "Eksik konu", "Rozet", "Puan", "Liderlik sırası"] },
  { id: "veli-paneli", eyebrow: "Veli paneli", title: "Evde gelişimi anlaşılır raporlarla izle", href: route.parent, items: ["Günlük çözülen soru", "Haftalık başarı grafiği", "Eksik konular", "Ödev takibi", "Bildirim", "Gelişim raporu"] },
  { id: "ogretmen-paneli", eyebrow: "Öğretmen paneli", title: "Sınıfın güçlü ve eksik yönlerini gör", href: route.teacher, items: ["Sınıf listesi", "Başarı oranı", "Ödev verme", "Test oluşturma", "Kazanım takibi", "Eksik konu raporu", "Sınıf analizi"] },
];

export const awards = ["Günlük rozet", "Haftalık liderlik", "Okul sıralaması", "Puan sistemi", "Başarı kupası", "Seri takibi", "Arkadaşlarla yarışma"];

export const analyticsCards = ["Başarı yüzdesi", "Ders bazlı ilerleme", "Soru çözme grafiği", "Eksik kazanımlar", "Haftalık gelişim", "Veli raporu", "Öğretmen raporu", "Sınıf karşılaştırması"];

export const examPrep = ["MEB kazanımları", "Ünite planları", "Yazılı hazırlık", "LGS", "TYT", "AYT", "Deneme sınavları", "Çıkmış sorular", "Performans raporu"];

export const testimonials = [
  { quote: "Kızım her gün hedefini görüp kendi hızında ilerliyor; eksik konuları takip etmek çok kolaylaştı.", name: "Murat D.", role: "Veli", initials: "MD" },
  { quote: "Sınıf listesinde hangi kazanımın tekrar edilmesi gerektiğini hızlıca görüyorum.", name: "Ayşe K.", role: "Matematik öğretmeni", initials: "AK" },
  { quote: "Rozetler ve seri takibi ders çalışmayı oyun gibi hissettiriyor.", name: "Ece", role: "7. sınıf öğrencisi", initials: "EC" },
];

export const faqs = [
  { q: "İçerikler Türkiye müfredatına uygun mu?", a: "Evet. Sınıf, ders, ünite ve kazanım yapısı Türkiye K12 programına göre düzenlenir." },
  { q: "Veli çocuğunun ilerlemesini görebilir mi?", a: "Veli panelinde günlük çözülen soru, eksik konular, ödev takibi ve gelişim raporu yer alır." },
  { q: "Öğretmen sınıfına ödev verebilir mi?", a: "Öğretmen panelinde test oluşturma, ödev verme, kazanım takibi ve sınıf analizi bulunur." },
  { q: "Mobilde kullanılabilir mi?", a: "Ana sayfa ve çalışma akışları telefon, tablet ve masaüstü ekranlara uyumlu tasarlanmıştır." },
];

export const footerColumns = [
  { title: "Keşfet", links: [{ label: "Sınıflar", href: "#siniflar" }, { label: "Dersler", href: route.subjects }, { label: "Soru Bankası", href: route.questionBank }, { label: "Deneme Sınavları", href: route.exams }] },
  { title: "Öğrenme", links: [{ label: "Ödev Yardımı", href: route.homework }, { label: "Akıllı Öneriler", href: route.recommendations }, { label: "Ödüller", href: route.awards }, { label: "Analiz", href: route.analytics }] },
  { title: "Paneller", links: [{ label: "Veli Paneli", href: route.parent }, { label: "Öğretmen Paneli", href: route.teacher }, { label: "Hakkımızda", href: "/pages/hakkimizda.html" }, { label: "İletişim", href: "/pages/iletisim.html" }] },
  { title: "Yasal", links: [{ label: "Gizlilik Politikası", href: "/pages/gizlilik-politikasi.html" }, { label: "Kullanım Şartları", href: "/pages/kullanim-sartlari.html" }] },
];
