document.addEventListener("DOMContentLoaded", function(){

  const triggers = document.querySelectorAll(".cap5-acc-trigger");

  triggers.forEach(trigger => {

    trigger.addEventListener("click", function(){

      const isActive = trigger.classList.contains("active");

      // fecha todos
      document.querySelectorAll(".cap5-acc-trigger").forEach(t=>t.classList.remove("active"));
      document.querySelectorAll(".cap5-acc-content").forEach(c=>c.classList.remove("active"));

      // abre atual
      if(!isActive){
        trigger.classList.add("active");
        trigger.nextElementSibling.classList.add("active");
      }

    });

  });

});
/* ===== INTERAÇÃO ESTRUTURA DO LAUDO ===== */

document.addEventListener("DOMContentLoaded", function(){

  const steps = document.querySelectorAll(".cap5-step");
  const panels = document.querySelectorAll(".cap5-panel");

  steps.forEach(step => {
    step.addEventListener("click", () => {

      const target = step.dataset.step;

      steps.forEach(s => s.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      step.classList.add("active");
      document.querySelector(`.cap5-panel[data-panel="${target}"]`).classList.add("active");

    });
  });

});
/* =========================
   Página 40 — Bacterioscopia e coloração de Gram
   ========================= */
(function initCap5Page40() {
  const root = document.querySelector(".cap5-page40");
  if (!root) return;

  const triggers = Array.from(root.querySelectorAll(".cap5-zoomTrigger"));
  const lightbox = document.getElementById("cap5Lightbox");
  const lightboxImage = document.getElementById("cap5LightboxImage");
  const lightboxCaption = document.getElementById("cap5LightboxCaption");
  const closers = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]")) : [];

  if (!triggers.length || !lightbox || !lightboxImage || !lightboxCaption) return;

  let zoomReady = false;

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  function openLightbox(src, alt, caption) {
    if (!zoomReady) return;

    lightboxImage.src = src || "";
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  /* garante estado fechado ao entrar */
  closeLightbox();

  /* evita abertura indevida logo após navegar da página anterior */
  window.setTimeout(() => {
    zoomReady = true;
  }, 450);

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      if (!zoomReady) return;
      if (!event.isTrusted) return;

      event.preventDefault();
      event.stopPropagation();

      openLightbox(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
    });
  });

  closers.forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeLightbox();
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });

  window.addEventListener("pageshow", () => {
    closeLightbox();
    zoomReady = false;
    window.setTimeout(() => {
      zoomReady = true;
    }, 450);
  });
})();
(function initCap5Page41() {
  const root = document.querySelector(".cap5-page41");
  if (!root) return;

  const zoomBtn = document.getElementById("gram-stage-zoom");
  const imageEl = document.getElementById("gram-stage-image");
  const pillEl = document.getElementById("gram-stage-pill");
  const titleEl = document.getElementById("gram-stage-title");
  const textEl = document.getElementById("gram-stage-text");
  const prevBtn = document.getElementById("gram-prev");
  const nextBtn = document.getElementById("gram-next");
  const steps = Array.from(root.querySelectorAll(".gram-step"));

  if (
    !zoomBtn || !imageEl || !pillEl || !titleEl || !textEl ||
    !prevBtn || !nextBtn || !steps.length
  ) {
    return;
  }

  const stepData = [
    {
      key: "fixacao",
      image: "../../assets/capitulo-05/imagens/fixacao.png",
      alt: "Etapa de fixação na coloração de Gram",
      pill: "Etapa preparatória",
      title: "Fixação",
      text: "Inicialmente, o material é distribuído em uma lâmina de vidro e fixado, geralmente por calor, para preservar a morfologia bacteriana e promover aderência celular. Nesta etapa inicial, ainda não há diferenciação entre bactérias Gram-positivas e Gram-negativas, mas a amostra fica preparada para receber os reagentes seguintes."
    },
    {
      key: "cristal",
      image: "../../assets/capitulo-05/imagens/cristal-violeta.png",
      alt: "Etapa do cristal violeta na coloração de Gram",
      pill: "Corante primário",
      title: "Cristal violeta",
      text: "Em seguida, aplica-se o corante primário (cristal violeta), que penetra nas células bacterianas. Após sua aplicação, ambas as bactérias adquirem coloração violácea. Neste momento, ainda não ocorreu a diferenciação estrutural observada ao final do método."
    },
    {
      key: "lugol",
      image: "../../assets/capitulo-05/imagens/lugol.png",
      alt: "Etapa do lugol na coloração de Gram",
      pill: "Mordente",
      title: "Lugol",
      text: "A adição do lugol atua como mordente, formando um complexo cristal violeta–iodo no interior da célula. Nesta etapa, o complexo torna-se mais estável dentro da bactéria, preparando a diferenciação que será evidenciada na descoloração."
    },
    {
      key: "alcool",
      image: "../../assets/capitulo-05/imagens/alcool-acetona.png",
      alt: "Etapa do álcool ou álcool-acetona na coloração de Gram",
      pill: "Etapa crítica",
      title: "Álcool/acetona",
      text: "A etapa crítica do método é a descoloração com álcool ou álcool-acetona. Bactérias com parede celular espessa, rica em peptidoglicano, mantêm o complexo cristal violeta–iodo. Bactérias com parede mais delgada e membrana externa perdem esse complexo durante a descoloração."
    },
    {
      key: "safranina",
      image: "../../assets/capitulo-05/imagens/safranina.png",
      alt: "Etapa da safranina na coloração de Gram",
      pill: "Contra-corante",
      title: "Safranina",
      text: "As bactérias que perderam o complexo durante a descoloração passam a ser coradas pelo contra-corante, geralmente safranina, adquirindo coloração rosada característica. Ao final do método, as Gram-positivas permanecem azul-violáceas e as Gram-negativas adquirem coloração rosada."
    }
  ];

  let currentIndex = 0;

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

    imageEl.classList.add("is-switching");

    window.setTimeout(() => {
      imageEl.src = item.image;
      imageEl.alt = item.alt || "";
      pillEl.textContent = item.pill;
      titleEl.textContent = item.title;
      textEl.textContent = item.text;

      zoomBtn.setAttribute("data-zoom", item.image);
      zoomBtn.setAttribute("aria-label", `Ampliar imagem da etapa ${item.title}`);

      imageEl.classList.remove("is-switching");
    }, 120);

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
   Página 42 — Identificação bacteriana
   ========================= */
(function initCap5Page42() {
  const root = document.querySelector(".cap5-page42");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap5-p42-chip"));
  const eyebrow = root.querySelector("#cap5-p42-panel-eyebrow");
  const title = root.querySelector("#cap5-p42-panel-title");
  const text = root.querySelector("#cap5-p42-panel-text");

  if (!tabs.length || !eyebrow || !title || !text) return;

  const map = {
    morfologia: {
      eyebrow: "Traço estrutural inicial",
      title: "Morfologia da colônia",
      text: "O tamanho, o contorno das bordas, a superfície, a elevação e a consistência da colônia podem sugerir padrões característicos de determinados grupos bacterianos e orientar a continuidade da investigação."
    },
    hemolise: {
      eyebrow: "Interação com o meio",
      title: "Padrão de hemólise",
      text: "Em ágar sangue, a presença ou ausência de hemólise e a forma como ela se distribui ao redor da colônia ajudam a reconhecer comportamentos biológicos iniciais relevantes para a suspeita microbiológica."
    },
    pigmentacao: {
      eyebrow: "Expressão fenotípica visível",
      title: "Pigmentação",
      text: "A cor produzida pela colônia ou difundida no meio pode funcionar como pista fenotípica adicional, especialmente quando aparece de forma consistente em determinados grupos bacterianos."
    },
    odor: {
      eyebrow: "Pista fenotípica complementar",
      title: "Odor característico",
      text: "Embora não seja um critério isolado de identificação, o odor pode atuar como indício complementar na rotina laboratorial, somando-se às demais características observadas no crescimento."
    }
  };

  function activate(key) {
    const item = map[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p42View === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.p42View));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p42View);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p42View);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p42View);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p42View);
      }
    });
  });

  activate("morfologia");
})();
/* =========================
   Página 43 — Identificação bacteriana
   ========================= */
