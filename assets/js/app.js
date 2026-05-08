const gradeCards = [
  ['Okul Öncesi', 'Renkler, sayılar ve dikkat çalışmalarıyla eğlenceli başlangıç.', '#ff6b6b', 'OÖ'],
  ['Anaokulu', 'Ses farkındalığı, örüntüler ve temel kavramlar.', '#ff9f1c', 'A'],
  ['1. Sınıf', 'Okuma yazma, toplama ve çıkarma becerileri.', '#52b900', '1'],
  ['2. Sınıf', 'Problemler, akıcı okuma ve doğa gözlemleri.', '#1c9ee6', '2'],
  ['3. Sınıf', 'Çarpma, paragraf ve canlılar dünyası.', '#7b61ff', '3'],
  ['4. Sınıf', 'Kesirler, metin türleri ve maddenin halleri.', '#00b894', '4'],
  ['5. Sınıf', 'Geometri, sözcükte anlam ve Türkiye haritası.', '#e17055', '5'],
  ['6. Sınıf', 'Oran, cümlede anlam ve sistemler.', '#0984e3', '6'],
  ['7. Sınıf', 'Denklem, paragraf ve kuvvet-enerji.', '#d63031', '7'],
  ['8. Sınıf', 'LGS odaklı tekrar, yeni nesil soru ve analiz.', '#6c5ce7', '8'],
  ['9. Sınıf', 'Lise temeli: kümeler, dil bilgisi ve bilimsel süreç.', '#00cec9', '9'],
  ['10. Sınıf', 'Fonksiyonlar, anlatım ve kimya temelleri.', '#fdcb6e', '10'],
  ['11. Sınıf', 'Denklemler, edebiyat ve ileri fen kazanımları.', '#e84393', '11'],
  ['12. Sınıf', 'TYT-AYT tekrar planı, deneme ve hedef takibi.', '#2d3436', '12']
].map(([title, description, color, badge]) => ({
  title,
  description,
  color,
  badge,
  tags: ['Matematik', 'Türkçe', 'Fen', title, description]
}));

const skills = [
  ['Toplama', '1. Sınıf', 'Matematik', '➕', '#e8ffd9', ['toplama', 'sayılar', '1. sınıf']],
  ['Çıkarma', '1. Sınıf', 'Matematik', '➖', '#fff4d6', ['çıkarma', 'sayılar']],
  ['Kesirler', '4. Sınıf', 'Matematik', '◔', '#efe8ff', ['kesirler', 'pay', 'payda']],
  ['Problemler', '2. Sınıf', 'Matematik', '🧩', '#e2f5ff', ['problem', 'problemler']],
  ['Okuma anlama', '3. Sınıf', 'Türkçe', '📖', '#ffe8ef', ['okuma', 'anlama', 'metin']],
  ['Paragraf', '7. Sınıf', 'Türkçe', '📝', '#e8fff8', ['paragraf', 'ana fikir']],
  ['Ses bilgisi', '5. Sınıf', 'Türkçe', '🔤', '#fff0df', ['ses', 'dil bilgisi']],
  ['Canlılar', '3. Sınıf', 'Fen', '🌱', '#e8ffd9', ['canlılar', 'fen']],
  ['Maddenin halleri', '4. Sınıf', 'Fen', '💧', '#e2f5ff', ['madde', 'maddenin halleri']],
  ['Türkiye haritası', '5. Sınıf', 'Sosyal Bilgiler', '🗺️', '#fff4d6', ['türkiye', 'harita', 'sosyal']],
  ['Denklem', '7. Sınıf', 'Matematik', '𝑥', '#efe8ff', ['denklem', 'cebir']],
  ['Geometri', '5. Sınıf', 'Matematik', '△', '#ffe8ef', ['geometri', 'açı', 'şekil']]
].map(([title, grade, lesson, icon, soft, tags]) => ({ title, grade, lesson, icon, soft, tags }));

function normalizeText(value) {
  return String(value || '').toLocaleLowerCase('tr-TR').trim();
}

function includesQuery(parts, query) {
  if (!query) return true;
  return normalizeText(parts.join(' ')).includes(query);
}

function renderGrades(query = '') {
  const root = document.querySelector('#grade-grid');
  if (!root) return [];
  const normalized = normalizeText(query);
  const matches = gradeCards.filter((grade) => includesQuery(grade.tags, normalized));

  root.innerHTML = matches.map((grade) => `
    <article class="grade-card" style="--accent: ${grade.color}">
      <div class="grade-rosette">${grade.badge}</div>
      <h3>${grade.title}</h3>
      <p>${grade.description}</p>
      <div class="lesson-tags">
        <span>Matematik</span><span>Türkçe</span><span>Fen</span>
      </div>
      <a class="card-link" href="#beceri-ara" data-grade-link="${grade.title}">Becerileri gör →</a>
    </article>
  `).join('');

  root.querySelectorAll('[data-grade-link]').forEach((link) => {
    link.addEventListener('click', () => applySearch(link.dataset.gradeLink));
  });

  return matches;
}

function renderSkills(query = '') {
  const root = document.querySelector('#skill-results');
  if (!root) return [];
  const normalized = normalizeText(query);
  const matches = skills.filter((skill) => includesQuery([skill.title, skill.grade, skill.lesson, ...skill.tags], normalized));
  const list = normalized ? matches : skills;

  root.innerHTML = list.map((skill) => `
    <article class="skill-card">
      <span style="--soft: ${skill.soft}">${skill.icon}</span>
      <h3>${skill.title}</h3>
      <p>${skill.grade} • ${skill.lesson}</p>
      <a href="#uyelik">Başla →</a>
    </article>
  `).join('');

  return matches;
}

function setInputs(value) {
  document.querySelectorAll('.js-skill-search').forEach((input) => {
    if (input.value !== value) input.value = value;
  });
}

function applySearch(value = '') {
  const query = normalizeText(value);
  setInputs(value);
  const gradeMatches = renderGrades(value);
  const skillMatches = renderSkills(value);
  const empty = document.querySelector('#empty-message');
  if (empty) empty.hidden = !(query && gradeMatches.length === 0 && skillMatches.length === 0);
}

function initSearch() {
  document.querySelectorAll('.js-skill-search').forEach((input) => {
    input.addEventListener('input', () => applySearch(input.value));
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        applySearch(input.value);
        document.querySelector('#beceri-ara')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initMenu() {
  const button = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#main-menu');
  if (!button || !menu) return;
  button.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
}

function initInfoBand() {
  const closeButton = document.querySelector('.band-close');
  const band = document.querySelector('.info-band');
  if (!closeButton || !band) return;
  closeButton.addEventListener('click', () => {
    band.hidden = true;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderGrades();
  renderSkills();
  initSearch();
  initMenu();
  initInfoBand();
});
