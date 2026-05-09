import { route, trustStats } from "@/data/home";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_10%,rgba(16,185,129,.22),transparent_28rem),radial-gradient(circle_at_86%_16%,rgba(14,165,233,.18),transparent_26rem),linear-gradient(135deg,#f8fffb_0%,#eefcff_48%,#f8fbff_100%)] pb-14 pt-14 sm:pt-18 lg:pb-20" id="ogrenme">
      <div className="pointer-events-none absolute left-6 top-32 hidden size-24 rounded-full bg-amber-200/40 blur-2xl lg:block" />
      <div className="container-nova grid gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-black text-emerald-700 shadow-sm">
            <span aria-hidden="true">✨</span> Türkiye K12 için sınıf, ders ve beceri odaklı öğrenme
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
            Her öğrenciye kişiye özel dijital öğretmen
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            1. sınıftan 12. sınıfa kadar dersler, konu anlatımı, testler, ödev yardımı, deneme sınavları ve günlük başarı takibi tek platformda.
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
            <div className="rounded-[1.7rem] bg-slate-950 p-4 text-white">
              <div className="flex items-center justify-between gap-3">
                <div><p className="text-sm text-emerald-200">Merhaba Ece</p><h2 className="text-2xl font-black">Bugünkü hedefin hazır</h2></div>
                <span className="rounded-2xl bg-white/10 px-3 py-2 text-sm font-black">🔥 8 gün seri</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-slate-300">Çözülen soru</p><b className="text-2xl">64</b></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-slate-300">Başarı</p><b className="text-2xl">%86</b></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-slate-300">Puan</p><b className="text-2xl">1.240</b></div>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-[.95fr_1.05fr]">
              <div className="rounded-3xl bg-emerald-50 p-5">
                <p className="text-sm font-black text-emerald-700">Eksik konu</p>
                <h3 className="mt-1 text-xl font-black text-slate-950">Kesir problemleri</h3>
                <div className="mt-4 h-3 rounded-full bg-white"><div className="h-full w-[64%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" /></div>
                <p className="mt-2 text-sm font-bold text-slate-600">Bugünkü hedef: 20 soru</p>
              </div>
              <div className="rounded-3xl bg-sky-50 p-5">
                <p className="text-sm font-black text-sky-700">Önerilen çalışma</p>
                <h3 className="mt-1 text-xl font-black text-slate-950">Önce video, sonra orta seviye test</h3>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold text-slate-700"><span className="rounded-2xl bg-white p-3">🏅 Rozet: Odak</span><span className="rounded-2xl bg-white p-3">🏆 Sıra: 12</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-nova mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Güven istatistikleri">
        {trustStats.map((stat) => <div key={stat.label} className="rounded-3xl border border-white bg-white/85 p-5 text-center shadow-lg shadow-slate-200/50"><p className="text-3xl font-black text-slate-950">{stat.value}</p><p className="mt-1 font-bold text-slate-600">{stat.label}</p></div>)}
      </div>
    </section>
  );
}
