/* =========================
   Página 30 — Exposição antimicrobiana e seleção de resistência
   ========================= */
(function initCap4Page30() {
  const root = document.querySelector(".cap4-page30");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap4-p30-guide__chip"));
  const eyebrow = root.querySelector("#cap4-p30-eyebrow");
  const title = root.querySelector("#cap4-p30-title");
  const text = root.querySelector("#cap4-p30-text");

  if (!tabs.length || !eyebrow || !title || !text) return;

  const map = {
    cim: {
      eyebrow: "Leitura interpretativa",
      title: "Estar acima da CIM não resolve sozinho o problema seletivo",
      html: `
        <p>
          A CIM marca o ponto a partir do qual a inibição bacteriana se torna possível no ensaio laboratorial. Mas, do ponto de vista clínico, o risco seletivo não desaparece apenas por ultrapassar esse limiar: ainda pode haver sobrevivência relativa de variantes menos suscetíveis.
        </p>
      `
    },
    cpm: {
      eyebrow: "Leitura interpretativa",
      title: "A CPM desloca a análise para o risco de emergência de variantes",
      html: `
        <p>
          A CPM ajuda a visualizar o nível acima do qual a sobrevivência de subpopulações com menor suscetibilidade relativa se torna menos provável. Ela não define apenas “mais concentração”, mas um patamar com implicações diferentes para contenção seletiva.
        </p>
      `
    },
    janela: {
      eyebrow: "Leitura interpretativa",
      title: "É na faixa intermediária que a seleção se torna clinicamente relevante",
      html: `
        <p>
          A janela de seleção mutante não representa apenas uma zona entre duas linhas. Ela expressa o cenário em que parte da população bacteriana já sofre supressão, mas variantes menos suscetíveis continuam viáveis, favorecendo mudança gradual da composição populacional.
        </p>
      `
    },
    curva: {
      eyebrow: "Leitura interpretativa",
      title: "O risco depende do tempo de permanência nessa faixa, não só do pico atingido",
      html: `
        <p>
          A curva concentração–tempo mostra que o problema farmacológico não é apenas alcançar uma concentração máxima elevada em algum momento. O ponto decisivo é quanto tempo a exposição permanece em uma faixa que ainda permite pressão seletiva incompleta.
        </p>
      `
    }
  };

  function activate(key) {
    const item = map[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p30Step === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.innerHTML = item.html;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.p30Step));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p30Step);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p30Step);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p30Step);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p30Step);
      }
    });
  });

  activate("cim");
})();

/* =========================
   Página 31 — Via de administração
   ========================= */
(function initCap4Page31() {
  const root = document.querySelector(".cap4-page31");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap4-p31-routes__tab"));
  const eyebrow = root.querySelector("#cap4-p31-eyebrow");
  const title = root.querySelector("#cap4-p31-title");
  const text = root.querySelector("#cap4-p31-text");

  if (!tabs.length || !eyebrow || !title || !text) return;

  const map = {
    iv: {
      eyebrow: "Maior previsibilidade da exposição",
      title: "Via intravenosa",
      html: `
        <p>
          Na administração intravenosa, o antibacteriano é introduzido diretamente na circulação sistêmica, resultando em biodisponibilidade completa e início imediato de exposição. Nesse cenário, não há etapa de absorção, e a variabilidade associada a esse processo é praticamente eliminada. Como consequência, a concentração plasmática torna-se mais previsível, especialmente em situações clínicas críticas, nas quais a estabilidade da exposição é determinante para o início da resposta terapêutica <sup>10–12</sup>.
        </p>
      `
    },
    oral: {
      eyebrow: "Maior dependência do processo de absorção",
      title: "Via oral",
      html: `
        <p>
          Por outro lado, na administração por via oral, a concentração sistêmica depende da absorção gastrointestinal, um processo influenciado por múltiplos fatores fisiológicos e clínicos. Condições como pH gástrico, motilidade intestinal, presença de alimentos, integridade da mucosa e interações medicamentosas podem modificar tanto a fração absorvida quanto a velocidade com que o antibacteriano atinge a circulação sistêmica. Como consequência, a biodisponibilidade pode variar entre indivíduos e entre diferentes momentos clínicos no mesmo paciente <sup>10–12</sup>.
        </p>
      `
    },
    parenteral: {
      eyebrow: "Exposição dependente da perfusão tecidual",
      title: "Vias intramuscular e subcutânea",
      html: `
        <p>
          Outras vias parenterais, como a administração intramuscular ou subcutânea, apresentam características intermediárias entre a via intravenosa e a via oral. Nesses casos, a absorção ocorre a partir do tecido onde o fármaco é depositado e depende, entre outros fatores, da perfusão local, das propriedades físico-químicas da molécula e das condições clínicas do hospedeiro. Em situações de hipoperfusão tecidual, como em estados de choque, essa absorção pode se tornar imprevisível, aproximando-se de padrões de exposição subótimos <sup>9,10</sup>.
        </p>
      `
    }
  };

  function activate(key) {
    const item = map[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p31Route === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.innerHTML = item.html;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.p31Route));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p31Route);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p31Route);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p31Route);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p31Route);
      }
    });
  });

  activate("iv");
})();
/* =========================
   PÁGINA 32
   ========================= */

