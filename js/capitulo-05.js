/* =========================
   CAPÍTULO 5 — PÁGINA 39
   LIBERAÇÃO PROGRESSIVA DO LAUDO
   ========================= */

(function initCap5Page39V2(){
  const root = document.querySelector("[data-cap5-p39v2]");

  if(!root) return;

  const tabs = Array.from(
    root.querySelectorAll("[data-p39v2-target]")
  );

  const view = root.querySelector("#cap5P39V2View");
  const resultLabel = root.querySelector("#cap5P39V2ResultLabel");
  const resultText = root.querySelector("#cap5P39V2Result");
  const body = root.querySelector("#cap5P39V2Body");

  if(
    !tabs.length ||
    !view ||
    !resultLabel ||
    !resultText ||
    !body
  ){
    return;
  }

  const states = {
    gram:{
      tabId:"cap5P39V2TabGram",

      result:
        "Cocos Gram-positivos em cachos nos dois frascos.",

      question:
        "Considerando que o paciente já iniciou antibioticoterapia empírica, qual é a conduta mais adequada diante desse resultado preliminar?",

      options:[
        "Manter o esquema inicialmente prescrito até a identificação da espécie, pois a bacterioscopia fornece apenas informações sobre a morfologia e o arranjo bacteriano.",

        "Redirecionar o esquema para cocos Gram-positivos, considerando a concordância entre o resultado dos dois frascos, a presença do cateter e a instabilidade clínica.",

        "Revisar se o esquema iniciado contempla o grupo bacteriano sugerido e os fatores de risco do paciente, ajustando-o caso seja identificada possível falha de cobertura, sem restringir o tratamento apenas com base na bacterioscopia."
      ],

      correct:2,

      nextLabel:
        "Continuar para Identificação →",

      feedback:
        "A bacterioscopia deve levar à revisão da cobertura empírica, mas não determina sozinha a manutenção ou a modificação do tratamento. O achado sugere estafilococos, porém ainda não define a espécie, a fonte da infecção ou o perfil de suscetibilidade."
    },

    identificacao:{
      tabId:"cap5P39V2TabIdentificacao",

      result:
        "Microrganismo identificado nos dois frascos: <em>Staphylococcus aureus</em>.",

      question:
        "Como essa identificação deve modificar a interpretação do caso?",

      options:[
        "A presença do cateter, associada à identificação nos dois frascos, permite atribuir a ele a origem da infecção e concentrar a investigação nesse dispositivo.",

        "O isolamento deve ser considerado clinicamente relevante e levar à investigação da bacteremia e de suas possíveis fontes, incluindo o cateter, sem definir a origem apenas pelo resultado da hemocultura.",

        "Como o microrganismo pode colonizar a pele e os dois frascos pertencem à mesma coleta, o resultado deve permanecer como possível contaminação até a confirmação em uma nova amostra."
      ],

      correct:1,

      nextLabel:
        "Continuar para Suscetibilidade →",

      feedback:
        "O isolamento de <em>Staphylococcus aureus</em> em hemocultura deve ser valorizado como clinicamente relevante. O cateter é uma fonte possível, mas sua presença não confirma a origem da bacteremia. Essa definição exige integração com a avaliação clínica e outros dados da investigação."
    },

    suscetibilidade:{
      tabId:"cap5P39V2TabSuscetibilidade",

      result:
        "Perfil disponível: antibacteriano A — I; antibacteriano B — S; antibacteriano C — R <sup>3,4</sup>.",

      question:
        "Como esse perfil deve ser utilizado para direcionar o tratamento?",

      options:[
        "Priorizar o antibacteriano B, pois a categoria S indica maior atividade que a categoria I e justifica sua escolha mesmo quando apresenta espectro mais amplo.",

        "Manter o esquema empírico sem modificações até observar a evolução clínica, pois o teste realizado in vitro não reproduz todas as condições presentes no paciente.",

        "Considerar A e B como opções suscetíveis, avaliando a exposição necessária, o espectro, o local da infecção e as características do paciente, sem interpretar S como automaticamente superior a I."
      ],

      correct:2,

      feedback:
        "As categorias S e I indicam suscetibilidade: S com esquema de exposição padrão e I quando há aumento da exposição. A categoria R indica alta probabilidade de falha mesmo com maior exposição. O perfil permite direcionar o tratamento, mas a escolha também deve considerar o espectro, o local da infecção, as características do paciente, o controle do foco e a evolução clínica."
    }
  };

  let currentTarget = "gram";

  function render(target){
    const state = states[target];

    if(!state) return;

    currentTarget = target;

    tabs.forEach(function(tab){
      const active =
        tab.dataset.p39v2Target === target;

      tab.classList.toggle(
        "is-active",
        active
      );

      tab.setAttribute(
        "aria-selected",
        active ? "true" : "false"
      );

      tab.setAttribute(
        "tabindex",
        active ? "0" : "-1"
      );
    });

    view.setAttribute(
      "aria-labelledby",
      state.tabId
    );

    resultLabel.textContent =
      "Informação liberada";

    resultText.innerHTML =
      state.result;

    body.innerHTML = `
      <p class="cap5-p39v2-questionTitle">
        ${state.question}
      </p>

      <div
        class="cap5-p39v2-options"
        role="group"
        aria-label="Opções de resposta"
      >
        ${state.options.map(
          function(option, optionIndex){
            return `
              <button
                type="button"
                class="cap5-p39v2-option"
                data-option="${optionIndex}"
              >
                <span>
                  ${String.fromCharCode(
                    65 + optionIndex
                  )}
                </span>

                ${option}
              </button>
            `;
          }
        ).join("")}
      </div>

      <div
        class="cap5-p39v2-feedback"
        aria-live="polite"
      ></div>
    `;

    const optionButtons = Array.from(
      body.querySelectorAll("[data-option]")
    );

    const feedback = body.querySelector(
      ".cap5-p39v2-feedback"
    );

    optionButtons.forEach(function(button){
      button.addEventListener(
        "click",
        function(){
          const selected = Number(
            button.dataset.option
          );

          const isCorrect =
            selected === state.correct;

          optionButtons.forEach(
            function(item){
              item.disabled = true;

              if(
                Number(item.dataset.option) ===
                state.correct
              ){
                item.classList.add(
                  "is-correct"
                );
              }
            }
          );

          button.classList.add(
            isCorrect
              ? "is-correct"
              : "is-incorrect"
          );

          feedback.className =
            `cap5-p39v2-feedback ${
              isCorrect
                ? "is-success"
                : "is-attention"
            }`;

          const finalMessage = `
            <strong class="cap5-p39v2-complete">
              Análise concluída: cada novo resultado
              permitiu revisar a decisão anterior, mas
              o laudo permaneceu integrado ao quadro
              clínico.
            </strong>
          `;

          const nextContent =
            target !== "suscetibilidade"
              ? `
                <button
                  type="button"
                  class="cap5-p39v2-continue"
                >
                  ${state.nextLabel}
                </button>
              `
              : finalMessage;

          feedback.innerHTML = isCorrect
            ? `
              <strong>Muito bem.</strong>
              ${state.feedback}
              ${nextContent}
            `
            : `
              <strong>Reavalie o raciocínio.</strong>
              A alternativa escolhida não integra
              todos os dados disponíveis.
              ${state.feedback}
              ${nextContent}
            `;

          const continueButton =
            feedback.querySelector(
              ".cap5-p39v2-continue"
            );

          if(continueButton){
            continueButton.addEventListener(
              "click",
              function(){
                const currentIndex =
                  tabs.findIndex(
                    function(tab){
                      return (
                        tab.dataset.p39v2Target ===
                        target
                      );
                    }
                  );

                const nextTab =
                  tabs[currentIndex + 1];

                nextTab.disabled = false;

                nextTab.classList.add(
                  "is-unlocked"
                );

                render(
                  nextTab.dataset.p39v2Target
                );

                nextTab.focus();
              }
            );
          }
        }
      );
    });
  }

  tabs.forEach(function(tab, index){
    tab.addEventListener(
      "click",
      function(){
        if(tab.disabled) return;

        render(
          tab.dataset.p39v2Target
        );
      }
    );

    tab.addEventListener(
      "keydown",
      function(event){
        let nextIndex = null;

        if(
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ){
          nextIndex =
            (index + 1) % tabs.length;
        }

        if(
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ){
          nextIndex =
            (
              index - 1 + tabs.length
            ) % tabs.length;
        }

        if(event.key === "Home"){
          nextIndex = 0;
        }

        if(event.key === "End"){
          nextIndex =
            tabs.length - 1;
        }

        if(
          nextIndex === null ||
          tabs[nextIndex].disabled
        ){
          return;
        }

        event.preventDefault();

        tabs[nextIndex].focus();

        render(
          tabs[nextIndex]
            .dataset.p39v2Target
        );
      }
    );
  });

  render(currentTarget);

  const revealItems =
    document.querySelectorAll(
      ".cap5-page39 .cap5-p39v2-reveal"
    );

  if(
    !(
      "IntersectionObserver"
      in window
    )
  ){
    revealItems.forEach(
      function(item){
        item.classList.add(
          "is-visible"
        );
      }
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      function(entries){
        entries.forEach(
          function(entry){
            if(
              !entry.isIntersecting
            ){
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        );
      },
      {
        threshold:.16,
        rootMargin:
          "0px 0px -35px 0px"
      }
    );

  revealItems.forEach(
    function(item){
      observer.observe(item);
    }
  );
})();
/* =========================
   CAPÍTULO 5 — PÁGINA 40
   ATIVIDADE: BACTERIOSCOPIA
   ========================= */

(function initCap5Page40() {
  const root = document.querySelector("[data-cap5-p40v4]");

  if (!root) {
    return;
  }

  const options = Array.from(
    root.querySelectorAll(".cap5-p40v4-option")
  );

  const inputs = Array.from(
    root.querySelectorAll(
      '.cap5-p40v4-option input[type="checkbox"]'
    )
  );

  const checkButton = root.querySelector("[data-p40v4-check]");
  const resetButton = root.querySelector("[data-p40v4-reset]");
  const alertBox = root.querySelector("[data-p40v4-alert]");
  const feedback = root.querySelector("[data-p40v4-feedback]");
  const feedbackIcon = root.querySelector(
    "[data-p40v4-feedback-icon]"
  );
  const feedbackTitle = root.querySelector(
    "[data-p40v4-feedback-title]"
  );
  const feedbackText = root.querySelector(
    "[data-p40v4-feedback-text]"
  );
  const report = root.querySelector("[data-p40v4-report]");
  const limits = root.querySelector("[data-p40v4-limits]");

  if (
    !options.length ||
    !inputs.length ||
    !checkButton ||
    !resetButton ||
    !alertBox ||
    !feedback ||
    !feedbackIcon ||
    !feedbackTitle ||
    !feedbackText ||
    !report ||
    !limits
  ) {
    return;
  }

  /*
   * Informações que podem ser adequadamente descritas
   * pela bacterioscopia apresentada.
   */
  const correctValues = new Set([
    "cocos",
    "bacilos",
    "leucocitos"
  ]);

  function updateSelectedState() {
    options.forEach(function (option) {
      const input = option.querySelector(
        'input[type="checkbox"]'
      );

      option.classList.toggle(
        "is-selected",
        input.checked
      );
    });

    alertBox.hidden = true;
  }

  function clearResultClasses() {
    options.forEach(function (option) {
      option.classList.remove(
        "is-selected",
        "is-correct",
        "is-incorrect",
        "is-missed",
        "is-locked"
      );
    });
  }

  function checkAnswers() {
    const selectedInputs = inputs.filter(function (input) {
      return input.checked;
    });

    if (!selectedInputs.length) {
      alertBox.hidden = false;
      alertBox.focus?.();
      return;
    }

    alertBox.hidden = true;

    let selectedCorrect = 0;
    let selectedIncorrect = 0;
    let missedCorrect = 0;

    options.forEach(function (option) {
      const input = option.querySelector(
        'input[type="checkbox"]'
      );

      const shouldBeSelected = correctValues.has(
        input.value
      );

      option.classList.remove("is-selected");

      if (input.checked && shouldBeSelected) {
        option.classList.add("is-correct");
        selectedCorrect += 1;
      }

      if (input.checked && !shouldBeSelected) {
        option.classList.add("is-incorrect");
        selectedIncorrect += 1;
      }

      if (!input.checked && shouldBeSelected) {
        option.classList.add("is-missed");
        missedCorrect += 1;
      }

      option.classList.add("is-locked");
      input.disabled = true;
    });

    const complete =
      selectedCorrect === correctValues.size &&
      selectedIncorrect === 0 &&
      missedCorrect === 0;

    feedback.classList.remove(
      "is-complete",
      "is-partial"
    );

    if (complete) {
      feedback.classList.add("is-complete");
      feedbackIcon.textContent = "✓";
      feedbackTitle.textContent =
        "Descrição construída adequadamente";

      feedbackText.textContent =
        "Você diferenciou os achados que podem ser descritos pela bacterioscopia das conclusões que dependem de outras etapas da investigação microbiológica.";
    } else {
      feedback.classList.add("is-partial");
      feedbackIcon.textContent = "!";
      feedbackTitle.textContent =
        "Revise o alcance da bacterioscopia";

      if (
        selectedIncorrect > 0 &&
        missedCorrect > 0
      ) {
        feedbackText.textContent =
          "Algumas informações observáveis não foram selecionadas e algumas conclusões escolhidas ultrapassam o que esse exame permite afirmar. Compare sua seleção com a descrição possível e com os limites do método.";
      } else if (selectedIncorrect > 0) {
        feedbackText.textContent =
          "Você reconheceu os principais achados, mas selecionou conclusões que dependem da cultura, da identificação ou da correlação com o tipo de amostra e o contexto clínico.";
      } else {
        feedbackText.textContent =
          "As opções selecionadas estão adequadas, mas outras informações observáveis também poderiam constar na descrição da bacterioscopia.";
      }
    }

    /*
     * A descrição e os limites aparecem mesmo quando
     * a resposta não está completa, pois fazem parte
     * do feedback formativo da atividade.
     */
    report.hidden = false;
    limits.hidden = false;
    feedback.hidden = false;

    checkButton.hidden = true;
    resetButton.hidden = false;

    feedback.focus();
  }

  function resetActivity() {
    clearResultClasses();

    inputs.forEach(function (input) {
      input.checked = false;
      input.disabled = false;
    });

    alertBox.hidden = true;
    feedback.hidden = true;
    report.hidden = true;
    limits.hidden = true;

    feedback.classList.remove(
      "is-complete",
      "is-partial"
    );

    feedbackIcon.textContent = "";
    feedbackTitle.textContent = "";
    feedbackText.textContent = "";

    checkButton.hidden = false;
    resetButton.hidden = true;

    const firstInput = inputs[0];

    if (firstInput) {
      firstInput.focus();
    }
  }

  inputs.forEach(function (input) {
    input.addEventListener(
      "change",
      updateSelectedState
    );
  });

  checkButton.addEventListener(
    "click",
    checkAnswers
  );

  resetButton.addEventListener(
    "click",
    resetActivity
  );

  /*
   * Exibe os blocos da página quando entram
   * na área visível da tela.
   */
  const revealItems = document.querySelectorAll(
    ".cap5-page40 .cap5-p40v3-reveal"
  );

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
})();
/* =========================
   CAPÍTULO 5 — PÁGINA 41
   COLORAÇÃO DE GRAM
   ========================= */

(function initCap5Page41V4() {
  const root = document.querySelector(
    "[data-cap5-p41v4]"
  );

  if (!root) {
    return;
  }

  const tabs = Array.from(
    root.querySelectorAll("[data-p41v4-target]")
  );

  const view = root.querySelector(
    "#cap5P41V4View"
  );

  const image = root.querySelector(
    "#cap5P41V4Image"
  );

  const caption = root.querySelector(
    "#cap5P41V4Caption"
  );

  const kicker = root.querySelector(
    "#cap5P41V4Kicker"
  );

  const title = root.querySelector(
    "#cap5P41V4Title"
  );

  const body = root.querySelector(
    "#cap5P41V4Body"
  );

  const zoom = root.querySelector(
    "#cap5P41V4Zoom"
  );

  const finalResults = root.querySelector(
    "[data-p41v4-results]"
  );

  if (
    !tabs.length ||
    !view ||
    !image ||
    !caption ||
    !kicker ||
    !title ||
    !body ||
    !zoom
  ) {
    return;
  }

  function createInformationGrid(
    event,
    gramPositive,
    gramNegative,
    meaning
  ) {
    return `
      <div class="cap5-p41v4-infoGrid">

        <article class="cap5-p41v4-info">
          <span>O que acontece</span>
          <p>${event}</p>
        </article>

        <article class="cap5-p41v4-info">
          <span>Gram-positivas</span>
          <p>${gramPositive}</p>
        </article>

        <article class="cap5-p41v4-info">
          <span>Gram-negativas</span>
          <p>${gramNegative}</p>
        </article>

        <article
          class="cap5-p41v4-info cap5-p41v4-info--key"
        >
          <span>Por que isso importa?</span>
          <p>${meaning}</p>
        </article>

      </div>
    `;
  }

  const states = {
    fixacao: {
      tabId: "cap5P41V4TabFixacao",

      image:
        "../../assets/capitulo-05/imagens/fixacao.png",

      alt:
        "Etapa de fixação da amostra na coloração de Gram",

      caption:
        "Preparação e fixação do material na lâmina.",

      kicker:
        "Etapa preparatória",

      title:
        "Fixação da amostra",

      body: createInformationGrid(
        "O material é fixado à lâmina para permanecer aderido durante a coloração.",
        "Ainda não apresentam diferenciação pela cor.",
        "Ainda não apresentam diferenciação pela cor.",
        "Uma fixação inadequada pode causar perda de material ou alterar a morfologia observada."
      )
    },

    cristal: {
      tabId: "cap5P41V4TabCristal",

      image:
        "../../assets/capitulo-05/imagens/cristal-violeta.png",

      alt:
        "Aplicação do cristal violeta na coloração de Gram",

      caption:
        "Aplicação do corante primário.",

      kicker:
        "Corante primário",

      title:
        "Aplicação do cristal violeta",

      body: createInformationGrid(
        "O cristal violeta penetra nas células bacterianas e produz uma coloração violeta inicial.",
        "Ficam violetas.",
        "Também ficam violetas.",
        "Neste momento, os dois grupos apresentam a mesma cor; a diferenciação ainda não ocorreu."
      )
    },

    lugol: {
      tabId: "cap5P41V4TabLugol",

      image:
        "../../assets/capitulo-05/imagens/lugol.png",

      alt:
        "Aplicação do Lugol na coloração de Gram",

      caption:
        "Formação do complexo cristal violeta–iodo.",

      kicker:
        "Mordente",

      title:
        "Aplicação do Lugol",

      body: createInformationGrid(
        "O iodo atua como mordente e forma o complexo cristal violeta–iodo no interior das células.",
        "Permanecem violetas.",
        "Também permanecem violetas.",
        "O complexo será retido de maneira diferente pelos dois grupos durante a descoloração."
      )
    },

    alcool: {
      tabId: "cap5P41V4TabAlcool",

      image:
        "../../assets/capitulo-05/imagens/alcool-acetona.png",

      alt:
        "Etapa de descoloração na coloração de Gram",

      caption:
        "Etapa crítica da diferenciação.",

      kicker:
        "Etapa crítica",

      title:
        "Descoloração",

      body: createInformationGrid(
        "O agente descolorante remove seletivamente o complexo cristal violeta–iodo.",
        "Retêm o complexo e permanecem violetas.",
        "Perdem o complexo e ficam temporariamente incolores.",
        "Excesso ou insuficiência de descoloração pode produzir uma reação ao Gram diferente da esperada."
      )
    },

    safranina: {
      tabId: "cap5P41V4TabSafranina",

      image:
        "../../assets/capitulo-05/imagens/safranina.png",

      alt:
        "Aplicação da safranina na coloração de Gram",

      caption:
        "Aplicação do contra-corante e resultado final.",

      kicker:
        "Contra-corante",

      title:
        "Aplicação da safranina",

      body: createInformationGrid(
        "A safranina cora as bactérias que ficaram incolores após a descoloração.",
        "Permanecem violetas; a cor mais intensa do cristal violeta predomina.",
        "Adquirem coloração rosada.",
        "A cor final fornece uma caracterização inicial, mas não identifica a espécie bacteriana."
      )
    }
  };

  let transitionTimer = null;

  function updateFinalResults(target) {
    if (!finalResults) {
      return;
    }

    finalResults.hidden = target !== "safranina";
  }

  function renderStage(target) {
    const state = states[target];

    if (!state) {
      return;
    }

    tabs.forEach(function (tab) {
      const active =
        tab.dataset.p41v4Target === target;

      tab.classList.toggle(
        "is-active",
        active
      );

      tab.setAttribute(
        "aria-selected",
        active ? "true" : "false"
      );

      tab.setAttribute(
        "tabindex",
        active ? "0" : "-1"
      );
    });

    view.setAttribute(
      "aria-labelledby",
      state.tabId
    );

    updateFinalResults(target);

    window.clearTimeout(transitionTimer);
    image.classList.add("is-changing");

    transitionTimer = window.setTimeout(
      function () {
        image.src = state.image;
        image.alt = state.alt;

        caption.textContent = state.caption;
        kicker.textContent = state.kicker;
        title.textContent = state.title;
        body.innerHTML = state.body;

        zoom.dataset.zoom = state.image;

        zoom.setAttribute(
          "aria-label",
          "Ampliar imagem: " + state.title
        );

        image.classList.remove("is-changing");
      },
      120
    );
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      renderStage(
        tab.dataset.p41v4Target
      );
    });

    tab.addEventListener(
      "keydown",
      function (event) {
        let nextIndex = null;

        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ) {
          nextIndex =
            (index + 1) % tabs.length;
        }

        if (
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ) {
          nextIndex =
            (index - 1 + tabs.length) %
            tabs.length;
        }

        if (event.key === "Home") {
          nextIndex = 0;
        }

        if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex === null) {
          return;
        }

        event.preventDefault();

        tabs[nextIndex].focus();

        renderStage(
          tabs[nextIndex].dataset.p41v4Target
        );
      }
    );
  });

  renderStage("fixacao");
})();