(function initCap5Page43(){
  const root = document.querySelector(".cap5-page43");
  if(!root) return;

  const steps = root.querySelectorAll(".cap5-p43-step");
  const eyebrow = root.querySelector(".cap5-p43-eyebrow");
  const title = root.querySelector(".cap5-p43-title");
  const text = root.querySelector(".cap5-p43-text");

  const map = {
    "1":{
      eyebrow:"Ponto de partida",
      title:"Definição do agente",
      text:"A identificação define o microrganismo isolado e estabelece o nível de precisão microbiológica disponível. Esse dado inicial orienta a interpretação dos resultados subsequentes."
    },
    "2":{
      eyebrow:"Base biológica",
      title:"Contexto da espécie",
      text:"A espécie identificada determina padrões esperados de comportamento microbiológico, incluindo perfis característicos de suscetibilidade e resistência."
    },
    "3":{
      eyebrow:"Integração clínica",
      title:"Leitura do antibiograma",
      text:"O antibiograma passa a ser interpretado dentro do contexto da espécie. O resultado deixa de ser uma lista isolada e passa a ter significado clínico estruturado."
    }
  };

  steps.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      steps.forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const data = map[btn.dataset.step];
      eyebrow.textContent = data.eyebrow;
      title.textContent = data.title;
      text.textContent = data.text;
    });
  });

})();
/* =========================
   Página 44 — Difusão em disco
   ========================= */
