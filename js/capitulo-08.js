/* =========================================================
   CAPÍTULO 8 — PÁGINA 69
   SIMULADOR DO RACIOCÍNIO EMPÍRICO
   ========================================================= */

(function initCap8Page69() {
  "use strict";

  const root = document.querySelector(
    "[data-cap8-p69]"
  );

  if (!root) {
    return;
  }

  const stageElement = document.getElementById(
    "cap8P69Stage"
  );

  const stageLabel = document.getElementById(
    "cap8P69StageLabel"
  );

  const clinicalText = document.getElementById(
    "cap8P69ClinicalText"
  );

  const question = document.getElementById(
    "cap8P69Question"
  );

  const optionsContainer = document.getElementById(
    "cap8P69Options"
  );

  const feedback = document.getElementById(
    "cap8P69Feedback"
  );

  const reviseButton = document.getElementById(
    "cap8P69Revise"
  );

  const nextButton = document.getElementById(
    "cap8P69Next"
  );

  const progressText = document.getElementById(
    "cap8P69ProgressText"
  );

  const progressBar = document.getElementById(
    "cap8P69ProgressBar"
  );

  const progressTrack = root.querySelector(
    ".cap8-p69-progressTrack"
  );

  const progressSteps = Array.from(
    root.querySelectorAll(
      ".cap8-p69-progressSteps span"
    )
  );

  const finalSection = document.getElementById(
    "cap8P69Final"
  );

  const restartButton = document.getElementById(
    "cap8P69Restart"
  );

  if (
    !stageElement ||
    !stageLabel ||
    !clinicalText ||
    !question ||
    !optionsContainer ||
    !feedback ||
    !reviseButton ||
    !nextButton ||
    !progressText ||
    !progressBar ||
    !progressTrack ||
    !finalSection ||
    !restartButton
  ) {
    return;
  }

  const stages = [
    {
      clinical:
        "Pessoa hospitalizada apresenta febre, taquicardia e mal-estar.",

      question:
        "Essas manifestações confirmam uma infecção bacteriana?",

      options: [
        {
          text:
            "Sim. A associação entre febre e taquicardia é suficiente para confirmar a etiologia bacteriana.",

          quality: "partial",

          title:
            "Os achados são inespecíficos",

          feedback:
            "Febre e taquicardia aumentam a suspeita, mas também podem ocorrer em processos virais, inflamatórios ou outras condições não infecciosas."
        },

        {
          text:
            "Não. Os achados aumentam a suspeita, mas precisam ser integrados à história, ao exame físico e aos exames disponíveis.",

          quality: "correct",

          title:
            "A probabilidade ainda precisa ser construída",

          feedback:
            "A terapia empírica começa pela avaliação da probabilidade de infecção bacteriana. Um achado isolado raramente confirma a causa."
        },

        {
          text:
            "Não. Na ausência da identificação microbiológica, nenhum tratamento empírico pode ser iniciado.",

          quality: "partial",

          title:
            "A confirmação microbiológica nem sempre está disponível no início",

          feedback:
            "Em situações com probabilidade relevante e maior gravidade, pode ser necessário iniciar tratamento antes da identificação, utilizando os melhores dados disponíveis."
        }
      ]
    },

    {
      clinical:
        "A avaliação identifica dor abdominal localizada e a imagem demonstra uma coleção intra-abdominal.",

      question:
        "Qual é a principal contribuição dessa nova informação?",

      options: [
        {
          text:
            "Define o foco provável e modifica a estimativa dos microrganismos envolvidos.",

          quality: "correct",

          title:
            "O foco organiza o raciocínio microbiológico",

          feedback:
            "O sítio anatômico modifica os microrganismos prováveis, a necessidade de cobertura e a avaliação de possíveis intervenções."
        },

        {
          text:
            "Confirma qual espécie bacteriana está causando a infecção.",

          quality: "partial",

          title:
            "O foco não identifica a espécie",

          feedback:
            "A localização ajuda a estimar os microrganismos mais prováveis, mas não substitui a identificação microbiológica."
        },

        {
          text:
            "Define sozinho qual antibacteriano deve ser utilizado.",

          quality: "partial",

          title:
            "O foco é apenas uma parte da decisão",

          feedback:
            "A escolha também depende da gravidade, do contexto epidemiológico, das exposições anteriores e dos fatores individuais."
        }
      ]
    },

    {
      clinical:
        "Durante a avaliação, surgem hipotensão, alteração do estado mental e sinais de disfunção orgânica.",

      question:
        "Como esses dados modificam a decisão?",

      options: [
        {
          text:
            "Aumentam a urgência da avaliação e do início de cobertura adequada aos microrganismos prováveis.",

          quality: "correct",

          title:
            "A gravidade aumenta a urgência",

          feedback:
            "Instabilidade e disfunção orgânica elevam o impacto de atrasos ou de uma terapia inicial inadequada."
        },

        {
          text:
            "Determinam automaticamente a necessidade do espectro mais amplo disponível.",

          quality: "partial",

          title:
            "Gravidade não significa cobertura indiscriminada",

          feedback:
            "A cobertura deve ser suficiente para o foco e os riscos identificados. Ampliar sem critérios aumenta exposição e pressão seletiva."
        },

        {
          text:
            "Indicam que se deve aguardar todos os resultados antes de iniciar o tratamento.",

          quality: "partial",

          title:
            "A espera pode ser prejudicial",

          feedback:
            "Em quadros graves com alta probabilidade de infecção, a investigação deve ocorrer rapidamente sem atraso clinicamente prejudicial ao tratamento."
        }
      ]
    },

    {
      clinical:
        "Há hospitalização recente, exposição prévia a antibacterianos e registro anterior de bactéria resistente.",

      question:
        "O que essas informações acrescentam?",

      options: [
        {
          text:
            "Aumentam a probabilidade de resistência e devem ser consideradas na cobertura empírica inicial.",

          quality: "correct",

          title:
            "O risco microbiológico foi modificado",

          feedback:
            "Exposições recentes e resultados microbiológicos anteriores podem alterar os agentes e os perfis de resistência mais prováveis."
        },

        {
          text:
            "Confirmam que a bactéria resistente anterior é a causa do quadro atual.",

          quality: "partial",

          title:
            "Risco aumentado não significa confirmação",

          feedback:
            "O histórico modifica a probabilidade, mas não comprova que o mesmo microrganismo esteja causando a infecção atual."
        },

        {
          text:
            "Não interferem na terapia empírica enquanto não houver uma nova cultura positiva.",

          quality: "partial",

          title:
            "Resultados anteriores podem ser relevantes",

          feedback:
            "O histórico microbiológico faz parte da avaliação empírica, especialmente quando é recente e compatível com o contexto atual."
        }
      ]
    },

    {
      clinical:
        "Foram indicadas culturas para investigar o foco e orientar o ajuste posterior do tratamento.",

      question:
        "Como integrar a coleta de amostras ao início da terapia?",

      options: [
        {
          text:
            "Obter amostras adequadas antes do tratamento, sempre que isso for possível sem provocar atraso prejudicial.",

          quality: "correct",

          title:
            "Investigação e tratamento precisam ser coordenados",

          feedback:
            "A coleta prévia pode aumentar o rendimento microbiológico, mas não deve atrasar de forma prejudicial uma terapia urgente."
        },

        {
          text:
            "Adiar obrigatoriamente o tratamento até a coleta de todas as amostras possíveis.",

          quality: "partial",

          title:
            "A coleta não deve produzir atraso perigoso",

          feedback:
            "Amostras adequadas são importantes, porém a prioridade deve considerar a gravidade e a urgência do tratamento."
        },

        {
          text:
            "Iniciar o tratamento e dispensar as culturas, pois a cobertura empírica já foi definida.",

          quality: "partial",

          title:
            "Sem amostras, o ajuste posterior pode ser prejudicado",

          feedback:
            "Quando indicadas, as culturas ajudam a confirmar a etiologia e permitem estreitar, ajustar ou interromper a terapia."
        }
      ]
    },

    {
      clinical:
        "A imagem confirma uma coleção passível de drenagem.",

      question:
        "Qual é a consequência para o plano terapêutico?",

      options: [
        {
          text:
            "Aumentar o espectro substitui a necessidade de intervenção sobre o foco.",

          quality: "partial",

          title:
            "Antibacteriano não substitui controle do foco",

          feedback:
            "Uma coleção drenável pode manter a infecção apesar de uma cobertura microbiologicamente adequada."
        },

        {
          text:
            "Avaliar prontamente o controle do foco, integrado à terapia antibacteriana.",

          quality: "correct",

          title:
            "O tratamento não depende apenas do medicamento",

          feedback:
            "Drenagem, desbridamento, remoção de dispositivo ou outra intervenção podem ser determinantes para o controle da infecção."
        },

        {
          text:
            "Aguardar a identificação definitiva antes de considerar qualquer intervenção.",

          quality: "partial",

          title:
            "O controle do foco pode ser urgente",

          feedback:
            "A necessidade de intervenção é definida pelo quadro e pelo foco, não apenas pela identificação do microrganismo."
        }
      ]
    }
  ];

  let currentStage = 0;
  const selections = new Array(stages.length).fill(null);

  function createOption(option, index) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "cap8-p69-option";
    button.dataset.optionIndex = String(index);

    button.innerHTML =
      '<span class="cap8-p69-optionLetter">' +
        String.fromCharCode(65 + index) +
      "</span>" +
      '<span class="cap8-p69-optionText">' +
        option.text +
      "</span>";

    button.addEventListener("click", function () {
      selectOption(option, button, index);
    });

    return button;
  }

  function renderStage(index) {
    currentStage = index;

    const stage = stages[index];
    const savedSelection = selections[index];

    stageElement.hidden = false;
    finalSection.hidden = true;

    stageLabel.textContent =
      "Informação " +
      (index + 1) +
      " de " +
      stages.length;

    clinicalText.textContent = stage.clinical;
    question.textContent = stage.question;

    optionsContainer.innerHTML = "";

    stage.options.forEach(function (option, optionIndex) {
      optionsContainer.appendChild(
        createOption(option, optionIndex)
      );
    });

    feedback.hidden = true;
    feedback.className = "cap8-p69-feedback";
    feedback.innerHTML = "";

    reviseButton.hidden = true;
    nextButton.disabled = true;

    nextButton.textContent =
      index === stages.length - 1
        ? "Concluir raciocínio"
        : "Liberar próxima informação →";

    if (savedSelection !== null) {
      const option = stage.options[savedSelection];

      const button = optionsContainer.querySelector(
        '[data-option-index="' +
        savedSelection +
        '"]'
      );

      if (option && button) {
        selectOption(
          option,
          button,
          savedSelection
        );
      }
    }

    updateProgress();
  }

  function selectOption(option, button, index) {
    selections[currentStage] = index;

    const buttons = Array.from(
      optionsContainer.querySelectorAll(
        ".cap8-p69-option"
      )
    );

    buttons.forEach(function (currentButton) {
      currentButton.disabled = true;
      currentButton.classList.remove(
        "is-correct",
        "is-partial"
      );
    });

    button.classList.add(
      option.quality === "correct"
        ? "is-correct"
        : "is-partial"
    );

    feedback.hidden = false;

    feedback.className =
      "cap8-p69-feedback " +
      (option.quality === "correct"
        ? "is-correct"
        : "is-partial");

    feedback.innerHTML =
      "<strong>" +
        option.title +
      "</strong>" +
      "<p>" +
        option.feedback +
      "</p>";

    reviseButton.hidden = false;
    nextButton.disabled = false;

    updateProgress();
  }

  function reviseSelection() {
    selections[currentStage] = null;

    const buttons = Array.from(
      optionsContainer.querySelectorAll(
        ".cap8-p69-option"
      )
    );

    buttons.forEach(function (button) {
      button.disabled = false;
      button.classList.remove(
        "is-correct",
        "is-partial"
      );
    });

    feedback.hidden = true;
    feedback.className =
      "cap8-p69-feedback";

    feedback.innerHTML = "";

    reviseButton.hidden = true;
    nextButton.disabled = true;

    updateProgress();
  }

  function updateProgress() {
    const completed = selections.filter(function (selection) {
      return selection !== null;
    }).length;

    progressText.textContent =
      completed +
      " de " +
      stages.length;

    progressBar.style.width =
      ((completed / stages.length) * 100) +
      "%";

    progressTrack.setAttribute(
      "aria-valuenow",
      String(completed)
    );

    progressSteps.forEach(function (step, index) {
      step.classList.toggle(
        "is-complete",
        selections[index] !== null &&
        index !== currentStage
      );

      step.classList.toggle(
        "is-active",
        index === currentStage &&
        !stageElement.hidden
      );
    });
  }

  function nextStage() {
    if (selections[currentStage] === null) {
      return;
    }

    if (currentStage < stages.length - 1) {
      renderStage(currentStage + 1);
      return;
    }

    stageElement.hidden = true;
    finalSection.hidden = false;

    progressSteps.forEach(function (step) {
      step.classList.remove("is-active");
      step.classList.add("is-complete");
    });

    finalSection.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  }

  function restartSimulation() {
    selections.fill(null);
    finalSection.hidden = true;

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
   CAPÍTULO 8 — PÁGINA 70
   INFECÇÕES RESPIRATÓRIAS
   ========================================================= */

(function initCap8Page70() {
  "use strict";

  const root = document.querySelector(
    "[data-cap8-p70]"
  );

  if (!root) {
    return;
  }

  const navButtons = Array.from(
    root.querySelectorAll("[data-p70-stage]")
  );

  const stageElement = document.getElementById(
    "cap8P70Stage"
  );

  const caseLabel = document.getElementById(
    "cap8P70CaseLabel"
  );

  const caseTitle = document.getElementById(
    "cap8P70CaseTitle"
  );

  const clinicalText = document.getElementById(
    "cap8P70ClinicalText"
  );

  const figure = document.getElementById(
    "cap8P70Figure"
  );

  const question = document.getElementById(
    "cap8P70Question"
  );

  const optionsContainer = document.getElementById(
    "cap8P70Options"
  );

  const feedback = document.getElementById(
    "cap8P70Feedback"
  );

  const reviseButton = document.getElementById(
    "cap8P70Revise"
  );

  const nextButton = document.getElementById(
    "cap8P70Next"
  );

  const progressText = document.getElementById(
    "cap8P70ProgressText"
  );

  const progressBar = document.getElementById(
    "cap8P70ProgressBar"
  );

  const progressTrack = root.querySelector(
    ".cap8-p70-progressTrack"
  );

  const completion = document.getElementById(
    "cap8P70Completion"
  );

  const restartButton = document.getElementById(
    "cap8P70Restart"
  );

  if (
    !navButtons.length ||
    !stageElement ||
    !caseLabel ||
    !caseTitle ||
    !clinicalText ||
    !figure ||
    !question ||
    !optionsContainer ||
    !feedback ||
    !reviseButton ||
    !nextButton ||
    !progressText ||
    !progressBar ||
    !progressTrack ||
    !completion ||
    !restartButton
  ) {
    return;
  }

  const stages = [
    {
      label: "Cenário 1",

      title:
        "Sintomas respiratórios recentes",

      clinical:
        "Pessoa adulta apresenta coriza, dor de garganta e tosse há dois dias. Está hemodinamicamente estável, sem taquipneia, hipoxemia ou alterações focais na ausculta pulmonar.",

      showFigure: false,

      question:
        "Qual é a interpretação mais consistente neste momento?",

      options: [
        {
          quality: "correct",

          text:
            "O conjunto favorece um quadro respiratório agudo sem evidências suficientes de pneumonia bacteriana; é necessário orientar o cuidado e os sinais de reavaliação.",

          title:
            "Probabilidade bacteriana baixa neste momento",

          feedback:
            "Tosse e febre não confirmam pneumonia. Na ausência de sinais de gravidade ou achados focais, a prescrição rotineira de antibacteriano não se justifica apenas pelos sintomas."
        },

        {
          quality: "partial",

          text:
            "A presença de febre e tosse torna provável uma infecção bacteriana e justifica tratamento empírico.",

          title:
            "Os sintomas são inespecíficos",

          feedback:
            "Febre e tosse também são frequentes em infecções virais. A decisão deve considerar o conjunto clínico e a possibilidade de pneumonia."
        },

        {
          quality: "partial",

          text:
            "Sem exame de imagem, nenhuma avaliação clínica da probabilidade de pneumonia é possível.",

          title:
            "A avaliação não depende apenas da imagem",

          feedback:
            "História, sinais vitais e exame físico ajudam a estimar a probabilidade e a necessidade de investigação adicional."
        }
      ]
    },

    {
      label: "Cenário 2",

      title:
        "Novo infiltrado pulmonar",

      clinical:
        "Outra pessoa apresenta febre, taquipneia, hipoxemia e crepitações focais. A imagem demonstra um novo infiltrado pulmonar compatível com pneumonia.",

      showFigure: true,

      question:
        "O que o novo infiltrado acrescenta ao raciocínio?",

      options: [
        {
          quality: "partial",

          text:
            "Confirma pneumonia bacteriana e identifica o perfil microbiológico responsável.",

          title:
            "O infiltrado não identifica a etiologia",

          feedback:
            "O achado sustenta o diagnóstico de pneumonia quando é coerente com a apresentação clínica, mas pneumonias bacterianas e virais podem produzir alterações de imagem."
        },

        {
          quality: "correct",

          text:
            "Sustenta o diagnóstico de pneumonia, mas a etiologia e a escolha empírica ainda dependem do contexto clínico e epidemiológico.",

          title:
            "Diagnóstico e etiologia não são a mesma decisão",

          feedback:
            "A imagem aumenta a segurança do diagnóstico de pneumonia, mas não determina sozinha o agente nem o espectro necessário."
        },

        {
          quality: "partial",

          text:
            "Determina a necessidade do espectro antibacteriano mais amplo disponível.",

          title:
            "O infiltrado não define a amplitude do espectro",

          feedback:
            "A amplitude depende da gravidade, do local de aquisição, das exposições e dos fatores de risco microbiológico."
        }
      ]
    },

    {
      label: "Cenário 3",

      title:
        "Pneumonia grave e maior risco microbiológico",

      clinical:
        "A apresentação é grave. Há hospitalização recente com uso de antibacteriano e registro anterior de microrganismo resistente em amostra respiratória.",

      showFigure: false,

      question:
        "Como essas informações modificam a terapia empírica?",

      options: [
        {
          quality: "correct",

          text:
            "Aumentam o risco de resistência e devem ser integradas à gravidade, ao foco e à epidemiologia local para definir a cobertura inicial.",

          title:
            "Existem fatores de risco microbiológico relevantes",

          feedback:
            "Resultados microbiológicos anteriores e determinadas exposições recentes podem justificar cobertura adicional, sem substituir a avaliação individual."
        },

        {
          quality: "partial",

          text:
            "Confirmam que o mesmo microrganismo resistente está causando a pneumonia atual.",

          title:
            "Risco aumentado não significa confirmação",

          feedback:
            "O histórico altera a probabilidade, mas não comprova a etiologia atual. Amostras adequadas podem ajudar no direcionamento posterior."
        },

        {
          quality: "partial",

          text:
            "A gravidade, isoladamente, exige cobertura para todos os microrganismos resistentes possíveis.",

          title:
            "Cobertura indiscriminada não é sinônimo de segurança",

          feedback:
            "A cobertura inicial deve ser adequada aos riscos reconhecidos. Ampliar sem critérios aumenta toxicidade e pressão seletiva."
        }
      ]
    }
  ];

  let currentStage = 0;
  const selections = new Array(stages.length).fill(null);

  function createOption(option, optionIndex) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "cap8-p70-option";
    button.dataset.optionIndex = String(optionIndex);

    button.innerHTML =
      '<span class="cap8-p70-optionLetter">' +
        String.fromCharCode(65 + optionIndex) +
      "</span>" +
      '<span class="cap8-p70-optionText">' +
        option.text +
      "</span>";

    button.addEventListener("click", function () {
      selectOption(
        option,
        button,
        optionIndex
      );
    });

    return button;
  }

  function renderStage(index) {
    currentStage = index;

    const stage = stages[index];
    const savedSelection = selections[index];

    completion.hidden = true;
    stageElement.hidden = false;

    stageElement.setAttribute(
      "aria-labelledby",
      "cap8P70Tab" + (index + 1)
    );

    caseLabel.textContent = stage.label;
    caseTitle.textContent = stage.title;
    clinicalText.textContent = stage.clinical;
    question.textContent = stage.question;
    figure.hidden = !stage.showFigure;

    optionsContainer.innerHTML = "";

    stage.options.forEach(function (option, optionIndex) {
      optionsContainer.appendChild(
        createOption(option, optionIndex)
      );
    });

    feedback.hidden = true;
    feedback.className = "cap8-p70-feedback";
    feedback.innerHTML = "";

    reviseButton.hidden = true;
    nextButton.disabled = true;

    nextButton.textContent =
      index === stages.length - 1
        ? "Concluir comparação"
        : "Próximo cenário →";

    if (savedSelection !== null) {
      const option = stage.options[savedSelection];

      const button = optionsContainer.querySelector(
        '[data-option-index="' +
        savedSelection +
        '"]'
      );

      if (option && button) {
        selectOption(
          option,
          button,
          savedSelection
        );
      }
    }

    updateNavigation();
    updateProgress();
  }

  function selectOption(option, button, index) {
    selections[currentStage] = index;

    const buttons = Array.from(
      optionsContainer.querySelectorAll(
        ".cap8-p70-option"
      )
    );

    buttons.forEach(function (currentButton) {
      currentButton.disabled = true;

      currentButton.classList.remove(
        "is-correct",
        "is-partial"
      );
    });

    button.classList.add(
      option.quality === "correct"
        ? "is-correct"
        : "is-partial"
    );

    feedback.hidden = false;

    feedback.className =
      "cap8-p70-feedback " +
      (option.quality === "correct"
        ? "is-correct"
        : "is-partial");

    feedback.innerHTML =
      "<strong>" +
        option.title +
      "</strong>" +
      "<p>" +
        option.feedback +
      "</p>";

    reviseButton.hidden = false;
    nextButton.disabled = false;

    updateNavigation();
    updateProgress();
  }

  function reviseSelection() {
    selections[currentStage] = null;

    const buttons = Array.from(
      optionsContainer.querySelectorAll(
        ".cap8-p70-option"
      )
    );

    buttons.forEach(function (button) {
      button.disabled = false;

      button.classList.remove(
        "is-correct",
        "is-partial"
      );
    });

    feedback.hidden = true;
    feedback.className = "cap8-p70-feedback";
    feedback.innerHTML = "";

    reviseButton.hidden = true;
    nextButton.disabled = true;

    updateNavigation();
    updateProgress();
  }

  function updateNavigation() {
    navButtons.forEach(function (button, index) {
      const isActive = index === currentStage;
      const isComplete = selections[index] !== null;

      button.disabled =
        index > 0 &&
        selections[index - 1] === null;

      button.classList.toggle(
        "is-active",
        isActive && !stageElement.hidden
      );

      button.classList.toggle(
        "is-complete",
        isComplete && !isActive
      );

      button.setAttribute(
        "aria-selected",
        isActive && !stageElement.hidden
          ? "true"
          : "false"
      );

      button.tabIndex =
        isActive && !stageElement.hidden
          ? 0
          : -1;
    });
  }

  function updateProgress() {
    const completedCount =
      selections.filter(function (selection) {
        return selection !== null;
      }).length;

    progressText.textContent =
      completedCount +
      " de " +
      stages.length;

    progressBar.style.width =
      ((completedCount / stages.length) * 100) +
      "%";

    progressTrack.setAttribute(
      "aria-valuenow",
      String(completedCount)
    );
  }

  function showCompletion() {
    stageElement.hidden = true;
    completion.hidden = false;

    navButtons.forEach(function (button) {
      button.disabled = false;
      button.classList.remove("is-active");
      button.classList.add("is-complete");
      button.setAttribute(
        "aria-selected",
        "false"
      );
    });

    completion.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  }

  function nextStage() {
    if (selections[currentStage] === null) {
      return;
    }

    if (currentStage < stages.length - 1) {
      renderStage(currentStage + 1);
    } else {
      showCompletion();
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

  navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.p70Stage);

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

(function initCap8Page71() {
  const root = document.querySelector(".cap8-page71");

  if (!root) return;

  const simulator = root.querySelector("[data-p71-sim]");
  const caseCard = root.querySelector(".cap8-p71-case");
  const caseNumber = root.querySelector("[data-p71-number]");
  const caseProfile = root.querySelector("[data-p71-profile]");
  const caseText = root.querySelector("[data-p71-case-text]");
  const progress = root.querySelector("[data-p71-progress]");
  const progressText = root.querySelector(
    "[data-p71-progress-text]"
  );
  const options = Array.from(
    root.querySelectorAll("[data-p71-choice]")
  );
  const feedback = root.querySelector("[data-p71-feedback]");
  const nextButton = root.querySelector("[data-p71-next]");
  const summary = root.querySelector("[data-p71-summary]");

  if (
    !simulator ||
    !caseCard ||
    !caseNumber ||
    !caseProfile ||
    !caseText ||
    !progress ||
    !progressText ||
    !options.length ||
    !feedback ||
    !nextButton ||
    !summary
  ) {
    return;
  }

  const cases = [
    {
      profile: "Sem sintomas urinários",
      text:
        "Pessoa idosa institucionalizada, clinicamente estável, " +
        "sem disúria, urgência, aumento da frequência urinária, " +
        "dor suprapúbica, dor lombar, febre ou instabilidade " +
        "hemodinâmica. A urocultura foi solicitada após alteração " +
        "do aspecto da urina.",

      correct: "integrate",

      feedback: {
        treat: {
          tone: "warning",
          title: "A cultura positiva não basta",
          text:
            "Sem manifestações atribuíveis ao trato urinário ou " +
            "sinais sistêmicos, o resultado é mais compatível com " +
            "bacteriúria assintomática. Tratar apenas o crescimento " +
            "bacteriano pode causar efeitos adversos e selecionar " +
            "resistência sem benefício clínico."
        },

        integrate: {
          tone: "correct",
          title: "Interpretação adequada",
          text:
            "A ausência de sintomas e de sinais sistêmicos torna a " +
            "bacteriúria assintomática a interpretação mais provável. " +
            "Na maioria das situações, não se indica tratamento; " +
            "antes da decisão, devem ser verificadas as exceções."
        },

        ignore: {
          tone: "warning",
          title: "O resultado não deve ser descartado",
          text:
            "Uma urocultura positiva pode representar infecção em " +
            "outro contexto. A conclusão correta não é ignorar o " +
            "exame, mas integrá-lo às manifestações clínicas e à " +
            "indicação da coleta."
        }
      }
    },

    {
      profile: "Sintomas localizados à bexiga",
      text:
        "Pessoa com início recente de disúria, urgência e aumento " +
        "da frequência urinária, sem febre, dor lombar ou sinais " +
        "de instabilidade. A amostra foi obtida antes do início " +
        "do tratamento.",

      correct: "integrate",

      feedback: {
        treat: {
          tone: "warning",
          title: "Há infecção provável, mas o raciocínio está incompleto",
          text:
            "O quadro é compatível com infecção urinária baixa, " +
            "porém a decisão não deve resultar apenas da cultura. " +
            "Também é necessário avaliar características individuais, " +
            "risco de resistência, alergias e resultados anteriores."
        },

        integrate: {
          tone: "correct",
          title: "Coerência clínico-laboratorial",
          text:
            "Os sintomas localizados e o crescimento bacteriano " +
            "formam um conjunto compatível com infecção urinária " +
            "baixa. A identificação e a suscetibilidade podem orientar " +
            "a escolha ou o ajuste do antibacteriano."
        },

        ignore: {
          tone: "warning",
          title: "O resultado é clinicamente relevante",
          text:
            "Neste contexto, há manifestações urinárias compatíveis. " +
            "Desconsiderar a cultura eliminaria uma informação útil " +
            "para confirmar a coerência do diagnóstico e direcionar " +
            "o tratamento."
        }
      }
    },

    {
      profile: "Possível infecção além da bexiga",
      text:
        "Pessoa com febre, calafrios, dor lombar, náuseas e piora " +
        "do estado geral. A urocultura foi coletada adequadamente, " +
        "mas o perfil de suscetibilidade ainda não está disponível.",

      correct: "integrate",

      feedback: {
        treat: {
          tone: "warning",
          title: "A urgência não dispensa avaliação",
          text:
            "O tratamento oportuno é necessário, mas não se deve " +
            "apenas iniciar ou ampliar o espectro de maneira automática. " +
            "Gravidade, risco de resistência, resultados anteriores, " +
            "função renal e necessidade de controle do foco devem ser " +
            "avaliados."
        },

        integrate: {
          tone: "correct",
          title: "Conduta orientada pela síndrome e pela gravidade",
          text:
            "Febre e dor lombar sugerem acometimento além da bexiga. " +
            "A avaliação da gravidade e o tratamento empírico oportuno " +
            "não devem aguardar passivamente o antibiograma; quando " +
            "a suscetibilidade estiver disponível, o esquema deve ser " +
            "reavaliado e direcionado."
        },

        ignore: {
          tone: "warning",
          title: "Há concordância entre clínica e microbiologia",
          text:
            "O resultado não deve ser ignorado: há manifestações " +
            "sistêmicas e urinárias compatíveis. É necessário avaliar " +
            "a gravidade, iniciar a abordagem apropriada e revisar " +
            "o tratamento após o perfil de suscetibilidade."
        }
      }
    }
  ];

  let currentCase = 0;
  let answered = false;

  function resetOptions() {
    options.forEach((button) => {
      button.disabled = false;
      button.classList.remove(
        "is-selected",
        "is-correct"
      );
      button.setAttribute("aria-pressed", "false");
    });
  }

  function renderCase() {
    const item = cases[currentCase];

    caseNumber.textContent =
      `Caso ${currentCase + 1}`;

    caseProfile.textContent = item.profile;
    caseText.textContent = item.text;

    progress.style.width =
      `${((currentCase + 1) / cases.length) * 100}%`;

    progressText.textContent =
      `Caso ${currentCase + 1} de ${cases.length}`;

    feedback.hidden = true;
    feedback.className = "cap8-p71-feedback";
    feedback.innerHTML = "";

    nextButton.hidden = true;
    nextButton.textContent =
      currentCase === cases.length - 1
        ? "Comparar os três contextos →"
        : "Analisar o próximo caso →";

    summary.hidden = true;
    answered = false;

    resetOptions();

    caseCard.classList.remove("is-changing");
    void caseCard.offsetWidth;
    caseCard.classList.add("is-changing");
  }

  function selectChoice(selectedButton) {
    if (answered) return;

    const item = cases[currentCase];
    const choice = selectedButton.dataset.p71Choice;
    const response = item.feedback[choice];

    if (!response) return;

    answered = true;

    options.forEach((button) => {
      button.disabled = true;
      button.setAttribute("aria-pressed", "false");

      if (button.dataset.p71Choice === item.correct) {
        button.classList.add("is-correct");
      }
    });

    selectedButton.classList.add("is-selected");
    selectedButton.setAttribute("aria-pressed", "true");

    feedback.hidden = false;
    feedback.className =
      `cap8-p71-feedback is-visible is-${response.tone}`;

    feedback.innerHTML = `
      <strong>${response.title}</strong>
      <span>${response.text}</span>
    `;

    nextButton.hidden = false;
  }

  function advanceCase() {
    if (!answered) return;

    if (currentCase < cases.length - 1) {
      currentCase += 1;
      renderCase();

      caseCard.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "center"
      });

      return;
    }

    progress.style.width = "100%";
    progressText.textContent = "3 casos analisados";
    nextButton.hidden = true;
    summary.hidden = false;

    summary.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  }

  options.forEach((button) => {
    button.addEventListener("click", () => {
      selectChoice(button);
    });
  });

  nextButton.addEventListener("click", advanceCase);

  renderCase();
})();

(function initCap8Page72() {
  const root = document.querySelector(".cap8-page72");

  if (!root) return;

  const priorityButtons = Array.from(
    root.querySelectorAll("[data-p72-priority]")
  );

  const evolutionButtons = Array.from(
    root.querySelectorAll("[data-p72-evolution]")
  );

  const confirmButton = root.querySelector(
    "[data-p72-confirm]"
  );

  const continueButton = root.querySelector(
    "[data-p72-continue]"
  );

  const selectionCount = root.querySelector(
    "[data-p72-selection-count]"
  );

  const firstFeedback = root.querySelector(
    "[data-p72-feedback]"
  );

  const secondFeedback = root.querySelector(
    "[data-p72-evolution-feedback]"
  );

  const stepOne = root.querySelector(
    "[data-p72-step-one]"
  );

  const stepTwo = root.querySelector(
    "[data-p72-step-two]"
  );

  const stage = root.querySelector(
    "[data-p72-stage]"
  );

  const status = root.querySelector(
    "[data-p72-status]"
  );

  const caseText = root.querySelector(
    "[data-p72-case-text]"
  );

  const caseCard = root.querySelector(
    ".cap8-p72-case"
  );

  const progress = root.querySelector(
    "[data-p72-progress]"
  );

  const progressText = root.querySelector(
    "[data-p72-progress-text]"
  );

  const summary = root.querySelector(
    "[data-p72-summary]"
  );

  if (
    !priorityButtons.length ||
    !evolutionButtons.length ||
    !confirmButton ||
    !continueButton ||
    !selectionCount ||
    !firstFeedback ||
    !secondFeedback ||
    !stepOne ||
    !stepTwo ||
    !stage ||
    !status ||
    !caseText ||
    !caseCard ||
    !progress ||
    !progressText ||
    !summary
  ) {
    return;
  }

  const correctPriorities = new Set([
    "severity",
    "coverage",
    "source"
  ]);

  const selectedPriorities = new Set();

  let prioritiesConfirmed = false;
  let evolutionAnswered = false;

  function updateSelection() {
    const total = selectedPriorities.size;

    selectionCount.textContent =
      `${total} de 3 prioridades selecionadas`;

    confirmButton.disabled = total !== 3;
  }

  function togglePriority(button) {
    if (prioritiesConfirmed) return;

    const priority = button.dataset.p72Priority;

    if (!priority) return;

    if (selectedPriorities.has(priority)) {
      selectedPriorities.delete(priority);
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    } else {
      if (selectedPriorities.size >= 3) return;

      selectedPriorities.add(priority);
      button.classList.add("is-selected");
      button.setAttribute("aria-pressed", "true");
    }

    updateSelection();
  }

  function confirmPriorities() {
    if (
      prioritiesConfirmed ||
      selectedPriorities.size !== 3
    ) {
      return;
    }

    prioritiesConfirmed = true;

    let correctCount = 0;

    priorityButtons.forEach((button) => {
      const priority = button.dataset.p72Priority;
      const isCorrect = correctPriorities.has(priority);
      const wasSelected = selectedPriorities.has(priority);

      button.disabled = true;

      if (isCorrect) {
        button.classList.add("is-correct");
      }

      if (wasSelected && !isCorrect) {
        button.classList.add("is-incorrect");
      }

      if (wasSelected && isCorrect) {
        correctCount += 1;
      }
    });

    firstFeedback.hidden = false;
    firstFeedback.classList.add("is-visible");

    if (correctCount === correctPriorities.size) {
      firstFeedback.classList.remove("is-warning");

      firstFeedback.innerHTML = `
        <strong>As três dimensões foram integradas</strong>
        <span>
          A abordagem inicial deve ocorrer em paralelo:
          avaliar a gravidade, iniciar cobertura compatível
          com o foco e verificar prontamente a necessidade
          de drenagem ou correção da origem da infecção.
          Não é necessário aguardar as culturas para iniciar
          essas medidas quando há infecção grave provável.
        </span>
      `;
    } else {
      firstFeedback.classList.add("is-warning");

      firstFeedback.innerHTML = `
        <strong>Uma prioridade decisiva ficou de fora</strong>
        <span>
          Aguardar as culturas antes de qualquer intervenção
          pode atrasar medidas necessárias. Gravidade,
          cobertura inicial e controle do foco precisam ser
          avaliados em paralelo.
        </span>
      `;
    }

    continueButton.hidden = false;
  }

  function showEvolution() {
    stepOne.hidden = true;
    firstFeedback.hidden = true;
    continueButton.hidden = true;
    stepTwo.hidden = false;

    stage.textContent = "Evolução após 48 horas";
    status.textContent = "Persistência do quadro";

    caseText.textContent =
      "Foi iniciado um esquema com atividade contra os " +
      "microrganismos posteriormente identificados. Apesar " +
      "disso, persistem febre, dor abdominal e sinais " +
      "inflamatórios. A coleção observada na tomografia " +
      "ainda não foi drenada.";

    progress.style.width = "100%";
    progressText.textContent = "Etapa 2 de 2";

    caseCard.classList.remove("is-changing");
    void caseCard.offsetWidth;
    caseCard.classList.add("is-changing");

    caseCard.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "center"
    });
  }

  function answerEvolution(button) {
    if (evolutionAnswered) return;

    const choice = button.dataset.p72Evolution;

    if (!choice) return;

    evolutionAnswered = true;

    evolutionButtons.forEach((item) => {
      item.disabled = true;
      item.setAttribute("aria-pressed", "false");

      if (item.dataset.p72Evolution === "reassess") {
        item.classList.add("is-correct");
      }
    });

    button.classList.add("is-selected");
    button.setAttribute("aria-pressed", "true");

    secondFeedback.hidden = false;
    secondFeedback.classList.add("is-visible");

    if (choice === "reassess") {
      secondFeedback.classList.remove("is-warning");

      secondFeedback.innerHTML = `
        <strong>Reavaliação integrada</strong>
        <span>
          A persistência da infecção, apesar de atividade
          microbiológica do esquema, reforça a necessidade
          de verificar o controle do foco. Também devem ser
          reconsiderados o diagnóstico, a adequação do
          tratamento, possíveis complicações e os resultados
          microbiológicos.
        </span>
      `;
    } else if (choice === "broaden") {
      button.classList.add("is-incorrect");
      secondFeedback.classList.add("is-warning");

      secondFeedback.innerHTML = `
        <strong>Ausência de melhora não comprova resistência</strong>
        <span>
          Ampliar automaticamente o espectro não resolve uma
          coleção que permanece sem drenagem. Antes de atribuir
          a falha à resistência, é necessário reavaliar o foco,
          o diagnóstico, a evolução e a adequação global da
          abordagem.
        </span>
      `;
    } else {
      button.classList.add("is-incorrect");
      secondFeedback.classList.add("is-warning");

      secondFeedback.innerHTML = `
        <strong>A espera passiva pode atrasar o controle do foco</strong>
        <span>
          A persistência de sinais clínicos diante de uma
          coleção não drenada exige reavaliação. O tempo
          transcorrido deve ser interpretado junto à gravidade
          e à possibilidade de manutenção da origem da infecção.
        </span>
      `;
    }

    summary.hidden = false;

    summary.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  }

  priorityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      togglePriority(button);
    });
  });

  evolutionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      answerEvolution(button);
    });
  });

  confirmButton.addEventListener(
    "click",
    confirmPriorities
  );

  continueButton.addEventListener(
    "click",
    showEvolution
  );

  updateSelection();
})();


