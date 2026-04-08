/* =========================
   PÁGINA 1 — EXPOSIÇÃO AO ANTIBACTERIANO
   ========================= */

(function initPage1AMR() {
  const root = document.querySelector("[data-amr-figure]");
  if (!root) return;

  const petri = document.getElementById("petri");
  const tabs = Array.from(root.querySelectorAll("[data-amr-scenario]"));
  const panel = root.querySelector("[data-amr-panel]");
  const scenarioTitle = document.getElementById("amrScenarioTitle");
  const feedback = document.getElementById("amrFeedback");
  const controlFill = document.getElementById("amrControlFill");
  const resistanceFill = document.getElementById("amrResistanceFill");
  const controlLabel = document.getElementById("amrControlLabel");
  const resistanceLabel = document.getElementById("amrResistanceLabel");

  if (
    !petri ||
    !tabs.length ||
    !panel ||
    !scenarioTitle ||
    !feedback ||
    !controlFill ||
    !resistanceFill ||
    !controlLabel ||
    !resistanceLabel
  ) {
    return;
  }

  const TOTAL_SENSITIVE = 54;
  const TOTAL_RESISTANT = 12;
  let resizeFrame = null;

  const scenarioMap = {
    adequado: {
      tabId: "amrTabAdequado",
      title: "Exposição terapêutica adequada",
      text: "A exposição adequada tende a reduzir de forma mais consistente a população bacteriana sensível e a favorecer melhor controle clínico do foco infeccioso. A fração resistente remanescente mantém relevância biológica, mas a carga total da população bacteriana tende a ser menor.",
      controlWidth: "86%",
      resistanceWidth: "28%",
      controlLabel: "Elevado",
      resistanceLabel: "Baixa predominância residual",
      visual: {
        sensitiveVisible: 12,
        resistantVisible: 8,
        resistantPersistent: 5,
        regrowthSensitive: 0,
        regrowthResistant: 0
      }
    },
    subdose: {
      tabId: "amrTabSubdose",
      title: "Exposição subterapêutica",
      text: "A exposição insuficiente combina menor eficácia clínica com manutenção de pressão seletiva em intensidade inadequada. O resultado tende a ser controle incompleto da infecção, com persistência relativa mais expressiva das bactérias menos suscetíveis.",
      controlWidth: "42%",
      resistanceWidth: "68%",
      controlLabel: "Limitado",
      resistanceLabel: "Persistência relativa aumentada",
      visual: {
        sensitiveVisible: 30,
        resistantVisible: 11,
        resistantPersistent: 8,
        regrowthSensitive: 6,
        regrowthResistant: 2
      }
    },
    interrupcao: {
      tabId: "amrTabInterrupcao",
      title: "Suspensão precoce",
      text: "Quando a exposição é interrompida antes do controle adequado do foco, parte da população bacteriana volta a se expandir. Clinicamente, isso favorece evolução insatisfatória; biologicamente, preserva a relevância das variantes resistentes na população remanescente.",
      controlWidth: "24%",
      resistanceWidth: "78%",
      controlLabel: "Instável",
      resistanceLabel: "Predominância relativa marcante",
      visual: {
        sensitiveVisible: 36,
        resistantVisible: 12,
        resistantPersistent: 9,
        regrowthSensitive: 12,
        regrowthResistant: 4
      }
    }
  };

  function clamp(min, value, max) {
    return Math.max(min, Math.min(value, max));
  }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function generatePointInEllipse(width, height, padding) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random());

    const a = width / 2 - padding;
    const b = height / 2 - padding;

    const x = width / 2 + radius * a * Math.cos(angle);
    const y = height / 2 + radius * b * Math.sin(angle);

    return {
      left: clamp(padding, x, width - padding),
      top: clamp(padding, y, height - padding)
    };
  }

  function buildPopulation(config) {
    const items = [];

    for (let i = 0; i < TOTAL_SENSITIVE; i += 1) {
      let state = "visible";

      if (i >= config.sensitiveVisible) {
        state = "faded";
      }

      if (i < config.regrowthSensitive) {
        state = "regrowing";
      }

      items.push({ type: "sensitive", state });
    }

    for (let i = 0; i < TOTAL_RESISTANT; i += 1) {
      let state = "visible";

      if (i >= config.resistantVisible) {
        state = "faded";
      }

      if (i < config.resistantPersistent) {
        state = "persistent";
      }

      if (i < config.regrowthResistant) {
        state = "regrowing";
      }

      items.push({ type: "resistant", state });
    }

    return items.sort(() => Math.random() - 0.5);
  }

  function createBug(item, width, height) {
    const dot = document.createElement("span");
    const point = generatePointInEllipse(width, height, 14);

    dot.className = `bug ${item.type}`;
    dot.style.left = `${point.left}px`;
    dot.style.top = `${point.top}px`;

    if (item.state === "faded") {
      dot.classList.add("is-faded");
      dot.style.opacity = String(randomInRange(0.08, 0.18));
    }

    if (item.state === "visible") {
      dot.style.opacity = String(randomInRange(0.72, 0.92));
    }

    if (item.state === "persistent") {
      dot.classList.add("is-persistent");
      dot.style.opacity = String(randomInRange(0.9, 1));
    }

    if (item.state === "regrowing") {
      dot.classList.add("is-regrowing");
      dot.style.opacity = String(randomInRange(0.82, 0.96));
    }

    return dot;
  }

  function getActiveKey() {
    const activeTab = root.querySelector("[data-amr-scenario][aria-selected='true']");
    return activeTab ? activeTab.dataset.amrScenario : "adequado";
  }

  function renderPlate(key) {
    const scenario = scenarioMap[key];
    if (!scenario) return;

    petri.innerHTML = "";

    const rect = petri.getBoundingClientRect();
    const width = rect.width || 640;
    const height = rect.height || 228;
    const population = buildPopulation(scenario.visual);

    population.forEach((item) => {
      petri.appendChild(createBug(item, width, height));
    });
  }

  function updateMetrics(key) {
    const scenario = scenarioMap[key];
    if (!scenario) return;

    controlFill.style.width = scenario.controlWidth;
    resistanceFill.style.width = scenario.resistanceWidth;
    controlLabel.textContent = scenario.controlLabel;
    resistanceLabel.textContent = scenario.resistanceLabel;
    scenarioTitle.textContent = scenario.title;
    feedback.textContent = scenario.text;
  }

  function activate(key) {
    const scenario = scenarioMap[key];
    if (!scenario) return;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.amrScenario === key;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panel.setAttribute("aria-labelledby", scenario.tabId);
    updateMetrics(key);
    renderPlate(key);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activate(tab.dataset.amrScenario);
    });

    tab.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if (event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if (event.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      if (nextIndex === null) return;

      event.preventDefault();
      tabs[nextIndex].focus();
      activate(tabs[nextIndex].dataset.amrScenario);
    });
  });

  window.addEventListener("resize", () => {
    if (resizeFrame) {
      window.cancelAnimationFrame(resizeFrame);
    }

    resizeFrame = window.requestAnimationFrame(() => {
      renderPlate(getActiveKey());
    });
  });

  activate("adequado");
})();
/* =========================
   PÁGINA 2 — TIMELINE FINAL
   ========================= */

