
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
   Página 47 — ESBL
   ========================= */
(function initCap5Page47(){
  const root = document.querySelector('.cap5-page47');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('.cap5-p47-esbl__tab'));
  const eyebrow = root.querySelector('#cap5-p47-eyebrow');
  const title = root.querySelector('#cap5-p47-title');
  const text = root.querySelector('#cap5-p47-text');
  const note = root.querySelector('#cap5-p47-note');
  const image = root.querySelector('#cap5-p47-image');
  const caption = root.querySelector('#cap5-p47-caption');
  const zoomBtn = root.querySelector('#cap5-p47-zoom');

  const lightbox = root.querySelector('#cap5Lightbox');
  const lightboxImage = root.querySelector('#cap5LightboxImage');
  const lightboxCaption = root.querySelector('#cap5LightboxCaption');
  const closers = lightbox ? Array.from(lightbox.querySelectorAll('[data-lightbox-close]')) : [];

  if (!tabs.length || !eyebrow || !title || !text || !note || !image || !caption || !zoomBtn) return;

  const map = {
    mecanismo: {
      eyebrow: 'Produção enzimática',
      title: 'Mecanismo biológico da ESBL',
      text: 'As ESBL são enzimas produzidas por Enterobacterales capazes de degradar penicilinas e cefalosporinas de amplo espectro. O reconhecimento desse mecanismo explica por que o painel de β-lactâmicos não deve ser lido apenas como uma lista de resultados isolados, mas como expressão de um perfil biológico de resistência.',
      note: 'O ponto central não é apenas “qual antibacteriano apareceu no laudo”, mas qual mecanismo está alterando o significado daquele painel.',
      img: '../../assets/capitulo-05/imagens/esbl-mecanismo.png',
      alt: 'Esquema ilustrativo do mecanismo de produção de ESBL.',
      caption: 'A produção de ESBL leva à hidrólise de penicilinas e cefalosporinas de amplo espectro, interferindo diretamente na atividade desses antibacterianos.'
    },
    impacto: {
      eyebrow: 'Leitura do antibiograma',
      title: 'Impacto no laudo microbiológico',
      text: 'A detecção da ESBL modifica a interpretação de parte do painel de β-lactâmicos de acordo com as regras interpretativas adotadas pelo sistema normativo do laboratório. Portanto, a leitura adequada do laudo depende da integração entre o mecanismo detectado e a forma como os resultados do painel devem ser compreendidos.',
      note: 'A observação do mecanismo não substitui o antibiograma, mas altera a forma como seus resultados devem ser interpretados.',
      img: '../../assets/capitulo-05/imagens/esbl-teste-confirmatorio.png',
      alt: 'Imagem ilustrativa de teste confirmatório relacionado à produção de ESBL.',
      caption: 'A confirmação da ESBL altera o significado interpretativo do painel de β-lactâmicos e impede a leitura isolada dos resultados.'
    }
  };

  function activate(step){
    const item = map[step];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p47Step === step;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
    note.textContent = item.note;
    image.src = item.img;
    image.alt = item.alt;
    caption.textContent = item.caption;

    zoomBtn.dataset.zoomImage = item.img;
    zoomBtn.dataset.zoomAlt = item.alt;
    zoomBtn.dataset.zoomCaption = item.caption;
  }

  function openLightbox(src, alt, cap){
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt || '';
    lightboxCaption.textContent = cap || '';
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.p47Step));

    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p47Step);
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p47Step);
      }

      if (event.key === 'Home') {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p47Step);
      }

      if (event.key === 'End') {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p47Step);
      }
    });
  });

  zoomBtn.addEventListener('click', () => {
    openLightbox(
      zoomBtn.dataset.zoomImage,
      zoomBtn.dataset.zoomAlt,
      zoomBtn.dataset.zoomCaption
    );
  });

  closers.forEach((el) => {
    el.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  activate('mecanismo');
})();
/* =========================
   Página 48 — AmpC e carbapenemases
   ========================= */