(function initCap8Page73() {
  const root = document.querySelector(".cap8-page73");

  if (!root) return;

  const stage = root.querySelector("[data-p73-stage]");
  const clinicalStatus = root.querySelector(
    "[data-p73-clinical-status]"
  );
  const caseText = root.querySelector("[data-p73-case-text]");
  const information = root.querySelector(
    "[data-p73-information]"
  );
  const certainty = root.querySelector(
    "[data-p73-certainty]"
  );
  const question = root.querySelector(
    "[data-p73-question]"
  );
  const optionsBox = root.querySelector(
    "[data-p73-options]"
  );
  const feedback = root.querySelector(
    "[data-p73-feedback]"
  );
  const nextButton = root.querySelector(
    "[data-p73-next]"
  );
  const summary = root.querySelector(
    "[data-p73-summary]"
  );
  const caseCard = root.querySelector(
    ".cap8-p73-case"
  );
  const timepoints = Array.from(
    root.querySelectorAll("[data-p73-timepoint]")
  );

  if (
    !stage ||
    !clinicalStatus ||
    !caseText ||
    !information ||
    !certainty ||
    !question ||
    !optionsBox ||
    !feedback ||
    !nextButton ||
    !summary ||
    !caseCard ||
    !timepoints.length
  ) {
    return;
  }

  const phases = [
    {
      stage: "Hora zero",

      clinicalStatus:
        "Instabilidade hemodinâmica",

      text:
        "Pessoa internada apresenta febre, calafrios, " +
        "hipotensão, alteração do estado mental e sinais " +
        "de hipoperfusão. Existe suspeita de infecção " +
        "relacionada a cateter venoso central.",

      information:
        "Suspeita de infecção associada à disfunção orgânica",

      certainty:
        "Foco provável, agente desconhecido",

      question:
        "Qual decisão melhor equilibra urgência e investigação?",

      correct: "parallel",

      options: [
        {
          id: "wait",
          text:
            "Aguardar a identificação do agente e o perfil " +
            "de suscetibilidade antes de iniciar o tratamento."
        },
        {
          id: "parallel",
          text:
            "Coletar culturas sem atraso relevante, iniciar " +
            "cobertura empírica adequada, estabilizar o quadro " +
            "e avaliar o controle do foco em paralelo."
        },
        {
          id: "culture-only",
          text:
            "Coletar hemoculturas e observar a evolução antes " +
            "de decidir, pois ainda não existe confirmação " +
            "microbiológica."
        }
      ],

      feedback: {
        wait: {
          tone: "warning",
          title: "Aguardar o laudo aumenta o risco",
          text:
            "Na presença de instabilidade e disfunção orgânica, " +
            "a incerteza etiológica não justifica adiar o " +
            "tratamento. As culturas devem ser obtidas sem " +
            "provocar atraso relevante."
        },
        parallel: {
          tone: "correct",
          title: "Urgência e investigação em paralelo",
          text:
            "A gravidade exige estabilização e cobertura " +
            "empírica imediata. Culturas e investigação do " +
            "foco devem ocorrer rapidamente, sem atrasar as " +
            "medidas necessárias."
        },
        "culture-only": {
          tone: "warning",
          title: "A confirmação não deve ser aguardada",
          text:
            "A cultura é importante, mas sepse é reconhecida " +
            "clinicamente. Em um quadro instável, observar sem " +
            "tratamento pode atrasar uma intervenção decisiva."
        }
      }
    },

    {
      stage: "Resultado após 14 horas",

      clinicalStatus:
        "Hemocultura sinalizou positividade",

      text:
        "Após o início do tratamento e a avaliação do cateter, " +
        "um frasco de hemocultura sinaliza positividade. A " +
        "bacterioscopia demonstra bacilos Gram-negativos. A " +
        "identificação e a suscetibilidade ainda não estão " +
        "disponíveis.",

      information:
        "Bacilos Gram-negativos na bacterioscopia",

      certainty:
        "Grupo bacteriano conhecido; espécie e perfil desconhecidos",

      question:
        "Como esse resultado preliminar deve modificar a análise?",

      correct: "review",

      options: [
        {
          id: "narrow-now",
          text:
            "Estreitar imediatamente para qualquer opção com " +
            "atividade usual contra bacilos Gram-negativos."
        },
        {
          id: "ignore",
          text:
            "Manter a decisão inicial sem reavaliação porque " +
            "o resultado ainda não é definitivo."
        },
        {
          id: "review",
          text:
            "Verificar se o esquema contempla o grupo observado " +
            "e integrar foco, evolução, risco de resistência e " +
            "possibilidade de contaminação."
        }
      ],

      feedback: {
        "narrow-now": {
          tone: "warning",
          title: "Ainda faltam informações para direcionar",
          text:
            "A bacterioscopia informa o grupo bacteriano, mas " +
            "não define espécie nem suscetibilidade. Um " +
            "estreitamento prematuro pode retirar cobertura " +
            "necessária."
        },
        ignore: {
          tone: "warning",
          title: "O resultado preliminar já acrescenta informação",
          text:
            "Embora ainda não permita tratamento definitivo, " +
            "o achado deve ser comparado com a cobertura atual, " +
            "o foco provável e a evolução clínica."
        },
        review: {
          tone: "correct",
          title: "Reavaliação sem conclusão antecipada",
          text:
            "O achado permite conferir a coerência da cobertura, " +
            "mas a identificação e a suscetibilidade ainda são " +
            "necessárias para o direcionamento definitivo."
        }
      }
    },

    {
      stage: "Resultado em 48–72 horas",

      clinicalStatus:
        "Identificação e suscetibilidade disponíveis",

      text:
        "A hemocultura identifica uma enterobactéria suscetível " +
        "a uma opção de espectro mais restrito. Não houve " +
        "crescimento de outros agentes, o cateter foi removido " +
        "e o quadro apresenta melhora clínica.",

      information:
        "Agente identificado e perfil de suscetibilidade definido",

      certainty:
        "Bacteremia confirmada e resposta clínica favorável",

      question:
        "Qual é a finalidade da reavaliação neste momento?",

      correct: "direct",

      options: [
        {
          id: "keep-broad",
          text:
            "Manter toda a cobertura empírica inicial porque " +
            "ela esteve associada à melhora."
        },
        {
          id: "direct",
          text:
            "Direcionar o tratamento ao agente identificado, " +
            "considerando suscetibilidade, foco, evolução e " +
            "controle da fonte."
        },
        {
          id: "stop",
          text:
            "Suspender o tratamento porque a retirada do " +
            "cateter eliminou a provável fonte."
        }
      ],

      feedback: {
        "keep-broad": {
          tone: "warning",
          title: "Resposta favorável não justifica excesso de espectro",
          text:
            "A melhora confirma a necessidade de tratamento, " +
            "mas não obriga a manter todos os componentes " +
            "empíricos quando os resultados permitem uma " +
            "estratégia direcionada."
        },
        direct: {
          tone: "correct",
          title: "Tratamento direcionado",
          text:
            "A identificação, a suscetibilidade e o controle " +
            "da provável fonte permitem reduzir exposições " +
            "desnecessárias sem abandonar a avaliação clínica."
        },
        stop: {
          tone: "warning",
          title: "Controle da fonte não substitui todo o tratamento",
          text:
            "A retirada do cateter é importante, mas existe " +
            "bacteremia confirmada. A duração e a continuidade " +
            "dependem do agente, do foco, da evolução e da " +
            "presença de complicações."
        }
      }
    }
  ];

  let currentPhase = 0;
  let answered = false;

  function updateTimeline() {
    timepoints.forEach((item, index) => {
      item.classList.toggle(
        "is-active",
        index === currentPhase
      );

      item.classList.toggle(
        "is-complete",
        index < currentPhase
      );
    });
  }

  function buildOptions(items) {
    optionsBox.innerHTML = "";

    items.forEach((item) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "cap8-p73-option";
      button.dataset.p73Choice = item.id;
      button.setAttribute("aria-pressed", "false");
      button.textContent = item.text;

      button.addEventListener("click", () => {
        selectOption(button);
      });

      optionsBox.appendChild(button);
    });
  }

  function renderPhase() {
    const phase = phases[currentPhase];

    stage.textContent = phase.stage;
    clinicalStatus.textContent = phase.clinicalStatus;
    caseText.textContent = phase.text;
    information.textContent = phase.information;
    certainty.textContent = phase.certainty;
    question.textContent = phase.question;

    buildOptions(phase.options);
    updateTimeline();

    feedback.hidden = true;
    feedback.className = "cap8-p73-feedback";
    feedback.innerHTML = "";

    nextButton.hidden = true;
    summary.hidden = true;
    answered = false;

    nextButton.textContent =
      currentPhase === phases.length - 1
        ? "Comparar os três momentos →"
        : "Liberar o próximo resultado →";

    caseCard.classList.remove("is-changing");
    void caseCard.offsetWidth;
    caseCard.classList.add("is-changing");
  }

  function selectOption(selectedButton) {
    if (answered) return;

    const phase = phases[currentPhase];
    const choice = selectedButton.dataset.p73Choice;
    const response = phase.feedback[choice];
    const buttons = Array.from(
      optionsBox.querySelectorAll(".cap8-p73-option")
    );

    if (!response) return;

    answered = true;

    buttons.forEach((button) => {
      button.disabled = true;
      button.setAttribute("aria-pressed", "false");

      if (button.dataset.p73Choice === phase.correct) {
        button.classList.add("is-correct");
      }
    });

    selectedButton.classList.add("is-selected");
    selectedButton.setAttribute("aria-pressed", "true");

    if (choice !== phase.correct) {
      selectedButton.classList.add("is-incorrect");
    }

    feedback.hidden = false;
    feedback.className =
      `cap8-p73-feedback is-visible is-${response.tone}`;

    feedback.innerHTML = `
      <strong>${response.title}</strong>
      <span>${response.text}</span>
    `;

    nextButton.hidden = false;
  }

  function advancePhase() {
    if (!answered) return;

    if (currentPhase < phases.length - 1) {
      currentPhase += 1;
      renderPhase();

      caseCard.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "center"
      });

      return;
    }

    nextButton.hidden = true;
    summary.hidden = false;

    summary.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  }

  nextButton.addEventListener(
    "click",
    advancePhase
  );

  renderPhase();
})();

