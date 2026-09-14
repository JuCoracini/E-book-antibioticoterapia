/* =========================================================
   CAPÍTULO 9 — PÁGINA 76
   CONSTRUTOR DE ORIENTAÇÃO
   ========================================================= */

(function initCap9Page76Builder() {
  "use strict";

  const root = document.querySelector(
    "[data-cap9-p76-builder]"
  );

  if (!root) {
    return;
  }

  const buttons = Array.from(
    root.querySelectorAll("[data-p76-component]")
  );

  const selectedContent = document.getElementById(
    "cap9P76SelectedContent"
  );

  const progressText = document.getElementById(
    "cap9P76ProgressText"
  );

  const progressBar = document.getElementById(
    "cap9P76ProgressBar"
  );

  const progressTrack = root.querySelector(
    ".cap9-p76-progressTrack"
  );

  const completion = document.getElementById(
    "cap9P76Completion"
  );

  const resetButton = document.getElementById(
    "cap9P76Reset"
  );

  if (
    !buttons.length ||
    !selectedContent ||
    !progressText ||
    !progressBar ||
    !progressTrack ||
    !completion ||
    !resetButton
  ) {
    return;
  }

  const components = {
    reason: {
      order: 1,
      text:
        "Explique qual condição está sendo tratada e por que o antibacteriano foi indicado — ou por que não é necessário."
    },

    instructions: {
      order: 2,
      text:
        "Informe como o medicamento deve ser utilizado e por quanto tempo, de acordo com a prescrição."
    },

    expectation: {
      order: 3,
      text:
        "Descreva a evolução esperada e esclareça que melhora, ausência de melhora ou piora precisam ser avaliadas no contexto clínico."
    },

    safety: {
      order: 4,
      text:
        "Oriente quais manifestações exigem contato, reavaliação ou atendimento imediato."
    }
  };

  const selected = new Set();

  function getSelectedItems() {
    return Array.from(selected)
      .map(function (key) {
        return {
          key: key,
          order: components[key].order,
          text: components[key].text
        };
      })
      .sort(function (first, second) {
        return first.order - second.order;
      });
  }

  function updateButtons() {
    buttons.forEach(function (button) {
      const key = button.dataset.p76Component;
      const isSelected = selected.has(key);

      button.classList.toggle(
        "is-selected",
        isSelected
      );

      button.setAttribute(
        "aria-pressed",
        String(isSelected)
      );
    });
  }

  function updatePreview() {
    const items = getSelectedItems();

    if (!items.length) {
      selectedContent.innerHTML =
        '<p class="cap9-p76-empty">' +
        "Uma prescrição entregue sem explicação pode deixar " +
        "perguntas importantes sem resposta." +
        "</p>";

      return;
    }

    selectedContent.innerHTML = items
      .map(function (item) {
        return (
          '<p class="cap9-p76-fragment">' +
            '<span class="cap9-p76-fragmentNumber">' +
              item.order +
            "</span>" +
            "<span>" +
              item.text +
            "</span>" +
          "</p>"
        );
      })
      .join("");
  }

  function updateProgress() {
    const count = selected.size;
    const total = buttons.length;
    const percentage = (count / total) * 100;

    progressText.textContent =
      count +
      " de " +
      total +
      (count === 1
        ? " componente"
        : " componentes");

    progressBar.style.width =
      percentage + "%";

    progressTrack.setAttribute(
      "aria-valuenow",
      String(count)
    );

    const isComplete = count === total;

    completion.hidden = !isComplete;
    resetButton.hidden = count === 0;
  }

  function updateInterface() {
    updateButtons();
    updatePreview();
    updateProgress();
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const key = button.dataset.p76Component;

      if (!components[key]) {
        return;
      }

      if (selected.has(key)) {
        selected.delete(key);
      } else {
        selected.add(key);
      }

      updateInterface();
    });
  });

  resetButton.addEventListener("click", function () {
    selected.clear();
    updateInterface();

    if (buttons[0]) {
      buttons[0].focus();
    }
  });

  updateInterface();
})();
/* =========================================================
   CAPÍTULO 9 — PÁGINA 77
   SIMULAÇÃO DE COMUNICAÇÃO
   ========================================================= */

