/* =========================
   Página 39 — Interações leves
   ========================= */

(function initCap5Page39() {

  const root = document.querySelector(".cap5-page39");
  if (!root) return;

  /* -----------------------------------
     MELHORIA DE UX: leve feedback no fluxo
     ----------------------------------- */

  const flow = root.querySelector(".cap5-flow");
  if (flow) {
    flow.addEventListener("mouseenter", () => {
      flow.style.background = "#eef4fa";
    });

    flow.addEventListener("mouseleave", () => {
      flow.style.background = "#f5f7fa";
    });
  }

  /* -----------------------------------
     MICRO-INTERAÇÃO NOS NÍVEIS
     ----------------------------------- */

  const levels = root.querySelectorAll(".cap5-level");

  levels.forEach((level) => {
    level.addEventListener("mouseenter", () => {
      level.style.borderColor = "rgba(30,136,229,.25)";
    });

    level.addEventListener("mouseleave", () => {
      level.style.borderColor = "rgba(31,31,31,.08)";
    });
  });

})();

/* =========================
   Página 38 — Simulação da coloração de Gram
   ========================= */
(function initGramSimulation() {
  const root = document.querySelector("[data-gram-sim]");
  if (!root) return;

  const steps = Array.from(root.querySelectorAll(".gram-step"));
  const imageEl = document.getElementById("gram-stage-image");
  const captionEl = document.getElementById("gram-stage-caption");
  const pillEl = document.getElementById("gram-stage-pill");
  const titleEl = document.getElementById("gram-stage-title");
  const textEl = document.getElementById("gram-stage-text");
  const prevBtn = document.getElementById("gram-prev");
  const nextBtn = document.getElementById("gram-next");

  if (!steps.length || !imageEl || !captionEl || !pillEl || !titleEl || !textEl || !prevBtn || !nextBtn) {
    return;
  }

  const stepData = [
    {
      key: "fixacao",
      image: "../../assets/capitulo-05/imagens/fixacao.png",
      alt: "Etapa de fixação na coloração de Gram",
      pill: "Etapa preparatória",
      title: "Fixação",
      caption: "Fixação por calor: preserva a morfologia bacteriana e promove aderência do material à lâmina, preparando a amostra para as etapas subsequentes.",
      text: "Nesta etapa inicial, o material é fixado à lâmina. Ainda não há diferenciação entre bactérias Gram-positivas e Gram-negativas, mas a amostra fica preparada para receber os reagentes seguintes."
    },
    {
      key: "cristal",
      image: "../../assets/capitulo-05/imagens/cristal-violeta.png",
      alt: "Etapa do cristal violeta na coloração de Gram",
      pill: "Corante primário",
      title: "Cristal violeta",
      caption: "O cristal violeta penetra nas células bacterianas e cora, inicialmente, tanto bactérias Gram-positivas quanto Gram-negativas.",
      text: "Após a aplicação do corante primário, ambas as bactérias adquirem coloração violácea. Neste momento, ainda não ocorreu a diferenciação estrutural observada ao final do método."
    },
    {
      key: "lugol",
      image: "../../assets/capitulo-05/imagens/lugol.png",
      alt: "Etapa do lugol na coloração de Gram",
      pill: "Mordente",
      title: "Lugol",
      caption: "O lugol atua como mordente, formando o complexo cristal violeta–iodo no interior das células bacterianas.",
      text: "Nesta etapa, o complexo cristal violeta–iodo torna-se mais estável dentro da célula. A diferença entre Gram-positivas e Gram-negativas começará a aparecer de forma decisiva apenas na descoloração."
    },
    {
      key: "alcool",
      image: "../../assets/capitulo-05/imagens/alcool-acetona.png",
      alt: "Etapa do álcool ou álcool-acetona na coloração de Gram",
      pill: "Etapa crítica",
      title: "Álcool/acetona",
      caption: "Na etapa de descoloração, as bactérias Gram-positivas tendem a reter o complexo cristal violeta–iodo, enquanto as Gram-negativas o perdem.",
      text: "Aqui ocorre a etapa central do método. A parede espessa de peptidoglicano das Gram-positivas favorece a retenção do complexo cristal violeta–iodo. Já nas Gram-negativas, a parede delgada e a presença de membrana externa facilitam a perda do corante."
    },
    {
      key: "safranina",
      image: "../../assets/capitulo-05/imagens/safranina.png",
      alt: "Etapa da safranina na coloração de Gram",
      pill: "Contra-corante",
      title: "Safranina",
      caption: "Após a contra-coloração, as Gram-positivas permanecem azul-violáceas e as Gram-negativas passam a adquirir coloração rosada.",
      text: "A safranina cora as bactérias que perderam o cristal violeta durante a descoloração. O resultado final permite distinguir bactérias Gram-positivas das Gram-negativas ao microscópio."
    }
  ];

  let currentIndex = 0;

  function swapImage(el, newSrc, newAlt) {
    el.classList.add("is-switching");
    window.setTimeout(() => {
      el.src = newSrc;
      if (newAlt) el.alt = newAlt;
    }, 110);
    window.setTimeout(() => {
      el.classList.remove("is-switching");
    }, 220);
  }

  function renderStep(index) {
    const item = stepData[index];
    if (!item) return;

    currentIndex = index;

    steps.forEach((btn, i) => {
      const active = i === index;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
      btn.tabIndex = active ? 0 : -1;
    });

    swapImage(imageEl, item.image, item.alt);
    captionEl.textContent = item.caption;
    pillEl.textContent = item.pill;
    titleEl.textContent = item.title;
    textEl.textContent = item.text;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === stepData.length - 1;
  }

  steps.forEach((btn, index) => {
    btn.addEventListener("click", () => renderStep(index));

    btn.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          renderStep((index + 1) % stepData.length);
          steps[(index + 1) % stepData.length].focus();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          renderStep((index - 1 + stepData.length) % stepData.length);
          steps[(index - 1 + stepData.length) % stepData.length].focus();
          break;
        case "Home":
          event.preventDefault();
          renderStep(0);
          steps[0].focus();
          break;
        case "End":
          event.preventDefault();
          renderStep(stepData.length - 1);
          steps[stepData.length - 1].focus();
          break;
      }
    });
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) renderStep(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < stepData.length - 1) renderStep(currentIndex + 1);
  });

  renderStep(0);
})();

