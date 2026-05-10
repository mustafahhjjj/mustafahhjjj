"use client";

import { useState } from "react";

const gradeGroups = [
  {
    title: "İlkokul",
    note: "Okuma, temel matematik ve düzenli çalışma alışkanlığı.",
    grades: [1, 2, 3, 4],
    accent: "emerald",
  },
  {
    title: "Ortaokul",
    note: "Kazanım takibi, tekrar planı ve LGS temeli.",
    grades: [5, 6, 7, 8],
    accent: "blue",
  },
  {
    title: "Lise",
    note: "Yazılı başarısı, TYT-AYT temeli ve ünite hedefleri.",
    grades: [9, 10, 11, 12],
    accent: "orange",
  },
];

const subjects = [
  { name: "Matematik", icon: "➗", desc: "Sayılar, işlemler ve problem çözme adımları.", level: "Kolay / Orta / Zor", color: "bg-blue-50 text-blue-700" },
  { name: "Türkçe", icon: "📚", desc: "Okuma anlama, dil bilgisi ve yazma becerileri.", level: "Kolay / Orta / Zor", color: "bg-orange-50 text-orange-700" },
  { name: "Hayat Bilgisi", icon: "🌱", desc: "Okul, aile, çevre ve güvenli yaşam konuları.", level: "Kolay / Orta", color: "bg-emerald-50 text-emerald-700" },
  { name: "Fen Bilimleri", icon: "🔬", desc: "Deney, gözlem ve ünite değerlendirme testleri.", level: "Kolay / Orta / Zor", color: "bg-cyan-50 text-cyan-700" },
  { name: "Sosyal Bilgiler", icon: "🗺️", desc: "Tarih, coğrafya ve vatandaşlık kazanımları.", level: "Kolay / Orta", color: "bg-violet-50 text-violet-700" },
  { name: "İngilizce", icon: "💬", desc: "Kelime, okuma ve sınıf düzeyinde pratik.", level: "Kolay / Orta / Zor", color: "bg-pink-50 text-pink-700" },
  { name: "Din Kültürü", icon: "🤝", desc: "Değerler, kavramlar ve kazanım tekrarları.", level: "Kolay / Orta", color: "bg-amber-50 text-amber-700" },
  { name: "Tarih", icon: "🏛️", desc: "Kronoloji, kaynak yorumlama ve konu tekrarı.", level: "Orta / Zor", color: "bg-red-50 text-red-700" },
  { name: "Coğrafya", icon: "🌍", desc: "Harita okuma, doğal sistemler ve Türkiye coğrafyası.", level: "Orta / Zor", color: "bg-lime-50 text-lime-700" },
  { name: "Fizik", icon: "⚡", desc: "Kavramlar, formüller ve adım adım çözümler.", level: "Orta / Zor", color: "bg-sky-50 text-sky-700" },
  { name: "Kimya", icon: "🧪", desc: "Madde, tepkimeler ve hesaplama pratikleri.", level: "Orta / Zor", color: "bg-teal-50 text-teal-700" },
  { name: "Biyoloji", icon: "🧬", desc: "Canlılar, sistemler ve görsel öğrenme yolları.", level: "Orta / Zor", color: "bg-fuchsia-50 text-fuchsia-700" },
];

const featureCards = [
  { title: "Kapsamlı K12 Müfredatı", text: "1. sınıftan 12. sınıfa kadar ders, ünite, test ve konu anlatımı.", icon: "🎯" },
  { title: "Kişiye Özel Dijital Öğretmen", text: "Öğrencinin seviyesine göre öneriler, günlük çalışma hedefleri ve açıklamalı çözümler.", icon: "👨‍🏫" },
  { title: "Anında Geri Bildirim", text: "Cevap doğruysa yeşil, yanlışsa kırmızı göster; açıklama paneli otomatik açılsın.", icon: "✅" },
  { title: "Veli ve Öğretmen Takibi", text: "Ödev, başarı, günlük soru sayısı, ünite tamamlama ve sınıf gelişimi tek ekranda.", icon: "📈" },
];

