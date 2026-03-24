/* ---------- Página 1: AMR ---------- */
(function () {
  const petri = document.getElementById("petri");
  if (!petri) return;

  const btnStep = document.getElementById("btnStep");
  const btnReset = document.getElementById("btnReset");
  const cap = document.getElementById("amrCaption");
  const prompt = document.getElementById("amrPrompt");

  if (!btnStep || !btnReset || !cap) return;

  const TOTAL = 70;
  const RESISTANT = 10;
  const SENSITIVE = TOTAL - RESISTANT;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function clear() {
    petri.innerHTML = "";
  }

  function spawn() {
    clear();

    for (let i = 0; i < SENSITIVE; i++) {
      const d = document.createElement("div");
      d.className = "bug sensitive";
      d.style.left = rand(6, 94) + "%";
      d.style.top = rand(10, 90) + "%";
      petri.appendChild(d);
    }

    for (let i = 0; i < RESISTANT; i++) {
      const d = document.createElement("div");
      d.className = "bug resistant";
      d.style.left = rand(6, 94) + "%";
      d.style.top = rand(10, 90) + "%";
      petri.appendChild(d);
    }
  }

  let phase = 0;

  function setPrompt() {
    if (!prompt) return;

    if (phase === 0) {
      prompt.textContent =
        "O que você espera que aconteça com a população bacteriana após a exposição ao antibacteriano?";
      return;
    }

    if (phase === 1) {
      prompt.textContent =
        "Agora observe: quais microrganismos tendem a desaparecer primeiro quando o antibacteriano é aplicado?";
      return;
    }

    prompt.textContent =
      "Após a pressão seletiva, quais bactérias passam a predominar na população?";
  }

  function setCaption() {
    if (phase === 0) {
      cap.textContent =
        "Etapa 1 — População inicial: a maioria das bactérias é sensível ao antibacteriano, mas variantes resistentes podem estar presentes em baixa frequência na população.";
      btnStep.textContent = "Etapa 2 — Aplicar antibacteriano";
      return;
    }

    if (phase === 1) {
      cap.textContent =
        "Etapa 2 — Aplicação do antibacteriano: o fármaco elimina principalmente os microrganismos sensíveis, exercendo pressão seletiva sobre a população bacteriana.";
      btnStep.textContent = "Etapa 3 — Observar seleção";
      return;
    }

    cap.textContent =
      "Etapa 3 — Seleção de resistentes: as variantes resistentes sobrevivem à exposição ao antibacteriano e passam a se multiplicar. Com a eliminação dos microrganismos sensíveis, essas bactérias expandem-se na população e tornam-se predominantes.";
    btnStep.textContent = "Recomeçar";
  }

  function applyPhase() {
    petri.classList.remove("phase-1", "phase-2");

    if (phase === 1) petri.classList.add("phase-1");
    if (phase === 2) petri.classList.add("phase-1", "phase-2");

    setPrompt();
    setCaption();
  }

  btnStep.addEventListener("click", () => {
    if (phase === 0) {
      phase = 1;
      applyPhase();
      return;
    }

    if (phase === 1) {
      for (let i = 0; i < 22; i++) {
        const d = document.createElement("div");
        d.className = "bug resistant";
        d.style.left = rand(6, 94) + "%";
        d.style.top = rand(10, 90) + "%";
        d.style.opacity = "0";
        petri.appendChild(d);

        requestAnimationFrame(() => {
          d.style.opacity = "1";
        });
      }

      phase = 2;
      applyPhase();
      return;
    }

    phase = 0;
    spawn();
    applyPhase();
  });

  btnReset.addEventListener("click", () => {
    phase = 0;
    spawn();
    applyPhase();
  });

  spawn();
  applyPhase();
})();
/* ---------- Página 2: Timeline ---------- */
(function () {
  const root = document.querySelector("[data-cap1-timeline]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('[role="tab"][data-target]'));
  const panes = Array.from(root.querySelectorAll(".cap1-panelPane[data-pane]"));
  const nodes = Array.from(root.querySelectorAll(".cap1-node"));

  const lightbox = document.getElementById("cap1Lightbox");
  const lightboxImage = document.getElementById("cap1LightboxImage");
  const lightboxCaption = document.getElementById("cap1LightboxCaption");
  const zoomTriggers = Array.from(root.querySelectorAll(".cap1-zoomTrigger"));
  const lightboxClosers = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]")) : [];

  function openPane(key) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.target === key;
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.tabIndex = isActive ? 0 : -1;
    });

    nodes.forEach((node) => {
      const btn = node.querySelector("[data-target]");
      const active = btn && btn.dataset.target === key;
      node.classList.toggle("is-active", active);
    });

    panes.forEach((pane) => {
      const isTarget = pane.dataset.pane === key;
      if (isTarget) pane.removeAttribute("hidden");
      else pane.setAttribute("hidden", "");
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      openPane(tab.dataset.target);
    });

    tab.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(tab);

      if (e.key === "ArrowRight") {
        e.preventDefault();
        tabs[(i + 1) % tabs.length].focus();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        tabs[(i - 1 + tabs.length) % tabs.length].focus();
      }

      if (e.key === "Home") {
        e.preventDefault();
        tabs[0].focus();
      }

      if (e.key === "End") {
        e.preventDefault();
        tabs[tabs.length - 1].focus();
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPane(tab.dataset.target);
      }
    });
  });

  function openLightbox(src, alt, caption) {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  zoomTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
    });
  });

  lightboxClosers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  openPane("1928");
})();
/* ---------- Página 2: Timeline ---------- */
(function () {
  const root = document.querySelector("[data-cap1-timeline]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('[role="tab"][data-target]'));
  const panes = Array.from(root.querySelectorAll(".cap1-panelPane[data-pane]"));
  const nodes = Array.from(root.querySelectorAll(".cap1-node"));

  const lightbox = document.getElementById("cap1Lightbox");
  const lightboxImage = document.getElementById("cap1LightboxImage");
  const lightboxCaption = document.getElementById("cap1LightboxCaption");
  const zoomTriggers = Array.from(root.querySelectorAll(".cap1-zoomTrigger"));
  const lightboxClosers = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]")) : [];

  function openPane(key) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.target === key;
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.tabIndex = isActive ? 0 : -1;
    });

    nodes.forEach((node) => {
      const btn = node.querySelector("[data-target]");
      const active = btn && btn.dataset.target === key;
      node.classList.toggle("is-active", active);
    });

    panes.forEach((pane) => {
      const isTarget = pane.dataset.pane === key;
      if (isTarget) pane.removeAttribute("hidden");
      else pane.setAttribute("hidden", "");
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      openPane(tab.dataset.target);
    });

    tab.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(tab);

      if (e.key === "ArrowRight") {
        e.preventDefault();
        tabs[(i + 1) % tabs.length].focus();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        tabs[(i - 1 + tabs.length) % tabs.length].focus();
      }

      if (e.key === "Home") {
        e.preventDefault();
        tabs[0].focus();
      }

      if (e.key === "End") {
        e.preventDefault();
        tabs[tabs.length - 1].focus();
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPane(tab.dataset.target);
      }
    });
  });

  function openLightbox(src, alt, caption) {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  zoomTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
    });
  });

  lightboxClosers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  openPane("1928");
})();
/* =========================
   Página 3 — Bases conceituais
   ========================= */
