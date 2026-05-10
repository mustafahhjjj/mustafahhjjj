"use client";

import { useState } from "react";

const grades = Array.from({ length: 12 }, (_, index) => index + 1);

const gradeGroups = [
  {
    title: "İlkokul",
    description: "Okuma, temel matematik, hayat bilgisi ve öğrenme alışkanlığı.",
    grades: [1, 2, 3, 4],
    accent: "from-emerald-400 to-cyan-500",
    bg: "bg-emerald-50",
  },
  {
    title: "Ortaokul",
    description: "Kazanım odaklı tekrar, test pratiği ve LGS temeli.",
    grades: [5, 6, 7, 8],
    accent: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
  },
  {
    title: "Lise",
    description: "Ders başarısı, yazılı hazırlığı, TYT ve AYT çalışma planı.",
    grades: [9, 10, 11, 12],
    accent: "from-violet-500 to-fuchsia-500",
    bg: "bg-violet-50",
  },
];

const subjects = [
  { name: "Matematik", icon: "➗", color: "bg-blue-600", href: "/pages/dersler.html#matematik" },
  { name: "Türkçe", icon: "📚", color: "bg-rose-500", href: "/pages/dersler.html#turkce" },
  { name: "Fen Bilimleri", icon: "🔬", color: "bg-emerald-500", href: "/pages/dersler.html#fen" },
  { name: "Sosyal Bilgiler", icon: "🌍", color: "bg-cyan-500", href: "/pages/dersler.html#sosyal" },
  { name: "İngilizce", icon: "💬", color: "bg-amber-500", href: "/pages/dersler.html#ingilizce" },
];

const features = [
  {
    title: "Dersler ve konu anlatımı",
    text: "Sınıfına uygun dersleri, üniteleri ve kazanımları düzenli bir akışta çalış.",
    href: "/pages/dersler.html",
    icon: "📘",
  },
  {
    title: "Testler ve soru bankası",
    text: "Kolaydan zora ilerleyen testlerle eksiklerini hızlıca gör ve pekiştir.",
    href: "/pages/soru-bankasi.html",
    icon: "✅",
  },
  {
    title: "Ödev yardımı",
    text: "Takıldığın konuyu sade anlatımlarla öğren, günlük çalışma hedefini tamamla.",
    href: "/pages/odev-yardimi.html",
    icon: "📝",
  },
  {
    title: "Kişiye özel dijital öğretmen",
    text: "Yanıtlarına göre seviyeni takip eden, sana uygun tekrar ve çalışma öneren akıllı öğretmen.",
    href: "/pages/akilli-oneriler.html",
    icon: "✨",
  },
  {
    title: "Veli paneli",
    text: "Çocuğunuzun gelişimini, eksik konularını ve haftalık çalışma düzenini takip edin.",
    href: "/veli-paneli.html",
    icon: "👨‍👩‍👧",
  },
  {
    title: "Öğretmen paneli",
    text: "Sınıf performansını görün, ödev verin ve kazanım takibini kolayca yönetin.",
    href: "/ogretmen-paneli.html",
    icon: "👩‍🏫",
  },
];

const quickLinks = [
  ["Derse Başla", "/sinif-1.html"],
  ["Sınıf Seç", "#sinif-secimi"],
  ["Veli Girişi", "/veli-paneli.html"],
  ["Öğretmen Girişi", "/ogretmen-paneli.html"],
];