/* =========================
   Página 38 — Comparador estrutural
   ========================= */
(function initGramStructureViewer() {
  const imageEl = document.getElementById("gram-structure-image");
  const titleEl = document.getElementById("gram-structure-name");
  const textEl = document.getElementById("gram-structure-description");
  const buttons = Array.from(document.querySelectorAll(".gram-structure__btn"));

  if (!imageEl || !titleEl || !textEl || !buttons.length) return;

  const structures = {
    positivo: {
      image: "../../assets/capitulo-05/imagens/gram-positivo.png",
      alt: "Estrutura de bactéria Gram-positiva",
      title: "Gram-positivas",
      text: "Apresentam camada espessa de peptidoglicano e ausência de membrana externa. Essa organização favorece a retenção do complexo cristal violeta–iodo após a etapa de descoloração."
    },
    negativo: {
      image: "../../assets/capitulo-05/imagens/gram-negativo.png",
      alt: "Estrutura de bactéria Gram-negativa",
      title: "Gram-negativas",
      text: "Apresentam camada delgada de peptidoglicano e membrana externa. Durante a descoloração, essa organização favorece a perda do complexo cristal violeta–iodo, permitindo a coloração pela safranina."
    }
  };

  function swapImage(el, newSrc, newAlt) {
    el.classList.add("is-switching");
    window.setTimeout(() => {
      el.src = newSrc;
      el.alt = newAlt;
    }, 110);
    window.setTimeout(() => {
      el.classList.remove("is-switching");
    }, 220);
  }

  function renderStructure(key) {
    const item = structures[key];
    if (!item) return;

    buttons.forEach((btn) => {
      const active = btn.dataset.structure === key;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    swapImage(imageEl, item.image, item.alt);
    titleEl.textContent = item.title;
    textEl.textContent = item.text;
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => renderStructure(btn.dataset.structure));
  });

  renderStructure("positivo");
})();
document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = btn.dataset.next;
  });
});

