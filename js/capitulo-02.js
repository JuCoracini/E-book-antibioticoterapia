/* =========================
   CAPÍTULO 02 — JS GLOBAL
   ========================= */

/* =========================
   LIGHTBOX GLOBAL DO CAPÍTULO
   ========================= */

(function initCap2Lightbox(){
  const lightbox = document.getElementById("cap2Lightbox");
  const img = document.getElementById("cap2LightboxImage");
  const caption = document.getElementById("cap2LightboxCaption");

  if(!lightbox || !img || !caption) return;

  function open(src, alt, text){
    img.src = src || "";
    img.alt = alt || "";
    caption.textContent = text || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close(){
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    img.src = "";
    img.alt = "";
    caption.textContent = "";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function(e){
    const trigger = e.target.closest(".cap2-zoomTrigger");
    if(trigger){
      open(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
      return;
    }

    if(e.target.closest("[data-lightbox-close]")){
      close();
    }
  });

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && !lightbox.hidden){
      close();
    }
  });
})();

/* =========================
   PÁGINA 11 — ALVOS CELULARES
   ========================= */

(function initPage11Targets(){
  const root = document.querySelector(".cap2-page11");
  if(!root) return;

  const buttons = root.querySelectorAll("[data-target]");
  const feedback = root.querySelector("#targetFeedback");

  if(!buttons.length || !feedback) return;

  const map = {
    parede: "A perda da integridade estrutural leva à lise celular bacteriana.",
    ribossomo: "A interrupção da síntese proteica impede o crescimento e a multiplicação bacteriana.",
    dna: "A inibição da replicação e transcrição impede a propagação bacteriana.",
    folato: "A interrupção da síntese de nucleotídeos compromete o metabolismo celular.",
    membrana: "A desorganização da membrana leva à perda de viabilidade celular."
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      feedback.textContent = map[btn.dataset.target] || "";
    });
  });
})();

/* =========================
   PÁGINA 13 — PAREDE CELULAR
   ========================= */

(function initPage13Wall(){
  const root = document.querySelector("[data-cap2-wall]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-wall-tab]"));
  const image = document.getElementById("cap2P13Image");
  const caption = document.getElementById("cap2P13Caption");
  const title = document.getElementById("cap2P13Title");
  const body = document.getElementById("cap2P13Body");
  const zoomButton = root.querySelector(".cap2-zoomTrigger");

  if(!tabs.length || !image || !caption || !zoomButton || !title || !body) return;

  const states = {
    sintese: {
      src: "../../assets/capitulo-02/imagens/sintese-peptidoglicano.png",
      alt: "Etapas da síntese do peptidoglicano na parede celular bacteriana",
      caption: "Etapas da síntese do peptidoglicano na parede celular bacteriana. Clique na imagem para ampliar.",
      title: "Etapas da síntese do peptidoglicano",
      body: `
        <p>1) Formação dos precursores no citoplasma: unidades de NAG e NAM são sintetizadas e associadas a pequenas cadeias peptídicas, formando precursores solúveis.</p>
        <p>2) Transporte através da membrana citoplasmática: Os precursores são transportados para a face externa da membrana citoplasmática por meio de um carreador lipídico denominado bactoprenol.</p>
        <p>3) Incorporação à parede existente: As novas subunidades são adicionadas à rede de peptidoglicano por reações de transglicosilação, ampliando a estrutura da parede celular.</p>
        <p>4) Formação das ligações cruzadas: As PBPs catalisam a reação de transpeptidação, formando pontes entre cadeias peptídicas adjacentes. Essas ligações cruzadas conferem resistência mecânica à parede celular.</p>
      `
    },

    beta: {
      src: "../../assets/capitulo-02/imagens/beta-lactamicos-transpeptidacao.png",
      alt: "Interferência dos β-lactâmicos na etapa de transpeptidação do peptidoglicano",
      caption: "Interferência dos β-lactâmicos na etapa de transpeptidação do peptidoglicano. Clique na imagem para ampliar.",
      title: "β-lactâmicos",
      body: `
        <p>Os β-lactâmicos ligam-se às proteínas ligadoras de penicilina (PBPs), enzimas envolvidas nas etapas finais da síntese da parede celular bacteriana.</p>
        <p>Ao ocuparem esses alvos, impedem a reação de transpeptidação responsável pela formação das ligações cruzadas entre cadeias peptídicas adjacentes do peptidoglicano.</p>
        <p>Com isso, a parede celular recém-sintetizada perde resistência mecânica e torna-se progressivamente incapaz de sustentar a integridade estrutural da bactéria, favorecendo lise celular, especialmente durante fases de crescimento ativo <sup>2,4</sup>.</p>
      `
    },

    glico: {
      src: "../../assets/capitulo-02/imagens/glicopeptideos-dala-dala.png",
      alt: "Interferência dos glicopeptídeos na incorporação e ligação cruzada do peptidoglicano",
      caption: "Interferência dos glicopeptídeos na incorporação e ligação cruzada do peptidoglicano. Clique na imagem para ampliar.",
      title: "Glicopeptídeos",
      body: `
        <p>Os glicopeptídeos atuam por mecanismo distinto dos β-lactâmicos. Em vez de se ligarem às PBPs, ligam-se diretamente à extremidade terminal D-Ala-D-Ala dos precursores do peptidoglicano.</p>
        <p>Essa ligação cria impedimento estérico que dificulta a incorporação das novas subunidades à parede em formação e compromete também as etapas posteriores de ligação cruzada.</p>
        <p>Como consequência, a estrutura do peptidoglicano torna-se progressivamente instável, reduzindo a resistência da parede celular e favorecendo lise bacteriana em condições apropriadas <sup>1,2</sup>.</p>
      `
    }
  };

  function render(key){
    const state = states[key];
    if(!state) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.wallTab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    image.src = state.src;
    image.alt = state.alt;

    zoomButton.dataset.zoomImage = state.src;
    zoomButton.dataset.zoomAlt = state.alt;
    zoomButton.dataset.zoomCaption = state.caption;

    caption.textContent = state.caption;
    title.textContent = state.title;
    body.innerHTML = state.body;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      render(tab.dataset.wallTab);
    });
  });

  render("sintese");
})();

