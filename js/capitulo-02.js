/* =========================
   PÁGINA 11 — ALVOS CELULARES
   ========================= */

(function initPage11Targets() {
  const root = document.querySelector("[data-cap2-targets]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-target]"));
  const panel = document.getElementById("cap2TargetPanel");
  const panelTitle = document.getElementById("cap2TargetPanelTitle");
  const panelBody = document.getElementById("cap2TargetPanelBody");

  if (!tabs.length || !panel || !panelTitle || !panelBody) return;

  const targetMap = {
    parede: {
      tabId: "cap2TargetTabParede",
      title: "Parede celular — perda de resistência mecânica",
      body: `
        <p>Quando a síntese do peptidoglicano é interrompida, a bactéria perde parte importante da estrutura que sustenta sua forma e resiste ao estresse osmótico. Por isso, esse alvo tende a ser mais relevante em microrganismos em crescimento ativo, nos quais a parede está sendo continuamente remodelada.</p>
        <p>Do ponto de vista microbiológico, a resposta costuma se associar a colapso estrutural mais direto, o que ajuda a entender por que várias classes que atuam nesse alvo se relacionam a efeito bactericida.</p>
      `
    },
    ribossomo: {
      tabId: "cap2TargetTabRibossomo",
      title: "Ribossomo 70S — bloqueio da adaptação e da multiplicação",
      body: `
        <p>A inibição ribossomal reduz a produção de proteínas necessárias ao metabolismo, à divisão celular e à resposta ao ambiente. Em vez de romper imediatamente a estrutura bacteriana, esse mecanismo costuma comprometer a capacidade de a célula continuar funcionando e se multiplicando.</p>
        <p>Esse padrão ajuda a compreender por que muitos fármacos que atuam sobre síntese proteica se associam a efeito bacteriostático, embora existam exceções importantes, como os aminoglicosídeos.</p>
      `
    },
    dna: {
      tabId: "cap2TargetTabDNA",
      title: "DNA/RNA — interrupção de processos centrais de informação genética",
      body: `
        <p>Quando replicação ou transcrição são bloqueadas, a célula bacteriana deixa de copiar adequadamente seu material genético ou de gerar RNA mensageiro funcional. O resultado é perda rápida da capacidade de manter processos celulares indispensáveis.</p>
        <p>Como esse alvo interfere diretamente no fluxo de informação genética, a repercussão pode ser intensa mesmo sem alteração visível imediata da morfologia bacteriana.</p>
      `
    },
    folato: {
      tabId: "cap2TargetTabFolato",
      title: "Folato — redução progressiva da capacidade replicativa",
      body: `
        <p>A via do folato não é um componente estrutural da bactéria, mas um sistema metabólico necessário à produção de nucleotídeos. Sua inibição reduz a disponibilidade de precursores para síntese de DNA e RNA, comprometendo a multiplicação de forma mais indireta.</p>
        <p>Por depender de esgotamento metabólico progressivo, esse alvo costuma produzir efeito menos abrupto do que os mecanismos que afetam parede celular ou membrana.</p>
      `
    },
    membrana: {
      tabId: "cap2TargetTabMembrana",
      title: "Membrana citoplasmática — colapso funcional rápido",
      body: `
        <p>A membrana citoplasmática participa da manutenção da permeabilidade seletiva, do equilíbrio iônico e de funções energéticas essenciais. Quando sua organização é perturbada, a célula perde rapidamente a capacidade de manter gradientes e integridade funcional.</p>
        <p>Por essa razão, mecanismos dirigidos à membrana tendem a se associar a resposta microbiológica mais imediata, frequentemente com perda acelerada de viabilidade.</p>
      `
    }
  };

  function activate(targetKey) {
    const state = targetMap[targetKey];
    if (!state) return;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.target === targetKey;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panel.setAttribute("aria-labelledby", state.tabId);
    panelTitle.textContent = state.title;
    panelBody.innerHTML = state.body;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activate(tab.dataset.target);
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
      activate(tabs[nextIndex].dataset.target);
    });
  });

  activate("parede");
})();
/* =========================
   PÁGINA 12 — TABELA EDITORIAL
   ========================= */

(function initPage12Table() {
  const section = document.querySelector("[data-cap2-table-section]");
  if (!section) return;

  const wrapper = section.querySelector("[data-cap2-table-wrapper]");
  const hint = section.querySelector("[data-cap2-table-hint]");

  if (!wrapper || !hint) return;

  function updateScrollableState() {
    const isScrollable = wrapper.scrollWidth > wrapper.clientWidth + 4;
    wrapper.classList.toggle("is-scrollable", isScrollable);
    hint.hidden = !isScrollable;
  }

  updateScrollableState();
  window.addEventListener("resize", updateScrollableState);
})();
/* =========================
   PÁGINA 13 — PAREDE CELULAR
   ========================= */

