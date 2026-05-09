export function Hero() {
  const metrics = ["12.000+ beceri", "8M+ çözülen soru", "40K+ öğretmen"];
  const trust = ["Kişiselleştirilmiş öneriler", "Anlık seviye takibi", "Eğlenceli ödüller", "Standartlara uyumlu içerik"];
  return (
    <section className="relative overflow-hidden pb-12 pt-12 sm:pt-16 lg:pb-16">
      <div className="absolute right-10 top-10 size-64 rounded-full bg-cyan-200/30 blur-3xl" aria-hidden="true" />
      <div className="container-nova grid items-center gap-10 lg:grid-cols-[1.02fr_.98fr]">
        <div>
          <span className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">Kişiselleştirilmiş K–12 öğrenme platformu</span>
          <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Her öğrenci için doğru seviyede öğrenme</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">SkillNova; matematikten Türkçeye, fen bilimlerinden sosyal bilgilere kadar öğrencilerin seviyesine uyum sağlayan alıştırmalar, öneriler ve analizler sunar.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#cta" className="focus-nova rounded-full bg-emerald-500 px-7 py-4 text-center font-black text-white shadow-xl shadow-emerald-200 transition hover:bg-emerald-600">Ücretsiz başla</a><a href="#beceriler" className="focus-nova rounded-full border border-slate-200 bg-white px-7 py-4 text-center font-black text-slate-800 transition hover:border-sky-300 hover:text-sky-700">Becerileri keşfet</a></div>
          <dl className="mt-9 grid max-w-xl grid-cols-3 gap-3">{metrics.map((m) => <div key={m} className="rounded-2xl bg-white/80 p-4 shadow-sm"><dt className="text-2xl font-black text-slate-950">{m.split(" ")[0]}</dt><dd className="text-sm text-slate-500">{m.replace(m.split(" ")[0], "").trim()}</dd></div>)}</dl>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <span className="absolute -left-4 top-8 text-4xl" aria-hidden="true">✏️</span><span className="absolute -right-3 top-20 text-4xl" aria-hidden="true">📚</span><span className="absolute bottom-8 left-3 text-3xl" aria-hidden="true">⭐</span>
          <div className="glass relative rounded-[2rem] p-5 sm:p-7">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-emerald-50 to-sky-50 p-5">
              <div className="flex items-center justify-between"><div><p className="text-sm text-slate-500">Öğrenci</p><h2 className="text-2xl font-black text-slate-900">Ece</h2></div><div className="rounded-2xl bg-amber-100 px-4 py-2 font-black text-amber-700">5 gün seri!</div></div>
              <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm"><p className="text-sm font-bold text-slate-500">Bugünkü hedef</p><p className="mt-1 text-xl font-black text-slate-900">Kesirleri karşılaştırma</p><div className="mt-4 h-3 rounded-full bg-slate-100"><div className="h-full w-[72%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" /></div><p className="mt-2 text-right text-sm font-bold text-emerald-700">%72 tamamlandı</p></div>
              <div className="mt-5 grid grid-cols-3 gap-3">{["Matematik", "Türkçe", "Fen"].map((s, i) => <div key={s} className="rounded-2xl bg-white p-4 shadow-sm"><div className={`mb-3 size-8 rounded-xl ${i===0?'bg-emerald-100':i===1?'bg-sky-100':'bg-violet-100'}`} /><p className="font-black text-slate-800">{s}</p><p className="text-xs text-slate-500">Yeni öneri</p></div>)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-nova mt-10 rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><p className="font-black text-slate-900">Aileler, öğretmenler ve okullar için tasarlandı</p><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{trust.map((t) => <span key={t} className="text-sm font-semibold text-slate-600"><span className="mr-2 text-emerald-500" aria-hidden="true">●</span>{t}</span>)}</div></div></div>
    </section>
  );
}