(function initCap5Page48(){
  const root = document.querySelector('.cap5-page48');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('.cap5-p48-mechanisms__tab'));
  const eyebrow = root.querySelector('#cap5-p48-eyebrow');
  const title = root.querySelector('#cap5-p48-title');
  const text = root.querySelector('#cap5-p48-text');
  const image = root.querySelector('#cap5-p48-image');
  const caption = root.querySelector('#cap5-p48-caption');
  const zoomBtn = root.querySelector('#cap5-p48-zoom');

  const lightbox = root.querySelector('#cap5Lightbox');
  const lightboxImage = root.querySelector('#cap5LightboxImage');
  const lightboxCaption = root.querySelector('#cap5LightboxCaption');
  const closers = lightbox ? Array.from(lightbox.querySelectorAll('[data-lightbox-close]')) : [];

  if (!tabs.length || !eyebrow || !title || !text || !image || !caption || !zoomBtn) return;

  const map = {
    ampc: {
      eyebrow: 'Produção enzimática induzível',
      title: 'AmpC cromossômica',
      text: 'Em determinadas espécies, a simples identificação bacteriana já indica a possibilidade de produção de AmpC cromossômica. Nesses casos, a exposição a alguns β-lactâmicos pode induzir a expressão enzimática, tornando a leitura inicial do painel potencialmente enganosa antes da indução e criando risco de falha terapêutica durante o tratamento.',
      img: '../../assets/capitulo-05/imagens/ampc-inducao.png',
      alt: 'Esquema ilustrativo da AmpC cromossômica com expressão induzível.',
      caption: 'A identificação de espécies com possibilidade de AmpC cromossômica já sinaliza risco interpretativo, especialmente pela possibilidade de expressão induzível durante a exposição a β-lactâmicos.'
    },
    carb: {
      eyebrow: 'Hidrólise de carbapenêmicos',
      title: 'Carbapenemases',
      text: 'As carbapenemases são enzimas capazes de hidrolisar antibacterianos dessa classe. Podem ser classificadas em grupos como KPC, metalo-β-lactamases, como NDM, VIM ou IMP, e variantes do tipo OXA. Sua presença costuma estar associada a perfis de resistência mais amplos e possui relevância epidemiológica importante.',
      img: '../../assets/capitulo-05/imagens/carbapenemases-classificacao.png',
      alt: 'Esquema ilustrativo da classificação e implicações das carbapenemases.',
      caption: 'A presença de carbapenemases está associada a multirresistência e possui importante impacto epidemiológico, exigindo leitura crítica do laudo e atenção às medidas de controle.'
    }
  };

  function activate(step){
    const item = map[step];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p48Step === step;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
    image.src = item.img;
    image.alt = item.alt;
    caption.textContent = item.caption;

    zoomBtn.dataset.zoomImage = item.img;
    zoomBtn.dataset.zoomAlt = item.alt;
    zoomBtn.dataset.zoomCaption = item.caption;
  }

  function openLightbox(src, alt, cap){
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt || '';
    lightboxCaption.textContent = cap || '';
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.p48Step));

    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p48Step);
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p48Step);
      }

      if (event.key === 'Home') {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p48Step);
      }

      if (event.key === 'End') {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p48Step);
      }
    });
  });

  zoomBtn.addEventListener('click', () => {
    openLightbox(
      zoomBtn.dataset.zoomImage,
      zoomBtn.dataset.zoomAlt,
      zoomBtn.dataset.zoomCaption
    );
  });

  closers.forEach((el) => {
    el.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  activate('ampc');
})();
/* =========================
   Página 49 — Mecanismos que modificam a interpretação
   ========================= */