(function initCap5Page44() {
  const root = document.querySelector(".cap5-page44");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll(".tempo-btn"));
  const img = root.querySelector("#tempo-img");
  const caption = root.querySelector("#tempo-caption");
  const zoomBtn = root.querySelector(".cap5-p44-figure__zoom");

  if (!buttons.length || !img || !caption || !zoomBtn) return;

  const data = {
    "0": {
      src: "../../assets/capitulo-05/imagens/difusao-disco-0h.png",
      alt: "Placa de difusão em disco no tempo inicial.",
      text: "Tempo inicial: o antibacteriano ainda não se difundiu de forma significativa no meio."
    },
    "6": {
      src: "../../assets/capitulo-05/imagens/difusao-disco-6h.png",
      alt: "Placa de difusão em disco após 6 horas.",
      text: "Após algumas horas, o antibacteriano começa a difundir-se no ágar e o gradiente de concentração se inicia."
    },
    "12": {
      src: "../../assets/capitulo-05/imagens/difusao-disco-12h.png",
      alt: "Placa de difusão em disco após 12 horas.",
      text: "Com a progressão da incubação, o gradiente se torna mais evidente e a distribuição do antibacteriano no meio se amplia."
    },
    "18": {
      src: "../../assets/capitulo-05/imagens/difusao-disco-18h.png",
      alt: "Placa de difusão em disco após 18 horas.",
      text: "A diferença entre áreas de maior e menor concentração se acentua, aproximando a formação da zona de inibição."
    },
    "24": {
      src: "../../assets/capitulo-05/imagens/difusao-disco-24h.png",
      alt: "Placa de difusão em disco após 24 horas com halo de inibição.",
      text: "Ao final da incubação, observa-se o halo de inibição ao redor do disco, que poderá ser medido em milímetros."
    }
  };

  function activate(time) {
    const item = data[time];
    if (!item) return;

    buttons.forEach((btn) => {
      const active = btn.dataset.tempo === time;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
      btn.tabIndex = active ? 0 : -1;
    });

    img.src = item.src;
    img.alt = item.alt;
    caption.textContent = item.text;
    zoomBtn.setAttribute("data-zoom", item.src);
    zoomBtn.setAttribute("aria-label", `Ampliar imagem da difusão em disco em ${time}`);
  }

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => activate(btn.dataset.tempo));

    btn.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % buttons.length;
        buttons[nextIndex].focus();
        activate(buttons[nextIndex].dataset.tempo);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + buttons.length) % buttons.length;
        buttons[nextIndex].focus();
        activate(buttons[nextIndex].dataset.tempo);
      }

      if (event.key === "Home") {
        event.preventDefault();
        buttons[0].focus();
        activate(buttons[0].dataset.tempo);
      }

      if (event.key === "End") {
        event.preventDefault();
        buttons[buttons.length - 1].focus();
        activate(buttons[buttons.length - 1].dataset.tempo);
      }
    });
  });

  activate("0");
})();
/* =========================
   Página 45 — CIM + padronização
   ========================= */
/* =========================
   Página 45 — Microdiluição e CIM
   ========================= */
(function initCap5Page45() {
  const root = document.querySelector(".cap5-page45");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap5-p45-cim__tab"));
  const img = root.querySelector("#cap5-p45-cim-image");
  const caption = root.querySelector("#cap5-p45-cim-caption");
  const eyebrow = root.querySelector("#cap5-p45-cim-eyebrow");
  const title = root.querySelector("#cap5-p45-cim-panel-title");
  const text = root.querySelector("#cap5-p45-cim-panel-text");
  const zoomBtn = root.querySelector(".cap5-p45-cim__zoom");

  if (!tabs.length || !img || !caption || !eyebrow || !title || !text || !zoomBtn) return;

  const views = {
    crescimento: {
      src: "../../assets/capitulo-05/imagens/cim-crescimento.png",
      alt: "Sequência de poços com crescimento visível em diferentes concentrações.",
      caption: "Nas menores concentrações ainda há crescimento visível nos poços, indicando que a bactéria segue se multiplicando nas condições do ensaio.",
      eyebrow: "Leitura inicial",
      title: "Crescimento visível",
      text: "Enquanto há turvação ou crescimento detectável nos poços, a concentração testada ainda não corresponde ao ponto de inibição visível considerado para a determinação da CIM."
    },
    inibicao: {
      src: "../../assets/capitulo-05/imagens/cim-inibicao.png",
      alt: "Sequência de poços sem crescimento visível em concentrações mais altas.",
      caption: "A transição para ausência de crescimento visível indica o ponto em que se identifica a menor concentração capaz de impedir esse crescimento nas condições do ensaio.",
      eyebrow: "Ponto interpretativo",
      title: "Inibição do crescimento",
      text: "A CIM corresponde à menor concentração em que o crescimento visível deixa de ocorrer. O critério do ensaio é a inibição observável nessas condições laboratoriais, e não necessariamente morte bacteriana completa."
    }
  };

  function activate(key) {
    const item = views[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.cimView === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    img.src = item.src;
    img.alt = item.alt;
    caption.textContent = item.caption;
    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;

    zoomBtn.setAttribute("data-zoom", item.src);
    zoomBtn.setAttribute("aria-label", `Ampliar imagem de ${item.title.toLowerCase()}`);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.cimView));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.cimView);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.cimView);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.cimView);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.cimView);
      }
    });
  });

  activate("crescimento");
})();
/* =========================
   Página 46 — Breakpoints e categorias interpretativas
   ========================= */
