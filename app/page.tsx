"use client";

import { useState } from "react";

const navItems = [
  ["Öğrenme", "#ogrenme"],
  ["Değerlendirme", "#degerlendirme"],
  ["Analitik", "#analitik"],
  ["Sınıflar", "#siniflar"],
  ["Öğretmenler", "/ogretmen.html"],
  ["Veliler", "/veli.html"],
];

const features = [
  { title: "Kapsamlı K–12 müfredatı", text: "1. sınıftan 12. sınıfa kadar ders, ünite, beceri ve testler.", icon: "📚", color: "bg-[#2457C5]" },
  { title: "Öğrenciye özel pratik", text: "Doğru-yanlış durumuna göre seviyeye uygun yeni sorular.", icon: "🎯", color: "bg-[#39B54A]" },
  { title: "Veli ve öğretmen takibi", text: "Ödevler, gelişim grafikleri ve sınıf performansı tek panelde.", icon: "📊", color: "bg-[#7C4DFF]" },
];

const gradeCards = [
  { name: "Okul Öncesi", label: "Pre", lessons: 4, skills: 220, href: "/sinif/okul-oncesi.html" },
  { name: "Anaokulu", label: "K", lessons: 5, skills: 310, href: "/sinif/anaokulu.html" },
  ...Array.from({ length: 12 }, (_, index) => {
    const grade = index + 1;
    const skills = [350, 410, 455, 520, 585, 640, 690, 745, 610, 575, 540, 505][index];
    const lessons = grade <= 4 ? 6 : grade <= 8 ? 8 : 10;
    return { name: `${grade}. Sınıf`, label: String(grade), lessons, skills, href: `/sinif/${grade}.html` };
  }),
];

const subjects = [
  { name: "Matematik", icon: "➗", text: "Problem çözme, işlemler ve sınav pratiği.", href: "/ders/matematik.html", color: "text-[#2457C5] bg-blue-50" },
  { name: "Türkçe", icon: "📖", text: "Okuma, dil bilgisi ve paragraf becerileri.", href: "/ders/turkce.html", color: "text-[#7C4DFF] bg-violet-50" },
  { name: "Fen Bilimleri", icon: "🔬", text: "Deney mantığı, ünite testleri ve kavramlar.", href: "/ders/fen-bilimleri.html", color: "text-[#39B54A] bg-green-50" },
  { name: "Sosyal Bilgiler", icon: "🌍", text: "Harita, vatandaşlık ve toplum konuları.", href: "/ders/sosyal-bilgiler.html", color: "text-[#00A6D6] bg-cyan-50" },
  { name: "İngilizce", icon: "💬", text: "Kelime, okuma ve dinleme odaklı pratik.", href: "/ders/ingilizce.html", color: "text-[#FFB020] bg-amber-50" },
  { name: "Hayat Bilgisi", icon: "🌱", text: "Günlük yaşam ve temel kavram becerileri.", href: "/ders/hayat-bilgisi.html", color: "text-[#39B54A] bg-green-50" },
  { name: "Din Kültürü", icon: "🤝", text: "Değerler, kavramlar ve konu tekrarları.", href: "/ders/din-kulturu.html", color: "text-[#7C4DFF] bg-violet-50" },
  { name: "Tarih", icon: "🏛️", text: "Kronoloji, olay ve yorumlama çalışmaları.", href: "/ders/tarih.html", color: "text-[#FFB020] bg-orange-50" },
  { name: "Coğrafya", icon: "🧭", text: "Konum, bölge ve grafik okuma becerileri.", href: "/ders/cografya.html", color: "text-[#00A6D6] bg-cyan-50" },
  { name: "Fizik", icon: "⚡", text: "Kuvvet, enerji ve sayısal uygulamalar.", href: "/ders/fizik.html", color: "text-[#2457C5] bg-blue-50" },
  { name: "Kimya", icon: "🧪", text: "Madde, tepkime ve laboratuvar mantığı.", href: "/ders/kimya.html", color: "text-[#39B54A] bg-green-50" },
  { name: "Biyoloji", icon: "🧬", text: "Canlılar, sistemler ve görsel tekrarlar.", href: "/ders/biyoloji.html", color: "text-[#7C4DFF] bg-violet-50" },
];

