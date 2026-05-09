const grades = Array.from({ length: 12 }, (_, index) => index + 1);

const subjects = [
  "Matematik",
  "Türkçe",
  "Fen Bilimleri",
  "Sosyal Bilgiler",
  "Hayat Bilgisi",
  "İngilizce",
  "Din Kültürü",
  "İnkılap Tarihi",
  "Fizik",
  "Kimya",
  "Biyoloji",
  "Tarih",
  "Coğrafya",
  "Edebiyat",
];

const stats = [
  ["12.000+", "beceri"],
  ["8M+", "çözülen soru"],
  ["1–12.", "sınıf içerik"],
  ["3 panel", "öğrenci, veli ve öğretmen paneli"],
];

const features = [
  ["Konu anlatımı", "Kısa, anlaşılır ve sınıf seviyesine uygun anlatımlarla yeni beceriler öğrenilir."],
  ["Soru çözümü", "Adım adım çözüm yaklaşımıyla öğrencinin hatası görünür ve sonraki çalışma netleşir."],
  ["Deneme sınavı", "Süreli denemeler, kazanım analizi ve gelişim raporu ile sınav hazırlığı desteklenir."],
  ["Gelişim takibi", "Öğrenci, veli ve öğretmen panelleri ilerlemeyi düzenli ve anlaşılır şekilde gösterir."],
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3 font-nunito text-2xl font-black tracking-tight text-slate-950" aria-label="e-kurs ana sayfa">
      <span className="grid size-11 place-items-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-lg shadow-blue-500/10" aria-hidden="true">
        <span className="size-6 rounded-full border-[6px] border-blue-600 border-r-emerald-500" />
      </span>
      <span>e-kurs</span>
    </a>
  );
}

function Header() {
  return (
    <header id="top" className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto grid min-h-[76px] w-[min(1200px,calc(100%-40px))] grid-cols-[auto_1fr_auto] items-center gap-7 max-lg:grid-cols-[1fr] max-lg:py-4" aria-label="Ana menü">
        <Logo />
        <div className="flex items-center justify-center gap-8 text-base font-extrabold text-slate-600 max-lg:flex-wrap max-lg:justify-start max-lg:gap-3">
          <a className="hover:text-blue-600" href="#ogrenme">Öğrenme</a>
          <a className="hover:text-blue-600" href="#siniflar">Sınıflar</a>
          <a className="hover:text-blue-600" href="#dersler">Dersler</a>
          <a className="hover:text-blue-600" href="#ogretmen">Öğretmen</a>
          <a className="hover:text-blue-600" href="#veli">Veli</a>
          <a className="hover:text-blue-600" href="#analiz">Analiz</a>
        </div>
        <div className="flex items-center justify-end gap-3 max-lg:justify-start">
          <a className="rounded-full border border-blue-100 bg-blue-50 px-5 py-3 font-black text-blue-700" href="/pages/ogrenci-panel.html">Giriş yap</a>
          <a className="rounded-full bg-gradient-to-br from-amber-500 to-orange-500 px-5 py-3 font-black text-white shadow-xl shadow-amber-500/25" href="#basla">Ücretsiz başla</a>
        </div>
      </nav>
    </header>
  );
}

