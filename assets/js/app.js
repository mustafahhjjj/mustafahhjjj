
const gradeProfiles = [
  { id: 'pre-k', label: 'Pre-K', stage: 'Okul öncesi', color: '#f97316', href: '#beceri-ara', topics: 'Renkler, şekiller, sayı farkındalığı, dikkat oyunları', counts: { Matematik: 36, Türkçe: 28, Fen: 16 }, tags: ['pre-k', 'okul öncesi', 'renkler', 'şekiller', 'sayılar'] },
  { id: 'anaokulu', label: 'Anaokulu', stage: 'Okul öncesi', color: '#f59e0b', href: '#beceri-ara', topics: 'Ses farkındalığı, örüntüler, temel sayma, çevremiz', counts: { Matematik: 48, Türkçe: 42, Fen: 20 }, tags: ['anaokulu', 'okul öncesi', 'ses', 'örüntü', 'çevremiz'] },
  { id: '1', label: '1. Sınıf', stage: 'İlkokul', color: '#22c55e', href: 'pages/sinif-1.html', topics: 'Toplama, çıkarma, okuma-anlama, ses bilgisi, çevremiz', counts: { Matematik: 120, Türkçe: 95, Fen: 40 }, tags: ['1. sınıf', 'birinci sınıf', 'toplama', 'çıkarma', 'okuma', 'ses bilgisi', 'çevremiz'] },
  { id: '2', label: '2. Sınıf', stage: 'İlkokul', color: '#14b8a6', href: 'pages/sinif-2.html', topics: 'Ritmik sayma, problemler, akıcı okuma, yazım kuralları', counts: { Matematik: 132, Türkçe: 104, Fen: 46 }, tags: ['2. sınıf', 'ikinci sınıf', 'ritmik sayma', 'problemler', 'okuma', 'yazım'] },
  { id: '3', label: '3. Sınıf', stage: 'İlkokul', color: '#06b6d4', href: 'pages/sinif-3.html', topics: 'Çarpma, bölme, metin türleri, canlılar ve kuvvet', counts: { Matematik: 145, Türkçe: 112, Fen: 58 }, tags: ['3. sınıf', 'üçüncü sınıf', 'çarpma', 'bölme', 'metin', 'canlılar', 'fen'] },
  { id: '4', label: '4. Sınıf', stage: 'İlkokul', color: '#3b82f6', href: 'pages/sinif-4.html', topics: 'Kesirler, grafikler, paragraf, madde ve harita okuma', counts: { Matematik: 158, Türkçe: 124, Fen: 64 }, tags: ['4. sınıf', 'dördüncü sınıf', 'kesirler', 'grafikler', 'paragraf', 'madde', 'harita'] },
  { id: '5', label: '5. Sınıf', stage: 'Ortaokul', color: '#6366f1', href: 'pages/sinif-5.html', topics: 'Doğal sayılar, kesirler, paragraf, güneş ve dünya', counts: { Matematik: 170, Türkçe: 138, Fen: 82 }, tags: ['5. sınıf', 'beşinci sınıf', 'doğal sayılar', 'kesirler', 'paragraf', 'fen'] },
  { id: '6', label: '6. Sınıf', stage: 'Ortaokul', color: '#8b5cf6', href: 'pages/sinif-6.html', topics: 'Oran, cebir, sözcükte anlam, kuvvet ve hareket', counts: { Matematik: 188, Türkçe: 146, Fen: 96 }, tags: ['6. sınıf', 'altıncı sınıf', 'oran', 'cebir', 'sözcükte anlam', 'kuvvet', 'hareket'] },
  { id: '7', label: '7. Sınıf', stage: 'Ortaokul', color: '#a855f7', href: 'pages/sinif-7.html', topics: 'Rasyonel sayılar, denklemler, fiiller, enerji dönüşümleri', counts: { Matematik: 205, Türkçe: 158, Fen: 108 }, tags: ['7. sınıf', 'yedinci sınıf', 'rasyonel', 'denklemler', 'fiiller', 'enerji', 'fen'] },
  { id: '8', label: '8. Sınıf', stage: 'LGS', color: '#ec4899', href: 'pages/sinif-8.html', topics: 'LGS problem, çarpanlar, paragraf, DNA ve kalıtım', counts: { Matematik: 230, Türkçe: 176, Fen: 126 }, tags: ['8. sınıf', 'sekizinci sınıf', 'lgs', 'problem', 'çarpanlar', 'paragraf', 'dna'] },
  { id: '9', label: '9. Sınıf', stage: 'Lise', color: '#ef4444', href: 'pages/sinif-9.html', topics: 'Kümeler, denklemler, edebiyat, fizik ve kimya temelleri', counts: { Matematik: 214, Türkçe: 140, Fen: 150 }, tags: ['9. sınıf', 'dokuzuncu sınıf', 'kümeler', 'denklemler', 'edebiyat', 'fizik', 'kimya'] },
  { id: '10', label: '10. Sınıf', stage: 'Lise', color: '#f97316', href: 'pages/sinif-10.html', topics: 'Fonksiyonlar, polinomlar, roman, basınç ve ekosistem', counts: { Matematik: 226, Türkçe: 152, Fen: 162 }, tags: ['10. sınıf', 'onuncu sınıf', 'fonksiyonlar', 'polinomlar', 'roman', 'basınç', 'ekosistem'] },
  { id: '11', label: '11. Sınıf', stage: 'Lise', color: '#eab308', href: 'pages/sinif-11.html', topics: 'Trigonometri, analitik, şiir, elektrik ve modern atom', counts: { Matematik: 248, Türkçe: 164, Fen: 174 }, tags: ['11. sınıf', 'on birinci sınıf', 'trigonometri', 'analitik', 'şiir', 'elektrik', 'atom'] },
  { id: '12', label: '12. Sınıf', stage: 'TYT/AYT', color: '#84cc16', href: 'pages/sinif-12.html', topics: 'Türev, integral, TYT/AYT tekrar, deneme analizi', counts: { Matematik: 272, Türkçe: 184, Fen: 192 }, tags: ['12. sınıf', 'on ikinci sınıf', 'türev', 'integral', 'tyt', 'ayt', 'deneme'] }
];

