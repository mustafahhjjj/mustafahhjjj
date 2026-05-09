const grades = Array.from({ length: 12 }, (_, index) => index + 1);

const subjects = [
  "Matematik",
  "Türkçe",
  "Fen Bilimleri",
  "Sosyal Bilgiler",
  "Hayat Bilgisi",
  "İngilizce",
  "Din Kültürü",
  "İnkılap Tarihi",
  "Fizik",
  "Kimya",
  "Biyoloji",
  "Tarih",
  "Coğrafya",
  "Edebiyat",
];

const stats = [
  ["12.000+", "beceri"],
  ["8M+", "çözülen soru"],
  ["1–12.", "sınıf içerik"],
  ["3 panel", "öğrenci, veli ve öğretmen paneli"],
];

const features = [
  ["Konu anlatımı", "Kısa, anlaşılır ve sınıf seviyesine uygun anlatımlarla yeni beceriler öğrenilir."],
  ["Soru çözümü", "Adım adım çözüm yaklaşımıyla öğrencinin hatası görünür ve sonraki çalışma netleşir."],
  ["Deneme sınavı", "Süreli denemeler, kazanım analizi ve gelişim raporu ile sınav hazırlığı desteklenir."],
  ["Gelişim takibi", "Öğrenci, veli ve öğretmen panelleri ilerlemeyi düzenli ve anlaşılır şekilde gösterir."],
];

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="e-kurs ana sayfa">
      <span className="brand-mark" aria-hidden="true"><span /></span>
      <span className="brand-text">e-kurs</span>
    </a>
  );
}

function Header() {
  return (
    <header className="site-header" id="top">
      <nav className="nav-shell" aria-label="Ana menü">
        <Logo />
        <div className="nav-menu" id="main-menu">
          <a href="#ogrenme">Öğrenme</a>
          <a href="#siniflar">Sınıflar</a>
          <a href="#dersler">Dersler</a>
          <a href="#ogretmen">Öğretmen</a>
          <a href="#veli">Veli</a>
          <a href="#analiz">Analiz</a>
        </div>
        <div className="nav-actions">
          <a className="btn btn-ghost" href="/pages/ogrenci-panel.html">Giriş yap</a>
          <a className="btn btn-primary" href="#basla">Ücretsiz başla</a>
        </div>
      </nav>
    </header>
  );
}