(function initPage2Timeline(){
  const content = document.getElementById("timelineContent");
  const buttons = document.querySelectorAll(".timeline-item");

  if(!content || !buttons.length) return;

  const data = {
    "1928": {
      title: "1928 — Descoberta da Penicilina",
      img: "../../assets/capitulo-01/imagens/Era Fleming.png",
      caption: "Representação de Alexander Fleming na descoberta da penicilina, em 1928.",
      text: "Em 1928, Alexander Fleming observou que substâncias produzidas por fungos do gênero <em>Penicillium sp.</em> eram capazes de inibir o crescimento bacteriano em condições experimentais. Embora essa observação inicial não tenha sido imediatamente aplicada à prática clínica, ela abriu caminho para uma nova abordagem terapêutica ao demonstrar que compostos naturais poderiam ser isolados e desenvolvidos como agentes antibacterianos <sup>5</sup>."
    },

    "1935": {
      title: "1935 — Introdução das Sulfonamidas",
      img: "../../assets/capitulo-01/imagens/1935.png",
      caption: "Estrutura química das sulfonamidas, que inauguraram a quimioterapia antibacteriana sistêmica ao interferirem na síntese do ácido fólico bacteriano.",
      text: "Em 1935, a introdução das sulfonamidas marcou o início da quimioterapia antibacteriana sistêmica com eficácia comprovada. Esses fármacos interferem na via de síntese do ácido fólico bacteriano, evidenciando que vias metabólicas específicas do microrganismo poderiam ser exploradas terapeuticamente. Essa descoberta consolidou o conceito de toxicidade seletiva, baseado nas diferenças bioquímicas entre bactérias e células humanas <sup>6</sup>."
    },

    "1940": {
      title: "1940–1943 — Produção Industrial da Penicilina",
      img: "../../assets/capitulo-01/imagens/1940.png",
      caption: "Expansão da produção industrial de penicilina na década de 1940, permitindo sua aplicação em larga escala no tratamento de infecções bacterianas graves.",
      text: "Entre 1940 e 1943, o desenvolvimento de métodos de produção em larga escala permitiu a utilização clínica da penicilina, especialmente durante a Segunda Guerra Mundial. O impacto terapêutico foi imediato, com melhora significativa no tratamento de infecções bacterianas graves. A consolidação do uso clínico da penicilina também estimulou o desenvolvimento de novas classes de antibacterianos nas décadas seguintes <sup>4,5</sup>."
    },

    "1943": {
      title: "1943–1960 — A Idade de Ouro dos Antibacterianos",
      img: "../../assets/capitulo-01/imagens/1943.png",
      caption: "Evolução histórica da descoberta de classes antibacterianas ao longo do tempo, com concentração máxima entre 1940 e 1960 e redução progressiva nas décadas seguintes.",
      text: "Este período é caracterizado pela rápida descoberta e desenvolvimento de múltiplas classes de agentes antibacterianos. Nesse intervalo foram introduzidos, entre outros, aminoglicosídeos, tetraciclinas, macrolídeos, cloranfenicol e glicopeptídeos <sup>4</sup>. Grande parte desses compostos foi identificada a partir de metabólitos produzidos por microrganismos ambientais, especialmente espécies do gênero <em>Streptomyces sp.</em>. A diversidade de novos antibacterianos ampliou significativamente as possibilidades terapêuticas contra infecções bacterianas e consolidou a antibioticoterapia como um dos pilares da medicina moderna. Com o passar das décadas, entretanto, o ritmo de descoberta de novas classes diminuiu progressivamente. A identificação de compostos realmente inovadores tornou-se mais complexa, enquanto o surgimento e a disseminação de mecanismos de resistência bacteriana passaram a limitar a eficácia de muitos antibacterianos previamente introduzidos <sup>4,7</sup>."
    },

    "1961": {
      title: "1961 — Identificação do <em>Staphylococcus aureus</em> resistente à meticilina (MRSA)",
      img: "../../assets/capitulo-01/imagens/1961.png",
      caption: "Antibiograma por difusão em disco demonstrando halos de inibição ao redor de discos com antibacterianos ativos, enquanto a ausência ou redução desses halos indica resistência bacteriana.",
      text: "Em 1961, poucos anos após a introdução da meticilina, foram descritas cepas de <em>Staphylococcus aureus</em> resistentes a esse antibacteriano. O achado evidenciou a rapidez com que bactérias podem se adaptar à pressão seletiva exercida pelos antimicrobianos. Nesse caso, a resistência decorre principalmente da aquisição do gene mecA, que leva à expressão de uma proteína ligadora de penicilina adicional, PBP2a, com baixa afinidade pelos antibacterianos β-lactâmicos. Esse mecanismo compromete a eficácia dessa classe terapêutica e demonstra como alterações em alvos moleculares podem afetar classes inteiras de fármacos <sup>2,3</sup>."
    },

    "1988": {
      title: "1988 — Identificação de <em>Enterococcus sp.</em> resistente à vancomicina (VRE)",
      img: "../../assets/capitulo-01/imagens/1988.png",
      caption: "Teste de difusão em disco demonstrando resistência à vancomicina, com crescimento bacteriano até o limite do disco, indicando ausência de efeito inibitório.",
      text: "Em 1988 foram descritos os primeiros isolados clínicos de <em>Enterococcus sp.</em> resistentes à vancomicina. Esse evento representou um marco importante na evolução da resistência antimicrobiana, pois a vancomicina havia sido considerada por décadas uma das principais opções terapêuticas para infecções causadas por bactérias Gram-positivas multirresistentes. A resistência nesses microrganismos está associada à aquisição de genes que modificam o alvo da vancomicina na síntese da parede celular bacteriana. O surgimento do VRE demonstrou que mesmo antibacterianos considerados de última linha podem perder eficácia diante da capacidade adaptativa das populações bacterianas <sup>8,9</sup>."
    },

    "2018": {
      title: "2018 — Padronização nacional para testes de suscetibilidade",
      img: "../../assets/capitulo-01/imagens/2018.png",
      caption: "Cultura com antibiograma apresentando valores de MIC e interpretação (S, I, R), integrando dados microbiológicos e farmacológicos para orientar a decisão terapêutica.",
      text: "Em 2018, a Portaria nº 64 do Ministério da Saúde determinou a adoção das normas de interpretação baseadas no EUCAST (Comitê Europeu sobre Teste de Susceptibilidade Antimicrobiana), implementadas no Brasil por meio do Comitê Brasileiro de Testes de Sensibilidade aos Antimicrobianos (BrCAST), estabelecendo padronização nacional para testes de suscetibilidade antimicrobiana <sup>10,11</sup>. Esses critérios definem os valores utilizados para classificar isolados bacterianos como suscetíveis (S), suscetíveis sob exposição aumentada (I) ou resistentes (R), influenciando diretamente a interpretação do antibiograma e a escolha terapêutica <sup>12</sup>. Os breakpoints, ou valores de referência para interpretar o nível de sensibilidade de uma bactéria, não representam características intrínsecas deste microrganismo. Eles são critérios interpretativos construídos a partir da integração entre dados microbiológicos, farmacocinéticos, farmacodinâmicos e evidências clínicas. Essa padronização fortalece a integração entre microbiologia laboratorial e tomada de decisão clínica baseada em parâmetros objetivos."
    }
  };

  function render(key){
    const item = data[key];
    if(!item) return;

    const safeTitle = item.title.replace(/"/g, "&quot;");
    const safeCaption = (item.caption || "").replace(/"/g, "&quot;");

    content.innerHTML = `
      <h2 class="timeline-title">${item.title}</h2>

      <div class="timeline-block">
        <figure class="timeline-figure">
          <button
            class="cap1-zoomTrigger"
            type="button"
            data-zoom="${item.img}"
            data-zoom-image="${item.img}"
            data-zoom-alt="${safeTitle}"
            data-zoom-caption="${safeCaption}"
            aria-label="Ampliar imagem"
          >
            <img src="${item.img}" alt="${item.title}">
          </button>

          <figcaption class="timeline-caption">
            ${item.caption || ""}
          </figcaption>
        </figure>

        <p class="timeline-text">${item.text}</p>
      </div>
    `;
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.year);
    });
  });

  render("1928");
})();
/* =========================
   PÁGINA 3 — ÁRVORE CONCEITUAL
   ========================= */