/* =========================
   ABERTURA DAS INTERFERÊNCIAS
   ========================= */

(function initCap5Page41Disclosure() {
  const root = document.querySelector(
    "[data-cap5-p41v4-interferences]"
  );

  if (!root) {
    return;
  }

  const openButton = root.querySelector(
    "[data-p41v4-open-interferences]"
  );

  const content = root.querySelector(
    "[data-p41v4-interferences-content]"
  );

  if (!openButton || !content) {
    return;
  }

  const buttonStatus =
    openButton.querySelector("span");

  openButton.addEventListener(
    "click",
    function () {
      const expanded =
        openButton.getAttribute(
          "aria-expanded"
        ) === "true";

      openButton.setAttribute(
        "aria-expanded",
        expanded ? "false" : "true"
      );

      content.hidden = expanded;

      if (buttonStatus) {
        buttonStatus.textContent = expanded
          ? "Ver interferências →"
          : "Ocultar ↑";
      }

      if (!expanded) {
        content.setAttribute(
          "tabindex",
          "-1"
        );

        content.focus({
          preventScroll: true
        });

        content.removeAttribute("tabindex");
      }
    }
  );
})();

/* =========================
   INTERFERÊNCIAS DA COLORAÇÃO
   ========================= */

(function initCap5Page41Interferences() {
  const root = document.querySelector(
    "[data-cap5-p41v4-interferences]"
  );

  if (!root) {
    return;
  }

  const tabs = Array.from(
    root.querySelectorAll(
      "[data-p41v4-interference]"
    )
  );

  const view = root.querySelector(
    "#cap5P41V4InterferenceView"
  );

  const effect = root.querySelector(
    "#cap5P41V4InterferenceEffect"
  );

  const meaning = root.querySelector(
    "#cap5P41V4InterferenceMeaning"
  );

  if (
    !tabs.length ||
    !view ||
    !effect ||
    !meaning
  ) {
    return;
  }

  const states = {
    excesso: {
      tabId:
        "cap5P41V4IntTabExcesso",

      effect:
        "Bactérias Gram-positivas podem perder o complexo cristal violeta–iodo e aparecer rosadas.",

      meaning:
        "O resultado pode sugerir incorretamente uma reação Gram-negativa."
    },

    insuficiente: {
      tabId:
        "cap5P41V4IntTabInsuficiente",

      effect:
        "Bactérias Gram-negativas podem não perder completamente o complexo e permanecer violetas.",

      meaning:
        "O resultado pode sugerir incorretamente uma reação Gram-positiva."
    },

    espesso: {
      tabId:
        "cap5P41V4IntTabEspesso",

      effect:
        "A passagem dos reagentes e a descoloração podem ocorrer de forma irregular, com sobreposição de estruturas.",

      meaning:
        "A cor e a morfologia tornam-se mais difíceis de interpretar com segurança."
    },

    alteradas: {
      tabId:
        "cap5P41V4IntTabAlteradas",

      effect:
        "Células danificadas, expostas a antibacterianos ou provenientes de culturas envelhecidas podem apresentar coloração irregular ou Gram-variável.",

      meaning:
        "A reação observada pode não corresponder ao padrão habitualmente esperado para o microrganismo."
    },

    artefatos: {
      tabId:
        "cap5P41V4IntTabArtefatos",

      effect:
        "Precipitados de corante e outros materiais podem produzir estruturas semelhantes a bactérias.",

      meaning:
        "Um artefato pode ser interpretado como microrganismo se a lâmina não for avaliada cuidadosamente."
    }
  };

  function renderInterference(target) {
    const state = states[target];

    if (!state) {
      return;
    }

    tabs.forEach(function (tab) {
      const active =
        tab.dataset.p41v4Interference ===
        target;

      tab.classList.toggle(
        "is-active",
        active
      );

      tab.setAttribute(
        "aria-selected",
        active ? "true" : "false"
      );

      tab.setAttribute(
        "tabindex",
        active ? "0" : "-1"
      );
    });

    view.setAttribute(
      "aria-labelledby",
      state.tabId
    );

    effect.textContent = state.effect;
    meaning.textContent = state.meaning;
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      renderInterference(
        tab.dataset.p41v4Interference
      );
    });

    tab.addEventListener(
      "keydown",
      function (event) {
        let nextIndex = null;

        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ) {
          nextIndex =
            (index + 1) % tabs.length;
        }

        if (
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ) {
          nextIndex =
            (index - 1 + tabs.length) %
            tabs.length;
        }

        if (event.key === "Home") {
          nextIndex = 0;
        }

        if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex === null) {
          return;
        }

        event.preventDefault();

        tabs[nextIndex].focus();

        renderInterference(
          tabs[nextIndex].dataset
            .p41v4Interference
        );
      }
    );
  });

  renderInterference("excesso");
})();

/* =========================
   ABERTURA DA SITUAÇÃO
   ========================= */

(function initCap5Page41ChallengeDisclosure() {
  const root = document.querySelector(
    "[data-cap5-p41v4-interferences]"
  );

  if (!root) {
    return;
  }

  const openButton = root.querySelector(
    "[data-p41v4-open-challenge]"
  );

  const challenge = root.querySelector(
    "[data-p41v4-challenge]"
  );

  if (!openButton || !challenge) {
    return;
  }

  openButton.addEventListener(
    "click",
    function () {
      const expanded =
        openButton.getAttribute(
          "aria-expanded"
        ) === "true";

      openButton.setAttribute(
        "aria-expanded",
        expanded ? "false" : "true"
      );

      challenge.hidden = expanded;

      openButton.textContent = expanded
        ? "Aplicar em uma situação"
        : "Ocultar situação ↑";

      if (!expanded) {
        challenge.setAttribute(
          "tabindex",
          "-1"
        );

        challenge.focus({
          preventScroll: true
        });

        challenge.removeAttribute("tabindex");
      }
    }
  );
})();

/* =========================
   QUESTÃO APLICADA
   ========================= */

(function initCap5Page41Challenge() {
  const root = document.querySelector(
    "[data-cap5-p41v4-interferences]"
  );

  if (!root) {
    return;
  }

  const options = Array.from(
    root.querySelectorAll(
      '.cap5-p41v4-option input[type="radio"]'
    )
  );

  const checkButton = root.querySelector(
    "[data-p41v4-check]"
  );

  const resetButton = root.querySelector(
    "[data-p41v4-reset]"
  );

  const alertBox = root.querySelector(
    "[data-p41v4-alert]"
  );

  const feedback = root.querySelector(
    "[data-p41v4-feedback]"
  );

  const feedbackTitle = root.querySelector(
    "[data-p41v4-feedback-title]"
  );

  const feedbackText = root.querySelector(
    "[data-p41v4-feedback-text]"
  );

  const takeaway = document.querySelector(
    "[data-p41v4-takeaway]"
  );

  if (
    !options.length ||
    !checkButton ||
    !resetButton ||
    !alertBox ||
    !feedback ||
    !feedbackTitle ||
    !feedbackText
  ) {
    return;
  }

  options.forEach(function (input) {
    input.addEventListener(
      "change",
      function () {
        alertBox.hidden = true;

        options.forEach(function (item) {
          const label = item.closest(
            ".cap5-p41v4-option"
          );

          if (!label) {
            return;
          }

          label.classList.toggle(
            "is-selected",
            item.checked
          );
        });
      }
    );
  });

  checkButton.addEventListener(
    "click",
    function () {
      const selected = options.find(
        function (input) {
          return input.checked;
        }
      );

      if (!selected) {
        alertBox.hidden = false;
        return;
      }

      const correct =
        selected.value === "b";

      options.forEach(function (input) {
        const label = input.closest(
          ".cap5-p41v4-option"
        );

        if (!label) {
          return;
        }

        label.classList.remove(
          "is-selected"
        );

        if (input.value === "b") {
          label.classList.add(
            "is-correct"
          );
        }

        if (
          input.checked &&
          input.value !== "b"
        ) {
          label.classList.add(
            "is-incorrect"
          );
        }

        input.disabled = true;
      });

      feedback.classList.toggle(
        "is-incorrect",
        !correct
      );

      if (correct) {
        feedbackTitle.textContent =
          "Interpretação adequada";

        feedbackText.textContent =
          "A reação ao Gram é uma informação inicial. Alterações nas células e interferências técnicas podem modificar a coloração; por isso, resultados inesperados devem ser correlacionados com as demais etapas e esclarecidos com o laboratório quando necessário.";
      } else {
        feedbackTitle.textContent =
          "Reconsidere a discordância";

        feedbackText.textContent =
          "Nem a bacterioscopia nem a identificação devem ser descartadas isoladamente. A discordância pode refletir alterações bacterianas ou interferências na técnica e precisa ser analisada em conjunto com os demais resultados.";
      }

      feedback.hidden = false;
      checkButton.hidden = true;
      resetButton.hidden = false;

      if (takeaway) {
        takeaway.hidden = false;
        takeaway.classList.add(
          "is-visible"
        );
      }

      feedback.focus();
    }
  );

  resetButton.addEventListener(
    "click",
    function () {
      options.forEach(function (input) {
        const label = input.closest(
          ".cap5-p41v4-option"
        );

        input.checked = false;
        input.disabled = false;

        if (label) {
          label.classList.remove(
            "is-selected",
            "is-correct",
            "is-incorrect"
          );
        }
      });

      alertBox.hidden = true;
      feedback.hidden = true;

      feedback.classList.remove(
        "is-incorrect"
      );

      feedbackTitle.textContent = "";
      feedbackText.textContent = "";

      checkButton.hidden = false;
      resetButton.hidden = true;

      if (takeaway) {
        takeaway.hidden = true;
        takeaway.classList.remove(
          "is-visible"
        );
      }

      if (options[0]) {
        options[0].focus();
      }
    }
  );
})();

