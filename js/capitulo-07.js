/* =========================
   PÁGINA 64 — RACIOCÍNIO
   ========================= */

(function initPage64Flow(){

  const root = document.querySelector("[data-cap7-p64]");
  if(!root) return;

  const steps = root.querySelectorAll(".cap7-p64-step");
  const panes = root.querySelectorAll(".cap7-p64-pane");

  function activate(step){

    steps.forEach(btn=>{
      const active = btn.dataset.step === step;
      btn.classList.toggle("is-active", active);
    });

    panes.forEach(pane=>{
      const active = pane.dataset.pane === step;
      pane.hidden = !active;
      pane.classList.toggle("is-active", active);
    });
  }

  steps.forEach(btn=>{
    btn.addEventListener("click", ()=> activate(btn.dataset.step));
  });

})();
/* =====================================================
   CAPÍTULO 07 — JS
   PÁGINA 65
   ===================================================== */

/* =========================
   LIGHTBOX CAPÍTULO 7
   ========================= */

(function initCap7Lightbox(){
  const lightbox = document.getElementById("cap7Lightbox");
  const img = document.getElementById("cap7LightboxImage");
  const caption = document.getElementById("cap7LightboxCaption");

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
    const trigger = e.target.closest(".cap7-zoomTrigger");
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
   PÁGINA 65 — FLUXO CLÍNICO
   ========================= */

(function initPage65Flow(){
  const root = document.querySelector("[data-cap7-p65]");
  if(!root) return;

  const steps = Array.from(root.querySelectorAll(".cap7-p65-step"));
  const panes = Array.from(root.querySelectorAll(".cap7-p65-pane"));

  function activate(step){
    steps.forEach(btn => {
      const active = btn.dataset.step === step;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    panes.forEach(pane => {
      const active = pane.dataset.pane === step;
      pane.classList.toggle("is-active", active);
      pane.hidden = !active;
    });
  }

  steps.forEach(btn => {
    btn.addEventListener("click", () => activate(btn.dataset.step));
  });

  activate("1");
})();
/* =====================================================
   PÁGINA 67 — INIBIDORES DA VIA DO FOLATO
   ===================================================== */

(function initPage67Folato(){
  const root = document.querySelector("[data-cap7-p67]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p67-tab]"));
  const title = root.querySelector("[data-p67-title]");
  const lead = root.querySelector("[data-p67-lead]");
  const mechanism = root.querySelector("[data-p67-mechanism]");
  const clinical = root.querySelector("[data-p67-clinical]");
  const risk = root.querySelector("[data-p67-risk]");
  const summary = root.querySelector("[data-p67-summary]");

  if(!tabs.length || !title || !lead || !mechanism || !clinical || !risk || !summary) return;

  const map = {
    hematologico: {
      title: "Impacto hematológico",
      lead: "A interferência relevante na via do folato pode comprometer processos celulares dependentes de síntese de DNA, tornando a medula óssea particularmente vulnerável em exposições prolongadas.",
      mechanism: "Interferência em processos humanos dependentes da via do folato, especialmente em tecidos com alta taxa proliferativa.",
      clinical: "Anemia megaloblástica, leucopenia ou trombocitopenia.",
      risk: "Tratamento prolongado, deficiência nutricional prévia e uso concomitante de fármacos que também interferem na hematopoese.",
      summary: "A coerência fisiopatológica permanece preservada: quanto maior a dependência proliferativa do tecido, maior a vulnerabilidade quando há interferência relevante nessa via metabólica."
    },
    renal: {
      title: "Impacto renal",
      lead: "O trimetoprim pode produzir um efeito off-target renal ao atuar de modo semelhante à amilorida, interferindo em mecanismos tubulares envolvidos na homeostase eletrolítica.",
      mechanism: "Bloqueio do canal epitelial de sódio (ENaC) no túbulo distal, com redução da excreção renal de potássio.",
      clinical: "Hipercalemia, especialmente em exposições prolongadas ou em pacientes com depuração reduzida.",
      risk: "Idade avançada, insuficiência renal e uso concomitante de IECA, BRA ou espironolactona.",
      summary: "Aqui o evento adverso não decorre de toxicidade proliferativa, mas de interferência funcional em um mecanismo renal importante para o equilíbrio do potássio sérico."
    },
    cutaneo: {
      title: "Impacto cutâneo",
      lead: "Sulfonamidas podem associar-se a reações cutâneas de hipersensibilidade, geralmente nas primeiras semanas de uso, em um eixo fisiopatológico diferente do hematológico e do renal.",
      mechanism: "Resposta de hipersensibilidade relacionada ao fármaco, com potencial para manifestações mucocutâneas relevantes.",
      clinical: "Exantemas e, em situações incomuns, manifestações mucocutâneas graves.",
      risk: "Primeiras semanas de tratamento e susceptibilidade individual do hospedeiro.",
      summary: "Mesmo quando o evento adverso segue outro eixo biológico, a coerência clínica permanece: o padrão de toxicidade continua relacionado à natureza da interação entre fármaco e hospedeiro."
    }
  };

  function activate(key){
    const item = map[key];
    if(!item) return;

    tabs.forEach(tab => {
      tab.setAttribute("aria-selected", tab.dataset.p67Tab === key ? "true" : "false");
    });

    title.textContent = item.title;
    lead.textContent = item.lead;
    mechanism.textContent = item.mechanism;
    clinical.textContent = item.clinical;
    risk.textContent = item.risk;
    summary.textContent = item.summary;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.p67Tab));
  });

  activate("hematologico");
})();
/* =====================================================
   CAPÍTULO 07 — PÁGINA 68
   QUIZ DE REVISÃO
   ===================================================== */

