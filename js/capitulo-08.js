(function initCap8Page69(){
  const page = document.querySelector(".cap8-page69");
  if (!page) return;

  const data = {
    respiratorio: {
      kicker: "Foco respiratório",
      title: "O foco provável organiza a primeira cobertura",
      text: "Em infecções respiratórias, a decisão inicial depende da coerência entre quadro clínico, exame físico e, quando disponível, achados de imagem. O foco anatômico ajuda a estimar quais patógenos são mais prováveis e qual amplitude de cobertura faz sentido naquele contexto.",
      weight: "Compatibilidade clínica do quadro e gravidade da apresentação.",
      risk: "Presumir infecção bacteriana apenas com base em sintomas respiratórios inespecíficos."
    },
    cutaneo: {
      kicker: "Foco cutâneo",
      title: "A extensão da lesão muda o raciocínio inicial",
      text: "Nas infecções cutâneas, o primeiro passo é distinguir inflamação localizada de infecção bacteriana verdadeira. A distribuição da lesão, a presença de secreção, necrose, dor desproporcional e repercussão sistêmica influenciam diretamente a decisão empírica.",
      weight: "Profundidade da lesão, extensão do acometimento e sinais sistêmicos.",
      risk: "Superestimar infecção bacteriana em processos inflamatórios não infecciosos."
    },
    intraabdominal: {
      kicker: "Foco intra-abdominal",
      title: "Antibacteriano não substitui controle de foco",
      text: "Nas infecções intra-abdominais, a estimativa microbiológica costuma ser mais complexa e frequentemente polimicrobiana. A escolha empírica precisa considerar gravidade, local provável do processo e a possibilidade de perfuração ou necrose, sem perder de vista a necessidade de controle do foco infeccioso.",
      weight: "Gravidade clínica associada à possibilidade de drenagem, cirurgia ou outra intervenção de foco.",
      risk: "Depender apenas da cobertura antibacteriana sem abordar a fonte da infecção."
    },
    sistemico: {
      kicker: "Foco sistêmico",
      title: "Gravidade redefine a urgência da decisão",
      text: "Quando a apresentação sugere infecção sistêmica, a prioridade é reduzir rapidamente o risco de inadequação terapêutica inicial. Nessa situação, a escolha empírica costuma exigir cobertura mais ampla, orientada pela gravidade, pelo provável foco de origem e pelo perfil do paciente.",
      weight: "Instabilidade hemodinâmica, sinais de disfunção orgânica e risco de sepse.",
      risk: "Subestimar gravidade e atrasar o início da antibioticoterapia empírica."
    },
    urinario: {
      kicker: "Foco urinário",
      title: "O laboratório só ganha sentido com a síndrome clínica",
      text: "Nas infecções urinárias, o raciocínio empírico depende da relação entre sintomas, contexto clínico e achados laboratoriais. O foco urinário não deve ser definido apenas por bacteriúria, porque a presença de microrganismos na urina pode refletir colonização e não doença infecciosa ativa.",
      weight: "Síndrome urinária compatível, contexto do paciente e possível repercussão sistêmica.",
      risk: "Tratar bacteriúria assintomática fora das situações em que isso é indicado."
    }
  };

  const tabs = Array.from(page.querySelectorAll(".cap8-p69-tab"));
  const panel = page.querySelector("[data-p69-panel]");
  const kicker = page.querySelector("[data-p69-kicker]");
  const title = page.querySelector("[data-p69-title]");
  const text = page.querySelector("[data-p69-text]");
  const weight = page.querySelector("[data-p69-weight]");
  const risk = page.querySelector("[data-p69-risk]");

  if (!tabs.length || !panel || !kicker || !title || !text || !weight || !risk) return;

  function syncTabs(activeKey){
    tabs.forEach((tab) => {
      const isActive = tab.dataset.focus === activeKey;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function renderFocus(key){
    const entry = data[key];
    if (!entry) return;

    kicker.textContent = entry.kicker;
    title.textContent = entry.title;
    text.textContent = entry.text;
    weight.textContent = entry.weight;
    risk.textContent = entry.risk;

    syncTabs(key);
  }

  function measurePanelHeight(){
    const original = {
      kicker: kicker.textContent,
      title: title.textContent,
      text: text.textContent,
      weight: weight.textContent,
      risk: risk.textContent
    };

    let maxHeight = panel.offsetHeight;

    Object.keys(data).forEach((key) => {
      const entry = data[key];
      kicker.textContent = entry.kicker;
      title.textContent = entry.title;
      text.textContent = entry.text;
      weight.textContent = entry.weight;
      risk.textContent = entry.risk;

      const height = panel.scrollHeight;
      if (height > maxHeight) maxHeight = height;
    });

    kicker.textContent = original.kicker;
    title.textContent = original.title;
    text.textContent = original.text;
    weight.textContent = original.weight;
    risk.textContent = original.risk;

    panel.style.setProperty("--p69-panel-height", `${Math.ceil(maxHeight)}px`);
    page.querySelector(".cap8-p69-interaction")?.style.setProperty("--p69-panel-height", `${Math.ceil(maxHeight)}px`);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      renderFocus(tab.dataset.focus);
    });
  });

  renderFocus("respiratorio");

  window.requestAnimationFrame(() => {
    measurePanelHeight();
    renderFocus("respiratorio");
  });

  window.addEventListener("resize", () => {
    measurePanelHeight();
  });
})();

