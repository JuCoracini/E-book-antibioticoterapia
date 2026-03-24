/* =========================
   Capítulo 09 — Quiz Página 74
   ========================= */
(function initCap9Quiz() {
  const root = document.querySelector("[data-cap9-quiz]");
  if (!root) return;

  const questions = Array.from(root.querySelectorAll(".cap9-question"));
  const progressEl = root.querySelector(".cap9-quizProgress");
  const prevBtn = root.querySelector('.cap9-quizNavBtn[data-action="prev"]');
  const nextBtn = root.querySelector('.cap9-quizNavBtn[data-action="next"]');
  const doneEl = root.querySelector(".cap9-done");

  let currentIndex = 0;

  function updateProgress() {
    if (progressEl) {
      progressEl.textContent = `Questão ${currentIndex + 1} de ${questions.length}`;
    }
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === questions.length - 1;
  }

  function showQuestion(index) {
    questions.forEach((q, i) => {
      q.classList.toggle("active", i === index);
    });
    if (doneEl) doneEl.hidden = true;
    currentIndex = index;
    updateProgress();
  }

  function getQuestionState(questionEl) {
    return {
      options: Array.from(questionEl.querySelectorAll(".cap9-options button")),
      confirmBtn: questionEl.querySelector('.cap9-btn[data-action="confirm"]'),
      resetBtn: questionEl.querySelector('.cap9-btn[data-action="reset"]'),
      feedbackEl: questionEl.querySelector(".cap9-feedback"),
      rationaleTpl: questionEl.querySelector(".cap9-rationale"),
      selected: null,
      locked: false
    };
  }

  const states = new Map();
  questions.forEach((q) => states.set(q, getQuestionState(q)));

  questions.forEach((questionEl) => {
    const state = states.get(questionEl);
    if (!state) return;

    state.options.forEach((optionBtn) => {
      optionBtn.addEventListener("click", () => {
        if (state.locked) return;

        state.selected = optionBtn.dataset.answer || null;
        state.options.forEach((btn) => btn.classList.remove("is-selected"));
        optionBtn.classList.add("is-selected");

        if (state.confirmBtn) state.confirmBtn.disabled = false;
      });
    });

    if (state.confirmBtn) {
      state.confirmBtn.addEventListener("click", () => {
        if (!state.selected || state.locked) return;

        state.locked = true;

        state.options.forEach((btn) => {
          const isCorrect = btn.hasAttribute("data-correct");
          const isSelected = btn.dataset.answer === state.selected;

          if (isCorrect) btn.classList.add("is-correct");
          if (isSelected && !isCorrect) btn.classList.add("is-wrong");

          btn.disabled = true;
        });

        if (state.feedbackEl && state.rationaleTpl) {
          state.feedbackEl.innerHTML = "";
          state.feedbackEl.appendChild(state.rationaleTpl.content.cloneNode(true));
        }

        state.confirmBtn.hidden = true;
        if (state.resetBtn) state.resetBtn.hidden = false;

        const allAnswered = Array.from(states.values()).every((s) => s.locked);
        if (allAnswered && doneEl) doneEl.hidden = false;
      });
    }

    if (state.resetBtn) {
      state.resetBtn.addEventListener("click", () => {
        state.selected = null;
        state.locked = false;

        state.options.forEach((btn) => {
          btn.disabled = false;
          btn.classList.remove("is-selected", "is-correct", "is-wrong");
        });

        if (state.confirmBtn) {
          state.confirmBtn.hidden = false;
          state.confirmBtn.disabled = true;
        }

        state.resetBtn.hidden = true;

        if (state.feedbackEl) state.feedbackEl.innerHTML = "";
        if (doneEl) doneEl.hidden = true;
      });
    }
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) showQuestion(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex < questions.length - 1) showQuestion(currentIndex + 1);
    });
  }

  showQuestion(0);
})();