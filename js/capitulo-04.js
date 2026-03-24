/* =========================
   Página 30 — Figura com zoom
   ========================= */
(function initCap4Page30Zoom() {
  const triggers = Array.from(document.querySelectorAll(".cap4-page30 .cap4-zoomTrigger"));
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap4Lightbox");
  const lightboxImage = document.getElementById("cap4LightboxImage");
  const lightboxCaption = document.getElementById("cap4LightboxCaption");
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
   Página 30 — Interação aplicada
   ========================= */
(function initCap4Page30Scenario() {
  const root = document.querySelector("[data-cap4-p30]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p30-tab]"));
  const title = root.querySelector("[data-p30-title]");
  const text = root.querySelector("[data-p30-text]");
  const susBar = root.querySelector('[data-bar="susceptible"]');
  const lessBar = root.querySelector('[data-bar="less"]');
  const susValue = root.querySelector('[data-bar-value="susceptible"]');
  const lessValue = root.querySelector('[data-bar-value="less"]');
  const panel = root.querySelector(".cap4-p30-panel");

  if (!tabs.length || !title || !text || !susBar || !lessBar || !susValue || !lessValue || !panel) return;

  const scenarios = {
    low: {
      title: "Exposição abaixo da MIC",
      text: "Quando a concentração efetiva não ultrapassa de forma adequada o limiar necessário para inibição, a população bacteriana tende a persistir globalmente. Nesse contexto, o ambiente seletivo é insuficiente para controle consistente da infecção e não há supressão eficaz das subpopulações presentes.",
      susceptible: 78,
      less: 22,
      tone: "rgba(95,126,160,.10)"
    },
    mid: {
      title: "Permanência na janela de seleção",
      text: "Quando a exposição permanece por tempo relevante na faixa intermediária, bactérias mais suscetíveis tendem a ser suprimidas antes que a população seja completamente erradicada. Nesse cenário, variantes com menor suscetibilidade relativa permanecem viáveis e passam a representar fração progressivamente maior da população residual.",
      susceptible: 35,
      less: 65,
      tone: "rgba(30,136,229,.10)"
    },
    high: {
      title: "Exposição acima da faixa crítica",
      text: "Quando a exposição alcança níveis consistentemente superiores aos necessários para inibição e morte bacteriana, a probabilidade de eliminação das variantes presentes é maior. Nesse cenário, a população residual tende a ser reduzida de modo mais uniforme, diminuindo a oportunidade de seleção incompleta.",
      susceptible: 12,
      less: 18,
      tone: "rgba(217,106,67,.12)"
    }
  };

  function setScenario(key) {
    const data = scenarios[key];
    if (!data) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p30Tab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    title.textContent = data.title;
    text.textContent = data.text;
    susBar.style.width = `${data.susceptible}%`;
    lessBar.style.width = `${data.less}%`;
    susValue.textContent = `${data.susceptible}%`;
    lessValue.textContent = `${data.less}%`;
    panel.style.background = data.tone;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setScenario(tab.dataset.p30Tab);
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
        setScenario(tab.dataset.p30Tab);
      }
    });
  });

  setScenario("mid");
})();
/* =========================
   Página 31 — Figura com zoom
   ========================= */