(function initCap8Page70(){
  const root = document.querySelector(".cap8-page70");
  if (!root) return;

  const options = root.querySelectorAll(".cap8-p70-option");
  const feedback = root.querySelector(".cap8-p70-feedback");
  const evolution = root.querySelector(".cap8-p70-evolution");
  const revealBtn = root.querySelector("[data-reveal]");
  const reveal = root.querySelector(".cap8-p70-reveal");

  const map = {
    alta: "Leitura precipitada. Sintomas isolados não permitem distinguir etiologia viral de bacteriana.",
    moderada: "Raciocínio parcialmente adequado, mas ainda faltam elementos objetivos para sustentar infecção bacteriana.",
    baixa: "Leitura mais consistente. Na ausência de achados específicos, a probabilidade de etiologia viral é maior."
  };

  options.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      options.forEach(b=>b.classList.remove("is-selected"));
      btn.classList.add("is-selected");

      feedback.textContent = map[btn.dataset.choice];
      feedback.classList.add("is-visible");

      evolution.hidden = false;
    });
  });

  revealBtn?.addEventListener("click", ()=>{
    reveal.innerHTML = "A presença de infiltrado pulmonar associada a sinais sistêmicos aumenta significativamente a probabilidade de pneumonia bacteriana.";
    reveal.classList.add("is-visible");
  });

})();
(function initCap8Page71(){
  const root = document.querySelector(".cap8-page71");
  if (!root) return;

  const options = root.querySelectorAll(".cap8-p71-option");
  const feedback = root.querySelector(".cap8-p71-feedback");
  const consequenceBox = root.querySelector(".cap8-p71-consequence");
  const consequenceBtn = root.querySelector("[data-consequence]");
  const result = root.querySelector(".cap8-p71-result");

  const map = {
    infeccao: {
      text: "Interpretação inadequada. A presença isolada de bacteriúria não define infecção urinária ativa na ausência de sintomas."
    },
    colonizacao: {
      text: "Interpretação mais consistente. Na ausência de sintomas urinários, a bacteriúria corresponde à colonização e não deve ser tratada na maioria das situações."
    },
    inconclusivo: {
      text: "Leitura incompleta. A urocultura não deve ser interpretada isoladamente, mas neste caso já há elementos suficientes para afastar infecção ativa."
    }
  };

  options.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      options.forEach(b=>b.classList.remove("is-selected"));
      btn.classList.add("is-selected");

      feedback.textContent = map[btn.dataset.choice].text;
      feedback.classList.add("is-visible");

      consequenceBox.hidden = false;
    });
  });

  consequenceBtn?.addEventListener("click", ()=>{
    result.innerHTML = "O tratamento desnecessário pode levar à seleção de cepas resistentes, alteração da microbiota e exposição a efeitos adversos sem benefício clínico.";
    result.classList.add("is-visible");
  });

})();
(function initCap8Page72(){
  const root = document.querySelector(".cap8-page72");
  if (!root) return;

  const options = root.querySelectorAll(".cap8-p72-option");
  const feedback = root.querySelector(".cap8-p72-feedback");

  const map = {
    polimicrobiana: "Característica importante, mas não é o elemento determinante isolado da conduta clínica.",
    espectro: "Pode ser necessário em determinados contextos, mas não garante resolução do processo infeccioso.",
    foco: "Esse é o princípio central. Sem controle do foco infeccioso, a infecção pode persistir mesmo na presença de antibacterianos ativos."
  };

  options.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      options.forEach(b=>b.classList.remove("is-selected"));
      btn.classList.add("is-selected");

      feedback.textContent = map[btn.dataset.choice];
      feedback.classList.add("is-visible");
    });
  });

})();
(function initCap8Page73(){
  const page = document.querySelector(".cap8-page73");
  if (!page) return;

  const data = {
    "hora-zero": {
      kicker: "Hora Zero",
      title: "Prioridade é não atrasar cobertura adequada",
      text: "Em pacientes com suspeita de sepse e disfunção orgânica, a prioridade é iniciar prontamente terapia antimicrobiana empírica adequada. Nessa fase, a urgência clínica predomina sobre a precisão etiológica, e o risco de inadequação terapêutica precoce pesa diretamente no prognóstico.",
      focus: "Reduzir rapidamente o risco de tratamento inicial inadequado.",
      risk: "Subestimar a gravidade do quadro e atrasar a cobertura empírica nas primeiras horas."
    },
    "24-48h": {
      kicker: "24–48h",
      title: "Reavaliação contínua passa a reorganizar a conduta",
      text: "À medida que a evolução clínica e os resultados parciais se tornam disponíveis, a estratégia inicial precisa ser reavaliada. Nessa fase, o raciocínio deve integrar resposta clínica, foco provável e dados microbiológicos ainda incompletos, sem manter decisões iniciais de forma automática.",
      focus: "Integrar evolução clínica, hipótese etiológica e resultados parciais.",
      risk: "Manter cobertura empírica ampla sem reavaliação ativa da estratégia inicial."
    },
    "72h": {
      kicker: "72h+",
      title: "Patógeno identificado deve orientar terapia direcionada",
      text: "Quando o microrganismo é identificado e seu perfil de suscetibilidade se torna conhecido, a terapia deve ser ajustada ao patógeno isolado. O objetivo passa a ser preservar eficácia clínica com menor exposição ecológica e menor uso desnecessário de antibacterianos de amplo espectro.",
      focus: "Direcionar o tratamento ao agente identificado e reduzir exposição desnecessária.",
      risk: "Manter ampliação empírica inicial indefinidamente, mesmo diante de dados que permitem estreitamento."
    }
  };

  const tabs = Array.from(page.querySelectorAll(".cap8-p73-tab"));
  const segments = Array.from(page.querySelectorAll(".cap8-p73-stage__segment"));
  const timeline = page.querySelector(".cap8-p73-timeline");
  const panel = page.querySelector("[data-p73-panel]");
  const kicker = page.querySelector("[data-p73-kicker]");
  const title = page.querySelector("[data-p73-title]");
  const text = page.querySelector("[data-p73-text]");
  const focus = page.querySelector("[data-p73-focus]");
  const risk = page.querySelector("[data-p73-risk]");

  if (!tabs.length || !timeline || !panel || !kicker || !title || !text || !focus || !risk) return;

  function syncTabs(activeKey){
    tabs.forEach((tab) => {
      const isActive = tab.dataset.phase === activeKey;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    segments.forEach((segment) => {
      segment.classList.toggle("is-active", segment.dataset.segment === activeKey);
    });
  }

  function renderPhase(key){
    const entry = data[key];
    if (!entry) return;

    kicker.textContent = entry.kicker;
    title.textContent = entry.title;
    text.textContent = entry.text;
    focus.textContent = entry.focus;
    risk.textContent = entry.risk;

    syncTabs(key);
  }

  function measurePanelHeight(){
    const original = {
      kicker: kicker.textContent,
      title: title.textContent,
      text: text.textContent,
      focus: focus.textContent,
      risk: risk.textContent
    };

    let maxHeight = panel.offsetHeight;

    Object.keys(data).forEach((key) => {
      const entry = data[key];
      kicker.textContent = entry.kicker;
      title.textContent = entry.title;
      text.textContent = entry.text;
      focus.textContent = entry.focus;
      risk.textContent = entry.risk;

      const height = panel.scrollHeight;
      if (height > maxHeight) maxHeight = height;
    });

    kicker.textContent = original.kicker;
    title.textContent = original.title;
    text.textContent = original.text;
    focus.textContent = original.focus;
    risk.textContent = original.risk;

    const finalHeight = `${Math.ceil(maxHeight)}px`;
    panel.style.setProperty("--p73-panel-height", finalHeight);
    timeline.style.setProperty("--p73-panel-height", finalHeight);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      renderPhase(tab.dataset.phase);
    });
  });

  renderPhase("hora-zero");

  window.requestAnimationFrame(() => {
    measurePanelHeight();
    renderPhase("hora-zero");
  });

  window.addEventListener("resize", measurePanelHeight);
})();

