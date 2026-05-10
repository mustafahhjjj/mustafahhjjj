"use client";

import { useState } from "react";

const featuredSubjects = [
  { name: "Matematik", icon: "➗", color: "bg-blue-600", tint: "bg-blue-50", text: "Problem çözme, kesirler ve sınav pratiği", href: "/pages/dersler.html#matematik" },
  { name: "Türkçe", icon: "📖", color: "bg-rose-500", tint: "bg-rose-50", text: "Okuma, dil bilgisi ve paragrafta anlam", href: "/pages/dersler.html#turkce" },
  { name: "Fen Bilimleri", icon: "🔬", color: "bg-emerald-500", tint: "bg-emerald-50", text: "Hücre, madde, kuvvet ve deney mantığı", href: "/pages/dersler.html#fen" },
  { name: "Sosyal Bilgiler", icon: "🌍", color: "bg-cyan-500", tint: "bg-cyan-50", text: "Harita, tarih, vatandaşlık ve toplum", href: "/pages/dersler.html#sosyal" },
  { name: "İngilizce", icon: "💬", color: "bg-amber-500", tint: "bg-amber-50", text: "Kelime, okuma ve dinleme pratikleri", href: "/pages/dersler.html#ingilizce" },
];

const gradeNumbers = Array.from({ length: 12 }, (_, index) => index + 1);

const audienceCards = [
  { title: "Öğrenciler İçin", icon: "🧑‍🎓", href: "/pages/ogrenci.html", text: "Kendi hızında öğren, anında geri bildirim al ve başarını rozetlerle kutla." },
  { title: "Veliler İçin", icon: "👨‍👩‍👧", href: "/pages/veli.html", text: "Çocuğunuzun gelişimini gerçek zamanlı takip edin, zayıf yönlerini yapay zeka ile güçlendirin." },
  { title: "Öğretmenler/Okullar İçin", icon: "👩‍🏫", href: "/pages/ogretmen.html", text: "Sınıf analizlerini tek ekranda görün, müfredata uygun akıllı ödevleri saniyeler içinde atayın." },
];

