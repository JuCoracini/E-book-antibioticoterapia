/* =========================
   PÁGINA 20 — RESISTÊNCIA ADAPTATIVA
   ========================= */

(function initPage20Resistance(){

  const root = document.querySelector(".cap3-page20");
  if(!root) return;

  const zoomTrigger = root.querySelector(".cap3-zoomTrigger");
  const lightbox = document.getElementById("cap3Lightbox");
  const lightboxImage = document.getElementById("cap3LightboxImage");
  const lightboxCaption = document.getElementById("cap3LightboxCaption");
  const lightboxClosers = Array.from(root.querySelectorAll("[data-lightbox-close]"));

  if(!zoomTrigger || !lightbox || !lightboxImage || !lightboxCaption) return;

  function openLightbox(src, alt, captionText){
    lightboxImage.src = src || "";
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = captionText || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  zoomTrigger.addEventListener("click", () => {
    openLightbox(
      zoomTrigger.dataset.zoomimage || zoomTrigger.dataset.zoomImage,
      zoomTrigger.dataset.zoomalt || zoomTrigger.dataset.zoomAlt,
      zoomTrigger.dataset.zoomcaption || zoomTrigger.dataset.zoomCaption
    );
  });

  lightboxClosers.forEach((closer) => {
    closer.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && !lightbox.hidden){
      closeLightbox();
    }
  });

})();
/* =========================
   PÁGINA 21 — INTRÍNSECA X ADQUIRIDA
   ========================= */