(function initCap1ConceptTree() {
  const root = document.querySelector("[data-cap1-concept-tree]");
  if (!root) return;

  const viewer = document.getElementById("cap1-viewer-content");
  const viewerEmpty = document.getElementById("cap1-viewer-empty");
  const viewerTitle = document.getElementById("cap1-viewer-title");
  const buttons = Array.from(root.querySelectorAll(".cap1-p03-btn"));

  if (!viewer || !viewerEmpty || !viewerTitle || !buttons.length) return;

  const tplIdByTarget = {
    antimicrobianos: "tpl-antimicrobianos",
    antibacterianos: "tpl-antibacterianos",
    naturais: "tpl-naturais",
    semissinteticos: "tpl-semissinteticos",
    sinteticos: "tpl-sinteticos"
  };

  const labelByTarget = {
    antimicrobianos: "Antimicrobianos",
    antibacterianos: "Antibacterianos",
    naturais: "Naturais",
    semissinteticos: "Semissintéticos",
    sinteticos: "Sintéticos"
  };

  function setActiveButton(activeBtn) {
    buttons.forEach((btn) => {
      const isActive = btn === activeBtn;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function renderTarget(target) {
    const tplId = tplIdByTarget[target];
    if (!tplId) return;

    const tpl = document.getElementById(tplId);
    if (!tpl) return;

    viewer.innerHTML = tpl.innerHTML;
    viewer.hidden = false;
    viewerEmpty.hidden = true;
    viewerTitle.textContent = labelByTarget[target] || "Definição";
  }

  function activateButton(btn, shouldScroll = false) {
    const target = btn.dataset.target;
    if (!target) return;

    setActiveButton(btn);
    renderTarget(target);

    if (shouldScroll && window.innerWidth <= 920) {
      const viewerPanel = document.querySelector(".cap1-p03-viewer");
      if (viewerPanel) {
        viewerPanel.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activateButton(btn, true);
    });

    btn.addEventListener("keydown", (event) => {
      const index = buttons.indexOf(btn);
      if (index < 0) return;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          event.preventDefault();
          buttons[(index + 1) % buttons.length].focus();
          break;

        case "ArrowUp":
        case "ArrowLeft":
          event.preventDefault();
          buttons[(index - 1 + buttons.length) % buttons.length].focus();
          break;

        case "Home":
          event.preventDefault();
          buttons[0].focus();
          break;

        case "End":
          event.preventDefault();
          buttons[buttons.length - 1].focus();
          break;

        case "Enter":
        case " ":
          event.preventDefault();
          activateButton(btn, true);
          break;
      }
    });
  });

  const defaultBtn =
    root.querySelector('.cap1-p03-btn[data-target="antibacterianos"]') ||
    buttons[0];

  activateButton(defaultBtn, false);
})();
/* =========================
   Página 4 — Toxicidade seletiva
   ========================= */
(function initCap1Page04Zoom() {
  const triggers = Array.from(document.querySelectorAll(".cap1-page4 .cap1-zoomTrigger"));
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap1Lightbox");
  const lightboxImage = document.getElementById("cap1LightboxImage");
  const lightboxCaption = document.getElementById("cap1LightboxCaption");
  const closers = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]")) : [];

  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  function openLightbox(src, alt, caption) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
    });
  });

  closers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