(function initCap8Page74(){
  const page = document.querySelector(".cap8-page74");
  if (!page) return;

  const data = {
    "nao-purulenta": {
      kicker: "Celulite não purulenta",
      title: "Sem gravidade e sem purulência, o alvo inicial costuma ser mais estreito",
      text: "Na ausência de secreção purulenta, abscesso e sinais sistêmicos relevantes, a hipótese de infecção superficial não purulenta orienta cobertura dirigida principalmente a estreptococos, sem justificativa rotineira para ampliação desnecessária do espectro.",
      focus: "Direcionar o tratamento ao perfil mais provável e evitar amplo espectro desnecessário.",
      risk: "Automatizar cobertura ampliada para Gram-negativos e anaeróbios em infecções superficiais não complicadas."
    },
    "purulenta": {
      kicker: "Abscesso purulento",
      title: "Quando há purulência, drenagem reorganiza a prioridade terapêutica",
      text: "A presença de coleção purulenta ou abscesso aumenta a probabilidade de participação estafilocócica e recoloca a drenagem como elemento central da conduta. Em quadros selecionados, sem sinais sistêmicos de infecção, a intervenção local pode ser suficiente sem necessidade obrigatória de antibioticoterapia sistêmica.",
      focus: "Reconhecer o papel central da drenagem e ajustar a necessidade real de antibioticoterapia.",
      risk: "Reduzir todo quadro purulento a antibacteriano sistêmico, negligenciando a abordagem local do foco."
    },
    "grave": {
      kicker: "Necrose / gravidade",
      title: "Rápida progressão, necrose ou instabilidade mudam imediatamente a escala da resposta",
      text: "Em apresentações com necrose tecidual, progressão rápida, instabilidade hemodinâmica ou comprometimento sistêmico importante, a probabilidade de infecção invasiva ou polimicrobiana aumenta. Nessa situação, a conduta passa a exigir abordagem terapêutica mais abrangente e, frequentemente, intervenção cirúrgica imediata.",
      focus: "Reconhecer gravidade precocemente e integrar antibacteriano amplo com avaliação cirúrgica urgente.",
      risk: "Tratar quadros potencialmente necrosantes como celulites simples e retardar intervenção decisiva."
    }
  };

  const tabs = Array.from(page.querySelectorAll(".cap8-p74-tab"));
  const clinic = page.querySelector(".cap8-p74-clinic");
  const panel = page.querySelector("[data-p74-panel]");
  const kicker = page.querySelector("[data-p74-kicker]");
  const title = page.querySelector("[data-p74-title]");
  const text = page.querySelector("[data-p74-text]");
  const focus = page.querySelector("[data-p74-focus]");
  const risk = page.querySelector("[data-p74-risk]");

  if (!tabs.length || !clinic || !panel || !kicker || !title || !text || !focus || !risk) return;

  function syncTabs(activeKey){
    tabs.forEach((tab) => {
      const isActive = tab.dataset.case === activeKey;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function renderCase(key){
    const entry = data[key];
    if (!entry) return;

    kicker.textContent = entry.kicker;
    title.textContent = entry.title;
    text.textContent = entry.text;
    focus.textContent = entry.focus;
    risk.textContent = entry.risk;

    syncTabs(key);
  }

  function measurePanelHeight(){
    const original = {
      kicker: kicker.textContent,
      title: title.textContent,
      text: text.textContent,
      focus: focus.textContent,
      risk: risk.textContent
    };

    let maxHeight = panel.offsetHeight;

    Object.keys(data).forEach((key) => {
      const entry = data[key];
      kicker.textContent = entry.kicker;
      title.textContent = entry.title;
      text.textContent = entry.text;
      focus.textContent = entry.focus;
      risk.textContent = entry.risk;

      const height = panel.scrollHeight;
      if (height > maxHeight) maxHeight = height;
    });

    kicker.textContent = original.kicker;
    title.textContent = original.title;
    text.textContent = original.text;
    focus.textContent = original.focus;
    risk.textContent = original.risk;

    const finalHeight = `${Math.ceil(maxHeight)}px`;
    panel.style.setProperty("--p74-panel-height", finalHeight);
    clinic.style.setProperty("--p74-panel-height", finalHeight);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      renderCase(tab.dataset.case);
    });
  });

  renderCase("nao-purulenta");

  window.requestAnimationFrame(() => {
    measurePanelHeight();
    renderCase("nao-purulenta");
  });

  window.addEventListener("resize", measurePanelHeight);
})();
(function initCap8Page75(){
  const root = document.querySelector("[data-cap8-p75]");
  if (!root) return;

  const statusValue = root.querySelector(".cap8-p75Status__value");
  const questions = Array.from(root.querySelectorAll(".cap8-p75Question"));
  const completion = root.querySelector("[data-p75-completion]");

  function parseFeedbackMap(article){
    const template = article.querySelector(".cap8-p75FeedbackMap");
    if (!template) return {};
    try {
      return JSON.parse(template.innerHTML.trim());
    } catch (error) {
      console.error("Erro ao ler feedback do quiz da página 75:", error);
      return {};
    }
  }

  function updateStatus(){
    const confirmedCount = questions.filter(
      (question) => question.getAttribute("data-question-state") === "confirmed"
    ).length;

    if (statusValue){
      statusValue.textContent = `${confirmedCount} de ${questions.length} situações confirmadas`;
    }

    if (completion){
      completion.hidden = confirmedCount !== questions.length;
    }
  }

  function clearFeedback(feedback){
    feedback.className = "cap8-p75Feedback";
    feedback.innerHTML = "";
  }

  questions.forEach((article) => {
    const options = Array.from(article.querySelectorAll(".cap8-p75Options button"));
    const confirmButton = article.querySelector('[data-p75-action="confirm"]');
    const resetButton = article.querySelector('[data-p75-action="reset"]');
    const feedback = article.querySelector(".cap8-p75Feedback");
    const feedbackMap = parseFeedbackMap(article);

    let selectedAnswer = null;

    function resetQuestion(){
      selectedAnswer = null;
      article.setAttribute("data-question-state", "pending");

      options.forEach((button) => {
        button.disabled = false;
        button.classList.remove("is-selected", "is-correct", "is-error");
      });

      if (confirmButton){
        confirmButton.disabled = true;
      }

      if (resetButton){
        resetButton.hidden = true;
      }

      if (feedback){
        clearFeedback(feedback);
      }

      updateStatus();
    }

    options.forEach((button) => {
      button.addEventListener("click", () => {
        if (article.getAttribute("data-question-state") === "confirmed") return;

        selectedAnswer = button.getAttribute("data-answer");

        options.forEach((option) => {
          option.classList.remove("is-selected");
        });

        button.classList.add("is-selected");

        if (confirmButton){
          confirmButton.disabled = false;
        }
      });
    });

    confirmButton?.addEventListener("click", () => {
      if (!selectedAnswer) return;

      const selectedButton = options.find(
        (button) => button.getAttribute("data-answer") === selectedAnswer
      );

      const entry = feedbackMap[selectedAnswer];
      if (!selectedButton || !entry || !feedback) return;

      article.setAttribute("data-question-state", "confirmed");

      options.forEach((button) => {
        button.disabled = true;
        button.classList.remove("is-selected");
      });

      selectedButton.classList.add(entry.type === "correct" ? "is-correct" : "is-error");

      feedback.classList.add("is-visible", entry.type === "correct" ? "is-correct" : "is-error");
      feedback.innerHTML = `
        <p class="cap8-p75Feedback__title">${entry.title}</p>
        <p class="cap8-p75Feedback__text">${entry.text}</p>
      `;

      confirmButton.disabled = true;
      if (resetButton){
        resetButton.hidden = false;
      }

      updateStatus();
    });

    resetButton?.addEventListener("click", resetQuestion);

    resetQuestion();
  });

  updateStatus();
})();