(function initCap5Page46() {
  const root = document.querySelector(".cap5-page46");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap5-p46-bar__tab"));
  const pill = root.querySelector("#cap5-p46-panel-pill");
  const title = root.querySelector("#cap5-p46-panel-title");
  const text = root.querySelector("#cap5-p46-panel-text");

  if (!tabs.length || !pill || !title || !text) return;

  const map = {
    s: {
      pillText: "Categoria padrão",
      pillClass: "cap5-p46-panel__pill cap5-p46-panel__pill--s",
      title: "Sensível (S)",
      text: "Indica que o valor obtido no teste está dentro da faixa associada a alta probabilidade de sucesso terapêutico quando o antibacteriano é utilizado em regimes posológicos padrão e quando a exposição no sítio de infecção é adequada."
    },
    i: {
      pillText: "Aumentando exposição",
      pillClass: "cap5-p46-panel__pill cap5-p46-panel__pill--i",
      title: "Sensível, aumentando exposição (I)",
      text: "Indica que a probabilidade de sucesso terapêutico é mantida desde que a exposição ao antibacteriano seja aumentada. Isso pode ser alcançado por otimização do regime posológico, como ajuste de dose, intervalo ou via de administração, ou em situações nas quais o fármaco atinge concentrações mais elevadas no sítio de infecção."
    },
    r: {
      pillText: "Baixa probabilidade",
      pillClass: "cap5-p46-panel__pill cap5-p46-panel__pill--r",
      title: "Resistente (R)",
      text: "Indica que o valor obtido no teste está associado a baixa probabilidade de sucesso terapêutico, mesmo quando se considera aumento de exposição ao antibacteriano."
    }
  };

  function activate(key) {
    const item = map[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p46Tab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    pill.className = item.pillClass;
    pill.textContent = item.pillText;
    title.textContent = item.title;
    text.textContent = item.text;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.p46Tab));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p46Tab);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p46Tab);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p46Tab);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p46Tab);
      }
    });
  });

  activate("s");
})();
/* =========================
   Página 47 — ESBL
   ========================= */
(function initCap5Page47() {
  const root = document.querySelector(".cap5-page47");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap5-p47-esbl__tab"));
  const eyebrow = root.querySelector("#cap5-p47-eyebrow");
  const title = root.querySelector("#cap5-p47-title");
  const text = root.querySelector("#cap5-p47-text");
  const note = root.querySelector("#cap5-p47-note");
  const image = root.querySelector("#cap5-p47-image");
  const caption = root.querySelector("#cap5-p47-caption");
  const zoomBtn = root.querySelector("#cap5-p47-zoom");

  if (!tabs.length || !eyebrow || !title || !text || !note || !image || !caption || !zoomBtn) return;

  const map = {
    mecanismo: {
      eyebrow: "Mecanismo reconhecido pelo laboratório",
      title: "ESBL detectada",
      text: "A identificação de ESBL no laudo indica que o laboratório reconheceu um mecanismo capaz de interferir na atividade de diversos β-lactâmicos. A interpretação do painel não deve ser feita de forma isolada, porque parte dos resultados já está condicionada por esse achado.",
      note: "Quando o mecanismo é identificado, o laudo deixa de ser apenas descritivo e passa a orientar a interpretação clínica.",
      image: "../../assets/capitulo-05/imagens/esbl-mecanismo.png",
      alt: "Esquema ilustrativo do mecanismo de produção de ESBL.",
      caption: "ESBL. A presença do mecanismo modifica a leitura de parte dos β-lactâmicos no antibiograma."
    },
    laudo: {
      eyebrow: "Interpretação orientada pelo achado",
      title: "Leitura do laudo microbiológico",
      text: "Na presença de ESBL, o resultado deixa de ser apenas uma lista de categorias de suscetibilidade e passa a exigir leitura integrada do mecanismo descrito pelo laboratório. O clínico precisa compreender que esse achado interfere no significado de parte do painel de β-lactâmicos.",
      note: "Aqui, o laudo já oferece um alerta explícito. O passo seguinte não é apenas ver o S, I ou R, mas entender como o mecanismo modifica a interpretação.",
      image: "../../assets/capitulo-05/imagens/esbl-teste-confirmatorio.png",
      alt: "Imagem ilustrativa relacionada à detecção de ESBL.",
      caption: "O achado de ESBL no laudo orienta a interpretação de parte do painel de β-lactâmicos."
    }
  };

  function activate(key) {
    const item = map[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p47Step === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
    note.textContent = item.note;
    image.src = item.image;
    image.alt = item.alt;
    caption.textContent = item.caption;
    zoomBtn.setAttribute("data-zoom", item.image);
    zoomBtn.setAttribute("aria-label", `Ampliar imagem de ${item.title.toLowerCase()}`);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.p47Step));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p47Step);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p47Step);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p47Step);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p47Step);
      }
    });
  });

  activate("mecanismo");
})();
/* =========================
   Página 48 — Grupo CESP e carbapenemases
   ========================= */
(function initCap5Page48() {
  const root = document.querySelector(".cap5-page48");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap5-p48-compare__tab"));
  const cards = Array.from(root.querySelectorAll(".cap5-p48-card"));
  const eyebrow = root.querySelector("#cap5-p48-eyebrow");
  const title = root.querySelector("#cap5-p48-title");
  const text = root.querySelector("#cap5-p48-text");
  const note = root.querySelector("#cap5-p48-note");

  if (!tabs.length || !cards.length || !eyebrow || !title || !text || !note) return;

  const map = {
    cesp: {
      eyebrow: "Risco interpretativo dependente da espécie",
      title: "Grupo CESP e possibilidade de AmpC induzível",
      text: "Em espécies do grupo CESP, a simples identificação bacteriana já informa a possibilidade de produção de AmpC. Nesses casos, um resultado aparentemente favorável no antibiograma não deve ser lido de forma ingênua, porque a exposição a alguns β-lactâmicos pode induzir expressão enzimática durante o tratamento e comprometer a atividade do fármaco.",
      note: "O ponto central não é apenas se o halo parece adequado, mas se a espécie identificada permite confiar nessa leitura sem considerar o risco de indução."
    },
    carbapenemase: {
      eyebrow: "Resistência de grande impacto",
      title: "Carbapenemases e perda ampla de atividade",
      text: "Nas carbapenemases, o laboratório reconhece enzimas capazes de hidrolisar carbapenêmicos. Nesse cenário, o padrão de resistência observado já sinaliza comprometimento mais amplo da atividade desses antibacterianos e exige leitura cuidadosa do painel, com relevância clínica e epidemiológica importante.",
      note: "Aqui, o problema não é uma falsa impressão inicial de segurança, mas a presença de um mecanismo que já indica perda importante de atividade e limitação terapêutica."
    }
  };

  function activate(key) {
    const item = map[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p48Step === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    cards.forEach((card) => {
      card.classList.toggle("is-active", card.dataset.p48Card === key);
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
    note.textContent = item.note;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.p48Step));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p48Step);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p48Step);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p48Step);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p48Step);
      }
    });
  });

  activate("cesp");
})();
/* =========================
   Página 49 — MRSA, VRE, MLSB induzível e HLAR
   ========================= */