/* Sem interação específica.
   Mantém apenas o comportamento global do app.js */
/* =========================
   Página 33 — Via de administração e implicações clínicas na resposta terapêutica
   ========================= */
(function initCap4Page33() {
  const root = document.querySelector(".cap4-page33");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap4-p33-guide__chip"));
  const eyebrow = root.querySelector("#cap4-p33-eyebrow");
  const title = root.querySelector("#cap4-p33-title");
  const text = root.querySelector("#cap4-p33-text");

  if (!tabs.length || !eyebrow || !title || !text) return;

  const map = {
    vo: {
      eyebrow: "Zona de menor risco farmacocinético",
      title: "Via oral segura ou transição para VO",
      html: `
        <p>
          Quando a absorção gastrointestinal é previsível e a gravidade clínica é menor, a via oral pode sustentar exposição sistêmica adequada. Nessa situação, o raciocínio não é “oral sempre funciona”, mas que o alvo farmacodinâmico pode ser alcançado sem perda relevante de eficácia.
        </p>
      `
    },
    monitor: {
      eyebrow: "Zona de vigilância clínica",
      title: "Monitoramento clínico rigoroso",
      html: `
        <p>
          Mesmo com absorção previsível, o aumento da gravidade clínica reduz a margem de segurança para depender apenas da estabilidade farmacocinética presumida. Aqui, a decisão exige acompanhamento clínico mais rigoroso, porque pequenas perdas de exposição podem ter impacto terapêutico maior.
        </p>
      `
    },
    biodisponibilidade: {
      eyebrow: "Zona de incerteza farmacocinética",
      title: "Avaliar biodisponibilidade antes de confiar na via oral",
      html: `
        <p>
          Quando a previsibilidade da absorção é baixa, a questão central deixa de ser apenas a escolha entre conforto e praticidade. O ponto decisivo passa a ser se a biodisponibilidade real naquele paciente é suficiente para produzir exposição compatível com eficácia terapêutica.
        </p>
      `
    },
    iv: {
      eyebrow: "Zona de maior necessidade de controle da exposição",
      title: "Uso obrigatório da via intravenosa",
      html: `
        <p>
          Quando a gravidade é alta e a absorção é pouco previsível, a via intravenosa deixa de ser apenas preferível e passa a ser necessária. Nessa situação, reduzir variabilidade e garantir concentração sistêmica inicial adequada é parte central da estratégia terapêutica.
        </p>
      `
    }
  };

  function activate(key) {
    const item = map[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p33Zone === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.innerHTML = item.html;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.p33Zone));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p33Zone);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p33Zone);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p33Zone);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p33Zone);
      }
    });
  });

  activate("vo");
})();
/* =========================
   Página 34 — Interação PK/PD
   ========================= */