(function initPage21ResistanceTypes(){

  const root = document.querySelector(".cap3-page21");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap3-p21-tab"));
  const stages = Array.from(root.querySelectorAll(".cap3-p21-stage"));

  const lightbox = document.getElementById("cap3Lightbox");
  const lightboxImage = document.getElementById("cap3LightboxImage");
  const lightboxCaption = document.getElementById("cap3LightboxCaption");
  const zoomTriggers = Array.from(root.querySelectorAll(".cap3-zoomTrigger"));
  const lightboxClosers = Array.from(root.querySelectorAll("[data-lightbox-close]"));

  if(!tabs.length || !stages.length) return;

  function activate(key){
    tabs.forEach(tab=>{
      const active = tab.dataset.p21Tab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    stages.forEach(stage=>{
      const active = stage.dataset.p21Stage === key;
      stage.classList.toggle("is-active", active);
      stage.hidden = !active;
    });
  }

  tabs.forEach(tab=>{
    tab.addEventListener("click", ()=>{
      activate(tab.dataset.p21Tab);
    });
  });

  function openLightbox(src, alt, caption){
    if(!lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxImage.src = src || "";
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    if(!lightbox || !lightboxImage || !lightboxCaption) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  zoomTriggers.forEach(trigger=>{
    trigger.addEventListener("click", ()=>{
      openLightbox(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
    });
  });

  lightboxClosers.forEach(closer=>{
    closer.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && lightbox && !lightbox.hidden){
      closeLightbox();
    }
  });

  activate("intrinseca");

})();
/* =========================
   PÁGINA 22 — MUTAÇÕES E SELEÇÃO CLONAL
   ========================= */

(function initPage22Mutations(){

  const root = document.querySelector(".cap3-page22");
  if(!root) return;

  const revealBtn = root.querySelector("#cap3P22RevealBtn");
  const tableBlock = root.querySelector("#cap3P22TableBlock");

  const accordion = root.querySelector("[data-cap3-p22-accordion]");
  const accordionTrigger = accordion ? accordion.querySelector(".cap3-p22-accordion__trigger") : null;
  const accordionContent = accordion ? accordion.querySelector(".cap3-p22-accordion__content") : null;

  const lightbox = document.getElementById("cap3Lightbox");
  const lightboxImage = document.getElementById("cap3LightboxImage");
  const lightboxCaption = document.getElementById("cap3LightboxCaption");
  const zoomTriggers = Array.from(root.querySelectorAll(".cap3-zoomTrigger"));
  const lightboxClosers = Array.from(root.querySelectorAll("[data-lightbox-close]"));

  if(revealBtn && tableBlock){
    revealBtn.addEventListener("click", () => {
      const isHidden = tableBlock.hidden;
      tableBlock.hidden = !isHidden;
      revealBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");
      revealBtn.classList.toggle("is-active", isHidden);
      revealBtn.textContent = isHidden ? "Ocultar exemplos aplicados" : "Ver exemplos aplicados";
    });
  }

  if(accordionTrigger && accordionContent){
    accordionTrigger.addEventListener("click", () => {
      const isHidden = accordionContent.hidden;
      accordionContent.hidden = !isHidden;
      accordionTrigger.setAttribute("aria-expanded", isHidden ? "true" : "false");
    });
  }

  function openLightbox(src, alt, captionText){
    if(!lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxImage.src = src || "";
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = captionText || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    if(!lightbox || !lightboxImage || !lightboxCaption) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  zoomTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      openLightbox(
        trigger.dataset.zoomimage || trigger.dataset.zoomImage,
        trigger.dataset.zoomalt || trigger.dataset.zoomAlt,
        trigger.dataset.zoomcaption || trigger.dataset.zoomCaption
      );
    });
  });

  lightboxClosers.forEach(closer => {
    closer.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && lightbox && !lightbox.hidden){
      closeLightbox();
    }
  });

})();
/* =========================
   PÁGINA 23 — TRANSFERÊNCIA HORIZONTAL DE GENES
   ========================= */

(function initPage23HGT(){

  const root = document.querySelector(".cap3-page23");
  if(!root) return;

  const buttons = Array.from(root.querySelectorAll(".cap3-p23-switch__btn"));
  const image = root.querySelector("#cap3P23Image");
  const caption = root.querySelector("#cap3P23Caption");
  const text = root.querySelector("#cap3P23Text");
  const zoomTrigger = root.querySelector("#cap3P23ZoomTrigger");

  const lightbox = document.getElementById("cap3Lightbox");
  const lightboxImage = document.getElementById("cap3LightboxImage");
  const lightboxCaption = document.getElementById("cap3LightboxCaption");
  const zoomTriggers = Array.from(root.querySelectorAll(".cap3-zoomTrigger"));
  const lightboxClosers = Array.from(root.querySelectorAll("[data-lightbox-close]"));

  if(!buttons.length || !image || !caption || !text || !zoomTrigger) return;

  const items = {
    conjugacao: {
      img: "../../assets/capitulo-03/imagens/conjugacao-plasmideo.png",
      imgAlt: "Esquema de conjugação bacteriana",
      zoomCaption: "Conjugação bacteriana: transferência direta de material genético entre bactérias viáveis por contato físico.",
      caption: "<strong>Conjugação:</strong> transferência direta de material genético entre bactérias viáveis por contato físico.",
      text: "Na conjugação, a transferência genética ocorre por contato direto entre duas bactérias viáveis. Geralmente, uma das células possui um plasmídeo conjugativo que contém genes responsáveis pela formação de uma estrutura de ligação, como o pili sexual. Esse pili estabelece conexão física entre a bactéria doadora e a receptora, formando uma ponte citoplasmática através da qual o material genético pode ser transferido. Durante o processo, o plasmídeo é replicado e uma das fitas de DNA é transferida para a célula receptora. Ao final, ambas as bactérias passam a possuir cópia do plasmídeo, o que pode modificar imediatamente o perfil de resistência da bactéria receptora."
    },
    transformacao: {
      img: "../../assets/capitulo-03/imagens/transformacao-dna-livre.png",
      imgAlt: "Esquema de transformação bacteriana por DNA livre",
      zoomCaption: "Transformação bacteriana: captação de DNA livre do ambiente por célula competente, com possível integração ao genoma.",
      caption: "<strong>Transformação:</strong> captação de DNA livre do ambiente por célula competente, com possível integração ao genoma.",
      text: "Na transformação, fragmentos de DNA livre presentes no ambiente, geralmente provenientes da lise de outras bactérias, podem ser captados por células que se encontram em estado de competência. A competência corresponde a uma condição fisiológica na qual a bactéria expressa proteínas capazes de reconhecer e internalizar DNA extracelular. Uma vez no interior da célula, esse DNA pode ser degradado ou integrar-se ao genoma bacteriano por recombinação, caso exista homologia suficiente. Quando o fragmento incorporado contém um gene de resistência funcional e adequadamente expresso, a bactéria passa a apresentar o novo fenótipo de resistência."
    },
    transducao: {
      img: "../../assets/capitulo-03/imagens/transducao-bacteriofago.png",
      imgAlt: "Esquema de transdução bacteriana mediada por bacteriófagos",
      zoomCaption: "Transdução bacteriana: transferência de DNA mediada por bacteriófagos, com introdução do material genético em nova célula.",
      caption: "<strong>Transdução:</strong> transferência de DNA mediada por bacteriófagos, com introdução do material genético em nova célula.",
      text: "Na transdução, a transferência genética ocorre mediada por bacteriófagos, vírus capazes de infectar bactérias. Durante o ciclo replicativo do fago, fragmentos de DNA bacteriano podem ser incorporados às partículas virais em formação. Quando esses vírus infectam outra bactéria, o DNA bacteriano transportado pode ser introduzido na nova célula e integrar-se ao seu genoma por recombinação. Dependendo do tipo de ciclo viral, a transdução pode ser generalizada, envolvendo diferentes fragmentos do genoma bacteriano, ou especializada, quando genes localizados próximos ao sítio de integração do fago são transferidos de forma mais específica."
    }
  };

  function render(key){
    const item = items[key];
    if(!item) return;

    buttons.forEach((button) => {
      const active = button.dataset.p23Key === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });

    image.src = item.img;
    image.alt = item.imgAlt;
    caption.innerHTML = item.caption;
    text.textContent = item.text;

    zoomTrigger.dataset.zoomImage = item.img;
    zoomTrigger.dataset.zoomAlt = item.imgAlt;
    zoomTrigger.dataset.zoomCaption = item.zoomCaption;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      render(button.dataset.p23Key);
    });
  });

  function openLightbox(src, alt, captionText){
    if(!lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxImage.src = src || "";
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = captionText || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    if(!lightbox || !lightboxImage || !lightboxCaption) return;

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
        trigger.dataset.zoomimage || trigger.dataset.zoomImage,
        trigger.dataset.zoomalt || trigger.dataset.zoomAlt,
        trigger.dataset.zoomcaption || trigger.dataset.zoomCaption
      );
    });
  });

  lightboxClosers.forEach((closer) => {
    closer.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && lightbox && !lightbox.hidden){
      closeLightbox();
    }
  });

  render("conjugacao");

})();
/* =========================
   PÁGINA 24 — β-LACTAMASES
   ========================= */