/* =========================
   Página 5 — Janela terapêutica
   ========================= */
(function initCap1Page05() {
  const visual = document.querySelector("[data-cap1-window]");
  if (!visual) return;

  const tabs = Array.from(visual.querySelectorAll("[data-window-tab]"));
  const scenes = Array.from(visual.querySelectorAll("[data-window-scene]"));
  const feedback = visual.querySelector("[data-window-feedback]");
  const stateEl = visual.querySelector("[data-window-state]");
  const textEl = visual.querySelector("[data-window-text]");

  if (!tabs.length || !scenes.length || !feedback || !stateEl || !textEl) return;

  const contentMap = {
    low: {
      state: "Baixa exposição",
      text: "Neste cenário, a concentração do antibacteriano permanece abaixo do limiar eficaz por tempo insuficiente. Isso pode comprometer o controle da infecção e favorecer a persistência de subpopulações bacterianas menos suscetíveis.",
      tone: "low"
    },
    ok: {
      state: "Exposição terapêutica",
      text: "Neste cenário, a concentração do antibacteriano ultrapassa o nível mínimo necessário para efeito terapêutico e permanece abaixo do limiar em que a toxicidade se torna mais provável.",
      tone: "ok"
    },
    high: {
      state: "Exposição excessiva",
      text: "Neste cenário, a exposição ultrapassa a faixa terapêutica e se aproxima de níveis associados ao aumento da probabilidade de toxicidade para o hospedeiro.",
      tone: "high"
    }
  };

  function setScenario(key) {
    tabs.forEach((tab) => {
      const active = tab.dataset.windowTab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    scenes.forEach((scene) => {
      const active = scene.dataset.windowScene === key;
      if (active) scene.removeAttribute("hidden");
      else scene.setAttribute("hidden", "");
    });

    stateEl.textContent = contentMap[key].state;
    textEl.textContent = contentMap[key].text;

    feedback.classList.remove("cap1-p05-feedback--low", "cap1-p05-feedback--ok", "cap1-p05-feedback--high");
    feedback.classList.add(`cap1-p05-feedback--${contentMap[key].tone}`);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setScenario(tab.dataset.windowTab);
    });

    tab.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(tab);

      if (e.key === "ArrowRight") {
        e.preventDefault();
        tabs[(i + 1) % tabs.length].focus();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        tabs[(i - 1 + tabs.length) % tabs.length].focus();
      }

      if (e.key === "Home") {
        e.preventDefault();
        tabs[0].focus();
      }

      if (e.key === "End") {
        e.preventDefault();
        tabs[tabs.length - 1].focus();
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setScenario(tab.dataset.windowTab);
      }
    });
  });

  setScenario("ok");
})();
/* =========================
   Página 6 — Espectro de ação
   ========================= */
