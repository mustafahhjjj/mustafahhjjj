"use client";

import { useEffect, useState } from "react";
import { megaMenu, navLinks, route } from "@/data/home";
import { Logo } from "./Logo";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
      <div className="bg-gradient-to-r from-emerald-50 via-cyan-50 to-sky-50 text-sm text-slate-700" id="top">
        <div className="container-nova flex h-10 items-center justify-between gap-3 overflow-hidden whitespace-nowrap">
          <p className="truncate"><strong>Yeni:</strong> Sınıf-ders-beceri yapısı, veli raporları ve akıllı öneriler yenilendi.</p>
          <a href={route.plans} className="focus-nova shrink-0 rounded-full font-semibold text-emerald-700 hover:text-emerald-900">Kazanım planlarını gör</a>
        </div>
      </div>

      <header className={`sticky top-0 z-50 border-b border-emerald-100/80 bg-white/90 backdrop-blur-xl transition-shadow duration-300 motion-reduce:transition-none ${scrolled ? "shadow-lg shadow-emerald-950/10" : "shadow-sm shadow-emerald-950/5"}`}>
        <nav className="container-nova relative flex min-h-20 items-center justify-between gap-3" aria-label="Ana navigasyon">
          <Logo />

          <div className="hidden items-center gap-1 2xl:flex">
            <div className="group relative" onMouseEnter={() => setDesktopLearnOpen(true)} onMouseLeave={() => setDesktopLearnOpen(false)}>
              <button className="focus-nova rounded-full px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50" aria-controls="desktop-learning-menu" aria-expanded={desktopLearnOpen} aria-haspopup="true" onClick={() => setDesktopLearnOpen((value) => !value)} type="button">Öğrenme</button>
              <div className={`absolute left-0 top-11 w-[760px] rounded-3xl border border-emerald-100 bg-white p-6 shadow-2xl transition duration-200 motion-reduce:transition-none ${desktopLearnOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"}`} id="desktop-learning-menu">
                <div className="grid grid-cols-3 gap-6">
                  {megaMenu.map((column) => (
                    <div key={column.title}>
                      <h3 className="mb-3 text-sm font-black text-slate-900">{column.title}</h3>
                      <ul className="space-y-2">
                        {column.items.map((item) => <li key={item}><a href={route.skills} className="focus-nova block rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700">{item}</a></li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((link) => <a key={link.label} href={link.href} className="focus-nova rounded-full px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700">{link.label}</a>)}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={route.student} className="focus-nova rounded-full px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">Giriş Yap</a>
            <a href={route.student} className="focus-nova rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600 motion-reduce:transition-none">Ücretsiz Başla</a>
          </div>

          <div className="flex items-center gap-2 2xl:hidden">
            <a href={route.student} className="focus-nova rounded-full bg-emerald-500 px-4 py-2 text-sm font-black text-white lg:hidden">Başla</a>
            <button className="focus-nova inline-flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm" type="button" aria-expanded={mobileOpen} aria-controls="mobile-menu" aria-label="Menüyü aç veya kapat" onClick={() => setMobileOpen((value) => !value)}>
              <span className="relative block h-4 w-5" aria-hidden="true"><span className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} /><span className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current transition ${mobileOpen ? "opacity-0" : ""}`} /><span className={`absolute bottom-0 left-0 h-0.5 w-5 rounded bg-current transition ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} /></span>
            </button>
          </div>
        </nav>

        <div id="mobile-menu" className={`2xl:hidden ${mobileOpen ? "block" : "hidden"}`}>
          <div className="container-nova grid max-h-[calc(100vh-5rem)] gap-2 overflow-y-auto border-t border-slate-100 py-4">
            {navLinks.map((link) => <a key={link.label} href={link.href} onClick={closeMobileMenu} className="focus-nova rounded-2xl bg-slate-50 px-4 py-3 font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">{link.label}</a>)}
            <div className="grid gap-2 sm:grid-cols-2">
              <a href={route.student} onClick={closeMobileMenu} className="focus-nova rounded-2xl border border-slate-200 px-4 py-3 text-center font-black text-slate-700">Giriş Yap</a>
              <a href={route.student} onClick={closeMobileMenu} className="focus-nova rounded-2xl bg-emerald-500 px-4 py-3 text-center font-black text-white">Ücretsiz Başla</a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
