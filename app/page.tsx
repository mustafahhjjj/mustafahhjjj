const subjects = ["Matematik", "Türkçe", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce"];

const grades = [
  ["Okul Öncesi", "220 Beceriler"],
  ["Anaokulu", "310 Beceriler"],
  ["1. Sınıf", "350 Beceriler"],
  ["2. Sınıf", "410 Beceriler"],
  ["3. Sınıf", "455 Beceriler"],
  ["4. Sınıf", "520 Beceriler"],
  ["5. Sınıf", "585 Beceriler"],
  ["6. Sınıf", "640 Beceriler"],
  ["7. Sınıf", "690 Beceriler"],
  ["8. Sınıf", "745 Beceriler"],
  ["9. Sınıf", "610 Beceriler"],
  ["10. Sınıf", "575 Beceriler"],
  ["11. Sınıf", "540 Beceriler"],
  ["12. Sınıf", "505 Beceriler"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8" aria-label="Ana menü">
          <a href="#" className="flex items-center gap-2 text-3xl font-black tracking-tight text-slate-800" aria-label="e-kurs.com ana sayfa">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#8cc63f] text-white shadow-md">e</span>
            <span>e-kurs.com</span>
          </a>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm font-bold text-slate-700 lg:justify-center">
            <a className="transition hover:text-[#8cc63f]" href="#mufredat">Müfredat</a>
            <a className="transition hover:text-[#8cc63f]" href="#degerlendirme">Değerlendirme</a>
            <a className="transition hover:text-[#8cc63f]" href="#analitik">Analitik</a>
            <a className="transition hover:text-[#8cc63f]" href="#okullar">Okullar/Öğretmenler</a>
          </div>

          <form className="grid gap-2 sm:grid-cols-[1fr_1fr_auto] lg:w-[430px]" aria-label="Kullanıcı girişi">
            <input className="h-10 rounded-md border border-slate-300 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#8cc63f] focus:ring-2 focus:ring-[#8cc63f]/25" type="text" placeholder="Kullanıcı adı" aria-label="Kullanıcı adı" />
            <input className="h-10 rounded-md border border-slate-300 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#8cc63f] focus:ring-2 focus:ring-[#8cc63f]/25" type="password" placeholder="Şifre" aria-label="Şifre" />
            <button className="h-10 rounded-md bg-[#8cc63f] px-5 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#7bb432] hover:shadow-md" type="submit">Giriş Yap</button>
          </form>
        </nav>
      </header>

      <section className="bg-[#f9f9f9] px-4 py-16 text-center sm:py-20 lg:py-24" id="mufredat">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.28em] text-[#8cc63f]">Akıllı pratik • Kişiselleştirilmiş öğrenme • K-12</p>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-[#1e293b] sm:text-5xl lg:text-6xl">Yapay Zeka Destekli K-12 Öğrenim Sistemi</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">e-kurs.com, her öğrencinin seviyesine göre uyarlanan beceri pratikleri, ölçme araçları ve öğretmen analitikleriyle güven veren modern LMS deneyimi sunar.</p>
          <form className="mx-auto mt-9 flex max-w-3xl flex-col overflow-hidden rounded-full border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/70 sm:flex-row" aria-label="Beceri arama">
            <input className="min-h-14 flex-1 rounded-full px-6 text-base outline-none placeholder:text-slate-400" type="search" placeholder="Öğrenmek istediğiniz beceriyi arayın..." aria-label="Öğrenmek istediğiniz beceriyi arayın" />
            <button className="min-h-14 rounded-full bg-[#8cc63f] px-8 font-extrabold text-white transition hover:bg-[#7bb432]" type="submit">Ara</button>
          </form>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16" id="degerlendirme">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-100 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
            <aside aria-label="Branş sekmeleri" className="rounded-2xl bg-[#f9f9f9] p-3">
              <h2 className="px-4 py-3 text-xl font-black text-[#1e293b]">Branşlar</h2>
              <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                {subjects.map((subject, index) => (
                  <a key={subject} href="#siniflar" className={`min-w-max rounded-xl px-4 py-3 text-left text-sm font-extrabold transition ${index === 0 ? "bg-[#8cc63f] text-white shadow-md" : "bg-white text-slate-700 hover:bg-[#8cc63f]/10 hover:text-[#1e293b]"}`}>
                    {subject}
                  </a>
                ))}
              </div>
            </aside>

            <div id="siniflar">
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#8cc63f]">Sınıflar ve beceriler</p>
                  <h2 className="mt-2 text-3xl font-black text-[#1e293b]">Okul Öncesi’nden 12. Sınıf’a kadar</h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-slate-500">Kartlardan sınıf seçerek konu anlatımı, beceri pratikleri, değerlendirme ve yapay zeka destekli önerilere ulaşın.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {grades.map(([grade, skills]) => (
                  <a key={grade} href="#" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#8cc63f] hover:shadow-xl hover:shadow-[#8cc63f]/15">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#8cc63f]/15 text-lg font-black text-[#6da324] transition group-hover:bg-[#8cc63f] group-hover:text-white">✓</span>
                      <span className="rounded-full bg-[#f9f9f9] px-3 py-1 text-xs font-bold text-slate-500">AI uyumlu</span>
                    </div>
                    <h3 className="text-2xl font-black text-[#1e293b]">{grade}</h3>
                    <p className="mt-2 text-base font-bold text-[#8cc63f]">{skills}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-500">Seviyeye göre alıştırmalar, anında geri bildirim ve gelişim takibi.</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f9f9f9] px-4 py-14" id="analitik">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["Uyarlanabilir öğrenme", "Yapay zeka, öğrencinin doğru-yanlış örüntüsüne göre sıradaki beceriyi önerir."],
            ["Güvenilir değerlendirme", "Kısa sınavlar, kazanım bazlı eksikleri görünür ve uygulanabilir hale getirir."],
            ["Öğretmen analitikleri", "Sınıf ilerlemesi, ödev durumu ve beceri performansı tek panelde izlenir."],
          ].map(([title, text]) => (
            <article key={title} id={title === "Öğretmen analitikleri" ? "okullar" : undefined} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-black text-[#1e293b]">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
