import { features } from "@/data/home";

export function FeatureCards() {
  return (
    <section className="section-pad bg-white" id="guven-istatistikleri">
      <div className="container-nova grid gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="card-hover rounded-[2rem] border border-slate-100 bg-gradient-to-br from-white to-emerald-50/60 p-7 shadow-lg shadow-slate-200/50">
            <div className="grid size-16 place-items-center rounded-3xl bg-white text-3xl shadow-inner" aria-hidden="true">{feature.icon}</div>
            <h2 className="mt-6 text-2xl font-black text-slate-950">{feature.title}</h2>
            <p className="mt-3 text-slate-600">{feature.description}</p>
            <a href={feature.href} className="focus-nova mt-5 inline-flex font-black text-emerald-700 hover:text-emerald-900">Detayları keşfet →</a>
          </article>
        ))}
      </div>
    </section>
  );
}