(function initCap1Page06Zoom() {
  const triggers = Array.from(document.querySelectorAll(".cap1-page6 .cap1-zoomTrigger"));
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap1Lightbox");
  const lightboxImage = document.getElementById("cap1LightboxImage");
  const lightboxCaption = document.getElementById("cap1LightboxCaption");
  const closers = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]")) : [];

  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  function openLightbox(src, alt, caption) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
    });
  });

  closers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
/* =========================
   Página 7 — Colonização, contaminação e infecção
   ========================= */
(function initCap1Page07() {
  const items = Array.from(document.querySelectorAll(".cap1-page7 .cap1-p07-item"));
  if (!items.length) return;

  function setActive(targetItem) {
    items.forEach((item) => {
      const trigger = item.querySelector(".cap1-p07-trigger");
      const panel = item.querySelector(".cap1-p07-panel");
      const isActive = item === targetItem;

      item.classList.toggle("is-active", isActive);

      if (trigger) {
        trigger.setAttribute("aria-expanded", isActive ? "true" : "false");
      }

      if (panel) {
        if (isActive) panel.removeAttribute("hidden");
        else panel.setAttribute("hidden", "");
      }
    });
  }

  items.forEach((item) => {
    const trigger = item.querySelector(".cap1-p07-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const alreadyActive = item.classList.contains("is-active");
      if (!alreadyActive) setActive(item);
    });
  });

  const defaultItem =
    document.querySelector('.cap1-page7 .cap1-p07-item[data-p07-item="colonizacao"]') ||
    items[0];

  setActive(defaultItem);
})();
/* =========================
   Página 8 — Terapia empírica e terapia dirigida
   ========================= */