const skillSteps = ["Konu anlatımı", "Alıştırma", "Ünite testi", "Deneme sınavı", "Ödül", "Liderlik yarışı"];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7FAFF] font-sans text-[#1F2937]">
      <header className="sticky top-0 z-50 border-b border-[#EEF2F7] bg-white/95 shadow-[0_10px_30px_rgba(31,41,55,0.08)] backdrop-blur" id="top">
        <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Ana menü">
          <a href="#top" className="flex shrink-0 items-center gap-3 text-2xl font-black tracking-tight text-[#1F2937]" aria-label="e-kurs.com ana sayfa">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#2457C5] text-white shadow-lg shadow-blue-200">e</span>
            <span>e-kurs.com</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="rounded-full px-3 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-blue-50 hover:text-[#2457C5]">{label}</a>
            ))}
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            <form className="relative" role="search">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
              <input className="h-11 w-52 rounded-full border border-[#EEF2F7] bg-[#F7FAFF] pl-9 pr-4 text-sm font-semibold outline-none transition focus:border-[#00A6D6] focus:ring-4 focus:ring-cyan-100" type="search" placeholder="Beceri ara" aria-label="Beceri ara" />
            </form>
            <a href="/giris.html" className="rounded-full px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-100">Giriş Yap</a>
            <a href="#siniflar" className="rounded-full bg-[#2457C5] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-[#1d46a8]">Ücretsiz Başla</a>
          </div>

          <button type="button" className="grid h-12 w-12 place-items-center rounded-2xl border border-[#EEF2F7] bg-white text-[#2457C5] shadow-sm lg:hidden" aria-controls="mobil-menu" aria-expanded={mobileOpen} aria-label="Menüyü aç veya kapat" onClick={() => setMobileOpen((value) => !value)}>
            <span className="space-y-1.5" aria-hidden="true"><span className="block h-0.5 w-6 rounded bg-current" /><span className="block h-0.5 w-6 rounded bg-current" /><span className="block h-0.5 w-6 rounded bg-current" /></span>
          </button>
        </nav>
        <div id="mobil-menu" className={`${mobileOpen ? "block" : "hidden"} border-t border-[#EEF2F7] bg-white lg:hidden`}>
          <div className="mx-auto grid max-w-7xl gap-2 px-4 py-4 sm:grid-cols-2">
            {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)} className="rounded-2xl bg-[#F7FAFF] px-4 py-3 font-black text-slate-700">{label}</a>)}
            <a href="/giris.html" className="rounded-2xl border border-[#EEF2F7] px-4 py-3 text-center font-black">Giriş Yap</a>
            <a href="#siniflar" className="rounded-2xl bg-[#2457C5] px-4 py-3 text-center font-black text-white">Hemen Başla</a>
          </div>
        </div>
      </header>

      <section className="relative bg-white" id="ogrenme">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#2457C5]">Kişiselleştirilmiş öğrenme • Akıllı pratik • K–12</p>
            <h1 className="mt-6 max-w-3xl text-[2.45rem] font-black leading-[1.04] tracking-tight text-[#1F2937] sm:text-6xl lg:text-[64px]">Her öğrenci için kişiye özel öğrenme</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">e-kurs.com; 1. sınıftan 12. sınıfa kadar öğrencilerin seviyesine göre ilerleyen akıllı pratikler, testler, konu anlatımları ve gelişim takibi sunar.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#siniflar" className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#2457C5] px-8 text-lg font-black text-white shadow-xl shadow-blue-200 transition hover:-translate-y-1">Hemen Başla</a>
              <a href="#siniflar" className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#2457C5]/25 bg-white px-8 text-lg font-black text-[#2457C5] shadow-sm">Sınıfını Seç</a>
              <a href="/ogretmen.html" className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#FFB020] px-8 text-lg font-black text-white shadow-xl shadow-amber-100">Öğretmen Paneli</a>
            </div>
          </div>

          <div className="relative mx-auto min-h-[410px] w-full max-w-[560px] rounded-[2.5rem] border border-[#EEF2F7] bg-[#F7FAFF] p-5 shadow-2xl shadow-blue-100" aria-label="Tablet kullanan öğrenci, ders ikonları, yıldızlar ve gelişim grafiği illüstrasyonu" role="img">
            <div className="absolute left-8 top-8 h-16 w-16 rounded-3xl bg-[#00A6D6]/15" />
            <div className="absolute right-8 top-10 grid h-14 w-14 place-items-center rounded-full bg-white text-2xl shadow-lg">⭐</div>
            <div className="absolute bottom-8 right-12 grid h-16 w-16 place-items-center rounded-3xl bg-white text-3xl shadow-lg">🏆</div>
            <div className="absolute left-8 top-28 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#2457C5] shadow-lg">Matematik</div>
            <div className="absolute right-6 top-28 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#39B54A] shadow-lg">Fen</div>
            <div className="absolute bottom-28 left-6 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#7C4DFF] shadow-lg">Türkçe</div>
            <div className="absolute bottom-28 right-20 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#FFB020] shadow-lg">İngilizce</div>
            <div className="absolute left-1/2 top-16 h-44 w-44 -translate-x-1/2 rounded-full bg-[#FFB020]/20" />
            <div className="absolute left-1/2 top-24 h-20 w-20 -translate-x-1/2 rounded-full bg-[#ffd59a] shadow-inner" />
            <div className="absolute left-1/2 top-44 h-36 w-44 -translate-x-1/2 rounded-t-[4rem] bg-[#2457C5]" />
            <div className="absolute left-1/2 top-60 h-28 w-64 -translate-x-1/2 rounded-[2rem] border-8 border-white bg-[#1F2937] shadow-2xl">
              <div className="m-4 grid h-16 grid-cols-4 items-end gap-2 rounded-2xl bg-white p-3">
                {[35, 55, 42, 76].map((height, index) => <span key={index} className="rounded-t bg-[#39B54A]" style={{ height: `${height}%` }} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFF] px-4 py-12 sm:px-6 lg:px-8" id="degerlendirme">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {features.map((feature) => <article key={feature.title} className="rounded-[2rem] border border-[#EEF2F7] bg-white p-7 shadow-lg shadow-slate-200/60"><div className={`grid h-16 w-16 place-items-center rounded-3xl ${feature.color} text-3xl text-white shadow-lg`}>{feature.icon}</div><h2 className="mt-6 text-2xl font-black">{feature.title}</h2><p className="mt-3 leading-7 text-slate-600">{feature.text}</p></article>)}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8" id="siniflar">
        <div className="mx-auto max-w-7xl">
          <div className="text-center"><p className="font-black text-[#2457C5]">Sınıf seçimi</p><h2 className="mt-2 text-3xl font-black sm:text-5xl">Okul öncesinden 12. sınıfa kadar</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">Sınıfını seç, derslere ve becerilere hemen başla.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {gradeCards.map((grade, index) => <article key={grade.name} className="overflow-hidden rounded-3xl border border-[#EEF2F7] bg-white shadow-lg shadow-slate-100 transition hover:-translate-y-1 hover:shadow-blue-100"><div className={`h-2 ${["bg-[#2457C5]", "bg-[#00A6D6]", "bg-[#39B54A]", "bg-[#FFB020]", "bg-[#7C4DFF]"][index % 5]}`} /><div className="p-5"><div className="text-4xl font-black text-[#2457C5]">{grade.label}</div><h3 className="mt-2 text-xl font-black">{grade.name}</h3><dl className="mt-4 grid grid-cols-2 gap-2 text-sm"><div className="rounded-2xl bg-[#F7FAFF] p-3"><dt className="font-bold text-slate-500">Ders</dt><dd className="font-black">{grade.lessons}</dd></div><div className="rounded-2xl bg-[#F7FAFF] p-3"><dt className="font-bold text-slate-500">Beceri</dt><dd className="font-black">{grade.skills}</dd></div></dl><a href={grade.href} className="mt-5 inline-flex w-full justify-center rounded-full bg-[#2457C5] px-5 py-3 font-black text-white">Başla</a></div></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFF] px-4 py-16 sm:px-6 lg:px-8" id="dersler">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-black text-[#39B54A]">Ders kataloğu</p><h2 className="mt-2 text-3xl font-black sm:text-5xl">Popüler dersler</h2></div><p className="max-w-xl text-lg text-slate-600">Renkli ders kartları, kısa konu anlatımı ve beceri odaklı çalışma akışlarıyla hızlı başlangıç sağlar.</p></div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subjects.map((subject) => <article key={subject.name} className="rounded-3xl border border-[#EEF2F7] bg-white p-6 shadow-lg shadow-slate-100"><div className={`grid h-14 w-14 place-items-center rounded-2xl text-3xl ${subject.color}`}>{subject.icon}</div><h3 className="mt-5 text-2xl font-black">{subject.name}</h3><p className="mt-2 min-h-12 text-slate-600">{subject.text}</p><a href={subject.href} className="mt-5 inline-flex rounded-full border border-[#2457C5]/20 px-5 py-3 font-black text-[#2457C5]">Derse Git</a></article>)}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8" id="analitik">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div><p className="font-black text-[#7C4DFF]">Beceri ve test sistemi</p><h2 className="mt-2 text-3xl font-black sm:text-5xl">Her ders, küçük becerilere ayrılır</h2><p className="mt-5 text-lg leading-8 text-slate-600">Öğrenci ünite ünite ilerler, her beceride test çözer, anında geri bildirim alır.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillSteps.map((step, index) => <div key={step} className="rounded-3xl border border-[#EEF2F7] bg-[#F7FAFF] p-6 shadow-sm"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl font-black text-[#2457C5] shadow-sm">{index + 1}</div><h3 className="mt-4 text-xl font-black">{step}</h3><p className="mt-2 text-sm leading-6 text-slate-600">Kısa, net ve tamamlanabilir adımlarla öğrenme yolu.</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFF] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {[{ title: "Öğrenci paneli", href: "/ogrenci.html", icon: "🧑‍🎓", text: "Günlük hedef, seri, rozet ve önerilen çalışmalar." }, { title: "Veli paneli", href: "/veli.html", icon: "👨‍👩‍👧", text: "Haftalık gelişim, eksik konular ve ödev takibi." }, { title: "Öğretmen paneli", href: "/ogretmen.html", icon: "👩‍🏫", text: "Sınıf performansı, ödevler ve kazanım raporları." }].map((panel) => <a key={panel.title} href={panel.href} className="rounded-[2rem] border border-[#EEF2F7] bg-white p-7 shadow-lg shadow-slate-100 transition hover:-translate-y-1"><span className="text-4xl">{panel.icon}</span><h2 className="mt-5 text-2xl font-black">{panel.title}</h2><p className="mt-3 leading-7 text-slate-600">{panel.text}</p><span className="mt-5 inline-flex font-black text-[#2457C5]">Paneli Aç →</span></a>)}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8" id="oduller">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#FFF7E8] p-8 shadow-lg shadow-amber-100 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><p className="font-black text-[#FFB020]">Ödül ve liderlik yarışı</p><h2 className="mt-2 text-3xl font-black sm:text-5xl">Başarıyı görünür ve eğlenceli hale getir</h2><p className="mt-5 text-lg leading-8 text-slate-600">Rozetler, puanlar, günlük seri ve sınıf içi liderlik listeleri öğrencilerin düzenli pratik alışkanlığı kazanmasına yardımcı olur.</p></div><div className="grid gap-4 sm:grid-cols-3">{["Günlük rozet", "Puan sistemi", "Liderlik sırası"].map((item) => <div key={item} className="rounded-3xl bg-white p-6 text-center shadow-sm"><div className="text-4xl">🏅</div><h3 className="mt-3 font-black">{item}</h3></div>)}</div></div>
        </div>
      </section>

      <footer className="bg-[#1F2937] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div><a href="#top" className="text-2xl font-black">e-kurs.com</a><p className="mt-4 max-w-xl text-slate-300">e-kurs.com – K–12 öğrencileri için ders, test, ödev yardımı ve kişiye özel öğrenme sistemi.</p></div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[ ["Hakkımızda", "/pages/hakkimizda.html"], ["İletişim", "/pages/iletisim.html"], ["Gizlilik", "/pages/gizlilik-politikasi.html"], ["Kullanım Şartları", "/pages/kullanim-sartlari.html"], ["Öğretmenler", "/ogretmen.html"], ["Veliler", "/veli.html"] ].map(([label, href]) => <a key={label} href={href} className="text-sm font-bold text-slate-300 hover:text-white">{label}</a>)}
          </div>
        </div>
      </footer>
    </main>
  );
}