(function initCap4Page31Zoom() {
  const triggers = Array.from(document.querySelectorAll(".cap4-page31 .cap4-zoomTrigger"));
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap4Lightbox");
  const lightboxImage = document.getElementById("cap4LightboxImage");
  const lightboxCaption = document.getElementById("cap4LightboxCaption");
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
   Página 31 — Interação leve
   ========================= */
(function initCap4Page31Scenario() {
  const root = document.querySelector("[data-cap4-p31]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p31-tab]"));
  const title = root.querySelector("[data-p31-title]");
  const text = root.querySelector("[data-p31-text]");
  const fill = root.querySelector("[data-p31-meter-fill]");
  const value = root.querySelector("[data-p31-meter-value]");
  const panel = root.querySelector(".cap4-p31-panel");

  if (!tabs.length || !title || !text || !fill || !value || !panel) return;

  const scenarios = {
    wide: {
      title: "Alta margem farmacodinâmica",
      text: "Quando a exposição alcançada permanece com folga em relação à CIM, pequenas variações farmacocinéticas têm menor probabilidade de comprometer o efeito antimicrobiano. Nesse cenário, a margem entre concentração atingida e limiar microbiológico é mais favorável.",
      width: "82%",
      value: "Ampla",
      tone: "rgba(31,60,136,.05)"
    },
    narrow: {
      title: "Margem farmacodinâmica estreita",
      text: "Quando a concentração atingida se aproxima da CIM, a margem de segurança farmacodinâmica torna-se menor. Em pacientes com variabilidade farmacocinética significativa, reduções discretas de exposição podem ser suficientes para comprometer a probabilidade de atingir o efeito desejado.",
      width: "36%",
      value: "Estreita",
      tone: "rgba(217,106,67,.10)"
    }
  };

  function setScenario(key) {
    const data = scenarios[key];
    if (!data) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p31Tab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    title.textContent = data.title;
    text.textContent = data.text;
    fill.style.width = data.width;
    value.textContent = data.value;
    panel.style.background = data.tone;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setScenario(tab.dataset.p31Tab);
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
        setScenario(tab.dataset.p31Tab);
      }
    });
  });

  setScenario("wide");
})();
/* =========================
   Página 32 — Zoom da figura
   ========================= */