(function initPage13Wall() {
  const root = document.querySelector("[data-cap2-wall]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-wall-tab]"));
  const panel = document.getElementById("cap2P13Panel");
  const image = document.getElementById("cap2P13Image");
  const caption = document.getElementById("cap2P13Caption");
  const title = document.getElementById("cap2P13Title");
  const body = document.getElementById("cap2P13Body");
  const zoomButton = root.querySelector(".cap2-p13-zoom");

  if (!tabs.length || !panel || !image || !caption || !title || !body || !zoomButton) return;

  const states = {
    sintese: {
      tabId: "cap2P13TabSintese",
      src: "../../assets/capitulo-02/imagens/sintese-peptidoglicano.png",
      alt: "Etapas da síntese do peptidoglicano na parede celular bacteriana",
      caption: "Etapas da síntese do peptidoglicano na parede celular bacteriana. Clique para ampliar.",
      title: "Etapas da síntese do peptidoglicano",
      body: `
        <p>1) Formação dos precursores no citoplasma: unidades de NAG e NAM são sintetizadas e associadas a pequenas cadeias peptídicas, formando precursores solúveis.</p>
        <p>2) Transporte através da membrana citoplasmática: os precursores são transportados para a face externa da membrana por meio de um carreador lipídico denominado bactoprenol.</p>
        <p>3) Incorporação à parede existente: as novas subunidades são adicionadas à rede de peptidoglicano por reações de transglicosilação, ampliando a estrutura da parede celular.</p>
        <p>4) Formação das ligações cruzadas: as PBPs catalisam a reação de transpeptidação, formando pontes entre cadeias peptídicas adjacentes, conferindo resistência mecânica à parede celular.</p>
        <p><strong>Implicação clínica:</strong> antibacterianos que atuam nessa etapa tendem a ser mais eficazes em bactérias em crescimento ativo.</p>
      `
    },

    beta: {
      tabId: "cap2P13TabBeta",
      src: "../../assets/capitulo-02/imagens/beta-lactamicos-transpeptidacao.png",
      alt: "Interferência dos β-lactâmicos na etapa de transpeptidação do peptidoglicano",
      caption: "Interferência dos β-lactâmicos na etapa de transpeptidação do peptidoglicano. Clique para ampliar.",
      title: "β-lactâmicos",
      body: `
        <p>Os β-lactâmicos ligam-se às proteínas ligadoras de penicilina (PBPs), enzimas envolvidas nas etapas finais da síntese da parede celular bacteriana.</p>
        <p>Ao ocuparem esses alvos, impedem a reação de transpeptidação responsável pela formação das ligações cruzadas entre cadeias peptídicas adjacentes do peptidoglicano.</p>
        <p>Com isso, a parede celular recém-sintetizada perde resistência mecânica e torna-se progressivamente incapaz de sustentar a integridade estrutural da bactéria, favorecendo lise celular, especialmente durante fases de crescimento ativo <sup>2,4</sup>.</p>
      `
    },

    glico: {
      tabId: "cap2P13TabGlico",
      src: "../../assets/capitulo-02/imagens/glicopeptideos-dala-dala.png",
      alt: "Interferência dos glicopeptídeos na incorporação e ligação cruzada do peptidoglicano",
      caption: "Interferência dos glicopeptídeos na incorporação e ligação cruzada do peptidoglicano. Clique para ampliar.",
      title: "Glicopeptídeos",
      body: `
        <p>Os glicopeptídeos atuam por mecanismo distinto dos β-lactâmicos. Em vez de se ligarem às PBPs, ligam-se diretamente à extremidade terminal D-Ala-D-Ala dos precursores do peptidoglicano.</p>
        <p>Essa ligação cria impedimento estérico que dificulta a incorporação das novas subunidades à parede em formação e compromete também as etapas posteriores de ligação cruzada.</p>
        <p>Como consequência, a estrutura do peptidoglicano torna-se progressivamente instável, reduzindo a resistência da parede celular e favorecendo lise bacteriana em condições apropriadas <sup>1,2</sup>.</p>
      `
    }
  };

  function activate(key) {
    const state = states[key];
    if (!state) return;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.wallTab === key;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panel.setAttribute("aria-labelledby", state.tabId);

    image.src = state.src;
    image.alt = state.alt;
    caption.textContent = state.caption;
    title.textContent = state.title;
    body.innerHTML = state.body;

    zoomButton.setAttribute("data-zoom", state.src);
    zoomButton.setAttribute("aria-label", `Ampliar imagem: ${state.title}`);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activate(tab.dataset.wallTab);
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
      activate(tabs[nextIndex].dataset.wallTab);
    });
  });

  activate("sintese");
})();
/* =========================
   PÁGINA 14 — MEMBRANA CITOPLASMÁTICA
   ========================= */