(function initCap5Page49(){
  const root = document.querySelector('.cap5-page49');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('.cap5-p49-mechanisms__tab'));
  const eyebrow = root.querySelector('#cap5-p49-eyebrow');
  const title = root.querySelector('#cap5-p49-title');
  const text = root.querySelector('#cap5-p49-text');
  const image = root.querySelector('#cap5-p49-image');
  const caption = root.querySelector('#cap5-p49-caption');
  const zoomBtn = root.querySelector('#cap5-p49-zoom');

  const lightbox = root.querySelector('#cap5Lightbox');
  const lightboxImage = root.querySelector('#cap5LightboxImage');
  const lightboxCaption = root.querySelector('#cap5LightboxCaption');
  const closers = lightbox ? Array.from(lightbox.querySelectorAll('[data-lightbox-close]')) : [];

  if (!tabs.length || !eyebrow || !title || !text || !image || !caption || !zoomBtn) return;

  const map = {
    mrsa: {
      eyebrow: 'Alteração de alvo',
      title: 'MRSA',
      text: 'No Staphylococcus aureus resistente à meticilina (MRSA), ocorre modificação das proteínas ligadoras de penicilina. Essa alteração reduz a afinidade por β-lactâmicos relevantes e modifica a interpretação laboratorial dessa classe conforme as regras aplicáveis ao sistema adotado.',
      img: '../../assets/capitulo-05/imagens/mrsa-pbp2a.png',
      alt: 'Esquema ilustrativo do mecanismo de resistência do MRSA.',
      caption: 'No MRSA, a modificação das proteínas ligadoras de penicilina reduz a afinidade por β-lactâmicos relevantes e altera a interpretação dessa classe.'
    },
    vre: {
      eyebrow: 'Alteração de alvo',
      title: 'VRE',
      text: 'Nos enterococos resistentes à vancomicina (VRE), ocorre modificação do alvo molecular do glicopeptídeo. A presença desse mecanismo altera a atividade da vancomicina e possui implicações relevantes no ambiente hospitalar.',
      img: '../../assets/capitulo-05/imagens/vre-alvo-vancomicina.png',
      alt: 'Esquema ilustrativo do mecanismo de resistência do VRE.',
      caption: 'No VRE, a modificação do alvo molecular altera a atividade da vancomicina e modifica a leitura do laudo.'
    },
    mlsb: {
      eyebrow: 'Fenótipo específico',
      title: 'MLSB induzível',
      text: 'O fenótipo MLSB induzível pode resultar em falha terapêutica com clindamicina apesar de resultado inicial de sensibilidade. Nesse contexto, o laudo não deve ser lido apenas pela categoria isolada, mas pelo significado biológico do fenótipo detectado.',
      img: '../../assets/capitulo-05/imagens/mlsb-induzivel-clindamicina.png',
      alt: 'Esquema ilustrativo do fenótipo MLSB induzível.',
      caption: 'No fenótipo MLSB induzível, a clindamicina pode aparentar sensibilidade inicial, mas a interpretação correta exige reconhecer o risco de falha.'
    },
    hlar: {
      eyebrow: 'Perda de sinergismo',
      title: 'HLAR',
      text: 'A resistência de alto nível a aminoglicosídeos em Enterococcus interfere no potencial de sinergismo esperado entre aminoglicosídeos e outras classes antimicrobianas. Essa observação modifica a leitura do painel e não deve ser interpretada isoladamente.',
      img: '../../assets/capitulo-05/imagens/enterococcus-hlar.png',
      alt: 'Esquema ilustrativo da resistência de alto nível a aminoglicosídeos em Enterococcus.',
      caption: 'Na HLAR, a interpretação do laudo deve considerar a perda do sinergismo esperado com aminoglicosídeos.'
    }
  };

  function activate(step){
    const item = map[step];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p49Step === step;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
    image.src = item.img;
    image.alt = item.alt;
    caption.textContent = item.caption;

    zoomBtn.dataset.zoomImage = item.img;
    zoomBtn.dataset.zoomAlt = item.alt;
    zoomBtn.dataset.zoomCaption = item.caption;
  }

  function openLightbox(src, alt, cap){
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt || '';
    lightboxCaption.textContent = cap || '';
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.p49Step));

    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p49Step);
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p49Step);
      }

      if (event.key === 'Home') {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p49Step);
      }

      if (event.key === 'End') {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p49Step);
      }
    });
  });

  zoomBtn.addEventListener('click', () => {
    openLightbox(
      zoomBtn.dataset.zoomImage,
      zoomBtn.dataset.zoomAlt,
      zoomBtn.dataset.zoomCaption
    );
  });

  closers.forEach((el) => {
    el.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  activate('mrsa');
})();
/* =========================
   Página 50 — Como ler o antibiograma de forma estruturada
   ========================= */