/* =========================
   PÁGINA 14 — MEMBRANA CITOPLASMÁTICA
   ========================= */

(function initPage14Membrane(){
  const root = document.querySelector("[data-cap2-membrane]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-membrane-drug]"));
  const image = document.getElementById("cap2P14Image");
  const caption = document.getElementById("cap2P14Caption");
  const zoomButton = root.querySelector(".cap2-zoomTrigger");
  const text = document.getElementById("cap2P14Text");
  const step = document.getElementById("cap2P14Step");
  const prev = document.getElementById("cap2P14Prev");
  const next = document.getElementById("cap2P14Next");

  if(!tabs.length || !image || !caption || !zoomButton || !text || !step || !prev || !next) return;

  const states = {
    membrana: [
      {
        src: "../../assets/capitulo-02/imagens/membrana-citoplasmatica.png",
        alt: "Estrutura da membrana citoplasmática bacteriana",
        caption: "Estrutura da membrana citoplasmática bacteriana. Clique para ampliar.",
        text: `
          <strong>Funções essenciais da membrana citoplasmática</strong><br><br>
          Manutenção do gradiente eletroquímico: a diferença de potencial entre os meios intra e extracelular é fundamental para processos de transporte e geração de energia.<br><br>
          Regulação do transporte de substâncias: as proteínas de membrana controlam a entrada de nutrientes e a saída de metabólitos.<br><br>
          Participação na produção de energia: componentes da cadeia respiratória bacteriana estão associados à membrana, permitindo a síntese de ATP.<br><br>
          Preservação da integridade estrutural: a membrana delimita o conteúdo citoplasmático e contribui para o equilíbrio osmótico da célula.
        `
      }
    ],

    polimixina: [
      {
        src: "../../assets/capitulo-02/imagens/polimixina-fase-1.png",
        alt: "Ligação inicial da polimixina ao envelope bacteriano",
        caption: "Ligação inicial da polimixina ao envelope bacteriano. Clique para ampliar.",
        text: "Polimixinas: ligam-se inicialmente ao lipid A do lipopolissacarídeo (LPS) da membrana externa de bactérias Gram-negativas, deslocando cátions divalentes estabilizadores e promovendo desorganização do envelope bacteriano, aumento da permeabilidade e colapso funcional da célula <sup>1</sup>."
      },
      {
        src: "../../assets/capitulo-02/imagens/polimixina-fase-2.png",
        alt: "Desorganização progressiva da membrana bacteriana após ação da polimixina",
        caption: "Desorganização progressiva da membrana bacteriana após ação da polimixina. Clique para ampliar.",
        text: "A desestabilização do envelope bacteriano aumenta a permeabilidade da membrana e favorece perda progressiva da função de barreira, comprometendo rapidamente a viabilidade celular."
      }
    ],

    daptomicina: [
      {
        src: "../../assets/capitulo-02/imagens/daptomicina-fase-1.png",
        alt: "Ligação inicial da daptomicina à membrana citoplasmática bacteriana",
        caption: "Ligação inicial da daptomicina à membrana citoplasmática bacteriana. Clique para ampliar.",
        text: "Daptomicina: em presença de cálcio, liga-se à membrana citoplasmática de bactérias Gram-positivas, promovendo despolarização e disfunção de processos essenciais associados à integridade da membrana e da superfície celular <sup>2</sup>."
      },
      {
        src: "../../assets/capitulo-02/imagens/daptomicina-fase-2.png",
        alt: "Despolarização da membrana bacteriana induzida pela daptomicina",
        caption: "Despolarização da membrana bacteriana induzida pela daptomicina. Clique para ampliar.",
        text: "A inserção do fármaco na membrana altera o potencial elétrico transmembrana e compromete o equilíbrio iônico necessário ao funcionamento celular."
      },
      {
        src: "../../assets/capitulo-02/imagens/daptomicina-fase-3.png",
        alt: "Colapso funcional da célula bacteriana após ação da daptomicina",
        caption: "Colapso funcional da célula bacteriana após ação da daptomicina. Clique para ampliar.",
        text: "A perda do equilíbrio eletroquímico compromete rapidamente funções essenciais da célula bacteriana, levando ao colapso funcional."
      }
    ]
  };

  let current = "membrana";
  let index = 0;

  function render(){
    const seq = states[current];
    const item = seq[index];
    if(!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.membraneDrug === current;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    image.src = item.src;
    image.alt = item.alt || "";

    zoomButton.dataset.zoomImage = item.src;
    zoomButton.dataset.zoomAlt = item.alt || "";
    zoomButton.dataset.zoomCaption = item.caption || "";

    caption.textContent = item.caption || "";
    text.innerHTML = item.text || "";

    if(seq.length > 1){
      step.textContent = `Etapa ${index + 1} de ${seq.length}`;
      prev.style.display = "inline-flex";
      next.style.display = "inline-flex";
      prev.disabled = index === 0;
      next.disabled = index === seq.length - 1;
    } else {
      step.textContent = "";
      prev.style.display = "none";
      next.style.display = "none";
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      current = tab.dataset.membraneDrug;
      index = 0;
      render();
    });
  });

  prev.addEventListener("click", () => {
    if(index > 0){
      index -= 1;
      render();
    }
  });

  next.addEventListener("click", () => {
    if(index < states[current].length - 1){
      index += 1;
      render();
    }
  });

  render();
})();
/* =========================
   PÁGINA 15 — SÍNTESE PROTEICA
   ========================= */