/* =========================
   ANIMAÇÃO DE ENTRADA
   ========================= */

(function revealCap5Page41() {
  const items = document.querySelectorAll(
    ".cap5-page41 .cap5-p41v4-reveal"
  );

  if (!items.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (item) {
      if (!item.hidden) {
        item.classList.add("is-visible");
      }
    });

    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(
          "is-visible"
        );

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  items.forEach(function (item) {
    observer.observe(item);
  });
})();
/* =========================
   CAPÍTULO 5 — PÁGINA 42
   PERCURSO PELO ENVELOPE
   ========================= */

(function initCap5Page42V4() {
  const root = document.querySelector(
    "[data-cap5-p42v4]"
  );

  if (!root) {
    return;
  }

  const groupTabs = Array.from(
    root.querySelectorAll("[data-p42v4-group]")
  );

  const groupView = root.querySelector(
    "#cap5P42V4GroupView"
  );

  const image = root.querySelector(
    "#cap5P42V4Image"
  );

  const caption = root.querySelector(
    "#cap5P42V4Caption"
  );

  const zoom = root.querySelector(
    "#cap5P42V4Zoom"
  );

  const groupLabel = root.querySelector(
    "#cap5P42V4GroupLabel"
  );

  const routeTitle = root.querySelector(
    "#cap5P42V4RouteTitle"
  );

  const counter = root.querySelector(
    "#cap5P42V4Counter"
  );

  const track = root.querySelector(
    "#cap5P42V4Track"
  );

  const stepLabel = root.querySelector(
    "#cap5P42V4StepLabel"
  );

  const stepText = root.querySelector(
    "#cap5P42V4StepText"
  );

  const stepMeaning = root.querySelector(
    "#cap5P42V4StepMeaning"
  );

  const previousButton = root.querySelector(
    "#cap5P42V4Prev"
  );

  const nextButton = root.querySelector(
    "#cap5P42V4Next"
  );

  const conclusion = root.querySelector(
    "#cap5P42V4Conclusion"
  );

  const conclusionTitle = root.querySelector(
    "#cap5P42V4ConclusionTitle"
  );

  const conclusionText = root.querySelector(
    "#cap5P42V4ConclusionText"
  );

  if (
    !groupTabs.length ||
    !groupView ||
    !image ||
    !caption ||
    !zoom ||
    !groupLabel ||
    !routeTitle ||
    !counter ||
    !track ||
    !stepLabel ||
    !stepText ||
    !stepMeaning ||
    !previousButton ||
    !nextButton ||
    !conclusion ||
    !conclusionTitle ||
    !conclusionText
  ) {
    return;
  }

  const groups = {
    positive: {
      tabId: "cap5P42V4TabPositive",

      label: "Gram-positiva",

      image:
        "../../assets/capitulo-05/imagens/gram-positivo1.png",

      alt:
        "Representação do envelope celular de uma bactéria Gram-positiva",

      caption:
        "Organização do envelope celular de uma bactéria Gram-positiva.",

      conclusionTitle:
        "Menos uma barreira não significa suscetibilidade garantida",

      conclusion:
        "A ausência de membrana externa elimina uma barreira adicional à entrada de algumas moléculas. Entretanto, bactérias Gram-positivas também podem apresentar resistência. A reação ao Gram, isoladamente, não permite prever seu perfil de suscetibilidade.",

      steps: [
        {
          label: "Estrutura encontrada",

          title:
            "Camada espessa de peptidoglicano",

          text:
            "A camada espessa de peptidoglicano forma uma rede localizada externamente à membrana citoplasmática.",

          meaning:
            "Apesar de espessa, essa camada não funciona como uma membrana externa."
        },

        {
          label: "Passagem pelo envelope",

          title:
            "Ausência de membrana externa",

          text:
            "As bactérias Gram-positivas não apresentam a membrana externa característica das Gram-negativas.",

          meaning:
            "Alguns antibacterianos não encontram essa barreira adicional durante o percurso até o alvo."
        },

        {
          label: "Chegada ao local de ação",

          title:
            "Acesso ao alvo bacteriano",

          text:
            "Para exercer atividade, o antibacteriano precisa chegar ao seu alvo em quantidade suficiente e permanecer ativo.",

          meaning:
            "A ausência de membrana externa não garante que toda molécula alcance o alvo ou apresente atividade."
        },

        {
          label: "Limite da interpretação",

          title:
            "O Gram não prevê suscetibilidade",

          text:
            "Bactérias Gram-positivas também podem apresentar mecanismos que reduzem ou impedem a atividade de diferentes antibacterianos.",

          meaning:
            "A suscetibilidade somente pode ser interpretada com base na identificação, no teste de suscetibilidade e no contexto clínico."
        }
      ]
    },

    negative: {
      tabId: "cap5P42V4TabNegative",

      label: "Gram-negativa",

      image:
        "../../assets/capitulo-05/imagens/gram-negativo1.png",

      alt:
        "Representação do envelope celular de uma bactéria Gram-negativa",

      caption:
        "Organização do envelope celular de uma bactéria Gram-negativa.",

      conclusionTitle:
        "Por que podem existir mais obstáculos?",

      conclusion:
        "A membrana externa acrescenta uma barreira à entrada de alguns antibacterianos. A passagem por porinas, a permanência da molécula ativa no espaço periplasmático e outros mecanismos podem reduzir a quantidade que alcança o alvo. Isso ajuda a explicar a dificuldade terapêutica de algumas Gram-negativas, mas não significa que todas sejam resistentes.",

      steps: [
        {
          label: "Primeira barreira",

          title:
            "Membrana externa",

          text:
            "A membrana externa contém lipopolissacarídeo e funciona como uma barreira adicional à passagem de algumas moléculas.",

          meaning:
            "O tamanho, a carga e outras características do antibacteriano influenciam sua capacidade de atravessar essa barreira."
        },

        {
          label: "Via de entrada",

          title:
            "Passagem por porinas",

          text:
            "Algumas moléculas hidrofílicas atravessam a membrana externa por canais proteicos denominados porinas.",

          meaning:
            "Nem todas as moléculas utilizam esses canais, e mudanças na quantidade ou na estrutura das porinas podem reduzir sua entrada."
        },

        {
          label: "Após a membrana externa",

          title:
            "Espaço periplasmático",

          text:
            "Depois de atravessar a membrana externa, a molécula alcança o espaço periplasmático, onde se encontra a camada delgada de peptidoglicano.",

          meaning:
            "Nesse espaço, alguns antibacterianos podem encontrar enzimas capazes de inativá-los antes que alcancem o alvo."
        },

        {
          label: "Redução da concentração",

          title:
            "Sistemas de efluxo",

          text:
            "Alguns sistemas presentes no envelope bacteriano podem transportar moléculas para fora da célula.",

          meaning:
            "O efluxo pode reduzir a concentração do antibacteriano disponível para atuar no alvo."
        },

        {
          label: "Integração das barreiras",

          title:
            "Chegada ao alvo",

          text:
            "Para exercer atividade, uma quantidade suficiente do antibacteriano precisa atravessar as barreiras e alcançar o alvo ainda ativa.",

          meaning:
            "A ação conjunta de barreiras estruturais e mecanismos de resistência pode limitar as opções terapêuticas."
        }
      ]
    }
  };

  let currentGroup = "positive";
  let currentStep = 0;
  let imageTimer = null;

  function renderTrack() {
    const steps =
      groups[currentGroup].steps;

    track.innerHTML = "";

    track.classList.toggle(
      "is-positive",
      currentGroup === "positive"
    );

    track.classList.toggle(
      "is-negative",
      currentGroup === "negative"
    );

    steps.forEach(function (_, index) {
      const progressStep =
        document.createElement("span");

      progressStep.className =
        "cap5-p42v4-trackStep";

      if (index < currentStep) {
        progressStep.classList.add(
          "is-complete"
        );
      }

      if (index === currentStep) {
        progressStep.classList.add(
          "is-active"
        );
      }

      progressStep.setAttribute(
        "aria-label",
        "Etapa " +
          (index + 1) +
          (index === currentStep
            ? ", etapa atual"
            : "")
      );

      track.appendChild(progressStep);
    });
  }

  function renderStep() {
    const group = groups[currentGroup];
    const step = group.steps[currentStep];
    const finalStep =
      currentStep === group.steps.length - 1;

    groupLabel.textContent =
      group.label;

    routeTitle.textContent =
      step.title;

    stepLabel.textContent =
      step.label;

    stepText.textContent =
      step.text;

    stepMeaning.textContent =
      step.meaning;

    counter.textContent =
      "Etapa " +
      (currentStep + 1) +
      " de " +
      group.steps.length;

    previousButton.disabled =
      currentStep === 0;

    nextButton.textContent = finalStep
      ? "Reiniciar percurso ↺"
      : "Próxima barreira →";

    conclusion.hidden = !finalStep;

    if (finalStep) {
      conclusionTitle.textContent =
        group.conclusionTitle;

      conclusionText.textContent =
        group.conclusion;
    }

    renderTrack();
  }

  function renderGroup(groupName) {
    const group = groups[groupName];

    if (!group) {
      return;
    }

    currentGroup = groupName;
    currentStep = 0;

    groupTabs.forEach(function (tab) {
      const active =
        tab.dataset.p42v4Group ===
        groupName;

      tab.classList.toggle(
        "is-active",
        active
      );

      tab.setAttribute(
        "aria-selected",
        active ? "true" : "false"
      );

      tab.setAttribute(
        "tabindex",
        active ? "0" : "-1"
      );
    });

    groupView.setAttribute(
      "aria-labelledby",
      group.tabId
    );

    window.clearTimeout(imageTimer);
    image.classList.add("is-changing");

    imageTimer = window.setTimeout(
      function () {
        image.src = group.image;
        image.alt = group.alt;

        caption.textContent =
          group.caption;

        zoom.dataset.zoom =
          group.image;

        zoom.setAttribute(
          "aria-label",
          "Ampliar imagem: " +
            group.caption
        );

        image.classList.remove(
          "is-changing"
        );
      },
      120
    );

    renderStep();
  }

  groupTabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      renderGroup(
        tab.dataset.p42v4Group
      );
    });

    tab.addEventListener(
      "keydown",
      function (event) {
        let nextIndex = null;

        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ) {
          nextIndex =
            (index + 1) %
            groupTabs.length;
        }

        if (
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ) {
          nextIndex =
            (index - 1 + groupTabs.length) %
            groupTabs.length;
        }

        if (event.key === "Home") {
          nextIndex = 0;
        }

        if (event.key === "End") {
          nextIndex =
            groupTabs.length - 1;
        }

        if (nextIndex === null) {
          return;
        }

        event.preventDefault();

        groupTabs[nextIndex].focus();

        renderGroup(
          groupTabs[nextIndex].dataset
            .p42v4Group
        );
      }
    );
  });

  previousButton.addEventListener(
    "click",
    function () {
      if (currentStep === 0) {
        return;
      }

      currentStep -= 1;
      renderStep();
    }
  );

  nextButton.addEventListener(
    "click",
    function () {
      const steps =
        groups[currentGroup].steps;

      if (
        currentStep ===
        steps.length - 1
      ) {
        currentStep = 0;
      } else {
        currentStep += 1;
      }

      renderStep();
    }
  );

  renderGroup("positive");
})();

/* =========================
   MODAL DA TABELA
   ========================= */

(function initCap5Page42TableModal() {
  const openButton = document.querySelector(
    "[data-p42v4-open-table]"
  );

  const modal = document.querySelector(
    "[data-p42v4-table-modal]"
  );

  if (!openButton || !modal) {
    return;
  }

  const closeButtons = Array.from(
    modal.querySelectorAll(
      "[data-p42v4-close-table]"
    )
  );

  const dialog = modal.querySelector(
    ".cap5-p42v4-modalDialog"
  );

  const closeButton = modal.querySelector(
    ".cap5-p42v4-modalClose"
  );

  let previousFocus = null;

  function openModal() {
    previousFocus =
      document.activeElement;

    modal.hidden = false;

    document.body.style.overflow =
      "hidden";

    window.requestAnimationFrame(
      function () {
        if (closeButton) {
          closeButton.focus();
        }
      }
    );
  }

  function closeModal() {
    modal.hidden = true;

    document.body.style.overflow = "";

    if (
      previousFocus &&
      typeof previousFocus.focus ===
        "function"
    ) {
      previousFocus.focus();
    }
  }

  function trapFocus(event) {
    if (
      event.key !== "Tab" ||
      modal.hidden
    ) {
      return;
    }

    const focusable = Array.from(
      modal.querySelectorAll(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      )
    );

    if (!focusable.length) {
      return;
    }

    const first = focusable[0];
    const last =
      focusable[focusable.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault();
      last.focus();
    }

    if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }

  openButton.addEventListener(
    "click",
    openModal
  );

  closeButtons.forEach(function (button) {
    button.addEventListener(
      "click",
      closeModal
    );
  });

  modal.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      trapFocus(event);
    }
  );

  if (dialog) {
    dialog.addEventListener(
      "click",
      function (event) {
        event.stopPropagation();
      }
    );
  }
})();

/* =========================
   ANIMAÇÃO DE ENTRADA
   ========================= */

