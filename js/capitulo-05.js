/* =========================
   Página 39 — O laboratório de microbiologia
   ========================= */
(function initCap5Page39() {
  const root = document.querySelector(".cap5-page39");
  if (!root) return;

  const triggers = Array.from(root.querySelectorAll(".cap5-p39-zoomTrigger"));
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
   Página 40 — Bacterioscopia e coloração de Gram
   ========================= */
(function initCap5Page40() {
  const root = document.querySelector(".cap5-page40");
  if (!root) return;

  const triggers = Array.from(root.querySelectorAll(".cap5-p40-scope__trigger"));
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

  /* -----------------------------------
     LIGHTBOX DA IMAGEM ESTRUTURAL
     ----------------------------------- */
  const zoomTriggers = Array.from(root.querySelectorAll(".cap5-zoomTrigger"));
  const lightbox = document.getElementById("cap5Lightbox");
  const lightboxImage = document.getElementById("cap5LightboxImage");
  const lightboxCaption = document.getElementById("cap5LightboxCaption");
  const closers = lightbox ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]")) : [];

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

  closers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox.querySelector(".cap5-lightbox__backdrop")) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  /* -----------------------------------
     INTERAÇÃO DAS ETAPAS DO GRAM
     ----------------------------------- */
  const simRoot = root.querySelector("[data-gram-sim]");
  if (!simRoot) return;

  const steps = Array.from(simRoot.querySelectorAll(".gram-step"));
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

  /* -----------------------------------
     COMPARADOR ESTRUTURAL
     ----------------------------------- */
  const structureButtons = Array.from(root.querySelectorAll(".gram-structure__btn"));
  const structureImage = document.getElementById("gram-structure-image");
  const structureName = document.getElementById("gram-structure-name");
  const structureDescription = document.getElementById("gram-structure-description");

  const structureData = {
    positivo: {
      image: "../../assets/capitulo-05/imagens/gram-positivo.png",
      alt: "Estrutura de bactéria Gram-positiva",
      name: "Gram-positivas",
      description: "Apresentam camada espessa de peptidoglicano e ausência de membrana externa. Essa organização favorece a retenção do complexo cristal violeta–iodo após a etapa de descoloração."
    },
    negativo: {
      image: "../../assets/capitulo-05/imagens/gram-negativo.png",
      alt: "Estrutura de bactéria Gram-negativa",
      name: "Gram-negativas",
      description: "Apresentam camada delgada de peptidoglicano e membrana externa. Essa organização facilita a perda do complexo cristal violeta–iodo durante a descoloração e permite a coloração final pela safranina."
    }
  };

  function swapStructureImage(el, newSrc, newAlt) {
    el.classList.add("is-switching");
    window.setTimeout(() => {
      el.src = newSrc;
      if (newAlt) el.alt = newAlt;
    }, 110);
    window.setTimeout(() => {
      el.classList.remove("is-switching");
    }, 220);
  }

  function renderStructure(key) {
    const item = structureData[key];
    if (!item || !structureImage || !structureName || !structureDescription) return;

    structureButtons.forEach((btn) => {
      const active = btn.dataset.structure === key;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    swapStructureImage(structureImage, item.image, item.alt);
    structureName.textContent = item.name;
    structureDescription.textContent = item.description;
  }

  structureButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      renderStructure(btn.dataset.structure);
    });
  });

  renderStep(0);
  renderStructure("positivo");
})();
/* =========================
   Página 42 — Leitura inicial do campo microscópico
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
   Página 44 — Identificação bacteriana (continuação)
   ========================= */
(function initCap5Page44() {
  const root = document.querySelector(".cap5-page44");
  if (!root) return;
})();
/* =========================
   Página 45 — Teste de sensibilidade
   ========================= */