(function initPage24BetaLactamases(){

  const root = document.querySelector(".cap3-page24");
  if(!root) return;

  const zoomTrigger = root.querySelector(".cap3-zoomTrigger");
  const lightbox = document.getElementById("cap3Lightbox");
  const lightboxImage = document.getElementById("cap3LightboxImage");
  const lightboxCaption = document.getElementById("cap3LightboxCaption");
  const lightboxClosers = Array.from(root.querySelectorAll("[data-lightbox-close]"));

  if(!zoomTrigger || !lightbox || !lightboxImage || !lightboxCaption) return;

  function openLightbox(src, alt, captionText){
    lightboxImage.src = src || "";
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = captionText || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  zoomTrigger.addEventListener("click", () => {
    openLightbox(
      zoomTrigger.dataset.zoomimage || zoomTrigger.dataset.zoomImage,
      zoomTrigger.dataset.zoomalt || zoomTrigger.dataset.zoomAlt,
      zoomTrigger.dataset.zoomcaption || zoomTrigger.dataset.zoomCaption
    );
  });

  lightboxClosers.forEach((closer) => {
    closer.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && lightbox && !lightbox.hidden){
      closeLightbox();
    }
  });

})();
/* =========================
   PÁGINA 25 — LIGHTBOX
   ========================= */

(function initPage25(){

  const root = document.querySelector(".cap3-page25");
  if(!root) return;

  const zoomTrigger = root.querySelector(".cap3-zoomTrigger");
  const lightbox = document.getElementById("cap3Lightbox");
  const img = document.getElementById("cap3LightboxImage");
  const caption = document.getElementById("cap3LightboxCaption");
  const closers = root.querySelectorAll("[data-lightbox-close]");

  function open(){
    img.src = zoomTrigger.dataset.zoomimage || zoomTrigger.dataset.zoomImage;
    img.alt = zoomTrigger.dataset.zoomalt || "";
    caption.textContent = zoomTrigger.dataset.zoomcaption || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close(){
    lightbox.hidden = true;
    img.src = "";
    caption.textContent = "";
    document.body.style.overflow = "";
  }

  zoomTrigger.addEventListener("click", open);

  closers.forEach(btn => btn.addEventListener("click", close));

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && !lightbox.hidden){
      close();
    }
  });

})();
(function(){

  const root = document.querySelector(".cap3-page26");
  if(!root) return;

  const btn = root.querySelector(".cap3-p26-toggle");

  btn.addEventListener("click", ()=>{
    root.classList.toggle("is-active");
  });

})();
/* =========================
   PÁGINA 27 — RELAÇÃO ENTRE MECANISMO DE AÇÃO E RESISTÊNCIA
   ========================= */