(function initCap9Page77() {
  "use strict";

  const root = document.querySelector(
    "[data-cap9-p77]"
  );

  if (!root) {
    return;
  }

  const stageElement = document.getElementById(
    "cap9P77Stage"
  );

  const stageNumber = document.getElementById(
    "cap9P77StageNumber"
  );

  const stageTitle = document.getElementById(
    "cap9P77StageTitle"
  );

  const stagePrompt = document.getElementById(
    "cap9P77StagePrompt"
  );

  const optionsContainer = document.getElementById(
    "cap9P77Options"
  );

  const feedback = document.getElementById(
    "cap9P77Feedback"
  );

  const reviseButton = document.getElementById(
    "cap9P77Revise"
  );

  const nextButton = document.getElementById(
    "cap9P77Next"
  );

  const finalSection = document.getElementById(
    "cap9P77Final"
  );

  const dialogue = document.getElementById(
    "cap9P77Dialogue"
  );

  const restartButton = document.getElementById(
    "cap9P77Restart"
  );

  const progressButtons = Array.from(
    root.querySelectorAll("[data-p77-go]")
  );

  const stages = [
    {
      label: "Acolher",

      title:
        "Comece acolhendo a preocupação",

      prompt:
        "Qual resposta favorece uma conversa aberta antes da explicação técnica?",

      options: [
        {
          id: "a",

          quality: "best",

          text:
            "“Entendo que você esteja se sentindo mal e queira melhorar logo. Vamos conversar sobre o que a avaliação mostrou.”",

          feedbackTitle:
            "Boa abertura",

          feedback:
            "A resposta reconhece a preocupação sem concordar automaticamente com a solicitação. Isso reduz a sensação de que a queixa foi ignorada.",

          finalText:
            "Entendo que você esteja se sentindo mal e queira melhorar logo. Vamos conversar sobre o que a avaliação mostrou."
        },

        {
          id: "b",

          quality: "partial",

          text:
            "“O quadro é viral e, por isso, não será prescrito antibiótico.”",

          feedbackTitle:
            "Correta, mas pouco acolhedora",

          feedback:
            "A informação pode estar correta, mas encerra rapidamente a conversa e não reconhece a preocupação que motivou o pedido.",

          finalText:
            "O quadro é viral e, por isso, não será prescrito antibiótico."
        },

        {
          id: "c",

          quality: "partial",

          text:
            "“Vamos aguardar alguns dias. Se não melhorar, iniciaremos um antibiótico.”",

          feedbackTitle:
            "Pode criar uma expectativa inadequada",

          feedback:
            "A ausência de melhora não confirma, por si só, uma infecção bacteriana. Uma nova avaliação pode ser necessária, mas não deve haver promessa antecipada de prescrição.",

          finalText:
            "Vamos aguardar alguns dias. Se não melhorar, iniciaremos um antibiótico."
        }
      ]
    },

    {
      label: "Explicar",

      title:
        "Apresente o motivo da decisão",

      prompt:
        "Qual explicação traduz o raciocínio clínico sem usar linguagem excessivamente técnica?",

      options: [
        {
          id: "a",

          quality: "partial",

          text:
            "“A etiologia mais provável é viral, sem critérios clínicos de infecção bacteriana.”",

          feedbackTitle:
            "Cientificamente adequada, mas técnica",

          feedback:
            "A frase descreve o raciocínio, porém utiliza termos que podem não ser compreendidos. A explicação precisa ser traduzida sem perder a precisão.",

          finalText:
            "A etiologia mais provável é viral, sem critérios clínicos de infecção bacteriana."
        },

        {
          id: "b",

          quality: "best",

          text:
            "“Pelos sintomas e pela avaliação realizada, o quadro é compatível com uma infecção viral. O antibacteriano age contra bactérias e não aceleraria sua melhora neste momento.”",

          feedbackTitle:
            "Explicação clara e fundamentada",

          feedback:
            "A resposta relaciona a decisão aos achados do atendimento e explica por que o antibacteriano não oferece benefício naquela situação.",

          finalText:
            "Pelos sintomas e pela avaliação realizada, o quadro é compatível com uma infecção viral. O antibacteriano age contra bactérias e não aceleraria sua melhora neste momento."
        },

        {
          id: "c",

          quality: "partial",

          text:
            "“Não vou prescrever porque o uso desnecessário provoca resistência bacteriana.”",

          feedbackTitle:
            "O argumento está incompleto",

          feedback:
            "A resistência é uma consequência importante, mas a explicação deve começar pelo motivo individual: o medicamento não trata a causa provável do quadro e pode causar danos sem oferecer benefício.",

          finalText:
            "Não vou prescrever porque o uso desnecessário provoca resistência bacteriana."
        }
      ]
    },

    {
      label: "Orientar",

      title:
        "Ofereça um plano de cuidado",

      prompt:
        "Como evitar que a não prescrição seja interpretada como ausência de tratamento?",

      options: [
        {
          id: "a",

          quality: "partial",

          text:
            "“Não há necessidade de tratamento. O quadro deve melhorar sozinho.”",

          feedbackTitle:
            "A frase pode transmitir abandono",

          feedback:
            "Mesmo quando o antibacteriano não está indicado, ainda pode haver necessidade de medidas para alívio dos sintomas, acompanhamento e esclarecimento sobre a evolução esperada.",

          finalText:
            "Não há necessidade de tratamento. O quadro deve melhorar sozinho."
        },

        {
          id: "b",

          quality: "best",

          text:
            "“Vamos cuidar dos sintomas e acompanhar a evolução. Vou explicar quais medidas podem ajudar e quanto tempo esse quadro costuma durar.”",

          feedbackTitle:
            "A decisão foi acompanhada de cuidado",

          feedback:
            "A resposta mostra que não prescrever antibacteriano não significa não tratar. Há um plano voltado ao conforto, à evolução e ao acompanhamento.",

          finalText:
            "Vamos cuidar dos sintomas e acompanhar a evolução. Vou explicar quais medidas podem ajudar e quanto tempo esse quadro costuma durar."
        },

        {
          id: "c",

          quality: "partial",

          text:
            "“Faça apenas repouso e aguarde a melhora.”",

          feedbackTitle:
            "Orientação insuficiente",

          feedback:
            "Repouso pode fazer parte do cuidado, mas a orientação não informa a evolução esperada nem considera outras medidas adequadas ao quadro.",

          finalText:
            "Faça apenas repouso e aguarde a melhora."
        }
      ]
    },

    {
      label: "Acompanhar",

      title:
        "Defina critérios para reavaliação",

      prompt:
        "Qual orientação oferece uma rede de segurança mais útil?",

      options: [
        {
          id: "a",

          quality: "partial",

          text:
            "“Se piorar, procure atendimento.”",

          feedbackTitle:
            "A orientação é correta, mas vaga",

          feedback:
            "A pessoa pode não reconhecer o que significa piora. Sempre que possível, descreva manifestações relevantes e considere as condições individuais.",

          finalText:
            "Se piorar, procure atendimento."
        },

        {
          id: "b",

          quality: "best",

          text:
            "“Procure reavaliação se os sintomas piorarem, não apresentarem a evolução esperada ou surgirem sinais como dificuldade para respirar, confusão ou incapacidade de manter hidratação.”",

          feedbackTitle:
            "Plano de acompanhamento definido",

          feedback:
            "A resposta combina evolução temporal e sinais clínicos relevantes. Os critérios devem ser ajustados ao quadro e às características individuais.",

          finalText:
            "Procure reavaliação se os sintomas piorarem, não apresentarem a evolução esperada ou surgirem sinais como dificuldade para respirar, confusão ou incapacidade de manter hidratação."
        },

        {
          id: "c",

          quality: "partial",

          text:
            "“Retorne somente se a febre persistir por mais três dias.”",

          feedbackTitle:
            "Um único critério não é suficiente",

          feedback:
            "A febre pode ser relevante, mas não deve ser o único parâmetro. Piora clínica ou sinais de gravidade podem exigir reavaliação antes desse período.",

          finalText:
            "Retorne somente se a febre persistir por mais três dias."
        }
      ]
    }
  ];

  let currentStage = 0;
  const selections = new Array(stages.length).fill(null);

  function createOption(option, index) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "cap9-p77-option";
    button.dataset.optionId = option.id;

    button.innerHTML =
      '<span class="cap9-p77-optionLetter">' +
        String.fromCharCode(65 + index) +
      "</span>" +
      '<span class="cap9-p77-optionText">' +
        option.text +
      "</span>";

    button.addEventListener("click", function () {
      selectOption(option, button);
    });

    return button;
  }

  function selectOption(option, selectedButton) {
    selections[currentStage] = option;

    const optionButtons = Array.from(
      optionsContainer.querySelectorAll(
        ".cap9-p77-option"
      )
    );

    optionButtons.forEach(function (button) {
      button.disabled = true;
      button.classList.remove(
        "is-selected",
        "is-best",
        "is-partial"
      );
    });

    selectedButton.classList.add(
      "is-selected",
      option.quality === "best"
        ? "is-best"
        : "is-partial"
    );

    feedback.hidden = false;
    feedback.className =
      "cap9-p77-feedback " +
      (option.quality === "best"
        ? "is-best"
        : "is-partial");

    feedback.innerHTML =
      "<strong>" +
        option.feedbackTitle +
      "</strong>" +
      "<p>" +
        option.feedback +
      "</p>";

    reviseButton.hidden = false;
    nextButton.disabled = false;

    nextButton.textContent =
      currentStage === stages.length - 1
        ? "Concluir conversa"
        : "Próximo momento →";

    updateProgress();
  }

  function renderStage(index) {
    currentStage = index;

    const stage = stages[index];
    const existingSelection = selections[index];

    stageElement.hidden = false;
    finalSection.hidden = true;

    stageNumber.textContent =
      "Momento " +
      (index + 1) +
      " de " +
      stages.length;

    stageTitle.textContent = stage.title;
    stagePrompt.textContent = stage.prompt;

    optionsContainer.innerHTML = "";

    stage.options.forEach(function (option, optionIndex) {
      const button = createOption(
        option,
        optionIndex
      );

      optionsContainer.appendChild(button);
    });

    feedback.hidden = true;
    feedback.className = "cap9-p77-feedback";
    feedback.innerHTML = "";

    reviseButton.hidden = true;
    nextButton.disabled = true;

    if (existingSelection) {
      const selectedButton =
        optionsContainer.querySelector(
          '[data-option-id="' +
          existingSelection.id +
          '"]'
        );

      if (selectedButton) {
        selectOption(
          existingSelection,
          selectedButton
        );
      }
    }

    updateProgress();
  }

  function updateProgress() {
    progressButtons.forEach(function (button, index) {
      const hasSelection = Boolean(selections[index]);
      const isActive = index === currentStage;

      button.disabled =
        index > 0 && !selections[index - 1];

      button.classList.toggle(
        "is-complete",
        hasSelection && !isActive
      );

      button.classList.toggle(
        "is-active",
        isActive && !finalSection.hidden
      );

      if (isActive && !finalSection.hidden) {
        button.setAttribute(
          "aria-current",
          "step"
        );
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  function reviseSelection() {
    selections[currentStage] = null;

    const optionButtons = Array.from(
      optionsContainer.querySelectorAll(
        ".cap9-p77-option"
      )
    );

    optionButtons.forEach(function (button) {
      button.disabled = false;
      button.classList.remove(
        "is-selected",
        "is-best",
        "is-partial"
      );
    });

    feedback.hidden = true;
    feedback.className = "cap9-p77-feedback";
    feedback.innerHTML = "";

    reviseButton.hidden = true;
    nextButton.disabled = true;

    updateProgress();
  }

  function showFinalDialogue() {
    stageElement.hidden = true;
    finalSection.hidden = false;

    progressButtons.forEach(function (button) {
      button.classList.remove("is-active");
      button.classList.add("is-complete");
      button.removeAttribute("aria-current");
      button.disabled = false;
    });

    dialogue.innerHTML = selections
      .map(function (selection, index) {
        return (
          "<p>" +
            "<span>" +
              (index + 1) +
            "</span>" +
            "<span>" +
              selection.finalText +
            "</span>" +
          "</p>"
        );
      })
      .join("");

    finalSection.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  }

  function nextStage() {
    if (!selections[currentStage]) {
      return;
    }

    if (currentStage < stages.length - 1) {
      renderStage(currentStage + 1);
    } else {
      showFinalDialogue();
    }
  }

  function restartSimulation() {
    selections.fill(null);
    renderStage(0);

    root.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "start"
    });
  }

  progressButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.p77Go);

      if (
        Number.isInteger(index) &&
        !button.disabled
      ) {
        renderStage(index);
      }
    });
  });

  reviseButton.addEventListener(
    "click",
    reviseSelection
  );

  nextButton.addEventListener(
    "click",
    nextStage
  );

  restartButton.addEventListener(
    "click",
    restartSimulation
  );

  renderStage(0);
})();
/* =========================================================
   CAPÍTULO 9 — PÁGINA 78
   DECISÕES SOBRE A DURAÇÃO
   ========================================================= */

