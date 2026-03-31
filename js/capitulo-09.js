/* =========================
   CAPÍTULO 9 — LIGHTBOX
   ========================= */

(function(){

  const lightbox = document.getElementById("cap9Lightbox");
  const img = document.getElementById("cap9LightboxImage");
  const caption = document.getElementById("cap9LightboxCaption");

  if(!lightbox) return;

  function open(src, alt, text){
    img.src = src;
    img.alt = alt;
    caption.textContent = text;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close(){
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function(e){

    const trigger = e.target.closest(".cap9-zoomTrigger");
    if(trigger){
      open(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
    }

    if(e.target.closest("[data-close]")){
      close();
    }

  });

})();
/* =====================================================
   CAPÍTULO 09
   LIGHTBOX — PÁGINA 77
   ===================================================== */

(function initCap9Lightbox(){
  const lightbox = document.getElementById("cap9Lightbox");
  const img = document.getElementById("cap9LightboxImage");
  const caption = document.getElementById("cap9LightboxCaption");

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
    const trigger = e.target.closest(".cap9-zoomTrigger");
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
/* =====================================================
   CAPÍTULO 09
   LIGHTBOX — PÁGINA 78
   ===================================================== */

(function initCap9Lightbox(){
  const lightbox = document.getElementById("cap9Lightbox");
  const img = document.getElementById("cap9LightboxImage");
  const caption = document.getElementById("cap9LightboxCaption");

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
    const trigger = e.target.closest(".cap9-zoomTrigger");
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
   PÁGINA 79 — FLOW
   ========================= */

(function(){

  const root = document.querySelector("[data-cap9-flow]");
  if(!root) return;

  const steps = root.querySelectorAll(".cap9-p79-step");
  const panels = root.querySelectorAll(".cap9-p79-panel");

  steps.forEach(btn=>{
    btn.addEventListener("click", ()=>{

      steps.forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const step = btn.dataset.step;

      panels.forEach(p=>{
        p.hidden = p.dataset.panel !== step;
      });

    });
  });

})();
/* =====================================================
   CAPÍTULO 09
   LIGHTBOX — PÁGINA 80
   ===================================================== */

(function initCap9Lightbox(){
  const lightbox = document.getElementById("cap9Lightbox");
  const img = document.getElementById("cap9LightboxImage");
  const caption = document.getElementById("cap9LightboxCaption");

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
    const trigger = e.target.closest(".cap9-zoomTrigger");
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
   PÁGINA 81 — QUIZ DE REVISÃO
   ========================= */

(function initPage81Quiz(){
  const root = document.querySelector("[data-cap9-p81]");
  if(!root) return;

  const questions = Array.from(root.querySelectorAll(".cap9-p81Question"));
  const done = root.querySelector(".cap9-p81Done");
  const progress = root.querySelector(".cap9-p81Progress");
  const prevBtn = root.querySelector('[data-p81-action="prev"]');
  const nextBtn = root.querySelector('[data-p81-action="next"]');

  if(!questions.length || !done || !progress || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function parseFeedbackMap(question){
    const tpl = question.querySelector(".cap9-p81FeedbackMap");
    if(!tpl) return {};
    try{
      return JSON.parse(tpl.innerHTML.trim());
    }catch(err){
      return {};
    }
  }

  function getSelected(question){
    return question.querySelector(".cap9-p81Options button.is-selected");
  }

  function getCorrect(question){
    return question.querySelector(".cap9-p81Options button[data-correct='true']");
  }

  function resetQuestion(question){
    const options = Array.from(question.querySelectorAll(".cap9-p81Options button"));
    const confirmBtn = question.querySelector('[data-p81-action="confirm"]');
    const resetBtn = question.querySelector('[data-p81-action="reset"]');
    const feedback = question.querySelector(".cap9-p81Feedback");

    options.forEach(btn => {
      btn.classList.remove("is-selected", "is-correct", "is-error");
      btn.disabled = false;
    });

    confirmBtn.disabled = true;
    resetBtn.hidden = true;
    feedback.innerHTML = "";
    feedback.hidden = true;
    question.dataset.answered = "false";
  }

  function renderFeedback(question, answerKey){
    const map = parseFeedbackMap(question);
    const item = map[answerKey];
    const feedback = question.querySelector(".cap9-p81Feedback");

    if(!item || !feedback) return;

    feedback.hidden = false;
    feedback.className = `cap9-p81Feedback cap9-p81Feedback--${item.type}`;
    feedback.innerHTML = `
      <p class="cap9-p81FeedbackTitle">${item.title}</p>
      <p class="cap9-p81FeedbackText">${item.text}</p>
    `;
  }

  function lockQuestion(question){
    const options = Array.from(question.querySelectorAll(".cap9-p81Options button"));
    const selected = getSelected(question);
    const correct = getCorrect(question);

    options.forEach(btn => {
      btn.disabled = true;
      if(btn === correct){
        btn.classList.add("is-correct");
      }
    });

    if(selected && selected !== correct){
      selected.classList.add("is-error");
    }

    question.dataset.answered = "true";
  }

  function updateNav(){
    const lastIndex = questions.length - 1;

    progress.textContent = done.hidden
      ? `Situação ${currentIndex + 1} de ${questions.length}`
      : `Quiz concluído`;

    prevBtn.disabled = currentIndex === 0 || !done.hidden;
    nextBtn.disabled = !done.hidden || currentIndex === lastIndex;
  }

  function showQuestion(index){
    currentIndex = index;

    questions.forEach((question, i) => {
      question.classList.toggle("active", i === currentIndex);
    });

    done.hidden = true;
    updateNav();
  }

  function showDone(){
    questions.forEach(question => question.classList.remove("active"));
    done.hidden = false;
    updateNav();
  }

  questions.forEach((question, index) => {
    const options = Array.from(question.querySelectorAll(".cap9-p81Options button"));
    const confirmBtn = question.querySelector('[data-p81-action="confirm"]');
    const resetBtn = question.querySelector('[data-p81-action="reset"]');

    question.dataset.answered = "false";

    options.forEach(btn => {
      btn.addEventListener("click", () => {
        if(question.dataset.answered === "true") return;

        options.forEach(opt => opt.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        confirmBtn.disabled = false;
      });
    });

    confirmBtn.addEventListener("click", () => {
      const selected = getSelected(question);
      if(!selected) return;

      const answerKey = selected.dataset.answer;
      lockQuestion(question);
      renderFeedback(question, answerKey);

      confirmBtn.disabled = true;
      resetBtn.hidden = false;
    });

    resetBtn.addEventListener("click", () => {
      resetQuestion(question);
    });
  });

  prevBtn.addEventListener("click", () => {
    if(currentIndex > 0){
      showQuestion(currentIndex - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if(currentIndex < questions.length - 1){
      showQuestion(currentIndex + 1);
    }else{
      showDone();
    }
  });

  questions.forEach(resetQuestion);
  showQuestion(0);

  // Se a usuária quiser que o último "Próxima" conclua o quiz após responder a questão 2,
  // esse observador faz isso automaticamente.
  root.addEventListener("click", (e) => {
    const question = questions[currentIndex];
    if(!question) return;

    const confirmBtn = question.querySelector('[data-p81-action="confirm"]');
    const resetBtn = question.querySelector('[data-p81-action="reset"]');

    if(
      e.target === confirmBtn &&
      currentIndex === questions.length - 1
    ){
      setTimeout(() => {
        if(question.dataset.answered === "true"){
          nextBtn.disabled = false;
        }
      }, 0);
    }

    if(e.target === resetBtn && currentIndex === questions.length - 1){
      nextBtn.disabled = true;
    }
  });

  // Se a última questão já estiver respondida e o usuário clicar em próxima, conclui
  nextBtn.addEventListener("click", () => {
    const lastQuestion = questions[questions.length - 1];
    if(
      currentIndex === questions.length - 1 &&
      lastQuestion.dataset.answered === "true"
    ){
      showDone();
    }
  });
})();