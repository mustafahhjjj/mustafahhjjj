const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle && siteHeader) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteHeader.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader.classList.contains("open")) return;
    if (siteHeader.contains(event.target)) return;
    siteHeader.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
}

function normalizeSearchText(value) {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function showDemoMessage(message) {
  const output = document.querySelector("[data-demo-output]");
  if (output) {
    output.textContent = message;
    output.classList.add("show");
    return;
  }
  alert(message);
}

document.querySelectorAll("[data-demo-action]").forEach((button) => {
  button.addEventListener("click", () => {
    showDemoMessage(button.getAttribute("data-demo-action") || "Demo işlem tamamlandı.");
  });
});

const homeSearchForm = document.querySelector("[data-home-search]");
const homeSearchInput = document.querySelector("[data-home-search-input]");
const homeSearchAlert = document.querySelector("[data-home-search-alert]");

if (homeSearchForm && homeSearchInput) {
  homeSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = normalizeSearchText(homeSearchInput.value);
    const compactQuery = query;
    if (!compactQuery) {
      if (homeSearchAlert) {
        homeSearchAlert.textContent = "Lütfen çalışmak istediğin konuyu yaz.";
        homeSearchAlert.classList.add("show");
      }
      return;
    }
    for (let grade = 12; grade >= 1; grade -= 1) {
      const gradePattern = new RegExp(`(^|\\s)${grade}(\\.|\\. sinif| sinif|\\.sınıf| sınıf)(\\s|$)`, "i");
      if (gradePattern.test(compactQuery)) {
        window.location.href = `${grade}-sinif.html`;
        return;
      }
    }
    const gradeWords = {
      "birinci sinif": 1,
      "ikinci sinif": 2,
      "ucuncu sinif": 3,
      "dorduncu sinif": 4,
      "besinci sinif": 5,
      "altinci sinif": 6,
      "yedinci sinif": 7,
      "sekizinci sinif": 8,
      "dokuzuncu sinif": 9,
      "onuncu sinif": 10,
      "on birinci sinif": 11,
      "on ikinci sinif": 12
    };
    const numericGrade = compactQuery.match(/^([1-9]|1[0-2])(\.|\. sinif| sinif)?$/);
    const wordGrade = Object.entries(gradeWords).find(([label]) => compactQuery.includes(label));
    if (numericGrade || wordGrade) {
      const grade = numericGrade ? numericGrade[1] : wordGrade[1];
      window.location.href = `${grade}-sinif.html`;
      return;
    }
    const routes = [
      { tests: ["matematik", "kesir", "toplama", "problem", "geometri", "turkce", "okuma", "dil bilgisi", "paragraf", "fen", "kuvvet", "madde", "canlilar", "elektrik", "sosyal", "tarih", "cografya", "ingilizce", "kelime", "reading"], href: "dersler.html" },
      { tests: ["test", "soru", "deneme", "quiz"], href: "testler.html" },
      { tests: ["odev", "yardim", "mustafa hoca"], href: "odev-yardimi.html" },
      { tests: ["teshis", "seviye", "diagnostic"], href: "diagnostic.html" },
      { tests: ["rozet", "basari", "madalya", "odul"], href: "basarilarim.html" },
      { tests: ["veli"], href: "veli-paneli.html" },
      { tests: ["ogretmen"], href: "ogretmen-paneli.html" },
      { tests: ["mesaj"], href: "mesaj-gonder.html" }
    ];
    const match = routes.find((route) => route.tests.some((word) => query === word || query.includes(word)));
    if (match) {
      window.location.href = match.href;
      return;
    }
    if (homeSearchAlert) {
      homeSearchAlert.textContent = "Bu konu yakında eklenecek. Şimdilik dersler sayfasına yönlendiriyoruz.";
      homeSearchAlert.classList.add("show");
      window.setTimeout(() => {
        window.location.href = "dersler.html";
      }, 1000);
    }
  });
}