(function initPage14Membrane() {
  const root = document.querySelector("[data-cap2-membrane]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-membrane-drug]"));
  const panel = document.getElementById("cap2P14Panel");
  const image = document.getElementById("cap2P14Image");
  const caption = document.getElementById("cap2P14Caption");
  const zoomButton = root.querySelector(".cap2-p14-zoom");
  const title = document.getElementById("cap2P14Title");
  const text = document.getElementById("cap2P14Text");
  const step = document.getElementById("cap2P14Step");
  const prev = document.getElementById("cap2P14Prev");
  const next = document.getElementById("cap2P14Next");

  if (!tabs.length || !panel || !image || !caption || !zoomButton || !title || !text || !step || !prev || !next) {
    return;
  }

  const states = {
    membrana: {
      tabId: "cap2P14TabMembrana",
      steps: [
        {
          src: "../../assets/capitulo-02/imagens/membrana-citoplasmatica.png",
          alt: "Estrutura da membrana citoplasmática bacteriana",
          caption: "Estrutura da membrana citoplasmática bacteriana. Clique para ampliar.",
          title: "Funções essenciais da membrana citoplasmática",
          text: `
            <p>A membrana citoplasmática participa da manutenção do gradiente eletroquímico, regula a passagem de substâncias e abriga processos importantes de geração de energia.</p>
            <p>Por isso, sua integridade não é apenas estrutural: ela condiciona funções metabólicas indispensáveis à viabilidade bacteriana.</p>
          `
        }
      ]
    },

    polimixina: {
      tabId: "cap2P14TabPolimixina",
      steps: [
        {
          src: "../../assets/capitulo-02/imagens/polimixina-fase-1.png",
          alt: "Ligação inicial da polimixina ao envelope bacteriano",
          caption: "Ligação inicial da polimixina ao envelope bacteriano. Clique para ampliar.",
          title: "Polimixinas — interação inicial com o envelope bacteriano",
          text: `
            <p>As polimixinas ligam-se inicialmente ao lipid A, componente do lipopolissacarídeo da membrana externa de bactérias Gram-negativas.</p>
            <p>Essa interação desloca cátions divalentes estabilizadores e inicia a desorganização do envelope bacteriano <sup>1</sup>.</p>
          `
        },
        {
          src: "../../assets/capitulo-02/imagens/polimixina-fase-2.png",
          alt: "Desorganização progressiva da membrana bacteriana após ação da polimixina",
          caption: "Desorganização progressiva da membrana bacteriana após ação da polimixina. Clique para ampliar.",
          title: "Polimixinas — aumento da permeabilidade e colapso funcional",
          text: `
            <p>A desestabilização do envelope aumenta a permeabilidade da membrana e favorece perda progressiva da função de barreira.</p>
            <p>O resultado é comprometimento rápido da homeostase celular e perda de viabilidade bacteriana.</p>
          `
        }
      ]
    },

    daptomicina: {
      tabId: "cap2P14TabDaptomicina",
      steps: [
        {
          src: "../../assets/capitulo-02/imagens/daptomicina-fase-1.png",
          alt: "Ligação inicial da daptomicina à membrana citoplasmática bacteriana",
          caption: "Ligação inicial da daptomicina à membrana citoplasmática bacteriana. Clique para ampliar.",
          title: "Daptomicina — ligação inicial à membrana",
          text: `
            <p>Em presença de cálcio, a daptomicina liga-se à membrana citoplasmática de bactérias Gram-positivas.</p>
            <p>Essa interação altera a organização da membrana e prepara o cenário para perda do equilíbrio eletroquímico <sup>2</sup>.</p>
          `
        },
        {
          src: "../../assets/capitulo-02/imagens/daptomicina-fase-2.png",
          alt: "Despolarização da membrana bacteriana induzida pela daptomicina",
          caption: "Despolarização da membrana bacteriana induzida pela daptomicina. Clique para ampliar.",
          title: "Daptomicina — despolarização da membrana",
          text: `
            <p>A inserção do fármaco na membrana altera o potencial elétrico transmembrana e compromete o equilíbrio iônico necessário ao funcionamento celular.</p>
            <p>Com isso, processos dependentes de energia passam a falhar rapidamente.</p>
          `
        },
        {
          src: "../../assets/capitulo-02/imagens/daptomicina-fase-3.png",
          alt: "Colapso funcional da célula bacteriana após ação da daptomicina",
          caption: "Colapso funcional da célula bacteriana após ação da daptomicina. Clique para ampliar.",
          title: "Daptomicina — colapso funcional da célula bacteriana",
          text: `
            <p>A perda sustentada do equilíbrio eletroquímico compromete funções essenciais da célula bacteriana.</p>
            <p>O desfecho é colapso funcional rápido, compatível com o efeito bactericida observado para essa classe.</p>
          `
        }
      ]
    }
  };

  let currentKey = "membrana";
  let currentIndex = 0;

  function render() {
    const group = states[currentKey];
    if (!group) return;

    const item = group.steps[currentIndex];
    if (!item) return;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.membraneDrug === currentKey;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panel.setAttribute("aria-labelledby", group.tabId);

    image.src = item.src;
    image.alt = item.alt;
    caption.textContent = item.caption;
    title.textContent = item.title;
    text.innerHTML = item.text;

    zoomButton.setAttribute("data-zoom", item.src);
    zoomButton.setAttribute("aria-label", `Ampliar imagem: ${item.title}`);

    if (group.steps.length > 1) {
      step.textContent = `Etapa ${currentIndex + 1} de ${group.steps.length}`;
      prev.style.display = "inline-flex";
      next.style.display = "inline-flex";
      prev.disabled = currentIndex === 0;
      next.disabled = currentIndex === group.steps.length - 1;
    } else {
      step.textContent = "";
      prev.style.display = "none";
      next.style.display = "none";
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      currentKey = tab.dataset.membraneDrug;
      currentIndex = 0;
      render();
    });

    tab.addEventListener("keydown", (event) => {
      const currentTabIndex = tabs.indexOf(tab);
      let nextTabIndex = null;

      if (event.key === "ArrowRight") {
        nextTabIndex = (currentTabIndex + 1) % tabs.length;
      }

      if (event.key === "ArrowLeft") {
        nextTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
      }

      if (nextTabIndex === null) return;

      event.preventDefault();
      tabs[nextTabIndex].focus();
      currentKey = tabs[nextTabIndex].dataset.membraneDrug;
      currentIndex = 0;
      render();
    });
  });

  prev.addEventListener("click", () => {
    const group = states[currentKey];
    if (!group || currentIndex === 0) return;
    currentIndex -= 1;
    render();
  });

  next.addEventListener("click", () => {
    const group = states[currentKey];
    if (!group || currentIndex >= group.steps.length - 1) return;
    currentIndex += 1;
    render();
  });

  render();
})();
/* =========================
   PÁGINA 15 — SÍNTESE PROTEICA
   ========================= */

