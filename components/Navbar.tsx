"use client";

import { useEffect, useState } from "react";
import { megaMenu, navLinks } from "@/data/home";
import { Logo } from "./Logo";

const subjectLinks = ["Matematik", "Türkçe", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce"];

const hrefFor = (link: string) => {
  if (subjectLinks.includes(link)) return "#dersler";
  if (link === "Planlar") return "#planlar";
  if (link === "Analiz") return "#analiz";
  if (link === "Kaynaklar") return "#kaynaklar";
  return "#öğrenme";
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const [desktopLearnOpen, setDesktopLearnOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <div
        className="bg-gradient-to-r from-emerald-50 via-cyan-50 to-sky-50 text-sm text-slate-700"
        id="top"
      >
        <div className="container-nova flex h-10 items-center justify-between gap-3 overflow-hidden whitespace-nowrap">
          <p className="truncate">
            <strong>Yeni:</strong> Öğrenciler için kişiselleştirilmiş çalışma planları yayında!
          </p>
          <a
            href="#planlar"
            className="focus-nova shrink-0 rounded-full font-semibold text-emerald-700 hover:text-emerald-900"
          >
            Detayları gör
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-emerald-100/80 bg-white/85 backdrop-blur-xl transition-shadow duration-300 motion-reduce:transition-none ${
          scrolled ? "shadow-lg shadow-emerald-950/10" : "shadow-sm shadow-emerald-950/5"
        }`}
      >
        <nav
          className="container-nova relative flex min-h-20 items-center justify-between gap-4"
          aria-label="Ana navigasyon"
        >
          <Logo />

          <div className="hidden items-center gap-1 xl:flex">
            <div
              className="group relative"
              onMouseEnter={() => setDesktopLearnOpen(true)}
              onMouseLeave={() => setDesktopLearnOpen(false)}
            >
              <button
                className="focus-nova rounded-full px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50"
                aria-controls="desktop-learning-menu"
                aria-expanded={desktopLearnOpen}
                aria-haspopup="true"
                onClick={() => setDesktopLearnOpen((value) => !value)}
                type="button"
              >
                Öğrenme
              </button>
              <div
                className={`absolute left-0 top-11 w-[720px] rounded-3xl border border-emerald-100 bg-white p-6 shadow-2xl transition duration-200 motion-reduce:transition-none ${
                  desktopLearnOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-2 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                }`}
                id="desktop-learning-menu"
              >
                <div className="grid grid-cols-3 gap-6">
                  {megaMenu.map((column) => (
                    <div key={column.title}>
                      <h3 className="mb-3 text-sm font-black text-slate-900">{column.title}</h3>
                      <ul className="space-y-2">
                        {column.items.map((item) => (
                          <li key={item}>
                            <a
                              href="#beceriler"
                              className="focus-nova block rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link}
                href={hrefFor(link)}
                className="focus-nova rounded-full px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <label className="sr-only" htmlFor="skill-search">
              Beceri ara
            </label>
            <input
              id="skill-search"
              placeholder="Beceri, konu veya sınıf ara..."
              className="focus-nova w-56 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:bg-white motion-reduce:transition-none"
            />
            <a
              href="#"
              className="focus-nova rounded-full px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              Giriş yap
            </a>
            <a
              href="#cta"
              className="focus-nova rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600 motion-reduce:transition-none"
            >
              Ücretsiz başla
            </a>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <a href="#cta" className="focus-nova rounded-full bg-emerald-500 px-4 py-2 text-sm font-black text-white">
              Başla
            </a>
            <button
              onClick={() => setMobileOpen((value) => !value)}
              className="focus-nova rounded-2xl border border-slate-200 p-3"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Mobil menüyü aç veya kapat"
              type="button"
            >
              <span aria-hidden="true">☰</span>
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div id="mobile-menu" className="border-t border-emerald-100 bg-white px-4 pb-6 pt-3 shadow-xl xl:hidden">
            <button
              onClick={() => setMobileLearnOpen((value) => !value)}
              className="focus-nova flex w-full items-center justify-between rounded-2xl px-4 py-3 font-bold text-slate-800"
              aria-controls="mobile-learning-menu"
              aria-expanded={mobileLearnOpen}
              type="button"
            >
              Öğrenme <span aria-hidden="true">{mobileLearnOpen ? "−" : "+"}</span>
            </button>

            {mobileLearnOpen && (
              <div id="mobile-learning-menu" className="grid gap-3 rounded-3xl bg-emerald-50 p-4 sm:grid-cols-3">
                {megaMenu.map((column) => (
                  <div key={column.title}>
                    <p className="font-black text-slate-900">{column.title}</p>
                    {column.items.map((item) => (
                      <a
                        key={item}
                        className="focus-nova block rounded-xl py-1.5 text-sm text-slate-700"
                        href="#beceriler"
                        onClick={closeMobileMenu}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {navLinks.map((link) => (
              <a
                key={link}
                href={hrefFor(link)}
                className="focus-nova block rounded-2xl px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                onClick={closeMobileMenu}
              >
                {link}
              </a>
            ))}
            <label className="sr-only" htmlFor="mobile-skill-search">
              Beceri ara
            </label>
            <input
              id="mobile-skill-search"
              placeholder="Beceri, konu veya sınıf ara..."
              className="focus-nova mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </div>
        )}
      </header>
    </>
  );
}
