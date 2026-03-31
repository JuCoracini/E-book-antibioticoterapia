/* =========================
   Capítulo 04 — Página 30
   Exposição antimicrobiana e seleção de resistência
   ========================= */

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
    lightboxImage.src = src || "";
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
   Página 30 — Leitura comparativa
   ========================= */
(function initCap4Page30Scenario() {
  const root = document.querySelector("[data-cap4-p30]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p30-tab]"));
  const title = root.querySelector("[data-p30-title]");
  const text = root.querySelector("[data-p30-text]");
  const consequence = root.querySelector("[data-p30-consequence]");
  const susBar = root.querySelector('[data-bar="susceptible"]');
  const lessBar = root.querySelector('[data-bar="less"]');

  if (
    !tabs.length ||
    !title ||
    !text ||
    !consequence ||
    !susBar ||
    !lessBar
  ) return;

  const scenarios = {
    low: {
      title: "Exposição insuficiente",
      text: "A concentração não ultrapassa de forma consistente o limiar necessário para inibição bacteriana, permitindo a manutenção global da população microbiana.",
      consequence: "Predomina persistência da infecção, com baixa resposta terapêutica e manutenção da carga bacteriana.",
      susceptibleWidth: "78%",
      lessWidth: "22%"
    },
    mid: {
      title: "Janela de seleção mutante",
      text: "A exposição elimina preferencialmente as bactérias mais suscetíveis, mas não erradica de modo completo a população bacteriana remanescente.",
      consequence: "Ocorre expansão relativa de subpopulações com menor suscetibilidade, favorecendo seleção progressiva durante o tratamento.",
      susceptibleWidth: "35%",
      lessWidth: "65%"
    },
    high: {
      title: "Exposição eficaz",
      text: "A concentração permanece consistentemente acima dos níveis necessários para efeito antimicrobiano, reduzindo de forma mais homogênea a população bacteriana.",
      consequence: "Há maior probabilidade de controle microbiológico, com menor oportunidade de seleção de variantes menos suscetíveis.",
      susceptibleWidth: "12%",
      lessWidth: "18%"
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
    consequence.textContent = data.consequence;

    susBar.style.width = data.susceptibleWidth;
    lessBar.style.width = data.lessWidth;
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
   Capítulo 04 — Página 31
   Via de administração
   ========================= */

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
    lightboxImage.src = src || "";
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
   Capítulo 04 — Página 32
   Via de administração e determinação da exposição antimicrobiana
   ========================= */

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
    lightboxImage.src = src || "";
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
   Página 33 — Matriz de decisão clínica
   ========================= */
(function initCap4Page33(){
  const root = document.querySelector("[data-cap4-p33]");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll(".cap4-p33-hotspot"));
  const title = root.querySelector("[data-title]");
  const text = root.querySelector("[data-text]");

  if (!buttons.length || !title || !text) return;

  const scenarios = {
    vo: {
      title: "Uso VO seguro / transição",
      text: "Corresponde a cenários de baixa gravidade, com estabilidade hemodinâmica e absorção gastrointestinal previsível, nos quais a administração por via oral pode alcançar exposição sistêmica adequada."
    },
    monitoramento: {
      title: "Monitoramento clínico rigoroso",
      text: "Aplica-se a situações em que a absorção permanece preservada, mas o risco de progressão da infecção é maior, exigindo reavaliação clínica próxima da resposta terapêutica."
    },
    avaliacao: {
      title: "Avaliação de biodisponibilidade",
      text: "Representa condições de menor gravidade, porém com absorção menos previsível. Nesses casos, a decisão depende da capacidade real de atingir concentrações eficazes no organismo."
    },
    iv: {
      title: "Uso obrigatório IV",
      text: "Em sepse, choque ou alta carga bacteriana, a via intravenosa reduz a variabilidade da exposição, garante início imediato da concentração plasmática e aumenta a probabilidade de controle inicial da infecção."
    }
  };

  function setScenario(key){
    const data = scenarios[key];
    if (!data) return;

    title.textContent = data.title;
    text.textContent = data.text;

    buttons.forEach((btn) => {
      const active = btn.dataset.area === key;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setScenario(btn.dataset.area);
    });

    btn.addEventListener("keydown", (e) => {
      const i = buttons.indexOf(btn);

      if (e.key === "ArrowRight") {
        e.preventDefault();
        buttons[(i + 1) % buttons.length].focus();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        buttons[(i - 1 + buttons.length) % buttons.length].focus();
      }

      if (e.key === "Home") {
        e.preventDefault();
        buttons[0].focus();
      }

      if (e.key === "End") {
        e.preventDefault();
        buttons[buttons.length - 1].focus();
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setScenario(btn.dataset.area);
      }
    });
  });

  setScenario("vo");
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
  const subtitle = root.querySelector("[data-p34-subtitle]");
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


 if (
  !tabs.length ||
  !title ||
  !subtitle ||
  !text ||
  !panel ||
  !fills.time ||
  !fills.peak ||
  !fills.auc ||
  !values.time ||
  !values.peak ||
  !values.auc
) return;

  const scenarios = {
    time: {
      title: "%fT>MIC",
      subtitle: "Foco no tempo acima da CIM",
      text: "Neste padrão, o determinante principal da eficácia é o período durante o qual a fração livre do antibacteriano permanece acima da CIM ao longo do intervalo entre doses. O foco está na manutenção da exposição eficaz por tempo suficiente.",
      widths: { time: "84%", peak: "24%", auc: "44%" },
      labels: { time: "Alto", peak: "Baixo", auc: "Moderado" },
      tone: "rgba(56,197,216,.09)",
         },
    peak: {
      title: "Cmax/MIC",
      subtitle: "Foco na magnitude do pico",
      text: "Neste padrão, a magnitude do pico alcançado em relação à CIM correlaciona-se com maior velocidade e intensidade de redução da carga bacteriana. O alvo farmacodinâmico está concentrado na relação entre concentração máxima e limiar microbiológico.",
      widths: { time: "20%", peak: "84%", auc: "40%" },
      labels: { time: "Baixo", peak: "Alto", auc: "Moderado" },
      tone: "rgba(204,76,174,.09)",
      },
    auc: {
      title: "AUC/MIC",
      subtitle: "Foco na exposição total",
      text: "Neste padrão, tanto a intensidade quanto a duração da exposição contribuem para o efeito antimicrobiano. A ênfase recai sobre a exposição total ao longo do tempo, e reduções sustentadas na área sob a curva podem comprometer o índice global.",
      widths: { time: "42%", peak: "38%", auc: "84%" },
      labels: { time: "Moderado", peak: "Moderado", auc: "Alto" },
      tone: "rgba(43,176,118,.09)",
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
    subtitle.textContent = data.subtitle;
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
        setScenario(tab.dataset.p34Tab);
      }
    });
  });

  setScenario("time");
})();
/* Página 35 interação */