(function initCap4Page32Zoom() {
  const triggers = Array.from(document.querySelectorAll(".cap4-page32 .cap4-zoomTrigger"));
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap4Lightbox");
  const lightboxImage = document.getElementById("cap4LightboxImage");
  const lightboxCaption = document.getElementById("cap4LightboxCaption");
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
   Página 33 — Zoom da figura
   ========================= */
(function initCap4Page33Zoom() {
  const triggers = Array.from(document.querySelectorAll(".cap4-page33 .cap4-zoomTrigger"));
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap4Lightbox");
  const lightboxImage = document.getElementById("cap4LightboxImage");
  const lightboxCaption = document.getElementById("cap4LightboxCaption");
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
   Página 34 — Figura com zoom
   ========================= */
(function initCap4Page34Zoom() {
  const triggers = Array.from(document.querySelectorAll(".cap4-page34 .cap4-zoomTrigger"));
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap4Lightbox");
  const lightboxImage = document.getElementById("cap4LightboxImage");
  const lightboxCaption = document.getElementById("cap4LightboxCaption");
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
   Página 34 — Interação dos índices
   ========================= */
(function initCap4Page34Scenario() {
  const root = document.querySelector("[data-cap4-p34]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p34-tab]"));
  const title = root.querySelector("[data-p34-title]");
  const text = root.querySelector("[data-p34-text]");
  const panel = root.querySelector(".cap4-p34-panel");

  const fills = {
    time: root.querySelector('[data-p34-meter="time"]'),
    peak: root.querySelector('[data-p34-meter="peak"]'),
    auc: root.querySelector('[data-p34-meter="auc"]')
  };

  const values = {
    time: root.querySelector('[data-p34-meter-value="time"]'),
    peak: root.querySelector('[data-p34-meter-value="peak"]'),
    auc: root.querySelector('[data-p34-meter-value="auc"]')
  };

  if (!tabs.length || !title || !text || !panel || !fills.time || !fills.peak || !fills.auc) return;

  const scenarios = {
    time: {
      title: "%fT>MIC",
      text: "Neste padrão, o determinante principal da eficácia é o período durante o qual a fração livre do antibacteriano permanece acima da CIM ao longo do intervalo entre doses. O foco está na manutenção da exposição eficaz por tempo suficiente.",
      widths: { time: "84%", peak: "28%", auc: "46%" },
      labels: { time: "Alto", peak: "Baixo", auc: "Moderado" },
      tone: "rgba(56,197,216,.09)"
    },
    peak: {
      title: "Cmax/MIC",
      text: "Neste padrão, a magnitude do pico alcançado em relação à CIM correlaciona-se com maior velocidade e intensidade de redução da carga bacteriana. O alvo farmacodinâmico está concentrado na relação entre concentração máxima e limiar microbiológico.",
      widths: { time: "22%", peak: "84%", auc: "42%" },
      labels: { time: "Baixo", peak: "Alto", auc: "Moderado" },
      tone: "rgba(204,76,174,.09)"
    },
    auc: {
      title: "AUC/MIC",
      text: "Neste padrão, tanto a intensidade quanto a duração da exposição contribuem para o efeito antimicrobiano. A ênfase recai sobre a exposição total ao longo do tempo, e reduções sustentadas na área sob a curva podem comprometer o índice global.",
      widths: { time: "44%", peak: "40%", auc: "84%" },
      labels: { time: "Moderado", peak: "Moderado", auc: "Alto" },
      tone: "rgba(43,176,118,.09)"
    }
  };

  function setScenario(key) {
    const data = scenarios[key];
    if (!data) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p34Tab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    title.textContent = data.title;
    text.textContent = data.text;
    panel.style.background = data.tone;

    fills.time.style.width = data.widths.time;
    fills.peak.style.width = data.widths.peak;
    fills.auc.style.width = data.widths.auc;

    values.time.textContent = data.labels.time;
    values.peak.textContent = data.labels.peak;
    values.auc.textContent = data.labels.auc;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setScenario(tab.dataset.p34Tab);
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
        setScenario(tab.dataset.p34tab);
      }
    });
  });

  setScenario("time");
})();
/* =========================
   Página 35 — Zoom das figuras
   ========================= */
(function initCap4Page35Zoom() {
  const triggers = Array.from(document.querySelectorAll(".cap4-page35 .cap4-p35-zoomTrigger"));
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap4Lightbox");
  const lightboxImage = document.getElementById("cap4LightboxImage");
  const lightboxCaption = document.getElementById("cap4LightboxCaption");
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
   Página 35 — Comparação interativa
   ========================= */
(function initCap4Page35Compare() {
  const root = document.querySelector("[data-cap4-p35]");
  if (!root) return;

  const cards = Array.from(root.querySelectorAll("[data-p35-card]"));
  const focusBox = root.querySelector(".cap4-p35-focus__box");
  const focusTitle = root.querySelector("[data-p35-focus-title]");
  const focusText = root.querySelector("[data-p35-focus-text]");

  if (!cards.length || !focusBox || !focusTitle || !focusText) return;

  const content = {
    stable: {
      title: "Perfusão e distribuição preservadas",
      text: "Neste cenário, a relação entre concentração plasmática e exposição no foco infeccioso é mais previsível, favorecendo o alcance do índice farmacodinâmico necessário para eficácia terapêutica.",
      tone: "rgba(43,176,118,.09)"
    },
    critical: {
      title: "Perfusão deficiente e exposição heterogênea",
      text: "Aqui, a concentração plasmática deixa de representar com fidelidade a exposição no sítio da infecção. Expansão do volume de distribuição, perfusão comprometida e microambientes desfavoráveis reduzem a probabilidade de eficácia terapêutica.",
      tone: "rgba(212,98,68,.10)"
    }
  };

  function activate(key) {
    cards.forEach((card) => {
      const active = card.dataset.p35Card === key;
      card.classList.toggle("is-active", active);
    });

    focusTitle.textContent = content[key].title;
    focusText.textContent = content[key].text;
    focusBox.style.background = content[key].tone;
  }

  cards.forEach((card) => {
    const key = card.dataset.p35Card;

    card.addEventListener("mouseenter", () => activate(key));
    card.addEventListener("focus", () => activate(key));
    card.addEventListener("click", () => activate(key));

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate(key);
      }
    });
  });

  activate("stable");
})();
/* =========================
   Página 36 — Zoom da figura
   ========================= */