const questions = [
  {
    text: "8 + 3 kaç eder?",
    answers: ["9", "10", "11", "12"],
    correct: 2,
    explanation: "8’in üzerine 3 eklenirse 11 olur.",
    steps: ["8’den başla.", "3 kez ileri say: 9, 10, 11.", "Bu yüzden doğru cevap 11’dir."]
  },
  {
    text: "15 - 6 kaç eder?",
    answers: ["7", "8", "9", "10"],
    correct: 2,
    explanation: "15’ten 6 çıkarılırsa 9 kalır.",
    steps: ["15’ten 5 çıkarınca 10 kalır.", "1 daha çıkarınca 9 kalır.", "Sonuç 9 olur."]
  },
  {
    text: "4 x 3 kaç eder?",
    answers: ["7", "10", "12", "14"],
    correct: 2,
    explanation: "4 tane 3, 3 + 3 + 3 + 3 demektir ve sonuç 12 olur.",
    steps: ["Çarpma tekrar eden toplama demektir.", "3 + 3 + 3 + 3 = 12.", "Bu yüzden 4 x 3 = 12."]
  },
  {
    text: "\\( f(x)=x^2+1 \\) ise \\( f(3) \\) kaçtır?",
    answers: ["7", "8", "10", "12"],
    correct: 2,
    explanation: "\\( x \\) yerine 3 yazılır: \\( f(3)=3^2+1=9+1=10 \\).",
    steps: ["Formülde x gördüğün yere 3 yaz.", "\\(3^2 = 9\\).", "9 + 1 = 10."]
  }
];

let currentQuestion = 0;
let smartScore = 0;
let answered = false;
let streak = 0;

const encouragements = ["Harika!", "Çok iyi gidiyorsun!", "Keep it up!", "Beceri güçleniyor!"];

function clampScore(value) {
  return Math.max(0, Math.min(100, value));
}

function smartScoreGain(score, currentStreak) {
  const distance = 100 - score;
  const base = Math.max(2, Math.round(distance * 0.18));
  return Math.min(14, base + Math.min(4, currentStreak));
}

function smartScorePenalty(score) {
  return Math.max(4, Math.round(score * 0.08));
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function renderScore(message = "") {
  setText("[data-smartscore]", smartScore);
  setText("[data-floating-score]", smartScore);
  setText("[data-streak]", streak);
  const fill = document.querySelector("[data-progress-fill]");
  if (fill) fill.style.width = `${Math.max(4, smartScore)}%`;
  const floatingFill = document.querySelector("[data-floating-progress]");
  if (floatingFill) floatingFill.style.width = `${Math.max(4, smartScore)}%`;
  const ring = document.querySelector("[data-score-ring]");
  if (ring) ring.style.setProperty("--score", `${smartScore * 3.6}deg`);
  const note = document.querySelector("[data-score-note]");
  if (note) {
    if (message) note.textContent = message;
    else if (smartScore === 100) note.textContent = "Ustalaştın";
    else if (smartScore >= 80) note.textContent = "Çok iyi gidiyorsun";
    else note.textContent = "Başlamak için bir cevap seç";
  }
}

function showToast(message, type = "success") {
  const toast = document.querySelector("[data-toast]");
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function formatExplanation(question, correct) {
  const steps = question.steps?.length
    ? `<ol>${question.steps.map((step) => `<li>${step}</li>`).join("")}</ol>`
    : "";
  return `<strong>${correct ? "Doğru cevapladın." : "Yanlış cevapladın. İşte çözüm adımları:"}</strong><p>${question.explanation}</p>${steps}`;
}

function typesetMath() {
  if (window.MathJax?.typesetPromise) {
    window.MathJax.typesetPromise();
  }
}

function renderTestQuestion() {
  const root = document.querySelector("[data-test-root]");
  if (!root) return;
  const question = questions[currentQuestion];
  answered = false;
  setText("[data-question-text]", question.text);
  setText("[data-question-count]", `${currentQuestion + 1}/${questions.length}`);
  const answers = document.querySelector("[data-answers]");
  if (answers) {
    answers.innerHTML = "";
    question.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.className = "answer-btn";
      button.type = "button";
      button.textContent = answer;
      button.addEventListener("click", () => checkAnswer(index));
      answers.appendChild(button);
    });
  }
  const explanation = document.querySelector("[data-explanation]");
  if (explanation) {
    explanation.innerHTML = "";
    explanation.classList.remove("show");
  }
  const next = document.querySelector("[data-next-question]");
  if (next) next.disabled = true;
  renderScore();
  typesetMath();
}

function showExplanation(html) {
  const explanation = document.querySelector("[data-explanation]");
  if (!explanation) return;
  explanation.innerHTML = html;
  explanation.classList.add("show");
}