(function revealCap5Page42V4() {
  const items = document.querySelectorAll(
    ".cap5-page42 .cap5-p42v4-reveal"
  );

  if (!items.length) {
    return;
  }

  if (
    !("IntersectionObserver" in window)
  ) {
    items.forEach(function (item) {
      item.classList.add("is-visible");
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      function (entries) {
        entries.forEach(
          function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        );
      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -30px 0px"
      }
    );

  items.forEach(function (item) {
    observer.observe(item);
  });
})();
/* =========================================================
   CAPÍTULO 5 — PÁGINA 43
   IDENTIFICAÇÃO BACTERIANA
   ========================================================= */

(function initCap5Page43() {
  "use strict";

  const activity = document.querySelector("[data-cap5-p43]");

  /*
   * Se a página aberta não for a página 43,
   * o código será encerrado sem interferir nas outras páginas.
   */
  if (!activity) {
    return;
  }

  /* ---------------------------------------------------------
     ELEMENTOS
     --------------------------------------------------------- */

  const bank = activity.querySelector(
    '[data-p43-zone="bank"]'
  );

  const cards = Array.from(
    activity.querySelectorAll("[data-p43-card]")
  );

  const zones = Array.from(
    activity.querySelectorAll(".cap5-p43-zone")
  );

  const checkButton = activity.querySelector(
    "[data-p43-check]"
  );

  const resetButton = activity.querySelector(
    "[data-p43-reset]"
  );

  const progress = activity.querySelector(
    "[data-p43-progress]"
  );

  const feedback = activity.querySelector(
    "[data-p43-feedback]"
  );

  const liveRegion = activity.querySelector(
    ".cap5-p43-live"
  );

  const synthesis = document.querySelector(
    "[data-p43-synthesis]"
  );

  let selectedCard = null;
  let draggedCard = null;

  /* ---------------------------------------------------------
     FUNÇÕES AUXILIARES
     --------------------------------------------------------- */

  function getDestinationBody(destinationName) {
    if (destinationName === "bank") {
      return bank;
    }

    return activity.querySelector(
      `[data-p43-drop="${destinationName}"]`
    );
  }

  function getDestinationLabel(destinationName) {
    if (destinationName === "allows") {
      return "A identificação permite";
    }

    if (destinationName === "notyet") {
      return "Ainda não permite concluir";
    }

    return "Afirmações para analisar";
  }

  function announce(message) {
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }

  function clearSelection() {
    cards.forEach(function (card) {
      card.classList.remove("is-selected");
      card.setAttribute("aria-pressed", "false");
    });

    selectedCard = null;
  }

  function clearAnswerStatus() {
    cards.forEach(function (card) {
      card.classList.remove(
        "is-correct",
        "is-incorrect"
      );
    });
  }

  function hideResults() {
    clearAnswerStatus();

    if (feedback) {
      feedback.hidden = true;
      feedback.className = "cap5-p43-feedback";
      feedback.innerHTML = "";
    }

    if (synthesis) {
      synthesis.hidden = true;
    }
  }

  /* ---------------------------------------------------------
     SELEÇÃO DO CARTÃO
     --------------------------------------------------------- */

  function selectCard(card) {
    if (!card) {
      return;
    }

    /*
     * Clicar novamente no cartão selecionado
     * cancela a seleção.
     */
    if (selectedCard === card) {
      clearSelection();
      announce("Seleção cancelada.");
      return;
    }

    clearSelection();

    selectedCard = card;

    card.classList.add("is-selected");
    card.setAttribute("aria-pressed", "true");

    announce(
      "Afirmação selecionada. Agora escolha um dos campos de destino."
    );
  }

  /* ---------------------------------------------------------
     MOVIMENTAÇÃO DO CARTÃO
     --------------------------------------------------------- */

  function moveCard(card, destinationName) {
    const destinationBody =
      getDestinationBody(destinationName);

    if (!card || !destinationBody) {
      return;
    }

    destinationBody.appendChild(card);

    card.dataset.currentZone = destinationName;

    card.classList.remove(
      "is-selected",
      "is-correct",
      "is-incorrect",
      "is-dragging"
    );

    card.setAttribute("aria-pressed", "false");

    selectedCard = null;

    hideResults();
    updateProgress();

    announce(
      `Afirmação movida para: ${getDestinationLabel(
        destinationName
      )}.`
    );
  }

  /* ---------------------------------------------------------
     PROGRESSO
     --------------------------------------------------------- */

  function updateProgress() {
    const classifiedCards = cards.filter(
      function (card) {
        return card.dataset.currentZone !== "bank";
      }
    );

    const classifiedAmount = classifiedCards.length;
    const totalAmount = cards.length;

    if (progress) {
      progress.textContent =
        `${classifiedAmount} de ${totalAmount} classificadas`;
    }

    if (checkButton) {
      checkButton.disabled =
        classifiedAmount !== totalAmount;
    }
  }

  /* ---------------------------------------------------------
     CONFERÊNCIA
     --------------------------------------------------------- */

  function checkAnswers() {
    let correctAnswers = 0;

    cards.forEach(function (card) {
      const currentZone = card.dataset.currentZone;
      const correctZone = card.dataset.answer;

      const isCorrect =
        currentZone === correctZone;

      card.classList.toggle(
        "is-correct",
        isCorrect
      );

      card.classList.toggle(
        "is-incorrect",
        !isCorrect
      );

      if (isCorrect) {
        correctAnswers += 1;
      }
    });

    const totalAnswers = cards.length;
    const incorrectAnswers =
      totalAnswers - correctAnswers;

    if (!feedback) {
      return;
    }

    feedback.hidden = false;

    /*
     * Todas as afirmações estão corretas.
     */
    if (correctAnswers === totalAnswers) {
      feedback.className =
        "cap5-p43-feedback is-success";

      feedback.innerHTML = `
        <strong>
          Interpretação construída corretamente.
        </strong>

        A identificação tornou o resultado mais específico,
        mas não responde, isoladamente, às perguntas clínicas
        e terapêuticas.
      `;

      if (synthesis) {
        synthesis.hidden = false;

        synthesis.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }

      announce(
        "Todas as afirmações foram classificadas corretamente."
      );

      return;
    }

    /*
     * Existem afirmações incorretas.
     */
    const statementText =
      incorrectAnswers === 1
        ? "afirmação destacada"
        : "afirmações destacadas";

    feedback.className =
      "cap5-p43-feedback is-review";

    feedback.innerHTML = `
      <strong>
        Revise ${incorrectAnswers} ${statementText}.
      </strong>

      Pergunte se a informação foi realmente fornecida pela
      identificação ou se depende do contexto clínico, da
      investigação da fonte ou do teste de suscetibilidade.
    `;

    if (synthesis) {
      synthesis.hidden = true;
    }

    announce(
      `${incorrectAnswers} ${
        incorrectAnswers === 1
          ? "afirmação precisa"
          : "afirmações precisam"
      } ser revisada${
        incorrectAnswers === 1 ? "" : "s"
      }.`
    );
  }

  /* ---------------------------------------------------------
     REINICIAR
     --------------------------------------------------------- */

  function resetActivity() {
    cards.forEach(function (card) {
      bank.appendChild(card);

      card.dataset.currentZone = "bank";

      card.classList.remove(
        "is-selected",
        "is-correct",
        "is-incorrect",
        "is-dragging"
      );

      card.setAttribute("aria-pressed", "false");
    });

    selectedCard = null;
    draggedCard = null;

    zones.forEach(function (zone) {
      zone.classList.remove("is-over");
    });

    if (feedback) {
      feedback.hidden = true;
      feedback.className = "cap5-p43-feedback";
      feedback.innerHTML = "";
    }

    if (synthesis) {
      synthesis.hidden = true;
    }

    updateProgress();

    announce("Atividade reiniciada.");
  }

  /* ---------------------------------------------------------
     SELEÇÃO POR CLIQUE
     --------------------------------------------------------- */

  cards.forEach(function (card) {
    card.dataset.currentZone = "bank";
    card.setAttribute("aria-pressed", "false");

    card.addEventListener("click", function () {
      selectCard(card);
    });
  });

  /*
   * Depois de selecionar um cartão, o estudante pode clicar
   * em um dos campos de destino.
   */
  zones.forEach(function (zone) {
    const destinationName =
      zone.dataset.p43Zone;

    zone.addEventListener("click", function (event) {
      /*
       * Impede que o clique em um cartão posicionado
       * também ative o campo onde ele está.
       */
      if (event.target.closest("[data-p43-card]")) {
        return;
      }

      if (selectedCard) {
        moveCard(
          selectedCard,
          destinationName
        );
      }
    });

    /*
     * Permite movimentar pelo teclado usando
     * Enter ou barra de espaço.
     */
    zone.addEventListener("keydown", function (event) {
      const isActivationKey =
        event.key === "Enter" ||
        event.key === " ";

      if (isActivationKey && selectedCard) {
        event.preventDefault();

        moveCard(
          selectedCard,
          destinationName
        );
      }
    });
  });

  /* ---------------------------------------------------------
     ARRASTAR E SOLTAR
     --------------------------------------------------------- */

  cards.forEach(function (card) {
    card.addEventListener(
      "dragstart",
      function (event) {
        draggedCard = card;

        card.classList.add("is-dragging");

        event.dataTransfer.effectAllowed =
          "move";

        event.dataTransfer.setData(
          "text/plain",
          card.dataset.p43Card
        );
      }
    );

    card.addEventListener(
      "dragend",
      function () {
        card.classList.remove("is-dragging");

        zones.forEach(function (zone) {
          zone.classList.remove("is-over");
        });

        draggedCard = null;
      }
    );
  });

  zones.forEach(function (zone) {
    const destinationName =
      zone.dataset.p43Zone;

    zone.addEventListener(
      "dragover",
      function (event) {
        event.preventDefault();

        zone.classList.add("is-over");

        event.dataTransfer.dropEffect =
          "move";
      }
    );

    zone.addEventListener(
      "dragleave",
      function (event) {
        /*
         * Evita retirar o destaque quando o cursor
         * passa sobre um elemento interno do campo.
         */
        if (
          event.relatedTarget &&
          zone.contains(event.relatedTarget)
        ) {
          return;
        }

        zone.classList.remove("is-over");
      }
    );

    zone.addEventListener(
      "drop",
      function (event) {
        event.preventDefault();

        zone.classList.remove("is-over");

        if (draggedCard) {
          moveCard(
            draggedCard,
            destinationName
          );
        }
      }
    );
  });

  /* ---------------------------------------------------------
     BOTÕES
     --------------------------------------------------------- */

  if (checkButton) {
    checkButton.addEventListener(
      "click",
      checkAnswers
    );
  }

  if (resetButton) {
    resetButton.addEventListener(
      "click",
      resetActivity
    );
  }

  /* ---------------------------------------------------------
     INICIALIZAÇÃO
     --------------------------------------------------------- */

  resetActivity();
})();
/* =========================================================
   CAPÍTULO 5 — PÁGINA 44
   IDENTIFICAÇÃO DE BACTÉRIAS NA PRÁTICA
   ========================================================= */

(function initCap5Page44() {
  "use strict";

  const simulator = document.querySelector(
    "[data-cap5-p44]"
  );

  if (!simulator) {
    return;
  }

  const groups = Array.from(
    simulator.querySelectorAll("[data-p44-group]")
  );

  const analyzeButton = simulator.querySelector(
    "[data-p44-analyze]"
  );

  const resetButton = simulator.querySelector(
    "[data-p44-reset]"
  );

  const progressBar = simulator.querySelector(
    "[data-p44-progress-bar]"
  );

  const progressText = simulator.querySelector(
    "[data-p44-progress-text]"
  );

  const decision = simulator.querySelector(
    "[data-p44-decision]"
  );

  const decisionLabel = simulator.querySelector(
    "[data-p44-decision-label]"
  );

  const decisionTitle = simulator.querySelector(
    "[data-p44-decision-title]"
  );

  const decisionText = simulator.querySelector(
    "[data-p44-decision-text]"
  );

  const decisionList = simulator.querySelector(
    "[data-p44-decision-list]"
  );

  const selections = {
    significance: null,
    course: null,
    risk: null,
    coverage: null
  };

  function selectedCount() {
    return Object.values(selections)
      .filter(Boolean)
      .length;
  }

  function updateProgress() {
    const completed = selectedCount();
    const total = groups.length;
    const percentage = (completed / total) * 100;

    progressBar.style.width =
      `${percentage}%`;

    progressText.textContent =
      `${completed} de ${total} dimensões analisadas`;

    analyzeButton.disabled =
      completed !== total;
  }

  function hideDecision() {
    decision.hidden = true;

    analyzeButton.textContent =
      "Analisar cenário";
  }

  function selectOption(group, button) {
    const groupName =
      group.dataset.p44Group;

    group
      .querySelectorAll("[data-p44-option]")
      .forEach(function (option) {
        const selected = option === button;

        option.classList.toggle(
          "is-selected",
          selected
        );

        option.setAttribute(
          "aria-pressed",
          String(selected)
        );
      });

    selections[groupName] =
      button.dataset.p44Option;

    hideDecision();
    updateProgress();
  }

  function setDecision(config) {
    decision.dataset.tone = config.tone;

    decisionLabel.textContent =
      config.label;

    decisionTitle.textContent =
      config.title;

    decisionText.textContent =
      config.text;

    decisionList.innerHTML =
      config.items
        .map(function (item) {
          return `<li>${item}</li>`;
        })
        .join("");

    decision.hidden = false;

    analyzeButton.textContent =
      "Atualizar análise";

    decision.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  function buildDecision() {
    const significance =
      selections.significance;

    const course =
      selections.course;

    const risk =
      selections.risk;

    const coverage =
      selections.coverage;

    /*
     * CENÁRIO 1
     * Significado do isolamento ainda incerto.
     */
    if (significance === "uncertain") {
      const urgent =
        course === "worsening";

      setDecision({
        tone: urgent
          ? "urgent"
          : "attention",

        label: urgent
          ? "Reavaliação imediata"
          : "Antes de modificar o tratamento",

        title: urgent
          ? "A piora exige ação, mas o crescimento não confirma sozinho a causa"
          : "Primeiro, avalie se o isolamento representa infecção",

        text: urgent
          ? "A deterioração clínica não deve ser ignorada. Ao mesmo tempo, a identificação de Klebsiella pneumoniae em secreção traqueal pode refletir colonização e não deve ser considerada, isoladamente, a causa da piora."
          : "Em secreção traqueal, Klebsiella pneumoniae pode representar colonização. Ampliar a cobertura somente por causa da identificação pode expor o paciente a tratamento desnecessário.",

        items: [
          "Reavaliar os achados clínicos, radiológicos e laboratoriais que sustentam pneumonia.",

          urgent
            ? "Investigar outras causas de deterioração e revisar imediatamente a adequação da terapia empírica."
            : "Acompanhar a evolução e evitar mudança baseada somente no resultado da cultura.",

          risk === "high"
            ? "Considerar o histórico de resistência caso a hipótese de infecção permaneça provável."
            : "Revisar culturas anteriores e a epidemiologia local antes de estimar o risco de resistência.",

          coverage === "doubtful"
            ? "Esclarecer por que a cobertura é considerada incerta e discutir a necessidade de ajuste conforme o protocolo institucional."
            : "Manter reavaliação clínica mesmo quando a cobertura parece plausível."
        ]
      });

      return;
    }

    /*
     * CENÁRIO 2
     * Infecção provável com piora ou cobertura incerta.
     */
    if (
      course === "worsening" ||
      coverage === "doubtful"
    ) {
      setDecision({
        tone: "urgent",

        label: "Não aguarde passivamente",

        title:
          "A cobertura empírica precisa ser reavaliada agora",

        text:
          "Com infecção provável e deterioração clínica ou dúvida relevante sobre a cobertura, esperar apenas pelo antibiograma pode ser inadequado. A identificação orienta a revisão, mas ainda não comprova suscetibilidade.",

        items: [
          "Revisar se o esquema iniciado possui atividade plausível para o microrganismo e o foco provável.",

          risk === "high"
            ? "Utilizar exposições recentes, isolamentos anteriores e epidemiologia local para estimar o risco de resistência."
            : "Confirmar se realmente não existem fatores adicionais de risco para resistência.",

          "Reavaliar o foco e a necessidade de medidas para seu controle.",

          "Considerar ajuste conforme gravidade, protocolos institucionais e apoio especializado, sem ampliar automaticamente apenas pelo nome da espécie."
        ]
      });

      return;
    }

    /*
     * CENÁRIO 3
     * Paciente estável e cobertura plausível,
     * porém com risco de resistência.
     */
    if (risk === "high") {
      setDecision({
        tone: "attention",

        label:
          "Cobertura provisória sob maior incerteza",

        title:
          "O paciente está estável, mas o risco de resistência reduz a confiança",

        text:
          "A estabilidade e a cobertura plausível permitem uma avaliação cuidadosa, porém o risco de resistência adquirida impede assumir que o isolado será suscetível.",

        items: [
          "Revisar culturas anteriores, exposição recente a antibacterianos e epidemiologia institucional.",

          "Confirmar se o esquema empírico continua plausível para o risco individual.",

          "Acompanhar estreitamente a evolução clínica e a liberação do antibiograma.",

          "Não ampliar nem reduzir o espectro automaticamente apenas pela identificação."
        ]
      });

      return;
    }

    /*
     * CENÁRIO 4
     * Infecção provável, estabilidade,
     * baixo risco e cobertura plausível.
     */
    setDecision({
      tone: "standard",

      label:
        "Manutenção provisória com monitoramento",

      title:
        "É possível aguardar o antibiograma sem ampliar automaticamente",

      text:
        "Com infecção provável, estabilidade clínica, ausência de risco relevante identificado e cobertura empírica plausível, o esquema pode ser mantido provisoriamente enquanto o teste é concluído.",

      items: [
        "Monitorar a evolução clínica e reavaliar se surgirem novos dados.",

        "Acompanhar a previsão de liberação do teste de suscetibilidade.",

        "Não interpretar cobertura plausível como suscetibilidade comprovada.",

        "Revisar e direcionar o tratamento quando o antibiograma estiver disponível."
      ]
    });
  }

  function resetSimulator() {
    Object
      .keys(selections)
      .forEach(function (key) {
        selections[key] = null;
      });

    simulator
      .querySelectorAll("[data-p44-option]")
      .forEach(function (button) {
        button.classList.remove(
          "is-selected"
        );

        button.setAttribute(
          "aria-pressed",
          "false"
        );
      });

    decision.hidden = true;
    decision.removeAttribute("data-tone");

    analyzeButton.textContent =
      "Analisar cenário";

    updateProgress();
  }

  groups.forEach(function (group) {
    group
      .querySelectorAll("[data-p44-option]")
      .forEach(function (button) {
        button.setAttribute(
          "aria-pressed",
          "false"
        );

        button.addEventListener(
          "click",
          function () {
            selectOption(group, button);
          }
        );
      });
  });

  analyzeButton.addEventListener(
    "click",
    buildDecision
  );

  resetButton.addEventListener(
    "click",
    resetSimulator
  );

  resetSimulator();
})();
/* =========================================================
   CAPÍTULO 5 — PÁGINA 45
   ========================================================= */

(function initCap5Page45() {
  "use strict";

  const root = document.querySelector("[data-cap5-p45-growth]");

  if (!root) {
    return;
  }

  const range = root.querySelector("#cap5P45Range");
  const image = root.querySelector("#cap5P45TempoImage");
  const zoom = root.querySelector("#cap5P45Zoom");
  const timeValue = root.querySelector("#cap5P45TimeValue");
  const note = root.querySelector("#cap5P45TempoNote");
  const caption = root.querySelector("#cap5P45TempoCaption");
  const play = root.querySelector("#cap5P45Play");
  const reset = root.querySelector("#cap5P45Reset");

  if (
    !range ||
    !image ||
    !zoom ||
    !timeValue ||
    !note ||
    !caption ||
    !play ||
    !reset
  ) {
    return;
  }

  const stages = [
    {
      time: "0 h",
      valueText: "0 hora",
      src: "../../assets/capitulo-05/imagens/difusao-disco-0h.png",
      alt: "Placa de ágar Mueller-Hinton logo após a colocação dos discos",
      title: "Ensaio iniciado",
      text:
        "Os discos foram posicionados, mas ainda não há crescimento bacteriano visível para avaliar.",
      caption:
        "No início do ensaio, ainda não é possível realizar a leitura."
    },
    {
      time: "6 h",
      valueText: "6 horas",
      src: "../../assets/capitulo-05/imagens/difusao-disco-6h.png",
      alt: "Simulação da placa após seis horas de incubação",
      title: "Crescimento inicial",
      text:
        "O crescimento começa a se tornar perceptível, enquanto os antibacterianos se difundem pelo ágar. Os halos ainda não estão adequadamente definidos.",
      caption:
        "A ausência de um halo bem definido neste momento não permite classificar o isolado."
    },
    {
      time: "12 h",
      valueText: "12 horas",
      src: "../../assets/capitulo-05/imagens/difusao-disco-12h.png",
      alt: "Simulação da placa após doze horas de incubação",
      title: "Halos em formação",
      text:
        "O crescimento bacteriano aumenta e as áreas de inibição se tornam mais visíveis, mas a leitura deve respeitar o tempo estabelecido para o método.",
      caption:
        "Uma aparência intermediária não deve ser interpretada como resultado final."
    },
    {
      time: "18 h",
      valueText: "18 horas",
      src: "../../assets/capitulo-05/imagens/difusao-disco-18h.png",
      alt:
        "Simulação da placa após dezoito horas de incubação, com halos definidos",
      title: "Padrão mensurável",
      text:
        "Com crescimento uniforme e halos definidos, a placa pode estar em condição de leitura, desde que todos os critérios técnicos do método tenham sido atendidos.",
      caption:
        "Os diâmetros dos halos serão medidos e comparados com pontos de corte; esse processo será apresentado na próxima página."
    },
    {
      time: "24 h",
      valueText: "24 horas",
      src: "../../assets/capitulo-05/imagens/difusao-disco-24h.png",
      alt:
        "Simulação didática da placa após vinte e quatro horas de incubação",
      title: "Tempo adicional",
      text:
        "Alguns ensaios podem exigir condições ou tempos diferentes. Incubar por mais tempo não torna automaticamente o resultado mais confiável.",
      caption:
        "O laboratório segue o tempo indicado para a combinação entre microrganismo, método e condições do ensaio."
    }
  ];

  let timer = null;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function render(index) {
    const stage = stages[index];

    if (!stage) {
      return;
    }

    range.value = String(index);
    range.setAttribute("aria-valuetext", stage.valueText);

    image.classList.add("is-changing");

    window.setTimeout(
      function () {
        image.src = stage.src;
        image.alt = stage.alt;

        zoom.dataset.zoom = stage.src;
        zoom.setAttribute(
          "aria-label",
          `Ampliar imagem da placa no tempo de ${stage.valueText}`
        );

        image.classList.remove("is-changing");
      },
      reducedMotion ? 0 : 120
    );

    timeValue.textContent = stage.time;

    note.innerHTML = `
      <strong>${stage.title}</strong>
      <p>${stage.text}</p>
    `;

    caption.textContent = stage.caption;
  }

  function stopAnimation() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }

    play.setAttribute("aria-pressed", "false");

    play.innerHTML = `
      <span aria-hidden="true">▶</span>
      Iniciar animação
    `;
  }

  function startAnimation() {
    if (reducedMotion) {
      return;
    }

    if (Number(range.value) >= stages.length - 1) {
      render(0);
    }

    play.setAttribute("aria-pressed", "true");

    play.innerHTML = `
      <span aria-hidden="true">Ⅱ</span>
      Pausar
    `;

    timer = window.setInterval(function () {
      const nextStage = Number(range.value) + 1;

      if (nextStage >= stages.length) {
        stopAnimation();
        return;
      }

      render(nextStage);
    }, 1700);
  }

  range.addEventListener("input", function () {
    stopAnimation();
    render(Number(range.value));
  });

  play.addEventListener("click", function () {
    if (timer !== null) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });

  reset.addEventListener("click", function () {
    stopAnimation();
    render(0);
    range.focus();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopAnimation();
    }
  });

  if (reducedMotion) {
    play.hidden = true;
  }

  render(0);
})();
/* =========================================================
   CAPÍTULO 5 — PÁGINA 46
   ========================================================= */