(function initPage27TacticalCorrespondence(){

  const root = document.querySelector(".cap3-page27");
  if(!root) return;

  const spotlight = root.querySelector("#cap3P27Spotlight");
  const matrixBtn = root.querySelector("#cap3P27MatrixBtn");

  const lightbox = document.getElementById("cap3Lightbox");
  const lightboxImage = document.getElementById("cap3LightboxImage");
  const lightboxCaption = document.getElementById("cap3LightboxCaption");
  const lightboxClosers = Array.from(root.querySelectorAll("[data-lightbox-close]"));

  let step = 0;
  const stepClasses = ["is-step-1", "is-step-2", "is-step-3"];

  function clearSteps(){
    stepClasses.forEach(cls => root.classList.remove(cls));
  }

  function advanceStep(){
    step = (step + 1) % 4;
    clearSteps();

    if(step === 1) root.classList.add("is-step-1");
    if(step === 2) root.classList.add("is-step-2");
    if(step === 3) root.classList.add("is-step-3");
  }

  if(spotlight){
    spotlight.addEventListener("click", advanceStep);
  }

  function openLightbox(src, alt, caption){
    if(!lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxImage.src = src || "";
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    if(!lightbox || !lightboxImage || !lightboxCaption) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  if(matrixBtn){
    matrixBtn.addEventListener("click", () => {
      openLightbox(
        matrixBtn.dataset.zoomimage || matrixBtn.dataset.zoomImage,
        matrixBtn.dataset.zoomalt || matrixBtn.dataset.zoomAlt,
        matrixBtn.dataset.zoomcaption || matrixBtn.dataset.zoomCaption
      );
    });
  }

  lightboxClosers.forEach((closer) => {
    closer.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && lightbox && !lightbox.hidden){
      closeLightbox();
    }
  });

})();
/* =========================
   PÁGINA 28 — RESISTÊNCIA CRUZADA, MULTIRRESISTÊNCIA E IMPACTO CLÍNICO
   ========================= */

(function initPage28ResistancePatterns(){

  const root = document.querySelector(".cap3-page28");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap3-p28-switch__tab"));
  const stages = Array.from(root.querySelectorAll(".cap3-p28-switch__stage"));
  const cycleButton = root.querySelector("#cap3P28CycleButton");
  const matrixBtn = root.querySelector("#cap3P28MatrixBtn");

  const lightbox = document.getElementById("cap3Lightbox");
  const lightboxImage = document.getElementById("cap3LightboxImage");
  const lightboxCaption = document.getElementById("cap3LightboxCaption");
  const zoomTriggers = Array.from(root.querySelectorAll(".cap3-zoomTrigger"));
  const lightboxClosers = Array.from(root.querySelectorAll("[data-lightbox-close]"));

  function activateTab(key){
    tabs.forEach(tab => {
      const active = tab.dataset.p28Tab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    stages.forEach(stage => {
      const active = stage.dataset.p28Stage === key;
      stage.classList.toggle("is-active", active);
      stage.hidden = !active;
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.p28Tab);
    });
  });

  function openLightbox(src, alt, caption){
    if(!lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxImage.src = src || "";
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    if(!lightbox || !lightboxImage || !lightboxCaption) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  zoomTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      openLightbox(
        trigger.dataset.zoomimage || trigger.dataset.zoomImage,
        trigger.dataset.zoomalt || trigger.dataset.zoomAlt,
        trigger.dataset.zoomcaption || trigger.dataset.zoomCaption
      );
    });
  });

  if(matrixBtn){
    matrixBtn.addEventListener("click", () => {
      openLightbox(
        matrixBtn.dataset.zoomimage || matrixBtn.dataset.zoomImage,
        matrixBtn.dataset.zoomalt || matrixBtn.dataset.zoomAlt,
        matrixBtn.dataset.zoomcaption || matrixBtn.dataset.zoomCaption
      );
    });
  }

  lightboxClosers.forEach(closer => {
    closer.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && lightbox && !lightbox.hidden){
      closeLightbox();
    }
  });

  let cycleStep = 0;
  const cycleClasses = ["is-cycle-1", "is-cycle-2", "is-cycle-3", "is-cycle-4"];

  function clearCycle(){
    cycleClasses.forEach(cls => root.classList.remove(cls));
  }

  if(cycleButton){
    cycleButton.addEventListener("click", () => {
      cycleStep = (cycleStep + 1) % 5;
      clearCycle();

      if(cycleStep >= 1 && cycleStep <= 4){
        root.classList.add(`is-cycle-${cycleStep}`);
      }
    });
  }

  activateTab("cruzada");

})();
/* =========================
   PÁGINA 29 — QUIZ DE REVISÃO
   ========================= */