(function initCap4Page36Zoom() {
  const triggers = Array.from(document.querySelectorAll(".cap4-page36 .cap4-p36-zoomTrigger"));
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap4Lightbox");
  const lightboxImage = document.getElementById("cap4LightboxImage");
  const lightboxCaption = document.getElementById("cap4LightboxCaption");
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
   Página 36 — Hotspots do biofilme
   ========================= */
(function initCap4Page34Hotspots() {
  const root = document.querySelector("[data-cap4-p36]");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll(".cap4-p36-hotspot"));
  const title = root.querySelector("[data-p36-title]");
  const text = root.querySelector("[data-p36-text]");
  const aside = root.querySelector(".cap4-p36-aside");
  const tags = Array.from(root.querySelectorAll("[data-p36-tag]"));

  if (!buttons.length || !title || !text || !aside || tags.length < 2) return;

  const content = {
    matrix: {
      title: "Matriz extracelular",
      text: "A matriz que envolve o biofilme funciona como barreira física e química. Ela pode retardar a difusão do antibacteriano, criando gradientes de concentração entre a periferia e as regiões mais profundas da estrutura.",
      tags: ["Difusão limitada", "Barreira física"],
      tone: "rgba(31,60,136,.05)"
    },
    surface: {
      title: "Camadas superficiais",
      text: "As bactérias mais externas tendem a estar mais expostas ao fármaco e, em geral, mantêm atividade metabólica mais elevada. Por isso, antibacterianos que atuam melhor em células em crescimento podem exercer efeito mais intenso nessa região.",
      tags: ["Maior exposição", "Metabolismo ativo"],
      tone: "rgba(43,176,118,.08)"
    },
    deep: {
      title: "Camadas profundas e persisters",
      text: "Nas regiões mais profundas do biofilme podem predominar células com metabolismo reduzido e tolerância fenotípica aumentada. Essa condição não depende necessariamente de resistência genética estável, mas reduz a previsibilidade da resposta ao tratamento.",
      tags: ["Persisters", "Tolerância fenotípica"],
      tone: "rgba(212,98,68,.10)"
    },
    micro: {
      title: "Microambiente local",
      text: "Variações locais de pH, disponibilidade de oxigênio e acúmulo de detritos celulares alteram tanto a atividade do antibacteriano quanto a eficácia da resposta imune. O biofilme, portanto, não é apenas uma barreira estrutural, mas um ecossistema farmacodinâmico próprio.",
      tags: ["Baixo pH / O₂", "Resposta alterada"],
      tone: "rgba(176,120,43,.10)"
    }
  };

  function activate(key) {
    const data = content[key];
    if (!data) return;

    buttons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.p36Key === key);
    });

    title.textContent = data.title;
    text.textContent = data.text;
    tags[0].textContent = data.tags[0];
    tags[1].textContent = data.tags[1];
    aside.style.background = data.tone;
  }

  buttons.forEach((btn) => {
    const key = btn.dataset.p36Key;

    btn.addEventListener("click", () => activate(key));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate(key);
      }
    });
  });

  activate("matrix");
})();
/* =========================
   Página 37 — Zoom da figura
   ========================= */