(function initCap9Page78() {
  "use strict";

  const root = document.querySelector(
    "[data-cap9-p78]"
  );

  if (!root) {
    return;
  }

  const cases = Array.from(
    root.querySelectorAll("[data-p78-case]")
  );

  const previousButton = document.getElementById(
    "cap9P78Previous"
  );

  const nextButton = document.getElementById(
    "cap9P78Next"
  );

  const statusText = document.getElementById(
    "cap9P78StatusText"
  );

  const statusBar = document.getElementById(
    "cap9P78StatusBar"
  );

  const statusTrack = root.querySelector(
    ".cap9-p78-statusTrack"
  );

  const completion = document.getElementById(
    "cap9P78Completion"
  );

  const restartButton = document.getElementById(
    "cap9P78Restart"
  );

  if (
    !cases.length ||
    !previousButton ||
    !nextButton ||
    !statusText ||
    !statusBar ||
    !statusTrack ||
    !completion ||
    !restartButton
  ) {
    return;
  }

  const feedbacks = {
    stop: {
      correct: false,
      title: "A melhora não define sozinha a duração",
      text:
        "A resposta clínica é importante, mas não autoriza a interrupção por conta própria. O período deve seguir a orientação prescrita, salvo mudança após reavaliação."
    },

    prescribed: {
      correct: true,
      title: "Orientação adequada",
      text:
        "A melhora pode ocorrer antes do fim do período definido. O tratamento deve ser mantido conforme a prescrição, a menos que uma reavaliação indique outra conduta."
    },

    extend: {
      correct: false,
      title: "Mais tempo não significa maior segurança",
      text:
        "Prolongar sem indicação aumenta a exposição e o risco de eventos adversos e seleção de bactérias resistentes, sem benefício assegurado."
    },

    wait: {
      correct: false,
      title: "A piora não deve aguardar obrigatoriamente o último dia",
      text:
        "A evolução clínica precisa ser acompanhada durante o tratamento. Piora ou ausência da resposta esperada pode exigir reavaliação antes do término."
    },

    change: {
      correct: false,
      title: "Não troque o tratamento por conta própria",
      text:
        "Sintomas semelhantes podem ter causas diferentes. A troca exige nova avaliação do diagnóstico, da adesão, do foco e dos resultados disponíveis."
    },

    reassess: {
      correct: true,
      title: "A evolução precisa ser reavaliada",
      text:
        "A ausência de resposta pode estar relacionada a diferentes fatores. Reavaliar é mais seguro do que simplesmente prolongar ou trocar o antibacteriano."
    },

    finishPack: {
      correct: false,
      title: "A embalagem não define a duração",
      text:
        "A quantidade fornecida pode não corresponder exatamente ao período indicado. Não se deve prolongar o tratamento apenas para esvaziar a embalagem."
    },

    save: {
      correct: false,
      title: "Sobras não devem ser guardadas para automedicação",
      text:
        "Um episódio futuro pode ter causa, gravidade e necessidade terapêutica diferentes. Reutilizar sobras impede uma avaliação adequada."
    },

    dispose: {
      correct: true,
      title: "Orientação adequada",
      text:
        "Após cumprir o período prescrito, não se deve prolongar, guardar para uso futuro ou compartilhar. O descarte deve seguir as orientações locais."
    }
  };

  const answered = new Set();
  let currentIndex = 0;

  function getCurrentCase() {
    return cases[currentIndex];
  }

  function showCase(index) {
    currentIndex = index;

    cases.forEach(function (caseElement, caseIndex) {
      const isCurrent = caseIndex === index;

      caseElement.hidden = !isCurrent;
      caseElement.classList.toggle(
        "is-active",
        isCurrent
      );
    });

    previousButton.disabled = index === 0;

    nextButton.disabled =
      !answered.has(index);

    nextButton.textContent =
      index === cases.length - 1
        ? "Concluir atividade"
        : "Próxima situação →";
  }

  function updateStatus() {
    const count = answered.size;
    const total = cases.length;
    const percentage = (count / total) * 100;

    statusText.textContent =
      count + " de " + total;

    statusBar.style.width =
      percentage + "%";

    statusTrack.setAttribute(
      "aria-valuenow",
      String(count)
    );
  }

  function answerCase(button) {
    const currentCase = getCurrentCase();
    const answer = button.dataset.p78Answer;
    const result = feedbacks[answer];

    if (!result) {
      return;
    }

    const buttons = Array.from(
      currentCase.querySelectorAll(
        "[data-p78-answer]"
      )
    );

    const feedback = currentCase.querySelector(
      ".cap9-p78-feedback"
    );

    buttons.forEach(function (option) {
      option.classList.remove(
        "is-correct",
        "is-error"
      );
    });

    button.classList.add(
      result.correct
        ? "is-correct"
        : "is-error"
    );

    feedback.hidden = false;
    feedback.className =
      "cap9-p78-feedback " +
      (result.correct
        ? "is-correct"
        : "is-error");

    feedback.innerHTML =
      "<strong>" +
        result.title +
      "</strong>" +
      "<p>" +
        result.text +
      "</p>";

    /*
     * A situação é considerada analisada mesmo quando
     * a primeira escolha não é a mais adequada. Isso
     * permite aprender com o feedback e revisar.
     */

    answered.add(currentIndex);

    nextButton.disabled = false;

    updateStatus();
  }

  cases.forEach(function (caseElement) {
    const buttons = Array.from(
      caseElement.querySelectorAll(
        "[data-p78-answer]"
      )
    );

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        answerCase(button);
      });
    });
  });

  previousButton.addEventListener(
    "click",
    function () {
      if (currentIndex > 0) {
        showCase(currentIndex - 1);
      }
    }
  );

  nextButton.addEventListener(
    "click",
    function () {
      if (!answered.has(currentIndex)) {
        return;
      }

      if (currentIndex < cases.length - 1) {
        showCase(currentIndex + 1);
        return;
      }

      completion.hidden = false;

      completion.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "nearest"
      });
    }
  );

  restartButton.addEventListener(
    "click",
    function () {
      answered.clear();
      currentIndex = 0;

      cases.forEach(function (caseElement) {
        const buttons = Array.from(
          caseElement.querySelectorAll(
            "[data-p78-answer]"
          )
        );

        const feedback = caseElement.querySelector(
          ".cap9-p78-feedback"
        );

        buttons.forEach(function (button) {
          button.classList.remove(
            "is-correct",
            "is-error"
          );
        });

        feedback.hidden = true;
        feedback.className =
          "cap9-p78-feedback";

        feedback.innerHTML = "";
      });

      completion.hidden = true;

      updateStatus();
      showCase(0);

      root.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start"
      });
    }
  );

  updateStatus();
  showCase(0);
})();

