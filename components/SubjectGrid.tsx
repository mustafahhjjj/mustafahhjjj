import { learningModules, route, subjectGroups } from "@/data/home";

export function SubjectGrid() {
  return (
    <section className="section-pad bg-white" id="dersler">
      <div className="container-nova">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="font-black text-emerald-700">Dersler</p><h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Türkiye K12 sistemine uygun geniş ders kataloğu</h2></div>
          <p className="max-w-xl text-slate-600">Ders kartları konu anlatımı, beceri çalışması, test, video, seviyeli sorular, sınavlar, çıkmış sorular ve ödev yardımı adımlarını birleştirir.</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {subjectGroups.map((group) => (
            <article key={group.level} className={`card-hover rounded-[2rem] border border-slate-100 bg-gradient-to-br ${group.tone} p-6 shadow-lg shadow-slate-200/50`}>
              <div className="flex items-center gap-3"><span className="grid size-14 place-items-center rounded-3xl bg-white text-3xl shadow-sm" aria-hidden="true">{group.icon}</span><h3 className="text-2xl font-black text-slate-950">{group.level}</h3></div>
              <div className="mt-5 flex flex-wrap gap-2">{group.subjects.map((subject) => <span key={subject} className="rounded-full bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm">{subject}</span>)}</div>
              <div className="mt-6 border-t border-white/70 pt-5"><p className="text-sm font-black text-emerald-700">Öğrenme modülleri</p><ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">{learningModules.map((module) => <li key={module}>✓ {module}</li>)}</ul></div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href={route.subjects} className="focus-nova inline-flex justify-center rounded-full bg-slate-950 px-5 py-3 font-black text-white hover:bg-slate-800">Dersleri İncele</a><a href={route.questionBank} className="focus-nova inline-flex justify-center rounded-full bg-white px-5 py-3 font-black text-slate-800 hover:text-emerald-700">Soru Bankasına Git</a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