function gradeHref(grade: number) {
  return `/sinif-${grade}.html`;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur">
        <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Ana menü">
          <a href="/" className="flex items-center gap-3 rounded-2xl text-2xl font-black tracking-tight focus:outline-none focus:ring-4 focus:ring-blue-100" aria-label="e-kurs.com ana sayfa">
            <span className="grid h-12 w-12 place-items-center rounded-[1.35rem] bg-blue-600 text-white shadow-lg shadow-blue-200">e</span>
            <span>e-kurs.com</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            <a href="#sinif-secimi" className="rounded-full px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">Sınıflar</a>
            <a href="#dersler" className="rounded-full px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">Dersler</a>
            <a href="#ozellikler" className="rounded-full px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">Özellikler</a>
            <a href="/pages/veli.html" className="rounded-full px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">Veliler</a>
            <a href="/pages/ogretmen.html" className="rounded-full px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">Öğretmenler</a>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="/veli-paneli.html" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">Veli Girişi</a>
            <a href="/sinif-1.html" className="rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700">Derse Başla</a>
          </div>

          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white text-blue-700 lg:hidden"
            aria-controls="mobil-menu"
            aria-expanded={mobileOpen}
            aria-label="Menüyü aç veya kapat"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span className="space-y-1.5" aria-hidden="true">
              <span className="block h-0.5 w-6 rounded bg-current" />
              <span className="block h-0.5 w-6 rounded bg-current" />
              <span className="block h-0.5 w-6 rounded bg-current" />
            </span>
          </button>
        </nav>

        {mobileOpen && (
          <div id="mobil-menu" className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {[
                ["Sınıflar", "#sinif-secimi"],
                ["Dersler", "#dersler"],
                ["Özellikler", "#ozellikler"],
                ["Veliler", "/pages/veli.html"],
                ["Öğretmenler", "/pages/ogretmen.html"],
                ["Veli Girişi", "/veli-paneli.html"],
                ["Öğretmen Girişi", "/ogretmen-paneli.html"],
              ].map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMobileOpen(false)} className="rounded-2xl px-4 py-3 text-base font-black text-slate-700 hover:bg-blue-50 hover:text-blue-700">
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section className="relative isolate bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.13),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.12),transparent_26%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 ring-1 ring-blue-100">1–12. sınıf için modern K12 öğrenme platformu</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Sınıfını seç, derse başla, adım adım ilerle.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              e-kurs.com; dersler, testler, ödev yardımı, kişiye özel dijital öğretmen ve veli/öğretmen panellerini tek ekranda buluşturur.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {quickLinks.map(([label, href], index) => (
                <a key={label} href={href} className={index === 0 ? "rounded-full bg-blue-600 px-7 py-4 text-center text-base font-black text-white shadow-xl shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700" : "rounded-full border border-slate-200 bg-white px-7 py-4 text-center text-base font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"}>
                  {label}
                </a>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["MEB uyumlu kazanımlar", "Mobil ve masaüstü uyumlu", "Okunaklı, sade çalışma ekranı"].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 shadow-sm">✓ {item}</div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="rounded-[2.25rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-blue-100">
              <div className="rounded-[1.75rem] bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-400 p-5 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-white/80">Bugünkü rota</p>
                    <h2 className="mt-2 text-3xl font-black">Matematik çalışması</h2>
                  </div>
                  <span className="grid h-16 w-16 place-items-center rounded-3xl bg-white/20 text-4xl">🎯</span>
                </div>
                <div className="mt-6 grid gap-3">
                  {["Konu anlatımı", "10 soruluk test", "Eksik kazanım tekrarı"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/18 p-4 backdrop-blur">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-black text-blue-700">{index + 1}</span>
                      <span className="font-black">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {["Ders", "Test", "Rapor"].map((item) => (
                  <div key={item} className="rounded-3xl bg-slate-50 p-4 text-center">
                    <div className="text-2xl font-black text-blue-700">{item}</div>
                    <div className="mt-2 h-2 rounded-full bg-blue-100"><div className="h-2 w-2/3 rounded-full bg-blue-500" /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sinif-secimi" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-black text-emerald-600">Sınıf seçimi</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">1’den 12’ye tüm sınıflar</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">İlkokul, ortaokul ve lise için renkli, sade ve hızlı sınıf geçişleri.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {gradeGroups.map((group) => (
              <article key={group.title} className={`rounded-[2rem] border border-slate-200 ${group.bg} p-6 shadow-sm`}>
                <div className={`h-2 rounded-full bg-gradient-to-r ${group.accent}`} />
                <h3 className="mt-5 text-2xl font-black">{group.title}</h3>
                <p className="mt-2 min-h-14 leading-7 text-slate-600">{group.description}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                  {group.grades.map((grade) => (
                    <a key={grade} href={gradeHref(grade)} className="group rounded-3xl border border-white/70 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                      <strong className="block text-4xl font-black text-slate-950 group-hover:text-blue-700">{grade}</strong>
                      <span className="mt-1 block text-sm font-black text-slate-500">Sınıf</span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
            {grades.map((grade) => (
              <a key={grade} href={gradeHref(grade)} className="rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100">
                <strong className="block text-3xl font-black">{grade}</strong>
                <span className="mt-1 block text-xs font-black text-slate-500">Sınıf</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="dersler" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-black text-blue-600">Dersler</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Temel derslere hızlı erişim</h2>
            </div>
            <a href="/pages/dersler.html" className="rounded-full bg-slate-900 px-6 py-3 text-center text-sm font-black text-white transition hover:-translate-y-0.5">Tüm dersleri gör</a>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {subjects.map((subject) => (
              <a key={subject.name} href={subject.href} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                <span className={`grid h-14 w-14 place-items-center rounded-2xl text-3xl text-white ${subject.color}`}>{subject.icon}</span>
                <h3 className="mt-5 text-2xl font-black">{subject.name}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Konu anlatımı, test, tekrar ve kazanım takibi.</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="ozellikler" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-black text-violet-600">Platform özellikleri</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Öğrenci, veli ve öğretmen için tek düzen</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <a key={feature.title} href={feature.href} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200">
                <span className="text-5xl" aria-hidden="true">{feature.icon}</span>
                <h3 className="mt-5 text-2xl font-black">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{feature.text}</p>
                <span className="mt-5 inline-flex font-black text-blue-700">Sayfaya git →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-black text-blue-100">Hemen başlayın</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Bugün bir sınıf seçip ilk çalışmayı tamamla.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50">Basit menüler, büyük yazılar ve mobil uyumlu ekranlarla e-kurs.com deploy sonrası da hızlı çalışacak şekilde hazırlandı.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[430px]">
            <a href="#sinif-secimi" className="rounded-full bg-white px-7 py-4 text-center font-black text-blue-700 shadow-xl transition hover:-translate-y-0.5">Sınıf Seç</a>
            <a href="/ogretmen-paneli.html" className="rounded-full border border-white/40 px-7 py-4 text-center font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10">Öğretmen Girişi</a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <a href="/" className="text-2xl font-black">e-kurs.com</a>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">Türkiye K12 öğrencileri için ders, test, ödev yardımı, kişiye özel dijital öğretmen, veli paneli ve öğretmen paneli sunan modern eğitim sitesi.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Dersler", "/pages/dersler.html"],
              ["Soru Bankası", "/pages/soru-bankasi.html"],
              ["Veli Paneli", "/veli-paneli.html"],
              ["Öğretmen Paneli", "/ogretmen-paneli.html"],
              ["İletişim", "/pages/iletisim.html"],
              ["Gizlilik", "/pages/gizlilik-politikasi.html"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white">{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