(function initPage3Tree(){
  const root = document.querySelector(".cap1-page3");
  if(!root) return;

  const buttons = root.querySelectorAll("[data-tree-target]");
  const panes = root.querySelectorAll("[data-tree-pane]");

  if(!buttons.length || !panes.length) return;

  function activate(key){
    buttons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.treeTarget === key);
    });

    panes.forEach((pane) => {
      pane.hidden = pane.dataset.treePane !== key;
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => activate(btn.dataset.treeTarget));
  });

  activate("antimicrobianos");
})();
/* =========================
   PÁGINA 5 — JANELA TERAPÊUTICA
   ========================= */

(function initPage5Window(){
  const root = document.querySelector(".cap1-page5 [data-cap1-window]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-window-tab]"));
  const scenes = Array.from(root.querySelectorAll("[data-window-scene]"));
  const feedback = root.querySelector("[data-window-feedback]");
  const state = root.querySelector("[data-window-state]");
  const text = root.querySelector("[data-window-text]");

  if(!tabs.length || !scenes.length || !feedback || !state || !text) return;

  const map = {
    low: {
      title: "Baixa exposição",
      text: "Neste cenário, a concentração permanece abaixo da faixa terapêutica por tempo relevante, o que pode comprometer o controle da infecção e favorecer a persistência do microrganismo.",
      klass: "cap1-p05-feedback cap1-p05-feedback--low"
    },
    ok: {
      title: "Exposição terapêutica",
      text: "Neste cenário, a concentração do antibacteriano ultrapassa o nível mínimo necessário para efeito terapêutico e permanece abaixo do limiar em que a toxicidade se torna mais provável.",
      klass: "cap1-p05-feedback cap1-p05-feedback--ok"
    },
    high: {
      title: "Exposição excessiva",
      text: "Neste cenário, a concentração alcança níveis acima do limiar de toxicidade, aumentando a probabilidade de efeitos adversos sem necessariamente oferecer benefício proporcional.",
      klass: "cap1-p05-feedback cap1-p05-feedback--high"
    }
  };

  function activate(key){
    const item = map[key];
    if(!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.windowTab === key;
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
      tab.classList.toggle("is-active", active);
    });

    scenes.forEach((scene) => {
      const active = scene.dataset.windowScene === key;
      scene.classList.toggle("is-active", active);
    });

    state.textContent = item.title;
    text.textContent = item.text;
    feedback.className = item.klass;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activate(tab.dataset.windowTab);
    });

    tab.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if(event.key === "ArrowRight"){
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if(event.key === "ArrowLeft"){
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      if(nextIndex === null) return;

      event.preventDefault();
      tabs[nextIndex].focus();
      activate(tabs[nextIndex].dataset.windowTab);
    });
  });

  activate("ok");
})();
/* =========================
   PÁGINA 6 — ESPECTRO DE AÇÃO
   ========================= */

