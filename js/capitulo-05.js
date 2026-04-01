// padrão simples — sem interação específica para p39
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
   Página 41 — Princípio biológico da coloração de Gram
   ========================= */
(function initCap5Page41() {
  const root = document.querySelector(".cap5-page41");
  if (!root) return;

  const lightbox = document.getElementById("cap5Lightbox");
  const lightboxImage = document.getElementById("cap5LightboxImage");
  const lightboxCaption = document.getElementById("cap5LightboxCaption");
  const closers = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]")) : [];

  const zoomBtn = document.getElementById("gram-stage-zoom");
  const imageEl = document.getElementById("gram-stage-image");
  const pillEl = document.getElementById("gram-stage-pill");
  const titleEl = document.getElementById("gram-stage-title");
  const textEl = document.getElementById("gram-stage-text");
  const prevBtn = document.getElementById("gram-prev");
  const nextBtn = document.getElementById("gram-next");
  const steps = Array.from(root.querySelectorAll(".gram-step"));
  const compareZooms = Array.from(root.querySelectorAll(".cap5-zoomTrigger"));

  if (
    !lightbox || !lightboxImage || !lightboxCaption ||
    !zoomBtn || !imageEl || !pillEl || !titleEl || !textEl ||
    !prevBtn || !nextBtn || !steps.length
  ) {
    return;
  }

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
      zoomBtn.dataset.zoomImage = item.image;
      zoomBtn.dataset.zoomAlt = item.alt;
      zoomBtn.dataset.zoomCaption = item.text;
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

  zoomBtn.addEventListener("click", () => {
    openLightbox(
      zoomBtn.dataset.zoomImage,
      zoomBtn.dataset.zoomAlt,
      zoomBtn.dataset.zoomCaption
    );
  });

  compareZooms.forEach((trigger) => {
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

  renderStep(0);
})();
/* =========================
   Página 42 — Identificação bacteriana
   ========================= */
(function initCap5Page42() {
  const root = document.querySelector(".cap5-page42");
  if (!root) return;

  const zoomTriggers = Array.from(root.querySelectorAll(".cap5-zoomTrigger"));
  const lightbox = document.getElementById("cap5Lightbox");
  const lightboxImage = document.getElementById("cap5LightboxImage");
  const lightboxCaption = document.getElementById("cap5LightboxCaption");
  const closers = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]")) : [];

  if (!zoomTriggers.length || !lightbox || !lightboxImage || !lightboxCaption) return;

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

  zoomTriggers.forEach((trigger) => {
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
   Página 43 — Identificação bacteriana
   ========================= */
(function initCap5Page43() {
  const root = document.querySelector(".cap5-page43");
  if (!root) return;

  const steps = Array.from(root.querySelectorAll(".cap5-p43-step"));
  const eyebrow = root.querySelector("#cap5-p43-panel-eyebrow");
  const title = root.querySelector("#cap5-p43-panel-title");
  const text = root.querySelector("#cap5-p43-panel-text");

  if (!steps.length || !eyebrow || !title || !text) return;

  const map = {
    "1": {
      eyebrow: "Ponto de partida",
      title: "Espécie, grupo ou complexo",
      text: "A identificação define o nível de precisão microbiológica disponível naquele isolamento. Esse dado inicial determina o contexto em que os resultados seguintes serão interpretados."
    },
    "2": {
      eyebrow: "Base biológica",
      title: "Perfil biológico esperado",
      text: "A partir da identificação, torna-se possível reconhecer padrões microbiológicos próprios daquele organismo, incluindo comportamentos previsíveis de suscetibilidade ou resistência."
    },
    "3": {
      eyebrow: "Conseqüência técnica",
      title: "Limites do painel",
      text: "Nem toda combinação entre microrganismo e antibacteriano precisa aparecer no teste. Em alguns casos, a própria identidade bacteriana já antecipa limitações metodológicas ou previsibilidade do resultado."
    },
    "4": {
      eyebrow: "Integração interpretativa",
      title: "Leitura crítica do antibiograma",
      text: "O painel de suscetibilidade passa a ser lido dentro de um contexto microbiológico definido. Assim, o resultado deixa de ser uma lista isolada de antibacterianos e passa a ter significado interpretativo."
    }
  };

  function activate(key) {
    const item = map[key];
    if (!item) return;

    steps.forEach((btn) => {
      const active = btn.dataset.p43Step === key;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
      btn.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
  }

  steps.forEach((btn, index) => {
    btn.addEventListener("click", () => activate(btn.dataset.p43Step));

    btn.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % steps.length;
        steps[nextIndex].focus();
        activate(steps[nextIndex].dataset.p43Step);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + steps.length) % steps.length;
        steps[nextIndex].focus();
        activate(steps[nextIndex].dataset.p43Step);
      }

      if (event.key === "Home") {
        event.preventDefault();
        steps[0].focus();
        activate(steps[0].dataset.p43Step);
      }

      if (event.key === "End") {
        event.preventDefault();
        steps[steps.length - 1].focus();
        activate(steps[steps.length - 1].dataset.p43Step);
      }
    });
  });

  activate("1");
})();
/* =========================
   Página 44 — Difusão em disco (tempo)
   ========================= */
(function initCap5Page44(){
  const root = document.querySelector(".cap5-page44");
  if(!root) return;

  const buttons = root.querySelectorAll(".tempo-btn");
  const img = root.querySelector("#tempo-img");
  const caption = root.querySelector("#tempo-caption");

  if(!buttons.length || !img || !caption) return;

  const data = {
    "0": {
      src: "../../assets/capitulo-05/imagens/difusao-disco-0h.png",
      text: "Tempo inicial: o antibacteriano ainda não se difundiu de forma significativa no meio."
    },
    "6": {
      src: "../../assets/capitulo-05/imagens/difusao-disco-6h.png",
      text: "Início da difusão: pequenas zonas de inibição começam a se formar ao redor dos discos."
    },
    "12": {
      src: "../../assets/capitulo-05/imagens/difusao-disco-12h.png",
      text: "Difusão progressiva: o gradiente de concentração se estabelece e as zonas de inibição tornam-se mais evidentes."
    },
    "18": {
      src: "../../assets/capitulo-05/imagens/difusao-disco-18h.png",
      text: "Expansão do halo: a inibição bacteriana ao redor dos discos torna-se mais definida."
    },
    "24": {
      src: "../../assets/capitulo-05/imagens/difusao-disco-24h.png",
      text: "Leitura final: o halo de inibição está completamente formado e pode ser medido."
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const tempo = btn.dataset.tempo;
      img.src = data[tempo].src;
      caption.textContent = data[tempo].text;

    });
  });
})();
/* =========================
   Página 45 — CIM + padronização
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

  const lightbox = document.getElementById("cap5Lightbox");
  const lightboxImage = document.getElementById("cap5LightboxImage");
  const lightboxCaption = document.getElementById("cap5LightboxCaption");
  const closers = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]")) : [];

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
      text: "A CIM corresponde à menor concentração em que o crescimento visível deixa de ocorrer. O critério é a inibição observável no ensaio, e não necessariamente morte bacteriana completa."
    }
  };

  function applyView(key) {
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

    zoomBtn.dataset.zoomImage = item.src;
    zoomBtn.dataset.zoomAlt = item.alt;
    zoomBtn.dataset.zoomCaption = item.caption;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => applyView(tab.dataset.cimView));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        applyView(tabs[nextIndex].dataset.cimView);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        applyView(tabs[nextIndex].dataset.cimView);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        applyView(tabs[0].dataset.cimView);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        applyView(tabs[tabs.length - 1].dataset.cimView);
      }
    });
  });

  function openLightbox(src, alt, cap) {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = cap || "";
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

  zoomBtn.addEventListener("click", () => {
    openLightbox(
      zoomBtn.dataset.zoomImage,
      zoomBtn.dataset.zoomAlt,
      zoomBtn.dataset.zoomCaption
    );
  });

  closers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  applyView("crescimento");
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
      text: "Indica que o valor obtido no teste está dentro da faixa associada a alta probabilidade de sucesso terapêutico quando a exposição ao antibacteriano é apropriada para o sítio de infecção e o regime posológico recomendado."
    },
    i: {
      pillText: "Ponto que mais gera erro",
      pillClass: "cap5-p46-panel__pill cap5-p46-panel__pill--i",
      title: "Sensível, aumentando exposição (I)",
      text: "Corresponde a uma faixa limítrofe de suscetibilidade. Nessa situação, a probabilidade de sucesso terapêutico depende de maior exposição ao antibacteriano, o que pode ocorrer, por exemplo, em regimes posológicos otimizados ou em locais do organismo onde a concentração do fármaco é naturalmente mais elevada."
    },
    r: {
      pillText: "Baixa probabilidade",
      pillClass: "cap5-p46-panel__pill cap5-p46-panel__pill--r",
      title: "Resistente (R)",
      text: "Indica que o valor obtido no teste ultrapassa o limite associado à probabilidade aceitável de inibição bacteriana, mesmo quando se considera aumento de exposição ao antibacteriano."
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

  activate("i");
})();
/* =========================
   Página 47 — ESBL interação
   ========================= */