const navLinks = [
  ["Sınıflar", "#classes"],
  ["Dersler", "#subjects"],
  ["Testler", "#test-demo"],
  ["Ödev Yardımı", "#grade-1"],
  ["Veli Paneli", "#parent-panel"],
  ["Öğretmen Paneli", "#teacher-panel"],
  ["Mesaj Gönder", "#messages"],
];

const footerLinks = [
  ["Ana Sayfa", "#home"],
  ["Sınıflar", "#classes"],
  ["Dersler", "#subjects"],
  ["Testler", "#test-demo"],
  ["Veli Paneli", "#parent-panel"],
  ["Öğretmen Paneli", "#teacher-panel"],
  ["Mesaj Gönder", "#messages"],
  ["İletişim", "#messages"],
];

const optionValues = [10, 11, 12, 13];

function gradeHref(grade: number) {
  return grade === 1 ? "#grade-1" : `/sinif-${grade}.html`;
}

function focusSection(sectionId: string) {
  const section = document.querySelector(sectionId);
  if (section instanceof HTMLElement) {
    section.focus({ preventScroll: true });
  }
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [helperVisible, setHelperVisible] = useState(true);

  const explanation = "Doğru cevap 11. Çünkü 8’in üzerine 3 eklersek 9, 10, 11 olur.";

  const closeMobileMenu = () => setMobileOpen(false);

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(11);
    }
    setChecked(true);
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setChecked(false);
  };

  const scrollTo = (id: string) => {
    closeMobileMenu();
    window.requestAnimationFrame(() => focusSection(id));
  };

  return (
    <main id="home" className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8" aria-label="Ana menü">
          <a href="#home" onClick={() => scrollTo("#home")} className="flex shrink-0 items-center gap-2 rounded-2xl text-xl font-black tracking-tight focus:outline-none focus:ring-4 focus:ring-blue-100" aria-label="e-kurs.com ana sayfa">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-200">e</span>
            <span>e-kurs.com</span>
          </a>

          <div className="hidden items-center justify-center gap-1 xl:flex">
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} className="rounded-full px-3 py-2.5 text-sm font-extrabold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <a href="#student-panel" onClick={() => scrollTo("#student-panel")} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50">Giriş Yap</a>
            <a href="#classes" onClick={() => scrollTo("#classes")} className="rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">Ücretsiz Başla</a>
          </div>

          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white text-blue-700 xl:hidden"
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            aria-label="Menüyü aç veya kapat"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="space-y-1.5" aria-hidden="true">
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
            </span>
          </button>
        </nav>

        {mobileOpen && (
          <div id="mobile-menu" className="border-t border-slate-100 bg-white px-4 pb-4 shadow-xl xl:hidden">
            <div className="mx-auto grid max-w-7xl gap-2 pt-3">
              {navLinks.map(([label, href]) => (
                <a key={label} href={href} onClick={closeMobileMenu} className="rounded-2xl bg-slate-50 px-4 py-4 text-base font-black text-slate-800 active:bg-blue-50">
                  {label}
                </a>
              ))}
              <div className="grid gap-2 pt-2 sm:grid-cols-2">
                <a href="#student-panel" onClick={closeMobileMenu} className="rounded-2xl border border-slate-200 px-4 py-4 text-center font-black">Giriş Yap</a>
                <a href="#classes" onClick={closeMobileMenu} className="rounded-2xl bg-blue-600 px-4 py-4 text-center font-black text-white">Sınıfını Seç</a>
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">K12 için güvenli ve renkli öğrenme yolu</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.03] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">Her öğrenciye özel dijital öğretmen</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">1. sınıftan 12. sınıfa kadar dersler, üniteler, açıklamalı testler, ödev yardımı, başarı takibi ve veli-öğretmen desteği tek sistemde.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#classes" onClick={() => scrollTo("#classes")} className="rounded-full bg-blue-600 px-7 py-4 text-center font-black text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700">Sınıfını Seç</a>
              <a href="#grade-1" onClick={() => scrollTo("#grade-1")} className="rounded-full bg-emerald-500 px-7 py-4 text-center font-black text-white shadow-lg shadow-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-600">1. Sınıfa Başla</a>
              <a href="#test-demo" onClick={() => scrollTo("#test-demo")} className="rounded-full border border-orange-200 bg-orange-50 px-7 py-4 text-center font-black text-orange-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-100">Örnek Test Çöz</a>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-orange-50 p-4 shadow-2xl shadow-slate-200/70 sm:p-6">
            <div className="absolute -right-3 top-8 rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-700 shadow-sm">🏅 Rozet hedefi</div>
            <div className="grid gap-4 rounded-[1.5rem] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm font-black text-blue-600">Bugünkü çalışma</p>
                  <h2 className="text-2xl font-black">Öğrenci ilerleme kartı</h2>
                </div>
                <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-2xl font-black text-emerald-600">86%</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Matematik", "Türkçe", "Fen", "İngilizce"].map((lesson) => (
                  <div key={lesson} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-sm font-black text-slate-500">Ders baloncuğu</p>
                    <p className="text-lg font-black text-slate-950">{lesson}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 rounded-3xl bg-blue-600 p-5 text-white sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-sm font-black text-blue-100">Günlük sayaç</p>
                  <p className="text-2xl font-black">Bugün 10 soru çöz, rozet kazan</p>
                </div>
                <div className="rounded-2xl bg-white px-5 py-3 text-center font-black text-blue-700">7 / 10</div>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-2xl">👨‍🏫</div>
                <div>
                  <p className="font-black text-emerald-800">Mustafa Hoca</p>
                  <p className="text-sm font-bold text-emerald-700">Sıradaki hedef: 1 kısa test ve açıklamalı çözüm.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-4 py-8 sm:px-6 lg:px-8" aria-label="Güven ve istatistikler">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 md:grid-cols-5">
            {["1–12. sınıf öğrenme sistemi", "Tüm dersler ve üniteler", "Açıklamalı soru çözümü", "Veli ve öğretmen takibi", "Günlük ödül sistemi"].map((item) => (
              <div key={item} className="rounded-2xl bg-white px-4 py-4 text-center text-sm font-black text-slate-700 shadow-sm">{item}</div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["12", "sınıf seviyesi"],
              ["1000+", "örnek soru alanı"],
              ["3", "test düzeyi"],
              ["3", "panel deneyimi"],
            ].map(([number, label]) => (
              <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <p className="text-3xl font-black text-blue-600">{number}</p>
                <p className="mt-1 font-bold text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="classes" tabIndex={-1} className="px-4 py-16 outline-none sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-black text-emerald-600">Sınıf seçimi</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Sınıfını seç, derse başla</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">İlkokul, ortaokul ve lise için düzenli K12 öğrenme yolu.</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {gradeGroups.map((group) => (
              <article key={group.title} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-100">
                <h3 className="text-2xl font-black">{group.title}</h3>
                <p className="mt-2 min-h-[56px] text-slate-600">{group.note}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {group.grades.map((grade) => (
                    <a key={grade} href={gradeHref(grade)} className="group rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-100/70">
                      <span className="text-4xl font-black text-slate-950">{grade}.</span>
                      <span className="ml-2 text-lg font-black text-slate-700">Sınıf</span>
                      <p className="mt-2 text-sm font-bold text-slate-500">Ders, ünite ve açıklamalı testler.</p>
                      <span className="mt-4 inline-flex min-h-11 items-center rounded-full bg-slate-900 px-4 text-sm font-black text-white group-hover:bg-blue-600">Derslere Git</span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="grade-1" tabIndex={-1} className="bg-emerald-50 px-4 py-14 outline-none sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] bg-white p-6 shadow-xl shadow-emerald-100 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-black text-emerald-600">1. sınıf başlangıç alanı</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Okuma, sayılar ve günlük ödev desteği bir arada</h2>
            <p className="mt-3 max-w-3xl text-lg text-slate-600">1. sınıf öğrencileri için Matematik, Türkçe ve Hayat Bilgisi adımları; kısa testler ve Mustafa Hoca yönlendirmeleriyle sunulur.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href="/sinif-1.html" className="rounded-full bg-emerald-500 px-7 py-4 text-center font-black text-white shadow-lg shadow-emerald-100">1. Sınıf Dersleri</a>
            <a href="/sinif-1-matematik.html" className="rounded-full border border-emerald-200 bg-emerald-50 px-7 py-4 text-center font-black text-emerald-700">Matematik Ünitesi</a>
          </div>
        </div>
      </section>

      <section id="subjects" tabIndex={-1} className="px-4 py-16 outline-none sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-black text-blue-600">Dersler</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Dersler ve çalışma alanları</h2>
            </div>
            <a href="#test-demo" className="rounded-full bg-slate-900 px-6 py-3 text-center font-black text-white">Örnek Teste Git</a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subjects.map((subject) => (
              <article key={subject.name} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
                <div className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl text-2xl ${subject.color}`}>{subject.icon}</div>
                <h3 className="text-xl font-black">{subject.name}</h3>
                <p className="mt-2 min-h-[72px] text-slate-600">{subject.desc}</p>
                <span className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">{subject.level}</span>
                <a href="#grade-1" className="mt-4 flex min-h-11 items-center justify-center rounded-full bg-blue-50 px-4 text-sm font-black text-blue-700 hover:bg-blue-600 hover:text-white">Üniteleri Gör</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-black text-orange-600">Platform özellikleri</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Her rol için anlaşılır, hızlı ve güvenli</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature) => (
              <article key={feature.title} className="rounded-[2rem] border border-white bg-white p-6 shadow-sm">
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-3xl">{feature.icon}</div>
                <h3 className="text-xl font-black">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="test-demo" tabIndex={-1} className="px-4 py-16 outline-none sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-black text-blue-600">Çalışan demo</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Örnek soru çöz</h2>
            <p className="mt-4 text-lg text-slate-600">Seçeneğe dokun, cevabı kontrol et ve açıklamayı hemen gör.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Matematik • 1. sınıf</p>
            <h3 className="mt-3 text-3xl font-black">8 + 3 kaç eder?</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {optionValues.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === 11;
                const feedbackClass = checked && isSelected ? (isCorrect ? "border-emerald-500 bg-emerald-500 text-white" : "border-red-500 bg-red-500 text-white") : "border-slate-200 bg-slate-50 text-slate-900 hover:border-blue-300 hover:bg-blue-50";
                return (
                  <button key={option} type="button" onClick={() => { setSelectedAnswer(option); setChecked(true); }} className={`min-h-14 rounded-2xl border text-xl font-black transition ${feedbackClass}`} aria-pressed={isSelected}>
                    {option}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className={`mt-5 rounded-3xl p-4 font-bold ${selectedAnswer === 11 ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`} role="status">
                {explanation}
              </div>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={handleCheckAnswer} className="rounded-full bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-100">Cevabı Kontrol Et</button>
              <button type="button" onClick={resetQuestion} className="rounded-full border border-slate-200 bg-white px-6 py-3 font-black text-slate-700">Yeni Soru</button>
              <a href="#grade-1" className="rounded-full bg-orange-50 px-6 py-3 text-center font-black text-orange-700">Üniteye Git</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-3">
            <article id="student-panel" tabIndex={-1} className="rounded-[2rem] border border-white bg-white p-7 shadow-sm outline-none">
              <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-black text-blue-700">Öğrenci</p>
              <h3 className="text-2xl font-black">Öğrenci Paneli</h3>
              <p className="mt-3 min-h-[72px] leading-7 text-slate-600">Günlük soru çöz, rozet kazan, ilerlemeni takip et.</p>
              <a href="#student-panel" className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 font-black text-white">Öğrenci Girişi</a>
            </article>
            <article id="parent-panel" tabIndex={-1} className="rounded-[2rem] border border-white bg-white p-7 shadow-sm outline-none">
              <p className="mb-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700">Veli</p>
              <h3 className="text-2xl font-black">Veli Paneli</h3>
              <p className="mt-3 min-h-[72px] leading-7 text-slate-600">Çocuğunun ödevlerini, başarı durumunu ve günlük çalışmalarını takip et.</p>
              <a href="#parent-panel" className="mt-5 inline-flex rounded-full bg-emerald-600 px-5 py-3 font-black text-white">Veli Girişi</a>
            </article>
            <article id="teacher-panel" tabIndex={-1} className="rounded-[2rem] border border-white bg-white p-7 shadow-sm outline-none">
              <p className="mb-4 inline-flex rounded-full bg-orange-50 px-3 py-1 text-sm font-black text-orange-700">Öğretmen</p>
              <h3 className="text-2xl font-black">Öğretmen Paneli</h3>
              <p className="mt-3 min-h-[72px] leading-7 text-slate-600">Sınıfını yönet, ödev ver, duyuru gönder ve öğrenci gelişimini izle.</p>
              <a href="#teacher-panel" className="mt-5 inline-flex rounded-full bg-orange-500 px-5 py-3 font-black text-white">Öğretmen Girişi</a>
            </article>
          </div>
        </div>
      </section>

      <section id="messages" tabIndex={-1} className="px-4 py-16 outline-none sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/50 lg:grid-cols-[1fr_.85fr] lg:p-10">
          <div>
            <p className="font-black text-emerald-300">Demo iletişim altyapısı</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Güvenli mesaj ve duyuru sistemi</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Bu alan şimdilik demo olarak çalışır; sonraki aşamada PHP/MySQL mesaj veritabanına bağlanabilecek düzenli yapıda hazırlanmıştır.</p>
            <a href="mailto:demo@e-kurs.com?subject=e-kurs.com%20mesaj%20demo" className="mt-6 inline-flex rounded-full bg-emerald-400 px-7 py-4 font-black text-slate-950 shadow-lg shadow-emerald-900/20">Mesaj Gönder</a>
          </div>
          <div className="grid gap-3">
            {["Öğrenci mesajları", "Sınıf duyuruları", "Konum bazlı okul mesajları", "Yönetici bilgilendirmeleri"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 px-5 py-4 font-black text-white ring-1 ring-white/10">{item}</div>
            ))}
          </div>
        </div>
      </section>

      {helperVisible && (
        <aside className="fixed bottom-4 right-4 z-40 w-[min(320px,calc(100vw-2rem))] rounded-3xl border border-blue-100 bg-white p-4 shadow-2xl shadow-slate-300/70">
          <button type="button" aria-label="Mustafa Hoca kartını kapat" onClick={() => setHelperVisible(false)} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-slate-100 font-black text-slate-600">×</button>
          <div className="flex items-start gap-3 pr-8">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue-50 text-2xl">👨‍🏫</div>
            <div>
              <p className="text-lg font-black text-slate-950">Mustafa Hoca</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">Bugün hangi dersten çalışmak istersin?</p>
            </div>
          </div>
          <a href="#subjects" className="mt-3 inline-flex rounded-full bg-blue-600 px-4 py-2.5 text-sm font-black text-white">Yardım Al</a>
        </aside>
      )}

      <footer id="footer" className="bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <a href="#home" className="text-2xl font-black">e-kurs.com</a>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">e-kurs.com – K12 öğrencileri için ders, test, ödev yardımı ve güvenli öğrenme sistemi.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {footerLinks.map(([label, href]) => (
              <a key={label} href={href} className="rounded-2xl bg-white/5 px-4 py-3 font-bold text-slate-300 transition hover:bg-white/10 hover:text-white">{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