(function initCap5Page49() {
  const root = document.querySelector(".cap5-page49");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap5-p49-compare__tab"));
  const eyebrow = root.querySelector("#cap5-p49-eyebrow");
  const title = root.querySelector("#cap5-p49-title");
  const text = root.querySelector("#cap5-p49-text");
  const note = root.querySelector("#cap5-p49-note");
  const image = root.querySelector("#cap5-p49-image");
  const caption = root.querySelector("#cap5-p49-caption");
  const zoomBtn = root.querySelector("#cap5-p49-zoom");

  if (!tabs.length || !eyebrow || !title || !text || !note || !image || !caption || !zoomBtn) return;

  const map = {
    mrsa: {
      eyebrow: "Alteração do alvo dos β-lactâmicos",
      title: "MRSA",
      text: "No MRSA, a modificação das proteínas ligadoras de penicilina altera o significado do painel de β-lactâmicos. A leitura do laudo não deve se limitar ao resultado isolado desses antibacterianos.",
      note: "A presença desse mecanismo torna inadequada a interpretação isolada de parte dos β-lactâmicos.",
      image: "../../assets/capitulo-05/imagens/mrsa-orsa-disco.png",
      alt: "Imagem ilustrativa relacionada ao fenótipo MRSA.",
      caption: "MRSA. A alteração do alvo modifica a interpretação dos β-lactâmicos."
    },
    vre: {
      eyebrow: "Alteração do alvo dos glicopeptídeos",
      title: "VRE",
      text: "Nos enterococos resistentes à vancomicina ocorre modificação do alvo molecular do glicopeptídeo. O resultado deixa de ser apenas um dado isolado de suscetibilidade e passa a indicar redução da atividade da vancomicina, com implicações clínicas e epidemiológicas relevantes.",
      note: "Aqui, o laudo não informa apenas resistência a um fármaco, mas um fenótipo que interfere no manejo clínico e no controle de infecção.",
      image: "../../assets/capitulo-05/imagens/vre-disco.png",
      alt: "Imagem ilustrativa relacionada ao fenótipo VRE.",
      caption: "VRE. A modificação do alvo reduz a atividade da vancomicina."
    },
    mlsb: {
      eyebrow: "Fenótipo induzível de resistência",
      title: "MLSB induzível",
      text: "No fenótipo MLSB induzível, a resistência pode não estar plenamente evidente na leitura inicial do teste. Nesses casos, o resultado aparentemente favorável para clindamicina não deve ser interpretado de forma ingênua, porque a resistência pode se manifestar durante o uso clínico do antibacteriano.",
      note: "O ponto central não é apenas o valor inicial do teste, mas a possibilidade de falha terapêutica mesmo quando a leitura inicial sugere suscetibilidade.",
      image: "../../assets/capitulo-05/imagens/mlsb-induzivel-disco.png",
      alt: "Imagem ilustrativa relacionada ao fenótipo MLSB induzível.",
      caption: "MLSB induzível. A resistência pode emergir durante o tratamento com clindamicina."
    }
  };

  function activate(key) {
    const item = map[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p49Step === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
    note.textContent = item.note;
    image.src = item.image;
    image.alt = item.alt;
    caption.textContent = item.caption;
    zoomBtn.setAttribute("data-zoom", item.image);
    zoomBtn.setAttribute("aria-label", `Ampliar imagem relacionada a ${item.title}`);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.p49Step));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p49Step);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p49Step);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p49Step);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p49Step);
      }
    });
  });

  activate("mrsa");
})();
/* =========================
   Página 50 — Como ler o antibiograma de forma estruturada
   ========================= */
