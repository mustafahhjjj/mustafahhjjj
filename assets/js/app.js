const gradeBands = [
  { title: 'İlkokul', grades: [1, 2, 3, 4], note: 'Temel beceriler, oyunlu tekrarlar ve okuma alışkanlığı.' },
  { title: 'Ortaokul', grades: [5, 6, 7, 8], note: 'Ders başarısı, merkezi sınav hazırlığı ve düzenli deneme.' },
  { title: 'Lise', grades: [9, 10, 11, 12], note: 'Alan dersleri, hedef takibi ve sınav stratejisi.' }
];

const lessonsByBand = {
  ilkokul: ['Türkçe', 'Matematik', 'Hayat Bilgisi', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce', 'Görsel Sanatlar', 'Müzik'],
  ortaokul: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce', 'Din Kültürü', 'Bilişim Teknolojileri', 'Rehberlik'],
  lise: ['Türk Dili ve Edebiyatı', 'Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Tarih', 'Coğrafya', 'Felsefe', 'İngilizce']
};

const unitNames = ['Konuya Hazırlık', 'Temel Kazanımlar', 'Yeni Nesil Sorular', 'Ünite Değerlendirme'];
const features = [
  ['🧭', 'Ödev Yardımı', 'Planlı ipuçları, örnek adımlar ve öğretmen kontrolüne uygun açıklamalar.'],
  ['🎬', 'Konu Anlatımı', 'Kısa konu kartları, tekrar notları ve akıllı öğretmen önerileri.'],
  ['✍️', 'Soru Çözümü', 'Kolay, orta ve zor düzeylerde anında geri bildirimli test alanı.'],
  ['⏱️', 'Deneme Sınavı', 'Süreli deneme ekranı, puan hesaplama ve gelişim takibi.'],
  ['🏁', 'Ünite Sınavı', 'Her ünitenin sonunda ölçme, sonuç ve tekrar yönlendirmesi.'],
  ['🏆', 'Liderlik', 'Günlük soru sayısına göre puan, rozet ve sıralama sistemi.']
];
const leaderboard = ['Zeynep K. — 1280 puan', 'Emir A. — 1190 puan', 'Elif D. — 1110 puan', 'Mert S. — 1040 puan'];
const levelScores = { kolay: 5, orta: 10, zor: 15 };

function getBand(grade) {
  if (grade <= 4) return 'ilkokul';
  if (grade <= 8) return 'ortaokul';
  return 'lise';
}

function pathPrefix() {
  return document.body.dataset.page === 'home' ? '' : '../';
}

function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#main-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

function initToastButtons() {
  document.querySelectorAll('[data-toast]').forEach((button) => {
    button.addEventListener('click', () => showToast(button.dataset.toast));
  });
}

function renderHome() {
  const gradeRoot = document.querySelector('#grade-groups');
  if (gradeRoot) {
    gradeRoot.innerHTML = gradeBands.map((group) => `
      <article class="grade-group">
        <h3>${group.title}</h3>
        <p>${group.note}</p>
        <div class="grade-grid">
          ${group.grades.map((grade) => `<a class="grade-box" href="pages/sinif-${grade}.html"><strong>${grade}</strong><span>${grade}. Sınıf Dersleri</span></a>`).join('')}
        </div>
      </article>
    `).join('');
  }
  const featureRoot = document.querySelector('#feature-grid');
  if (featureRoot) {
    featureRoot.innerHTML = features.map(([icon, title, text]) => `
      <article class="feature-card"><div class="icon">${icon}</div><h3>${title}</h3><p>${text}</p><button class="btn ghost" data-toast="${title} bölümü statik sürümde hazırlandı.">Aç</button></article>
    `).join('');
    initToastButtons();
  }
  renderLeaderboard('#leaderboard-mini');
}

function renderLeaderboard(selector) {
  const root = document.querySelector(selector);
  if (!root) return;
  root.innerHTML = leaderboard.map((item) => `<li>${item}</li>`).join('');
}

function buildQuestion(lesson, unit, level) {
  const points = levelScores[level];
  return {
    text: `${lesson} dersi ${unit.toLowerCase()} için ${level} seviye örnek sorusu: Doğru çalışma adımı hangisidir?`,
    answers: ['Kazanımı oku, örneği incele, testi çöz', 'Soruyu okumadan işaretle', 'Sadece sonucu ezberle', 'Geri bildirimi kapat'],
    correct: 0,
    points
  };
}

function renderGradePage() {
  const grade = Number(document.body.dataset.grade);
  if (!grade) return;
  const band = getBand(grade);
  const lessons = lessonsByBand[band];
  const title = document.querySelector('#grade-title');
  const desc = document.querySelector('#grade-desc');
  if (title) title.textContent = `${grade}. Sınıf Dersleri`;
  if (desc) desc.textContent = `${grade}. sınıf için tüm dersler, üniteler, konu anlatımı, soru çözümü ve seviye bazlı test alanları.`;

  const lessonRoot = document.querySelector('#lesson-grid');
  const unitRoot = document.querySelector('#units-wrap');
  if (!lessonRoot || !unitRoot) return;

  function openLesson(lesson, activeIndex) {
    document.querySelectorAll('.lesson-card').forEach((card, index) => card.classList.toggle('active', index === activeIndex));
    unitRoot.innerHTML = unitNames.map((unit, unitIndex) => `
      <article class="unit-card ${unitIndex === 0 ? 'open' : ''}">
        <div class="unit-head">
          <div><h3>${lesson}: ${unit}</h3><p>Konu anlatımı, ödev yardımı, soru çözümü, deneme ve ünite sınavı kısayolları.</p></div>
          <button class="btn secondary unit-toggle" type="button">Üniteyi Aç</button>
        </div>
        <div class="unit-content">
          <div class="action-row">
            <button class="btn ghost" data-toast="${lesson} konu anlatımı açıldı.">Konu Anlatımı</button>
            <button class="btn ghost" data-toast="${lesson} ödev yardımı açıldı.">Ödev Yardımı</button>
            <button class="btn ghost" data-toast="${lesson} deneme sınavı hazır.">Deneme Sınavı</button>
            <button class="btn ghost" data-toast="${lesson} ünite sınavı hazır.">Ünite Sınavı</button>
          </div>
          <div class="level-tabs" role="tablist">
            ${['kolay', 'orta', 'zor'].map((level, i) => `<button class="btn level-btn ${i === 0 ? 'active' : ''}" data-level="${level}" type="button">${level[0].toUpperCase() + level.slice(1)}</button>`).join('')}
          </div>
          <div class="test-box" data-lesson="${lesson}" data-unit="${unit}" data-level="kolay"></div>
        </div>
      </article>
    `).join('');
    document.querySelectorAll('.test-box').forEach(renderTestBox);
    initUnitEvents();
    initToastButtons();
  }

  lessonRoot.innerHTML = lessons.map((lesson, index) => `
    <button class="lesson-card ${index === 0 ? 'active' : ''}" type="button"><h3>${lesson}</h3><p>Üniteleri ve testleri aç</p></button>
  `).join('');
  document.querySelectorAll('.lesson-card').forEach((card, index) => card.addEventListener('click', () => openLesson(lessons[index], index)));
  openLesson(lessons[0], 0);
}

function initUnitEvents() {
  document.querySelectorAll('.unit-toggle').forEach((button) => {
    button.addEventListener('click', () => button.closest('.unit-card').classList.toggle('open'));
  });
  document.querySelectorAll('.level-btn').forEach((button) => {
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

function renderTestBox(box) {
  const question = buildQuestion(box.dataset.lesson, box.dataset.unit, box.dataset.level);
  box.innerHTML = `
    <p class="eyebrow">Test çözme alanı · ${question.points} puan</p>
    <h3>${question.text}</h3>
    <div class="option-grid">
      ${question.answers.map((answer, index) => `<button type="button" data-answer="${index}">${answer}</button>`).join('')}
    </div>
    <p class="feedback"></p>
  `;
  box.querySelectorAll('[data-answer]').forEach((answer) => {
    answer.addEventListener('click', () => {
      const isCorrect = Number(answer.dataset.answer) === question.correct;
      box.querySelectorAll('[data-answer]').forEach((btn) => btn.disabled = true);
      answer.classList.add(isCorrect ? 'correct' : 'wrong');
      box.querySelector('.feedback').textContent = isCorrect ? `Tebrikler! ${question.points} puan kazandın.` : 'Tekrar denemek için üniteyi yeniden açabilirsin.';
    });
  });
}

function renderPanel() {
  const panel = document.body.dataset.panel;
  if (!panel) return;
  renderLeaderboard('#panel-leaderboard');
  const rewardButton = document.querySelector('#daily-reward');
  if (rewardButton) {
    rewardButton.addEventListener('click', () => showToast('Bugünkü soru sayına göre ödül puanın hesaplandı.'));
  }
  const approvalButtons = document.querySelectorAll('.approve-btn');
  approvalButtons.forEach((button) => button.addEventListener('click', () => {
    button.textContent = 'Onaylandı';
    button.disabled = true;
    showToast('Admin onayı kaydedildi. PHP/MySQL bağlantısı sonraki aşamada eklenecek.');
  }));
}

function init() {
  initMenu();
  initToastButtons();
  renderHome();
  renderGradePage();
  renderPanel();
}

document.addEventListener('DOMContentLoaded', init);
