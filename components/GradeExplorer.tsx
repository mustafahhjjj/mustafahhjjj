"use client";

import { useMemo, useState } from "react";
import { grades, gradeTabs, type GradeGroup } from "@/data/home";

function GradeCard({ grade, index }: { grade: (typeof grades)[number]; index: number }) {
  return (
    <article className="card-hover rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/60 hover:border-emerald-300">
      <div className="mb-4 flex items-start justify-between">
        <span className="rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 px-3 py-2 text-sm font-black text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{grade.group}</span>
      </div>

      <h3 className="text-2xl font-black text-slate-950">{grade.name}</h3>
      <p className="mt-2 min-h-14 text-sm leading-6 text-slate-600">{grade.description}</p>

      <dl className="mt-5 grid grid-cols-2 gap-2">
        {Object.entries(grade.skills).map(([subject, count]) => (
          <div key={subject} className="rounded-2xl bg-slate-50 p-3">
            <dt className="text-xs font-bold text-slate-500">{subject}</dt>
            <dd className="font-black text-slate-900">{count} beceri</dd>
          </div>
        ))}
      </dl>

      <a href="#dersler" className="focus-nova mt-5 inline-flex rounded-full font-black text-emerald-700 hover:text-emerald-900">
        Becerileri gör →
      </a>
    </article>
  );
}

export function GradeExplorer() {
  const [active, setActive] = useState<GradeGroup>("İlkokul");
  const visible = useMemo(() => grades.filter((grade) => grade.group === active), [active]);

  return (
    <section className="section-pad bg-gradient-to-b from-emerald-50/70 to-white" id="beceriler">
      <div className="container-nova">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-black text-emerald-700">Sınıf seviyeleri</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Her sınıf için hazır beceriler
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Sınıf düzeyini seç, öğrencilerin çalışabileceği konu ve becerileri keşfet.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Sınıf düzeyi filtreleri">
          {gradeTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`focus-nova rounded-full px-5 py-3 text-sm font-black transition motion-reduce:transition-none ${
                active === tab ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" : "bg-white text-slate-700 hover:bg-emerald-50"
              }`}
              role="tab"
              aria-selected={active === tab}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((grade, index) => (
            <GradeCard key={grade.name} grade={grade} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
