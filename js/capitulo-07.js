<!-- File: js/capitulo-07.js -->
/* =========================
   Capítulo 07 — JS específico
   Página 55: Mapa mecanístico de toxicidade + tooltip + pager
   ========================= */

(function initCap7Pager() {
  const prev = document.querySelector("[data-prev]");
  const next = document.querySelector("[data-next]");

  function go(to) {
    if (!to) return;
    window.location.href = to;
  }

  if (prev) prev.addEventListener("click", () => go(prev.getAttribute("data-prev")));
  if (next) next.addEventListener("click", () => go(next.getAttribute("data-next")));
})();

(function initCap7ToxMap() {
  const root = document.querySelector("[data-cap7-toxmap]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".tox-node[data-target]"));
  const display = root.querySelector("#tox-display");
  if (!tabs.length || !display) return;

  const templateByTarget = {
    proteica: "tox-proteica",
    membrana: "tox-membrana",
    folato: "tox-folato"
  };

  function setActive(key) {
    tabs.forEach((btn) => {
      const isActive = btn.dataset.target === key;
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      btn.tabIndex = isActive ? 0 : -1;
    });

    const tplId = templateByTarget[key];
    const tpl = tplId ? document.getElementById(tplId) : null;

    if (!tpl) {
      display.innerHTML = "<p>Selecione um mecanismo para visualizar possíveis efeitos adversos.</p>";
      return;
    }

    display.innerHTML = "";
    display.appendChild(tpl.content.cloneNode(true));
  }

  function activate(btn) {
    const key = btn.dataset.target;
    if (!key) return;
    setActive(key);
  }

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => activate(btn));

    btn.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(btn);
      if (i < 0) return;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          tabs[(i + 1) % tabs.length].focus();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          tabs[(i - 1 + tabs.length) % tabs.length].focus();
          break;
        case "Home":
          e.preventDefault();
          tabs[0].focus();
          break;
        case "End":
          e.preventDefault();
          tabs[tabs.length - 1].focus();
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          activate(btn);
          break;
      }
    });
  });

  const first = tabs.find((b) => b.getAttribute("aria-selected") === "true") || tabs[0];
  if (first) setActive(first.dataset.target);
})();

(function initCap7Tooltip() {
  const btn = document.querySelector("[data-cap7-tooltip]");
  if (!btn) return;

  const id = btn.getAttribute("aria-controls");
  const tip = id ? document.getElementById(id) : null;
  if (!tip) return;

  function close() {
    btn.setAttribute("aria-expanded", "false");
    tip.hidden = true;
  }

  function open() {
    btn.setAttribute("aria-expanded", "true");
    tip.hidden = false;
  }

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    if (expanded) close();
    else open();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  document.addEventListener("click", (e) => {
    if (!tip.hidden) {
      const inside = tip.contains(e.target) || btn.contains(e.target);
      if (!inside) close();
    }
  });
})();