(function initCap4Page37Zoom() {
  const triggers = Array.from(document.querySelectorAll(".cap4-page37 .cap4-p37-zoomTrigger"));
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap4Lightbox");
  const lightboxImage = document.getElementById("cap4LightboxImage");
  const lightboxCaption = document.getElementById("cap4LightboxCaption");
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
   Página 38 — Quiz de revisão
   ========================= */
(function initCap4Page38Quiz() {
  const root = document.querySelector("[data-cap4-p38]");
  if (!root) return;

  const questions = Array.from(root.querySelectorAll(".cap4-p38Question"));
  const prevBtn = root.querySelector('[data-p38-action="prev"]');
  const nextBtn = root.querySelector('[data-p38-action="next"]');
  const progress = root.querySelector(".cap4-p38Progress");
  const doneBox = root.querySelector(".cap4-p38Done");

  let currentIndex = 0;

  function parseFeedbackMap(questionEl) {
    const tpl = questionEl.querySelector(".cap4-p38FeedbackMap");
    if (!tpl) return {};
    try {
      return JSON.parse(tpl.innerHTML.trim());
    } catch {
      return {};
    }
  }

  function updateNav() {
    questions.forEach((q, i) => {
      q.classList.toggle("active", i === currentIndex);
    });

    if (progress) {
      progress.textContent = `Questão ${currentIndex + 1} de ${questions.length}`;
    }

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === questions.length - 1;
  }

  function handleOptionSelection(questionEl, btn) {
    const optionButtons = Array.from(questionEl.querySelectorAll(".cap4-p38Options button"));
    const confirmBtn = questionEl.querySelector('[data-p38-action="confirm"]');

    optionButtons.forEach((option) => {
      option.classList.remove("is-selected");
    });

    btn.classList.add("is-selected");
    questionEl.dataset.selected = btn.dataset.answer || "";

    if (confirmBtn) confirmBtn.disabled = false;
  }

  function confirmAnswer(questionEl) {
    const selected = questionEl.dataset.selected;
    if (!selected) return;

    const optionButtons = Array.from(questionEl.querySelectorAll(".cap4-p38Options button"));
    const confirmBtn = questionEl.querySelector('[data-p38-action="confirm"]');
    const resetBtn = questionEl.querySelector('[data-p38-action="reset"]');
    const feedbackEl = questionEl.querySelector(".cap4-p38Feedback");
    const feedbackMap = parseFeedbackMap(questionEl);

    optionButtons.forEach((btn) => {
      btn.disabled = true;
      btn.classList.remove("is-selected");
      if (btn.dataset.correct === "true") {
        btn.classList.add("is-correct");
      }
      if (btn.dataset.answer === selected && btn.dataset.correct !== "true") {
        btn.classList.add("is-wrong");
      }
    });

    const feedback = feedbackMap[selected];
    if (feedback && feedbackEl) {
      feedbackEl.hidden = false;
      feedbackEl.classList.remove("is-correct", "is-error");
      feedbackEl.classList.add(feedback.type === "correct" ? "is-correct" : "is-error");
      feedbackEl.innerHTML = `
        <h3 class="cap4-p38FeedbackTitle">${feedback.title}</h3>
        <p class="cap4-p38FeedbackText">${feedback.text}</p>
      `;
    }

    questionEl.dataset.answered = "true";
    if (confirmBtn) confirmBtn.hidden = true;
    if (resetBtn) resetBtn.hidden = false;

    const allAnswered = questions.every((q) => q.dataset.answered === "true");
    if (allAnswered && doneBox) {
      doneBox.hidden = false;
    }
  }

  function resetQuestion(questionEl) {
    const optionButtons = Array.from(questionEl.querySelectorAll(".cap4-p38Options button"));
    const confirmBtn = questionEl.querySelector('[data-p38-action="confirm"]');
    const resetBtn = questionEl.querySelector('[data-p38-action="reset"]');
    const feedbackEl = questionEl.querySelector(".cap4-p38Feedback");

    optionButtons.forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove("is-selected", "is-correct", "is-wrong");
    });

    questionEl.dataset.selected = "";
    questionEl.dataset.answered = "false";

    if (confirmBtn) {
      confirmBtn.hidden = false;
      confirmBtn.disabled = true;
    }

    if (resetBtn) {
      resetBtn.hidden = true;
    }

    if (feedbackEl) {
      feedbackEl.hidden = true;
      feedbackEl.classList.remove("is-correct", "is-error");
      feedbackEl.innerHTML = "";
    }

    if (doneBox) {
      doneBox.hidden = true;
    }
  }

  questions.forEach((questionEl) => {
    questionEl.dataset.selected = "";
    questionEl.dataset.answered = "false";

    const optionButtons = Array.from(questionEl.querySelectorAll(".cap4-p38Options button"));
    const confirmBtn = questionEl.querySelector('[data-p38-action="confirm"]');
    const resetBtn = questionEl.querySelector('[data-p38-action="reset"]');
    const feedbackEl = questionEl.querySelector(".cap4-p38Feedback");

    if (feedbackEl) feedbackEl.hidden = true;

    optionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (questionEl.dataset.answered === "true") return;
        handleOptionSelection(questionEl, btn);
      });
    });

    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => confirmAnswer(questionEl));
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => resetQuestion(questionEl));
    }
  });

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

  updateNav();
})();