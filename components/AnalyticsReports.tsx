import { analyticsCards, route } from "@/data/home";

export function AnalyticsReports() {
  return (
    <section className="section-pad bg-gradient-to-b from-white to-sky-50" id="analiz">
      <div className="container-nova">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-black text-emerald-700">Analiz / raporlar</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Başarıyı görünür yapan rapor kartları</h2>
          <p className="mt-4 text-lg text-slate-600">Başarı yüzdesi, ders bazlı ilerleme, soru çözme grafiği, eksik kazanımlar ve haftalık gelişim panelleri veli ve öğretmen raporlarına dönüşür.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {analyticsCards.map((card, index) => (
            <a key={card} href={route.analytics} className="card-hover focus-nova rounded-3xl border border-slate-100 bg-white p-6 shadow-lg">
              <span className="grid size-12 place-items-center rounded-2xl bg-emerald-100 font-black text-emerald-700">{index + 1}</span>
              <h3 className="mt-5 text-xl font-black text-slate-950">{card}</h3>
              <p className="mt-2 text-sm text-slate-600">Haftalık ilerleme ve karar desteği için hazır.</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