(function initPage15Protein() {
  const root = document.querySelector("[data-cap2-protein]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-protein-group]"));
  const panel = document.getElementById("cap2P15Panel");
  const image = document.getElementById("cap2P15Image");
  const caption = document.getElementById("cap2P15Caption");
  const zoomButton = root.querySelector(".cap2-p15-zoom");
  const title = document.getElementById("cap2P15Title");
  const text = document.getElementById("cap2P15Text");
  const step = document.getElementById("cap2P15Step");
  const prev = document.getElementById("cap2P15Prev");
  const next = document.getElementById("cap2P15Next");

  if (!tabs.length || !panel || !image || !caption || !zoomButton || !title || !text || !step || !prev || !next) {
    return;
  }

  const states = {
    processo: {
      tabId: "cap2P15TabProcesso",
      steps: [
        {
          src: "../../assets/capitulo-02/imagens/ribossomo-iniciacao.png",
          alt: "Etapa de iniciação da síntese proteica bacteriana",
          caption: "Etapa de iniciação da síntese proteica bacteriana. Clique para ampliar.",
          title: "Iniciação",
          text: `
            <p>A síntese proteica bacteriana inicia-se quando a subunidade 30S reconhece e se liga ao RNA mensageiro.</p>
            <p>Em seguida, o RNA transportador iniciador associa-se ao códon inicial, formando o complexo de iniciação.</p>
            <p>Depois disso, a subunidade 50S se associa ao conjunto, constituindo o ribossomo funcional apto a iniciar a tradução.</p>
          `
        },
        {
          src: "../../assets/capitulo-02/imagens/ribossomo-elongacao.png",
          alt: "Etapa de elongação da síntese proteica bacteriana",
          caption: "Etapa de elongação da síntese proteica bacteriana. Clique para ampliar.",
          title: "Elongação",
          text: `
            <p>Durante a elongação, novos RNAs transportadores entram no sítio A do ribossomo trazendo aminoácidos compatíveis com o códon exposto no RNA mensageiro.</p>
            <p>A subunidade 50S catalisa a formação da ligação peptídica entre os aminoácidos, permitindo o crescimento progressivo da cadeia polipeptídica.</p>
            <p>Em seguida, ocorre a translocação do ribossomo ao longo do RNA mensageiro, o que expõe o próximo códon e permite a continuidade da tradução.</p>
          `
        },
        {
          src: "../../assets/capitulo-02/imagens/ribossomo-terminacao.png",
          alt: "Etapa de terminação da síntese proteica bacteriana",
          caption: "Etapa de terminação da síntese proteica bacteriana. Clique para ampliar.",
          title: "Terminação",
          text: `
            <p>Quando o ribossomo alcança um códon de parada, fatores de liberação promovem o encerramento do processo traducional.</p>
            <p>A cadeia polipeptídica recém-formada é liberada, e o complexo ribossomal se dissocia em suas subunidades.</p>
            <p>Esse encerramento permite que os componentes do sistema de tradução sejam reutilizados em novos ciclos de síntese proteica.</p>
          `
        }
      ]
    },

    "30s": {
      tabId: "cap2P15Tab30S",
      steps: [
        {
          src: "../../assets/capitulo-02/imagens/tetraciclina-ribossomo-30s.png",
          alt: "Ação da tetraciclina sobre a subunidade 30S",
          caption: "Ação da tetraciclina sobre a subunidade 30S. Clique para ampliar.",
          title: "30S — Tetraciclinas",
          text: `
            <p>As tetraciclinas ligam-se à subunidade 30S e dificultam a entrada adequada do RNA transportador carregado com aminoácidos no ribossomo.</p>
            <p>Com isso, a elongação da cadeia polipeptídica é interrompida, porque novos aminoácidos deixam de ser incorporados de forma eficiente.</p>
          `
        },
        {
          src: "../../assets/capitulo-02/imagens/aminoglicosideo-ribossomo-30s.png",
          alt: "Ação dos aminoglicosídeos sobre a subunidade 30S",
          caption: "Ação dos aminoglicosídeos sobre a subunidade 30S. Clique para ampliar.",
          title: "30S — Aminoglicosídeos",
          text: `
            <p>Os aminoglicosídeos ligam-se ao ribossomo bacteriano e interferem na leitura correta do RNA mensageiro.</p>
            <p>Essa alteração favorece a incorporação de aminoácidos inadequados e resulta na produção de proteínas defeituosas ou não funcionais, o que ajuda a explicar seu efeito geralmente bactericida.</p>
          `
        }
      ]
    },

    "50s": {
      tabId: "cap2P15Tab50S",
      steps: [
        {
          src: "../../assets/capitulo-02/imagens/ribossomo-50s-etapa-1-alvo.png",
          alt: "Subunidade 50S como alvo molecular de antibacterianos",
          caption: "Subunidade 50S como alvo molecular de antibacterianos. Clique para ampliar.",
          title: "50S — Alvo molecular",
          text: `
            <p>Macrolídeos, lincosamidas e oxazolidinonas ligam-se seletivamente à subunidade 50S do ribossomo bacteriano.</p>
            <p>Essa ligação interfere em etapas centrais da tradução, especialmente na formação da ligação peptídica e no deslocamento adequado do ribossomo ao longo do RNA mensageiro.</p>
          `
        },
        {
          src: "../../assets/capitulo-02/imagens/ribossomo-50s-etapa-2-interrupcao.png",
          alt: "Mecanismo de interrupção da tradução mediado por fármacos que atuam na 50S",
          caption: "Mecanismo de interrupção da tradução mediado por fármacos que atuam na 50S. Clique para ampliar.",
          title: "50S — Interrupção da tradução",
          text: `
            <p>A ligação dessas classes à subunidade 50S compromete a progressão normal da tradução.</p>
            <p>Isso pode ocorrer por bloqueio da translocação do ribossomo ou por interferência na formação adequada da ligação peptídica, interrompendo a continuidade da síntese proteica.</p>
          `
        },
        {
          src: "../../assets/capitulo-02/imagens/ribossomo-50s-etapa-3-efeitos.png",
          alt: "Efeitos celulares da redução da síntese proteica bacteriana",
          caption: "Efeitos celulares da redução da síntese proteica bacteriana. Clique para ampliar.",
          title: "50S — Efeitos celulares",
          text: `
            <p>A interrupção da tradução reduz a produção de proteínas completas e funcionalmente ativas.</p>
            <p>Como consequência, a célula bacteriana passa a apresentar déficit de enzimas metabólicas, proteínas estruturais e fatores regulatórios necessários à adaptação e à multiplicação.</p>
          `
        },
        {
          src: "../../assets/capitulo-02/imagens/ribossomo-50s-etapa-4-desfecho.png",
          alt: "Desfecho biológico da inibição da síntese proteica na subunidade 50S",
          caption: "Desfecho biológico da inibição da síntese proteica na subunidade 50S. Clique para ampliar.",
          title: "50S — Desfecho biológico",
          text: `
            <p>Embora a integridade estrutural da bactéria possa ser preservada inicialmente, a redução sustentada da síntese proteica compromete progressivamente a capacidade de resposta ao ambiente.</p>
            <p>Com isso, a célula bacteriana perde a capacidade de adaptação e multiplicação, caracterizando o efeito predominantemente bacteriostático observado para muitas dessas classes.</p>
          `
        }
      ]
    }
  };

  let currentGroup = "processo";
  let currentIndex = 0;

  function render() {
    const sequenceGroup = states[currentGroup];
    if (!sequenceGroup) return;

    const item = sequenceGroup.steps[currentIndex];
    if (!item) return;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.proteinGroup === currentGroup;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panel.setAttribute("aria-labelledby", sequenceGroup.tabId);

    image.src = item.src;
    image.alt = item.alt;
    caption.textContent = item.caption;
    title.textContent = item.title;
    text.innerHTML = item.text;

    zoomButton.setAttribute("data-zoom", item.src);
    zoomButton.setAttribute("aria-label", `Ampliar imagem: ${item.title}`);

    if (sequenceGroup.steps.length > 1) {
      step.textContent = `Etapa ${currentIndex + 1} de ${sequenceGroup.steps.length}`;
      prev.style.display = "inline-flex";
      next.style.display = "inline-flex";
      prev.disabled = currentIndex === 0;
      next.disabled = currentIndex === sequenceGroup.steps.length - 1;
    } else {
      step.textContent = "";
      prev.style.display = "none";
      next.style.display = "none";
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      currentGroup = tab.dataset.proteinGroup;
      currentIndex = 0;
      render();
    });

    tab.addEventListener("keydown", (event) => {
      const currentTabIndex = tabs.indexOf(tab);
      let nextTabIndex = null;

      if (event.key === "ArrowRight") {
        nextTabIndex = (currentTabIndex + 1) % tabs.length;
      }

      if (event.key === "ArrowLeft") {
        nextTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
      }

      if (nextTabIndex === null) return;

      event.preventDefault();
      tabs[nextTabIndex].focus();
      currentGroup = tabs[nextTabIndex].dataset.proteinGroup;
      currentIndex = 0;
      render();
    });
  });

  prev.addEventListener("click", () => {
    const sequenceGroup = states[currentGroup];
    if (!sequenceGroup || currentIndex === 0) return;
    currentIndex -= 1;
    render();
  });

  next.addEventListener("click", () => {
    const sequenceGroup = states[currentGroup];
    if (!sequenceGroup || currentIndex >= sequenceGroup.steps.length - 1) return;
    currentIndex += 1;
    render();
  });

  render();
})();
/* =========================
   PÁGINA 16 — ÁCIDOS NUCLEICOS
   ========================= */