(function initCap5Page50(){
  const root = document.querySelector('.cap5-page50');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('.cap5-p50-steps__tab'));
  const eyebrow = root.querySelector('#cap5-p50-eyebrow');
  const title = root.querySelector('#cap5-p50-title');
  const text = root.querySelector('#cap5-p50-text');

  if (!tabs.length || !eyebrow || !title || !text) return;

  const map = {
    "1": {
      eyebrow: "Primeira leitura",
      title: "Identificar o microrganismo isolado",
      text: "A espécie bacteriana fornece o primeiro contexto interpretativo do resultado. Diferentes bactérias apresentam perfis característicos de suscetibilidade e resistência, incluindo mecanismos de fenótipo esperado resistente. A identificação do microrganismo também ajuda a avaliar a plausibilidade clínica do isolamento. Nem todo microrganismo detectado em cultura representa necessariamente o agente responsável pela infecção."
    },
    "2": {
      eyebrow: "Contexto da coleta",
      title: "Considerar a origem da amostra",
      text: "O significado clínico do isolamento depende do sítio de onde a amostra foi obtida. A presença de uma bactéria em hemocultura possui implicações diferentes da detecção do mesmo microrganismo em secreções respiratórias ou em material de superfície. A interpretação do antibiograma precisa ser contextualizada com a possibilidade de colonização, contaminação da amostra ou infecção verdadeira."
    },
    "3": {
      eyebrow: "Observações adicionais",
      title: "Verificar observações laboratoriais",
      text: "O laudo pode incluir informações adicionais relacionadas a mecanismos de resistência específicos. Observações como produção de ESBL, presença de carbapenemase, identificação de MRSA, VRE ou outros fenótipos de resistência modificam a leitura do painel de antibacterianos. Esses dados representam características biológicas do microrganismo e devem ser considerados antes da análise das categorias interpretativas."
    },
    "4": {
      eyebrow: "Categorias interpretativas",
      title: "Analisar as categorias de suscetibilidade",
      text: "Somente após compreender o contexto microbiológico do laudo faz sentido avaliar as categorias interpretativas apresentadas no antibiograma. A classificação como as categorias S, I e R resulta da aplicação de critérios técnicos sobre o valor obtido no teste de suscetibilidade. Essas categorias indicam a probabilidade microbiológica de inibição bacteriana nas condições consideradas pelos parâmetros farmacológicos utilizados para definir os breakpoints. Quando disponível, o valor da concentração inibitória mínima pode fornecer informação adicional, especialmente quando se encontra próximo aos pontos de corte estabelecidos."
    },
    "5": {
      eyebrow: "Síntese clínica",
      title: "Integrar o resultado ao contexto clínico",
      text: "O antibiograma informa o comportamento da bactéria no ambiente laboratorial. A decisão terapêutica depende da integração desse dado com fatores clínicos, como o foco infeccioso, a penetração do antibacteriano no tecido afetado, a presença de biofilme e as características farmacocinéticas do paciente. A interpretação adequada surge da integração entre microbiologia, farmacologia e contexto clínico."
    }
  };

  function activate(step){
    const item = map[step];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p50Step === step;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.p50Step));

    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p50Step);
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p50Step);
      }

      if (event.key === 'Home') {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p50Step);
      }

      if (event.key === 'End') {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p50Step);
      }
    });
  });

  activate('1');
})();
/* =========================
   Página 51 — Erros frequentes e limites da interpretação do antibiograma
   ========================= */