(function initPage6Spectrum(){
  const root = document.querySelector(".cap1-page6 [data-cap1-spectrum]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-spectrum-tab]"));
  const fills = {
    gp: root.querySelector('[data-spectrum-fill="gp"]'),
    gn: root.querySelector('[data-spectrum-fill="gn"]'),
    ana: root.querySelector('[data-spectrum-fill="ana"]'),
    impact: root.querySelector('[data-spectrum-fill="impact"]')
  };
  const feedback = root.querySelector("[data-spectrum-feedback]");
  const title = root.querySelector("[data-spectrum-title]");
  const text = root.querySelector("[data-spectrum-text]");

  if(!tabs.length || !fills.gp || !fills.gn || !fills.ana || !fills.impact || !feedback || !title || !text) return;

  const map = {
    restrito: {
      widths: { gp: "55%", gn: "20%", ana: "10%", impact: "28%" },
      title: "Espectro restrito",
      text: "Atua sobre grupos bacterianos mais específicos, com menor impacto ecológico quando comparado a agentes mais amplos.",
      klass: "cap1-p06-feedback cap1-p06-feedback--restrito"
    },
    ampliado: {
      widths: { gp: "82%", gn: "58%", ana: "36%", impact: "58%" },
      title: "Espectro ampliado",
      text: "Amplia a cobertura inicial quando o agente etiológico ainda não foi definido, alcançando bactérias Gram-positivas e parte das Gram-negativas.",
      klass: "cap1-p06-feedback cap1-p06-feedback--ampliado"
    },
    "muito-amplo": {
      widths: { gp: "94%", gn: "90%", ana: "80%", impact: "88%" },
      title: "Espectro muito amplo",
      text: "Cobre múltiplos grupos bacterianos, mas tende a produzir maior impacto ecológico sobre a microbiota e maior pressão seletiva.",
      klass: "cap1-p06-feedback cap1-p06-feedback--muito-amplo"
    }
  };

  function activate(key){
    const item = map[key];
    if(!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.spectrumTab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });

    fills.gp.style.width = item.widths.gp;
    fills.gn.style.width = item.widths.gn;
    fills.ana.style.width = item.widths.ana;
    fills.impact.style.width = item.widths.impact;

    title.textContent = item.title;
    text.textContent = item.text;
    feedback.className = item.klass;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.spectrumTab));

    tab.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if(event.key === "ArrowRight"){
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if(event.key === "ArrowLeft"){
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      if(nextIndex === null) return;

      event.preventDefault();
      tabs[nextIndex].focus();
      activate(tabs[nextIndex].dataset.spectrumTab);
    });
  });

  activate("restrito");
})();
/* =========================
   PÁGINA 7 — COLONIZAÇÃO, CONTAMINAÇÃO E INFECÇÃO
   ========================= */

