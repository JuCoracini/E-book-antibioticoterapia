/* =====================================================
   CAPÍTULO 09 — BLOCO DE SUBSTITUIÇÃO JS
   ===================================================== */

(function initCapitulo09(){
  initCap9Lightbox();
  initCap9Page79Flow();
  initCap9Page81Quiz();

  function initCap9Lightbox(){
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
  }

  function initCap9Page79Flow(){
    const root = document.querySelector("[data-cap9-flow]");
    if(!root) return;

    const steps = Array.from(root.querySelectorAll(".cap9-p79-step"));
    const panels = Array.from(root.querySelectorAll(".cap9-p79-panel"));

    if(!steps.length || !panels.length) return;

    function activate(stepValue){
      steps.forEach(function(step){
        step.classList.toggle("is-active", step.dataset.step === stepValue);
      });

      panels.forEach(function(panel){
        panel.hidden = panel.dataset.panel !== stepValue;
      });
    }

    steps.forEach(function(step){
      step.addEventListener("click", function(){
        activate(step.dataset.step);
      });
    });

    const initialActive = root.querySelector(".cap9-p79-step.is-active");
    activate(initialActive ? initialActive.dataset.step : steps[0].dataset.step);
  }

  function initCap9Page81Quiz(){
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
      }catch(error){
        return {};
      }
    }

    function getOptions(question){
      return Array.from(question.querySelectorAll(".cap9-p81Options button"));
    }

    function getSelected(question){
      return question.querySelector(".cap9-p81Options button.is-selected");
    }

    function getCorrect(question){
      return question.querySelector(".cap9-p81Options button[data-correct='true']");
    }

    function resetQuestion(question){
      const options = getOptions(question);
      const confirmBtn = question.querySelector('[data-p81-action="confirm"]');
      const resetBtn = question.querySelector('[data-p81-action="reset"]');
      const feedback = question.querySelector(".cap9-p81Feedback");

      options.forEach(function(btn){
        btn.classList.remove("is-selected", "is-correct", "is-error");
        btn.disabled = false;
      });

      if(confirmBtn) confirmBtn.disabled = true;
      if(resetBtn) resetBtn.hidden = true;

      if(feedback){
        feedback.innerHTML = "";
        feedback.hidden = true;
        feedback.className = "cap9-p81Feedback";
      }

      question.dataset.answered = "false";
    }

    function renderFeedback(question, answerKey){
      const map = parseFeedbackMap(question);
      const item = map[answerKey];
      const feedback = question.querySelector(".cap9-p81Feedback");

      if(!item || !feedback) return;

      feedback.hidden = false;
      feedback.className = "cap9-p81Feedback cap9-p81Feedback--" + item.type;
      feedback.innerHTML = [
        '<p class="cap9-p81FeedbackTitle">' + item.title + "</p>",
        '<p class="cap9-p81FeedbackText">' + item.text + "</p>"
      ].join("");
    }

    function lockQuestion(question){
      const options = getOptions(question);
      const selected = getSelected(question);
      const correct = getCorrect(question);

      options.forEach(function(btn){
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
      const inDoneState = !done.hidden;

      progress.textContent = inDoneState
        ? "Quiz concluído"
        : "Situação " + (currentIndex + 1) + " de " + questions.length;

      prevBtn.disabled = inDoneState || currentIndex === 0;

      if(inDoneState){
        nextBtn.disabled = true;
        return;
      }

      const currentQuestion = questions[currentIndex];
      const isLastQuestion = currentIndex === lastIndex;
      const isAnswered = currentQuestion.dataset.answered === "true";

      nextBtn.disabled = isLastQuestion && !isAnswered;
    }

    function showQuestion(index){
      currentIndex = index;

      questions.forEach(function(question, i){
        question.classList.toggle("active", i === currentIndex);
      });

      done.hidden = true;
      updateNav();
    }

    function showDone(){
      questions.forEach(function(question){
        question.classList.remove("active");
      });

      done.hidden = false;
      updateNav();
    }

    questions.forEach(function(question){
      const options = getOptions(question);
      const confirmBtn = question.querySelector('[data-p81-action="confirm"]');
      const resetBtn = question.querySelector('[data-p81-action="reset"]');

      question.dataset.answered = "false";

      options.forEach(function(btn){
        btn.addEventListener("click", function(){
          if(question.dataset.answered === "true") return;

          options.forEach(function(opt){
            opt.classList.remove("is-selected");
          });

          btn.classList.add("is-selected");

          if(confirmBtn){
            confirmBtn.disabled = false;
          }
        });
      });

      if(confirmBtn){
        confirmBtn.addEventListener("click", function(){
          const selected = getSelected(question);
          if(!selected) return;

          lockQuestion(question);
          renderFeedback(question, selected.dataset.answer);
          confirmBtn.disabled = true;

          if(resetBtn){
            resetBtn.hidden = false;
          }

          updateNav();
        });
      }

      if(resetBtn){
        resetBtn.addEventListener("click", function(){
          resetQuestion(question);
          updateNav();
        });
      }
    });

    prevBtn.addEventListener("click", function(){
      if(currentIndex > 0){
        showQuestion(currentIndex - 1);
      }
    });

    nextBtn.addEventListener("click", function(){
      const lastIndex = questions.length - 1;
      const currentQuestion = questions[currentIndex];
      const isLastQuestion = currentIndex === lastIndex;
      const isAnswered = currentQuestion.dataset.answered === "true";

      if(isLastQuestion){
        if(isAnswered){
          showDone();
        }
        return;
      }

      showQuestion(currentIndex + 1);
    });

    questions.forEach(resetQuestion);
    showQuestion(0);
  }
})();