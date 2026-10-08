// Mobile navigation toggle. The site works without JavaScript; this only collapses the menu on small screens.
(function () {
  var btn = document.querySelector(".nav-toggle"), nav = document.getElementById("site-nav");
  if (!btn || !nav) return;
  document.documentElement.classList.add("js");
  btn.addEventListener("click", function () {
    var open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) { btn.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); btn.focus(); }
  });
})();