(function(){

const buttons = document.querySelectorAll(".p34-btn");
const title = document.getElementById("p34-title");
const text = document.getElementById("p34-text");

const content = {

  time: {
    title: "Como ler a curva para fármacos tempo-dependentes",
    text: "Observe o intervalo em que a curva permanece acima da CIM. O ponto crítico não é o pico, mas a duração da exposição efetiva ao longo do tempo. Estratégias terapêuticas tendem a prolongar esse tempo, não necessariamente aumentar o pico."
  },

  peak: {
    title: "Como interpretar o pico de concentração",
    text: "Aqui o foco deve estar na altura máxima da curva em relação à CIM. Quanto maior o pico relativo, maior tende a ser a intensidade inicial do efeito antimicrobiano."
  },

  auc: {
    title: "Como interpretar a exposição total",
    text: "Observe a área total sob a curva ao longo do tempo. O efeito antimicrobiano depende da combinação entre intensidade e duração da exposição, e não apenas de um ponto específico da curva."
  }

};

buttons.forEach(btn => {

  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const mode = btn.dataset.mode;

    title.textContent = content[mode].title;
    text.textContent = content[mode].text;

  });

});

})();
(function(){

const buttons = document.querySelectorAll(".p35-btn");
const text = document.getElementById("p35-text");

const content = {

  plasma: "Concentrações plasmáticas elevadas não garantem eficácia terapêutica se o antibacteriano não conseguir se distribuir adequadamente até o local da infecção.",

  intersticio: "Alterações como edema e inflamação podem modificar a difusão do fármaco e reduzir a concentração efetiva no tecido.",

  celulas: "A penetração intracelular depende das propriedades do fármaco. Antibacterianos hidrofílicos podem ter limitação nesse compartimento.",

  foco: "No foco infeccioso, fatores como necrose, pus e baixa perfusão podem impedir que a concentração atinja níveis terapêuticos adequados."

};

buttons.forEach(btn => {

  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    text.textContent = content[btn.dataset.step];

  });

});

})();
/* =========================
   Página 36 — Biofilme e microambiente infeccioso
   ========================= */
(function initCap4Page36() {
  const root = document.querySelector(".cap4-page36");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap4-p36-guide__chip"));
  const eyebrow = root.querySelector("#cap4-p36-eyebrow");
  const title = root.querySelector("#cap4-p36-title");
  const text = root.querySelector("#cap4-p36-text");

  if (!tabs.length || !eyebrow || !title || !text) return;

  const map = {
    superficie: {
      eyebrow: "Camada de maior contato com o meio externo",
      title: "Superfície do biofilme",
      html: `
        <p>
          As camadas superficiais estão mais expostas ao antibacteriano e aos componentes da resposta imune. Mesmo assim, a simples presença de concentração externa adequada não garante que essa mesma exposição será reproduzida em toda a estrutura organizada do biofilme.
        </p>
      `
    },
    intermediaria: {
      eyebrow: "Zona de queda progressiva da exposição",
      title: "Camada intermediária",
      html: `
        <p>
          À medida que o fármaco avança pela matriz extracelular, a difusão se torna menos livre e a concentração tende a diminuir. Essa região ajuda a compreender por que a exposição deixa de ser uniforme e passa a formar gradientes dentro da própria estrutura infecciosa.
        </p>
      `
    },
    profunda: {
      eyebrow: "Zona de menor atividade metabólica",
      title: "Camada profunda do biofilme",
      html: `
        <p>
          Nas camadas mais profundas, bactérias frequentemente apresentam metabolismo reduzido e menor taxa de divisão. Mesmo sem resistência genética estável, essa condição pode diminuir a eficácia de antibacterianos que dependem de crescimento bacteriano ativo para exercer seu melhor efeito farmacodinâmico.
        </p>
      `
    },
    microambiente: {
      eyebrow: "Condições locais que alteram o comportamento terapêutico",
      title: "Microambiente infeccioso",
      html: `
        <p>
          pH local, disponibilidade de oxigênio, acúmulo de detritos celulares, perfusão tecidual e organização da matriz modificam simultaneamente a atividade do antibacteriano e a resposta imune do hospedeiro. O problema clínico, portanto, não é apenas estrutural, mas também funcional.
        </p>
      `
    }
  };

  function activate(key) {
    const item = map[key];
    if (!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p36Step === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.innerHTML = item.html;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.p36Step));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p36Step);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p36Step);
      }

      if (event.key === "Home") {
        event.preventDefault();
        tabs[0].focus();
        activate(tabs[0].dataset.p36Step);
      }

      if (event.key === "End") {
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        activate(tabs[tabs.length - 1].dataset.p36Step);
      }
    });
  });

  activate("superficie");
})();
/* =========================
   Página 37 — Interação evolutiva
   ========================= */