(function initPage15Protein(){
  const root = document.querySelector("[data-cap2-protein]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-protein-group]"));
  const image = document.getElementById("cap2P15Image");
  const caption = document.getElementById("cap2P15Caption");
  const zoomButton = root.querySelector(".cap2-zoomTrigger");
  const title = document.getElementById("cap2P15Title");
  const text = document.getElementById("cap2P15Text");
  const step = document.getElementById("cap2P15Step");
  const prev = document.getElementById("cap2P15Prev");
  const next = document.getElementById("cap2P15Next");

  if(!tabs.length || !image || !caption || !zoomButton || !title || !text || !step || !prev || !next) return;

  const states = {
    processo: [
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
    ],

    "30s": [
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
    ],

    "50s": [
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
  };

  let currentGroup = "processo";
  let currentIndex = 0;

  function render(){
    const sequence = states[currentGroup];
    const item = sequence[currentIndex];
    if(!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.proteinGroup === currentGroup;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    image.src = item.src;
    image.alt = item.alt || "";

    zoomButton.dataset.zoomImage = item.src;
    zoomButton.dataset.zoomAlt = item.alt || "";
    zoomButton.dataset.zoomCaption = item.caption || "";

    caption.textContent = item.caption || "";
    title.textContent = item.title || "";
    text.innerHTML = item.text || "";

    if(sequence.length > 1){
      step.textContent = `Etapa ${currentIndex + 1} de ${sequence.length}`;
      prev.style.display = "inline-flex";
      next.style.display = "inline-flex";
      prev.disabled = currentIndex === 0;
      next.disabled = currentIndex === sequence.length - 1;
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
  });

  prev.addEventListener("click", () => {
    if(currentIndex > 0){
      currentIndex -= 1;
      render();
    }
  });

  next.addEventListener("click", () => {
    if(currentIndex < states[currentGroup].length - 1){
      currentIndex += 1;
      render();
    }
  });

  render();
})();
/* =========================
   PÁGINA 16 — ÁCIDOS NUCLEICOS
   ========================= */

(function initPage16Nucleic(){
  const root = document.querySelector("[data-cap2-nucleic]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-nucleic-tab]"));
  const image = document.getElementById("cap2P16Image");
  const caption = document.getElementById("cap2P16Caption");
  const zoomButton = root.querySelector(".cap2-zoomTrigger");
  const title = document.getElementById("cap2P16Title");
  const text = document.getElementById("cap2P16Text");

  if(!tabs.length || !image || !caption || !zoomButton || !title || !text) return;

  const states = {
    processo: {
      src: "../../assets/capitulo-02/imagens/acidos-nucleicos-processo.png",
      alt: "Etapas gerais da replicação e transcrição do DNA bacteriano",
      caption: "Etapas gerais da replicação e transcrição do DNA bacteriano. Clique para ampliar.",
      title: "Processo geral",
      text: `
        <p>A replicação bacteriana depende da abertura da dupla hélice, do controle do superenovelamento e da síntese ordenada de novas fitas de DNA.</p>
        <p>Paralelamente, a transcrição converte a informação genética em RNA mensageiro por ação da RNA polimerase, tornando possível a síntese de proteínas necessárias ao funcionamento celular.</p>
      `
    },

    fluoroquinolonas: {
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

  function render(key){
    const state = states[key];
    if(!state) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.nucleicTab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    image.src = state.src;
    image.alt = state.alt || "";

    zoomButton.dataset.zoomImage = state.src;
    zoomButton.dataset.zoomAlt = state.alt || "";
    zoomButton.dataset.zoomCaption = state.caption || "";

    caption.textContent = state.caption || "";
    title.textContent = state.title || "";
    text.innerHTML = state.text || "";
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      render(tab.dataset.nucleicTab);
    });
  });

  render("processo");
})();
/* =========================
   PÁGINA 17 — METABOLISMO DO FOLATO
   ========================= */