(function initCap5Page45() {
  const root = document.querySelector(".cap5-page45");
  if (!root) return;

  const plate = document.getElementById("discPlate");
  const bacteriaLayer = document.getElementById("discBacteria");
  const gradient = document.getElementById("discGradient");
  const halo = document.getElementById("discHalo");
  const ruler = document.getElementById("discRuler");

  const pill = document.getElementById("disc-pill");
  const title = document.getElementById("disc-title");
  const text = document.getElementById("disc-text");

  const prevBtn = document.getElementById("disc-prev");
  const nextBtn = document.getElementById("disc-next");
  const resetBtn = document.getElementById("disc-reset");

  if (!plate || !bacteriaLayer || !gradient || !halo || !ruler || !pill || !title || !text || !prevBtn || !nextBtn || !resetBtn) {
    return;
  }

  const steps = [
    {
      pill: "Etapa 1",
      title: "Placa inoculada",
      text: "A bactéria isolada é distribuída sobre a superfície do ágar, criando um crescimento potencialmente uniforme no meio sólido.",
      gradientSize: 0,
      gradientOpacity: 0,
      haloSize: 0,
      haloOpacity: 0,
      hideInsideHalo: false,
      showRuler: false
    },
    {
      pill: "Etapa 2",
      title: "Difusão do antibacteriano",
      text: "O disco libera o antibacteriano, que se difunde radialmente no ágar. A concentração é maior próximo ao disco e diminui progressivamente com a distância.",
      gradientSize: 64,
      gradientOpacity: 1,
      haloSize: 0,
      haloOpacity: 0,
      hideInsideHalo: false,
      showRuler: false
    },
    {
      pill: "Etapa 3",
      title: "Crescimento bacteriano",
      text: "Fora da região de maior atividade do antibacteriano, o crescimento bacteriano torna-se visível no meio inoculado.",
      gradientSize: 68,
      gradientOpacity: 1,
      haloSize: 0,
      haloOpacity: 0,
      hideInsideHalo: false,
      showRuler: false
    },
    {
      pill: "Etapa 4",
      title: "Formação do halo",
      text: "Se a bactéria for suscetível, ocorre inibição do crescimento ao redor do disco, originando uma zona clara chamada halo de inibição.",
      gradientSize: 68,
      gradientOpacity: .82,
      haloSize: 46,
      haloOpacity: 1,
      hideInsideHalo: true,
      showRuler: false
    },
    {
      pill: "Etapa 5",
      title: "Leitura em milímetros",
      text: "Após a incubação, o diâmetro do halo é medido em milímetros. Esse valor será comparado a tabelas interpretativas específicas.",
      gradientSize: 68,
      gradientOpacity: .72,
      haloSize: 46,
      haloOpacity: 1,
      hideInsideHalo: true,
      showRuler: true
    }
  ];

  let currentStep = 0;
  let bugs = [];

  function randomInCircle() {
    const theta = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * 44;
    return {
      x: 50 + Math.cos(theta) * radius,
      y: 50 + Math.sin(theta) * radius
    };
  }

  function buildBacteria(count = 110) {
    bacteriaLayer.innerHTML = "";
    bugs = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "cap5-p45-bug";
      const point = randomInCircle();
      el.style.left = `${point.x}%`;
      el.style.top = `${point.y}%`;
      bacteriaLayer.appendChild(el);
      bugs.push({ el, ...point });
    }
  }

  function setBacteriaVisibility(hideInsideHalo, haloPercent) {
    const radiusPercent = haloPercent / 2;
    bugs.forEach((bug) => {
      const dx = bug.x - 50;
      const dy = bug.y - 50;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const inside = distance < radiusPercent * 0.84;
      bug.el.classList.toggle("is-hidden", hideInsideHalo && inside);
    });
  }

  function renderStep(index) {
    const step = steps[index];
    if (!step) return;
    currentStep = index;

    pill.textContent = step.pill;
    title.textContent = step.title;
    text.textContent = step.text;

    gradient.style.width = `${step.gradientSize}%`;
    gradient.style.opacity = String(step.gradientOpacity);

    halo.style.width = `${step.haloSize}%`;
    halo.style.opacity = String(step.haloOpacity);

    ruler.style.opacity = step.showRuler ? "1" : "0";

    setBacteriaVisibility(step.hideInsideHalo, step.haloSize);

    prevBtn.disabled = currentStep === 0;
    nextBtn.disabled = currentStep === steps.length - 1;
  }

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) renderStep(currentStep - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) renderStep(currentStep + 1);
  });

  resetBtn.addEventListener("click", () => {
    renderStep(0);
  });

  buildBacteria();
  renderStep(0);
})();
/* =========================
   Página 46 — Microdiluição em caldo e determinação da CIM
   ========================= */
(function initCap5Page46() {
  const root = document.querySelector(".cap5-page46");
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
   Página 47 — Breakpoints e categorias interpretativas
   ========================= */
(function initCap5Page47() {
  const root = document.querySelector(".cap5-page47");
  if (!root) return;
})();
/* =========================
   Página 48 — Observações do laudo que modificam a interpretação
   ========================= */
(function initCap5Page48() {
  const root = document.querySelector(".cap5-page48");
  if (!root) return;

  const triggers = Array.from(root.querySelectorAll(".cap5-p48-zoomTrigger"));
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
   Página 49 — Mecanismos que modificam a leitura do laudo
   ========================= */
(function initCap5Page49() {
  const root = document.querySelector(".cap5-page49");
  if (!root) return;

  const triggers = Array.from(root.querySelectorAll(".cap5-p49-zoomTrigger"));
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