(function(){

const buttons = document.querySelectorAll(".p37-btn");
const text = document.getElementById("p37-text");

const content = {

  inicio: "Pequenas diferenças de suscetibilidade já estão presentes antes do início da terapia, mesmo quando o microrganismo é classificado como sensível.",

  exposicao: "A eliminação bacteriana não ocorre de forma uniforme e depende da relação entre a concentração alcançada e a suscetibilidade de cada subpopulação.",

  selecao: "Quando a exposição é insuficiente para erradicação completa, bactérias viáveis permanecem sob pressão seletiva, favorecendo adaptação progressiva.",

  predominio: "O resultado final não é apenas sobrevivência bacteriana, mas a alteração da distribuição populacional, com predomínio de variantes menos suscetíveis."

};

buttons.forEach(btn => {

  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    text.textContent = content[btn.dataset.step];

  });

});

})();
/* =========================
   Página 38 — Quiz de revisão
   ========================= */
(function initCap4Page38() {
  const root = document.querySelector(".cap4-page38");
  if (!root) return;

  const quiz = root.querySelector("[data-cap4-p38]");
  const questions = Array.from(root.querySelectorAll(".cap4-p38Question"));
  const statusValue = root.querySelector("[data-p38-status] .cap4-p38Status__value");
  const completion = root.querySelector("[data-p38-completion]");

  if (!quiz || !questions.length || !statusValue) return;

  function updateStatus() {
    const done = questions.filter((q) => q.dataset.questionState === "done").length;
    statusValue.textContent = `${done} de 2 situações confirmadas`;

    if (completion) {
      completion.hidden = done !== questions.length;
    }
  }

  function renderFeedback(container, payload) {
    container.hidden = false;
    container.className = "cap4-p38Feedback";
    if (payload.type === "error") {
      container.classList.add("cap4-p38Feedback--error");
    }

    container.innerHTML = `
      <p class="cap4-p38Feedback__title">${payload.title}</p>
      <p class="cap4-p38Feedback__text">${payload.text}</p>
    `;
  }

  questions.forEach((question) => {
    const options = Array.from(question.querySelectorAll(".cap4-p38Options button[data-answer]"));
    const confirmBtn = question.querySelector('[data-p38-action="confirm"]');
    const resetBtn = question.querySelector('[data-p38-action="reset"]');
    const feedback = question.querySelector(".cap4-p38Feedback");
    const feedbackMapEl = question.querySelector(".cap4-p38FeedbackMap");

    if (!options.length || !confirmBtn || !resetBtn || !feedback || !feedbackMapEl) return;

    const feedbackMap = JSON.parse(feedbackMapEl.innerHTML.trim());
    let selected = null;

    feedback.hidden = true;

    function resetQuestion() {
      selected = null;
      question.dataset.questionState = "pending";

      options.forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove("is-selected", "is-correct", "is-wrong");
      });

      confirmBtn.disabled = true;
      confirmBtn.hidden = false;
      resetBtn.hidden = true;

      feedback.hidden = true;
      feedback.innerHTML = "";
      feedback.className = "cap4-p38Feedback";

      updateStatus();
    }

    options.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (question.dataset.questionState === "done") return;

        options.forEach((b) => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        selected = btn.dataset.answer;
        confirmBtn.disabled = false;
      });
    });

    confirmBtn.addEventListener("click", () => {
      if (!selected) return;

      const correctBtn = options.find((btn) => btn.dataset.correct === "true");
      const selectedBtn = options.find((btn) => btn.dataset.answer === selected);

      options.forEach((btn) => {
        btn.disabled = true;
        btn.classList.remove("is-selected");
      });

      if (correctBtn) {
        correctBtn.classList.add("is-correct");
      }

      if (selectedBtn && selectedBtn !== correctBtn) {
        selectedBtn.classList.add("is-wrong");
      }

      const payload = feedbackMap[selected];
      if (payload) {
        renderFeedback(feedback, payload);
      }

      question.dataset.questionState = "done";
      confirmBtn.hidden = true;
      resetBtn.hidden = false;

      updateStatus();
    });

    resetBtn.addEventListener("click", resetQuestion);
  });

  updateStatus();
})();