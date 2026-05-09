import { analyticsCards, panelCards, route } from "@/data/home";

export function TeacherAnalytics() {
  return (
    <>
      <section className="section-pad bg-white" id="paneller">
        <div className="container-nova"><div className="mx-auto max-w-3xl text-center"><p className="font-black text-emerald-700">Öğrenci, veli ve öğretmen panelleri</p><h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Her kullanıcı için ayrı ve net değer</h2></div><div className="mt-10 grid gap-6 lg:grid-cols-3">{panelCards.map((panel) => <article id={panel.id} key={panel.eyebrow} className="card-hover rounded-[2rem] border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-7 shadow-lg"><p className="font-black text-emerald-700">{panel.eyebrow}</p><h3 className="mt-2 text-2xl font-black text-slate-950">{panel.title}</h3><ul className="mt-5 grid gap-2 text-sm font-bold text-slate-600 sm:grid-cols-2">{panel.items.map((item) => <li key={item} className="rounded-2xl bg-white p-3 shadow-sm">✓ {item}</li>)}</ul><a href={panel.href} className="focus-nova mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 font-black text-white hover:bg-slate-800">Paneli Aç</a></article>)}</div></div>
      </section>
      <section className="section-pad bg-gradient-to-b from-white to-sky-50" id="analiz">
        <div className="container-nova"><div className="mx-auto max-w-3xl text-center"><p className="font-black text-emerald-700">Analiz</p><h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Başarıyı görünür yapan rapor kartları</h2><p className="mt-4 text-lg text-slate-600">Öğrenci, veli ve öğretmen raporları; eksik kazanımları ve gelişimi anlaşılır hale getirir.</p></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{analyticsCards.map((card, index) => <a key={card} href={route.analytics} className="card-hover focus-nova rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"><span className="grid size-12 place-items-center rounded-2xl bg-emerald-100 font-black text-emerald-700">{index + 1}</span><h3 className="mt-5 text-xl font-black text-slate-950">{card}</h3><p className="mt-2 text-sm text-slate-600">Haftalık ilerleme ve karar desteği için hazır.</p></a>)}</div></div>
      </section>
    </>
  );
}
