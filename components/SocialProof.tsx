import { examPrep, faqs, testimonials } from "@/data/home";

export function SocialProof() {
  return (
    <>
      <section className="section-pad bg-white" id="sinav-hazirlik">
        <div className="container-nova"><div className="mx-auto max-w-3xl text-center"><p className="font-black text-emerald-700">Sınav hazırlık</p><h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Okul sınavlarından LGS, TYT ve AYT’ye kadar</h2></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{examPrep.map((item) => <a href="/pages/deneme-sinavlari.html" key={item} className="card-hover focus-nova rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-sky-50 p-6 font-black text-slate-800 shadow-lg">✓ {item}</a>)}</div></div>
      </section>
      <section className="section-pad bg-gradient-to-b from-sky-50 to-white" id="yorumlar">
        <div className="container-nova"><div className="mx-auto max-w-3xl text-center"><p className="font-black text-emerald-700">Güven ve yorumlar</p><h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Aileler, öğretmenler ve öğrenciler için güven veren deneyim</h2><p className="mt-4 text-lg text-slate-600">Güvenli kullanım, Türkiye müfredatına uygun içerik ve anlaşılır raporlarla öğrenme süreci takip edilir.</p></div><div className="mt-9 grid gap-5 md:grid-cols-3">{testimonials.map((t) => <article key={t.name} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50"><p className="text-lg leading-8 text-slate-700">“{t.quote}”</p><div className="mt-6 flex items-center gap-3"><span className="grid size-12 place-items-center rounded-full bg-emerald-100 font-black text-emerald-700">{t.initials}</span><div><h3 className="font-black text-slate-950">{t.name}</h3><p className="text-sm text-slate-500">{t.role}</p></div></div></article>)}</div><div className="mt-8 grid gap-4 md:grid-cols-3"><div className="rounded-3xl bg-emerald-50 p-6 font-black text-emerald-800">🔒 Güvenli kullanım</div><div className="rounded-3xl bg-sky-50 p-6 font-black text-sky-800">🇹🇷 Türkiye müfredatına uygun içerik</div><div className="rounded-3xl bg-amber-50 p-6 font-black text-amber-800">📄 Veli ve öğretmen raporları</div></div></div>
      </section>
      <section className="section-pad bg-white" id="sss"><div className="container-nova"><div className="mx-auto max-w-3xl text-center"><p className="font-black text-emerald-700">Sık sorulan sorular</p><h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Başlamadan önce merak edilenler</h2></div><div className="mx-auto mt-10 grid max-w-4xl gap-4">{faqs.map((faq) => <details key={faq.q} className="rounded-3xl border border-slate-100 bg-slate-50 p-6"><summary className="cursor-pointer text-lg font-black text-slate-950">{faq.q}</summary><p className="mt-3 text-slate-600">{faq.a}</p></details>)}</div></div></section>
    </>
  );
}