function StudentPanel() {
  return (
    <aside className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white/90 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur" aria-label="Öğrenci çalışma paneli önizlemesi">
      <div className="absolute -right-20 -top-20 size-56 rounded-full bg-blue-100" aria-hidden="true" />
      <div className="relative flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
        <div className="flex items-center gap-3">
          <span className="size-14 rounded-2xl border-[8px] border-blue-600 border-r-emerald-500 bg-white shadow-lg shadow-blue-500/15" aria-hidden="true" />
          <div>
            <p className="text-sm font-extrabold text-slate-500">Öğrenci kartı</p>
            <strong className="text-lg text-slate-950">Ece • 5. Sınıf</strong>
          </div>
        </div>
        <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-800">7 gün seri</span>
      </div>
      <div className="relative mt-6 rounded-[1.6rem] bg-gradient-to-br from-blue-600 to-violet-600 p-6 text-white shadow-xl shadow-blue-600/20">
        <p className="font-extrabold text-white/80">Bugünkü hedef</p>
        <strong className="mt-2 block text-4xl font-black">20 soru</strong>
        <span className="mt-3 block font-bold leading-7 text-white/80">Kısa konu anlatımı, ölçme ve anında geri bildirim ile tamamlanır.</span>
      </div>
      <div className="mt-5 grid gap-4">
        {[ ["Matematik", "78%", "w-[78%]"], ["Türkçe", "64%", "w-[64%]"] ].map(([lesson, percent, width], index) => (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5" key={lesson}>
            <div className="mb-3 flex items-center justify-between font-black"><span>{lesson}</span><span className={index === 0 ? "text-blue-600" : "text-violet-600"}>{percent}</span></div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200"><span className={`block h-full rounded-full ${width} ${index === 0 ? "bg-gradient-to-r from-emerald-500 to-blue-600" : "bg-gradient-to-r from-amber-500 to-violet-600"}`} /></div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><strong className="block text-3xl font-black">42</strong><p className="mt-1 font-extrabold text-slate-500">Çözülen soru</p></div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><strong className="block text-3xl font-black">5</strong><p className="mt-1 font-extrabold text-slate-500">Ders önerisi</p></div>
      </div>
      <div className="mt-5 flex items-center gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-5 max-sm:flex-col max-sm:items-start">
        <span className="size-11 rounded-full bg-[conic-gradient(from_18deg,#f59e0b,#facc15,#f59e0b,#f97316,#f59e0b)] shadow-inner shadow-amber-200" aria-hidden="true" />
        <div><strong>Haftanın yıldızı</strong><p className="mt-1 font-semibold text-slate-600">Rozet, düzenli çalışma serisiyle kazanıldı.</p></div>
      </div>
    </aside>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="ogrenme" className="relative overflow-hidden bg-[radial-gradient(circle_at_16%_16%,rgba(37,99,235,.14),transparent_26rem),radial-gradient(circle_at_78%_18%,rgba(124,58,237,.12),transparent_24rem),radial-gradient(circle_at_72%_88%,rgba(245,158,11,.18),transparent_22rem),linear-gradient(135deg,#eef6ff_0%,#f8fafc_48%,#fff7ed_100%)] py-20">
          <div className="mx-auto grid w-[min(1200px,calc(100%-40px))] grid-cols-[1.04fr_.86fr] items-center gap-14 max-lg:grid-cols-1">
            <div>
              <span className="inline-flex rounded-full border border-violet-200 bg-white/85 px-4 py-2 text-sm font-black text-violet-800 shadow-lg shadow-slate-900/5">1. sınıftan 12. sınıfa Türkiye’ye uygun öğrenme</span>
              <h1 className="mt-6 max-w-3xl text-[clamp(2.125rem,5.5vw,4rem)] font-black leading-none tracking-[-0.065em] text-slate-950">Her öğrenci için kişiye özel dijital öğretmen</h1>
              <p className="mt-6 max-w-2xl text-xl font-semibold leading-9 text-slate-600">e-kurs; 1. sınıftan 12. sınıfa kadar öğrencilerin seviyesine göre konu anlatımı, soru çözümü, ödev desteği, deneme sınavı ve gelişim takibi sunan akıllı öğrenme platformudur.</p>
              <div className="mt-8 flex flex-wrap gap-3 max-sm:flex-col">
                <a className="rounded-full bg-gradient-to-br from-amber-500 to-orange-500 px-7 py-4 text-center font-black text-white shadow-xl shadow-amber-500/25" href="#basla">Ücretsiz başla</a>
                <a className="rounded-full bg-gradient-to-br from-blue-600 to-violet-600 px-7 py-4 text-center font-black text-white shadow-xl shadow-blue-600/20" href="#siniflar">Sınıfını seç</a>
                <a className="rounded-full border border-emerald-200 bg-emerald-100 px-7 py-4 text-center font-black text-emerald-800" href="#dersler">Dersleri keşfet</a>
              </div>
            </div>
            <StudentPanel />
          </div>
        </section>

        <section className="bg-white py-9" aria-label="e-kurs istatistikleri">
          <div className="mx-auto grid w-[min(1200px,calc(100%-40px))] grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {stats.map(([value, label]) => <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5" key={value}><strong className="block text-3xl font-black tracking-tight text-blue-600">{value}</strong><p className="mt-2 font-extrabold text-slate-600">{label}</p></article>)}
          </div>
        </section>

        <section id="siniflar" className="bg-white py-20">
          <div className="mx-auto w-[min(1200px,calc(100%-40px))]">
            <div className="mx-auto max-w-3xl text-center max-sm:text-left"><span className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-black text-violet-800 shadow">Sınıf seçimi</span><h2 className="mt-5 text-5xl font-black tracking-tight text-slate-950 max-sm:text-4xl">Her sınıf için hazır beceriler</h2></div>
            <div className="mt-10 grid grid-cols-3 gap-5 max-lg:grid-cols-1">
              {[ ["İlkokul", grades.slice(0, 4)], ["Ortaokul", grades.slice(4, 8)], ["Lise", grades.slice(8)] ].map(([group, items]) => (
                <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5" key={String(group)}>
                  <h3 className="text-2xl font-black">{String(group)}</h3>
                  <div className="mt-5 grid grid-cols-2 gap-3 max-sm:grid-cols-1">{(items as number[]).map((grade) => <a className="grid min-h-20 place-items-center rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white font-black text-blue-700 shadow" href={`/pages/sinif-${grade}.html`} key={grade}>{grade}. sınıf</a>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="dersler" className="bg-slate-50 py-20">
          <div className="mx-auto w-[min(1200px,calc(100%-40px))]">
            <div className="mx-auto max-w-3xl text-center max-sm:text-left"><span className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-black text-violet-800 shadow">Dersler</span><h2 className="mt-5 text-5xl font-black tracking-tight text-slate-950 max-sm:text-4xl">Tek platformda tüm temel dersler</h2></div>
            <div className="mt-10 grid grid-cols-4 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">{subjects.map((subject) => <article className="min-h-28 rounded-3xl border border-slate-200 bg-white p-6 font-black shadow-lg shadow-slate-900/5" key={subject}>{subject}</article>)}</div>
          </div>
        </section>

        <section id="analiz" className="bg-white py-20">
          <div className="mx-auto w-[min(1200px,calc(100%-40px))]">
            <div className="mx-auto max-w-3xl text-center max-sm:text-left"><span className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-black text-violet-800 shadow">Akıllı öğrenme akışı</span><h2 className="mt-5 text-5xl font-black tracking-tight text-slate-950 max-sm:text-4xl">Dolu, anlaşılır ve güven veren öğrenme deneyimi</h2></div>
            <div className="mt-10 grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">{features.map(([title, text]) => <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5" key={title}><h3 className="text-xl font-black">{title}</h3><p className="mt-3 font-semibold leading-7 text-slate-600">{text}</p></article>)}</div>
          </div>
        </section>

        <section id="basla" className="bg-slate-50 py-20">
          <div className="mx-auto w-[min(1200px,calc(100%-40px))]">
            <div className="mx-auto max-w-3xl text-center max-sm:text-left"><span className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-black text-violet-800 shadow">Paneller</span><h2 className="mt-5 text-5xl font-black tracking-tight text-slate-950 max-sm:text-4xl">Öğrenci, veli ve öğretmen için ayrı deneyim</h2></div>
            <div className="mt-10 grid grid-cols-3 gap-5 max-lg:grid-cols-1">
              {[ ["Öğrenci için", "Günlük hedefler, seviyeye göre öğrenme, soru çözümü ve rozetlerle düzenli çalışma alışkanlığı.", "/pages/ogrenci.html", "Öğrenci panelini incele", "ogrenci"], ["Veli için", "Çözülen soru, eksik konular, ödev durumu ve haftalık gelişim raporları tek ekranda.", "/pages/veli.html", "Veli panelini incele", "veli"], ["Öğretmen için", "Sınıf takibi, ödev planlama, kazanım raporu ve öğrenciye özel çalışma planı yönetimi.", "/pages/ogretmen.html", "Öğretmen panelini incele", "ogretmen"] ].map(([title, text, href, cta, id]) => <article id={id} className="flex min-h-72 flex-col rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5" key={title}><h3 className="text-2xl font-black">{title}</h3><p className="mt-3 font-semibold leading-7 text-slate-600">{text}</p><a className="mt-auto rounded-full bg-blue-600 px-5 py-3 text-center font-black text-white" href={href}>{cta}</a></article>)}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-white py-8"><div className="mx-auto flex w-[min(1200px,calc(100%-40px))] items-center justify-between gap-6 max-sm:flex-col max-sm:items-start"><Logo /><nav className="flex flex-wrap gap-6 font-extrabold text-slate-600"><a href="#siniflar">Sınıflar</a><a href="#dersler">Dersler</a><a href="/pages/gizlilik-politikasi.html">Gizlilik</a><a href="/pages/iletisim.html">İletişim</a></nav></div></footer>
    </>
  );
}
