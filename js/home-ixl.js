(function () {
  var btn = document.querySelector(".menu-btn");
  var panel = document.getElementById("mobil");
  if (!btn || !panel) return;

  btn.addEventListener("click", function () {
    var open = panel.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  panel.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      panel.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();