document.querySelectorAll("[data-prev]").forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = btn.dataset.prev;
  });
});
/* =========================
   Página 39 — Pistas do crescimento em cultura
   ========================= */
(function initGrowthClues() {
  const buttons = Array.from(document.querySelectorAll(".id-growth__hotspot"));
  const pillEl = document.getElementById("id-growth-pill");
  const nameEl = document.getElementById("id-growth-name");
  const textEl = document.getElementById("id-growth-text");

  if (!buttons.length || !pillEl || !nameEl || !textEl) return;

  const clues = {
    morfologia: {
      pill: "Pista fenotípica",
      name: "Morfologia das colônias",
      text: "O aspecto das colônias — tamanho, formato, superfície, bordas e relevo — pode sugerir grupos bacterianos específicos e orientar os testes adicionais necessários para a identificação."
    },
    hemolise: {
      pill: "Pista fenotípica",
      name: "Padrão de hemólise",
      text: "Em meios como o ágar sangue, a presença e o tipo de hemólise ajudam a diferenciar grupos bacterianos. Esse padrão fornece uma pista importante no raciocínio inicial de identificação."
    },
    pigmentacao: {
      pill: "Pista fenotípica",
      name: "Pigmentação",
      text: "Algumas bactérias produzem pigmentos característicos. A coloração observada nas colônias pode funcionar como um sinal auxiliar na identificação fenotípica do microrganismo."
    },
    odor: {
      pill: "Pista fenotípica",
      name: "Odor característico",
      text: "Certas bactérias podem gerar odores reconhecíveis em cultura. Embora não seja um critério isolado de identificação, esse achado pode reforçar hipóteses microbiológicas em associação com outros dados."
    }
  };

  function renderClue(key) {
    const item = clues[key];
    if (!item) return;

    buttons.forEach((btn) => {
      const active = btn.dataset.growthKey === key;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    pillEl.textContent = item.pill;
    nameEl.textContent = item.name;
    textEl.textContent = item.text;
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => renderClue(btn.dataset.growthKey));
  });

  renderClue("morfologia");
})();

/* =========================
   Página 39 — Métodos de identificação
   ========================= */