(function initCap7Page68Quiz(){
  const root = document.querySelector("[data-cap7-p68]");
  if(!root) return;

  const questions = Array.from(root.querySelectorAll(".cap7-p68Question"));
  const done = root.querySelector(".cap7-p68Done");
  const progress = root.querySelector(".cap7-p68Progress");
  const navPrev = root.querySelector('[data-p68-action="prev"]');
  const navNext = root.querySelector('[data-p68-action="next"]');

  let current = 0;

  function parseTemplateJSON(templateEl){
    try{
      return JSON.parse(templateEl.innerHTML.trim());
    }catch(e){
      return {};
    }
  }

  function getQuestionState(question){
    return {
      options: Array.from(question.querySelectorAll(".cap7-p68Options button")),
      confirm: question.querySelector('[data-p68-action="confirm"]'),
      reset: question.querySelector('[data-p68-action="reset"]'),
      feedback: question.querySelector(".cap7-p68Feedback"),
      feedbackMap: parseTemplateJSON(question.querySelector(".cap7-p68FeedbackMap")),
      rationale: question.querySelector(".cap7-p68Rationale"),
      selected: null,
      confirmed: false
    };
  }

  const states = questions.map(getQuestionState);

  function updateProgress(){
    progress.textContent = `Questão ${current + 1} de ${questions.length}`;
    navPrev.disabled = current === 0;
    navNext.disabled = current === questions.length - 1;
  }

  function showQuestion(index){
    questions.forEach((q, i) => q.classList.toggle("active", i === index));
    current = index;
    updateProgress();
  }

  function buildFeedbackCard(type, title, text, rationaleHTML){
    const wrap = document.createElement("div");
    wrap.className = `cap7-p68FeedbackCard cap7-p68FeedbackCard--${type === "correct" ? "correct" : "error"}`;

    const titleEl = document.createElement("p");
    titleEl.className = "cap7-p68FeedbackTitle";
    titleEl.textContent = title;

    const textEl = document.createElement("p");
    textEl.className = "cap7-p68FeedbackText";
    textEl.textContent = text;

    wrap.appendChild(titleEl);
    wrap.appendChild(textEl);

    if(rationaleHTML){
      const rationaleBox = document.createElement("div");
      rationaleBox.className = "cap7-p68RationaleBox";
      rationaleBox.innerHTML = rationaleHTML;
      wrap.appendChild(rationaleBox);
    }

    return wrap;
  }

  states.forEach((state, index) => {
    state.options.forEach(option => {
      option.addEventListener("click", () => {
        if(state.confirmed) return;

        state.selected = option.dataset.answer;
        state.options.forEach(btn => btn.classList.remove("is-selected"));
        option.classList.add("is-selected");
        state.confirm.disabled = false;
      });
    });

    state.confirm.addEventListener("click", () => {
      if(!state.selected) return;

      state.confirmed = true;
      state.confirm.disabled = true;
      state.reset.hidden = false;

      state.options.forEach(btn => {
        btn.disabled = true;
        const isSelected = btn.dataset.answer === state.selected;
        const isCorrect = btn.dataset.correct === "true";

        if(isCorrect){
          btn.classList.add("is-correct");
        }
        if(isSelected && !isCorrect){
          btn.classList.add("is-error");
        }
      });

      const feedbackItem = state.feedbackMap[state.selected];
      const rationaleHTML = state.rationale ? state.rationale.innerHTML : "";
      state.feedback.innerHTML = "";
      state.feedback.appendChild(
        buildFeedbackCard(
          feedbackItem?.type || "error",
          feedbackItem?.title || "Feedback",
          feedbackItem?.text || "",
          rationaleHTML
        )
      );

      const allConfirmed = states.every(s => s.confirmed);
      if(allConfirmed && done){
        done.hidden = false;
      }
    });

    state.reset.addEventListener("click", () => {
      state.selected = null;
      state.confirmed = false;

      state.options.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove("is-selected", "is-correct", "is-error");
      });

      state.confirm.disabled = true;
      state.reset.hidden = true;
      state.feedback.innerHTML = "";

      if(done){
        done.hidden = true;
      }
    });
  });

  navPrev.addEventListener("click", () => {
    if(current > 0) showQuestion(current - 1);
  });

  navNext.addEventListener("click", () => {
    if(current < questions.length - 1) showQuestion(current + 1);
  });

  showQuestion(0);
})();