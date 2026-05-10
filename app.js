(() => {
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  function setupMenu() {
    const header = $(".site-header");
    const toggle = $(".menu-toggle,[data-menu-toggle]");
    const menus = $$(".nav-links,.main-nav,[data-mobile-menu]");
    const actions = $(".nav-actions");
    if (!header || !toggle) return;

    function setOpen(open) {
      header.classList.toggle("open", open);
      menus.forEach((menu) => menu.classList.toggle("is-open", open));
      actions?.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    }

    toggle.addEventListener("click", () => setOpen(!header.classList.contains("open")));
    header.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("click", (event) => {
      if (header.classList.contains("open") && !header.contains(event.target)) setOpen(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1050) setOpen(false);
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

  function setupHomeSearch() {
    const form = $("[data-home-search]");
    const input = $("[data-home-search-input]");
    const alertBox = $("[data-home-search-alert]");
    if (!form || !input) return;

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

    const routes = [
      { tests: ["matematik", "kesir", "toplama", "problem", "geometri", "turkce", "okuma", "dil bilgisi", "paragraf", "fen", "kuvvet", "madde", "canlilar", "elektrik", "sosyal", "tarih", "cografya", "ingilizce", "kelime", "reading"], href: "dersler.html" },
      { tests: ["test", "soru", "deneme", "quiz"], href: "testler.html" },
      { tests: ["odev", "yardim", "mustafa hoca"], href: "odev-yardimi.html" },
      { tests: ["teshis", "seviye", "diagnostic"], href: "diagnostic.html" },
      { tests: ["rozet", "basari", "madalya", "odul"], href: "basarilarim.html" },
      { tests: ["ogrenci"], href: "ogrenci-paneli.html" },
      { tests: ["veli"], href: "veli-paneli.html" },
      { tests: ["ogretmen"], href: "ogretmen-paneli.html" },
      { tests: ["giris", "login"], href: "giris.html" },
      { tests: ["mesaj", "iletisim"], href: "mesaj-gonder.html" }
    ];

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = normalizeSearchText(input.value);
      if (!query) {
        if (alertBox) {
          alertBox.textContent = "Lütfen çalışmak istediğin konuyu yaz.";
          alertBox.classList.add("show");
        }
        return;
      }

      const numericGrade = query.match(/\b(1[0-2]|[1-9])\s*(?:\.|sinif)?\b/);
      const wordGrade = Object.entries(gradeWords).find(([label]) => query.includes(label));
      if (numericGrade || wordGrade) {
        const grade = numericGrade ? numericGrade[1] : wordGrade[1];
        window.location.href = `${grade}-sinif.html`;
        return;
      }

      const match = routes.find((route) => route.tests.some((word) => query === word || query.includes(word)));
      if (match) {
        window.location.href = match.href;
        return;
      }

      if (alertBox) {
        alertBox.textContent = "Bu konu yakında eklenecek. Şimdilik dersler sayfasına yönlendiriyoruz.";
        alertBox.classList.add("show");
      }
      window.setTimeout(() => {
        window.location.href = "dersler.html";
      }, 650);
    });
  }

  function setupDemoButtons() {
    function show(message) {
      const output = $("[data-demo-output]");
      if (output) {
        output.textContent = message;
        output.classList.add("show");
      } else {
        alert(message);
      }
    }

    $$('[data-demo-action]').forEach((button) => {
      button.addEventListener("click", () => show(button.getAttribute("data-demo-action") || "Demo işlem tamamlandı."));
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
    }
  ];

  function setupSmartTest() {
    const root = $("[data-test-root]");
    if (!root) return;

    let current = 0;
    let answered = false;
    let score = 0;
    let streak = 0;

    function setText(selector, value) {
      const element = $(selector);
      if (element) element.textContent = value;
    }

    function renderScore(note = "") {
      setText("[data-smartscore]", score);
      setText("[data-floating-score]", score);
      setText("[data-streak]", streak);
      const fill = $("[data-progress-fill]");
      if (fill) fill.style.width = `${Math.max(4, score)}%`;
      const floatingFill = $("[data-floating-progress]");
      if (floatingFill) floatingFill.style.width = `${Math.max(4, score)}%`;
      const ring = $("[data-score-ring]");
      if (ring) ring.style.setProperty("--score", `${score * 3.6}deg`);
      const scoreNote = $("[data-score-note]");
      if (scoreNote) scoreNote.textContent = note || (score ? "Devam et, beceri güçleniyor." : "Başlamak için bir cevap seç");
    }

    function showExplanation(question, correct) {
      const explanation = $("[data-explanation]");
      if (!explanation) return;
      const steps = question.steps?.length ? `<ol>${question.steps.map((step) => `<li>${step}</li>`).join("")}</ol>` : "";
      explanation.innerHTML = `<strong>${correct ? "Doğru cevapladın." : "Yanlış cevapladın. İşte çözüm adımları:"}</strong><p>${question.explanation}</p>${steps}`;
      explanation.classList.add("show");
      window.MathJax?.typesetPromise?.();
    }

    function renderQuestion() {
      const question = questions[current];
      answered = false;
      setText("[data-question-text]", question.text);
      setText("[data-question-count]", `${current + 1}/${questions.length}`);
      const answers = $("[data-answers]");
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
      const explanation = $("[data-explanation]");
      if (explanation) {
        explanation.innerHTML = "";
        explanation.classList.remove("show");
      }
      const next = $("[data-next-question]");
      if (next) next.disabled = true;
      renderScore();
      window.MathJax?.typesetPromise?.();
    }

    function checkAnswer(index) {
      if (answered) return;
      answered = true;
      const question = questions[current];
      const buttons = $$(".answer-btn", root);
      const correct = index === question.correct;
      buttons.forEach((button) => (button.disabled = true));
      buttons[index]?.classList.add(correct ? "correct" : "wrong");
      buttons[question.correct]?.classList.add("correct");
      streak = correct ? streak + 1 : 0;
      score = Math.max(0, Math.min(100, score + (correct ? 18 : -8)));
      showExplanation(question, correct);
      const next = $("[data-next-question]");
      if (next) next.disabled = false;
      renderScore(correct ? "Harika, doğru cevap." : "Çözüm adımlarını incele ve devam et.");
    }

    $("[data-next-question]")?.addEventListener("click", () => {
      current = (current + 1) % questions.length;
      renderQuestion();
    });

    $("[data-show-explanation]")?.addEventListener("click", () => showExplanation(questions[current], true));
    $("[data-not-learned]")?.addEventListener("click", () => {
      const explanation = $("[data-explanation]");
      if (!explanation) return;
      explanation.innerHTML = '<strong>Önce alt kazanımı çalışalım.</strong><p>Bu beceriyi öğrenmek için ilgili ders sayfasındaki temel kazanımlardan başlayabilirsin.</p><a class="btn btn-primary" href="dersler.html">Derslere Git</a>';
      explanation.classList.add("show");
    });

    renderQuestion();
  }

  function setupLegacyQuiz() {
    const root = $("[data-quiz]");
    if (!root) return;

    const buttons = $$('[data-answer]', root);
    const explanation = $("[data-explanation]", root);
    const next = $("[data-next-question]", root);
    const progress = $("[data-progress-bar]", root);
    const correctAnswer = "11";

    function reset() {
      buttons.forEach((button) => {
        button.disabled = false;
        button.classList.remove("correct", "wrong");
      });
      explanation?.classList.remove("show");
      if (next) next.disabled = true;
      if (progress) progress.style.width = "0%";
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const isCorrect = button.getAttribute("data-answer") === correctAnswer;
        buttons.forEach((item) => {
          item.disabled = true;
          if (item.getAttribute("data-answer") === correctAnswer) item.classList.add("correct");
        });
        if (!isCorrect) button.classList.add("wrong");
        if (explanation) explanation.classList.add("show");
        if (next) next.disabled = false;
        if (progress) progress.style.width = "100%";
      });
    });

    next?.addEventListener("click", reset);
    reset();
  }

  function setupUtilityButtons() {
    $('[data-read-question]')?.addEventListener("click", () => {
      const text = $('[data-question-text]')?.textContent || $('[data-question]')?.textContent || "";
      if (!("speechSynthesis" in window) || !text) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tr-TR";
      window.speechSynthesis.speak(utterance);
    });

    $('[data-contrast-toggle]')?.addEventListener("click", () => document.body.classList.toggle("high-contrast"));

    $$('[data-homework-submit],[data-message-submit]').forEach((button) => {
      button.addEventListener("click", () => {
        const output = $('[data-demo-output]') || $('[data-form-output]') || $('[data-message-output]');
        if (output) {
          output.textContent = "Talebin alındı. Demo akışında kayıt oluşturuldu.";
          output.classList.add("show");
        }
      });
    });
  }

  setupMenu();
  setupHomeSearch();
  setupDemoButtons();
  setupSmartTest();
  setupLegacyQuiz();
  setupUtilityButtons();

  $$('a').forEach((link) => {
    if (link.getAttribute("href") === "#") console.warn("Boş link bulundu:", link);
  });
})();
