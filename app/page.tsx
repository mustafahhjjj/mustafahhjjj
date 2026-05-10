"use client";

import { useState } from "react";

const gradeGroups = [
  { title: "İlkokul", grades: [1, 2, 3, 4], color: "#16a34a", note: "Okuma, temel matematik ve öğrenme alışkanlığı" },
  { title: "Ortaokul", grades: [5, 6, 7, 8], color: "#2563eb", note: "Kazanım takibi, tekrar ve LGS temeli" },
  { title: "Lise", grades: [9, 10, 11, 12], color: "#f97316", note: "Yazılılar, TYT-AYT hazırlığı ve ders başarısı" },
];

const trustItems = ["12 sınıf seviyesi", "1000+ kazanım", "Günlük soru çözümü", "Veli takip sistemi", "Öğretmen ödev paneli"];

const subjects = [
  { name: "Matematik", desc: "Sayılar, işlemler, problem çözme ve yeni nesil sorular", skills: "120+ beceri", href: "/matematik.html", color: "blue" },
  { name: "Türkçe", desc: "Okuma anlama, dil bilgisi, yazma ve paragraf çalışmaları", skills: "95+ beceri", href: "/turkce.html", color: "orange" },
  { name: "Fen Bilimleri", desc: "Deney, gözlem, ünite tekrarı ve yorum soruları", skills: "90+ beceri", href: "/fen-bilimleri.html", color: "green" },
  { name: "Sosyal Bilgiler", desc: "Tarih, coğrafya, vatandaşlık ve günlük yaşam becerileri", skills: "75+ beceri", href: "/sosyal-bilgiler.html", color: "cyan" },
  { name: "İngilizce", desc: "Kelime, dinleme, okuma ve sınıf düzeyine uygun pratik", skills: "80+ beceri", href: "/ingilizce.html", color: "purple" },
  { name: "Hayat Bilgisi", desc: "Okul, aile, çevre, güvenli yaşam ve temel alışkanlıklar", skills: "60+ beceri", href: "/hayat-bilgisi.html", color: "green" },
  { name: "Din Kültürü", desc: "Kavramlar, değerler, ünite tekrarları ve kazanım testleri", skills: "55+ beceri", href: "/din-kulturu.html", color: "orange" },
  { name: "T.C. İnkılap Tarihi", desc: "LGS odaklı konu tekrarı, kronoloji ve yorum soruları", skills: "65+ beceri", href: "/inkilap-tarihi.html", color: "blue" },
  { name: "Fizik", desc: "Kavram haritaları, formüller ve adım adım soru çözümü", skills: "70+ beceri", href: "/fizik.html", color: "cyan" },
  { name: "Kimya", desc: "Madde, tepkimeler, hesaplamalar ve sınav pratiği", skills: "68+ beceri", href: "/kimya.html", color: "green" },
  { name: "Biyoloji", desc: "Canlılar, sistemler, ekoloji ve görsel öğrenme adımları", skills: "72+ beceri", href: "/biyoloji.html", color: "purple" },
  { name: "Coğrafya", desc: "Harita okuma, doğal sistemler ve Türkiye coğrafyası", skills: "64+ beceri", href: "/cografya.html", color: "orange" },
  { name: "Tarih", desc: "Kronoloji, neden-sonuç ilişkileri ve kaynak yorumlama", skills: "66+ beceri", href: "/tarih.html", color: "blue" },
  { name: "Edebiyat", desc: "Dönemler, eserler, metin inceleme ve paragraf becerileri", skills: "78+ beceri", href: "/edebiyat.html", color: "purple" },
];

const popularSkills = [
  ["1. Sınıf Matematik", "Sayıları Tanıma", "/sinif-1-matematik.html"],
  ["1. Sınıf Türkçe", "Harfleri Tanıma", "/sinif-1-turkce.html"],
  ["4. Sınıf Matematik", "Kesirler", "/sinif-4.html"],
  ["5. Sınıf Fen", "Canlılar Dünyası", "/sinif-5.html"],
  ["8. Sınıf Matematik", "LGS Problemleri", "/sinif-8.html"],
  ["12. Sınıf Matematik", "TYT-AYT Temel Konular", "/sinif-12.html"],
];

const roles = [
  { title: "Öğrenci Paneli", text: "Ders çalış, test çöz, ödül kazan, eksiklerini gör.", button: "Öğrenci Girişi", href: "/ogrenci.html", color: "blue" },
  { title: "Veli Paneli", text: "Çocuğunun gelişimini, ödevlerini ve günlük çalışmalarını takip et.", button: "Veli Girişi", href: "/veli.html", color: "green" },
  { title: "Öğretmen Paneli", text: "Sınıfını yönet, ödev ver, duyuru gönder ve öğrenci gelişimini takip et.", button: "Öğretmen Girişi", href: "/ogretmen.html", color: "orange" },
];

