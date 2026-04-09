/* =========================
   PÁGINA 20 — RESISTÊNCIA COMO FENÔMENO ADAPTATIVO
   ========================= */

(function initPage20Resistance(){
  const root = document.querySelector(".cap3-page20");
  if(!root) return;

  /*
    Página 20 segue o padrão global do projeto.
    - Zoom da imagem: app.js
    - Paginação: app.js
    Não há interação específica local nesta página.
  */
})();
/* =========================
   PÁGINA 21 — RESISTÊNCIA INTRÍNSECA X ADQUIRIDA
   ========================= */

(function initPage21ResistanceTypes(){
  const root = document.querySelector(".cap3-page21");
  if(!root) return;

  })();
/* =========================
   PÁGINA 22 — MUTAÇÕES E SELEÇÃO CLONAL
   ========================= */

(function initPage22Mutations(){
  const root = document.querySelector(".cap3-page22");
  if(!root) return;

})();
/* =========================
   PÁGINA 23 — TRANSFERÊNCIA HORIZONTAL DE GENES
   ========================= */

(function initPage23HGT(){
  const root = document.querySelector(".cap3-page23");
  if(!root) return;

})();
/* =========================
   PÁGINA 24 — β-LACTAMASES
   ========================= */

(function initPage24BetaLactamase(){
  const root = document.querySelector(".cap3-page24");
  if(!root) return;

})();
/* =========================
   PÁGINA 25 — ALTERAÇÃO DO ALVO MOLECULAR
   ========================= */

(function initPage25TargetModification(){
  const root = document.querySelector(".cap3-page25");
  if(!root) return;

 })();
/* =========================
   PÁGINA 26 — REDUÇÃO DE PERMEABILIDADE E BOMBAS DE EFLUXO
   ========================= */

(function initPage26PermeabilityEfflux(){
  const root = document.querySelector(".cap3-page26");
  if(!root) return;

  })();
/* =========================
   PÁGINA 27 — RELAÇÃO ENTRE MECANISMO DE AÇÃO E RESISTÊNCIA
   ========================= */

(function initPage27TacticalCorrespondence(){
  const root = document.querySelector(".cap3-page27");
  if(!root) return;

  const spotlight = root.querySelector("#cap3P27Spotlight");
  const progress = root.querySelector("#cap3P27Progress");
  const dots = progress ? Array.from(progress.querySelectorAll(".cap3-p27-progress__dot")) : [];
  const label = progress ? progress.querySelector(".cap3-p27-progress__label") : null;

  if(!spotlight) return;

  let step = 0;
  const stepClasses = ["is-step-1", "is-step-2", "is-step-3"];

  function clearSteps(){
    stepClasses.forEach((cls) => root.classList.remove(cls));
  }

  function syncProgress(current){
    if(!dots.length || !label) return;

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === current - 1);
    });

    label.textContent = current === 0 ? "Clique para iniciar" : `Etapa ${current} de 3`;
  }

  function advanceStep(){
    if(step === 0){
      step = 1;
      clearSteps();
      root.classList.add("is-step-1");
      syncProgress(1);
      return;
    }

    if(step === 1){
      step = 2;
      clearSteps();
      root.classList.add("is-step-2");
      syncProgress(2);
      return;
    }

    if(step === 2){
      step = 3;
      clearSteps();
      root.classList.add("is-step-3");
      syncProgress(3);
      return;
    }

    step = 0;
    clearSteps();
    syncProgress(0);
  }

  spotlight.addEventListener("click", advanceStep);

  clearSteps();
  syncProgress(0);
})();
/* =========================
   PÁGINA 28 — RESISTÊNCIA CRUZADA, MULTIRRESISTÊNCIA E IMPACTO CLÍNICO
   ========================= */