(function initCap5Page51(){
  const root = document.querySelector('.cap5-page51');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('.cap5-p51-errors__tab'));
  const eyebrow = root.querySelector('#cap5-p51-eyebrow');
  const title = root.querySelector('#cap5-p51-title');
  const wrong = root.querySelector('#cap5-p51-wrong');
  const right = root.querySelector('#cap5-p51-right');

  if (!tabs.length || !eyebrow || !title || !wrong || !right) return;

  const map = {
    "1": {
      eyebrow: "Erro frequente",
      title: "Selecionar o antibacteriano com maior número de resultados “sensíveis” como se o antibiograma organizasse as opções terapêuticas em ordem de superioridade",
      wrong: "O antibiograma seria uma lista hierárquica de opções “melhores” ou “piores”, e o antibacteriano mais frequentemente classificado como sensível seria automaticamente o mais adequado.",
      right: "As categorias interpretativas indicam probabilidade de inibição bacteriana sob determinadas condições de exposição, e não uma hierarquia entre antibacterianos."
    },
    "2": {
      eyebrow: "Erro frequente",
      title: "Interpretar a categoria I (“sensível, aumentando exposição”) como sinônimo de ineficácia",
      wrong: "O resultado “I” significaria ausência de atividade ou falha previsível do antibacteriano.",
      right: "Essa classificação indica que a probabilidade de sucesso terapêutico depende de maior exposição ao fármaco, a qual pode ser alcançada por ajuste posológico, modificação da forma de administração ou por características do sítio de infecção."
    },
    "3": {
      eyebrow: "Erro frequente",
      title: "Interpretar a concentração inibitória mínima de forma isolada",
      wrong: "Diferenças pequenas entre valores de CIM implicariam automaticamente diferenças clínicas relevantes entre os antibacterianos testados.",
      right: "Diferenças pequenas entre valores próximos ao breakpoint não necessariamente correspondem a diferenças clinicamente relevantes. A CIM deve ser interpretada dentro do contexto dos critérios utilizados para definir as categorias de suscetibilidade (2)."
    },
    "4": {
      eyebrow: "Erro frequente",
      title: "Ignorar observações laboratoriais relacionadas a mecanismos de resistência",
      wrong: "Cada antibacteriano do painel poderia ser interpretado isoladamente, sem considerar observações como ESBL, carbapenemase, MRSA ou resistência de alto nível a aminoglicosídeos.",
      right: "Informações como produção de ESBL, presença de carbapenemase, identificação de MRSA ou resistência de alto nível a aminoglicosídeos modificam o significado do painel de suscetibilidade. Nesses casos, a interpretação não deve considerar cada antibacteriano de forma isolada, mas o conjunto do perfil microbiológico."
    },
    "5": {
      eyebrow: "Erro frequente",
      title: "Supor que todos os antibacterianos disponíveis devam aparecer no painel do antibiograma",
      wrong: "A ausência de um antibacteriano no laudo indicaria falha do laboratório ou omissão indevida.",
      right: "A ausência de determinadas drogas no painel pode refletir fenótipo esperado resistente da espécie, ausência de breakpoint validado para aquela combinação microrganismo–fármaco ou limitações metodológicas do teste utilizado (1)."
    }
  };

  function activate(step){
    const item = map[step];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p51Step === step;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    wrong.textContent = item.wrong;
    right.textContent = item.right;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.p51Step));

    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p51Step);
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p51Step);
      }

      if (event.key === 'Home') {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p51Step);
      }

      if (event.key === 'End') {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p51Step);
      }
    });
  });

  activate('1');
})();
/* =========================
   Página 52 — Integração das informações do antibiograma
   ========================= */