(function initPage7CCI(){
  const root = document.querySelector(".cap1-page7 [data-cap1-cci]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-cci-tab]"));
  const panes = Array.from(root.querySelectorAll("[data-cci-pane]"));

  if(!tabs.length || !panes.length) return;

  function activate(key){
    tabs.forEach((tab) => {
      const active = tab.dataset.cciTab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });

    panes.forEach((pane) => {
      pane.hidden = pane.dataset.cciPane !== key;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.cciTab));

    tab.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if(event.key === "ArrowRight"){
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if(event.key === "ArrowLeft"){
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      if(nextIndex === null) return;

      event.preventDefault();
      tabs[nextIndex].focus();
      activate(tabs[nextIndex].dataset.cciTab);
    });
  });

  activate("colonizacao");
})();
/* =========================
   PÁGINA 8 — TERAPIA EMPÍRICA E TERAPIA DIRIGIDA
   ========================= */

(function initPage8Therapy(){
  const root = document.querySelector(".cap1-page8 [data-cap1-therapy]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-therapy-tab]"));
  const panes = Array.from(root.querySelectorAll("[data-therapy-pane]"));

  if(!tabs.length || !panes.length) return;

  function activate(key){
    tabs.forEach((tab) => {
      const active = tab.dataset.therapyTab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });

    panes.forEach((pane) => {
      pane.hidden = pane.dataset.therapyPane !== key;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.therapyTab));

    tab.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if(event.key === "ArrowRight"){
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if(event.key === "ArrowLeft"){
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      if(nextIndex === null) return;

      event.preventDefault();
      tabs[nextIndex].focus();
      activate(tabs[nextIndex].dataset.therapyTab);
    });
  });

  activate("manter");
})();
/* =========================
   PÁGINA 9 — PROFILAXIA ANTIBACTERIANA
   ========================= */