(function initPage16Nucleic() {
  const root = document.querySelector("[data-cap2-nucleic]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-nucleic-tab]"));
  const panel = document.getElementById("cap2P16Panel");
  const image = document.getElementById("cap2P16Image");
  const caption = document.getElementById("cap2P16Caption");
  const zoomButton = root.querySelector(".cap2-p16-zoom");
  const title = document.getElementById("cap2P16Title");
  const text = document.getElementById("cap2P16Text");

  if (!tabs.length || !panel || !image || !caption || !zoomButton || !title || !text) {
    return;
  }

  const states = {
    processo: {
      tabId: "cap2P16TabProcesso",
      src: "../../assets/capitulo-02/imagens/acidos-nucleicos-processo.png",
      alt: "Etapas gerais da replicação e transcrição do DNA bacteriano",
      caption: "Etapas gerais da replicação e transcrição do DNA bacteriano. Clique para ampliar.",
      title: "Processo geral",
      text: `
        <p>A replicação bacteriana depende da abertura da dupla hélice, do controle do superenrolamento e da síntese ordenada de novas fitas de DNA.</p>
        <p>Paralelamente, a transcrição converte a informação genética em RNA mensageiro por ação da RNA polimerase, tornando possível a síntese de proteínas necessárias ao funcionamento celular.</p>
      `
    },

    fluoroquinolonas: {
      tabId: "cap2P16TabFluoroquinolonas",
      src: "../../assets/capitulo-02/imagens/fluoroquinolona-dna-topoisomerase.png",
      alt: "Interferência das fluoroquinolonas no complexo DNA-topoisomerase",
      caption: "Interferência das fluoroquinolonas no complexo DNA-topoisomerase. Clique para ampliar.",
      title: "Fluoroquinolonas",
      text: `
        <p>As fluoroquinolonas ligam-se ao complexo formado entre o DNA e as topoisomerases após a clivagem da fita, impedindo sua religação.</p>
        <p>O resultado é o acúmulo de quebras no DNA e a interrupção da replicação cromossômica <sup>2</sup>.</p>
      `
    },

    rifamicinas: {
      tabId: "cap2P16TabRifamicinas",
      src: "../../assets/capitulo-02/imagens/rifamicina-rna-polimerase.png",
      alt: "Bloqueio da transcrição bacteriana por rifamicinas",
      caption: "Bloqueio da transcrição bacteriana por rifamicinas. Clique para ampliar.",
      title: "Rifamicinas",
      text: `
        <p>As rifamicinas ligam-se à RNA polimerase bacteriana e bloqueiam sua progressão ao longo do DNA.</p>
        <p>Com isso, a síntese de RNA mensageiro é interrompida, comprometendo indiretamente a produção proteica <sup>1</sup>.</p>
      `
    },

    nitroimidazois: {
      tabId: "cap2P16TabNitroimidazois",
      src: "../../assets/capitulo-02/imagens/nitroimidazol-dano-dna.png",
      alt: "Dano molecular direto ao DNA induzido por nitroimidazóis",
      caption: "Dano molecular direto ao DNA induzido por nitroimidazóis. Clique para ampliar.",
      title: "Nitroimidazóis",
      text: `
        <p>Após ativação intracelular em microrganismos anaeróbios ou em condições de baixo potencial redox, os nitroimidazóis geram metabólitos reativos.</p>
        <p>Esses metabólitos interagem com o DNA e promovem dano molecular direto, comprometendo a estabilidade genética bacteriana <sup>1</sup>.</p>
      `
    }
  };

  function render(key) {
    const state = states[key];
    if (!state) return;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.nucleicTab === key;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panel.setAttribute("aria-labelledby", state.tabId);

    image.src = state.src;
    image.alt = state.alt;
    caption.textContent = state.caption;
    title.textContent = state.title;
    text.innerHTML = state.text;

    zoomButton.setAttribute("data-zoom", state.src);
    zoomButton.setAttribute("aria-label", `Ampliar imagem: ${state.title}`);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      render(tab.dataset.nucleicTab);
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
      render(tabs[nextIndex].dataset.nucleicTab);
    });
  });

  render("processo");
})();
/* =========================
   PÁGINA 17 — METABOLISMO DO FOLATO
   ========================= */