(function initCap5Page52(){
  const root = document.querySelector('.cap5-page52');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('.cap5-p52-guide__tab'));
  const eyebrow = root.querySelector('#cap5-p52-eyebrow');
  const title = root.querySelector('#cap5-p52-title');
  const text = root.querySelector('#cap5-p52-text');

  const sample = root.querySelector('[data-p52-target="sample"]');
  const organism = root.querySelector('[data-p52-target="organism"]');
  const obs = root.querySelector('[data-p52-target="obs"]');
  const table = root.querySelector('[data-p52-target="table"]');

  if (!tabs.length || !eyebrow || !title || !text) return;

  const targets = [sample, organism, obs, table].filter(Boolean);

  const contentMap = {
    "1": {
      eyebrow: "Ponto de partida",
      title: "Identificação da espécie",
      text: "A interpretação do resultado começa pela identificação da espécie bacteriana. Escherichia coli é um agente frequentemente associado a infecções do trato urinário, o que torna o isolamento plausível no contexto clínico dessa amostra.",
      activeTargets: ['organism']
    },
    "2": {
      eyebrow: "Contexto da coleta",
      title: "Origem da amostra",
      text: "A amostra também orienta a plausibilidade clínica do isolamento. Neste exemplo, a urina fornece um contexto compatível com a presença de Escherichia coli, o que reforça a relevância interpretativa do laudo.",
      activeTargets: ['sample']
    },
    "3": {
      eyebrow: "Observação adicional",
      title: "Produção de ESBL",
      text: "Em seguida, a observação de produção de ESBL indica a presença de uma enzima capaz de hidrolisar diversas penicilinas e cefalosporinas. Essa informação fornece contexto para a interpretação do painel de β-lactâmicos e explica a resistência observada a algumas cefalosporinas.",
      activeTargets: ['obs']
    },
    "4": {
      eyebrow: "Categorias interpretativas",
      title: "Leitura do painel S / I / R",
      text: "Somente após considerar essas informações faz sentido analisar as categorias de suscetibilidade apresentadas no antibiograma. A classificação como S, I e R representa a aplicação de critérios interpretativos sobre o comportamento da bactéria no teste laboratorial.",
      activeTargets: ['table']
    },
    "5": {
      eyebrow: "Síntese clínica",
      title: "Integração do resultado",
      text: "A leitura do antibiograma não consiste em escolher automaticamente um antibacteriano da lista apresentada. O resultado microbiológico fornece informação sobre o comportamento da bactéria, que deve ser integrada ao foco infeccioso, às características farmacológicas dos antibacterianos disponíveis e ao contexto clínico do paciente.",
      activeTargets: ['sample', 'organism', 'obs', 'table']
    }
  };

  function clearHighlights(){
    targets.forEach(el => el.classList.remove('is-active'));
  }

  function applyHighlights(keys){
    clearHighlights();
    if (!keys || !keys.length) return;

    keys.forEach((key) => {
      const el = root.querySelector(`[data-p52-target="${key}"]`);
      if (el) el.classList.add('is-active');
    });
  }

  function activate(step){
    const item = contentMap[step];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p52Step === step;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
    applyHighlights(item.activeTargets);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.p52Step));

    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p52Step);
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p52Step);
      }

      if (event.key === 'Home') {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p52Step);
      }

      if (event.key === 'End') {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p52Step);
      }
    });
  });

  activate('1');
})();
/* =========================
   Página 53 — Quiz de revisão
   ========================= */