(function initCap5Page46() {
  "use strict";

  const root = document.querySelector("[data-cap5-p46]");

  if (!root) {
    return;
  }

  const methodButtons = Array.from(
    root.querySelectorAll("[data-p46-method]")
  );

  const panel = root.querySelector("#cap5P46Panel");
  const image = root.querySelector("#cap5P46Image");
  const zoom = root.querySelector("#cap5P46Zoom");
  const imageCaption = root.querySelector("#cap5P46ImageCaption");
  const stepBox = root.querySelector("#cap5P46Step");
  const previousButton = root.querySelector("#cap5P46Previous");
  const nextButton = root.querySelector("#cap5P46Next");

  const indicators = Array.from(
    root.querySelectorAll("[data-p46-indicator]")
  );

  if (
    methodButtons.length === 0 ||
    !panel ||
    !image ||
    !zoom ||
    !imageCaption ||
    !stepBox ||
    !previousButton ||
    !nextButton
  ) {
    return;
  }

  const content = {
    disco: {
      tabId: "cap5P46TabDisco",

      image:
        "../../assets/capitulo-05/imagens/medicao-diametro-halo.png",

      alt:
        "Medição do diâmetro completo da zona de inibição, atravessando o centro do disco",

      zoomLabel:
        "Ampliar imagem da medição do diâmetro do halo",

      caption:
        "O diâmetro completo da zona de inibição é medido em milímetros, atravessando o centro do disco.",

      steps: [
        {
          title: "Obter a medida",
          text:
            "Na disco-difusão, o laboratório mede o diâmetro completo da zona de inibição, em milímetros."
        },
        {
          title: "Consultar o ponto de corte",
          text:
            "O diâmetro é comparado ao ponto de corte aplicável à combinação entre o microrganismo e o antibacteriano avaliados."
        },
        {
          title: "Liberar a categoria",
          text:
            "A comparação permite converter o diâmetro medido em uma categoria interpretativa. O significado clínico de S, I e R será apresentado na próxima página."
        }
      ]
    },

    cim: {
      tabId: "cap5P46TabCim",

      image:
        "../../assets/capitulo-05/imagens/leitura-cim-gradiente.png",

      alt:
        "Leitura da concentração inibitória mínima no ponto em que a elipse de inibição cruza a escala da fita de gradiente",

      zoomLabel:
        "Ampliar imagem da leitura da concentração inibitória mínima",

      caption:
        "No método de gradiente em fita, a CIM é lida no ponto em que a borda da elipse de inibição cruza a escala.",

      steps: [
        {
          title: "Obter a medida",
          text:
            "A CIM corresponde à menor concentração que inibe o crescimento visível do microrganismo nas condições padronizadas do teste. O resultado é expresso em mg/L."
        },
        {
          title: "Consultar o ponto de corte",
          text:
            "O valor da CIM é comparado ao ponto de corte aplicável à combinação entre o microrganismo e o antibacteriano avaliados."
        },
        {
          title: "Liberar a categoria",
          text:
            "A comparação permite converter a CIM em uma categoria interpretativa. O valor absoluto não deve ser comparado diretamente entre antibacterianos diferentes."
        }
      ]
    }
  };

  let currentMethod = "disco";
  let currentStep = 0;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function updateIndicators() {
    indicators.forEach(function (indicator, index) {
      indicator.classList.toggle(
        "is-active",
        index === currentStep
      );

      indicator.classList.toggle(
        "is-complete",
        index < currentStep
      );
    });
  }

  function updateStep() {
    const selectedContent = content[currentMethod];
    const selectedStep = selectedContent.steps[currentStep];

    stepBox.innerHTML = `
      <span class="cap5-p46-stepNumber">
        Etapa ${currentStep + 1} de 3
      </span>

      <h3>${selectedStep.title}</h3>

      <p>${selectedStep.text}</p>
    `;

    previousButton.disabled = currentStep === 0;

    if (currentStep === selectedContent.steps.length - 1) {
      nextButton.textContent = "Rever etapas";
    } else {
      nextButton.textContent = "Próxima etapa →";
    }

    updateIndicators();
  }

  function updateMethod(method) {
    if (!content[method]) {
      return;
    }

    currentMethod = method;
    currentStep = 0;

    const selectedContent = content[method];

    methodButtons.forEach(function (button) {
      const isSelected = button.dataset.p46Method === method;

      button.classList.toggle("is-active", isSelected);
      button.setAttribute(
        "aria-selected",
        String(isSelected)
      );

      button.tabIndex = isSelected ? 0 : -1;
    });

    panel.setAttribute(
      "aria-labelledby",
      selectedContent.tabId
    );

    image.classList.add("is-changing");

    window.setTimeout(
      function () {
        image.src = selectedContent.image;
        image.alt = selectedContent.alt;

        zoom.dataset.zoom = selectedContent.image;
        zoom.setAttribute(
          "aria-label",
          selectedContent.zoomLabel
        );

        imageCaption.textContent =
          selectedContent.caption;

        image.classList.remove("is-changing");
      },
      reducedMotion ? 0 : 120
    );

    updateStep();
  }

  methodButtons.forEach(function (button, buttonIndex) {
    button.addEventListener("click", function () {
      updateMethod(button.dataset.p46Method);
    });

    button.addEventListener("keydown", function (event) {
      let nextIndex = buttonIndex;

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        nextIndex =
          (buttonIndex + 1) % methodButtons.length;
      } else if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {
        nextIndex =
          (buttonIndex - 1 + methodButtons.length) %
          methodButtons.length;
      } else {
        return;
      }

      event.preventDefault();

      const nextButton = methodButtons[nextIndex];

      nextButton.focus();
      updateMethod(nextButton.dataset.p46Method);
    });
  });

  previousButton.addEventListener("click", function () {
    if (currentStep > 0) {
      currentStep -= 1;
      updateStep();
    }
  });

  nextButton.addEventListener("click", function () {
    const lastStep =
      content[currentMethod].steps.length - 1;

    if (currentStep < lastStep) {
      currentStep += 1;
    } else {
      currentStep = 0;
    }

    updateStep();
  });

  updateMethod("disco");
})();
/* =========================================================
   CAPÍTULO 5 — PÁGINA 47
   ========================================================= */

(function initCap5Page47() {
  "use strict";

  const root = document.querySelector("[data-cap5-p47]");

  if (!root) {
    return;
  }

  const factorGroups = Array.from(
    root.querySelectorAll("[data-p47-factor]")
  );

  const inputs = Array.from(
    root.querySelectorAll('input[type="radio"]')
  );

  const result = root.querySelector(
    "#cap5P47DecisionResult"
  );

  const resetButton = root.querySelector(
    "#cap5P47Reset"
  );

  const micSection = document.querySelector(
    "[data-cap5-p47-mic]"
  );

  const micToggle = micSection
    ? micSection.querySelector("#cap5P47MicToggle")
    : null;

  const micContent = micSection
    ? micSection.querySelector("#cap5P47MicContent")
    : null;

  if (!result || !resetButton) {
    return;
  }

  function getSelectedValue(groupName) {
    const selected = root.querySelector(
      `input[name="${groupName}"]:checked`
    );

    return selected ? selected.value : null;
  }

  function updateCompletedGroups() {
    factorGroups.forEach(function (group) {
      const selected = group.querySelector(
        'input[type="radio"]:checked'
      );

      group.classList.toggle(
        "is-complete",
        Boolean(selected)
      );
    });
  }

  function showInitialResult() {
    result.className = "cap5-p47-decisionResult";

    result.innerHTML = `
      <span class="cap5-p47-resultStatus">
        Análise em andamento
      </span>

      <strong>
        Avalie os três fatores.
      </strong>

      <p>
        A categoria I só pode ser utilizada adequadamente quando se
        compreende como alcançar a exposição necessária e se esse regime
        é apropriado para o foco e para o paciente.
      </p>
    `;
  }

  function updateDecision() {
    updateCompletedGroups();

    const regimen = getSelectedValue(
      "cap5P47Regimen"
    );

    const site = getSelectedValue(
      "cap5P47Site"
    );

    const patient = getSelectedValue(
      "cap5P47Patient"
    );

    if (!regimen || !site || !patient) {
      showInitialResult();
      return;
    }

    const values = [regimen, site, patient];

    if (values.includes("no")) {
      result.className =
        "cap5-p47-decisionResult is-limit";

      result.innerHTML = `
        <span class="cap5-p47-resultStatus">
          Limitação identificada
        </span>

        <strong>
          O resultado I não deve ser utilizado automaticamente.
        </strong>

        <p>
          Pelo menos uma condição necessária não parece atendida.
          Reavalie o regime disponível, a exposição no sítio da
          infecção, a segurança para o paciente e as demais opções
          apresentadas no antibiograma.
        </p>
      `;

      return;
    }

    if (values.includes("unknown")) {
      result.className =
        "cap5-p47-decisionResult is-review";

      result.innerHTML = `
        <span class="cap5-p47-resultStatus">
          Informação insuficiente
        </span>

        <strong>
          Não descarte nem escolha o resultado I sem completar a análise.
        </strong>

        <p>
          Verifique o regime de exposição recomendado, sua adequação
          ao sítio da infecção e as condições clínicas do paciente.
          Se necessário, consulte protocolos institucionais, a equipe
          especializada ou o laboratório.
        </p>
      `;

      return;
    }

    result.className =
      "cap5-p47-decisionResult is-consider";

    result.innerHTML = `
      <span class="cap5-p47-resultStatus">
        Opção potencialmente utilizável
      </span>

      <strong>
        O antibacteriano classificado como I pode ser considerado.
      </strong>

      <p>
        As condições avaliadas indicam que a exposição aumentada pode
        ser alcançada por um regime validado, com adequação ao foco e
        segurança para o paciente. A decisão final ainda deve integrar
        o quadro clínico e as demais opções disponíveis.
      </p>
    `;
  }

  inputs.forEach(function (input) {
    input.addEventListener(
      "change",
      updateDecision
    );
  });

  resetButton.addEventListener("click", function () {
    inputs.forEach(function (input) {
      input.checked = false;
    });

    factorGroups.forEach(function (group) {
      group.classList.remove("is-complete");
    });

    showInitialResult();

    const firstInput = inputs[0];

    if (firstInput) {
      firstInput.focus();
    }
  });

  if (micToggle && micContent) {
    micToggle.addEventListener("click", function () {
      const isExpanded =
        micToggle.getAttribute("aria-expanded") === "true";

      micToggle.setAttribute(
        "aria-expanded",
        String(!isExpanded)
      );

      micContent.hidden = isExpanded;

      micToggle.innerHTML = isExpanded
        ? 'Entender <span aria-hidden="true">+</span>'
        : 'Fechar <span aria-hidden="true">−</span>';
    });
  }

  showInitialResult();
})();
/* =========================================================
   CAPÍTULO 5 — PÁGINA 48
   ========================================================= */