(function initCap8Page74() {
  const root = document.querySelector(".cap8-page74");

  if (!root) return;

  const caseNumber = root.querySelector(
    "[data-p74-case-number]"
  );
  const pattern = root.querySelector(
    "[data-p74-pattern]"
  );
  const caseText = root.querySelector(
    "[data-p74-case-text]"
  );
  const purulence = root.querySelector(
    "[data-p74-purulence]"
  );
  const progression = root.querySelector(
    "[data-p74-progression]"
  );
  const severity = root.querySelector(
    "[data-p74-severity]"
  );
  const question = root.querySelector(
    "[data-p74-question]"
  );
  const optionsBox = root.querySelector(
    "[data-p74-options]"
  );
  const feedback = root.querySelector(
    "[data-p74-feedback]"
  );
  const nextButton = root.querySelector(
    "[data-p74-next]"
  );
  const progress = root.querySelector(
    "[data-p74-progress]"
  );
  const progressText = root.querySelector(
    "[data-p74-progress-text]"
  );
  const summary = root.querySelector(
    "[data-p74-summary]"
  );
  const caseCard = root.querySelector(
    ".cap8-p74-case"
  );

  if (
    !caseNumber ||
    !pattern ||
    !caseText ||
    !purulence ||
    !progression ||
    !severity ||
    !question ||
    !optionsBox ||
    !feedback ||
    !nextButton ||
    !progress ||
    !progressText ||
    !summary ||
    !caseCard
  ) {
    return;
  }

  const situations = [
    {
      pattern: "Padrão não purulento",

      text:
        "Área unilateral de eritema, calor, edema e dor " +
        "na perna, com progressão gradual. Não há abscesso, " +
        "secreção, necrose, bolhas, crepitação ou " +
        "instabilidade clínica.",

      purulence: "Ausente",
      progression: "Gradual",
      severity: "Sem sinais de gravidade",

      question:
        "Qual é a prioridade mais coerente?",

      correct: "directed",

      options: [
        {
          id: "broad",
          text:
            "Utilizar cobertura ampla para Gram-positivos, " +
            "Gram-negativos e anaeróbios em todos os casos."
        },
        {
          id: "directed",
          text:
            "Confirmar a compatibilidade clínica e utilizar " +
            "cobertura dirigida aos agentes mais prováveis, " +
            "sem ampliação rotineira."
        },
        {
          id: "drain",
          text:
            "Realizar drenagem, mesmo sem evidência de " +
            "coleção purulenta."
        }
      ],

      feedback: {
        broad: {
          tone: "warning",
          title: "Espectro desproporcional à apresentação",
          text:
            "Na celulite típica não purulenta e sem gravidade, " +
            "não há justificativa rotineira para cobertura de " +
            "Gram-negativos e anaeróbios. Exposições específicas " +
            "podem modificar essa decisão."
        },

        directed: {
          tone: "correct",
          title: "Cobertura proporcional ao padrão clínico",
          text:
            "Na ausência de purulência, necrose ou gravidade, " +
            "estreptococos estão entre os principais agentes " +
            "prováveis. Também é importante verificar se o " +
            "quadro realmente representa infecção."
        },

        drain: {
          tone: "warning",
          title: "Não há coleção a ser drenada",
          text:
            "Drenagem é essencial quando existe coleção " +
            "purulenta. Na celulite sem abscesso, essa não é " +
            "a prioridade inicial."
        }
      }
    },

    {
      pattern: "Coleção purulenta",

      text:
        "Lesão dolorosa, elevada e flutuante, com saída de " +
        "secreção purulenta e eritema ao redor. Não há " +
        "hipotensão, confusão ou sinais de infecção profunda.",

      purulence: "Presente",
      progression: "Localizada",
      severity: "Sem instabilidade",

      question:
        "Qual elemento ocupa posição central na abordagem?",

      correct: "drain",

      options: [
        {
          id: "antibiotic-only",
          text:
            "Utilizar apenas antibacteriano sistêmico e " +
            "aguardar a reabsorção espontânea da coleção."
        },
        {
          id: "drain",
          text:
            "Avaliar incisão e drenagem da coleção e definir " +
            "a necessidade de antibacteriano conforme gravidade, " +
            "extensão e condições associadas."
        },
        {
          id: "broad",
          text:
            "Ampliar obrigatoriamente a cobertura para " +
            "Gram-negativos e anaeróbios devido à presença " +
            "de secreção."
        }
      ],

      feedback: {
        "antibiotic-only": {
          tone: "warning",
          title: "O antibacteriano não esvazia a coleção",
          text:
            "A drenagem é a base da abordagem do abscesso. " +
            "Tratamento sistêmico isolado pode ser insuficiente " +
            "quando permanece uma coleção purulenta."
        },

        drain: {
          tone: "correct",
          title: "Controle local do foco",
          text:
            "A incisão e a drenagem constituem a intervenção " +
            "central. A necessidade de antibacteriano sistêmico " +
            "é avaliada conforme gravidade, extensão, resposta " +
            "e características individuais."
        },

        broad: {
          tone: "warning",
          title: "Purulência não significa flora entérica",
          text:
            "A presença de pus aumenta a relevância de " +
            "estafilococos, mas não determina cobertura " +
            "automática para Gram-negativos e anaeróbios."
        }
      }
    },

    {
      pattern: "Possível infecção necrosante",

      text:
        "Dor muito intensa, maior do que sugerem as alterações " +
        "iniciais da pele, progressão em poucas horas, edema " +
        "extenso, bolhas, áreas violáceas e instabilidade " +
        "hemodinâmica.",

      purulence: "Pode estar ausente",
      progression: "Muito rápida",
      severity: "Grave",

      question:
        "Qual decisão não deve ser atrasada?",

      correct: "surgery",

      options: [
        {
          id: "observe",
          text:
            "Marcar os limites do eritema e aguardar a " +
            "evolução por 24 horas antes de mudar a conduta."
        },
        {
          id: "imaging-first",
          text:
            "Aguardar obrigatoriamente confirmação por imagem " +
            "antes de solicitar avaliação cirúrgica."
        },
        {
          id: "surgery",
          text:
            "Solicitar avaliação cirúrgica imediata, iniciar " +
            "abordagem sistêmica abrangente e estabilizar o " +
            "quadro sem aguardar confirmação tardia."
        }
      ],

      feedback: {
        observe: {
          tone: "warning",
          title: "A progressão rápida exige resposta imediata",
          text:
            "Dor desproporcional, bolhas, alteração de cor e " +
            "instabilidade são sinais de alerta. A observação " +
            "isolada pode atrasar uma intervenção decisiva."
        },

        "imaging-first": {
          tone: "warning",
          title: "A imagem não deve atrasar a avaliação cirúrgica",
          text:
            "Exames podem contribuir em situações selecionadas, " +
            "mas uma forte suspeita clínica de infecção " +
            "necrosante exige avaliação cirúrgica urgente."
        },

        surgery: {
          tone: "correct",
          title: "Emergência clínica e cirúrgica",
          text:
            "A suspeita de infecção necrosante exige " +
            "estabilização, cobertura empírica abrangente e " +
            "avaliação cirúrgica imediata para exploração e " +
            "remoção de tecido comprometido."
        }
      }
    }
  ];

  let currentSituation = 0;
  let answered = false;

  function buildOptions(items) {
    optionsBox.innerHTML = "";

    items.forEach((item) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "cap8-p74-option";
      button.dataset.p74Choice = item.id;
      button.setAttribute("aria-pressed", "false");
      button.textContent = item.text;

      button.addEventListener("click", () => {
        selectOption(button);
      });

      optionsBox.appendChild(button);
    });
  }

  function renderSituation() {
    const situation = situations[currentSituation];

    caseNumber.textContent =
      `Situação ${currentSituation + 1}`;

    pattern.textContent = situation.pattern;
    caseText.textContent = situation.text;
    purulence.textContent = situation.purulence;
    progression.textContent = situation.progression;
    severity.textContent = situation.severity;
    question.textContent = situation.question;

    progress.style.width =
      `${((currentSituation + 1) / situations.length) * 100}%`;

    progressText.textContent =
      `Situação ${currentSituation + 1} de ${situations.length}`;

    buildOptions(situation.options);

    feedback.hidden = true;
    feedback.className = "cap8-p74-feedback";
    feedback.innerHTML = "";

    nextButton.hidden = true;
    nextButton.textContent =
      currentSituation === situations.length - 1
        ? "Comparar as três apresentações →"
        : "Analisar a próxima situação →";

    summary.hidden = true;
    answered = false;

    caseCard.classList.remove("is-changing");
    void caseCard.offsetWidth;
    caseCard.classList.add("is-changing");
  }

  function selectOption(selectedButton) {
    if (answered) return;

    const situation = situations[currentSituation];
    const choice = selectedButton.dataset.p74Choice;
    const response = situation.feedback[choice];
    const buttons = Array.from(
      optionsBox.querySelectorAll(".cap8-p74-option")
    );

    if (!response) return;

    answered = true;

    buttons.forEach((button) => {
      button.disabled = true;
      button.setAttribute("aria-pressed", "false");

      if (button.dataset.p74Choice === situation.correct) {
        button.classList.add("is-correct");
      }
    });

    selectedButton.classList.add("is-selected");
    selectedButton.setAttribute("aria-pressed", "true");

    if (choice !== situation.correct) {
      selectedButton.classList.add("is-incorrect");
    }

    feedback.hidden = false;
    feedback.className =
      `cap8-p74-feedback is-visible is-${response.tone}`;

    feedback.innerHTML = `
      <strong>${response.title}</strong>
      <span>${response.text}</span>
    `;

    nextButton.hidden = false;
  }

  function advanceSituation() {
    if (!answered) return;

    if (currentSituation < situations.length - 1) {
      currentSituation += 1;
      renderSituation();

      caseCard.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "center"
      });

      return;
    }

    progress.style.width = "100%";
    progressText.textContent =
      "3 situações analisadas";

    nextButton.hidden = true;
    summary.hidden = false;

    summary.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  }

  nextButton.addEventListener(
    "click",
    advanceSituation
  );

  renderSituation();
})();







