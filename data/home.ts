export type GradeGroup = "İlkokul" | "Ortaokul" | "Lise";

export const route = {
  home: "/",
  learning: "#ogrenme",
  grades: "#siniflar",
  test: "/pages/soru-bankasi.html",
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
  { label: "Sınıflar", href: "#siniflar" },
  { label: "Dersler", href: route.subjects },
  { label: "Beceriler", href: route.skills },
  { label: "Test Çöz", href: route.test },
  { label: "Soru Bankası", href: route.questionBank },
  { label: "Deneme Sınavları", href: route.exams },
  { label: "Ödev Yardımı", href: route.homework },
  { label: "Akıllı Öneriler", href: route.recommendations },
  { label: "Kazanım Planları", href: route.plans },
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
  { icon: "🎓", value: "12", label: "sınıf seviyesi" },
  { icon: "📚", value: "1000+", label: "konu" },
  { icon: "📝", value: "20.000+", label: "soru" },
  { icon: "📅", value: "Günlük", label: "takip" },
  { icon: "👨‍👩‍👧", value: "Veli", label: "raporu" },
  { icon: "👩‍🏫", value: "Öğretmen", label: "analizi" },
  { icon: "🏅", value: "Ödül", label: "sistemi" },
  { icon: "⏱️", value: "Deneme", label: "sınavı" },
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
    name: `${grade}. Sınıf`,
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
  { level: "İlkokul", tone: "from-emerald-50 to-cyan-50", icon: "🌱", subjects: ["Türkçe", "Matematik", "Hayat Bilgisi", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce", "Din Kültürü"] },
  { level: "Ortaokul", tone: "from-sky-50 to-indigo-50", icon: "🚀", subjects: ["Türkçe", "Matematik", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce", "Din Kültürü", "T.C. İnkılap Tarihi"] },
  { level: "Lise", tone: "from-violet-50 to-orange-50", icon: "🎓", subjects: ["Türk Dili ve Edebiyatı", "Matematik", "Geometri", "Fizik", "Kimya", "Biyoloji", "Tarih", "Coğrafya", "Felsefe", "İngilizce", "Din Kültürü"] },
];

export const learningModules = ["Konu anlatımı", "Beceri çalışması", "Test çöz", "Video ders", "Kolay sorular", "Orta sorular", "Zor sorular", "Ünite sınavı", "Deneme sınavı", "Çıkmış sorular", "Günlük tekrar", "Ödev yardımı"];

export const skillSamples = [
  { title: "1. Sınıf Matematik", skills: "350+ beceri", videos: "300+ video", questions: "1200+ soru" },
  { title: "1. Sınıf Türkçe", skills: "220+ beceri", videos: "150+ video", questions: "900+ soru" },
  { title: "5. Sınıf Matematik", skills: "500+ beceri", videos: "350+ video", questions: "2000+ soru" },
  { title: "8. Sınıf Fen Bilimleri", skills: "420+ beceri", videos: "250+ video", questions: "1500+ soru" },
  { title: "12. Sınıf Matematik", skills: "600+ beceri", videos: "400+ video", questions: "2500+ soru" },
];

export const planCards = [
  { title: "Sınıf kazanımları", description: "1-12. sınıf kazanımları ünite ve ders bazında takip edilir.", cta: "Kazanım planlarını aç", href: route.plans },
  { title: "Ders ve ünite planları", description: "Okul ders kitabı uyumlu konu anlatımı, video ve test adımlarını birlikte gör.", cta: "Ünite planı seç", href: route.plans },
  { title: "Sınav hazırlık planı", description: "Yazılı hazırlık, LGS, TYT ve AYT hedeflerini haftalık çalışma akışına bağla.", cta: "Sınav planını başlat", href: route.exams },
];

export const planFeatures = ["Sınıf kazanımları", "Ders kazanımları", "Ünite planları", "Yazılı hazırlık", "LGS hazırlık", "TYT hazırlık", "AYT hazırlık", "Okul ders kitabı uyumlu çalışma"];

export const recommendationBullets = ["Eksik konuyu bulur", "Uygun zorlukta soru önerir", "Günlük hedef verir", "Zayıf kazanımları tekrar ettirir", "Öğrenciye özel çalışma planı oluşturur"];

export const studentPanelItems = ["Günlük hedef", "Çözülen soru", "Doğru oranı", "Eksik konu", "Önerilen çalışma", "Rozetler", "Puan", "Günlük seri", "Liderlik sırası"];
export const parentPanelItems = ["Günlük çözülen soru", "Haftalık başarı grafiği", "Eksik konular", "Öğretmen notları", "Ödev takibi", "Bildirim sistemi", "Çocuğun gelişim raporu"];
export const teacherPanelItems = ["Sınıf listesi", "Öğrenci başarı oranı", "Ödev verme", "Test oluşturma", "Kazanım takibi", "Eksik konu raporu", "Sınıf performans analizi", "Ders bazlı karşılaştırma"];

export const awards = ["Günlük rozet", "Haftalık liderlik", "Okul sıralaması", "Puan sistemi", "Başarı kupası", "Seri takibi", "Arkadaşlarla yarışma"];

export const analyticsCards = ["Başarı yüzdesi", "Ders bazlı ilerleme", "Soru çözme grafiği", "Eksik kazanımlar", "Haftalık gelişim", "Öğretmen raporu", "Veli raporu", "Sınıf karşılaştırması"];

export const examPrep = ["Ünite sınavları", "Yazılı hazırlık", "Deneme sınavları", "LGS hazırlık", "TYT hazırlık", "AYT hazırlık", "Çıkmış sorular", "Performans raporu"];

export const trustMessages = ["Veliler için güvenli kullanım", "Öğretmenler için sınıf takibi", "Türkiye müfredatına uygun içerik", "Öğrenci verileri güvenli", "Başarı hikâyeleri", "Kullanıcı yorumları", "Sık sorulan sorular"];

export const testimonials = [
  { quote: "Günlük hedefler sayesinde düzenli soru çözmeye başladım.", name: "Ece", role: "7. sınıf öğrencisi", initials: "EC" },
  { quote: "Çocuğumun hangi konuda eksik olduğunu artık net görebiliyorum.", name: "Murat D.", role: "Veli", initials: "MD" },
  { quote: "Öğrencilerime ödev vermek ve takip etmek çok kolaylaştı.", name: "Ayşe K.", role: "Matematik öğretmeni", initials: "AK" },
];

export const faqs = [
  { q: "İçerikler Türkiye müfredatına uygun mu?", a: "Evet. Sınıf, ders, ünite ve kazanım yapısı Türkiye K12 programına göre düzenlenir." },
  { q: "Veli çocuğunun ilerlemesini görebilir mi?", a: "Veli panelinde günlük çözülen soru, eksik konular, ödev takibi ve gelişim raporu yer alır." },
  { q: "Öğretmen sınıfına ödev verebilir mi?", a: "Öğretmen panelinde test oluşturma, ödev verme, kazanım takibi ve sınıf analizi bulunur." },
  { q: "Mobilde kullanılabilir mi?", a: "Ana sayfa ve çalışma akışları telefon, tablet ve masaüstü ekranlara uyumlu tasarlanmıştır." },
];

export const footerColumns = [
  { title: "Sınıflar", links: grades.map((grade) => ({ label: grade.name, href: grade.href })) },
  { title: "Ders ve çalışma", links: [{ label: "Dersler", href: route.subjects }, { label: "Beceriler", href: route.skills }, { label: "Soru Bankası", href: route.questionBank }, { label: "Deneme Sınavları", href: route.exams }, { label: "Ödev Yardımı", href: route.homework }] },
  { title: "Platform", links: [{ label: "Akıllı Öneriler", href: route.recommendations }, { label: "Kazanım Planları", href: route.plans }, { label: "Ödüller", href: route.awards }, { label: "Analiz", href: route.analytics }, { label: "Veli Paneli", href: route.parent }, { label: "Öğretmen Paneli", href: route.teacher }] },
  { title: "Kurumsal", links: [{ label: "Hakkımızda", href: "/pages/hakkimizda.html" }, { label: "İletişim", href: "/pages/iletisim.html" }, { label: "Gizlilik Politikası", href: "/pages/gizlilik-politikasi.html" }, { label: "Kullanım Şartları", href: "/pages/kullanim-sartlari.html" }] },
];