const lessonsByLevel = {
  primary: ['Matematik', 'Türkçe', 'Hayat Bilgisi', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce'],
  middle: ['Matematik', 'Türkçe', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce', 'Din Kültürü', 'LGS Hazırlık'],
  high: ['Matematik', 'Türk Dili ve Edebiyatı', 'Fizik', 'Kimya', 'Biyoloji', 'Tarih', 'Coğrafya', 'TYT/AYT']
};

const unitBank = {
  primary: ['Sayılar ve İşlemler', 'Okuma Anlama', 'Günlük Yaşam', 'Doğa ve Çevre', 'Kısa Tekrar'],
  middle: ['Kazanım Testi', 'Problem Çözme', 'Ünite Tekrarı', 'Beceri Temelli Sorular', 'Yazılı Hazırlık'],
  high: ['Temel Kavramlar', 'Konu Pekiştirme', 'Yeni Nesil Sorular', 'Deneme Analizi', 'Sınav Stratejisi']
};

const features = [
  ['⚡', 'Kısa quizlerle öğrenme', 'Dersleri küçük parçalara ayır, 2-4 dakikalık testlerle bilgini pekiştir.'],
  ['✅', 'Anında geri bildirim', 'Her cevapta doğru/yanlış sonucunu ve anlaşılır açıklamayı gör.'],
  ['🎯', 'Kişiye özel çalışma önerisi', 'Eksik kalan konularına göre dijital öğretmen çalışma kartları önerir.'],
  ['👨‍👩‍👧', 'Veli takip ekranı', 'Günlük hedef, ödev, puan ve deneme sonuçları güvenle izlenir.'],
  ['🧑‍🏫', 'Öğretmen paneli', 'Soru, ödev, ünite sınavı ve sınıf başarı raporu tek yerde yönetilir.'],
  ['🔐', 'Güvenli mesajlaşma', 'Mesajlaşma alanları admin onayı ve veli bilgilendirmesiyle ilerler.'],
  ['🏆', 'Liderlik ve ödül', 'Puan, rozet ve haftalık sıralama ile düzenli çalışma motive edilir.'],
  ['📱', 'Her ekranda kullanım', 'Mobil, tablet ve bilgisayarda hızlı açılan statik yapı sunar.']
];

const courses = [
  ['🧮', '1. Sınıf Matematik', 'Sayıları tanı, toplama-çıkarma alıştırmalarıyla güven kazan.', 48, 'pages/sinif-1.html'],
  ['📖', '2. Sınıf Türkçe', 'Okuma anlama, yazım kuralları ve kelime bilgisi quizleri.', 52, 'pages/sinif-2.html'],
  ['🔬', '3. Sınıf Fen Bilimleri', 'Canlılar, kuvvet, madde ve çevre konularında mini testler.', 44, 'pages/sinif-3.html'],
  ['🗺️', '4. Sınıf Sosyal Bilgiler', 'Haklar, sorumluluklar, harita ve kültür üniteleri.', 40, 'pages/sinif-4.html'],
  ['🚀', '8. Sınıf LGS Hazırlık', 'Beceri temelli sorular, deneme sınavları ve konu analizleri.', 128, 'pages/sinif-8.html'],
  ['🎓', '12. Sınıf TYT/AYT', 'Sınav stratejisi, alan testleri ve hedefe yönelik tekrar.', 156, 'pages/sinif-12.html']
];


const skillSuggestions = [
  { icon: '🧮', title: 'Kesirleri karşılaştırma', grade: '4. Sınıf', lesson: 'Matematik', href: 'pages/sinif-4.html', tags: ['kesirler', 'matematik', 'payda'] },
  { icon: '📖', title: 'Paragrafta ana fikir', grade: '5. Sınıf', lesson: 'Türkçe', href: 'pages/sinif-5.html', tags: ['okuma', 'ana fikir', 'paragraf'] },
  { icon: '🚀', title: 'LGS problem çözme', grade: '8. Sınıf', lesson: 'LGS Hazırlık', href: 'pages/sinif-8.html', tags: ['lgs', 'problem', 'beceri'] },
  { icon: '🔬', title: 'Kuvvet ve hareket', grade: '6. Sınıf', lesson: 'Fen Bilimleri', href: 'pages/sinif-6.html', tags: ['fen', 'kuvvet', 'hareket'] },
  { icon: '🎓', title: 'TYT temel kavramlar', grade: '12. Sınıf', lesson: 'TYT/AYT', href: 'pages/sinif-12.html', tags: ['tyt', 'ayt', 'matematik'] },
  { icon: '🌍', title: 'Harita okuryazarlığı', grade: '7. Sınıf', lesson: 'Sosyal Bilgiler', href: 'pages/sinif-7.html', tags: ['harita', 'sosyal', 'coğrafya'] }
];

const panels = [
  ['🎒', 'Öğrenci Paneli', 'Günlük hedef, quiz geçmişi, puan, rozet ve dijital öğretmen önerilerini takip et.', 'pages/ogrenci-panel.html'],
  ['👨‍👩‍👧‍👦', 'Veli Paneli', 'Öğrencinin gelişimini, ödev durumunu ve güvenli iletişim izinlerini izle.', 'pages/veli-panel.html'],
  ['🧑‍🏫', 'Öğretmen Paneli', 'Sınıf performansı, ödevler, soru havuzu ve ünite sınavlarını yönet.', 'pages/ogretmen-panel.html'],
  ['🛡️', 'Admin Paneli', 'Kullanıcı rolleri, içerik onayları ve güvenli mesajlaşma ayarlarını düzenle.', 'pages/admin-panel.html']
];

const faqs = [
  ['e-kurs.com hangi sınıflar için?', 'Platform 1. sınıftan 12. sınıfa kadar tüm Türkiye K12 öğrencileri için tasarlanmıştır.'],
  ['Quizler nasıl çalışır?', 'Öğrenci sınıfını ve dersini seçer, kolay/orta/zor seviyeden kısa quiz çözer ve her cevapta açıklama alır.'],
  ['Veli öğrenciyi takip edebilir mi?', 'Evet. Veli panelinde günlük hedef, puan, ödev, deneme ve başarı yüzdesi özetleri gösterilir.'],
  ['Öğretmen ödev verebilir mi?', 'Evet. Öğretmen paneli soru, ödev, ünite sınavı ve deneme planlama akışına hazırdır.'],
  ['Güvenli mesajlaşma nasıl olacak?', 'Mesajlaşma istekleri admin onayı ve veli bilgilendirmesiyle kontrol edilen güvenli bir akışa bağlanacak şekilde kurgulanmıştır.'],
  ['Kişiye özel öğretmen desteği nedir?', 'Dijital öğretmen, öğrencinin quiz sonuçlarına göre tekrar etmesi gereken konuları ve çalışma kartlarını önerir.']
];

const leaderboard = ['Zeynep · 980 puan', 'Efe · 940 puan', 'Ada · 910 puan', 'Mert · 870 puan'];
const scoreState = { score: 0, progress: 24 };

function getLevel(grade) {
  if (grade <= 4) return 'primary';
  if (grade <= 8) return 'middle';
  return 'high';
}

function pagePrefix() {
  return window.location.pathname.includes('/pages/') ? '../' : '';
}

function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#main-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2800);
}

function initToastButtons(scope = document) {
  scope.querySelectorAll('[data-toast]').forEach((button) => {
    button.addEventListener('click', () => showToast(button.dataset.toast));
  });
}

function normalizeText(value) {
  return String(value || '').trim().toLocaleLowerCase('tr-TR');
}

function gradeMatches(profile, query) {
  if (!query) return true;
  const haystack = [profile.label, profile.stage, profile.topics, ...Object.keys(profile.counts), ...profile.tags].join(' ');
  return normalizeText(haystack).includes(query);
}

function renderGradeCards(query = '') {
  const gradeRoot = document.querySelector('#grade-groups');
  const empty = document.querySelector('#grade-empty');
  if (!gradeRoot) return [];
  const normalized = normalizeText(query);
  const matches = gradeProfiles.filter((profile) => gradeMatches(profile, normalized));
  gradeRoot.innerHTML = matches.map((profile) => `
    <a class="grade-card k12-grade-card" href="${profile.href}" style="--grade-color:${profile.color}" data-search="${[profile.label, profile.stage, profile.topics, ...Object.keys(profile.counts), ...profile.tags].join(' ')}">
      <span class="grade-stage">${profile.stage}</span>
      <strong>${profile.label}</strong>
      <p>${profile.topics}</p>
      <div class="grade-meta">
        ${Object.entries(profile.counts).map(([lesson, count]) => `<span>${lesson}: <b>${count} beceri</b></span>`).join('')}
      </div>
    </a>
  `).join('');
  if (empty) empty.hidden = matches.length > 0;
  return matches;
}

function renderHome() {
  if (document.body.dataset.page !== 'home') return;
  renderGradeCards();
}


function renderSkillSearch() {
  const input = document.querySelector('#skill-search');
  const button = document.querySelector('#skill-search-button');
  const root = document.querySelector('#skill-results');
  if (!input || !button || !root) return;

  function draw(query = '') {
    const normalized = normalizeText(query);
    const matches = skillSuggestions.filter((skill) => {
      const haystack = [skill.title, skill.grade, skill.lesson, ...skill.tags].join(' ');
      return !normalized || normalizeText(haystack).includes(normalized);
    });
    const gradeMatches = renderGradeCards(query);
    if (normalized && !matches.length && !gradeMatches.length) {
      root.innerHTML = '<p class="empty-state">Uygun beceri bulunamadı</p>';
      return;
    }
    const list = matches.length ? matches : skillSuggestions.slice(0, 6);
    root.innerHTML = list.map((skill) => `
      <a class="skill-result-card" href="${skill.href}">
        <span class="icon">${skill.icon}</span>
        <strong>${skill.title}</strong>
        <small>${skill.grade} · ${skill.lesson}</small>
        <em>Başla →</em>
      </a>
    `).join('');
  }

  input.addEventListener('input', () => draw(input.value));
  button.addEventListener('click', () => {
    draw(input.value);
    document.querySelector('#siniflar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      draw(input.value);
    }
  });
  draw();
}


function getLessons(grade) {
  return lessonsByLevel[getLevel(Number(grade))];
}

function buildQuestion(lesson, unit, level) {
  const points = level === 'zor' ? 20 : level === 'orta' ? 15 : 10;
  const correct = level === 'zor' ? 2 : level === 'orta' ? 1 : 0;
  return {
    points,
    correct,
    text: `${lesson} dersinde “${unit}” konusu için ${level} seviye örnek soru: Bu kazanımı pekiştirmek için doğru seçeneği işaretle.`,
    answers: ['Kazanımı adım adım tekrar ederim.', 'Sadece sonucu yazarım.', 'Soruyu okumadan geçerim.', 'Açıklamayı kapatırım.'],
    explanation: 'Doğru yaklaşım; soruyu dikkatle okuyup kazanımı adım adım tekrar etmek ve açıklamadan eksik konuyu tamamlamaktır.'
  };
}

function renderTestBox(box) {
  const question = buildQuestion(box.dataset.lesson, box.dataset.unit, box.dataset.level);
  box.innerHTML = `
    <p class="eyebrow">Test alanı · ${question.points} puan</p>
    <h3>${question.text}</h3>
    <div class="option-grid">
      ${question.answers.map((answer, index) => `<button type="button" data-answer="${index}">${String.fromCharCode(65 + index)}) ${answer}</button>`).join('')}
    </div>
    <p class="feedback">Cevabını seç; sonuç, açıklama, puan ve ilerleme anında güncellensin.</p>
  `;
  box.querySelectorAll('[data-answer]').forEach((answer) => {
    answer.addEventListener('click', () => {
      const isCorrect = Number(answer.dataset.answer) === question.correct;
      box.querySelectorAll('[data-answer]').forEach((btn) => { btn.disabled = true; });
      answer.classList.add(isCorrect ? 'correct' : 'wrong');
      scoreState.score += isCorrect ? question.points : 2;
      scoreState.progress = Math.min(100, scoreState.progress + (isCorrect ? 12 : 5));
      box.querySelector('.feedback').textContent = `${isCorrect ? 'Doğru!' : 'Yanlış cevap, tekrar et.'} ${question.explanation} Güncel puan: ${scoreState.score}.`;
      updateGradeProgress();
    });
  });
}