(function initCap1Page08() {
  const flow = document.querySelector("[data-cap1-p08-flow]");

  if (flow) {
    const cards = Array.from(flow.querySelectorAll("[data-p08-choice]"));
    const titleEl = flow.querySelector("[data-p08-title]");
    const textEl = flow.querySelector("[data-p08-text]");
    const tagEl = flow.querySelector("[data-p08-tag]");

    const contentMap = {
      manter: {
        title: "Manter",
        text: "O esquema inicial pode ser mantido quando a evolução clínica e os dados microbiológicos disponíveis permanecem compatíveis com a escolha terapêutica adotada.",
        tag: "Adequação confirmada"
      },
      descalonar: {
        title: "Descalonar",
        text: "O descalonamento consiste em substituir a cobertura inicial por um agente de espectro mais restrito, direcionado ao patógeno identificado, reduzindo exposição desnecessária a antibacterianos de amplo espectro.",
        tag: "Redução de espectro"
      },
      suspender: {
        title: "Suspender",
        text: "A terapia pode ser suspensa quando a hipótese de infecção não se confirma após reavaliação clínica e laboratorial, evitando continuidade desnecessária do tratamento.",
        tag: "Infecção não confirmada"
      }
    };

    function setChoice(key) {
      cards.forEach((card) => {
        const active = card.dataset.p08Choice === key;
        card.classList.toggle("is-active", active);
        card.setAttribute("aria-selected", active ? "true" : "false");
      });

      if (titleEl) titleEl.textContent = contentMap[key].title;
      if (textEl) textEl.textContent = contentMap[key].text;
      if (tagEl) tagEl.textContent = contentMap[key].tag;
    }

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        setChoice(card.dataset.p08Choice);
      });
    });

    setChoice("manter");
  }

  const triggers = Array.from(document.querySelectorAll(".cap1-page8 .cap1-zoomTrigger, .cap1-page8 .cap1-p08-modalTrigger"));
  const lightbox = document.getElementById("cap1Lightbox");
  const lightboxImage = document.getElementById("cap1LightboxImage");
  const lightboxCaption = document.getElementById("cap1LightboxCaption");
  const closers = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]")) : [];

  if (!triggers.length || !lightbox || !lightboxImage || !lightboxCaption) return;

  function openLightbox(src, alt, caption) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
    });
  });

  closers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
/* =========================
   Página 8 — Terapia empírica e terapia dirigida
   ========================= */
(function initCap1Page08() {
  const flow = document.querySelector("[data-cap1-p08-flow]");

  if (flow) {
    const cards = Array.from(flow.querySelectorAll("[data-p08-choice]"));
    const titleEl = flow.querySelector("[data-p08-title]");
    const textEl = flow.querySelector("[data-p08-text]");
    const tagEl = flow.querySelector("[data-p08-tag]");

    const contentMap = {
      manter: {
        title: "Manter",
        text: "O esquema inicial pode ser mantido quando a evolução clínica e os dados microbiológicos disponíveis permanecem compatíveis com a escolha terapêutica adotada.",
        tag: "Adequação confirmada"
      },
      descalonar: {
        title: "Descalonar",
        text: "O descalonamento consiste em substituir a cobertura inicial por um agente de espectro mais restrito, direcionado ao patógeno identificado, reduzindo exposição desnecessária a antibacterianos de amplo espectro.",
        tag: "Redução de espectro"
      },
      suspender: {
        title: "Suspender",
        text: "A terapia pode ser suspensa quando a hipótese de infecção não se confirma após reavaliação clínica e laboratorial, evitando continuidade desnecessária do tratamento.",
        tag: "Infecção não confirmada"
      }
    };

    function setChoice(key) {
      cards.forEach((card) => {
        const active = card.dataset.p08Choice === key;
        card.classList.toggle("is-active", active);
        card.setAttribute("aria-selected", active ? "true" : "false");
      });

      if (titleEl) titleEl.textContent = contentMap[key].title;
      if (textEl) textEl.textContent = contentMap[key].text;
      if (tagEl) tagEl.textContent = contentMap[key].tag;
    }

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        setChoice(card.dataset.p08Choice);
      });
    });

    setChoice("manter");
  }

  const triggers = Array.from(document.querySelectorAll(".cap1-page8 .cap1-zoomTrigger, .cap1-page8 .cap1-p08-modalTrigger"));
  const lightbox = document.getElementById("cap1Lightbox");
  const lightboxImage = document.getElementById("cap1LightboxImage");
  const lightboxCaption = document.getElementById("cap1LightboxCaption");
  const closers = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]")) : [];

  if (!triggers.length || !lightbox || !lightboxImage || !lightboxCaption) return;

  function openLightbox(src, alt, caption) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
    });
  });

  closers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