(function initCap5Page50() {
  const root = document.querySelector(".cap5-page50");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap5-p50-journey__step"));
  const eyebrow = root.querySelector("#cap5-p50-eyebrow");
  const title = root.querySelector("#cap5-p50-title");
  const text = root.querySelector("#cap5-p50-text");

  if (!tabs.length || !eyebrow || !title || !text) return;

  const map = {
    "1": {
      eyebrow: "Primeiro contexto interpretativo",
      title: "1. Identificar o microrganismo isolado",
      html: `
        <p>
          A espécie bacteriana fornece o primeiro contexto interpretativo do resultado. Diferentes bactérias apresentam perfis característicos de suscetibilidade e resistência, incluindo mecanismos de resistência intrínseca <sup>2,10</sup>.
        </p>
        <p>
          A identificação do microrganismo também ajuda a avaliar a plausibilidade clínica do isolamento. Nem todo microrganismo detectado em cultura representa necessariamente o agente responsável pela infecção.
        </p>
      `
    },
    "2": {
      eyebrow: "Valor clínico do isolamento",
      title: "2. Considerar a origem da amostra",
      html: `
        <p>
          O significado clínico do isolamento depende do sítio de onde a amostra foi obtida. A presença de uma bactéria em hemocultura possui implicações diferentes da detecção do mesmo microrganismo em secreções respiratórias ou em material de superfície.
        </p>
        <p>
          Por exemplo, o isolamento de Staphylococcus aureus em hemocultura geralmente tem alto valor clínico e sugere infecção verdadeira, enquanto a detecção de estafilococos coagulase-negativos em uma única amostra pode representar contaminação da coleta, dependendo do contexto clínico.
        </p>
        <p>
          A interpretação do antibiograma deve, portanto, ser contextualizada com a possibilidade de colonização, contaminação da amostra ou infecção verdadeira <sup>1,2</sup>.
        </p>
      `
    },
    "3": {
      eyebrow: "Informações que alteram a leitura do painel",
      title: "3. Verificar observações laboratoriais",
      html: `
        <p>
          O laudo pode incluir informações adicionais relacionadas a mecanismos específicos de resistência. Observações como produção de β-lactamases de espectro estendido (ESBL), presença de carbapenemases (como KPC, NDM, VIM ou OXA), identificação de Staphylococcus aureus resistente à meticilina (MRSA) ou enterococos resistentes à vancomicina (VRE) modificam a interpretação do painel de antibacterianos <sup>10,12,14,15</sup>.
        </p>
        <p>
          Essas informações representam características biológicas relevantes do microrganismo e devem ser consideradas antes da análise das categorias de suscetibilidade.
        </p>
      `
    },
    "4": {
      eyebrow: "Só depois do contexto microbiológico",
      title: "4. Analisar as categorias de suscetibilidade",
      html: `
        <p>
          Somente após compreender o contexto microbiológico do laudo faz sentido avaliar as categorias interpretativas apresentadas no antibiograma.
        </p>
        <p>
          A classificação nas categorias Sensível (S), Sensível, aumentando exposição (I) e Resistente (R) resulta da aplicação de critérios técnicos sobre o valor obtido no teste de suscetibilidade. Essas categorias indicam a probabilidade microbiológica de inibição bacteriana nas condições consideradas pelos parâmetros farmacológicos utilizados para definir os breakpoints <sup>10,12,13</sup>.
        </p>
        <p>
          Quando disponível, o valor da concentração inibitória mínima pode fornecer informação adicional, especialmente quando se encontra próximo aos pontos de corte estabelecidos.
        </p>
      `
    },
    "5": {
      eyebrow: "Decisão terapêutica real",
      title: "5. Integrar o resultado ao contexto clínico",
      html: `
        <p>
          O antibiograma informa o comportamento da bactéria no ambiente laboratorial. A decisão terapêutica depende da integração desse dado com fatores clínicos, como o foco infeccioso, a penetração do antibacteriano no tecido afetado, a presença de biofilme e as características farmacocinéticas do paciente <sup>6,7,8</sup>.
        </p>
      `
    }
  };

  function activate(key) {
    const item = map[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p50Step === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.innerHTML = item.html;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.p50Step));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p50Step);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p50Step);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p50Step);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p50Step);
      }
    });
  });

  activate("1");
})();
/* =========================
   Página 51 — Erros frequentes e limites da interpretação do antibiograma
   ========================= */
