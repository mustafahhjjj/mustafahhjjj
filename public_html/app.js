document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (!href.trim() || href === "#" || href.toLowerCase().startsWith("javascript:")) {
      console.warn("Boş veya geçersiz bağlantı bulundu:", link);
    }
  });

  const quiz = document.querySelector("[data-quiz]");
  if (quiz) {
    const correctAnswer = "11";
    const explanation = quiz.querySelector("[data-explanation]");
    const progressBar = quiz.querySelector("[data-progress-bar]");
    const buttons = Array.from(quiz.querySelectorAll("[data-answer]"));
    const nextButton = quiz.querySelector("[data-next-question]");

    const resetQuiz = () => {
      buttons.forEach((button) => {
        button.classList.remove("correct", "wrong");
        button.disabled = false;
      });
      if (explanation) explanation.classList.remove("show");
      if (progressBar) progressBar.style.width = "35%";
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const selected = button.dataset.answer;
        buttons.forEach((item) => {
          item.classList.remove("correct", "wrong");
          item.disabled = true;
          if (item.dataset.answer === correctAnswer) item.classList.add("correct");
        });
        if (selected !== correctAnswer) button.classList.add("wrong");
        if (explanation) explanation.classList.add("show");
        if (progressBar) progressBar.style.width = "100%";
      });
    });

    if (nextButton) nextButton.addEventListener("click", resetQuiz);
  }

  const homeworkButton = document.querySelector("[data-homework-submit]");
  const homeworkResponse = document.querySelector("[data-homework-response]");
  if (homeworkButton && homeworkResponse) {
    homeworkButton.addEventListener("click", () => homeworkResponse.classList.add("show"));
  }

  const messageButton = document.querySelector("[data-message-submit]");
  const messageResponse = document.querySelector("[data-message-response]");
  if (messageButton && messageResponse) {
    messageButton.addEventListener("click", () => messageResponse.classList.add("show"));
  }
});