const rewards = ["Başarı Sertifikası", "Günlük Seri Rozeti", "Konu Ustalığı", "Sanal Kupa"];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f9ff] text-slate-900">
      <header id="top" className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur">
        <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Ana menü">
          <a href="#top" className="flex items-center gap-3 text-2xl font-black tracking-tight" aria-label="e-kurs.com ana sayfa">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">e</span>
            <span>e-kurs.com</span>
          </a>

          <div className="hidden items-center gap-2 lg:flex">
            <div className="group relative">
              <a href="#icerik-haritasi" className="rounded-full px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">Dersler ▾</a>
              <div className="invisible absolute left-0 top-full w-[560px] translate-y-3 rounded-[2rem] border border-slate-200 bg-white p-5 opacity-0 shadow-2xl shadow-slate-200 transition group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
                <div className="grid grid-cols-5 gap-3">
                  {featuredSubjects.map((subject) => (
                    <a key={subject.name} href={subject.href} className="rounded-3xl border border-slate-100 p-4 text-center transition hover:-translate-y-1 hover:shadow-lg">
                      <span className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl text-2xl ${subject.tint}`}>{subject.icon}</span>
                      <span className="mt-3 block text-sm font-black">{subject.name}</span>
                      <span className="mt-3 grid grid-cols-3 gap-1 text-[10px] font-bold text-slate-500">
                        <span>1-4</span><span>5-8</span><span>9-12</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <a href="/pages/veli.html" className="rounded-full px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">Aileler</a>
            <a href="/pages/ogretmen.html" className="rounded-full px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">Eğitimciler</a>
            <a href="/pages/ogretmen.html#kurumlar" className="rounded-full px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">Okullar/Kurumlar</a>
            <a href="#analitik" className="rounded-full px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">Yapay Zeka</a>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="/giris.html" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5">Giriş Yap / Üye Ol</a>
          </div>

          <button type="button" className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white text-blue-700 lg:hidden" aria-controls="mobil-menu" aria-expanded={mobileOpen} aria-label="Menüyü aç veya kapat" onClick={() => setMobileOpen((value) => !value)}>
            <span className="space-y-1.5" aria-hidden="true"><span className="block h-0.5 w-6 rounded bg-current" /><span className="block h-0.5 w-6 rounded bg-current" /><span className="block h-0.5 w-6 rounded bg-current" /></span>
          </button>
        </nav>
        {mobileOpen && (
          <div id="mobil-menu" className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {[
                ["Dersler", "#icerik-haritasi"],
                ["Aileler", "/pages/veli.html"],
                ["Eğitimciler", "/pages/ogretmen.html"],
                ["Okullar/Kurumlar", "/pages/ogretmen.html#kurumlar"],
                ["Yapay Zeka", "#analitik"],
              ].map(([item, href]) => <a key={item} href={href} className="rounded-2xl bg-slate-50 px-4 py-3 font-black text-slate-700">{item}</a>)}
              <a href="/giris.html" className="rounded-2xl bg-blue-600 px-4 py-3 text-center font-black text-white">Giriş Yap / Üye Ol</a>
            </div>
          </div>
        )}
      </header>

      <section className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_35%),radial-gradient(circle_at_80%_20%,#dcfce7,transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-blue-700 shadow-sm">MEB müfredatına uyumlu K-12 beceri platformu</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">K-12 Eğitiminde Yapay Zeka Destekli Kişiselleştirilmiş Öğrenme</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Kesirler, Hücre, Paragrafta Anlam gibi kazanımları ara; e-kurs yapay zekası seviyeni anlasın ve sana özel çalışma rotası oluştursun.</p>
            <form className="mt-8 flex max-w-3xl flex-col gap-3 rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-blue-100 sm:flex-row" role="search">
              <label htmlFor="skill-search" className="sr-only">Kazanım veya konu ara</label>
              <input id="skill-search" type="search" placeholder="Kesirler, Hücre, Paragrafta Anlam..." className="min-h-14 flex-1 rounded-2xl px-5 text-base font-semibold outline-none focus:ring-4 focus:ring-blue-100" />
              <button className="rounded-2xl bg-blue-600 px-7 py-4 font-black text-white transition hover:bg-blue-700" type="submit">Beceri Ara</button>
            </form>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="/pages/beceriler.html" className="rounded-full bg-emerald-500 px-7 py-4 text-center font-black text-white shadow-lg shadow-emerald-100 transition hover:-translate-y-0.5">Hemen Başla</a>
              <a href="#icerik-haritasi" className="rounded-full bg-white px-7 py-4 text-center font-black text-blue-700 shadow-sm ring-1 ring-slate-200">Sınıf/Ders Izgarasını Gör</a>
            </div>
          </div>
          <div className="rounded-[2.5rem] border border-white bg-white/80 p-6 shadow-2xl shadow-blue-100">
            <div className="rounded-[2rem] bg-slate-900 p-5 text-white">
              <div className="flex items-center justify-between"><span className="font-black">Canlı öğrenme rotası</span><span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-slate-900">AI aktif</span></div>
              <div className="mt-6 space-y-4">
                {["Seviye tespiti", "Eksik kazanım", "Akıllı pratik", "Başarı rozeti"].map((step, index) => <div key={step} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-sm font-black text-blue-700">{index + 1}</span><div className="flex-1"><p className="font-black">{step}</p><div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-emerald-400" style={{ width: `${45 + index * 15}%` }} /></div></div></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="icerik-haritasi" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><p className="font-black text-blue-700">IXL tarzı içerik haritası</p><h2 className="mt-2 text-3xl font-black sm:text-5xl">Dersini seç, sınıfını aç, beceri ağacına başla</h2></div>
            <div className="rounded-[2rem] bg-blue-50 px-6 py-4 text-blue-800"><strong className="text-3xl font-black">5.000+</strong><span className="ml-2 font-bold">yapay zeka destekli interaktif soru</span></div>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-5">
            {featuredSubjects.map((subject) => (
              <article key={subject.name} className={`rounded-[2rem] border border-slate-100 ${subject.tint} p-5 shadow-sm`}>
                <div className={`grid h-14 w-14 place-items-center rounded-2xl text-3xl text-white ${subject.color}`}>{subject.icon}</div>
                <h3 className="mt-4 text-2xl font-black">{subject.name}</h3>
                <p className="mt-2 min-h-12 text-sm font-semibold text-slate-600">{subject.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
            {gradeNumbers.map((grade) => (
              <a key={grade} href={`/pages/sinif-${grade}.html`} className="group aspect-square min-h-24 rounded-3xl border border-slate-200 bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100">
                <span className="grid h-full place-items-center rounded-2xl bg-slate-50 transition group-hover:bg-blue-600 group-hover:text-white">
                  <span><strong className="block text-3xl font-black">{grade}</strong><span className="mt-1 block text-xs font-black">Sınıf</span></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f9ff] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center"><p className="font-black text-emerald-600">Kime ne sunar?</p><h2 className="mt-2 text-3xl font-black sm:text-5xl">Her hedef kitle için net değer</h2></div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {audienceCards.map((card) => <a key={card.title} href={card.href} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-100 transition hover:-translate-y-1"><span className="text-5xl">{card.icon}</span><h3 className="mt-5 text-2xl font-black">{card.title}</h3><p className="mt-3 leading-7 text-slate-600">{card.text}</p><span className="mt-5 inline-flex font-black text-blue-700">Özel sayfaya git →</span></a>)}
          </div>
        </div>
      </section>

      <section id="analitik" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div><p className="font-black text-violet-600">Sürekli teşhis ve analiz</p><h2 className="mt-2 text-3xl font-black sm:text-5xl">E-kurs yapay zekası öğrencinin seviyesini anlar</h2><p className="mt-5 text-lg leading-8 text-slate-600">Yanıt süreleri, doğru-yanlış örüntüleri ve kazanım geçmişi birlikte analiz edilir; öğrenciye tam ihtiyacı olan özel çalışma rotası çizilir.</p></div>
          <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-2xl shadow-violet-100">
            <div className="grid gap-4 sm:grid-cols-3">
              {["Tanı", "Öneri", "Gelişim"].map((item, index) => <div key={item} className="rounded-3xl bg-white/10 p-5"><div className="text-3xl font-black text-emerald-300">0{index + 1}</div><h3 className="mt-3 text-xl font-black">{item}</h3><p className="mt-2 text-sm text-slate-300">Veri akışı sürekli güncellenir.</p></div>)}
            </div>
            <div className="mt-6 flex h-44 items-end gap-3 rounded-3xl bg-white/5 p-5">
              {[35, 52, 48, 66, 74, 88].map((height, index) => <span key={height} className="flex-1 rounded-t-2xl bg-gradient-to-t from-blue-500 to-emerald-300" style={{ height: `${height}%`, animationDelay: `${index * 120}ms` }} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-white p-8 shadow-xl shadow-amber-100 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="font-black text-amber-600">Motivasyon ve oyunlaştırma</p><h2 className="mt-2 text-3xl font-black sm:text-5xl">Başarıyı görünür ve eğlenceli hale getir</h2><p className="mt-5 text-lg leading-8 text-slate-600">Sertifikalar, rozetler ve sanal ödüller özellikle küçük yaş gruplarında düzenli pratik alışkanlığını güçlendirir.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{rewards.map((reward) => <div key={reward} className="rounded-3xl bg-amber-50 p-6 text-center"><div className="text-5xl">🏅</div><h3 className="mt-4 font-black">{reward}</h3></div>)}</div></div>
        </div>
      </section>

      <footer className="bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div><a href="#top" className="text-2xl font-black">e-kurs.com</a><p className="mt-4 max-w-xl text-slate-300">MEB müfredatına %100 uyumlu, mobil cihazlarda sorunsuz çalışan K-12 yapay zeka destekli öğrenme platformu.</p><p className="mt-3 font-black text-emerald-300">Destek • İletişim • Gizlilik • Kullanıcı Sözleşmesi • Mobil Uyumlu</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[ ["Destek", "/pages/iletisim.html"], ["İletişim", "/pages/iletisim.html"], ["Gizlilik Politikası", "/pages/gizlilik-politikasi.html"], ["Kullanıcı Sözleşmesi", "/pages/kullanim-sartlari.html"], ["Aileler", "/pages/veli.html"], ["Eğitimciler", "/pages/ogretmen.html"] ].map(([label, href]) => <a key={label} href={href} className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-bold text-slate-300 hover:text-white">{label}</a>)}
          </div>
        </div>
      </footer>
    </main>
  );
}