(function initPage47ESBL(){

  const root = document.querySelector("[data-esbl]");
  if(!root) return;

  const buttons = root.querySelectorAll(".cap5-esbl-btn");
  const img = document.getElementById("esbl-img");
  const title = document.getElementById("esbl-title");
  const desc = document.getElementById("esbl-desc");

  const data = {
    1: {
      img: "../../assets/capitulo-05/imagens/esbl-padrao.png",
      title: "Padrão de suscetibilidade não uniforme",
      desc: "Diferenças nos halos entre cefalosporinas sugerem a presença de um mecanismo de resistência."
    },
    2: {
      img: "../../assets/capitulo-05/imagens/esbl-confirmacao.png",
      title: "Efeito do inibidor enzimático",
      desc: "Aumento do halo na presença de clavulanato indica atividade de β-lactamase."
    },
    3: {
      img: "../../assets/capitulo-05/imagens/esbl-confirmacao.png",
      title: "Interpretação clínica",
      desc: "Esse padrão deve ser interpretado como ESBL, mesmo que alguns resultados apareçam como sensíveis."
    }
  };

  function update(step){
    img.style.opacity = 0;

    setTimeout(()=>{
      img.src = data[step].img;
      title.textContent = data[step].title;
      desc.textContent = data[step].desc;
      img.style.opacity = 1;
    },150);

    buttons.forEach(b=>{
      b.classList.toggle("is-active", b.dataset.step == step);
    });
  }

  buttons.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      update(btn.dataset.step);
    });
  });

})();
(function initPage48(){

  const root = document.querySelector("[data-carb]");
  if(!root) return;

  const buttons = root.querySelectorAll(".cap5-carb-btn");
  const img = document.getElementById("carb-img");
  const title = document.getElementById("carb-title");
  const desc = document.getElementById("carb-desc");

  const data = {

    1: {
      img: "../../assets/capitulo-05/imagens/ampc-cfo.png",
      title: "Suspeita de AmpC",
      desc: "Espécies como Enterobacter e Serratia podem apresentar produção induzível de AmpC, o que interfere na interpretação do antibiograma."
    },

    2: {
      img: "../../assets/capitulo-05/imagens/ampc-cfo-ab.png",
      title: "Confirmação de AmpC",
      desc: "Aumento do halo na presença de inibidor sugere produção de β-lactamase do tipo AmpC."
    },

    3: {
      img: "../../assets/capitulo-05/imagens/carbapenemase-triagem.png",
      title: "Alerta para carbapenemase",
      desc: "Redução do halo em carbapenêmicos pode indicar presença de carbapenemase."
    },

    4: {
      img: "../../assets/capitulo-05/imagens/carbapenemase-mcim.png",
      title: "Confirmação laboratorial",
      desc: "Testes como o mCIM demonstram a inativação do antibacteriano pela enzima."
    },

    5: {
      img: "../../assets/capitulo-05/imagens/carbapenemase-mcim.png",
      title: "Interpretação clínica",
      desc: "Nem todo resultado sensível é confiável. Esses mecanismos indicam risco de falha terapêutica."
    }

  };

  function update(step){
    img.style.opacity = 0;

    setTimeout(()=>{
      img.src = data[step].img;
      title.textContent = data[step].title;
      desc.textContent = data[step].desc;
      img.style.opacity = 1;
    },150);

    buttons.forEach(btn=>{
      btn.classList.toggle("is-active", btn.dataset.step == step);
    });
  }

  buttons.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      update(btn.dataset.step);
    });
  });

})();