(function initPage17Folato(){
  const root = document.querySelector("[data-folato]");
  if(!root) return;

  const image = document.getElementById("flowImg");
  const title = document.getElementById("flowTitle");
  const desc = document.getElementById("flowDesc");
  const step = document.getElementById("step");
  const caption = document.getElementById("flowCaption");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const zoomButton = root.querySelector(".cap2-zoomTrigger");

  if(!image || !title || !desc || !step || !caption || !prev || !next || !zoomButton) return;

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

  function render(){
    const state = states[currentIndex];
    if(!state) return;

    image.src = state.src;
    image.alt = state.alt || "";

    zoomButton.dataset.zoomImage = state.src;
    zoomButton.dataset.zoomAlt = state.alt || "";
    zoomButton.dataset.zoomCaption = state.caption || "";

    caption.textContent = state.caption || "";
    title.textContent = state.title || "";
    desc.innerHTML = state.text || "";
    step.textContent = `Etapa ${currentIndex + 1} de ${states.length}`;

    prev.disabled = currentIndex === 0;
    next.disabled = currentIndex === states.length - 1;
  }

  prev.addEventListener("click", () => {
    if(currentIndex > 0){
      currentIndex -= 1;
      render();
    }
  });

  next.addEventListener("click", () => {
    if(currentIndex < states.length - 1){
      currentIndex += 1;
      render();
    }
  });

  render();
})();
/* =========================
   PÁGINA 18 — BACTERICIDA VS BACTERIOSTÁTICO
   ========================= */

(function initPage18Response(){
  const root = document.querySelector("[data-cap2-response]");
  if(!root) return;

  const cards = Array.from(root.querySelectorAll("[data-response-card]"));
  const overlays = Array.from(root.querySelectorAll("[data-response-overlay]"));

  if(!cards.length || !overlays.length) return;

  function activate(key){
    cards.forEach((card) => {
      const active = card.dataset.responseCard === key;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", active ? "true" : "false");
    });

    overlays.forEach((overlay) => {
      const active = overlay.dataset.responseOverlay === key;
      overlay.classList.toggle("is-visible", active);
    });
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      activate(card.dataset.responseCard);
    });

    card.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        activate(card.dataset.responseCard);
      }
    });
  });

  activate("bacteriostatico");
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