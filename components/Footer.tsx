import { footerColumns } from "@/data/home";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-slate-950 pt-16 text-white" id="kaynaklar">
      <div className="container-nova grid gap-10 lg:grid-cols-[1.1fr_2fr]">
        <div>
          <Logo inverted />
          <p className="mt-5 max-w-sm text-slate-300">
            e-kurs, öğrencilerin kendi hızında gelişmesini sağlayan kişiselleştirilmiş öğrenme
            platformudur.
          </p>
          <p className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 font-black text-emerald-200">
            8.431.902 soru çözüldü
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-black">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a className="focus-nova text-sm text-slate-300 hover:text-white" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container-nova mt-12 flex flex-col gap-4 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">© 2026 e-kurs. Tüm hakları saklıdır.</p>
        <div className="flex gap-3" aria-label="Sosyal medya bağlantıları">
          {["in", "x", "yt"].map((social) => (
            <a
              key={social}
              href="#"
              className="focus-nova grid size-10 place-items-center rounded-full bg-white/10 text-sm font-black text-slate-200 hover:bg-white/20"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