(function initPage17Folato() {
  const root = document.querySelector("[data-folato]");
  if (!root) return;

  const image = document.getElementById("cap2P17Image");
  const title = document.getElementById("cap2P17Title");
  const text = document.getElementById("cap2P17Text");
  const step = document.getElementById("cap2P17Step");
  const caption = document.getElementById("cap2P17Caption");
  const prev = document.getElementById("cap2P17Prev");
  const next = document.getElementById("cap2P17Next");
  const zoomButton = root.querySelector(".cap2-p17-zoom");

  if (!image || !title || !text || !step || !caption || !prev || !next || !zoomButton) {
    return;
  }

  const states = [
    {
      src: "../../assets/capitulo-02/imagens/folato-via-geral.png",
      alt: "Via metabólica bacteriana do folato",
      caption: "Via metabólica bacteriana do folato. Clique para ampliar.",
      title: "Via do folato",
      text: `
        <p>A síntese bacteriana do folato começa com a incorporação do PABA e prossegue pela formação do ácido di-hidrofólico (DHF) e do ácido tetrahidrofólico (THF).</p>
        <p>O THF atua como cofator essencial para a síntese de purinas e timidilato, etapas indispensáveis à produção de DNA e RNA.</p>
      `
    },
    {
      src: "../../assets/capitulo-02/imagens/folato-sulfonamida.png",
      alt: "Interferência das sulfonamidas na via bacteriana do folato",
      caption: "Interferência das sulfonamidas na via bacteriana do folato. Clique para ampliar.",
      title: "Sulfonamidas",
      text: `
        <p>As sulfonamidas apresentam estrutura semelhante ao PABA e competem com esse substrato na etapa inicial da via.</p>
        <p>Como consequência, a produção de DHF é reduzida, comprometendo a continuidade da síntese do folato <sup>1</sup>.</p>
      `
    },
    {
      src: "../../assets/capitulo-02/imagens/folato-trimetoprim.png",
      alt: "Interferência do trimetoprim na conversão de DHF em THF",
      caption: "Interferência do trimetoprim na conversão de DHF em THF. Clique para ampliar.",
      title: "Trimetoprim",
      text: `
        <p>O trimetoprim inibe a di-hidrofolato redutase bacteriana, impedindo a conversão de DHF em THF.</p>
        <p>Sem THF funcional, a célula bacteriana passa a ter menor disponibilidade de cofatores para a síntese de nucleotídeos.</p>
      `
    },
    {
      src: "../../assets/capitulo-02/imagens/folato-associacao.png",
      alt: "Bloqueio sequencial da via do folato pela associação sulfametoxazol-trimetoprim",
      caption: "Bloqueio sequencial da via do folato pela associação sulfametoxazol-trimetoprim. Clique para ampliar.",
      title: "Associação sulfametoxazol–trimetoprim",
      text: `
        <p>A associação promove bloqueio sequencial da via metabólica, interferindo em duas etapas consecutivas da síntese do folato.</p>
        <p>Esse efeito intensifica a redução da produção de nucleotídeos e compromete de forma mais acentuada a capacidade replicativa bacteriana.</p>
      `
    }
  ];

  let currentIndex = 0;

  function render() {
    const state = states[currentIndex];
    if (!state) return;

    image.src = state.src;
    image.alt = state.alt;
    caption.textContent = state.caption;
    title.textContent = state.title;
    text.innerHTML = state.text;

    zoomButton.setAttribute("data-zoom", state.src);
    zoomButton.setAttribute("aria-label", `Ampliar imagem: ${state.title}`);

    step.textContent = `Etapa ${currentIndex + 1} de ${states.length}`;
    prev.disabled = currentIndex === 0;
    next.disabled = currentIndex === states.length - 1;
  }

  prev.addEventListener("click", () => {
    if (currentIndex === 0) return;
    currentIndex -= 1;
    render();
  });

  next.addEventListener("click", () => {
    if (currentIndex >= states.length - 1) return;
    currentIndex += 1;
    render();
  });

  render();
})();
/* =========================
   PÁGINA 18 — BACTERICIDA VS BACTERIOSTÁTICO
   ========================= */

