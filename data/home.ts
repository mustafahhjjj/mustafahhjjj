export type GradeGroup = "Okul öncesi" | "İlkokul" | "Ortaokul" | "Lise";

export const navLinks = ["Matematik", "Türkçe", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce", "Planlar", "Analiz", "Kaynaklar"];

export const megaMenu = [
  { title: "Dersler", items: ["Matematik", "Türkçe", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce"] },
  { title: "Öğrenme araçları", items: ["Öneriler", "Beceri planları", "Video dersler", "Oyunlar", "Ödüller"] },
  { title: "Öğretmenler için", items: ["Sınıf analizi", "Seviye tespiti", "Standartlara göre plan", "Ödev takibi"] },
];

export const features = [
  {
    title: "Kapsamlı K–12 müfredat",
    description: "İlkokuldan liseye kadar temel derslerde binlerce beceri.",
    tags: ["Matematik", "Türkçe", "Fen", "Sosyal", "İngilizce"],
    variant: "curriculum",
  },
  {
    title: "Her öğrenciye özel yol",
    description: "Öğrencinin performansına göre önerilen beceriler ve çalışma hedefleri.",
    tags: ["Öneriler", "Hedefler", "Uyarlanır"],
    variant: "path",
  },
  {
    title: "Öğretmenler için güçlü analiz",
    description: "Sınıf, öğrenci ve konu bazında anlaşılır ilerleme raporları.",
    tags: ["Rapor", "Sınıf", "Ödev"],
    variant: "analytics",
  },
] as const;

export const gradeTabs: GradeGroup[] = ["Okul öncesi", "İlkokul", "Ortaokul", "Lise"];

export const grades = [
  { group: "Okul öncesi", name: "Okul öncesi", description: "Renkler, sayılar, şekiller, dinleme ve erken okuryazarlık.", skills: { Matematik: 120, Türkçe: 90, Fen: 35, Sosyal: 25 } },
  { group: "İlkokul", name: "1. sınıf", description: "Toplama, çıkarma, ses bilgisi, canlılar ve çevremiz.", skills: { Matematik: 320, Türkçe: 180, Fen: 60, Sosyal: 45 } },
  { group: "İlkokul", name: "2. sınıf", description: "Basamak değeri, akıcı okuma, maddeyi tanıma ve güvenli yaşam.", skills: { Matematik: 340, Türkçe: 195, Fen: 80, Sosyal: 60 } },
  { group: "İlkokul", name: "3. sınıf", description: "Çarpma, bölme, metin türleri, kuvvet ve toplumsal kurallar.", skills: { Matematik: 365, Türkçe: 205, Fen: 105, Sosyal: 85 } },
  { group: "İlkokul", name: "4. sınıf", description: "Kesirler, problem çözme, yazım, dolaşım sistemi ve harita okuma.", skills: { Matematik: 380, Türkçe: 215, Fen: 125, Sosyal: 110 } },
  { group: "Ortaokul", name: "5. sınıf", description: "Doğal sayılar, noktalama, güneş sistemi ve kültürel miras.", skills: { Matematik: 375, Türkçe: 205, Fen: 145, Sosyal: 130 } },
  { group: "Ortaokul", name: "6. sınıf", description: "Oran, yüzdeler, sözcük türleri, hücreler ve dünya tarihi.", skills: { Matematik: 390, Türkçe: 210, Fen: 160, Sosyal: 150 } },
  { group: "Ortaokul", name: "7. sınıf", description: "Rasyonel sayılar, fiiller, kuvvet, enerji ve demokrasi.", skills: { Matematik: 405, Türkçe: 220, Fen: 175, Sosyal: 155 } },
  { group: "Ortaokul", name: "8. sınıf", description: "LGS odaklı cebir, paragraf, DNA, basınç ve inkılap tarihi.", skills: { Matematik: 430, Türkçe: 230, Fen: 190, Sosyal: 170 } },
  { group: "Lise", name: "9. sınıf", description: "Cebir, fonksiyonlar, edebi türler, biyoloji ve tarih.", skills: { Matematik: 360, Türkçe: 150, Biyoloji: 70, Tarih: 80 } },
  { group: "Lise", name: "10. sınıf", description: "Polinomlar, anlatım, kimya temelleri, coğrafya ve modern tarih.", skills: { Matematik: 345, Türkçe: 145, Kimya: 90, Coğrafya: 75 } },
  { group: "Lise", name: "11. sınıf", description: "Trigonometri, deneme, fizik hareketi, felsefe ve ekoloji.", skills: { Matematik: 370, Türkçe: 135, Fizik: 95, Felsefe: 60 } },
  { group: "Lise", name: "12. sınıf", description: "Limit, türev, sınav stratejisi, organik kimya ve çağdaş tarih.", skills: { Matematik: 390, Türkçe: 140, Kimya: 100, Tarih: 85 } },
] satisfies Array<{ group: GradeGroup; name: string; description: string; skills: Record<string, number> }>;

export const subjects = [
  { name: "Matematik", icon: "∑", topics: ["Sayılar", "Kesirler", "Cebir"], count: "3.800+ beceri", color: "from-emerald-400 to-teal-500" },
  { name: "Türkçe", icon: "Aa", topics: ["Okuduğunu anlama", "Dil bilgisi", "Yazım kuralları"], count: "2.100+ beceri", color: "from-sky-400 to-blue-500" },
  { name: "Fen Bilimleri", icon: "✦", topics: ["Canlılar", "Kuvvet ve hareket", "Dünya ve evren"], count: "1.400+ beceri", color: "from-violet-400 to-purple-500" },
  { name: "Sosyal Bilgiler", icon: "◎", topics: ["Tarih", "Coğrafya", "Vatandaşlık"], count: "1.100+ beceri", color: "from-amber-300 to-orange-500" },
  { name: "İngilizce", icon: "Hi", topics: ["Kelime", "Dinleme", "Dil yapıları"], count: "900+ beceri", color: "from-pink-400 to-rose-500" },
];

export const planCards = [
  { title: "Kazanım planları", description: "MEB kazanımlarına göre düzenlenmiş konu akışları.", cta: "Kazanım seç" },
  { title: "Kitap eşleştirme", description: "Ders kitabındaki üniteye uygun becerileri hızlıca bul.", cta: "Kitap ara" },
  { title: "Sınav hazırlığı", description: "LGS, okul sınavları ve yazılılar için hedefli pratik.", cta: "Sınava hazırlan" },
];

export const awards = [
  { title: "5 gün seri", detail: "Düzenli çalışma", color: "bg-emerald-100 text-emerald-700" },
  { title: "Kesir ustası", detail: "72 doğru cevap", color: "bg-amber-100 text-amber-700" },
  { title: "Okuma yıldızı", detail: "12 metin tamamlandı", color: "bg-sky-100 text-sky-700" },
  { title: "Fen kaşifi", detail: "Deney konuları", color: "bg-fuchsia-100 text-fuchsia-700" },
];

export const testimonials = [
  { quote: "Öğrencilerimin hangi konuda zorlandığını artık çok daha hızlı görüyorum.", name: "Ayşe K.", role: "Matematik öğretmeni", initials: "AK" },
  { quote: "Kızım her gün kendi hedefini seçip çalışmaya başladı.", name: "Murat D.", role: "Veli", initials: "MD" },
  { quote: "Konu tekrarları ve ödüller öğrenciler için çok motive edici.", name: "Elif S.", role: "Sınıf öğretmeni", initials: "ES" },
];

export const footerColumns = [
  { title: "Ürün", links: ["Matematik", "Türkçe", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce", "Öneriler", "Analiz"] },
  { title: "Kullanıcılar", links: ["Aileler", "Öğretmenler", "Okullar", "Öğrenciler", "Bağımsız öğrenenler"] },
  { title: "Kaynaklar", links: ["Yardım merkezi", "Blog", "Başarı hikayeleri", "Araştırmalar", "İletişim"] },
  { title: "Şirket", links: ["Hakkımızda", "Kariyer", "Gizlilik", "Kullanım şartları"] },
];