function checkAnswer(index) {
  if (answered) return;
  answered = true;
  const question = questions[currentQuestion];
  const buttons = [...document.querySelectorAll(".answer-btn")];
  buttons.forEach((button) => {
    button.disabled = true;
  });
  const correct = index === question.correct;
  if (correct) {
    buttons[index]?.classList.add("correct");
    streak += 1;
    smartScore = clampScore(smartScore + smartScoreGain(smartScore, streak));
    showToast(encouragements[Math.min(encouragements.length - 1, streak - 1)], "success");
  } else {
    buttons[index]?.classList.add("wrong");
    buttons[question.correct]?.classList.add("correct");
    streak = 0;
    smartScore = clampScore(smartScore - smartScorePenalty(smartScore));
    showToast("Hata öğrenmenin parçası. Çözüm adımlarına bakalım.", "warning");
  }
  showExplanation(formatExplanation(question, correct));
  const next = document.querySelector("[data-next-question]");
  if (next) next.disabled = false;
  renderScore(smartScore === 100 ? "Harika! Bu beceride ustalaştın." : "");
  typesetMath();
}

const nextQuestionButton = document.querySelector("[data-next-question]");
if (nextQuestionButton) {
  nextQuestionButton.addEventListener("click", () => {
    currentQuestion = (currentQuestion + 1) % questions.length;
    renderTestQuestion();
  });
  renderTestQuestion();
}

const showExplanationButton = document.querySelector("[data-show-explanation]");
if (showExplanationButton) {
  showExplanationButton.addEventListener("click", () => {
    const question = questions[currentQuestion];
    showExplanation(formatExplanation(question, true));
    typesetMath();
  });
}

const notLearnedButton = document.querySelector("[data-not-learned]");
if (notLearnedButton) {
  notLearnedButton.addEventListener("click", () => {
    showExplanation('<strong>Önce alt kazanımı çalışalım.</strong><p>Bu beceriyi öğrenmek için ilgili ders sayfasındaki temel kazanımlardan başlayabilirsin.</p><a class="btn btn-primary" href="dersler.html">Derslere Git</a>');
  });
}

const readQuestionButton = document.querySelector("[data-read-question]");
if (readQuestionButton) {
  readQuestionButton.addEventListener("click", () => {
    const text = document.querySelector("[data-question-text]")?.textContent || "";
    if (!("speechSynthesis" in window)) {
      alert("Bu tarayıcı sesli okumayı desteklemiyor.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    window.speechSynthesis.speak(utterance);
  });
}

function setupScratchpad() {
  const canvas = document.querySelector("[data-scratchpad]");
  if (!canvas) return;
  const panel = document.querySelector("[data-scratchpad-panel]");
  const toggle = document.querySelector("[data-scratchpad-toggle]");
  const clear = document.querySelector("[data-scratchpad-clear]");
  const context = canvas.getContext("2d");
  let drawing = false;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(320, Math.floor(rect.width));
    canvas.height = 220;
    context.lineWidth = 4;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#2563eb";
  }

  function point(event) {
    const rect = canvas.getBoundingClientRect();
    const source = event.touches ? event.touches[0] : event;
    return { x: source.clientX - rect.left, y: source.clientY - rect.top };
  }

  function start(event) {
    drawing = true;
    const p = point(event);
    context.beginPath();
    context.moveTo(p.x, p.y);
    event.preventDefault();
  }

  function move(event) {
    if (!drawing) return;
    const p = point(event);
    context.lineTo(p.x, p.y);
    context.stroke();
    event.preventDefault();
  }

  function stop() {
    drawing = false;
  }

  toggle?.addEventListener("click", () => {
    panel?.classList.toggle("show");
    resizeCanvas();
  });
  clear?.addEventListener("click", () => context.clearRect(0, 0, canvas.width, canvas.height));
  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", move);
  window.addEventListener("mouseup", stop);
  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", move, { passive: false });
  window.addEventListener("touchend", stop);
}

setupScratchpad();

const contrastToggle = document.querySelector("[data-contrast-toggle]");
if (contrastToggle) {
  contrastToggle.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
  });
}

document.querySelectorAll("a").forEach((link) => {
  if (link.getAttribute("href") === "#") {
    console.warn("Boş link bulundu:", link);
  }
});