(function(){

  const hotspots = document.querySelectorAll(".hotspot");
  const title = document.getElementById("p35-title");
  const text = document.getElementById("p35-text");

  if(!hotspots.length) return;

  const content = {
    plasma: {
      title: "Plasma",
      text: "A concentração plasmática representa o ponto inicial da exposição, mas não garante níveis adequados no foco infeccioso."
    },
    intersticio: {
      title: "Interstício",
      text: "A perfusão tecidual e o volume de distribuição determinam quanto do fármaco consegue alcançar os tecidos."
    },
    celulas: {
      title: "Compartimento celular",
      text: "A lipofilicidade do fármaco influencia sua capacidade de atravessar membranas e atingir locais intracelulares."
    },
    foco: {
      title: "Foco infeccioso",
      text: "Barreiras anatômicas e o microambiente local podem reduzir a concentração efetiva, comprometendo a resposta terapêutica."
    }
  };

  hotspots.forEach(h => {
    h.addEventListener("click", () => {
      const key = h.dataset.info;
      title.textContent = content[key].title;
      text.textContent = content[key].text;
    });
  });

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
    lightboxImage.src = src || "";
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
(function initCap4Page36Hotspots() {
  const root = document.querySelector("[data-cap4-p36]");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll(".cap4-p36-hotspot"));
  const title = root.querySelector("[data-p36-title]");
  const text = root.querySelector("[data-p36-text]");
  const aside = root.querySelector(".cap4-p36-aside");
  const tags = Array.from(root.querySelectorAll("[data-p36-tag]"));

  if (!buttons.length || !title || !text || !aside || tags.length < 2) return;

  const content = {
    gradient: {
      title: "Gradiente de concentração",
      text: "A concentração do antibacteriano é maior na região externa do biofilme e diminui progressivamente à medida que o fármaco tenta penetrar sua estrutura. Assim, alta exposição fora do biofilme não garante a mesma intensidade de exposição nas camadas internas.",
      tags: ["Difusão desigual", "Exposição decrescente"],
      tone: "rgba(31,60,136,.05)"
    },
    matrix: {
      title: "Matriz extracelular",
      text: "A matriz que envolve o biofilme funciona como barreira física à difusão do antibacteriano. Ela retarda o fluxo do fármaco e contribui para a formação de gradientes de concentração entre a periferia e o interior da estrutura.",
      tags: ["Barreira física", "Penetração limitada"],
      tone: "rgba(176,120,43,.10)"
    },
    surface: {
      title: "Bactérias superficiais",
      text: "As bactérias mais externas tendem a receber maior exposição ao antibacteriano e, em geral, mantêm atividade metabólica mais elevada. Por isso, costumam ser mais vulneráveis do que as populações localizadas em regiões profundas.",
      tags: ["Maior exposição", "Metabolismo ativo"],
      tone: "rgba(43,176,118,.09)"
    },
    deep: {
      title: "Camadas profundas",
      text: "Nas regiões mais internas do biofilme, a penetração do fármaco é menor e podem predominar bactérias com metabolismo reduzido e maior tolerância fenotípica. Isso diminui a eficácia farmacodinâmica mesmo sem resistência genética estável.",
      tags: ["Tolerância fenotípica", "Resposta imprevisível"],
      tone: "rgba(212,98,68,.10)"
    }
  };

  function activate(key) {
    const data = content[key];
    if (!data) return;

    buttons.forEach((btn) => {
      const active = btn.dataset.p36Key === key;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
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
      const i = buttons.indexOf(btn);

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        buttons[(i + 1) % buttons.length].focus();
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        buttons[(i - 1 + buttons.length) % buttons.length].focus();
      }

      if (e.key === "Home") {
        e.preventDefault();
        buttons[0].focus();
      }

      if (e.key === "End") {
        e.preventDefault();
        buttons[buttons.length - 1].focus();
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate(key);
      }
    });
  });

  activate("gradient");
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
    lightboxImage.src = src || "";
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
   Página 37 — Leitura guiada
   ========================= */
(function initCap4Page37Scenario() {
  const root = document.querySelector("[data-cap4-p37]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p37-tab]"));
  const title = root.querySelector("[data-p37-title]");
  const subtitle = root.querySelector("[data-p37-subtitle]");
  const text = root.querySelector("[data-p37-text]");
  const panel = root.querySelector(".cap4-p37-panel");
  const tags = Array.from(root.querySelectorAll("[data-p37-tag]"));

  const fills = {
    sens: root.querySelector('[data-p37-bar="sens"]'),
    pressure: root.querySelector('[data-p37-bar="pressure"]'),
    residual: root.querySelector('[data-p37-bar="residual"]')
  };

  const values = {
    sens: root.querySelector('[data-p37-bar-value="sens"]'),
    pressure: root.querySelector('[data-p37-bar-value="pressure"]'),
    residual: root.querySelector('[data-p37-bar-value="residual"]')
  };

  if (
    !tabs.length ||
    !title ||
    !subtitle ||
    !text ||
    !panel ||
    tags.length < 2 ||
    !fills.sens ||
    !fills.pressure ||
    !fills.residual ||
    !values.sens ||
    !values.pressure ||
    !values.residual
  ) return;

  const scenarios = {
    initial: {
      title: "População inicial heterogênea",
      subtitle: "Nem todas as bactérias têm o mesmo grau de suscetibilidade",
      text: "Antes do início do tratamento, a população bacteriana já pode incluir subgrupos com diferentes níveis de suscetibilidade. Isso significa que a exposição antimicrobiana atuará sobre uma população biologicamente heterogênea, e não sobre um conjunto uniforme de células.",
      tags: ["Variabilidade pré-existente", "Resposta desigual"],
      widths: { sens: "84%", pressure: "18%", residual: "22%" },
      labels: { sens: "Alta", pressure: "Baixa", residual: "Baixo" },
      tone: "rgba(31,60,136,.05)"
    },
    selection: {
      title: "Seleção durante a exposição",
      subtitle: "As mais sensíveis são eliminadas com maior rapidez",
      text: "Quando a exposição ao antibacteriano se estabelece, as bactérias mais suscetíveis tendem a ser eliminadas preferencialmente. Se a exposição for insuficiente ou inconsistente, parte das subpopulações menos suscetíveis pode sobreviver sob pressão seletiva.",
      tags: ["Pressão farmacológica", "Sobrevivência diferencial"],
      widths: { sens: "38%", pressure: "84%", residual: "52%" },
      labels: { sens: "Moderada", pressure: "Alta", residual: "Moderado" },
      tone: "rgba(30,136,229,.08)"
    },
    shift: {
      title: "Deslocamento populacional",
      subtitle: "A população residual passa a ser relativamente menos suscetível",
      text: "A repetição desse padrão ao longo do tratamento pode modificar progressivamente a composição da população remanescente. O resultado não é apenas persistência bacteriana, mas enriquecimento relativo de variantes que exigem maior exposição para serem controladas.",
      tags: ["Predomínio residual", "CIM mais elevada"],
      widths: { sens: "18%", pressure: "60%", residual: "84%" },
      labels: { sens: "Baixa", pressure: "Moderada", residual: "Alto" },
      tone: "rgba(212,106,47,.10)"
    }
  };

  function setScenario(key) {
    const data = scenarios[key];
    if (!data) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p37Tab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    title.textContent = data.title;
    subtitle.textContent = data.subtitle;
    text.textContent = data.text;
    tags[0].textContent = data.tags[0];
    tags[1].textContent = data.tags[1];
    panel.style.background = data.tone;

    fills.sens.style.width = data.widths.sens;
    fills.pressure.style.width = data.widths.pressure;
    fills.residual.style.width = data.widths.residual;

    values.sens.textContent = data.labels.sens;
    values.pressure.textContent = data.labels.pressure;
    values.residual.textContent = data.labels.residual;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setScenario(tab.dataset.p37Tab);
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
        setScenario(tab.dataset.p37Tab);
      }
    });
  });

  setScenario("initial");
})();
/* =========================
   Página 38 — Quiz de revisão
   ========================= */