(function initIdentificationMethods() {
  const root = document.querySelector("[data-id-methods]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".id-methods__tab"));
  const imageEl = document.getElementById("id-method-image");
  const pillEl = document.getElementById("id-method-pill");
  const nameEl = document.getElementById("id-method-name");
  const textEl = document.getElementById("id-method-text");
  const maldiStepsWrap = document.getElementById("id-method-maldi-steps");

  if (!tabs.length || !imageEl || !pillEl || !nameEl || !textEl || !maldiStepsWrap) return;

  const methods = {
    fenotipicos: {
      image: "../../assets/capitulo-05/imagens/proteinas-bacterianas.png",
      alt: "Ilustração representando testes fenotípicos bioquímicos",
      pill: "Método clássico",
      name: "Testes fenotípicos bioquímicos",
      text: "Avaliam propriedades metabólicas da bactéria, como fermentação de açúcares, produção de enzimas e uso de substratos específicos. A combinação desses resultados compõe um perfil capaz de orientar a identificação."
    },
    automatizados: {
      image: "../../assets/capitulo-05/imagens/biblioteca-de-referencias.png",
      alt: "Ilustração representando sistemas automatizados de identificação bacteriana",
      pill: "Painéis padronizados",
      name: "Sistemas automatizados",
      text: "Integram múltiplos testes em painéis padronizados e comparam os resultados obtidos com bancos de dados microbiológicos validados. O sistema calcula a probabilidade de correspondência com espécies registradas na base de referência."
    },
    maldi: {
      image: "../../assets/capitulo-05/imagens/proteinas-bacterianas.png",
      alt: "Etapa inicial do processo de identificação por MALDI-TOF",
      pill: "Espectrometria de massa",
      name: "MALDI-TOF",
      text: "No MALDI-TOF, proteínas bacterianas são ionizadas e analisadas conforme seu padrão espectral. O perfil gerado é então comparado a bibliotecas de referência, permitindo identificação rápida e precisa."
    }
  };

  const maldiSteps = {
    proteinas: {
      image: "../../assets/capitulo-05/imagens/proteinas-bacterianas.png",
      alt: "Proteínas bacterianas extraídas da cultura",
      pill: "MALDI-TOF · Etapa 1",
      name: "Proteínas bacterianas",
      text: "A análise começa com material obtido da cultura bacteriana. As proteínas extraídas servirão de base para a geração da assinatura espectral."
    },
    ionizacao: {
      image: "../../assets/capitulo-05/imagens/ionizacao.png",
      alt: "Etapa de ionização da amostra por laser no MALDI-TOF",
      pill: "MALDI-TOF · Etapa 2",
      name: "Ionização",
      text: "A amostra é irradiada por laser, promovendo ionização e vaporização dos componentes. Essa etapa prepara o material para análise espectral."
    },
    espectral: {
      image: "../../assets/capitulo-05/imagens/padrao-espectral.png",
      alt: "Padrão espectral obtido no MALDI-TOF",
      pill: "MALDI-TOF · Etapa 3",
      name: "Padrão espectral",
      text: "As proteínas ionizadas geram um padrão de massa/carga que funciona como uma assinatura proteica do microrganismo."
    },
    biblioteca: {
      image: "../../assets/capitulo-05/imagens/biblioteca-de-referencias.png",
      alt: "Comparação do padrão espectral com biblioteca de referência",
      pill: "MALDI-TOF · Etapa 4",
      name: "Biblioteca de referência",
      text: "O perfil obtido é comparado a bancos de dados microbiológicos. A correspondência com bibliotecas validadas permite identificar a espécie ou grupo bacteriano."
    }
  };

  let currentMethod = "fenotipicos";
  let currentMaldiStep = "proteinas";

  function swapImage(el, newSrc, newAlt) {
    el.classList.add("is-switching");
    window.setTimeout(() => {
      el.src = newSrc;
      el.alt = newAlt;
    }, 110);
    window.setTimeout(() => {
      el.classList.remove("is-switching");
    }, 220);
  }

  function renderMethod(key) {
    const item = methods[key];
    if (!item) return;

    currentMethod = key;

    tabs.forEach((tab) => {
      const active = tab.dataset.method === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    if (key === "maldi") {
      renderMaldiStep(currentMaldiStep);
      maldiStepsWrap.hidden = false;
      return;
    }

    maldiStepsWrap.hidden = true;
    swapImage(imageEl, item.image, item.alt);
    pillEl.textContent = item.pill;
    nameEl.textContent = item.name;
    textEl.textContent = item.text;
  }

  function renderMaldiStep(key) {
    const item = maldiSteps[key];
    if (!item) return;

    currentMaldiStep = key;

    const miniButtons = Array.from(maldiStepsWrap.querySelectorAll(".id-methods__miniStep"));
    miniButtons.forEach((btn) => {
      const active = btn.dataset.maldiStep === key;
      btn.classList.toggle("is-active", active);
    });

    swapImage(imageEl, item.image, item.alt);
    pillEl.textContent = item.pill;
    nameEl.textContent = item.name;
    textEl.textContent = item.text;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => renderMethod(tab.dataset.method));
  });

  maldiStepsWrap.addEventListener("click", (event) => {
    const btn = event.target.closest(".id-methods__miniStep");
    if (!btn) return;
    renderMaldiStep(btn.dataset.maldiStep);
  });

  renderMethod("fenotipicos");
})();

/* =========================
   Página 41 — Breakpoint interativo
   ========================= */
(function initBreakpointPage() {
  const scaleRoot = document.querySelector("[data-bp-scale]");
  if (!scaleRoot) return;

  const modeButtons = Array.from(scaleRoot.querySelectorAll("[data-bp-mode]"));
  const range = document.getElementById("bp-range");
  const chip = document.getElementById("bp-chip");
  const valueEl = document.getElementById("bp-value");
  const meaningEl = document.getElementById("bp-meaning");
  const dot = document.getElementById("bp-indicator-dot");
  const line = document.getElementById("bp-indicator-line");
  const leftLabel = document.getElementById("bp-left-label");
  const rightLabel = document.getElementById("bp-right-label");
  const axisMain = document.getElementById("bp-axis-main");

  if (!range || !chip || !valueEl || !meaningEl || !dot || !line) return;

  let mode = "cim";

  function mapX(value) {
    const minX = 70;
    const maxX = 930;
    return minX + ((maxX - minX) * value / 100);
  }

  function formatValue(raw) {
    if (mode === "cim") {
      const cimValues = [0.25, 0.5, 1, 2, 4, 8, 16, 32];
      const index = Math.round((raw / 100) * (cimValues.length - 1));
      return `${cimValues[index]} mg/L`;
    }

    const haloValues = [34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14];
    const index = Math.round((raw / 100) * (haloValues.length - 1));
    return `${haloValues[index]} mm`;
  }

  function classify(raw) {
    if (mode === "cim") {
      if (raw < 34) {
        return {
          code: "S",
          cls: "is-s",
          text: "O valor está abaixo do breakpoint S e, por isso, enquadra-se na zona de sensibilidade."
        };
      }
      if (raw < 66) {
        return {
          code: "I",
          cls: "is-i",
          text: "O valor encontra-se na faixa intermediária, em que a interpretação depende de aumento de exposição ao antibacteriano."
        };
      }
      return {
        code: "R",
        cls: "is-r",
        text: "O valor ultrapassa o breakpoint R e passa a ser interpretado como resistente."
      };
    }

    /* no halo a lógica é invertida: halo maior tende a ser mais sensível */
    if (raw > 66) {
      return {
        code: "S",
        cls: "is-s",
        text: "Neste modo, halos maiores indicam maior probabilidade de atividade e, portanto, enquadram-se na zona de sensibilidade."
      };
    }
    if (raw > 34) {
      return {
        code: "I",
        cls: "is-i",
        text: "Neste intervalo, o halo situa-se na faixa interpretativa intermediária, dependente de aumento de exposição."
      };
    }
    return {
      code: "R",
      cls: "is-r",
      text: "Halos menores tendem a indicar menor atividade do antibacteriano e podem situar o isolado na zona de resistência."
    };
  }

  function render() {
    const raw = Number(range.value);
    const x = mapX(raw);
    const result = classify(raw);

    dot.setAttribute("cx", String(x));
    line.setAttribute("x1", String(x));
    line.setAttribute("x2", String(x));

    chip.textContent = result.code;
    chip.className = `bp-scale__chip ${result.cls}`;
    valueEl.textContent = formatValue(raw);
    meaningEl.textContent = result.text;
  }

  function setMode(nextMode) {
    mode = nextMode;

    modeButtons.forEach((btn) => {
      const active = btn.dataset.bpMode === nextMode;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (mode === "cim") {
      leftLabel.textContent = "CIM baixa";
      rightLabel.textContent = "CIM alta";
      axisMain.textContent = "CIM (concentração inibitória mínima)";
      range.value = 20;
    } else {
      leftLabel.textContent = "Halo baixo";
      rightLabel.textContent = "Halo alto";
      axisMain.textContent = "Halo de inibição (diâmetro em mm)";
      range.value = 80;
    }

    render();
  }

  range.addEventListener("input", render);

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setMode(btn.dataset.bpMode);
    });
  });

  setMode("cim");
})();

/* =========================
   Página 41 — Curvas de exposição
   ========================= */
(function initExposureGraphic() {
  const root = document.querySelector(".bp-exposure");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll("[data-exp-view]"));
  if (!buttons.length) return;

  function setView(view) {
    root.setAttribute("data-view", view);
    buttons.forEach((btn) => {
      const active = btn.dataset.expView === view;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.dataset.expView));
  });

  setView("both");
})();