/* =========================
   PÁGINA 75 — QUIZ DE REVISÃO
   ========================= */

(function initCap8Page75Quiz() {
  "use strict";

  const root = document.querySelector("[data-cap8-p75]");

  if (!root) {
    return;
  }

  const situations = [
    {
      kicker: "Situação clínica 1",

      caseText:
        "Uma paciente de 79 anos, institucionalizada, realiza " +
        "urocultura durante uma avaliação de rotina. O exame " +
        "identifica Escherichia coli, mas ela não apresenta " +
        "disúria, urgência miccional, dor suprapúbica, dor " +
        "lombar, febre ou instabilidade clínica.",

      prompt:
        "Qual interpretação integra melhor o resultado " +
        "microbiológico ao quadro clínico?",

      correct: "b",

      options: [
        {
          id: "a",
          text:
            "A urocultura positiva confirma infecção urinária e " +
            "indica tratamento, mesmo na ausência de manifestações " +
            "clínicas."
        },
        {
          id: "b",
          text:
            "O resultado é compatível com bacteriúria assintomática; " +
            "na ausência de indicação específica, tratar exporia a " +
            "paciente a riscos sem benefício clínico esperado."
        },
        {
          id: "c",
          text:
            "O resultado não possui qualquer significado e deve ser " +
            "ignorado, pois culturas positivas em idosos representam " +
            "sempre contaminação da coleta."
        }
      ],

      feedback: {
        a:
          "A presença de bactéria na urina não estabelece, " +
          "isoladamente, infecção urinária. A interpretação exige " +
          "coerência com sintomas e sinais compatíveis com infecção " +
          "ativa.",

        b:
          "Na ausência de manifestações urinárias ou sistêmicas, " +
          "uma urocultura positiva pode representar bacteriúria " +
          "assintomática. Na maioria das situações, o tratamento " +
          "não oferece benefício e pode selecionar resistência, " +
          "alterar a microbiota e causar eventos adversos.",

        c:
          "Bacteriúria assintomática não é sinônimo de contaminação. " +
          "O resultado pode representar colonização verdadeira, " +
          "mas sua presença não constitui automaticamente uma " +
          "indicação de tratamento."
      }
    },

    {
      kicker: "Situação clínica 2",

      caseText:
        "Um paciente apresenta hipotensão, alteração do nível de " +
        "consciência e suspeita de sepse de foco urinário. Possui " +
        "cateter vesical, internação recente e uso de antibacteriano " +
        "no último mês. As culturas foram coletadas, mas os " +
        "resultados ainda não estão disponíveis.",

      prompt:
        "Qual estratégia equilibra melhor a urgência clínica, o " +
        "risco de resistência e a necessidade de reavaliação?",

      correct: "c",

      options: [
        {
          id: "a",
          text:
            "Aguardar a identificação do microrganismo antes de " +
            "iniciar qualquer antibacteriano, evitando exposição " +
            "desnecessária."
        },
        {
          id: "b",
          text:
            "Iniciar o esquema de menor espectro disponível e " +
            "mantê-lo até o final, independentemente da evolução " +
            "ou dos resultados microbiológicos."
        },
        {
          id: "c",
          text:
            "Iniciar prontamente cobertura empírica adequada ao foco, " +
            "à gravidade e aos fatores de risco, com reavaliação para " +
            "direcionamento assim que novos dados estiverem disponíveis."
        }
      ],

      feedback: {
        a:
          "Na presença de suspeita de sepse com disfunção orgânica, " +
          "a espera pelos resultados pode atrasar uma terapia eficaz. " +
          "As culturas devem ser obtidas sem produzir atraso " +
          "clinicamente relevante no tratamento.",

        b:
          "Um espectro muito estreito pode ser inadequado diante da " +
          "gravidade e dos fatores de risco para resistência. Além " +
          "disso, nenhum esquema empírico deve ser mantido sem " +
          "reavaliação após a chegada de novos dados.",

        c:
          "Na fase inicial da sepse, a urgência e o risco de tratamento " +
          "inadequado justificam cobertura empírica proporcional ao " +
          "foco e aos fatores de resistência. Depois, resultados " +
          "clínicos e microbiológicos devem orientar o estreitamento " +
          "ou outro ajuste necessário."
      }
    },

    {
      kicker: "Situação clínica 3",

      caseText:
        "Um paciente com infecção intra-abdominal recebe um " +
        "antibacteriano ativo contra os microrganismos isolados. " +
        "Após alguns dias, mantém febre e sinais inflamatórios. " +
        "A tomografia mostra um abscesso abdominal ainda não " +
        "drenado, sem evidência microbiológica de resistência.",

      prompt:
        "Qual decisão enfrenta de forma mais direta a causa provável " +
        "da persistência da infecção?",

      correct: "b",

      options: [
        {
          id: "a",
          text:
            "Acrescentar outro antibacteriano de amplo espectro, " +
            "pois a persistência da febre comprova cobertura " +
            "microbiológica insuficiente."
        },
        {
          id: "b",
          text:
            "Priorizar a avaliação para drenagem ou outra forma de " +
            "controle do foco, mantendo a antibioticoterapia adequada " +
            "e reavaliando os demais fatores clínicos."
        },
        {
          id: "c",
          text:
            "Aguardar apenas a ação do antibacteriano, porque um " +
            "resultado de suscetibilidade garante resolução mesmo " +
            "quando existe uma coleção fechada."
        }
      ],

      feedback: {
        a:
          "A persistência da febre não comprova, isoladamente, " +
          "cobertura inadequada. O caso apresenta um foco anatômico " +
          "não controlado e não oferece evidência de resistência que " +
          "justifique automaticamente a ampliação do espectro.",

        b:
          "Em abscessos e outras coleções, a drenagem ou intervenção " +
          "sobre a origem do processo pode ser determinante. A " +
          "antibioticoterapia atua em conjunto com o controle do foco " +
          "e não o substitui.",

        c:
          "A atividade demonstrada no teste de suscetibilidade não " +
          "garante resolução de uma coleção não drenada. Condições " +
          "anatômicas podem limitar a resposta e permitir a manutenção " +
          "do processo infeccioso."
      }
    }
  ];

  const progress =
    root.querySelector("[data-p75-progress]");

  const dots = Array.from(
    root.querySelectorAll(".cap8-p75Dots span")
  );

  const kicker =
    root.querySelector("[data-p75-kicker]");

  const caseText =
    root.querySelector("[data-p75-case]");

  const prompt =
    root.querySelector("[data-p75-prompt]");

  const options =
    root.querySelector("[data-p75-options]");

  const confirmButton =
    root.querySelector("[data-p75-confirm]");

  const resetButton =
    root.querySelector("[data-p75-reset]");

  const feedback =
    root.querySelector("[data-p75-feedback]");

  const previousButton =
    root.querySelector("[data-p75-prev]");

  const nextButton =
    root.querySelector("[data-p75-next]");

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

      letter.className = "cap8-p75Letter";
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
      "cap8-p75Feedback is-visible " +
      (isCorrect ? "is-correct" : "is-error");

    feedback.innerHTML = "";

    const title = document.createElement("strong");
    const explanation = document.createElement("p");

    title.textContent = isCorrect
      ? "Análise adequada"
      : "Reavalie o raciocínio";

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

    feedback.className = "cap8-p75Feedback";
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