(function initCap5Page53Quiz(){
  const root = document.querySelector('[data-cap5-p53]');
  if (!root) return;

  const questions = Array.from(root.querySelectorAll('.cap5-p53Question'));
  const done = root.querySelector('.cap5-p53Done');
  const progress = root.querySelector('.cap5-p53Progress');
  const navPrev = root.querySelector('.cap5-p53NavBtn[data-p53-action="prev"]');
  const navNext = root.querySelector('.cap5-p53NavBtn[data-p53-action="next"]');

  let currentIndex = 0;

  function parseJSONTemplate(question, selector){
    const tpl = question.querySelector(selector);
    if (!tpl) return null;
    try {
      return JSON.parse(tpl.innerHTML.trim());
    } catch (e) {
      return null;
    }
  }

  function updateProgress(){
    if (!progress) return;
    if (done && !done.hidden && currentIndex >= questions.length) {
      progress.textContent = 'Concluído';
      return;
    }
    progress.textContent = `Questão ${currentIndex + 1} de ${questions.length}`;
  }

  function showQuestion(index){
    questions.forEach((q, i) => {
      q.classList.toggle('active', i === index);
    });

    if (done) done.hidden = true;
    currentIndex = index;

    if (navPrev) navPrev.disabled = index === 0;
    if (navNext) navNext.disabled = index === questions.length - 1;

    updateProgress();
  }

  function showDone(){
    questions.forEach((q) => q.classList.remove('active'));
    if (done) done.hidden = false;
    currentIndex = questions.length;

    if (navPrev) navPrev.disabled = false;
    if (navNext) navNext.disabled = true;

    updateProgress();
  }

  questions.forEach((question, qIndex) => {
    const optionButtons = Array.from(question.querySelectorAll('.cap5-p53Options button'));
    const confirmBtn = question.querySelector('[data-p53-action="confirm"]');
    const resetBtn = question.querySelector('[data-p53-action="reset"]');
    const feedback = question.querySelector('.cap5-p53Feedback');
    const feedbackMap = parseJSONTemplate(question, '.cap5-p53FeedbackMap');

    let selectedAnswer = null;
    let answered = false;

    optionButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered) return;

        optionButtons.forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');

        selectedAnswer = btn.dataset.answer || null;
        if (confirmBtn) confirmBtn.disabled = !selectedAnswer;
      });
    });

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        if (!selectedAnswer || answered) return;

        answered = true;
        const selectedBtn = optionButtons.find((b) => b.dataset.answer === selectedAnswer);
        const correctBtn = optionButtons.find((b) => b.dataset.correct === 'true');

        optionButtons.forEach((b) => b.disabled = true);

        if (selectedBtn && selectedBtn === correctBtn) {
          selectedBtn.classList.add('is-correct');
        } else {
          if (selectedBtn) selectedBtn.classList.add('is-wrong');
          if (correctBtn) correctBtn.classList.add('is-correct');
        }

        if (feedback && feedbackMap && feedbackMap[selectedAnswer]) {
          const item = feedbackMap[selectedAnswer];
          feedback.classList.add('is-visible');
          feedback.innerHTML = `
            <div class="cap5-p53FeedbackCard cap5-p53FeedbackCard--${item.type}">
              <h3 class="cap5-p53FeedbackTitle">${item.title}</h3>
              <p class="cap5-p53FeedbackText">${item.text}</p>
            </div>
          `;
        }

        confirmBtn.disabled = true;
        if (resetBtn) resetBtn.hidden = false;
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        answered = false;
        selectedAnswer = null;

        optionButtons.forEach((b) => {
          b.disabled = false;
          b.classList.remove('is-selected', 'is-correct', 'is-wrong');
        });

        if (confirmBtn) confirmBtn.disabled = true;
        resetBtn.hidden = true;

        if (feedback) {
          feedback.classList.remove('is-visible');
          feedback.innerHTML = '';
        }
      });
    }
  });

  if (navPrev) {
    navPrev.addEventListener('click', () => {
      if (currentIndex === questions.length && questions.length) {
        showQuestion(questions.length - 1);
        return;
      }
      if (currentIndex > 0) {
        showQuestion(currentIndex - 1);
      }
    });
  }

  if (navNext) {
    navNext.addEventListener('click', () => {
      if (currentIndex < questions.length - 1) {
        showQuestion(currentIndex + 1);
      } else if (currentIndex === questions.length - 1) {
        showDone();
      }
    });
  }

  showQuestion(0);
})();