(function initPage29Quiz(){

  const root = document.querySelector("[data-cap3-p29]");
  if(!root) return;

  const questions = Array.from(root.querySelectorAll(".cap3-p29Question"));
  const progress = root.querySelector(".cap3-p29Progress");
  const doneBlock = root.querySelector(".cap3-p29Done");

  let current = 0;

  function updateProgress(){
    if(progress){
      progress.textContent = `Questão ${current + 1} de ${questions.length}`;
    }
  }

  function updateNavState(){
    const prevBtn = root.querySelector('[data-p29-action="prev"]');
    const nextBtn = root.querySelector('[data-p29-action="next"]');

    if(prevBtn) prevBtn.disabled = current === 0;
    if(nextBtn) nextBtn.disabled = current === questions.length - 1;
  }

  function showQuestion(index){
    questions.forEach((q, i) => {
      q.classList.toggle("active", i === index);
    });

    current = index;
    updateProgress();
    updateNavState();
  }

  function getQuestionState(question){
    return {
      selected: question.querySelector(".cap3-p29Options button.is-selected"),
      confirmBtn: question.querySelector('[data-p29-action="confirm"]'),
      resetBtn: question.querySelector('[data-p29-action="reset"]'),
      feedback: question.querySelector(".cap3-p29Feedback"),
      options: Array.from(question.querySelectorAll(".cap3-p29Options button")),
      feedbackMap: JSON.parse(question.querySelector(".cap3-p29FeedbackMap").innerHTML.trim()),
      rationale: question.querySelector(".cap3-p29Rationale").innerHTML.trim()
    };
  }

  questions.forEach((question, qIndex) => {
    const { confirmBtn, resetBtn, feedback, options } = getQuestionState(question);

    options.forEach(option => {
      option.addEventListener("click", () => {
        if(question.dataset.answered === "true") return;

        options.forEach(btn => btn.classList.remove("is-selected"));
        option.classList.add("is-selected");

        if(confirmBtn) confirmBtn.disabled = false;
      });
    });

    if(confirmBtn){
      confirmBtn.addEventListener("click", () => {
        const state = getQuestionState(question);
        const selected = state.selected;
        if(!selected) return;

        const answerKey = selected.dataset.answer;
        const item = state.feedbackMap[answerKey];
        const isCorrect = selected.hasAttribute("data-correct");

        question.dataset.answered = "true";

        state.options.forEach(btn => {
          btn.disabled = true;

          if(btn === selected && isCorrect){
            btn.classList.add("is-correct");
          } else if(btn === selected && !isCorrect){
            btn.classList.add("is-wrong");
          }

          if(btn.hasAttribute("data-correct")){
            btn.classList.add("is-correct");
          }
        });

        if(state.feedback){
          state.feedback.innerHTML = `
            <div class="cap3-p29FeedbackCard cap3-p29FeedbackCard--${item.type}">
              <p class="cap3-p29FeedbackTitle">${item.title}</p>
              <p class="cap3-p29FeedbackText">${item.text}</p>
              <div class="cap3-p29FeedbackText" style="margin-top:10px;">${state.rationale}</div>
            </div>
          `;
        }

        if(confirmBtn) confirmBtn.hidden = true;
        if(resetBtn) resetBtn.hidden = false;

        const allAnswered = questions.every(q => q.dataset.answered === "true");
        if(allAnswered && doneBlock){
          doneBlock.hidden = false;
        }
      });
    }

    if(resetBtn){
      resetBtn.addEventListener("click", () => {
        question.dataset.answered = "false";

        const state = getQuestionState(question);

        state.options.forEach(btn => {
          btn.disabled = false;
          btn.classList.remove("is-selected", "is-correct", "is-wrong");
        });

        if(state.feedback) state.feedback.innerHTML = "";
        if(state.confirmBtn){
          state.confirmBtn.hidden = false;
          state.confirmBtn.disabled = true;
        }
        if(state.resetBtn) state.resetBtn.hidden = true;

        if(doneBlock){
          doneBlock.hidden = true;
        }
      });
    }
  });

  root.querySelectorAll("[data-p29-action='prev']").forEach(btn => {
    btn.addEventListener("click", () => {
      if(current > 0) showQuestion(current - 1);
    });
  });

  root.querySelectorAll("[data-p29-action='next']").forEach(btn => {
    btn.addEventListener("click", () => {
      if(current < questions.length - 1) showQuestion(current + 1);
    });
  });

  showQuestion(0);

})();