/* =========================================================
   CAPÍTULO 9 — PÁGINA 79
   ASSOCIAÇÃO ENTRE COMPORTAMENTO E PROBLEMA
   ========================================================= */

(function initCap9Page79() {
  "use strict";

  const root = document.querySelector(
    "[data-cap9-p79]"
  );

  if (!root) {
    return;
  }

  const sourceButtons = Array.from(
    root.querySelectorAll("[data-p79-source]")
  );

  const targetButtons = Array.from(
    root.querySelectorAll("[data-p79-target]")
  );

  const instruction = document.getElementById(
    "cap9P79Instruction"
  );

  const feedback = document.getElementById(
    "cap9P79Feedback"
  );

  const progressText = document.getElementById(
    "cap9P79ProgressText"
  );

  const progressBar = document.getElementById(
    "cap9P79ProgressBar"
  );

  const progressTrack = root.querySelector(
    ".cap9-p79-progressTrack"
  );

  const completion = document.getElementById(
    "cap9P79Completion"
  );

  const restartButton = document.getElementById(
    "cap9P79Restart"
  );

  if (
    !sourceButtons.length ||
    !targetButtons.length ||
    !instruction ||
    !feedback ||
    !progressText ||
    !progressBar ||
    !progressTrack ||
    !completion ||
    !restartButton
  ) {
    return;
  }

  const matches = {
    reuse: {
      target: "diagnosis",

      title:
        "Sintomas semelhantes não confirmam a mesma causa",

      text:
        "A sobra pertence a uma situação anterior. O quadro atual pode ter outra causa, inclusive não bacteriana, e precisa de uma avaliação própria."
    },

    share: {
      target: "individual",

      title:
        "A prescrição não pode ser transferida",

      text:
        "O medicamento indicado para uma pessoa pode ser inadequado para outra devido ao diagnóstico, alergias, interações, função renal, gestação e outras condições individuais."
    },

    selfmanage: {
      target: "regimen",

      title:
        "O esquema não deve ser definido pelos sintomas",

      text:
        "Escolha do medicamento, dose, intervalo e duração precisam ser adequados ao caso. Melhorar ou piorar não autoriza mudanças por conta própria."
    }
  };

  let selectedSource = null;
  const completedSources = new Set();

  function findSourceButton(key) {
    return root.querySelector(
      '[data-p79-source="' + key + '"]'
    );
  }

  function findTargetButton(key) {
    return root.querySelector(
      '[data-p79-target="' + key + '"]'
    );
  }

  function clearTemporaryStates() {
    sourceButtons.forEach(function (button) {
      if (
        !completedSources.has(
          button.dataset.p79Source
        )
      ) {
        button.classList.remove(
          "is-selected",
          "is-error"
        );

        button.setAttribute(
          "aria-pressed",
          "false"
        );
      }
    });

    targetButtons.forEach(function (button) {
      if (!button.classList.contains("is-matched")) {
        button.classList.remove(
          "is-selected",
          "is-error"
        );

        button.setAttribute(
          "aria-pressed",
          "false"
        );
      }
    });
  }

  function selectSource(button) {
    const key = button.dataset.p79Source;

    if (
      completedSources.has(key) ||
      button.disabled
    ) {
      return;
    }

    clearTemporaryStates();

    selectedSource = key;

    button.classList.add("is-selected");

    button.setAttribute(
      "aria-pressed",
      "true"
    );

    instruction.textContent =
      "Agora escolha o problema clínico relacionado a esse comportamento.";

    feedback.hidden = true;
    feedback.className = "cap9-p79-feedback";
    feedback.innerHTML = "";
  }

  function showIncorrect(targetButton) {
    targetButton.classList.add("is-error");

    feedback.hidden = false;
    feedback.className =
      "cap9-p79-feedback is-error";

    feedback.innerHTML =
      "<strong>Essa relação não é a principal.</strong>" +
      "<p>" +
        "Releia o comportamento selecionado e procure o problema que ele ignora diretamente." +
      "</p>";

    instruction.textContent =
      "Tente novamente: o comportamento permanece selecionado.";

    window.setTimeout(function () {
      targetButton.classList.remove("is-error");
    }, 450);
  }

  function completeMatch(sourceKey, targetKey) {
    const item = matches[sourceKey];
    const sourceButton = findSourceButton(sourceKey);
    const targetButton = findTargetButton(targetKey);

    completedSources.add(sourceKey);

    sourceButton.classList.remove("is-selected");
    sourceButton.classList.add("is-matched");
    sourceButton.disabled = true;

    sourceButton.setAttribute(
      "aria-pressed",
      "true"
    );

    targetButton.classList.add("is-matched");
    targetButton.disabled = true;

    targetButton.setAttribute(
      "aria-pressed",
      "true"
    );

    const targetMark = targetButton.querySelector(
      ".cap9-p79-targetMark"
    );

    if (targetMark) {
      targetMark.textContent = "✓";
    }

    feedback.hidden = false;
    feedback.className =
      "cap9-p79-feedback is-correct";

    feedback.innerHTML =
      "<strong>" +
        item.title +
      "</strong>" +
      "<p>" +
        item.text +
      "</p>";

    selectedSource = null;

    updateProgress();

    if (
      completedSources.size ===
      sourceButtons.length
    ) {
      instruction.textContent =
        "Todas as relações foram identificadas.";

      completion.hidden = false;

      completion.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "nearest"
      });
    } else {
      instruction.textContent =
        "Selecione outro comportamento para continuar.";
    }
  }

  function selectTarget(button) {
    if (button.disabled) {
      return;
    }

    if (!selectedSource) {
      instruction.textContent =
        "Primeiro selecione um comportamento na coluna da esquerda.";

      feedback.hidden = false;
      feedback.className =
        "cap9-p79-feedback is-error";

      feedback.innerHTML =
        "<strong>Comece pelo comportamento.</strong>" +
        "<p>" +
          "Depois de selecioná-lo, escolha o problema clínico correspondente." +
        "</p>";

      return;
    }

    const targetKey = button.dataset.p79Target;
    const expectedTarget =
      matches[selectedSource].target;

    if (targetKey !== expectedTarget) {
      showIncorrect(button);
      return;
    }

    completeMatch(
      selectedSource,
      targetKey
    );
  }

  function updateProgress() {
    const count = completedSources.size;
    const total = sourceButtons.length;
    const percentage = (count / total) * 100;

    progressText.textContent =
      count + " de " + total;

    progressBar.style.width =
      percentage + "%";

    progressTrack.setAttribute(
      "aria-valuenow",
      String(count)
    );
  }

  function restartActivity() {
    selectedSource = null;
    completedSources.clear();

    sourceButtons.forEach(function (button) {
      button.disabled = false;
      button.classList.remove(
        "is-selected",
        "is-matched",
        "is-error"
      );

      button.setAttribute(
        "aria-pressed",
        "false"
      );
    });

    targetButtons.forEach(function (button) {
      button.disabled = false;
      button.classList.remove(
        "is-selected",
        "is-matched",
        "is-error"
      );

      button.setAttribute(
        "aria-pressed",
        "false"
      );

      const targetMark = button.querySelector(
        ".cap9-p79-targetMark"
      );

      if (targetMark) {
        targetMark.textContent = "?";
      }
    });

    feedback.hidden = true;
    feedback.className =
      "cap9-p79-feedback";

    feedback.innerHTML = "";

    completion.hidden = true;

    instruction.textContent =
      "Selecione um comportamento para iniciar.";

    updateProgress();

    sourceButtons[0].focus();

    root.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "start"
    });
  }

  sourceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectSource(button);
    });
  });

  targetButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectTarget(button);
    });
  });

  restartButton.addEventListener(
    "click",
    restartActivity
  );

  updateProgress();
})();