function updateGradeProgress() {
  const score = document.querySelector('#live-score');
  const progress = document.querySelector('#live-progress');
  const bar = document.querySelector('#grade-progress-bar');
  if (score) score.textContent = scoreState.score;
  if (progress) progress.textContent = `%${scoreState.progress}`;
  if (bar) bar.style.width = `${scoreState.progress}%`;
}

function renderGradePage() {
  if (document.body.dataset.page !== 'grade') return;
  const grade = Number(document.body.dataset.grade);
  const level = getLevel(grade);
  const lessons = getLessons(grade);
  const units = unitBank[level];
  document.querySelector('#grade-title').textContent = `${grade}. Sınıf Quiz ve Ders Merkezi`;
  document.querySelector('#grade-desc').textContent = `${grade}. sınıf için ders kartları, ünite kartları, kolay/orta/zor quizler, deneme sınavı, ünite sınavı, ödev yardımı ve kişiye özel dijital öğretmen önerileri.`;

  const lessonRoot = document.querySelector('#lesson-grid');
  const unitsRoot = document.querySelector('#units-wrap');

  function openLesson(lesson, activeIndex) {
    lessonRoot.querySelectorAll('.lesson-card').forEach((card, index) => card.classList.toggle('active', index === activeIndex));
    unitsRoot.innerHTML = units.map((unit, index) => `
      <article class="unit-card ${index === 0 ? 'open' : ''}">
        <button class="unit-toggle" type="button"><span><h3>${unit}</h3><p>${lesson} için ünite sınavı, deneme ve ödev akışı.</p></span><strong>Ünite ${index + 1}</strong></button>
        <div class="unit-content">
          <div class="action-row">
            <button class="btn btn-ghost" data-toast="${lesson} ödev yardımı açıldı." type="button">Ödev yardımı</button>
            <button class="btn btn-ghost" data-toast="${lesson} deneme sınavı hazırlandı." type="button">Deneme sınavı</button>
            <button class="btn btn-ghost" data-toast="${lesson} ünite sınavı başlatılıyor." type="button">Ünite sınavı</button>
          </div>
          <div class="level-tabs" role="tablist" aria-label="Quiz zorluk seviyesi">
            ${['kolay', 'orta', 'zor'].map((quizLevel, tabIndex) => `<button class="btn btn-ghost level-btn ${tabIndex === 0 ? 'active' : ''}" data-level="${quizLevel}" type="button">${quizLevel[0].toUpperCase() + quizLevel.slice(1)}</button>`).join('')}
          </div>
          <div class="test-box" data-lesson="${lesson}" data-unit="${unit}" data-level="kolay"></div>
        </div>
      </article>
    `).join('');
    unitsRoot.querySelectorAll('.test-box').forEach(renderTestBox);
    initUnitEvents(unitsRoot);
    initToastButtons(unitsRoot);
  }

  lessonRoot.innerHTML = lessons.map((lesson, index) => `
    <button class="lesson-card ${index === 0 ? 'active' : ''}" type="button"><h3>${lesson}</h3><p>${index + 4} ünite · ${24 + index * 6} quiz · günlük hedef</p></button>
  `).join('');
  lessonRoot.querySelectorAll('.lesson-card').forEach((card, index) => card.addEventListener('click', () => openLesson(lessons[index], index)));
  openLesson(lessons[0], 0);
  updateGradeProgress();
}