/* =========================
   Página 9 — Profilaxia antibacteriana
   ========================= */
(function initCap1Page09Zoom() {
  const triggers = Array.from(document.querySelectorAll(".cap1-page9 .cap1-zoomTrigger"));
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap1Lightbox");
  const lightboxImage = document.getElementById("cap1LightboxImage");
  const lightboxCaption = document.getElementById("cap1LightboxCaption");
  const closers = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]")) : [];

  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  function openLightbox(src, alt, caption) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
    });
  });

  closers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
/* =========================
   Página 10 — Quiz de revisão
   ========================= */
(function initCap1Page10() {
  const root = document.querySelector("[data-cap1-p10]");
  if (!root) return;

  const questions = Array.from(root.querySelectorAll(".cap1-p10Question"));
  const prevBtn = root.querySelector('[data-p10-action="prev"]');
  const nextBtn = root.querySelector('[data-p10-action="next"]');
  const progress = root.querySelector(".cap1-p10Progress");
  const done = root.querySelector(".cap1-p10Done");

  let currentIndex = 0;

  function updateNav() {
    questions.forEach((q, index) => {
      q.classList.toggle("active", index === currentIndex);
    });

    if (progress) {
      progress.textContent = `Situação ${currentIndex + 1} de ${questions.length}`;
    }

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === questions.length - 1;

    if (done) done.hidden = currentIndex !== questions.length - 1;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex -= 1;
        updateNav();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex < questions.length - 1) {
        currentIndex += 1;
        updateNav();
      }
    });
  }

  questions.forEach((question) => {
    const options = Array.from(question.querySelectorAll(".cap1-p10Options button"));
    const confirmBtn = question.querySelector('[data-p10-action="confirm"]');
    const resetBtn = question.querySelector('[data-p10-action="reset"]');
    const feedback = question.querySelector(".cap1-p10Feedback");
    const mapTemplate = question.querySelector(".cap1-p10FeedbackMap");

    if (!options.length || !confirmBtn || !feedback || !mapTemplate) return;

    const feedbackMap = JSON.parse(mapTemplate.innerHTML.trim());
    let selected = null;
    let answered = false;

    function clearSelectionVisual() {
      options.forEach((btn) => {
        btn.classList.remove("selected");
      });
    }

    function resetQuestion() {
      answered = false;
      selected = null;

      options.forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove("selected", "correct", "incorrect");
      });

      confirmBtn.disabled = true;
      confirmBtn.hidden = false;

      if (resetBtn) resetBtn.hidden = true;

      feedback.className = "cap1-p10Feedback";
      feedback.innerHTML = "";
    }

    options.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (answered) return;

        clearSelectionVisual();
        btn.classList.add("selected");
        selected = btn.dataset.answer;
        confirmBtn.disabled = false;
      });
    });

    confirmBtn.addEventListener("click", () => {
      if (!selected || answered) return;

      answered = true;

      const result = feedbackMap[selected];
      const correctBtn = options.find((btn) => btn.dataset.correct === "true");

      options.forEach((btn) => {
        btn.disabled = true;

        if (btn === correctBtn) {
          btn.classList.add("correct");
        }

        if (btn.dataset.answer === selected && btn !== correctBtn) {
          btn.classList.add("incorrect");
        }
      });

      feedback.className = `cap1-p10Feedback is-visible ${result.type}`;
      feedback.innerHTML = `
        <p class="cap1-p10FeedbackTitle">${result.title}</p>
        <p class="cap1-p10FeedbackText">${result.text}</p>
      `;

      confirmBtn.hidden = true;
      if (resetBtn) resetBtn.hidden = false;
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", resetQuestion);
    }

    resetQuestion();
  });

  updateNav();
})();