(function initCap5Page48() {
  "use strict";

  const root = document.querySelector("[data-cap5-p48]");

  if (!root) {
    return;
  }

  const buttons = Array.from(
    root.querySelectorAll("[data-p48-type]")
  );

  const panel = root.querySelector("#cap5P48Result");
  const label = root.querySelector("#cap5P48ResultLabel");
  const title = root.querySelector("#cap5P48ResultTitle");
  const intro = root.querySelector("#cap5P48ResultIntro");
  const meaning = root.querySelector("#cap5P48Meaning");
  const check = root.querySelector("#cap5P48Check");
  const action = root.querySelector("#cap5P48Action");
  const avoid = root.querySelector("#cap5P48Avoid");

  if (
    buttons.length === 0 ||
    !panel ||
    !label ||
    !title ||
    !intro ||
    !meaning ||
    !check ||
    !action ||
    !avoid
  ) {
    return;
  }

  const content = {
    confirmed: {
      tabId: "cap5P48TabConfirmed",

      label: "Mecanismo confirmado",

      title:
        "A informação pode modificar o alcance da interpretação",

      intro:
        "O laboratório informa que um mecanismo ou uma resistência específica foi detectado pelos critérios adotados.",

      meaning:
        "Verifique quais antibacterianos, classes ou estratégias terapêuticas podem ser afetados pelo mecanismo informado.",

      check:
        "Analise as categorias S, I e R, as notas vinculadas aos resultados e eventuais antibacterianos não liberados.",

      action:
        "Integre o mecanismo ao microrganismo, ao perfil de suscetibilidade, ao sítio da infecção e à relevância clínica do isolamento.",

      avoid:
        "Não transforme a presença do mecanismo em uma regra terapêutica universal nem altere por conta própria as categorias liberadas pelo laboratório."
    },

    suggestive: {
      tabId: "cap5P48TabSuggestive",

      label: "Perfil sugestivo",

      title:
        "Suspeita laboratorial não é sinônimo de confirmação",

      intro:
        "O padrão observado pode ser compatível com determinado mecanismo, mas a redação indica que a conclusão ainda não é definitiva.",

      meaning:
        "Identifique qual padrão levantou a suspeita e se o resultado corresponde a uma triagem ou a uma investigação complementar.",

      check:
        "Verifique se existe confirmação em andamento, se há uma nota vinculada e quais categorias já podem ser utilizadas.",

      action:
        "Considere apenas as informações já liberadas como definitivas. Esclareça com o laboratório se a confirmação puder modificar uma decisão imediata.",

      avoid:
        "Não registre nem interprete um perfil sugestivo como mecanismo confirmado e não presuma resultados que ainda não foram liberados."
    },

    limitation: {
      tabId: "cap5P48TabLimitation",

      label: "Limitação ou necessidade de confirmação",

      title:
        "O resultado não deve ser forçado em uma categoria",

      intro:
        "O método pode apresentar uma limitação, resultado incerto, área de incerteza técnica ou necessidade de teste complementar.",

      meaning:
        "Verifique qual antibacteriano ou resultado está sujeito à limitação e se ela impede a liberação de uma categoria confiável.",

      check:
        "Leia as notas do laudo e observe se foi recomendado repetir o teste, utilizar outro método ou aguardar confirmação.",

      action:
        "Evite utilizar o resultado questionado como fundamento isolado. Quando houver impacto imediato, esclareça o estado da investigação com o laboratório.",

      avoid:
        "Não converter um resultado não categorizado, incerto ou pendente em S, I ou R por estimativa própria."
    },

    epidemiology: {
      tabId: "cap5P48TabEpidemiology",

      label: "Relevância epidemiológica",

      title:
        "A observação pode exigir uma ação além da escolha terapêutica",

      intro:
        "Alguns mecanismos possuem importância para vigilância, prevenção da transmissão e controle de infecções.",

      meaning:
        "Verifique se o mecanismo informado possui relevância epidemiológica ou está associado à possibilidade de disseminação no serviço.",

      check:
        "Considere o tipo de amostra, a diferença entre colonização e infecção e as orientações institucionais aplicáveis.",

      action:
        "Comunique a equipe responsável pela prevenção e pelo controle de infecções conforme os fluxos e protocolos institucionais.",

      avoid:
        "Não confunda relevância epidemiológica com confirmação de infecção e não deixe de adotar medidas de controle apenas porque o isolamento representa colonização."
    }
  };

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function updatePanel(type) {
    const selectedContent = content[type];

    if (!selectedContent) {
      return;
    }

    buttons.forEach(function (button) {
      const isSelected =
        button.dataset.p48Type === type;

      button.classList.toggle(
        "is-active",
        isSelected
      );

      button.setAttribute(
        "aria-selected",
        String(isSelected)
      );

      button.tabIndex = isSelected ? 0 : -1;
    });

    panel.setAttribute(
      "aria-labelledby",
      selectedContent.tabId
    );

    panel.classList.add("is-changing");

    window.setTimeout(
      function () {
        label.textContent =
          selectedContent.label;

        title.textContent =
          selectedContent.title;

        intro.textContent =
          selectedContent.intro;

        meaning.textContent =
          selectedContent.meaning;

        check.textContent =
          selectedContent.check;

        action.textContent =
          selectedContent.action;

        avoid.textContent =
          selectedContent.avoid;

        panel.classList.remove("is-changing");
      },
      reducedMotion ? 0 : 100
    );
  }

  buttons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      updatePanel(button.dataset.p48Type);
    });

    button.addEventListener("keydown", function (event) {
      let nextIndex = index;

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        nextIndex =
          (index + 1) % buttons.length;
      } else if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {
        nextIndex =
          (index - 1 + buttons.length) %
          buttons.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = buttons.length - 1;
      } else {
        return;
      }

      event.preventDefault();

      const nextButton = buttons[nextIndex];

      nextButton.focus();
      updatePanel(nextButton.dataset.p48Type);
    });
  });

  updatePanel("confirmed");
})();

/* =========================================================
   CAPÍTULO 5 — PÁGINA 49
   ESBL
   ========================================================= */

(function initCap5Page49() {
  "use strict";

  const root = document.querySelector("[data-cap5-p49]");

  if (!root) {
    return;
  }

  const controls = Array.from(
    root.querySelectorAll("[data-p49-view]")
  );

  const panel = root.querySelector("#cap5P49Panel");
  const image = root.querySelector("#cap5P49Image");
  const zoom = root.querySelector("#cap5P49Zoom");
  const caption = root.querySelector("#cap5P49Caption");
  const kicker = root.querySelector("#cap5P49Kicker");
  const title = root.querySelector("#cap5P49Title");
  const observed = root.querySelector("#cap5P49Observed");
  const conclusion = root.querySelector("#cap5P49Conclusion");
  const caution = root.querySelector("#cap5P49Caution");

  if (
    controls.length === 0 ||
    !panel ||
    !image ||
    !zoom ||
    !caption ||
    !kicker ||
    !title ||
    !observed ||
    !conclusion ||
    !caution
  ) {
    return;
  }

  const views = {
    screening: {
      tabId: "cap5P49TabScreening",

      image:
        "../../assets/capitulo-05/imagens/esbl-perfil-sugestivo.png",

      alt:
        "Teste de suscetibilidade apresentando perfil sugestivo de produção de ESBL",

      zoomLabel:
        "Ampliar imagem do perfil sugestivo de ESBL",

      caption:
        "A redução da suscetibilidade a determinados β-lactâmicos pode levantar a suspeita de produção de ESBL.",

      kicker:
        "Etapa de triagem",

      title:
        "O perfil pode levantar uma suspeita",

      observed:
        "Redução da suscetibilidade a determinados β-lactâmicos utilizados na triagem.",

      conclusion:
        "O padrão pode indicar a necessidade de investigar a produção de ESBL.",

      caution:
        "Um perfil sugestivo não deve ser apresentado como mecanismo confirmado sem que os critérios adotados tenham sido atendidos."
    },

    confirmation: {
      tabId: "cap5P49TabConfirmation",

      image:
        "../../assets/capitulo-05/imagens/esbl-confirmacao-clavulanato.png",

      alt:
        "Teste fenotípico demonstrando aumento da zona de inibição na presença de ácido clavulânico",

      zoomLabel:
        "Ampliar imagem da demonstração fenotípica de ESBL",

      caption:
        "O aumento da zona de inibição na presença do ácido clavulânico pode demonstrar a ação inibitória sobre a enzima.",

      kicker:
        "Demonstração fenotípica",

      title:
        "O inibidor modifica o padrão de crescimento",

      observed:
        "Aumento da zona de inibição quando o β-lactâmico é associado ao ácido clavulânico.",

      conclusion:
        "Quando os critérios do método são atendidos, a diferença observada é compatível com a produção de ESBL.",

      caution:
        "A demonstração do mecanismo não substitui as categorias S, I e R nem determina isoladamente a escolha terapêutica."
    }
  };

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function updateView(viewName) {
    const selectedView = views[viewName];

    if (!selectedView) {
      return;
    }

    controls.forEach(function (control) {
      const isSelected =
        control.dataset.p49View === viewName;

      control.classList.toggle(
        "is-active",
        isSelected
      );

      control.setAttribute(
        "aria-selected",
        String(isSelected)
      );

      control.tabIndex = isSelected ? 0 : -1;
    });

    panel.setAttribute(
      "aria-labelledby",
      selectedView.tabId
    );

    panel.classList.add("is-changing");

    window.setTimeout(
      function () {
        image.src = selectedView.image;
        image.alt = selectedView.alt;

        zoom.dataset.zoom = selectedView.image;

        zoom.setAttribute(
          "aria-label",
          selectedView.zoomLabel
        );

        caption.textContent =
          selectedView.caption;

        kicker.textContent =
          selectedView.kicker;

        title.textContent =
          selectedView.title;

        observed.textContent =
          selectedView.observed;

        conclusion.textContent =
          selectedView.conclusion;

        caution.textContent =
          selectedView.caution;

        panel.classList.remove("is-changing");
      },
      reducedMotion ? 0 : 100
    );
  }

  controls.forEach(function (control, index) {
    control.addEventListener("click", function () {
      updateView(control.dataset.p49View);
    });

    control.addEventListener("keydown", function (event) {
      let nextIndex = index;

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        nextIndex =
          (index + 1) % controls.length;
      } else if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {
        nextIndex =
          (index - 1 + controls.length) %
          controls.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = controls.length - 1;
      } else {
        return;
      }

      event.preventDefault();

      const nextControl = controls[nextIndex];

      nextControl.focus();
      updateView(nextControl.dataset.p49View);
    });
  });

  updateView("screening");
})();
/* =========================================================
   CAPÍTULO 5 — PÁGINA 50
   AmpC
   ========================================================= */