(function initCap5Page51() {
  const root = document.querySelector(".cap5-page51");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap5-p51-map__tab"));
  const eyebrow = root.querySelector("#cap5-p51-eyebrow");
  const title = root.querySelector("#cap5-p51-title");
  const body = root.querySelector("#cap5-p51-body");
  const note = root.querySelector("#cap5-p51-note");

  if (!tabs.length || !eyebrow || !title || !body || !note) return;

  const map = {
    "1": {
      eyebrow: "Erro frequente de leitura",
      title: "Supor que o antibiograma estabelece uma hierarquia entre antibacterianos",
      html: `
        <p>
          Um equívoco frequente é assumir que o antibiograma estabelece uma hierarquia entre antibacterianos ou que determinados agentes seriam “mais eficazes” por apresentarem resultados favoráveis no teste. Na prática, cada antibacteriano é avaliado individualmente, e as categorias interpretativas indicam probabilidade de inibição bacteriana sob condições específicas de exposição, não permitindo comparações diretas de superioridade entre diferentes fármacos <sup>1,8</sup>.
        </p>
      `,
      note: "O laudo informa comportamento microbiológico padronizado, não um ranking terapêutico entre fármacos."
    },

    "2": {
      eyebrow: "Erro frequente de leitura",
      title: "Interpretar a categoria I como sinônimo de ineficácia",
      html: `
        <p>
          Outro erro comum é interpretar a categoria I (sensível, aumentando exposição) como sinônimo de ineficácia. Essa classificação indica que a probabilidade de sucesso terapêutico depende de maior exposição ao fármaco, a qual pode ser alcançada por ajuste posológico, modificação da forma de administração ou por características do sítio de infecção <sup>8,10,12</sup>.
        </p>
      `,
      note: "Categoria I não significa falha inevitável; ela exige leitura farmacológica e posológica adequada."
    },

    "3": {
      eyebrow: "Erro frequente de leitura",
      title: "Ler a concentração inibitória mínima de forma isolada",
      html: `
        <p>
          A leitura isolada da concentração inibitória mínima também pode gerar interpretações equivocadas. Diferenças pequenas entre valores próximos ao breakpoint não necessariamente correspondem a diferenças clinicamente relevantes. A CIM deve ser interpretada dentro do contexto dos critérios utilizados para definir as categorias de suscetibilidade <sup>2,13</sup>.
        </p>
      `,
      note: "O valor numérico da CIM só ganha significado real quando lido à luz dos breakpoints e da categoria interpretativa."
    },

    "4": {
      eyebrow: "Erro frequente de leitura",
      title: "Ignorar observações laboratoriais relacionadas a mecanismos de resistência",
      html: `
        <p>
          Também é frequente ignorar observações laboratoriais relacionadas a mecanismos de resistência. Informações como produção de β-lactamases de espectro estendido (ESBL), presença de carbapenemases, identificação de MRSA ou resistência de alto nível a aminoglicosídeos modificam o significado do painel de suscetibilidade. Nesses casos, a interpretação não deve considerar cada antibacteriano de forma isolada, mas o conjunto do perfil microbiológico <sup>10,14,15</sup>.
        </p>
      `,
      note: "Quando há mecanismo de resistência identificado, o significado do painel muda e deixa de poder ser lido antibacteriano por antibacteriano."
    },

    "5": {
      eyebrow: "Erro frequente de leitura",
      title: "Pressupor que todos os antibacterianos relevantes deveriam aparecer no painel",
      html: `
        <p>
          Outro ponto importante é compreender que nem todos os antibacterianos disponíveis aparecem no antibiograma. A ausência de determinadas drogas no painel pode refletir diferentes fatores, como resistência intrínseca da espécie, ausência de breakpoints validados para aquela combinação microrganismo–fármaco ou limitações metodológicas do teste utilizado. Por exemplo, cefalosporinas não são testadas para <em>Enterococcus</em> spp., pois essa bactéria apresenta resistência intrínseca a essa classe <sup>10,11</sup>.
        </p>
      `,
      note: "Ausência no painel não significa esquecimento do laboratório; muitas vezes ela já é, por si mesma, uma informação interpretativa."
    },

    "6": {
      eyebrow: "Limite fundamental do teste",
      title: "Confundir estimativa microbiológica in vitro com decisão terapêutica completa",
      html: `
        <p>
          Além disso, o antibiograma avalia o comportamento da bactéria em ambiente laboratorial controlado. O teste não incorpora variáveis clínicas relevantes, como penetração tecidual do antibacteriano, presença de biofilme, carga bacteriana elevada ou alterações farmacocinéticas do hospedeiro <sup>6–8</sup>.
        </p>
      `,
      note: "O antibiograma informa o que ocorre no ensaio microbiológico padronizado; a decisão clínica depende de integrar esse dado ao foco infeccioso e às condições do paciente."
    }
  };

  function activate(key) {
    const item = map[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p51Step === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    body.innerHTML = item.html;
    note.textContent = item.note;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.p51Step));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p51Step);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p51Step);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p51Step);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p51Step);
      }
    });
  });

  activate("1");
})();
/* =========================
   Página 52 — Integração das informações do antibiograma
   ========================= */
