/* =========================
   CAPÍTULO 7 — PÁGINA 62
   EFEITOS ADVERSOS DOS ANTIBACTERIANOS
   ========================= */

(function initCap7Page62(){
  "use strict";

  const root = document.querySelector(".cap7-page62");
  if(!root) return;

  const revealItems = Array.from(
    root.querySelectorAll(".cap7-p62-reveal")
  );

  if(!revealItems.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if(reducedMotion || !("IntersectionObserver" in window)){
    revealItems.forEach(function(item){
      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold:0.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   CAPÍTULO 7 — PÁGINA 63
   INIBIDORES DA SÍNTESE DA PAREDE CELULAR
   ========================= */

(function initCap7Page63(){
  "use strict";

  const root = document.querySelector(".cap7-page63");
  if(!root) return;

  const revealItems = Array.from(
    root.querySelectorAll(".cap7-p63-reveal")
  );

  if(!revealItems.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if(reducedMotion || !("IntersectionObserver" in window)){
    revealItems.forEach(function(item){
      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold:0.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   CAPÍTULO 7 — PÁGINA 64
   INIBIDORES DA SÍNTESE PROTEICA
   ========================= */

(function initCap7Page64(){
  "use strict";

  const page = document.querySelector(".cap7-page64");
  if(!page) return;

  const root = page.querySelector("[data-cap7-p64]");
  const tabs = root
    ? Array.from(root.querySelectorAll(".cap7-p64-tab"))
    : [];

  const panels = root
    ? Array.from(root.querySelectorAll(".cap7-p64-panel"))
    : [];

  function activateStep(key, moveFocus){
    tabs.forEach(function(tab){
      const isActive = tab.dataset.p64Step === key;

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute(
        "aria-selected",
        isActive ? "true" : "false"
      );

      tab.tabIndex = isActive ? 0 : -1;

      if(isActive && moveFocus){
        tab.focus();
      }
    });

    panels.forEach(function(panel){
      panel.hidden = panel.dataset.p64Panel !== key;
    });
  }

  if(tabs.length && panels.length){
    tabs.forEach(function(tab, index){
      tab.addEventListener("click", function(){
        activateStep(tab.dataset.p64Step, false);
      });

      tab.addEventListener("keydown", function(event){
        let nextIndex = index;

        if(
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ){
          event.preventDefault();
          nextIndex = (index + 1) % tabs.length;
        }

        if(
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ){
          event.preventDefault();
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        }

        if(event.key === "Home"){
          event.preventDefault();
          nextIndex = 0;
        }

        if(event.key === "End"){
          event.preventDefault();
          nextIndex = tabs.length - 1;
        }

        if(nextIndex !== index){
          activateStep(
            tabs[nextIndex].dataset.p64Step,
            true
          );
        }
      });
    });

    const initialTab = tabs.find(function(tab){
      return tab.classList.contains("is-active");
    });

    activateStep(
      initialTab
        ? initialTab.dataset.p64Step
        : tabs[0].dataset.p64Step,
      false
    );
  }

  const revealItems = Array.from(
    page.querySelectorAll(".cap7-p64-reveal")
  );

  if(!revealItems.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if(
    reducedMotion ||
    !("IntersectionObserver" in window)
  ){
    revealItems.forEach(function(item){
      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold:0.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   CAPÍTULO 7 — PÁGINA 65
   INIBIDORES DA SÍNTESE DE ÁCIDOS NUCLEICOS
   ========================= */

(function initCap7Page65(){
  "use strict";

  const page = document.querySelector(".cap7-page65");
  if(!page) return;

  const interaction = page.querySelector("[data-cap7-p65-risk]");

  const patientButtons = interaction
    ? Array.from(
        interaction.querySelectorAll(".cap7-p65-patient")
      )
    : [];

  const eyebrow = page.querySelector("#cap7-p65-eyebrow");
  const title = page.querySelector("#cap7-p65-title");
  const text = page.querySelector("#cap7-p65-text");

  const profiles = {
    baixo:{
      eyebrow:"Menor vulnerabilidade aparente",
      title:"Risco clínico menos evidente",
      text:
        "A ausência de fatores predisponentes não elimina a possibilidade de eventos adversos, mas reduz a presença de vulnerabilidades clínicas reconhecíveis no momento da avaliação."
    },

    tendao:{
      eyebrow:"Maior atenção para o tecido conjuntivo",
      title:"Tendinopatia e ruptura de tendão",
      text:
        "Idade avançada, uso concomitante de corticosteroide e história prévia de tendinopatia aumentam a vulnerabilidade do tendão. A dor súbita deve ser interpretada como possível manifestação musculoesquelética associada à exposição."
    },

    qt:{
      eyebrow:"Maior atenção para a repolarização cardíaca",
      title:"Prolongamento do intervalo QT",
      text:
        "A combinação entre cardiopatia, hipocalemia e uso de amiodarona cria um contexto de maior suscetibilidade à alteração da repolarização ventricular e ao desenvolvimento de arritmias."
    },

    neuro:{
      eyebrow:"Maior atenção para o sistema nervoso",
      title:"Neuropatia e maior exposição sistêmica",
      text:
        "Neuropatia periférica prévia e depuração renal reduzida podem aumentar a vulnerabilidade neurológica e a exposição ao medicamento, exigindo interpretação cuidadosa de novas manifestações sensitivas ou motoras."
    }
  };

  function activateProfile(key){
    const selectedProfile = profiles[key];
    if(!selectedProfile) return;

    patientButtons.forEach(function(button){
      const isActive =
        button.dataset.p65Patient === key;

      button.classList.toggle(
        "is-active",
        isActive
      );

      button.setAttribute(
        "aria-pressed",
        isActive ? "true" : "false"
      );
    });

    if(eyebrow){
      eyebrow.textContent =
        selectedProfile.eyebrow;
    }

    if(title){
      title.textContent =
        selectedProfile.title;
    }

    if(text){
      text.textContent =
        selectedProfile.text;
    }
  }

  patientButtons.forEach(function(button){
    button.addEventListener("click", function(){
      activateProfile(
        button.dataset.p65Patient
      );
    });
  });

  if(patientButtons.length){
    const initialButton = patientButtons.find(
      function(button){
        return button.classList.contains(
          "is-active"
        );
      }
    );

    activateProfile(
      initialButton
        ? initialButton.dataset.p65Patient
        : patientButtons[0].dataset.p65Patient
    );
  }

  const revealItems = Array.from(
    page.querySelectorAll(
      ".cap7-p65-reveal"
    )
  );

  if(!revealItems.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if(
    reducedMotion ||
    !("IntersectionObserver" in window)
  ){
    revealItems.forEach(function(item){
      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;

        entry.target.classList.add(
          "is-visible"
        );

        observer.unobserve(
          entry.target
        );
      });
    },
    {
      threshold:0.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 68 — QUIZ DE REVISÃO
   ========================= */

(function initCap7Page68Quiz() {
  "use strict";

  const root = document.querySelector("[data-cap7-p68]");

  if (!root) {
    return;
  }

  const situations = [
    {
      kicker: "Situação clínica 1",

      caseText:
        "Uma paciente com infecção bacteriana apresenta no " +
        "prontuário o registro “alergia à penicilina”. Ao ser " +
        "questionada, relata apenas manchas na pele durante a " +
        "infância, sem falta de ar, edema, queda da pressão ou " +
        "necessidade de atendimento emergencial. Como consequência " +
        "do registro, considera-se utilizar um antibacteriano " +
        "alternativo de espectro mais amplo.",

      prompt:
        "Qual análise é mais adequada antes de excluir todos os " +
        "betalactâmicos?",

      correct: "b",

      options: [
        {
          id: "a",
          text:
            "O registro deve ser considerado confirmação de " +
            "anafilaxia, pois qualquer manifestação cutânea prévia " +
            "indica hipersensibilidade imediata grave."
        },
        {
          id: "b",
          text:
            "A história deve ser caracterizada e o risco avaliado, " +
            "pois um relato remoto e pouco definido não confirma " +
            "alergia verdadeira e pode justificar investigação " +
            "apropriada antes da substituição."
        },
        {
          id: "c",
          text:
            "O registro deve ser ignorado e o betalactâmico " +
            "administrado diretamente, porque reações ocorridas na " +
            "infância nunca permanecem clinicamente relevantes."
        }
      ],

      feedback: {
        a:
          "Uma manifestação cutânea remota não permite concluir " +
          "que houve anafilaxia. É necessário caracterizar o tipo " +
          "de reação, o tempo entre a administração e os sintomas, " +
          "a gravidade e exposições posteriores.",

        b:
          "Muitos registros de alergia à penicilina não correspondem " +
          "a hipersensibilidade confirmada. A avaliação estruturada " +
          "do histórico e, quando apropriado, a investigação do " +
          "rótulo podem evitar a exclusão desnecessária de agentes " +
          "de primeira linha e o uso de alternativas mais amplas.",

        c:
          "Um registro impreciso não deve ser aceito sem análise, " +
          "mas também não deve ser simplesmente ignorado. A conduta " +
          "depende da avaliação de risco e, quando indicada, de " +
          "investigação conduzida de forma segura."
      }
    },

    {
      kicker: "Situação clínica 2",

      caseText:
        "Um homem de 63 anos recebe linezolida para tratamento " +
        "prolongado de osteomielite causada por Staphylococcus " +
        "aureus resistente à meticilina. Após três semanas, " +
        "apresenta fadiga, parestesias nos membros inferiores e " +
        "redução progressiva da hemoglobina e das plaquetas.",

      prompt:
        "Qual interpretação relaciona melhor a duração da exposição, " +
        "o mecanismo de toxicidade e as manifestações observadas?",

      correct: "c",

      options: [
        {
          id: "a",
          text:
            "O quadro sugere destruição imunológica imediata das " +
            "células sanguíneas, sem relação relevante com a duração " +
            "do tratamento."
        },
        {
          id: "b",
          text:
            "Os achados indicam perda da atividade antibacteriana, " +
            "pois a resistência do microrganismo produz anemia, " +
            "trombocitopenia e neuropatia."
        },
        {
          id: "c",
          text:
            "A exposição cumulativa pode interferir na síntese " +
            "proteica mitocondrial, comprometendo tecidos com alta " +
            "renovação ou demanda energética, como medula óssea e " +
            "sistema nervoso."
        }
      ],

      feedback: {
        a:
          "O aparecimento após exposição prolongada, associado a " +
          "alterações hematológicas e neurológicas, não favorece " +
          "uma reação imunológica imediata como principal explicação.",

        b:
          "Anemia, trombocitopenia e parestesias não demonstram " +
          "resistência bacteriana. A eficácia microbiológica e a " +
          "toxicidade para o hospedeiro são dimensões diferentes " +
          "do tratamento.",

        c:
          "A linezolida pode interferir na tradução de proteínas " +
          "mitocondriais. Com o aumento da exposição cumulativa, " +
          "medula óssea e sistema nervoso tornam-se vulneráveis, " +
          "explicando a associação entre mielossupressão e " +
          "manifestações neuropáticas."
      }
    },

    {
      kicker: "Situação clínica 3",

      caseText:
        "Uma paciente de 74 anos, com doença renal crônica, utiliza " +
        "losartana e espironolactona. Durante o tratamento com " +
        "sulfametoxazol–trimetoprim, apresenta elevação progressiva " +
        "do potássio sérico, sem evidência de hemólise ou lesão " +
        "muscular.",

      prompt:
        "Qual raciocínio explica melhor por que essa paciente apresenta " +
        "maior risco de hipercalemia?",

      correct: "b",

      options: [
        {
          id: "a",
          text:
            "O sulfametoxazol causa destruição muscular, e os demais " +
            "medicamentos aumentam a transferência do potássio para " +
            "fora das células."
        },
        {
          id: "b",
          text:
            "O trimetoprim reduz a excreção renal de potássio por " +
            "efeito semelhante ao da amilorida, e esse efeito se soma " +
            "à disfunção renal e aos medicamentos que também favorecem " +
            "a retenção de potássio."
        },
        {
          id: "c",
          text:
            "A hipercalemia decorre exclusivamente da inibição da " +
            "síntese de folato bacteriano e não possui relação com a " +
            "função renal ou com os medicamentos concomitantes."
        }
      ],

      feedback: {
        a:
          "O caso não apresenta evidência de lesão muscular. A " +
          "hipercalemia associada ao trimetoprim decorre principalmente " +
          "da redução da eliminação renal de potássio.",

        b:
          "O trimetoprim pode bloquear canais epiteliais de sódio no " +
          "néfron distal, reduzindo a secreção de potássio. Doença renal " +
          "crônica, losartana e espironolactona diminuem ainda mais a " +
          "capacidade de eliminar esse eletrólito, elevando o risco.",

        c:
          "O efeito sobre o potássio não é explicado diretamente pela " +
          "inibição da via bacteriana do folato. Ele resulta de uma " +
          "ação renal do trimetoprim e é influenciado pela função renal " +
          "e pelos medicamentos utilizados simultaneamente."
      }
    }
  ];

  const progress =
    root.querySelector("[data-p68-progress]");

  const dots = Array.from(
    root.querySelectorAll(".cap7-p68Dots span")
  );

  const kicker =
    root.querySelector("[data-p68-kicker]");

  const caseText =
    root.querySelector("[data-p68-case]");

  const prompt =
    root.querySelector("[data-p68-prompt]");

  const options =
    root.querySelector("[data-p68-options]");

  const confirmButton =
    root.querySelector("[data-p68-confirm]");

  const resetButton =
    root.querySelector("[data-p68-reset]");

  const feedback =
    root.querySelector("[data-p68-feedback]");

  const previousButton =
    root.querySelector("[data-p68-prev]");

  const nextButton =
    root.querySelector("[data-p68-next]");

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

      letter.className = "cap7-p68Letter";
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
      "cap7-p68Feedback is-visible " +
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

    feedback.className = "cap7-p68Feedback";
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