/* =========================================================
   CAPÍTULO 9 — PÁGINA 80
   TRIAGEM DE EFEITOS ADVERSOS
   ========================================================= */

(function initCap9Page80() {
  "use strict";

  const root = document.querySelector(
    "[data-cap9-p80]"
  );

  if (!root) {
    return;
  }

  const symptomButtons = Array.from(
    root.querySelectorAll("[data-p80-symptom]")
  );

  const levelButtons = Array.from(
    root.querySelectorAll("[data-p80-level]")
  );

  const instruction = document.getElementById(
    "cap9P80Instruction"
  );

  const feedback = document.getElementById(
    "cap9P80Feedback"
  );

  const progressText = document.getElementById(
    "cap9P80ProgressText"
  );

  const progressBar = document.getElementById(
    "cap9P80ProgressBar"
  );

  const progressTrack = root.querySelector(
    ".cap9-p80-progressTrack"
  );

  const completion = document.getElementById(
    "cap9P80Completion"
  );

  const restartButton = document.getElementById(
    "cap9P80Restart"
  );

  if (
    !symptomButtons.length ||
    !levelButtons.length ||
    !instruction ||
    !feedback ||
    !progressText ||
    !progressBar ||
    !progressTrack ||
    !completion ||
    !restartButton
  ) {
    return;
  }

  const situations = {
    nausea: {
      level: "observe",

      title:
        "Manifestação leve e tolerável",

      text:
        "Náusea leve, sem progressão, vômitos persistentes ou dificuldade para hidratação, geralmente permite acompanhamento. Devem ser seguidas as instruções específicas do medicamento e comunicadas persistência ou piora."
    },

    discomfort: {
      level: "observe",

      title:
        "Acompanhe a evolução",

      text:
        "Desconforto leve e sem progressão pode ser acompanhado conforme as orientações recebidas. Dor importante, piora ou surgimento de outros sinais modifica a prioridade."
    },

    vomiting: {
      level: "reassess",

      title:
        "A absorção e a hidratação podem estar comprometidas",

      text:
        "Vômitos persistentes podem impedir o uso adequado do medicamento e causar desidratação. É necessário reavaliar a manifestação e o tratamento."
    },

    diarrhea: {
      level: "reassess",

      title:
        "Diarreia intensa ou persistente exige avaliação",

      text:
        "Diarreia durante ou após o uso de antibacterianos pode ter diferentes causas, incluindo infecção por Clostridioides difficile. Intensidade, persistência, febre, sangue, dor ou desidratação aumentam a urgência."
    },

    anaphylaxis: {
      level: "emergency",

      title:
        "Possível reação alérgica grave",

      text:
        "Dificuldade para respirar, aperto na garganta e edema de face, lábios ou língua podem indicar anafilaxia e exigem atendimento imediato."
    },

    severeSkin: {
      level: "emergency",

      title:
        "Possível reação cutânea grave",

      text:
        "Bolhas, descamação, dor cutânea ou lesões em mucosas podem indicar uma reação grave e exigem atendimento imediato."
    }
  };

  let selectedSymptom = null;
  const completedSymptoms = new Set();

  function findSymptomButton(key) {
    return root.querySelector(
      '[data-p80-symptom="' + key + '"]'
    );
  }

  function clearSelections() {
    symptomButtons.forEach(function (button) {
      if (
        !completedSymptoms.has(
          button.dataset.p80Symptom
        )
      ) {
        button.classList.remove(
          "is-selected",
          "is-error"
        );

        button.setAttribute(
          "aria-pressed",
          "false"
        );
      }
    });

    levelButtons.forEach(function (button) {
      button.classList.remove(
        "is-selected",
        "is-error"
      );
    });
  }

  function selectSymptom(button) {
    const key = button.dataset.p80Symptom;

    if (
      button.disabled ||
      completedSymptoms.has(key)
    ) {
      return;
    }

    clearSelections();

    selectedSymptom = key;

    button.classList.add("is-selected");

    button.setAttribute(
      "aria-pressed",
      "true"
    );

    instruction.textContent =
      "Agora indique a prioridade para essa manifestação.";

    feedback.hidden = true;
    feedback.className =
      "cap9-p80-feedback";

    feedback.innerHTML = "";
  }

  function showIncorrect(levelButton) {
    levelButton.classList.add("is-error");

    feedback.hidden = false;
    feedback.className =
      "cap9-p80-feedback is-error";

    feedback.innerHTML =
      "<strong>Essa prioridade não é a mais adequada.</strong>" +
      "<p>" +
        "Considere a intensidade, a progressão e o risco de comprometimento respiratório, desidratação ou reação cutânea grave." +
      "</p>";

    instruction.textContent =
      "Tente novamente. A manifestação continua selecionada.";

    window.setTimeout(function () {
      levelButton.classList.remove("is-error");
    }, 450);
  }

  function completeClassification(levelButton) {
    const situation =
      situations[selectedSymptom];

    const symptomButton =
      findSymptomButton(selectedSymptom);

    completedSymptoms.add(selectedSymptom);

    symptomButton.classList.remove("is-selected");
    symptomButton.classList.add("is-complete");
    symptomButton.disabled = true;

    symptomButton.setAttribute(
      "aria-pressed",
      "true"
    );

    const number = symptomButton.querySelector(
      ".cap9-p80-cardNumber"
    );

    if (number) {
      number.textContent = "✓";
    }

    levelButton.classList.add("is-selected");

    feedback.hidden = false;
    feedback.className =
      "cap9-p80-feedback is-correct";

    feedback.innerHTML =
      "<strong>" +
        situation.title +
      "</strong>" +
      "<p>" +
        situation.text +
      "</p>";

    selectedSymptom = null;

    updateProgress();

    if (
      completedSymptoms.size ===
      symptomButtons.length
    ) {
      instruction.textContent =
        "Todas as manifestações foram analisadas.";

      completion.hidden = false;

      completion.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "nearest"
      });
    } else {
      instruction.textContent =
        "Selecione outra manifestação para continuar.";
    }
  }

  function selectLevel(button) {
    if (!selectedSymptom) {
      instruction.textContent =
        "Primeiro selecione uma manifestação.";

      feedback.hidden = false;
      feedback.className =
        "cap9-p80-feedback is-error";

      feedback.innerHTML =
        "<strong>Selecione o sintoma primeiro.</strong>" +
        "<p>" +
          "Depois, indique o nível de prioridade correspondente." +
        "</p>";

      return;
    }

    const chosenLevel =
      button.dataset.p80Level;

    const correctLevel =
      situations[selectedSymptom].level;

    if (chosenLevel !== correctLevel) {
      showIncorrect(button);
      return;
    }

    completeClassification(button);
  }

  function updateProgress() {
    const count = completedSymptoms.size;
    const total = symptomButtons.length;
    const percentage = (count / total) * 100;

    progressText.textContent =
      count + " de " + total;

    progressBar.style.width =
      percentage + "%";

    progressTrack.setAttribute(
      "aria-valuenow",
      String(count)
    );
  }

  function restartActivity() {
    selectedSymptom = null;
    completedSymptoms.clear();

    symptomButtons.forEach(function (button, index) {
      button.disabled = false;

      button.classList.remove(
        "is-selected",
        "is-complete",
        "is-error"
      );

      button.setAttribute(
        "aria-pressed",
        "false"
      );

      const number = button.querySelector(
        ".cap9-p80-cardNumber"
      );

      if (number) {
        number.textContent =
          String(index + 1);
      }
    });

    levelButtons.forEach(function (button) {
      button.classList.remove(
        "is-selected",
        "is-error"
      );
    });

    instruction.textContent =
      "Selecione uma manifestação para começar.";

    feedback.hidden = true;
    feedback.className =
      "cap9-p80-feedback";

    feedback.innerHTML = "";

    completion.hidden = true;

    updateProgress();

    symptomButtons[0].focus();

    root.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "start"
    });
  }

  symptomButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectSymptom(button);
    });
  });

  levelButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectLevel(button);
    });
  });

  restartButton.addEventListener(
    "click",
    restartActivity
  );

  updateProgress();
})();




