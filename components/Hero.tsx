import { route } from "@/data/home";

const heroMetrics = [
  { label: "Bugünkü hedef", value: "20 soru" },
  { label: "Tamamlanan", value: "14 soru" },
  { label: "Başarı", value: "%82" },
  { label: "Kazanılan puan", value: "120" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_10%,rgba(37,99,235,.18),transparent_26rem),radial-gradient(circle_at_88%_12%,rgba(168,85,247,.18),transparent_28rem),linear-gradient(135deg,#f8fffb_0%,#eef7ff_48%,#fff7ed_100%)] pb-16 pt-14 sm:pt-18 lg:pb-24" id="ogrenme">
      <div className="pointer-events-none absolute left-6 top-32 hidden size-24 rounded-full bg-orange-200/50 blur-2xl lg:block" />
      <div className="pointer-events-none absolute bottom-10 right-8 hidden size-32 rounded-full bg-emerald-200/60 blur-3xl lg:block" />
      <div className="container-nova grid gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-black text-emerald-700 shadow-sm">
            <span aria-hidden="true">✨</span> 1. sınıftan 12. sınıfa kadar kişiselleştirilmiş e-kurs platformu
          </div>
          <h1 className="mt-6 max-w-4xl text-[2.75rem] font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.5rem]">
            Her öğrenciye kişiye özel dijital öğretmen
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            1. sınıftan 12. sınıfa kadar konu anlatımı, test çözme, ödev yardımı, deneme sınavı, akıllı öneriler ve günlük başarı takibi tek platformda.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={route.student} className="focus-nova rounded-full bg-emerald-500 px-7 py-4 text-center font-black text-white shadow-xl shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600 motion-reduce:transition-none">Ücretsiz Başla</a>
            <a href="#siniflar" className="focus-nova rounded-full border border-slate-200 bg-white px-7 py-4 text-center font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700 motion-reduce:transition-none">Sınıfını Seç</a>
            <a href={route.questionBank} className="focus-nova rounded-full border border-sky-200 bg-sky-50 px-7 py-4 text-center font-black text-sky-800 transition hover:-translate-y-0.5 hover:bg-sky-100 motion-reduce:transition-none">Test Çöz</a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -left-4 -top-4 size-24 rounded-[2rem] bg-emerald-200/80 blur-xl" />
          <div className="absolute -bottom-6 -right-4 size-32 rounded-full bg-sky-200/80 blur-xl" />
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white bg-white/90 p-5 shadow-2xl shadow-emerald-950/15 backdrop-blur">
            <div className="rounded-[1.7rem] bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between gap-3">
                <div><p className="text-sm text-emerald-200">Merhaba Ece</p><h2 className="text-2xl font-black">Bugünkü panelin hazır</h2></div>
                <span className="rounded-2xl bg-white/10 px-3 py-2 text-sm font-black">🔥 Seri: 5 gün</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {heroMetrics.map((metric) => (
                  <div className="rounded-2xl bg-white/10 p-4" key={metric.label}><p className="text-xs text-slate-300">{metric.label}</p><b className="text-2xl">{metric.value}</b></div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-[.95fr_1.05fr]">
              <div className="rounded-3xl bg-emerald-50 p-5">
                <p className="text-sm font-black text-emerald-700">Eksik konu</p>
                <h3 className="mt-1 text-xl font-black text-slate-950">Kesirler</h3>
                <div className="mt-4 h-3 rounded-full bg-white"><div className="h-full w-[70%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" /></div>
                <p className="mt-2 text-sm font-bold text-slate-600">Tamamlanan: 14 / 20 soru</p>
              </div>
              <div className="rounded-3xl bg-sky-50 p-5">
                <p className="text-sm font-black text-sky-700">Önerilen çalışma</p>
                <h3 className="mt-1 text-xl font-black text-slate-950">10 kolay + 10 orta soru</h3>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold text-slate-700"><span className="rounded-2xl bg-white p-3">🏅 Rozet hazır</span><span className="rounded-2xl bg-white p-3">🏆 Sıra: 12</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