(function initCap5Page50() {
  "use strict";

  initWordingInteraction();
  initSelectionSimulation();

  function initWordingInteraction() {
    const root = document.querySelector(
      "[data-cap5-p50-wording]"
    );

    if (!root) {
      return;
    }

    const buttons = Array.from(
      root.querySelectorAll("[data-p50-wording]")
    );

    const panel = root.querySelector(
      "#cap5P50WordingResult"
    );

    const label = root.querySelector(
      "#cap5P50WordingLabel"
    );

    const heading = root.querySelector(
      "#cap5P50WordingHeading"
    );

    const text = root.querySelector(
      "#cap5P50WordingText"
    );

    const action = root.querySelector(
      "#cap5P50WordingAction"
    );

    if (
      buttons.length === 0 ||
      !panel ||
      !label ||
      !heading ||
      !text ||
      !action
    ) {
      return;
    }

    const wordingContent = {
      potential: {
        tabId: "cap5P50TabPotential",

        label:
          "Informação relacionada à espécie",

        heading:
          "Indica possibilidade biológica",

        text:
          "A espécie possui um gene cromossômico induzível associado à produção de AmpC. A frase não significa que a produção elevada da enzima tenha sido demonstrada naquele isolado.",

        action:
          "<strong>Como utilizar:</strong> considerar o risco conhecido para a espécie, o antibacteriano avaliado e o contexto da infecção."
      },

      suggestive: {
        tabId: "cap5P50TabSuggestive",

        label:
          "Suspeita baseada no perfil laboratorial",

        heading:
          "O padrão é compatível, mas não definitivo",

        text:
          "O comportamento observado no teste pode ser compatível com produção de AmpC. A expressão “perfil sugestivo” não equivale à confirmação do mecanismo.",

        action:
          "<strong>Como utilizar:</strong> verificar se existe confirmação em andamento, quais resultados já foram liberados e se a suspeita interfere em uma decisão imediata."
      },

      detected: {
        tabId: "cap5P50TabDetected",

        label:
          "Mecanismo demonstrado",

        heading:
          "A produção de AmpC foi detectada",

        text:
          "O laboratório informa que o mecanismo foi demonstrado de acordo com o método e os critérios adotados.",

        action:
          "<strong>Como utilizar:</strong> integrar o mecanismo confirmado ao perfil de suscetibilidade, à espécie, ao sítio da infecção e às condições clínicas."
      }
    };

    function updateWording(type) {
      const selected = wordingContent[type];

      if (!selected) {
        return;
      }

      buttons.forEach(function (button) {
        const isSelected =
          button.dataset.p50Wording === type;

        button.classList.toggle(
          "is-active",
          isSelected
        );

        button.setAttribute(
          "aria-selected",
          String(isSelected)
        );

        button.tabIndex = isSelected ? 0 : -1;
      });

      panel.setAttribute(
        "aria-labelledby",
        selected.tabId
      );

      label.textContent = selected.label;
      heading.textContent = selected.heading;
      text.textContent = selected.text;
      action.innerHTML = selected.action;
    }

    buttons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        updateWording(button.dataset.p50Wording);
      });

      button.addEventListener("keydown", function (event) {
        let nextIndex = index;

        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ) {
          nextIndex =
            (index + 1) % buttons.length;
        } else if (
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ) {
          nextIndex =
            (index - 1 + buttons.length) %
            buttons.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = buttons.length - 1;
        } else {
          return;
        }

        event.preventDefault();

        const nextButton = buttons[nextIndex];

        nextButton.focus();

        updateWording(
          nextButton.dataset.p50Wording
        );
      });
    });

    updateWording("potential");
  }

  function initSelectionSimulation() {
    const root = document.querySelector(
      "[data-cap5-p50-selection]"
    );

    if (!root) {
      return;
    }

    const stageButtons = Array.from(
      root.querySelectorAll("[data-p50-stage]")
    );

    const population = root.querySelector(
      "#cap5P50Population"
    );

    const explanation = root.querySelector(
      "#cap5P50StageExplanation"
    );

    const playButton = root.querySelector(
      "#cap5P50Play"
    );

    const resetButton = root.querySelector(
      "#cap5P50Reset"
    );

    if (
      stageButtons.length === 0 ||
      !population ||
      !explanation ||
      !playButton ||
      !resetButton
    ) {
      return;
    }

    const stages = [
      {
        title: "População inicial",

        text:
          "Predominam bactérias com expressão basal de AmpC. Subpopulações com produção aumentada podem estar presentes em menor proporção.",

        relation:
          "o isolado pode apresentar resultado inicialmente suscetível.",

        aria:
          "População bacteriana antes da exposição, com predomínio de bactérias com expressão basal e pequena subpopulação com produção aumentada de AmpC"
      },

      {
        title: "Pressão seletiva",

        text:
          "Durante a exposição, as bactérias mais suscetíveis são inibidas. Subpopulações com maior produção de AmpC apresentam vantagem de sobrevivência.",

        relation:
          "o resultado inicial S não elimina a possibilidade de seleção durante o tratamento.",

        aria:
          "Exposição ao antibacteriano inibindo bactérias com expressão basal e selecionando subpopulações com produção aumentada de AmpC"
      },

      {
        title: "Predomínio da subpopulação selecionada",

        text:
          "As bactérias sobreviventes multiplicam-se e passam a predominar. O perfil de suscetibilidade pode se modificar.",

        relation:
          "pode surgir resistência durante o tratamento, especialmente em contextos de maior risco.",

        aria:
          "Predomínio de bactérias com produção aumentada de AmpC após a seleção pela exposição ao antibacteriano"
      }
    ];

    let currentStage = 0;
    let timer = null;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function renderStage(index) {
      const stage = stages[index];

      if (!stage) {
        return;
      }

      currentStage = index;

      population.classList.remove(
        "stage-0",
        "stage-1",
        "stage-2"
      );

      population.classList.add(
        `stage-${index}`
      );

      population.setAttribute(
        "aria-label",
        stage.aria
      );

      stageButtons.forEach(function (
        button,
        buttonIndex
      ) {
        const isSelected =
          buttonIndex === index;

        button.classList.toggle(
          "is-active",
          isSelected
        );

        button.setAttribute(
          "aria-selected",
          String(isSelected)
        );

        button.tabIndex = isSelected ? 0 : -1;
      });

      explanation.innerHTML = `
        <span>Etapa ${index + 1} de 3</span>

        <h3>${stage.title}</h3>

        <p>${stage.text}</p>

        <div>
          <strong>Relação com o laudo:</strong>
          ${stage.relation}
        </div>
      `;
    }

    function stopAnimation() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }

      playButton.setAttribute(
        "aria-pressed",
        "false"
      );

      playButton.innerHTML = `
        <span aria-hidden="true">▶</span>
        Iniciar animação
      `;
    }

    function startAnimation() {
      if (reducedMotion) {
        return;
      }

      if (currentStage >= stages.length - 1) {
        renderStage(0);
      }

      playButton.setAttribute(
        "aria-pressed",
        "true"
      );

      playButton.innerHTML = `
        <span aria-hidden="true">Ⅱ</span>
        Pausar
      `;

      timer = window.setInterval(function () {
        const nextStage = currentStage + 1;

        if (nextStage >= stages.length) {
          stopAnimation();
          return;
        }

        renderStage(nextStage);
      }, 1900);
    }

    stageButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        stopAnimation();

        renderStage(
          Number(button.dataset.p50Stage)
        );
      });

      button.addEventListener("keydown", function (event) {
        let nextIndex = index;

        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ) {
          nextIndex =
            (index + 1) % stageButtons.length;
        } else if (
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ) {
          nextIndex =
            (index - 1 + stageButtons.length) %
            stageButtons.length;
        } else {
          return;
        }

        event.preventDefault();
        stopAnimation();

        const nextButton =
          stageButtons[nextIndex];

        nextButton.focus();
        renderStage(nextIndex);
      });
    });

    playButton.addEventListener("click", function () {
      if (timer !== null) {
        stopAnimation();
      } else {
        startAnimation();
      }
    });

    resetButton.addEventListener("click", function () {
      stopAnimation();
      renderStage(0);
      stageButtons[0].focus();
    });

    document.addEventListener(
      "visibilitychange",
      function () {
        if (document.hidden) {
          stopAnimation();
        }
      }
    );

    if (reducedMotion) {
      playButton.hidden = true;
    }

    renderStage(0);
  }
})();

/* =========================================================
   CAPÍTULO 5 — PÁGINA 51
   Carbapenemases
   ========================================================= */

(function initCap5Page51() {
  "use strict";

  const root = document.querySelector("[data-cap5-p51]");

  if (!root) {
    return;
  }

  const tabs = Array.from(
    root.querySelectorAll("[data-p51-enzyme]")
  );

  const panel = root.querySelector(
    "#cap5P51EnzymePanel"
  );

  const badge = root.querySelector(
    "#cap5P51EnzymeBadge"
  );

  const enzymeClass = root.querySelector(
    "#cap5P51EnzymeClass"
  );

  const title = root.querySelector(
    "#cap5P51EnzymeTitle"
  );

  const hydrolysis = root.querySelector(
    "#cap5P51Hydrolysis"
  );

  const inhibitors = root.querySelector(
    "#cap5P51Inhibitors"
  );

  const action = root.querySelector(
    "#cap5P51Action"
  );

  const avoid = root.querySelector(
    "#cap5P51Avoid"
  );

  const keyPoint = root.querySelector(
    "#cap5P51KeyPoint"
  );

  if (
    tabs.length === 0 ||
    !panel ||
    !badge ||
    !enzymeClass ||
    !title ||
    !hydrolysis ||
    !inhibitors ||
    !action ||
    !avoid ||
    !keyPoint
  ) {
    return;
  }

  const enzymeContent = {
    kpc: {
      tabId: "cap5P51TabKpc",

      panelClass: "enzyme-kpc",

      badge: "KPC",

      enzymeClass:
        "Serino-β-lactamase de classe A",

      title:
        "Carbapenemase do tipo KPC",

      hydrolysis:
        "Pode hidrolisar penicilinas, cefalosporinas, aztreonam e carbapenêmicos.",

      inhibitors:
        "Alguns inibidores de serino-β-lactamases apresentam atividade contra KPC. A atividade da combinação deve ser confirmada no teste de suscetibilidade.",

      action:
        "Verifique o perfil completo e se a opção avaliada apresenta atividade contra o isolado e contra o mecanismo identificado. Considere o sítio da infecção, a exposição e as condições clínicas.",

      avoid:
        "Não conclua que qualquer combinação contendo um inibidor apresenta atividade contra KPC.",

      keyPoint:
        "<strong>Ponto-chave:</strong> a identificação de KPC ajuda a diferenciar esse mecanismo das metalo-β-lactamases e orienta a análise das combinações com inibidores."
    },

    ndm: {
      tabId: "cap5P51TabNdm",

      panelClass: "enzyme-ndm",

      badge: "NDM",

      enzymeClass:
        "Metalo-β-lactamase de classe B",

      title:
        "Carbapenemase do tipo NDM",

      hydrolysis:
        "Pode hidrolisar penicilinas, cefalosporinas e carbapenêmicos. A enzima depende de zinco para sua atividade.",

      inhibitors:
        "Os inibidores com atividade contra serino-β-lactamases, isoladamente, não inibem NDM. O aztreonam não é hidrolisado pela metalo-β-lactamase, mas outras enzimas produzidas pela mesma bactéria podem comprometer sua atividade.",

      action:
        "Verifique se existem outros mecanismos associados e analise o resultado da combinação efetivamente testada. Não extrapole resultados obtidos para KPC.",

      avoid:
        "Não interprete a atividade de um inibidor contra KPC como evidência de atividade contra NDM.",

      keyPoint:
        "<strong>Ponto-chave:</strong> NDM é uma metalo-β-lactamase. A presença de outros mecanismos associados pode modificar o perfil observado e a atividade prevista das combinações."
    },

    oxa: {
      tabId: "cap5P51TabOxa",

      panelClass: "enzyme-oxa",

      badge: "OXA",

      enzymeClass:
        "Oxacilinase de classe D",

      title:
        "Carbapenemase OXA-48-like",

      hydrolysis:
        "Apresenta atividade contra penicilinas e carbapenêmicos. Isoladamente, pode apresentar hidrólise limitada de cefalosporinas de amplo espectro.",

      inhibitors:
        "A resposta aos inibidores difere daquela observada para KPC e NDM. Outros mecanismos associados podem ampliar o perfil de resistência.",

      action:
        "Valorize a identificação do mecanismo mesmo diante de um perfil fenotípico pouco evidente. Revise as categorias e as observações completas do laudo.",

      avoid:
        "Não descarte a relevância da observação apenas porque algum carbapenêmico ou cefalosporina não aparece como resistente.",

      keyPoint:
        "<strong>Ponto-chave:</strong> OXA-48-like pode produzir um perfil fenotípico discreto. A identificação do mecanismo pode acrescentar uma informação que não é evidente pela leitura isolada do painel."
    }
  };

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function updateEnzyme(enzymeName) {
    const selected = enzymeContent[enzymeName];

    if (!selected) {
      return;
    }

    tabs.forEach(function (tab) {
      const isSelected =
        tab.dataset.p51Enzyme === enzymeName;

      tab.classList.toggle(
        "is-active",
        isSelected
      );

      tab.setAttribute(
        "aria-selected",
        String(isSelected)
      );

      tab.tabIndex = isSelected ? 0 : -1;
    });

    panel.setAttribute(
      "aria-labelledby",
      selected.tabId
    );

    panel.classList.add("is-changing");

    window.setTimeout(
      function () {
        panel.classList.remove(
          "enzyme-kpc",
          "enzyme-ndm",
          "enzyme-oxa"
        );

        panel.classList.add(
          selected.panelClass
        );

        badge.textContent =
          selected.badge;

        enzymeClass.textContent =
          selected.enzymeClass;

        title.textContent =
          selected.title;

        hydrolysis.textContent =
          selected.hydrolysis;

        inhibitors.textContent =
          selected.inhibitors;

        action.textContent =
          selected.action;

        avoid.textContent =
          selected.avoid;

        keyPoint.innerHTML =
          selected.keyPoint;

        panel.classList.remove("is-changing");
      },
      reducedMotion ? 0 : 100
    );
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      updateEnzyme(tab.dataset.p51Enzyme);
    });

    tab.addEventListener("keydown", function (event) {
      let nextIndex = index;

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        nextIndex =
          (index + 1) % tabs.length;
      } else if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {
        nextIndex =
          (index - 1 + tabs.length) %
          tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();

      const nextTab = tabs[nextIndex];

      nextTab.focus();

      updateEnzyme(
        nextTab.dataset.p51Enzyme
      );
    });
  });

  updateEnzyme("kpc");
})();

/* =========================================================
   CAPÍTULO 5 — PÁGINA 52
   MRSA, VRE, MLSB induzível e HLAR
   ========================================================= */