/* =========================
   PÁGINA 81 — QUIZ DE REVISÃO
   ========================= */

(function initCap9Page81Quiz() {
  "use strict";

  const root = document.querySelector("[data-cap9-p81]");

  if (!root) {
    return;
  }

  const situations = [
    {
      kicker: "Situação clínica 1",

      caseText:
        "Um paciente apresenta tosse, coriza, febre e mal-estar " +
        "há dois dias. A avaliação clínica é compatível com " +
        "infecção viral, sem sinais de gravidade. Ao saber que " +
        "não receberá antibacteriano, ele responde: “Então não " +
        "há nada que possa ser feito? Tenho medo de piorar.”",

      prompt:
        "Qual resposta comunica melhor a decisão clínica e " +
        "mantém o paciente envolvido no cuidado?",

      correct: "b",

      options: [
        {
          id: "a",
          text:
            "“Não é necessário antibiótico porque o seu quadro " +
            "não é grave. Aguarde em casa e retorne apenas se " +
            "não melhorar.”"
        },
        {
          id: "b",
          text:
            "“Pelos seus sintomas e pelo exame, o quadro parece " +
            "viral, e antibacterianos não agem contra vírus. " +
            "Vamos tratar os sintomas e, se houver falta de ar, " +
            "febre persistente ou piora progressiva, você deve " +
            "procurar reavaliação.”"
        },
        {
          id: "c",
          text:
            "“Podemos usar um antibacteriano por poucos dias para " +
            "evitar que o quadro viral se transforme em uma " +
            "infecção bacteriana.”"
        }
      ],

      feedback: {
        a:
          "A resposta informa que o medicamento não será usado, " +
          "mas não explica adequadamente o motivo, não apresenta " +
          "um plano claro para os sintomas e oferece pouca " +
          "orientação sobre sinais de alerta.",

        b:
          "A resposta traduz a justificativa técnica em linguagem " +
          "compreensível, oferece um plano de cuidado e informa " +
          "quando procurar reavaliação. Isso reduz a sensação de " +
          "omissão e fortalece a participação do paciente.",

        c:
          "Antibacterianos não tratam infecções virais nem devem " +
          "ser usados preventivamente sem indicação. Um esquema " +
          "curto e desnecessário ainda pode causar eventos adversos, " +
          "alterar a microbiota e selecionar resistência."
      }
    },

    {
      kicker: "Situação clínica 2",

      caseText:
        "Uma paciente recebeu prescrição de antibacteriano por " +
        "cinco dias para uma infecção bacteriana. No terceiro dia, " +
        "está melhor e pergunta se pode interromper o medicamento. " +
        "Ela também percebeu que a embalagem contém comprimidos " +
        "suficientes para sete dias.",

      prompt:
        "Qual orientação evita tanto a interrupção precoce quanto " +
        "o prolongamento desnecessário?",

      correct: "c",

      options: [
        {
          id: "a",
          text:
            "“Como os sintomas melhoraram, você pode interromper " +
            "agora e guardar os comprimidos restantes para uma " +
            "situação futura.”"
        },
        {
          id: "b",
          text:
            "“Você deve utilizar todos os comprimidos da embalagem, " +
            "mesmo que isso ultrapasse os cinco dias definidos para " +
            "o seu tratamento.”"
        },
        {
          id: "c",
          text:
            "“Use o medicamento exatamente durante os cinco dias " +
            "prescritos. A melhora não indica interrupção por conta " +
            "própria, e os comprimidos excedentes não justificam " +
            "prolongar nem guardar o tratamento.”"
        }
      ],

      feedback: {
        a:
          "A melhora clínica pode ocorrer antes do período definido " +
          "para aquela infecção. Além disso, guardar sobras favorece " +
          "a automedicação em episódios futuros, nos quais a causa " +
          "dos sintomas pode ser diferente.",

        b:
          "A duração não deve ser determinada pelo tamanho da " +
          "embalagem. Prolongar o tratamento além do tempo indicado " +
          "pode aumentar eventos adversos, alterações da microbiota " +
          "e pressão seletiva sem benefício adicional.",

        c:
          "A orientação correta é utilizar o antibacteriano pelo " +
          "tempo especificamente definido para o caso, sem " +
          "interrupção espontânea e sem prolongamento para terminar " +
          "a embalagem. O excedente também não deve ser guardado para " +
          "automedicação."
      }
    },

    {
      kicker: "Situação clínica 3",

      caseText:
        "Antes de iniciar um antibacteriano, um paciente pergunta " +
        "o que deverá fazer caso apresente algum efeito adverso. " +
        "Ele demonstra receio de interromper um tratamento " +
        "necessário, mas também teme não reconhecer uma reação grave.",

      prompt:
        "Qual orientação oferece maior segurança sem estimular " +
        "a suspensão indevida do tratamento?",

      correct: "b",

      options: [
        {
          id: "a",
          text:
            "“Qualquer náusea ou desconforto intestinal significa " +
            "alergia. Suspenda o medicamento imediatamente ao " +
            "perceber qualquer sintoma.”"
        },
        {
          id: "b",
          text:
            "“Náusea ou desconforto leve e tolerável nem sempre " +
            "exigem suspensão imediata, mas devem ser observados. " +
            "Urticária, falta de ar, reação cutânea extensa ou " +
            "diarreia intensa exigem atendimento e reavaliação.”"
        },
        {
          id: "c",
          text:
            "“Efeitos adversos são esperados e costumam desaparecer. " +
            "Continue o tratamento em qualquer situação e procure " +
            "atendimento somente depois de terminar o esquema.”"
        }
      ],

      feedback: {
        a:
          "Nem todo efeito adverso leve representa alergia ou exige " +
          "suspensão imediata. Uma orientação excessivamente alarmista " +
          "pode provocar abandono desnecessário de um tratamento " +
          "adequadamente indicado.",

        b:
          "A orientação diferencia manifestações leves e toleráveis " +
          "de sinais que exigem avaliação rápida. Essa distinção " +
          "favorece a continuidade segura do tratamento e o " +
          "reconhecimento precoce de possíveis eventos graves.",

        c:
          "Reações graves não devem ser minimizadas nem aguardar o " +
          "fim do tratamento. Urticária, dificuldade respiratória, " +
          "reações cutâneas extensas ou diarreia intensa e persistente " +
          "exigem comunicação e reavaliação sem demora."
      }
    }
  ];

  const progress =
    root.querySelector("[data-p81-progress]");

  const dots = Array.from(
    root.querySelectorAll(".cap9-p81Dots span")
  );

  const kicker =
    root.querySelector("[data-p81-kicker]");

  const caseText =
    root.querySelector("[data-p81-case]");

  const prompt =
    root.querySelector("[data-p81-prompt]");

  const options =
    root.querySelector("[data-p81-options]");

  const confirmButton =
    root.querySelector("[data-p81-confirm]");

  const resetButton =
    root.querySelector("[data-p81-reset]");

  const feedback =
    root.querySelector("[data-p81-feedback]");

  const previousButton =
    root.querySelector("[data-p81-prev]");

  const nextButton =
    root.querySelector("[data-p81-next]");

  const responses = situations.map(function () {
    return {
      selected: null,
      confirmed: false
    };
  });

  let currentIndex = 0;

  function renderOptions() {
    const situation = situations[currentIndex];
    const response = responses[currentIndex];

    options.innerHTML = "";

    situation.options.forEach(function (
      option,
      optionIndex
    ) {
      const button = document.createElement("button");
      const letter = document.createElement("span");
      const text = document.createElement("span");

      button.type = "button";
      button.dataset.option = option.id;
      button.setAttribute("aria-pressed", "false");

      letter.className = "cap9-p81Letter";
      letter.textContent =
        String.fromCharCode(65 + optionIndex);

      text.textContent = option.text;

      if (response.selected === option.id) {
        button.classList.add("is-selected");
        button.setAttribute("aria-pressed", "true");
      }

      button.appendChild(letter);
      button.appendChild(text);

      button.addEventListener("click", function () {
        selectOption(option.id);
      });

      options.appendChild(button);
    });
  }

  function selectOption(optionId) {
    const response = responses[currentIndex];

    if (response.confirmed) {
      return;
    }

    response.selected = optionId;

    const buttons =
      options.querySelectorAll("button");

    buttons.forEach(function (button) {
      const isSelected =
        button.dataset.option === optionId;

      button.classList.toggle(
        "is-selected",
        isSelected
      );

      button.setAttribute(
        "aria-pressed",
        isSelected ? "true" : "false"
      );
    });

    confirmButton.disabled = false;
  }

  function updateStatus() {
    progress.textContent =
      "Situação " +
      (currentIndex + 1) +
      " de " +
      situations.length;

    dots.forEach(function (dot, index) {
      dot.classList.toggle(
        "is-active",
        index === currentIndex
      );

      dot.classList.toggle(
        "is-complete",
        responses[index].confirmed
      );
    });
  }

  function updateNavigation() {
    const response = responses[currentIndex];
    const isLast =
      currentIndex === situations.length - 1;

    previousButton.disabled =
      currentIndex === 0;

    if (isLast) {
      nextButton.disabled = true;
      nextButton.textContent = "Última situação";
    } else {
      nextButton.disabled = !response.confirmed;
      nextButton.textContent = "Próxima situação →";
    }
  }

  function showConfirmedState() {
    const situation = situations[currentIndex];
    const response = responses[currentIndex];

    const buttons =
      options.querySelectorAll("button");

    const isCorrect =
      response.selected === situation.correct;

    buttons.forEach(function (button) {
      button.disabled = true;

      if (
        button.dataset.option === situation.correct
      ) {
        button.classList.add("is-correct");
      }

      if (
        button.dataset.option === response.selected &&
        button.dataset.option !== situation.correct
      ) {
        button.classList.add("is-error");
      }
    });

    feedback.className =
      "cap9-p81Feedback is-visible " +
      (isCorrect ? "is-correct" : "is-error");

    feedback.innerHTML = "";

    const title = document.createElement("strong");
    const explanation = document.createElement("p");

    title.textContent = isCorrect
      ? "Comunicação adequada"
      : "Reavalie a orientação";

    explanation.textContent =
      situation.feedback[response.selected];

    feedback.appendChild(title);
    feedback.appendChild(explanation);

    confirmButton.hidden = true;
    resetButton.hidden = false;
  }

  function render() {
    const situation = situations[currentIndex];
    const response = responses[currentIndex];

    kicker.textContent = situation.kicker;
    caseText.textContent = situation.caseText;
    prompt.textContent = situation.prompt;

    feedback.className = "cap9-p81Feedback";
    feedback.innerHTML = "";

    confirmButton.hidden = false;
    confirmButton.disabled = !response.selected;
    resetButton.hidden = true;

    renderOptions();
    updateStatus();
    updateNavigation();

    if (response.confirmed) {
      showConfirmedState();
      updateNavigation();
    }
  }

  confirmButton.addEventListener(
    "click",
    function () {
      const response = responses[currentIndex];

      if (
        !response.selected ||
        response.confirmed
      ) {
        return;
      }

      response.confirmed = true;

      showConfirmedState();
      updateStatus();
      updateNavigation();
    }
  );

  resetButton.addEventListener(
    "click",
    function () {
      responses[currentIndex] = {
        selected: null,
        confirmed: false
      };

      render();
    }
  );

  previousButton.addEventListener(
    "click",
    function () {
      if (currentIndex === 0) {
        return;
      }

      currentIndex -= 1;
      render();
    }
  );

  nextButton.addEventListener(
    "click",
    function () {
      if (
        !responses[currentIndex].confirmed ||
        currentIndex === situations.length - 1
      ) {
        return;
      }

      currentIndex += 1;
      render();
    }
  );

  render();
})();