(function initCap4Page38Quiz() {
  const root = document.querySelector("[data-cap4-p38]");
  if (!root) return;

  const questions = Array.from(root.querySelectorAll(".cap4-p38Question"));
  const doneBox = root.querySelector(".cap4-p38Done");
  const progress = root.querySelector(".cap4-p38Progress");
  const prevBtn = root.querySelector('[data-p38-action="prev"]');
  const nextBtn = root.querySelector('[data-p38-action="next"]');

  if (!questions.length || !doneBox || !progress || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function parseJSONTemplate(questionEl) {
    const tpl = questionEl.querySelector(".cap4-p38FeedbackMap");
    if (!tpl) return {};
    try {
      return JSON.parse(tpl.innerHTML.trim());
    } catch {
      return {};
    }
  }

  function getQuestionState(questionEl) {
    return {
      options: Array.from(questionEl.querySelectorAll(".cap4-p38Options button")),
      confirmBtn: questionEl.querySelector('[data-p38-action="confirm"]'),
      resetBtn: questionEl.querySelector('[data-p38-action="reset"]'),
      feedback: questionEl.querySelector(".cap4-p38Feedback"),
      rationaleTpl: questionEl.querySelector(".cap4-p38Rationale"),
      feedbackMap: parseJSONTemplate(questionEl),
      selected: null,
      confirmed: false
    };
  }

  const states = new Map();
  questions.forEach((q) => states.set(q, getQuestionState(q)));

  function allConfirmed() {
    return questions.every((q) => states.get(q).confirmed);
  }

  function updateProgress() {
    if (currentIndex < questions.length) {
      progress.textContent = `Questão ${currentIndex + 1} de ${questions.length}`;
    } else {
      progress.textContent = "Quiz concluído";
    }
  }

  function updateNav() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= questions.length - 1 || !states.get(questions[currentIndex]).confirmed;
  }

  function showDone() {
    questions.forEach((q) => q.classList.remove("active"));
    doneBox.hidden = false;
    currentIndex = questions.length;
    updateProgress();
    prevBtn.disabled = false;
    nextBtn.disabled = true;
  }

  function renderFeedback(questionEl) {
    const state = states.get(questionEl);
    if (!state.selected) return;

    const data = state.feedbackMap[state.selected] || null;
    const rationaleHTML = state.rationaleTpl ? state.rationaleTpl.innerHTML.trim() : "";

    if (!data) return;

    state.feedback.innerHTML = `
      <div class="cap4-p38FeedbackCard cap4-p38FeedbackCard--${data.type === "correct" ? "correct" : "error"}">
        <h3 class="cap4-p38FeedbackTitle">${data.title}</h3>
        <p class="cap4-p38FeedbackText">${data.text}</p>
        <div class="cap4-p38RationaleBox">${rationaleHTML}</div>
      </div>
    `;
  }

  function updateQuestionUI(questionEl) {
    const state = states.get(questionEl);

    state.options.forEach((btn) => {
      const selected = btn.dataset.answer === state.selected;
      btn.classList.toggle("is-selected", selected);

      if (state.confirmed) {
        const isCorrect = btn.dataset.correct === "true";
        btn.classList.toggle("is-correct", isCorrect);
        btn.classList.toggle("is-wrong", selected && !isCorrect);
        btn.disabled = true;
      } else {
        btn.classList.remove("is-correct", "is-wrong");
        btn.disabled = false;
      }
    });

    state.confirmBtn.disabled = !state.selected || state.confirmed;
    state.resetBtn.hidden = !state.confirmed;
  }

  function goTo(index) {
    if (index < 0 || index >= questions.length) return;

    doneBox.hidden = true;
    questions.forEach((q, i) => q.classList.toggle("active", i === index));
    currentIndex = index;
    updateProgress();
    updateNav();
  }

  questions.forEach((questionEl) => {
    const state = states.get(questionEl);

    state.options.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.confirmed) return;
        state.selected = btn.dataset.answer;
        updateQuestionUI(questionEl);
      });
    });

    state.confirmBtn.addEventListener("click", () => {
      if (!state.selected || state.confirmed) return;
      state.confirmed = true;
      updateQuestionUI(questionEl);
      renderFeedback(questionEl);

      if (allConfirmed() && currentIndex === questions.length - 1) {
        nextBtn.textContent = "Concluir";
      } else {
        nextBtn.disabled = false;
      }
    });

    state.resetBtn.addEventListener("click", () => {
      state.selected = null;
      state.confirmed = false;
      state.feedback.innerHTML = "";
      updateQuestionUI(questionEl);
      if (currentIndex === questions.length - 1) {
        nextBtn.textContent = "Próxima";
      }
      updateNav();
    });

    updateQuestionUI(questionEl);
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex === questions.length) {
      goTo(questions.length - 1);
      nextBtn.textContent = allConfirmed() ? "Concluir" : "Próxima";
      return;
    }
    goTo(currentIndex - 1);
    nextBtn.textContent = currentIndex === questions.length - 1 && allConfirmed() ? "Concluir" : "Próxima";
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex === questions.length - 1 && states.get(questions[currentIndex]).confirmed) {
      showDone();
      return;
    }

    if (currentIndex < questions.length - 1) {
      goTo(currentIndex + 1);
      nextBtn.textContent = currentIndex === questions.length - 1 && states.get(questions[currentIndex]).confirmed
        ? "Concluir"
        : "Próxima";
    }
  });

  goTo(0);
})();