function initUnitEvents(scope = document) {
  scope.querySelectorAll('.unit-toggle').forEach((button) => {
    button.addEventListener('click', () => button.closest('.unit-card').classList.toggle('open'));
  });
  scope.querySelectorAll('.level-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const wrap = button.closest('.unit-content');
      wrap.querySelectorAll('.level-btn').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const box = wrap.querySelector('.test-box');
      box.dataset.level = button.dataset.level;
      renderTestBox(box);
    });
  });
}

function renderPanel() {
  if (document.body.dataset.page !== 'panel') return;
  const board = document.querySelector('#panel-leaderboard');
  if (board) board.innerHTML = leaderboard.map((item) => `<li>${item}</li>`).join('');
  const rewardButton = document.querySelector('#daily-reward');
  if (rewardButton) rewardButton.addEventListener('click', () => showToast('Günlük hedef puanın ve rozet durumun güncellendi.'));
  document.querySelectorAll('.approve-btn').forEach((button) => {
    button.addEventListener('click', () => {
      button.textContent = 'Onaylandı';
      button.disabled = true;
      showToast('Onay kaydedildi. PHP/MySQL entegrasyonu için hazır akış.');
    });
  });
}

function init() {
  initMenu();
  initToastButtons();
  renderHome();
  renderSkillSearch();
  renderGradePage();
  renderPanel();
}

document.addEventListener('DOMContentLoaded', init);