function StudentPanel() {
  return (
    <aside className="student-panel" aria-label="Öğrenci çalışma paneli önizlemesi">
      <div className="panel-glow" aria-hidden="true" />
      <div className="panel-top">
        <div className="student-card">
          <span className="avatar-mark" aria-hidden="true" />
          <div>
            <p>Öğrenci kartı</p>
            <strong>Ece • 5. Sınıf</strong>
          </div>
        </div>
        <span className="streak">7 gün seri</span>
      </div>

      <div className="goal-card">
        <p>Bugünkü hedef</p>
        <strong>20 soru</strong>
        <span>Kısa konu anlatımı, ölçme ve anında geri bildirim ile tamamlanır.</span>
      </div>

      <div className="progress-list">
        <div className="progress-card">
          <div className="progress-head"><strong>Matematik</strong><span>%78</span></div>
          <div className="progress-bar"><span className="progress-math" /></div>
        </div>
        <div className="progress-card progress-card-purple">
          <div className="progress-head"><strong>Türkçe</strong><span>%64</span></div>
          <div className="progress-bar"><span className="progress-turkish" /></div>
        </div>
      </div>

      <div className="panel-metrics">
        <article><strong>42</strong><p>Çözülen soru</p></article>
        <article><strong>5</strong><p>Ders önerisi</p></article>
      </div>

      <div className="award-card">
        <span className="award-icon" aria-hidden="true" />
        <div><strong>Haftanın yıldızı</strong><p>Rozet, düzenli çalışma serisiyle kazanıldı.</p></div>
      </div>
    </aside>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="icerik">
        <section className="hero" id="ogrenme" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">1. sınıftan 12. sınıfa Türkiye’ye uygun öğrenme</span>
              <h1 id="hero-title">Her öğrenci için kişiye özel dijital öğretmen</h1>
              <p className="hero-lead">e-kurs; 1. sınıftan 12. sınıfa kadar öğrencilerin seviyesine göre konu anlatımı, soru çözümü, ödev desteği, deneme sınavı ve gelişim takibi sunan akıllı öğrenme platformudur.</p>
              <div className="hero-actions" aria-label="Hızlı başlangıç bağlantıları">
                <a className="btn btn-primary btn-large" href="#basla">Ücretsiz başla</a>
                <a className="btn btn-secondary btn-large" href="#siniflar">Sınıfını seç</a>
                <a className="btn btn-outline btn-large" href="#dersler">Dersleri keşfet</a>
              </div>
            </div>
            <StudentPanel />
          </div>
        </section>

        <section className="stats-band" aria-label="e-kurs istatistikleri">
          <div className="container stats-grid">
            {stats.map(([value, label]) => <article key={value}><strong>{value}</strong><p>{label}</p></article>)}
          </div>
        </section>

        <section className="section" id="siniflar" aria-labelledby="grades-title">
          <div className="container">
            <div className="section-head">
              <span className="kicker">Sınıf seçimi</span>
              <h2 id="grades-title">Her sınıf için hazır beceriler</h2>
              <p>Sınıfını seç, seviyene uygun konu anlatımı, soru çözümü ve öğrenciye özel çalışma planı ile ilerle.</p>
            </div>
            <div className="grade-groups">
              {[["İlkokul", grades.slice(0, 4)], ["Ortaokul", grades.slice(4, 8)], ["Lise", grades.slice(8)]].map(([group, items]) => (
                <article className="grade-group" key={String(group)}>
                  <h3>{String(group)}</h3>
                  <div className="grade-grid">{(items as number[]).map((grade) => <a href={`/pages/sinif-${grade}.html`} key={grade}>{grade}. sınıf</a>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-soft" id="dersler" aria-labelledby="subjects-title">
          <div className="container">
            <div className="section-head">
              <span className="kicker">Dersler</span>
              <h2 id="subjects-title">Tek platformda tüm temel dersler</h2>
              <p>İlkokuldan liseye kadar ana derslerde konu anlatımı, soru çözümü ve gelişim takibi aynı yerde.</p>
            </div>
            <div className="subject-grid">{subjects.map((subject) => <article key={subject}>{subject}</article>)}</div>
          </div>
        </section>

        <section className="section" id="analiz" aria-labelledby="features-title">
          <div className="container">
            <div className="section-head">
              <span className="kicker">Akıllı öğrenme akışı</span>
              <h2 id="features-title">Dolu, anlaşılır ve güven veren öğrenme deneyimi</h2>
            </div>
            <div className="feature-grid">{features.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className="section section-soft" id="basla" aria-labelledby="audience-title">
          <div className="container">
            <div className="section-head">
              <span className="kicker">Paneller</span>
              <h2 id="audience-title">Öğrenci, veli ve öğretmen için ayrı deneyim</h2>
            </div>
            <div className="audience-grid">
              {[
                ["Öğrenci için", "Günlük hedefler, seviyeye göre öğrenme, soru çözümü ve rozetlerle düzenli çalışma alışkanlığı.", "/pages/ogrenci.html", "Öğrenci panelini incele", "ogrenci"],
                ["Veli için", "Çözülen soru, eksik konular, ödev durumu ve haftalık gelişim raporları tek ekranda.", "/pages/veli.html", "Veli panelini incele", "veli"],
                ["Öğretmen için", "Sınıf takibi, ödev planlama, kazanım raporu ve öğrenciye özel çalışma planı yönetimi.", "/pages/ogretmen.html", "Öğretmen panelini incele", "ogretmen"],
              ].map(([title, text, href, cta, id]) => <article id={id} key={title}><h3>{title}</h3><p>{text}</p><a href={href}>{cta}</a></article>)}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <Logo />
          <nav aria-label="Alt menü"><a href="#siniflar">Sınıflar</a><a href="#dersler">Dersler</a><a href="/pages/gizlilik-politikasi.html">Gizlilik</a><a href="/pages/iletisim.html">İletişim</a></nav>
        </div>
      </footer>
    </>
  );
}