(function initPage18Response() {
  const root = document.querySelector("[data-cap2-response]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-response-tab]"));
  const panel = document.getElementById("cap2P18Panel");
  const image = document.getElementById("cap2P18Image");
  const caption = document.getElementById("cap2P18Caption");
  const zoomButtons = Array.from(root.querySelectorAll(".cap2-p18-zoom"));
  const mainZoomButton = root.querySelector(".cap2-p18-figure .cap2-p18-zoom");
  const title = document.getElementById("cap2P18Title");
  const text = document.getElementById("cap2P18Text");

  if (!tabs.length || !panel || !image || !caption || !mainZoomButton || !title || !text) {
    return;
  }

  const states = {
    bacteriostatico: {
      tabId: "cap2P18TabBacteriostatico",
      src: "../../assets/capitulo-02/imagens/bacteriostatico-resposta-populacional.png",
      alt: "Representação visual de resposta bacteriostática",
      caption: "Representação visual de resposta bacteriostática. Clique para ampliar.",
      title: "Bacteriostático",
      text: `
        <p>O padrão bacteriostático corresponde à inibição da multiplicação bacteriana sem redução necessariamente imediata do número de células viáveis. Em termos populacionais, o crescimento deixa de progredir como ocorreria na ausência do antibacteriano.</p>
        <p>Esse comportamento ajuda a entender por que muitos fármacos que interferem na síntese proteica ou em vias metabólicas bacterianas tendem a produzir estabilização populacional mais do que queda abrupta do inóculo.</p>
        <p><strong>Ponto importante:</strong> esse padrão microbiológico não implica, por si só, menor relevância clínica. Seu significado depende do sítio infeccioso, do estado do hospedeiro e do contexto terapêutico.</p>
      `
    },

    bactericida: {
      tabId: "cap2P18TabBactericida",
      src: "../../assets/capitulo-02/imagens/bactericida-resposta-populacional.png",
      alt: "Representação visual de resposta bactericida",
      caption: "Representação visual de resposta bactericida. Clique para ampliar.",
      title: "Bactericida",
      text: `
        <p>O padrão bactericida corresponde à redução progressiva da população bacteriana viável ao longo do tempo, refletindo perda efetiva de viabilidade celular após exposição ao antibacteriano.</p>
        <p>Esse comportamento é frequentemente associado a fármacos que interferem diretamente em estruturas essenciais, como parede celular, membrana citoplasmática ou integridade do DNA, produzindo dano celular mais decisivo.</p>
        <p><strong>Ponto importante:</strong> mesmo esse padrão não deve ser tratado como sinônimo automático de superioridade terapêutica. O desfecho clínico continua dependente do contexto microbiológico e do paciente.</p>
      `
    }
  };

  function activate(key) {
    const state = states[key];
    if (!state) return;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.responseTab === key;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panel.setAttribute("aria-labelledby", state.tabId);

    image.src = state.src;
    image.alt = state.alt;
    caption.textContent = state.caption;
    title.textContent = state.title;
    text.innerHTML = state.text;

    mainZoomButton.setAttribute("data-zoom", state.src);
    mainZoomButton.setAttribute("aria-label", `Ampliar imagem: ${state.title}`);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activate(tab.dataset.responseTab);
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
      activate(tabs[nextIndex].dataset.responseTab);
    });
  });

  activate("bacteriostatico");

  zoomButtons.forEach((button) => {
    if (!button.hasAttribute("type")) {
      button.setAttribute("type", "button");
    }
  });
})();
/* =========================
   PÁGINA 19 — QUIZ DE REVISÃO
   ========================= */

