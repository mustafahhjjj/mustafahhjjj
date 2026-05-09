import { recommendationBullets, route } from "@/data/home";

const items = [{ name: "Kesir problemleri", level: "Orta", w: "68%" }, { name: "Paragrafta ana fikir", level: "Kolay", w: "82%" }, { name: "Elektrik devreleri", level: "Zor", w: "44%" }];

export function Recommendations() {
  return (
    <section className="section-pad bg-gradient-to-br from-cyan-50 to-emerald-50" id="akilli-oneriler">
      <div className="container-nova grid gap-10 lg:grid-cols-2 lg:items-center">
        <div><p className="font-black text-emerald-700">Akıllı öneriler</p><h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Öğrencinin seviyesine göre sıradaki en doğru çalışma</h2><p className="mt-4 text-lg text-slate-600">Dijital öğrenme asistanı, öğrencinin seviyesine uyum sağlayan sistemle çalışma akışını sadeleştirir.</p><ul className="mt-7 grid gap-3 sm:grid-cols-2">{recommendationBullets.map((m) => <li key={m} className="rounded-2xl bg-white p-4 font-bold text-slate-700 shadow-sm">✓ {m}</li>)}</ul><a href={route.recommendations} className="focus-nova mt-7 inline-flex rounded-full bg-emerald-500 px-6 py-3 font-black text-white hover:bg-emerald-600">Akıllı Önerileri İncele</a></div>
        <div className="glass rounded-[2rem] p-6"><h3 className="text-2xl font-black text-slate-950">Bugünkü öneriler</h3><div className="mt-5 space-y-4">{items.map((it) => <div key={it.name} className="rounded-3xl bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-3"><div><p className="font-black text-slate-900">{it.name}</p><span className="text-sm font-bold text-emerald-700">{it.level} seviye</span></div><a className="focus-nova rounded-full bg-emerald-500 px-4 py-2 text-sm font-black text-white" href={route.skills}>Başla</a></div><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-cyan-400" style={{ width: it.w }} /></div></div>)}</div></div>
      </div>
    </section>
  );
}
