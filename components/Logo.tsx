export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#top" className="focus-nova inline-flex items-center gap-2 rounded-2xl" aria-label="SkillNova ana sayfa">
      <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-xl font-black text-white shadow-lg shadow-emerald-200/40" aria-hidden="true">✦</span>
      <span className={`text-xl font-black tracking-tight ${inverted ? "text-white" : "text-slate-900"}`}>Skill<span className="text-emerald-500">Nova</span></span>
    </a>
  );
}
