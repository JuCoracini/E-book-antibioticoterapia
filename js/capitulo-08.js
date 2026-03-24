/* =========================
   Capítulo 08 — Página 62
   ========================= */
(function initCap8FocusMap() {
  const root = document.querySelector("[data-cap8-focus]");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll(".cap8-hotspot"));
  const titleEl = root.querySelector("[data-focus-title]");
  const textEl = root.querySelector("[data-focus-text]");
  const tagEl = root.querySelector("[data-focus-tag]");

  if (!buttons.length || !titleEl || !textEl || !tagEl) return;

  const content = {
    respiratorio: {
      title: "Foco respiratório",
      tag: "Probabilidade bacteriana",
      text: "Nas síndromes respiratórias, o primeiro passo é avaliar se há plausibilidade clínica de infecção bacteriana. Sintomas inespecíficos, como tosse e febre, não bastam isoladamente. A presença de sinais focais, consolidação em imagem e contexto clínico compatível aumenta a probabilidade de pneumonia bacteriana e orienta a escolha empírica inicial."
    },
    cutaneo: {
      title: "Foco cutâneo",
      tag: "Extensão e profundidade",
      text: "Nas infecções de pele e partes moles, a apresentação clínica ajuda a distinguir quadros superficiais não complicados de apresentações purulentas, invasivas ou necrosantes. A necessidade de drenagem, a presença de abscesso e os sinais sistêmicos influenciam diretamente a decisão sobre a amplitude do espectro inicial."
    },
    intraabdominal: {
      title: "Foco intra-abdominal",
      tag: "Polimicrobianos + controle do foco",
      text: "Nas infecções intra-abdominais, a etiologia costuma ser polimicrobiana, com participação de bacilos Gram-negativos entéricos e anaeróbios. Além da antibioticoterapia, o controle do foco infeccioso, como drenagem ou correção cirúrgica, é parte essencial do sucesso terapêutico."
    },
    sistemico: {
      title: "Foco sistêmico",
      tag: "Urgência clínica",
      text: "Na bacteremia e na sepse, a decisão terapêutica precisa equilibrar urgência clínica e incerteza etiológica. Em pacientes com disfunção orgânica ou instabilidade, a cobertura inicial tende a ser mais abrangente, mas deve ser reavaliada assim que hemoculturas e evolução clínica permitirem maior precisão."
    },
    urinario: {
      title: "Foco urinário",
      tag: "Sintomas + contexto",
      text: "Nas infecções urinárias, a decisão não deve ser guiada apenas pela urocultura. O raciocínio parte da compatibilidade entre sintomas, achados laboratoriais e contexto clínico. A bacteriúria assintomática, por exemplo, geralmente representa colonização e não exige tratamento antibacteriano."
    }
  };

  function activate(key) {
    const item = content[key];
    if (!item) return;

    buttons.forEach((btn) => {
      const isActive = btn.dataset.focusTarget === key;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    titleEl.textContent = item.title;
    textEl.textContent = item.text;
    tagEl.textContent = item.tag;
  }

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      activate(btn.dataset.focusTarget);
    });

    btn.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          buttons[(index + 1) % buttons.length].focus();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          buttons[(index - 1 + buttons.length) % buttons.length].focus();
          break;
        case "Home":
          event.preventDefault();
          buttons[0].focus();
          break;
        case "End":
          event.preventDefault();
          buttons[buttons.length - 1].focus();
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          activate(btn.dataset.focusTarget);
          break;
      }
    });
  });

  activate("respiratorio");
})();
/* =========================
   Capítulo 08 — Página 63
   ========================= */