(function initPage9Profilaxia(){
  const root = document.querySelector(".cap1-page9 [data-cap1-profilaxia]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-profilaxia-tab]"));
  const panes = Array.from(root.querySelectorAll("[data-profilaxia-pane]"));

  if(!tabs.length || !panes.length) return;

  function activate(key){
    tabs.forEach((tab) => {
      const active = tab.dataset.profilaxiaTab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });

    panes.forEach((pane) => {
      pane.hidden = pane.dataset.profilaxiaPane !== key;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.profilaxiaTab));

    tab.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if(event.key === "ArrowRight"){
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if(event.key === "ArrowLeft"){
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      if(nextIndex === null) return;

      event.preventDefault();
      tabs[nextIndex].focus();
      activate(tabs[nextIndex].dataset.profilaxiaTab);
    });
  });

  activate("indicacao");
})();
/* =========================
   PÁGINA 10 — SÍNTESE CLÍNICA
   ========================= */

(function initPage10ClinicalSynthesis() {
  const root = document.querySelector("[data-cap1-p10]");
  if (!root) return;

  const questions = Array.from(root.querySelectorAll(".cap1-p10Question"));
  const statusValue = root.querySelector(".cap1-p10Status__value");
  const completion = root.querySelector("[data-p10-completion]");
  const completionText = root.querySelector("[data-p10-completion-text]");

  if (!questions.length) return;

  const completionMap = {
    perfect:
      "Você articulou os dois eixos centrais desta síntese: resultado microbiológico não substitui julgamento clínico, e a estratégia inicial em infecção grave presumida costuma ser empírica, com reavaliação posterior à luz dos dados laboratoriais.",
    partial:
      "A leitura clínica começa a se consolidar, mas ainda exige atenção a dois pontos: cultura positiva não basta, sozinha, para definir infecção ativa; e a escolha entre terapia empírica, dirigida ou profilática depende do momento clínico da decisão.",
    needsReview:
      "Vale revisar o encadeamento clínico do capítulo: primeiro, reconhecer se há infecção verdadeira; depois, definir se há indicação de tratamento; por fim, classificar corretamente se a conduta é empírica, dirigida ou profilática."
  };

  function updateStatus() {
    const confirmedCount = questions.filter(
      (question) => question.dataset.questionState === "confirmed"
    ).length;

    if (statusValue) {
      statusValue.textContent = `${confirmedCount} de ${questions.length} situações confirmadas`;
    }

    if (!completion || !completionText) return;

    if (confirmedCount !== questions.length) {
      completion.hidden = true;
      return;
    }

    const correctCount = questions.filter(
      (question) => question.dataset.result === "correct"
    ).length;

    if (correctCount === questions.length) {
      completionText.textContent = completionMap.perfect;
    } else if (correctCount >= 1) {
      completionText.textContent = completionMap.partial;
    } else {
      completionText.textContent = completionMap.needsReview;
    }

    completion.hidden = false;
  }

  questions.forEach((question) => {
    const optionButtons = Array.from(
      question.querySelectorAll(".cap1-p10Options button")
    );
    const confirmBtn = question.querySelector('[data-p10-action="confirm"]');
    const resetBtn = question.querySelector('[data-p10-action="reset"]');
    const feedbackBox = question.querySelector(".cap1-p10Feedback");
    const feedbackTemplate = question.querySelector(".cap1-p10FeedbackMap");

    if (!confirmBtn || !resetBtn || !feedbackBox || !feedbackTemplate) return;

    let selectedAnswer = null;
    let confirmed = false;
    let feedbackMap = {};

    try {
      feedbackMap = JSON.parse(feedbackTemplate.innerHTML.trim());
    } catch (error) {
      console.error("Erro ao ler feedback da síntese clínica:", error);
      return;
    }

    function resetQuestion() {
      confirmed = false;
      selectedAnswer = null;
      question.dataset.questionState = "pending";
      question.dataset.result = "";

      optionButtons.forEach((button) => {
        button.disabled = false;
        button.classList.remove("selected", "correct", "error");
        button.setAttribute("aria-pressed", "false");
      });

      feedbackBox.innerHTML = "";
      feedbackBox.className = "cap1-p10Feedback";

      confirmBtn.hidden = false;
      confirmBtn.disabled = true;
      resetBtn.hidden = true;

      updateStatus();
    }

    optionButtons.forEach((button) => {
      button.setAttribute("aria-pressed", "false");

      button.addEventListener("click", () => {
        if (confirmed) return;

        optionButtons.forEach((item) => {
          item.classList.remove("selected");
          item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("selected");
        button.setAttribute("aria-pressed", "true");

        selectedAnswer = button.dataset.answer || null;
        confirmBtn.disabled = !selectedAnswer;
      });
    });

    confirmBtn.addEventListener("click", () => {
      if (!selectedAnswer || confirmed) return;

      confirmed = true;

      const chosen = question.querySelector(
        `.cap1-p10Options button[data-answer="${selectedAnswer}"]`
      );
      const correct = question.querySelector(
        '.cap1-p10Options button[data-correct="true"]'
      );
      const item = feedbackMap[selectedAnswer];
      const isCorrect = Boolean(chosen && chosen.dataset.correct === "true");

      question.dataset.questionState = "confirmed";
      question.dataset.result = isCorrect ? "correct" : "error";

      optionButtons.forEach((button) => {
        button.disabled = true;
      });

      if (chosen) {
        if (isCorrect) {
          chosen.classList.add("correct");
          feedbackBox.className = "cap1-p10Feedback correct";
        } else {
          chosen.classList.add("error");
          if (correct) correct.classList.add("correct");
          feedbackBox.className = "cap1-p10Feedback error";
        }
      }

      if (item) {
        feedbackBox.innerHTML = `
          <p><strong>${item.title}</strong></p>
          <p>${item.text}</p>
        `;
      }

      confirmBtn.hidden = true;
      resetBtn.hidden = false;

      updateStatus();
    });

    resetBtn.addEventListener("click", resetQuestion);

    resetQuestion();
  });

  updateStatus();
})();