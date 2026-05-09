import { planCards, route, skillSamples } from "@/data/home";

export function SkillPlans() {
  return (
    <>
      <section className="section-pad bg-gradient-to-b from-white to-emerald-50/60" id="beceri-sayilari">
        <div className="container-nova">
          <div className="mx-auto max-w-3xl text-center"><p className="font-black text-emerald-700">Beceri / video / test sistemi</p><h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Sınıf ve ders bazında ölçülebilir kapsam</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{skillSamples.map((sample) => <article key={sample.title} className="card-hover rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"><h3 className="text-xl font-black text-slate-950">{sample.title}</h3><dl className="mt-5 space-y-3"><div className="rounded-2xl bg-emerald-50 p-3"><dt className="text-xs font-bold text-emerald-700">Beceri</dt><dd className="font-black text-slate-950">{sample.skills}</dd></div><div className="rounded-2xl bg-sky-50 p-3"><dt className="text-xs font-bold text-sky-700">Video</dt><dd className="font-black text-slate-950">{sample.videos}</dd></div><div className="rounded-2xl bg-amber-50 p-3"><dt className="text-xs font-bold text-amber-700">Soru</dt><dd className="font-black text-slate-950">{sample.questions}</dd></div></dl><a href={route.skills} className="focus-nova mt-5 inline-flex font-black text-emerald-700">Becerilere git →</a></article>)}</div>
        </div>
      </section>
      <section className="section-pad bg-slate-950 text-white" id="kazanim-planlari">
        <div className="container-nova grid gap-10 lg:grid-cols-[1fr_.85fr]">
          <div><p className="font-black text-emerald-300">MEB kazanım planları</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">Kazanım, ünite ve yazılı hazırlığı aynı akışta</h2><p className="mt-4 max-w-2xl text-slate-300">MEB kazanımları, ünite planları, yazılı hazırlık ve performans raporu ile öğrencinin hangi adımı tamamladığı görünür.</p><div className="mt-8 space-y-4">{planCards.map((p) => <article key={p.title} className="rounded-3xl border border-white/10 bg-white/10 p-5 transition hover:bg-white/15"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="text-xl font-black">{p.title}</h3><p className="mt-1 text-slate-300">{p.description}</p></div><a href={p.href} className="focus-nova rounded-full bg-white px-5 py-3 text-center text-sm font-black text-slate-950 hover:bg-emerald-100">{p.cta}</a></div></article>)}</div></div>
          <div className="self-center rounded-[2rem] bg-white p-6 text-slate-900 shadow-2xl"><div className="rounded-3xl bg-emerald-50 p-5"><p className="font-black text-emerald-700">Örnek haftalık plan</p>{["Hafta 1: MEB kazanımı", "Hafta 2: Video + kolay test", "Hafta 3: Ünite sınavı", "Hafta 4: Performans raporu"].map((w, i) => <div key={w} className="mt-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"><span className="grid size-10 place-items-center rounded-full bg-emerald-500 font-black text-white">{i + 1}</span><span className="font-bold">{w}</span></div>)}</div></div>
        </div>
      </section>
    </>
  );
}
