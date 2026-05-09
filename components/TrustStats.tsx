import { trustStats } from "@/data/home";

export function TrustStats() {
  return (
    <section className="bg-white py-8" id="guven-istatistikleri" aria-label="Güven istatistikleri">
      <div className="container-nova grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        {trustStats.map((stat) => (
          <div key={stat.label} className="card-hover rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-emerald-50/70 p-5 text-center shadow-lg shadow-slate-200/50">
            <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-white text-2xl shadow-sm" aria-hidden="true">{stat.icon}</div>
            <p className="mt-3 text-2xl font-black text-slate-950">{stat.value}</p>
            <p className="mt-1 text-sm font-bold text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