(function initCap8RespDiagram() {
  const root = document.querySelector("[data-cap8-resp]");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll(".cap8-respHotspot"));
  const titleEl = root.querySelector("[data-resp-title]");
  const textEl = root.querySelector("[data-resp-text]");
  const tagEl = root.querySelector("[data-resp-tag]");

  if (!buttons.length || !titleEl || !textEl || !tagEl) return;

  const content = {
    consolidacao: {
      title: "Consolidação pulmonar",
      tag: "Achado radiológico relevante",
      text: "A consolidação pulmonar em exames de imagem aumenta a probabilidade de pneumonia bacteriana quando ocorre em contexto clínico compatível. Isoladamente, porém, um achado de imagem não deve ser interpretado sem correlação com a apresentação do paciente."
    },
    soma: {
      title: "Combinação dos achados",
      tag: "Integração clínica",
      text: "O raciocínio adequado não se apoia em um elemento isolado. A combinação entre achado radiológico sugestivo e sinais clínicos sistêmicos torna mais plausível a hipótese de pneumonia bacteriana e fortalece a justificativa para antibioticoterapia empírica."
    },
    sistemicos: {
      title: "Sinais sistêmicos",
      tag: "Compatibilidade clínica",
      text: "Sinais clínicos compatíveis com processo infeccioso sistêmico reforçam a plausibilidade de infecção ativa. Febre, comprometimento do estado geral e outros sinais de resposta inflamatória do hospedeiro devem ser interpretados em conjunto com o restante da avaliação."
    },
    probabilidade: {
      title: "Alta probabilidade de pneumonia bacteriana",
      tag: "Decisão empírica mais plausível",
      text: "Quando consolidação pulmonar e sinais sistêmicos coexistem em contexto clínico compatível, a probabilidade de pneumonia bacteriana aumenta significativamente. Nesse cenário, a consideração de antibioticoterapia empírica torna-se mais consistente do ponto de vista clínico."
    }
  };

  function activate(key) {
    const item = content[key];
    if (!item) return;

    buttons.forEach((btn) => {
      const isActive = btn.dataset.respTarget === key;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    titleEl.textContent = item.title;
    textEl.textContent = item.text;
    tagEl.textContent = item.tag;
  }

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      activate(btn.dataset.respTarget);
    });

    btn.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          buttons[(index + 1) % buttons.length].focus();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          buttons[(index - 1 + buttons.length) % buttons.length].focus();
          break;
        case "Home":
          event.preventDefault();
          buttons[0].focus();
          break;
        case "End":
          event.preventDefault();
          buttons[buttons.length - 1].focus();
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          activate(btn.dataset.respTarget);
          break;
      }
    });
  });

  activate("consolidacao");
})();
/* =========================
   Capítulo 08 — Página 65
   Infecções intra-abdominais
   ========================= */
(function initCap8IIA() {
  const root = document.querySelector("[data-cap8-iia]");
  if (!root) return;

  const nodes = Array.from(root.querySelectorAll(".cap8-iia-node"));
  const titleEl = root.querySelector("[data-iia-title]");
  const textEl = root.querySelector("[data-iia-text]");
  const tagEl = root.querySelector("[data-iia-tag]");

  if (!nodes.length || !titleEl || !textEl || !tagEl) return;

  const content = {
    isolada: {
      title: "Antibioticoterapia isolada",
      tag: "Persistência da infecção",
      text: "Nas infecções intra-abdominais, antibacterianos microbiologicamente ativos podem não ser suficientes quando o foco infeccioso permanece não drenado ou anatomicamente não corrigido. Abscessos, perfurações e coleções fechadas podem manter a infecção apesar da terapia."
    },
    controle: {
      title: "Antibioticoterapia + controle do foco",
      tag: "Maior chance de resolução",
      text: "A drenagem de abscessos, a correção de perfurações e outras intervenções sobre o foco infeccioso frequentemente são determinantes para o sucesso terapêutico. A antibioticoterapia atua de forma mais eficaz quando associada ao controle anatômico do processo infeccioso."
    }
  };

  function activate(key) {
    const item = content[key];
    if (!item) return;

    nodes.forEach((node) => {
      const isActive = node.dataset.iiaNode === key;
      node.classList.toggle("is-active", isActive);
      node.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    titleEl.textContent = item.title;
    textEl.textContent = item.text;
    tagEl.textContent = item.tag;
  }

  nodes.forEach((node, index) => {
    node.addEventListener("click", () => {
      activate(node.dataset.iiaNode);
    });

    node.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          event.preventDefault();
          nodes[(index + 1) % nodes.length].focus();
          break;
        case "ArrowUp":
        case "ArrowLeft":
          event.preventDefault();
          nodes[(index - 1 + nodes.length) % nodes.length].focus();
          break;
        case "Home":
          event.preventDefault();
          nodes[0].focus();
          break;
        case "End":
          event.preventDefault();
          nodes[nodes.length - 1].focus();
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          activate(node.dataset.iiaNode);
          break;
      }
    });
  });

  activate("isolada");
})();
/* =========================
   CAPÍTULO 8 — PÁGINA 68
   Quiz de revisão
   ========================= */

