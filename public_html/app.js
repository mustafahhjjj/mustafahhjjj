document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".mobile-toggle");

  if (toggle && header) {
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-scroll-target]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const target = document.querySelector(btn.dataset.scrollTarget);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const quiz = document.querySelector("[data-quiz]");
  if (quiz) {
    const questions = [
      {
        text: "Soru 1: Aşağıdakilerden hangisi 5 sayısını gösterir?",
        options: ["3", "4", "5", "6"],
        answer: 2,
        explanation:
          "5 sayısını bulmak için beş nesneyi ya da rakamla yazılmış 5’i ararız. Doğru cevap C seçeneğidir.",
      },
      {
        text: "Soru 2: 7 sayısından hemen önce hangi sayı gelir?",
        options: ["5", "6", "8", "9"],
        answer: 1,
        explanation:
          "Sayıları sırayla sayınca 5, 6, 7 şeklinde ilerleriz. 7’den hemen önce 6 gelir.",
      },
      {
        text: "Soru 3: 2 onluk ve 3 birlik hangi sayıdır?",
        options: ["23", "32", "203", "5"],
        answer: 0,
        explanation: "2 onluk 20 eder. 3 birlik eklenince 23 olur.",
      },
    ];

    let index = 0;
    let selected = null;
    const title = quiz.querySelector("[data-question-title]");
    const answers = quiz.querySelector("[data-answers]");
    const explain = quiz.querySelector("[data-explanation]");
    const check = quiz.querySelector("[data-check]");
    const next = quiz.querySelector("[data-next]");

    function renderQuestion() {
      selected = null;
      const question = questions[index];
      title.textContent = question.text;
      answers.innerHTML = "";
      explain.classList.remove("show");
      explain.textContent = "";

      question.options.forEach((option, optionIndex) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer";
        button.textContent = `${String.fromCharCode(65 + optionIndex)}) ${option}`;
        button.addEventListener("click", () => {
          selected = optionIndex;
          answers
            .querySelectorAll(".answer")
            .forEach((item) => item.classList.remove("selected", "correct", "wrong"));
          button.classList.add("selected");
        });
        answers.appendChild(button);
      });
    }

    check?.addEventListener("click", () => {
      if (selected === null) {
        explain.textContent = "Önce bir cevap seç, sonra kontrol edelim.";
        explain.classList.add("show");
        return;
      }

      const question = questions[index];
      answers.querySelectorAll(".answer").forEach((button, optionIndex) => {
        button.classList.remove("selected");
        if (optionIndex === question.answer) button.classList.add("correct");
        if (optionIndex === selected && optionIndex !== question.answer) {
          button.classList.add("wrong");
        }
      });
      explain.textContent = question.explanation;
      explain.classList.add("show");
    });

    next?.addEventListener("click", () => {
      index = (index + 1) % questions.length;
      renderQuestion();
    });

    renderQuestion();
  }

  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = form.querySelector("[data-form-message]");
      if (message) {
        message.textContent =
          "Bilgiler alındı. Bu demo arayüz PHP/MySQL bağlantısı için hazır yapıdadır.";
        message.classList.add("show");
      }
    });
  });
});