const features = [
  "Anında geri bildirim",
  "Günlük hedef ve ödül sistemi",
  "Konu anlatımı ve video desteği",
  "Sınavlarda çıkmış sorular",
  "Kolay / Orta / Zor testler",
  "Konum bazlı okul mesajları",
  "Güvenli öğrenci iletişimi",
  "Öğretmen duyuruları",
  "Veli takip raporu",
];

const navLinks = [
  ["Sınıflar", "#siniflar"],
  ["Dersler", "#dersler"],
  ["Testler", "/testler.html"],
  ["Mustafa Hocaya Sor", "/mustafa-hocaya-sor.html"],
  ["Veli Paneli", "/veli.html"],
  ["Öğretmen Paneli", "/ogretmen.html"],
];

function gradeHref(grade: number) {
  return `/sinif-${grade}.html`;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [helperOpen, setHelperOpen] = useState(true);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8" aria-label="Ana menü">
          <a href="/" className="flex shrink-0 items-center gap-2 rounded-xl text-xl font-black tracking-tight focus:outline-none focus:ring-4 focus:ring-blue-100" aria-label="e-kurs.com ana sayfa">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-sm">e</span>
            <span>e-kurs.com</span>
          </a>

          <div className="hidden items-center justify-center gap-1 lg:flex">
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} className="rounded-full px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <a href="/giris.html" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50">Giriş Yap</a>
            <a href="/kayit.html" className="rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-700">Ücretsiz Başla</a>
          </div>

          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white text-blue-700 lg:hidden"
            aria-controls="mobil-menu"
            aria-expanded={mobileOpen}
            aria-label="Menüyü aç veya kapat"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span className="space-y-1.5" aria-hidden="true"><span className="block h-0.5 w-6 bg-current" /><span className="block h-0.5 w-6 bg-current" /><span className="block h-0.5 w-6 bg-current" /></span>
          </button>
        </nav>
        {mobileOpen && (
          <div id="mobil-menu" className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navLinks.map(([label, href]) => <a key={label} href={href} className="rounded-2xl bg-slate-50 px-4 py-4 text-base font-black text-slate-800">{label}</a>)}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a href="/giris.html" className="rounded-2xl border border-slate-200 px-4 py-4 text-center font-black">Giriş Yap</a>
                <a href="/kayit.html" className="rounded-2xl bg-blue-600 px-4 py-4 text-center font-black text-white">Ücretsiz Başla</a>
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">K12 için akıllı öğrenme platformu</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">Her öğrenciye kişiye özel dijital öğretmen</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">e-kurs.com; 1. sınıftan 12. sınıfa kadar ders, ünite, test, video, ödev yardımı ve gelişim takibini tek ekranda sunar.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#siniflar" className="rounded-full bg-blue-600 px-7 py-4 text-center font-black text-white shadow-sm transition hover:bg-blue-700">Sınıfını Seç</a>
              <a href="/testler.html" className="rounded-full bg-emerald-500 px-7 py-4 text-center font-black text-white shadow-sm transition hover:bg-emerald-600">Hemen Test Çöz</a>
              <a href="/mustafa-hocaya-sor.html" className="rounded-full border border-orange-200 bg-orange-50 px-7 py-4 text-center font-black text-orange-700 transition hover:bg-orange-100">Mustafa Hocaya Sor</a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-xl shadow-slate-200/60 sm:p-6">
            <div className="rounded-[1.6rem] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div><p className="text-sm font-black text-blue-600">Bugünkü çalışma</p><h2 className="text-2xl font-black">Kişisel öğrenme yolu</h2></div>
                <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700">Canlı</span>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  ["Bugünkü hedef", "20 soru", "bg-blue-50 text-blue-700"],
                  ["12 soru çözüldü", "%80 doğruluk", "bg-emerald-50 text-emerald-700"],
                  ["Eksik konu", "Doğal Sayılar", "bg-orange-50 text-orange-700"],
                  ["Ödül", "3 yıldız", "bg-yellow-50 text-yellow-700"],
                  ["Kişisel öneri", "Toplama alıştırması", "bg-purple-50 text-purple-700"],
                ].map(([label, value, tone]) => (
                  <a key={label} href="/testler.html" className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <span className="font-black text-slate-800">{label}</span><span className={`rounded-full px-3 py-2 text-sm font-black ${tone}`}>{value}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Güven verileri" className="border-y border-slate-200 bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {trustItems.map((item) => <div key={item} className="rounded-2xl bg-white px-4 py-4 text-center text-base font-black text-slate-800 shadow-sm">{item}</div>)}
        </div>
      </section>

      <section id="siniflar" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl"><p className="font-black text-emerald-600">Sınıf seçimi</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">1. sınıftan 12. sınıfa öğrenme yolunu seç</h2></div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {gradeGroups.map((group) => (
              <article key={group.title} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5"><h3 className="text-2xl font-black" style={{ color: group.color }}>{group.title}</h3><p className="mt-1 text-slate-600">{group.note}</p></div>
                <div className="grid grid-cols-2 gap-3">
                  {group.grades.map((grade) => <a key={grade} href={gradeHref(grade)} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"><strong className="block text-4xl font-black" style={{ color: group.color }}>{grade}</strong><span className="font-bold text-slate-600">Sınıf</span></a>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="dersler" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="font-black text-blue-600">Dersler</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Kazanım odaklı ders kartları</h2></div><a href="/dersler.html" className="rounded-full bg-slate-900 px-6 py-3 text-center font-black text-white">Tüm dersleri gör</a></div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subjects.map((subject) => <a key={subject.name} href={subject.href} className={`subject-${subject.color} rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl`}><div className="mb-4 h-2 w-16 rounded-full bg-current opacity-80" /><h3 className="text-2xl font-black text-slate-950">{subject.name}</h3><p className="mt-2 min-h-[72px] leading-6 text-slate-600">{subject.desc}</p><div className="mt-5 flex items-center justify-between gap-3"><span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-black text-slate-700">{subject.skills}</span><span className="font-black text-blue-700">Becerileri gör</span></div></a>)}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center"><p className="font-black text-orange-600">Popüler beceriler</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Bugün en çok çalışılan kazanımlar</h2></div>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            {popularSkills.map(([grade, skill, href], index) => <a key={skill} href={href} className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 transition last:border-b-0 hover:bg-blue-50"><span className="flex min-w-0 items-center gap-4"><strong className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-100 text-slate-700">{index + 1}</strong><span className="min-w-0"><span className="block font-black text-slate-950">{grade}: {skill}</span><span className="text-sm font-bold text-slate-500">Kazanımı aç ve ilk alıştırmayı çöz</span></span></span><span className="shrink-0 font-black text-blue-700">Başla →</span></a>)}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl"><div className="grid gap-5 lg:grid-cols-3">{roles.map((role) => <article key={role.title} className="rounded-[2rem] border border-white bg-white p-7 shadow-sm"><p className={`mb-4 inline-flex rounded-full px-3 py-1 text-sm font-black role-${role.color}`}>{role.title.split(" ")[0]}</p><h3 className="text-2xl font-black">{role.title}</h3><p className="mt-3 min-h-[64px] leading-7 text-slate-600">{role.text}</p><a href={role.href} className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 font-black text-white">{role.button}</a></article>)}</div></div>
      </section>

      <section id="ozellikler" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl"><div className="text-center"><p className="font-black text-emerald-600">Özel özellikler</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Düzenli çalışma için ihtiyaç duyulan her şey</h2></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.map((feature) => <div key={feature} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><span className="mr-3 inline-grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 font-black text-emerald-700">✓</span><strong className="text-lg">{feature}</strong></div>)}</div></div>
      </section>

      {helperOpen && <aside className="fixed bottom-4 right-4 z-40 w-[min(310px,calc(100vw-2rem))] rounded-3xl border border-blue-100 bg-white p-4 shadow-2xl shadow-slate-300/70"><button type="button" aria-label="Mustafa Hoca kartını kapat" onClick={() => setHelperOpen(false)} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-slate-100 font-black text-slate-600">×</button><p className="pr-8 text-lg font-black text-slate-950">Mustafa Hoca burada</p><p className="mt-2 text-sm leading-6 text-slate-600">Takıldığın soruyu yaz, fotoğraf yükle, birlikte çözelim.</p><a href="/mustafa-hocaya-sor.html" className="mt-3 inline-flex rounded-full bg-blue-600 px-4 py-2.5 text-sm font-black text-white">Soru Sor</a></aside>}

      <footer className="bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_1fr]"><div><a href="/" className="text-2xl font-black">e-kurs.com</a><p className="mt-4 max-w-xl leading-7 text-slate-300">e-kurs.com – 1. sınıftan 12. sınıfa ders, test, ödev yardımı ve güvenli öğrenme sistemi.</p></div><div className="grid gap-3 sm:grid-cols-2">{[["Sınıflar", "#siniflar"], ["Dersler", "#dersler"], ["Testler", "/testler.html"], ["Veli Paneli", "/veli.html"], ["Öğretmen Paneli", "/ogretmen.html"], ["İletişim", "/iletisim.html"], ["Gizlilik Politikası", "/gizlilik-politikasi.html"]].map(([label, href]) => <a key={label} href={href} className="rounded-2xl bg-white/5 px-4 py-3 font-bold text-slate-300 transition hover:bg-white/10 hover:text-white">{label}</a>)}</div></div>
      </footer>
    </main>
  );
}