(function initCap5Page52() {
  const root = document.querySelector(".cap5-page52");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap5-p52-guide__tab"));
  const eyebrow = root.querySelector("#cap5-p52-eyebrow");
  const title = root.querySelector("#cap5-p52-title");
  const text = root.querySelector("#cap5-p52-text");
  const report = root.querySelector("#cap5-p52-report");

  if (!tabs.length || !eyebrow || !title || !text || !report) return;

  const focusables = Array.from(root.querySelectorAll("[data-p52-target]"));

  const map = {
    "1": {
      eyebrow: "Ponto de partida",
      title: "Identificação da espécie",
      html: `
        <p>
          A interpretação do resultado começa pela identificação da espécie bacteriana. <em>Escherichia coli</em> é um agente frequentemente associado a infecções do trato urinário, o que torna o isolamento plausível no contexto clínico dessa amostra.
        </p>
      `,
      focus: ["organism"]
    },
    "2": {
      eyebrow: "Contexto da coleta",
      title: "Origem da amostra",
      html: `
        <p>
          A amostra informada no laudo é urina. Esse dado precisa ser lido em conjunto com a espécie identificada, porque contribui para avaliar a plausibilidade clínica do isolamento e sua relação com o foco infeccioso.
        </p>
      `,
      focus: ["sample", "organism"]
    },
    "3": {
      eyebrow: "Observação laboratorial",
      title: "Produção de ESBL",
      html: `
        <p>
          Em seguida, a observação de produção de ESBL indica a presença de uma enzima capaz de hidrolisar diversas penicilinas e cefalosporinas <sup>14</sup>. Essa informação fornece contexto para a interpretação do painel de β-lactâmicos e explica a resistência observada a algumas cefalosporinas <sup>15</sup>.
        </p>
      `,
      focus: ["obs", "ceftriaxone"]
    },
    "4": {
      eyebrow: "Leitura do teste de suscetibilidade",
      title: "Categorias S, I e R",
      html: `
        <p>
          Somente após considerar essas informações faz sentido analisar as categorias de suscetibilidade apresentadas no antibiograma. A classificação nas categorias Sensível (S), Sensível, aumentando exposição (I) e Resistente (R) representa a aplicação de critérios interpretativos sobre o comportamento da bactéria no teste laboratorial <sup>10,12</sup>.
        </p>
        <p>
          Nesse exemplo, antibacterianos classificados como sensíveis indicam que, nas condições consideradas pelos critérios interpretativos do teste, a bactéria apresenta probabilidade de inibição quando exposta ao fármaco em concentrações adequadas.
        </p>
      `,
      focus: ["table", "ceftriaxone", "ciprofloxacin", "nitrofurantoin", "amoxclav", "meropenem"]
    },
    "5": {
      eyebrow: "Síntese interpretativa",
      title: "Integração clínica do resultado",
      html: `
        <p>
          O laudo não deve ser lido como uma lista independente de antibacterianos nem como uma prescrição terapêutica automática. O resultado microbiológico precisa ser integrado em sequência lógica, articulando espécie, amostra, mecanismo de resistência e teste de suscetibilidade antes de qualquer decisão clínica.
        </p>
      `,
      focus: ["sample", "organism", "obs", "table"],
      integrated: true
    }
  };

  function clearFocus() {
    focusables.forEach((el) => el.classList.remove("is-focus"));
    report.classList.remove("is-integrated");
  }

  function applyFocus(keys, integrated) {
    clearFocus();

    keys.forEach((key) => {
      const el = root.querySelector(`[data-p52-target="${key}"]`);
      if (el) el.classList.add("is-focus");
    });

    if (integrated) {
      report.classList.add("is-integrated");
    }
  }

  function activate(key) {
    const item = map[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p52Step === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.innerHTML = item.html;
    applyFocus(item.focus || [], Boolean(item.integrated));
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.p52Step));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p52Step);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p52Step);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p52Step);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p52Step);
      }
    });
  });

  activate("1");
})();
/* =========================
   Página 53 — Quiz de revisão
   ========================= */
(function initCap5Page53() {
  const root = document.querySelector(".cap5-page53");
  if (!root) return;

  const quiz = root.querySelector("[data-cap5-p53]");
  const questions = Array.from(root.querySelectorAll(".cap5-p53Question"));
  const statusValue = root.querySelector("[data-p53-status] .cap5-p53Status__value");
  const completion = root.querySelector("[data-p53-completion]");

  if (!quiz || !questions.length || !statusValue) return;

  function updateStatus() {
    const done = questions.filter((q) => q.dataset.questionState === "done").length;
    statusValue.textContent = `${done} de 2 situações confirmadas`;

    if (completion) {
      completion.hidden = done !== questions.length;
    }
  }

  function renderFeedback(container, payload) {
    container.hidden = false;
    container.className = "cap5-p53Feedback";
    if (payload.type === "error") {
      container.classList.add("cap5-p53Feedback--error");
    }

    container.innerHTML = `
      <p class="cap5-p53Feedback__title">${payload.title}</p>
      <p class="cap5-p53Feedback__text">${payload.text}</p>
    `;
  }

  questions.forEach((question) => {
    const options = Array.from(question.querySelectorAll(".cap5-p53Options button[data-answer]"));
    const confirmBtn = question.querySelector('[data-p53-action="confirm"]');
    const resetBtn = question.querySelector('[data-p53-action="reset"]');
    const feedback = question.querySelector(".cap5-p53Feedback");
    const feedbackMapEl = question.querySelector(".cap5-p53FeedbackMap");

    if (!options.length || !confirmBtn || !resetBtn || !feedback || !feedbackMapEl) return;

    const feedbackMap = JSON.parse(feedbackMapEl.innerHTML.trim());
    let selected = null;

    feedback.hidden = true;

    function resetQuestion() {
      selected = null;
      question.dataset.questionState = "pending";

      options.forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove("is-selected", "is-correct", "is-wrong");
      });

      confirmBtn.disabled = true;
      confirmBtn.hidden = false;
      resetBtn.hidden = true;

      feedback.hidden = true;
      feedback.innerHTML = "";
      feedback.className = "cap5-p53Feedback";

      updateStatus();
    }

    options.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (question.dataset.questionState === "done") return;

        options.forEach((b) => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        selected = btn.dataset.answer;
        confirmBtn.disabled = false;
      });
    });

    confirmBtn.addEventListener("click", () => {
      if (!selected) return;

      const correctBtn = options.find((btn) => btn.dataset.correct === "true");
      const selectedBtn = options.find((btn) => btn.dataset.answer === selected);

      options.forEach((btn) => {
        btn.disabled = true;
        btn.classList.remove("is-selected");
      });

      if (correctBtn) {
        correctBtn.classList.add("is-correct");
      }

      if (selectedBtn && selectedBtn !== correctBtn) {
        selectedBtn.classList.add("is-wrong");
      }

      const payload = feedbackMap[selected];
      if (payload) {
        renderFeedback(feedback, payload);
      }

      question.dataset.questionState = "done";
      confirmBtn.hidden = true;
      resetBtn.hidden = false;

      updateStatus();
    });

    resetBtn.addEventListener("click", resetQuestion);
  });

  updateStatus();
})();