(function initPage19ClinicalReview() {
  const root = document.querySelector("[data-cap2-p19]");
  if (!root) return;

  const questions = Array.from(root.querySelectorAll(".cap2-p19Question"));
  const statusValue = root.querySelector(".cap2-p19Status__value");
  const completion = root.querySelector("[data-p19-completion]");
  const completionText = root.querySelector("[data-p19-completion-text]");

  if (!questions.length) return;

  const completionMap = {
    perfect:
      "Você articulou adequadamente os dois eixos centrais desta revisão: a atividade de certos antibacterianos depende da intensidade de processos celulares bacterianos em curso, e a toxicidade seletiva decorre de diferenças estruturais ou metabólicas entre bactéria e hospedeiro.",
    partial:
      "A leitura conceitual está em consolidação, mas ainda exige atenção a dois pontos: alguns mecanismos têm desempenho dependente do crescimento bacteriano, e a seletividade terapêutica não decorre de ausência absoluta de risco, mas de diferenças suficientes entre alvos bacterianos e humanos.",
    needsReview:
      "Vale revisar o encadeamento conceitual do capítulo: primeiro, identificar qual processo celular bacteriano está sendo atingido; depois, entender em que contexto esse processo é mais ativo; por fim, reconhecer por que esse alvo pode ser explorado terapeuticamente com relativa seletividade."
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
      question.querySelectorAll(".cap2-p19Options button")
    );
    const confirmBtn = question.querySelector('[data-p19-action="confirm"]');
    const resetBtn = question.querySelector('[data-p19-action="reset"]');
    const feedbackBox = question.querySelector(".cap2-p19Feedback");
    const feedbackTemplate = question.querySelector(".cap2-p19FeedbackMap");

    if (!confirmBtn || !resetBtn || !feedbackBox || !feedbackTemplate) return;

    let selectedAnswer = null;
    let confirmed = false;
    let feedbackMap = {};

    try {
      feedbackMap = JSON.parse(feedbackTemplate.innerHTML.trim());
    } catch (error) {
      console.error("Erro ao ler feedback da revisão do capítulo 2:", error);
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
      feedbackBox.className = "cap2-p19Feedback";

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
        `.cap2-p19Options button[data-answer="${selectedAnswer}"]`
      );
      const correct = question.querySelector(
        '.cap2-p19Options button[data-correct="true"]'
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
          feedbackBox.className = "cap2-p19Feedback correct";
        } else {
          chosen.classList.add("error");
          if (correct) correct.classList.add("correct");
          feedbackBox.className = "cap2-p19Feedback error";
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
/* =========================
   PÁGINA 19 — QUIZ DE REVISÃO
   ========================= */

(function initPage19Quiz(){
  const root = document.querySelector("[data-cap2-p19]");
  if(!root) return;

  const questions = Array.from(root.querySelectorAll(".cap2-p19Question"));
  const navPrev = root.querySelector('[data-p19-action="prev"]');
  const navNext = root.querySelector('[data-p19-action="next"]');
  const progress = root.querySelector(".cap2-p19Progress");
  const doneBlock = root.querySelector(".cap2-p19Done");

  if(!questions.length || !navPrev || !navNext || !progress || !doneBlock) return;

  let currentIndex = 0;

  function parseFeedbackMap(questionEl){
    const template = questionEl.querySelector(".cap2-p19FeedbackMap");
    if(!template) return {};
    try{
      return JSON.parse(template.innerHTML.trim());
    }catch{
      return {};
    }
  }

  function updateProgress(){
    progress.textContent = `Questão ${currentIndex + 1} de ${questions.length}`;
  }

  function showQuestion(index){
    currentIndex = index;

    questions.forEach((q, i) => {
      q.classList.toggle("active", i === index);
    });

    doneBlock.hidden = true;
    updateProgress();

    navPrev.disabled = index === 0;
    navNext.disabled = index === questions.length - 1;
  }

  function showDone(){
    questions.forEach((q) => q.classList.remove("active"));
    doneBlock.hidden = false;
    progress.textContent = `Questões concluídas`;
    navPrev.disabled = true;
    navNext.disabled = true;
  }

  questions.forEach((questionEl, questionIndex) => {
    const options = Array.from(questionEl.querySelectorAll(".cap2-p19Options button"));
    const confirmBtn = questionEl.querySelector('[data-p19-action="confirm"]');
    const resetBtn = questionEl.querySelector('[data-p19-action="reset"]');
    const feedbackEl = questionEl.querySelector(".cap2-p19Feedback");
    const feedbackMap = parseFeedbackMap(questionEl);

    let selectedAnswer = null;
    let confirmed = false;

    function resetQuestion(){
      selectedAnswer = null;
      confirmed = false;

      options.forEach((option) => {
        option.classList.remove("is-selected", "is-correct", "is-wrong");
        option.disabled = false;
      });

      confirmBtn.disabled = true;
      resetBtn.hidden = true;

      feedbackEl.className = "cap2-p19Feedback";
      feedbackEl.innerHTML = "";
    }

    options.forEach((option) => {
      option.addEventListener("click", () => {
        if(confirmed) return;

        options.forEach((btn) => btn.classList.remove("is-selected"));
        option.classList.add("is-selected");
        selectedAnswer = option.dataset.answer || null;
        confirmBtn.disabled = !selectedAnswer;
      });
    });

    confirmBtn.addEventListener("click", () => {
      if(!selectedAnswer || confirmed) return;

      confirmed = true;

      const selectedBtn = options.find((btn) => btn.dataset.answer === selectedAnswer);
      const correctBtn = options.find((btn) => btn.hasAttribute("data-correct"));
      const data = feedbackMap[selectedAnswer];

      options.forEach((btn) => {
        btn.disabled = true;
        if(btn === correctBtn) btn.classList.add("is-correct");
      });

      if(selectedBtn && selectedBtn !== correctBtn){
        selectedBtn.classList.add("is-wrong");
      }

      if(data){
        feedbackEl.className = `cap2-p19Feedback is-visible ${data.type === "correct" ? "is-correct" : "is-error"}`;
        feedbackEl.innerHTML = `
          <p class="cap2-p19FeedbackTitle">${data.title}</p>
          <p class="cap2-p19FeedbackText">${data.text}</p>
        `;
      }

      confirmBtn.disabled = true;
      resetBtn.hidden = false;

      const isLastQuestion = questionIndex === questions.length - 1;
      const allAnswered = questions.every((q) => {
        const btn = q.querySelector('[data-p19-action="reset"]');
        return btn && btn.hidden === false;
      });

      if(isLastQuestion && allAnswered){
        setTimeout(showDone, 300);
      }
    });

    resetBtn.addEventListener("click", resetQuestion);

    resetQuestion();
  });

  navPrev.addEventListener("click", () => {
    if(currentIndex > 0){
      showQuestion(currentIndex - 1);
    }
  });

  navNext.addEventListener("click", () => {
    if(currentIndex < questions.length - 1){
      showQuestion(currentIndex + 1);
    }
  });

  showQuestion(0);
})();