(function initPage28ResistancePatterns(){
  const root = document.querySelector(".cap3-page28");
  if(!root) return;

  const cycleButton = root.querySelector("#cap3P28CycleButton");
  if(!cycleButton) return;

  let step = 0;
  const stepClasses = ["step1", "step2", "step3", "step4"];

  function clearSteps(){
    stepClasses.forEach((cls) => root.classList.remove(cls));
  }

  function advanceCycle(){
    step += 1;

    if(step > 4){
      step = 0;
      clearSteps();
      return;
    }

    clearSteps();
    root.classList.add(`step${step}`);
  }

  cycleButton.addEventListener("click", advanceCycle);

  clearSteps();

  /*
    O zoom das imagens e a paginação seguem o padrão global via app.js.
  */
})();
/* =========================
   PÁGINA 29 — QUIZ DE REVISÃO
   ========================= */

(function initPage29Quiz(){
  const root = document.querySelector("[data-cap3-p29]");
  if(!root) return;

  const questions = Array.from(root.querySelectorAll(".cap3-p29Question"));
  const statusValue = root.querySelector(".cap3-p29Status__value");
  const completion = root.querySelector("[data-p29-completion]");
  const closingBlock = root.querySelector(".cap3-p29ClosingBlock");

  const state = new Map();

  function getCompletedCount(){
    let total = 0;
    questions.forEach((question) => {
      if(state.get(question)?.completed) total += 1;
    });
    return total;
  }

  function updateStatus(){
    const completed = getCompletedCount();
    if(statusValue){
      statusValue.textContent = `${completed} de ${questions.length} situações confirmadas`;
    }

    const allDone = completed === questions.length;

    if(completion){
      completion.hidden = !allDone;
    }

    if(closingBlock){
      closingBlock.hidden = allDone;
    }
  }

  function buildFeedback(container, type, title, text){
    container.dataset.type = type;
    container.innerHTML = `
      <p class="cap3-p29FeedbackTitle">${title}</p>
      <p class="cap3-p29FeedbackText">${text}</p>
    `;
  }

  function clearFeedback(container){
    container.removeAttribute("data-type");
    container.innerHTML = "";
  }

  questions.forEach((question) => {
    const options = Array.from(question.querySelectorAll(".cap3-p29Options button"));
    const confirmBtn = question.querySelector('[data-p29-action="confirm"]');
    const resetBtn = question.querySelector('[data-p29-action="reset"]');
    const feedback = question.querySelector(".cap3-p29Feedback");
    const feedbackMapTemplate = question.querySelector(".cap3-p29FeedbackMap");

    let feedbackMap = {};
    try {
      feedbackMap = JSON.parse(feedbackMapTemplate.innerHTML.trim());
    } catch (_) {
      feedbackMap = {};
    }

    state.set(question, {
      selected: null,
      completed: false
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        const questionState = state.get(question);
        if(questionState.completed) return;

        options.forEach((btn) => btn.classList.remove("is-selected"));
        option.classList.add("is-selected");

        questionState.selected = option.dataset.answer;
        if(confirmBtn) confirmBtn.disabled = false;
      });
    });

    confirmBtn?.addEventListener("click", () => {
      const questionState = state.get(question);
      if(!questionState.selected) return;

      const selected = questionState.selected;
      const option = options.find((btn) => btn.dataset.answer === selected);
      const isCorrect = option?.hasAttribute("data-correct");
      const payload = feedbackMap[selected];

      options.forEach((btn) => {
        btn.disabled = true;
        btn.classList.remove("is-selected");
        if(btn === option){
          btn.classList.add(isCorrect ? "is-correct" : "is-error");
        }
        if(btn.hasAttribute("data-correct")){
          btn.classList.add("is-correct");
        }
      });

      if(payload && feedback){
        buildFeedback(feedback, payload.type, payload.title, payload.text);
      }

      questionState.completed = true;
      if(confirmBtn) confirmBtn.hidden = true;
      if(resetBtn) resetBtn.hidden = false;

      updateStatus();
    });

    resetBtn?.addEventListener("click", () => {
      const questionState = state.get(question);
      questionState.selected = null;
      questionState.completed = false;

      options.forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove("is-selected", "is-correct", "is-error");
      });

      clearFeedback(feedback);

      if(confirmBtn){
        confirmBtn.hidden = false;
        confirmBtn.disabled = true;
      }
      if(resetBtn){
        resetBtn.hidden = true;
      }

      updateStatus();
    });
  });

  updateStatus();
})();