(function initCap5Page52() {
  "use strict";

  const root = document.querySelector("[data-cap5-p52]");

  if (!root) {
    return;
  }

  const tabs = Array.from(
    root.querySelectorAll("[data-p52-key]")
  );

  const panel = document.getElementById("cap5P52Panel");
  const image = document.getElementById("cap5P52Image");
  const zoomButton = document.getElementById("cap5P52Zoom");
  const caption = document.getElementById("cap5P52Caption");
  const report = document.getElementById("cap5P52Report");

  const findingTitle = document.getElementById(
    "cap5P52FindingTitle"
  );

  const finding = document.getElementById(
    "cap5P52Finding"
  );

  const effectTitle = document.getElementById(
    "cap5P52EffectTitle"
  );

  const effect = document.getElementById(
    "cap5P52Effect"
  );

  const actionTitle = document.getElementById(
    "cap5P52ActionTitle"
  );

  const action = document.getElementById(
    "cap5P52Action"
  );

  const avoid = document.getElementById(
    "cap5P52Avoid"
  );

  const progressText = document.getElementById(
    "cap5P52ProgressText"
  );

  const progressBar = document.getElementById(
    "cap5P52ProgressBar"
  );

  const progressTrack = root.querySelector(
    ".cap5-p52-progressTrack"
  );

  const completion = document.getElementById(
    "cap5P52Completion"
  );

  /* Elementos do modal */

  const imageModal = document.getElementById(
    "cap5P52ImageModal"
  );

  const modalImage = document.getElementById(
    "cap5P52ModalImage"
  );

  const modalCaption = document.getElementById(
    "cap5P52ModalCaption"
  );

  const modalCloseButton = document.getElementById(
    "cap5P52ModalClose"
  );

  const modalBackdrop = imageModal
    ? imageModal.querySelector("[data-p52-close-modal]")
    : null;

  const states = {
    mrsa: {
      tabId: "cap5P52TabMrsa",
      modifierClass: "cap5-p52-panel--mrsa",

      image:
        "../../assets/capitulo-05/imagens/mrsa-orsa-disco.png",

      imageAlt:
        "Teste fenotípico com cefoxitina para detecção de resistência à meticilina",

      caption:
        "Detecção fenotípica da resistência à meticilina em <em>Staphylococcus aureus</em>.",

      report:
        "MRSA/ORSA detectado",

      findingTitle:
        "Resistência à meticilina",

      finding:
        "O fenótipo indica resistência mediada, em geral, por uma proteína ligadora de penicilina com baixa afinidade pelos β-lactâmicos.",

      effectTitle:
        "Interpretação dos β-lactâmicos",

      effect:
        "A maioria dos β-lactâmicos deve ser considerada sem atividade contra o isolado, mesmo que alguns resultados individuais pareçam favoráveis.",

      actionTitle:
        "Consulte as opções especificamente validadas",

      action:
        "A exceção envolve apenas antibacterianos com atividade anti-MRSA validada e resultado interpretável para o isolado. A escolha ainda depende do sítio da infecção e do perfil completo de suscetibilidade.",

      avoid:
        "A resistência refere-se somente à oxacilina."
    },

    vre: {
      tabId: "cap5P52TabVre",
      modifierClass: "cap5-p52-panel--vre",

      image:
        "../../assets/capitulo-05/imagens/vre-resistencia-vancomicina.png",

      imageAlt:
        "Representação laboratorial de resistência à vancomicina em Enterococcus",

      caption:
        "Detecção de resistência à vancomicina em <em>Enterococcus</em> spp.",

      report:
        "Enterococcus spp. resistente à vancomicina — VRE",

      findingTitle:
        "Resistência à vancomicina",

      finding:
        "O resultado indica que a vancomicina não apresenta atividade adequada contra o isolado nas condições definidas pelos pontos de corte.",

      effectTitle:
        "A vancomicina deixa de ser uma opção ativa",

      effect:
        "A observação não significa resistência automática a todos os antibacterianos. A espécie identificada e cada resultado do painel continuam relevantes.",

      actionTitle:
        "Leia o restante do antibiograma",

      action:
        "Verifique as opções classificadas como S ou I e avalie sua adequação ao sítio da infecção, à exposição necessária e às características clínicas. A identificação de VRE também pode ter relevância para as medidas de prevenção e controle.",

      avoid:
        "VRE significa resistência a todos os antibacterianos."
    },

    mlsb: {
      tabId: "cap5P52TabMlsb",
      modifierClass: "cap5-p52-panel--mlsb",

      image:
        "../../assets/capitulo-05/imagens/mlsb-d-test.png",

      imageAlt:
        "D-test positivo com achatamento do halo de clindamicina próximo ao disco de eritromicina",

      caption:
        "D-test positivo, com achatamento do halo de clindamicina em direção ao disco de eritromicina.",

      report:
        "Resistência à eritromicina, aparente suscetibilidade à clindamicina e D-test positivo",

      findingTitle:
        "Resistência MLSB induzível",

      finding:
        "A proximidade da eritromicina induz a expressão do mecanismo de resistência e produz o achatamento característico do halo da clindamicina.",

      effectTitle:
        "A interpretação da clindamicina é modificada",

      effect:
        "Embora a clindamicina possa apresentar um halo aparentemente suscetível, o D-test positivo demonstra potencial de expressão da resistência durante a exposição.",

      actionTitle:
        "Considere a interpretação corrigida pelo laboratório",

      action:
        "O resultado final da clindamicina deve seguir a interpretação informada após o teste de indução, evitando considerar apenas o diâmetro inicial do halo.",

      avoid:
        "O halo inicial de clindamicina garante atividade, mesmo com D-test positivo."
    },

    hlar: {
      tabId: "cap5P52TabHlar",
      modifierClass: "cap5-p52-panel--hlar",

      image:
        "../../assets/capitulo-05/imagens/hlar-enterococcus.png",

      imageAlt:
        "Teste laboratorial para resistência de alto nível a aminoglicosídeo em Enterococcus",

      caption:
        "Pesquisa de resistência de alto nível a aminoglicosídeo em <em>Enterococcus</em> spp.",

      report:
        "HLAR para gentamicina — positivo",

      findingTitle:
        "Resistência de alto nível ao aminoglicosídeo testado",

      finding:
        "O isolado apresenta resistência em nível suficiente para impedir o efeito sinérgico esperado com a associação do aminoglicosídeo testado a um agente ativo sobre a parede celular.",

      effectTitle:
        "A estratégia de sinergia fica comprometida",

      effect:
        "O resultado não modifica automaticamente a categoria da ampicilina ou da vancomicina e não caracteriza VRE. Ele informa uma limitação específica da estratégia de associação.",

      actionTitle:
        "Não conte com a sinergia demonstradamente perdida",

      action:
        "Interprete o HLAR de acordo com o aminoglicosídeo testado, a espécie e a finalidade da associação. As demais opções devem ser avaliadas separadamente no antibiograma.",

      avoid:
        "HLAR transforma todos os outros antibacterianos do painel em resistentes."
    }
  };

  const visited = new Set(["mrsa"]);
  let currentKey = "mrsa";
  let elementBeforeModal = null;

  function updateProgress() {
    const count = visited.size;
    const percentage = (count / tabs.length) * 100;

    progressText.textContent =
      `${count} de ${tabs.length}`;

    progressBar.style.width =
      `${percentage}%`;

    progressTrack.setAttribute(
      "aria-valuenow",
      String(count)
    );

    tabs.forEach((tab) => {
      const key = tab.dataset.p52Key;

      tab.classList.toggle(
        "is-visited",
        visited.has(key)
      );
    });

    completion.hidden =
      count !== tabs.length;
  }

  function replaceContent(key) {
    const state = states[key];

    if (!state) {
      return;
    }

    currentKey = key;
    panel.classList.add("is-changing");

    window.setTimeout(() => {
      panel.className =
        `cap5-p52-panel ${state.modifierClass}`;

      panel.setAttribute(
        "aria-labelledby",
        state.tabId
      );

      image.hidden = false;
      image.src = state.image;
      image.alt = state.imageAlt;

      caption.innerHTML = state.caption;
      report.textContent = state.report;

      findingTitle.textContent =
        state.findingTitle;

      finding.textContent =
        state.finding;

      effectTitle.textContent =
        state.effectTitle;

      effect.textContent =
        state.effect;

      actionTitle.textContent =
        state.actionTitle;

      action.textContent =
        state.action;

      avoid.innerHTML =
        `<strong>Evite concluir:</strong> ` +
        `<span>“${state.avoid}”</span>`;

      requestAnimationFrame(() => {
        panel.classList.remove("is-changing");
      });
    }, 140);
  }

  function activateTab(selectedTab, moveFocus) {
    const key = selectedTab.dataset.p52Key;

    tabs.forEach((tab) => {
      const isSelected =
        tab === selectedTab;

      tab.classList.toggle(
        "is-active",
        isSelected
      );

      tab.setAttribute(
        "aria-selected",
        String(isSelected)
      );

      tab.tabIndex =
        isSelected ? 0 : -1;
    });

    visited.add(key);
    replaceContent(key);
    updateProgress();

    if (moveFocus) {
      selectedTab.focus();
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(tab, false);
    });

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        nextIndex =
          (index + 1) % tabs.length;
      } else if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {
        nextIndex =
          (index - 1 + tabs.length) %
          tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();

      activateTab(
        tabs[nextIndex],
        true
      );
    });
  });

  /* =======================================================
     ABERTURA E FECHAMENTO DO MODAL
     ======================================================= */

  function openImageModal() {
    const state = states[currentKey];

    if (
      !imageModal ||
      !modalImage ||
      !modalCaption ||
      !modalCloseButton ||
      !state
    ) {
      return;
    }

    elementBeforeModal =
      document.activeElement;

    modalImage.src = state.image;
    modalImage.alt = state.imageAlt;
    modalCaption.innerHTML = state.caption;

    imageModal.hidden = false;

    document.body.classList.add(
      "cap5-p52-modalOpen"
    );

    window.requestAnimationFrame(() => {
      modalCloseButton.focus();
    });
  }

  function closeImageModal() {
    if (
      !imageModal ||
      imageModal.hidden
    ) {
      return;
    }

    imageModal.hidden = true;

    modalImage.src = "";
    modalImage.alt = "";
    modalCaption.textContent = "";

    document.body.classList.remove(
      "cap5-p52-modalOpen"
    );

    if (
      elementBeforeModal &&
      typeof elementBeforeModal.focus ===
        "function"
    ) {
      elementBeforeModal.focus();
    }
  }

  function keepFocusInsideModal(event) {
    if (
      event.key !== "Tab" ||
      !imageModal ||
      imageModal.hidden
    ) {
      return;
    }

    const focusableElements = Array.from(
      imageModal.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

    if (!focusableElements.length) {
      return;
    }

    const firstElement =
      focusableElements[0];

    const lastElement =
      focusableElements[
        focusableElements.length - 1
      ];

    if (
      event.shiftKey &&
      document.activeElement === firstElement
    ) {
      event.preventDefault();
      lastElement.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  zoomButton.addEventListener(
    "click",
    openImageModal
  );

  if (modalCloseButton) {
    modalCloseButton.addEventListener(
      "click",
      closeImageModal
    );
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener(
      "click",
      closeImageModal
    );
  }

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        imageModal &&
        !imageModal.hidden
      ) {
        closeImageModal();
        return;
      }

      keepFocusInsideModal(event);
    }
  );

  /*
   * Impede o aparecimento do ícone de imagem
   * quebrada caso algum arquivo ainda não tenha
   * sido colocado na pasta.
   */

  image.addEventListener("error", () => {
    image.hidden = true;
    zoomButton.disabled = true;
  });

  image.addEventListener("load", () => {
    image.hidden = false;
    zoomButton.disabled = false;
  });

  modalImage.addEventListener("error", () => {
    closeImageModal();
  });

  updateProgress();
})();
/* =========================
   PÁGINA 53 — QUIZ DE REVISÃO
   ========================= */

(function initCap5Page53Quiz() {
  "use strict";

  const root = document.querySelector("[data-cap5-p53]");

  if (!root) {
    return;
  }

  const situations = [
    {
      kicker: "Situação clínica 1",

      caseText:
        "Um paciente internado apresenta tosse e secreção " +
        "respiratória. A bacterioscopia de uma amostra de escarro " +
        "mostra numerosas células epiteliais, poucos leucócitos e " +
        "microbiota mista. Posteriormente, a cultura identifica uma " +
        "bactéria potencialmente patogênica.",

      prompt:
        "Qual interpretação integra melhor os resultados antes de " +
        "atribuir relevância clínica ao isolamento?",

      correct: "b",

      options: [
        {
          id: "a",
          text:
            "A identificação de uma espécie potencialmente " +
            "patogênica confirma que ela é a causa da infecção, " +
            "independentemente da qualidade da amostra."
        },
        {
          id: "b",
          text:
            "Os achados sugerem possível contaminação por " +
            "secreções orais; a qualidade da amostra e a " +
            "correlação clínica devem ser consideradas antes " +
            "de interpretar o isolamento como infecção."
        },
        {
          id: "c",
          text:
            "A presença de microbiota mista invalida " +
            "obrigatoriamente toda a cultura e dispensa a " +
            "análise dos demais dados."
        }
      ],

      feedback: {
        a:
          "A identificação bacteriana, isoladamente, não " +
          "diferencia infecção, colonização ou contaminação. " +
          "A representatividade do material e o contexto " +
          "clínico continuam essenciais.",

        b:
          "Numerosas células epiteliais, poucos leucócitos e " +
          "microbiota mista sugerem uma amostra respiratória " +
          "pouco representativa, possivelmente contaminada por " +
          "secreções orais. A interpretação deve integrar coleta, " +
          "bacterioscopia, cultura e dados clínicos.",

        c:
          "A baixa qualidade reduz a confiabilidade da amostra, " +
          "mas a interpretação não deve ser automática. O modo " +
          "de coleta, os critérios laboratoriais e o contexto " +
          "clínico ainda precisam ser considerados."
      }
    },

    {
      kicker: "Situação clínica 2",

      caseText:
        "Uma paciente com pielonefrite apresenta um isolado " +
        "classificado como I para determinado antibacteriano. " +
        "Há um regime validado capaz de aumentar a exposição, " +
        "a função renal permite sua utilização e o fármaco alcança " +
        "concentrações adequadas no trato urinário.",

      prompt:
        "Como a categoria I deve ser interpretada nesse contexto?",

      correct: "c",

      options: [
        {
          id: "a",
          text:
            "Como resistência intermediária, indicando que o " +
            "antibacteriano deve ser descartado mesmo quando a " +
            "exposição pode ser aumentada."
        },
        {
          id: "b",
          text:
            "Como equivalente à categoria S em qualquer dose, " +
            "sem necessidade de verificar o regime, o sítio da " +
            "infecção ou a segurança."
        },
        {
          id: "c",
          text:
            "Como sensível, aumentando a exposição; pode ser uma " +
            "opção quando um regime validado atinge a exposição " +
            "necessária com segurança no sítio da infecção."
        }
      ],

      feedback: {
        a:
          "Na classificação atual, a categoria I não significa " +
          "que o microrganismo deva ser interpretado como " +
          "resistente. A probabilidade de sucesso depende do " +
          "aumento da exposição ao antibacteriano.",

        b:
          "A categoria I não equivale à categoria S em qualquer " +
          "posologia. É necessário verificar o regime, o sítio " +
          "da infecção, a função renal e a segurança.",

        c:
          "A categoria I significa “sensível, aumentando a " +
          "exposição”. O antibacteriano pode ser considerado " +
          "quando um regime validado proporciona exposição " +
          "adequada e segura no sítio da infecção."
      }
    },

    {
      kicker: "Situação clínica 3",

      caseText:
        "Uma hemocultura identifica Enterobacter cloacae complex. " +
        "O antibiograma inicial mostra categoria S para uma " +
        "cefalosporina, e o laudo acrescenta uma observação sobre " +
        "o potencial de produção de AmpC cromossômica induzível. " +
        "Durante o tratamento, o paciente deixa de melhorar como " +
        "esperado.",

      prompt:
        "Qual interpretação dos novos dados é mais adequada?",

      correct: "b",

      options: [
        {
          id: "a",
          text:
            "A observação invalida automaticamente todos os " +
            "resultados S e comprova que o teste inicial estava " +
            "errado."
        },
        {
          id: "b",
          text:
            "O resultado S descreve o teste inicial, mas a " +
            "espécie, o antibacteriano e a evolução clínica " +
            "exigem considerar resistência emergente e " +
            "reavaliar clínica e microbiologicamente."
        },
        {
          id: "c",
          text:
            "Como o isolado foi inicialmente classificado como S, " +
            "a piora não pode estar relacionada a uma mudança do " +
            "perfil de suscetibilidade."
        }
      ],

      feedback: {
        a:
          "A observação sobre AmpC não invalida automaticamente " +
          "o resultado inicial. Ela alerta para uma limitação " +
          "que deve ser interpretada conforme a espécie, o " +
          "antibacteriano e a evolução clínica.",

        b:
          "A expressão de AmpC pode aumentar durante a exposição " +
          "a determinados betalactâmicos, favorecendo a seleção " +
          "de subpopulações com maior resistência. A falta de " +
          "resposta exige reavaliação clínica, microbiológica e " +
          "do controle do foco infeccioso.",

        c:
          "Um resultado inicial S representa o comportamento do " +
          "isolado no momento do teste. Ele não garante que o " +
          "perfil de suscetibilidade permanecerá inalterado " +
          "durante toda a exposição ao antibacteriano."
      }
    }
  ];

  const progress = root.querySelector("[data-p53-progress]");
  const dots = Array.from(
    root.querySelectorAll(".cap5-p53Dots span")
  );

  const kicker = root.querySelector("[data-p53-kicker]");
  const caseText = root.querySelector("[data-p53-case]");
  const prompt = root.querySelector("[data-p53-prompt]");
  const options = root.querySelector("[data-p53-options]");
  const confirmButton = root.querySelector("[data-p53-confirm]");
  const resetButton = root.querySelector("[data-p53-reset]");
  const feedback = root.querySelector("[data-p53-feedback]");
  const previousButton = root.querySelector("[data-p53-prev]");
  const nextButton = root.querySelector("[data-p53-next]");

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

    situation.options.forEach(function (option, optionIndex) {
      const button = document.createElement("button");
      const letter = document.createElement("span");
      const text = document.createElement("span");

      button.type = "button";
      button.dataset.option = option.id;

      letter.className = "cap5-p53Letter";
      letter.textContent = String.fromCharCode(65 + optionIndex);

      text.textContent = option.text;

      if (response.selected === option.id) {
        button.classList.add("is-selected");
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

    const buttons = options.querySelectorAll("button");

    buttons.forEach(function (button) {
      button.classList.toggle(
        "is-selected",
        button.dataset.option === optionId
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

    previousButton.disabled = currentIndex === 0;

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
    const buttons = options.querySelectorAll("button");
    const isCorrect =
      response.selected === situation.correct;

    buttons.forEach(function (button) {
      button.disabled = true;

      if (button.dataset.option === situation.correct) {
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
      "cap5-p53Feedback is-visible " +
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

    feedback.className = "cap5-p53Feedback";
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

  confirmButton.addEventListener("click", function () {
    const response = responses[currentIndex];

    if (!response.selected || response.confirmed) {
      return;
    }

    response.confirmed = true;

    showConfirmedState();
    updateStatus();
    updateNavigation();
  });

  resetButton.addEventListener("click", function () {
    responses[currentIndex] = {
      selected: null,
      confirmed: false
    };

    render();
  });

  previousButton.addEventListener("click", function () {
    if (currentIndex === 0) {
      return;
    }

    currentIndex -= 1;
    render();
  });

  nextButton.addEventListener("click", function () {
    if (
      !responses[currentIndex].confirmed ||
      currentIndex === situations.length - 1
    ) {
      return;
    }

    currentIndex += 1;
    render();
  });

  render();
})();