(function initCap8Quiz() {
  const quiz = document.querySelector('[data-cap8-quiz]');
  if (!quiz) return;

  const questions = Array.from(quiz.querySelectorAll('.cap8-question'));
  const progress = quiz.querySelector('.cap8-quizProgress');
  const prevBtn = quiz.querySelector('.cap8-quizNavBtn[data-action="prev"]');
  const nextBtn = quiz.querySelector('.cap8-quizNavBtn[data-action="next"]');
  const doneBox = quiz.querySelector('.cap8-done');

  let currentIndex = 0;

  function updateNav() {
    progress.textContent = `Questão ${currentIndex + 1} de ${questions.length}`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === questions.length - 1;
  }

  function showQuestion(index) {
    questions.forEach((q, i) => {
      q.classList.toggle('active', i === index);
    });
    doneBox.hidden = true;
    currentIndex = index;
    updateNav();
  }

  function markOptionState(question, selectedBtn, correctBtn) {
    const options = Array.from(question.querySelectorAll('.cap8-options button'));

    options.forEach((btn) => {
      btn.disabled = true;
      btn.classList.remove('is-selected');

      if (btn === selectedBtn) {
        btn.classList.add('is-selected');
      }

      if (btn === correctBtn) {
        btn.classList.add('is-correct');
      } else if (btn === selectedBtn && btn !== correctBtn) {
        btn.classList.add('is-incorrect');
      }
    });
  }

  function resetQuestion(question) {
    const options = Array.from(question.querySelectorAll('.cap8-options button'));
    const confirmBtn = question.querySelector('.cap8-btn[data-action="confirm"]');
    const resetBtn = question.querySelector('.cap8-btn[data-action="reset"]');
    const feedback = question.querySelector('.cap8-feedback');

    options.forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove('is-selected', 'is-correct', 'is-incorrect');
      btn.removeAttribute('data-selected');
    });

    confirmBtn.disabled = true;
    resetBtn.hidden = true;
    feedback.innerHTML = '';
  }

  questions.forEach((question) => {
    const options = Array.from(question.querySelectorAll('.cap8-options button'));
    const confirmBtn = question.querySelector('.cap8-btn[data-action="confirm"]');
    const resetBtn = question.querySelector('.cap8-btn[data-action="reset"]');
    const feedback = question.querySelector('.cap8-feedback');
    const rationaleTemplate = question.querySelector('.cap8-rationale');

    let selectedOption = null;

    options.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;

        selectedOption = btn;
        options.forEach((option) => option.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        confirmBtn.disabled = false;
      });
    });

    confirmBtn.addEventListener('click', () => {
      if (!selectedOption) return;

      const correctBtn = question.querySelector('[data-correct="true"]');
      markOptionState(question, selectedOption, correctBtn);

      feedback.innerHTML = '';
      feedback.appendChild(rationaleTemplate.content.cloneNode(true));

      confirmBtn.disabled = true;
      resetBtn.hidden = false;

      const isLastQuestion = currentIndex === questions.length - 1;
      if (isLastQuestion) {
        doneBox.hidden = false;
      }
    });

    resetBtn.addEventListener('click', () => {
      selectedOption = null;
      resetQuestion(question);
    });
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      showQuestion(currentIndex - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < questions.length - 1) {
      showQuestion(currentIndex + 1);
    }
  });

  showQuestion(0);
})();