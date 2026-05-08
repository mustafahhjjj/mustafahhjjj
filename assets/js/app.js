const gradeBands = [
  { title: 'İlkokul 1-4', desc: 'Temel okuryazarlık, matematik, hayat bilgisi ve eğlenceli tekrar quizleri.', grades: [1, 2, 3, 4], color: '#ff8a3d' },
  { title: 'Ortaokul 5-8', desc: 'Ders temelleri, yazılı hazırlık, LGS becerileri ve düzenli kazanım takibi.', grades: [5, 6, 7, 8], color: '#06b6d4' },
  { title: 'Lise 9-12', desc: 'Alan dersleri, deneme sınavları, TYT/AYT hazırlık ve hedef odaklı çalışma.', grades: [9, 10, 11, 12], color: '#8b5cf6' }
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

function renderHome() {
  if (document.body.dataset.page !== 'home') return;
  const gradeRoot = document.querySelector('#grade-groups');
  gradeRoot.innerHTML = gradeBands.map((band) => `
    <article class="grade-band">
      <div class="grade-band-head">
        <div><h3>${band.title}</h3><p>${band.desc}</p></div>
        <span class="status-pill">${band.grades.length} sınıf seviyesi</span>
      </div>
      <div class="grade-cards">
        ${band.grades.map((grade) => `
          <a class="grade-card" href="pages/sinif-${grade}.html" style="--grade-color:${band.color}">
            <strong>${grade}. Sınıf</strong>
            <p>${grade <= 4 ? 'Temel kazanımlar' : grade <= 8 ? 'Kazanım ve sınav hazırlığı' : 'Lise ve sınav odaklı çalışma'}</p>
            <div class="grade-meta">
              <span>Ders sayısı <b>${getLessons(grade).length}</b></span>
              <span>Ünite sayısı <b>${grade <= 4 ? 28 : grade <= 8 ? 42 : 54}</b></span>
              <span>Beceri sayısı <b>${grade <= 4 ? 120 : grade <= 8 ? 180 : 220}</b></span>
              <span>Quiz sayısı <b>${grade <= 4 ? 96 : grade <= 8 ? 132 : 168}</b></span>
              <span>Günlük hedef <b>${grade <= 4 ? 20 : grade <= 8 ? 30 : 45} soru</b></span>
            </div>
          </a>
        `).join('')}
      </div>
    </article>
  `).join('');

  document.querySelector('#feature-grid').innerHTML = features.map(([icon, title, text]) => `
    <article class="feature-card"><span class="icon">${icon}</span><h3>${title}</h3><p>${text}</p></article>
  `).join('');

  document.querySelector('#course-grid').innerHTML = courses.map(([icon, title, text, count, href]) => `
    <article class="course-card"><span class="icon">${icon}</span><h3>${title}</h3><p>${text}</p><p class="meta">${count} quiz</p><a class="btn btn-ghost" href="${href}">Derse Git</a></article>
  `).join('');

  document.querySelector('#panel-grid').innerHTML = panels.map(([icon, title, text, href]) => `
    <a class="panel-link" href="${href}"><span class="icon">${icon}</span><h3>${title}</h3><p>${text}</p><span class="btn btn-secondary">Panele Git</span></a>
  `).join('');

  const faqRoot = document.querySelector('#faq-list');
  faqRoot.innerHTML = faqs.map(([question, answer], index) => `
    <article class="faq-item ${index === 0 ? 'open' : ''}">
      <button class="faq-question" type="button"><span>${question}</span><b>+</b></button>
      <div class="faq-answer"><p>${answer}</p></div>
    </article>
  `).join('');
  faqRoot.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => button.closest('.faq-item').classList.toggle('open'));
  });
}


function renderSkillSearch() {
  const input = document.querySelector('#skill-search');
  const button = document.querySelector('#skill-search-button');
  const root = document.querySelector('#skill-results');
  if (!input || !button || !root) return;

  function draw(query = '') {
    const normalized = query.trim().toLocaleLowerCase('tr-TR');
    const matches = skillSuggestions.filter((skill) => {
      const haystack = [skill.title, skill.grade, skill.lesson, ...skill.tags].join(' ').toLocaleLowerCase('tr-TR');
      return !normalized || haystack.includes(normalized);
    });
    const list = matches.length ? matches : skillSuggestions.slice(0, 3);
    root.innerHTML = list.map((skill) => `
      <a class="skill-result-card" href="${skill.href}">
        <span class="icon">${skill.icon}</span>
        <strong>${skill.title}</strong>
        <small>${skill.grade} · ${skill.lesson}</small>
        <em>Başla →</em>
      </a>
    `).join('');
    if (normalized && !matches.length) showToast('Aramana yakın öneriler gösteriliyor.');
  }

  input.addEventListener('input', () => draw(input.value));
  button.addEventListener('click', () => draw(input.value));
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
