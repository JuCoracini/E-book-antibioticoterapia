/* =========================
   PÁGINA 54
   ========================= */

// Nenhuma interação específica necessária.
// Utiliza apenas:
// - Lightbox global (app.js)
// - Paginação global

(function initCap6Page54(){
  // Página intencionalmente limpa para manter fluidez cognitiva
})();

/* =========================
   PÁGINA 55 — INTERAÇÕES
   ========================= */

(function initCap6Page55Interactions(){
  const root = document.querySelector("[data-cap6-p55]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p55-tab]"));
  const title = root.querySelector("[data-p55-title]");
  const lead = root.querySelector("[data-p55-lead]");
  const summary = root.querySelector("[data-p55-summary]");
  const barA = root.querySelector("[data-p55-bar-a]");
  const barB = root.querySelector("[data-p55-bar-b]");
  const barCombo = root.querySelector("[data-p55-bar-combo]");

  if(!tabs.length || !title || !lead || !summary || !barA || !barB || !barCombo) return;

  const map = {
    sinergismo: {
      title: "Sinergismo",
      lead: "A combinação produz atividade antimicrobiana superior à obtida com cada antibacteriano isoladamente.",
      summary: "A ação de um agente favorece ou potencializa a atividade do outro, podendo acelerar a redução da carga bacteriana em contextos específicos.",
      widths: { a: "48%", b: "42%", combo: "86%" }
    },
    aditivo: {
      title: "Efeito aditivo",
      lead: "A combinação produz resultado equivalente à soma das atividades individuais de cada antibacteriano.",
      summary: "Não há interação biológica relevante entre os agentes. O efeito observado reflete a contribuição independente de cada fármaco.",
      widths: { a: "42%", b: "38%", combo: "66%" }
    },
    indiferenca: {
      title: "Indiferença",
      lead: "A associação não altera de forma significativa a resposta obtida com monoterapia adequada.",
      summary: "A presença de dois agentes ativos não modifica substancialmente a dinâmica infecciosa nem acrescenta benefício consistente.",
      widths: { a: "62%", b: "56%", combo: "62%" }
    },
    antagonismo: {
      title: "Antagonismo",
      lead: "A combinação reduz a eficácia global porque a ação de um agente interfere no mecanismo necessário para a atividade do outro.",
      summary: "O resultado combinado torna-se inferior ao esperado, ilustrando que associação antibacteriana não corresponde automaticamente a maior eficácia.",
      widths: { a: "64%", b: "54%", combo: "36%" }
    }
  };

  function activate(key){
    const item = map[key];
    if(!item) return;

    tabs.forEach(tab => {
      tab.setAttribute("aria-selected", tab.dataset.p55Tab === key ? "true" : "false");
    });

    title.textContent = item.title;
    lead.textContent = item.lead;
    summary.textContent = item.summary;

    barA.style.width = item.widths.a;
    barB.style.width = item.widths.b;
    barCombo.style.width = item.widths.combo;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.p55Tab));
  });

  activate("sinergismo");
})();
/* =========================
   PÁGINA 56 — COBERTURA
   ========================= */

(function initCap6Page56Coverage(){
  const root = document.querySelector("[data-cap6-p56]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p56-tab]"));
  const title = root.querySelector("[data-p56-title]");
  const lead = root.querySelector("[data-p56-lead]");
  const summary = root.querySelector("[data-p56-summary]");

  const aGp = root.querySelector("[data-p56-a-gp]");
  const aGn = root.querySelector("[data-p56-a-gn]");
  const aAna = root.querySelector("[data-p56-a-ana]");
  const bGp = root.querySelector("[data-p56-b-gp]");
  const bGn = root.querySelector("[data-p56-b-gn]");
  const bAna = root.querySelector("[data-p56-b-ana]");

  if(!tabs.length || !title || !lead || !summary || !aGp || !aGn || !aAna || !bGp || !bGn || !bAna) return;

  const segments = [aGp, aGn, aAna, bGp, bGn, bAna];

  const map = {
    complementar: {
      title: "Cobertura complementar",
      lead: "Cada antibacteriano amplia o espectro global ao cobrir grupos bacterianos distintos, o que pode ser útil diante de incerteza diagnóstica relevante.",
      summary: "Nesta situação, a associação amplia a cobertura porque cada agente alcança grupos bacterianos diferentes. O objetivo é reduzir o risco inicial de cobertura insuficiente, e não manter dois agentes indefinidamente.",
      on: ["aGp", "bGn", "bAna"]
    },
    duplicada: {
      title: "Duplicação de espectro",
      lead: "Os dois agentes atuam sobre grupos bacterianos semelhantes, produzindo sobreposição de cobertura sem benefício proporcional claro.",
      summary: "Aqui a associação tende a aumentar exposição farmacológica e pressão seletiva sem ampliar de modo relevante a chance de cobertura adequada. Quando dados clínicos e microbiológicos permitem, essa redundância perde justificativa biológica.",
      on: ["aGp", "aGn", "bGp", "bGn"]
    }
  };

  function clearSegments(){
    segments.forEach(seg => seg.classList.remove("is-on"));
  }

  function activateSegments(keys){
    const ref = { aGp, aGn, aAna, bGp, bGn, bAna };
    keys.forEach(key => {
      if(ref[key]) ref[key].classList.add("is-on");
    });
  }

  function activate(key){
    const item = map[key];
    if(!item) return;

    tabs.forEach(tab => {
      tab.setAttribute("aria-selected", tab.dataset.p56Tab === key ? "true" : "false");
    });

    title.textContent = item.title;
    lead.textContent = item.lead;
    summary.textContent = item.summary;

    clearSegments();
    activateSegments(item.on);
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.p56Tab));
  });

  activate("complementar");
})();
/* =========================
   PÁGINA 57 — RESISTÊNCIA
   ========================= */

(function initCap6Page57Resistance(){
  const root = document.querySelector("[data-cap6-p57]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p57-tab]"));
  const title = root.querySelector("[data-p57-title]");
  const lead = root.querySelector("[data-p57-lead]");
  const summary = root.querySelector("[data-p57-summary]");
  const initialBox = root.querySelector("[data-p57-initial]");
  const finalBox = root.querySelector("[data-p57-final]");

  if(!tabs.length || !title || !lead || !summary || !initialBox || !finalBox) return;

  const map = {
    mono: {
      title: "Monoterapia",
      lead: "Quando apenas um antibacteriano é utilizado, subpopulações com menor suscetibilidade a esse agente podem sobreviver e expandir-se se a exposição não for plenamente supressiva.",
      summary: "Neste cenário, a pressão seletiva recai sobre um único alvo. Se a exposição for insuficiente para suprimir toda a população, variantes menos suscetíveis podem persistir e tornar-se proporcionalmente mais frequentes.",
      initial: { sens: 28, less: 6, multi: 0 },
      final: { sens: 6, less: 14, multi: 0 }
    },
    combo: {
      title: "Terapia combinada",
      lead: "Quando dois agentes com alvos independentes são utilizados simultaneamente, a sobrevivência passa a exigir adaptação contra ambos, o que pode reduzir a probabilidade de expansão de variantes resistentes em contextos específicos.",
      summary: "A associação pode reduzir a chance de que subpopulações menos suscetíveis escapem durante o tratamento, mas esse benefício depende de carga bacteriana, exposição adequada e características biológicas do patógeno.",
      initial: { sens: 28, less: 6, multi: 2 },
      final: { sens: 3, less: 2, multi: 1 }
    }
  };

  function makeDot(type){
    const dot = document.createElement("span");
    dot.className = `cap6-p57-particle cap6-p57-particle--${type}`;
    return dot;
  }

  function fillBox(box, counts){
    box.innerHTML = "";
    ["sens", "less", "multi"].forEach(type => {
      const total = counts[type] || 0;
      for(let i = 0; i < total; i++){
        box.appendChild(makeDot(type));
      }
    });
  }

  function activate(key){
    const item = map[key];
    if(!item) return;

    tabs.forEach(tab => {
      tab.setAttribute("aria-selected", tab.dataset.p57Tab === key ? "true" : "false");
    });

    title.textContent = item.title;
    lead.textContent = item.lead;
    summary.textContent = item.summary;

    fillBox(initialBox, item.initial);
    fillBox(finalBox, item.final);
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.p57Tab));
  });

  activate("mono");
})();

/* =========================
   PÁGINA 58 — PK/PD
   ========================= */

(function initCap6Page58PKPD(){
  const root = document.querySelector("[data-cap6-p58]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p58-tab]"));
  const title = root.querySelector("[data-p58-title]");
  const lead = root.querySelector("[data-p58-lead]");
  const summary = root.querySelector("[data-p58-summary]");
  const curve = root.querySelector("[data-p58-curve]");
  const badge = root.querySelector("[data-p58-badge]");
  const pressure = root.querySelector("[data-p58-pressure]");
  const control = root.querySelector("[data-p58-control]");

  if(!tabs.length || !title || !lead || !summary || !curve || !badge || !pressure || !control) return;

  const map = {
    subexp: {
      title: "Exposição insuficiente",
      lead: "O antibacteriano é administrado, mas a concentração no sítio infeccioso permanece abaixo do nível necessário para supressão efetiva da população bacteriana.",
      summary: "Quando a exposição local é inadequada, o patógeno permanece sob pressão incompleta. Nessa situação, o problema central não é ausência de um segundo fármaco, mas falha de exposição do regime inicial.",
      curve: "M60 178 C120 168, 160 160, 210 154 S315 150, 370 156 S470 168, 610 178",
      stroke: "#94a3b8",
      badgeText: "Insuficiente",
      badgeClass: "cap6-p58-badge cap6-p58-badge--warn",
      pressure: "Intermediária",
      control: "Inconsistente"
    },
    add: {
      title: "Adicionar outro agente",
      lead: "A introdução de um segundo antibacteriano aumenta a exposição farmacológica global, mas não corrige automaticamente a falha estrutural do regime inicial nem garante erradicação consistente.",
      summary: "Sem correção da dose, do intervalo, da via ou da penetração tecidual, a combinação pode apenas ampliar a pressão seletiva sobre a população bacteriana sem resolver a falha central de exposição.",
      curve: "M60 178 C120 166, 160 154, 210 146 S300 142, 360 148 S465 160, 610 170",
      stroke: "#0e7490",
      badgeText: "Parcial",
      badgeClass: "cap6-p58-badge cap6-p58-badge--mixed",
      pressure: "Ampliada",
      control: "Ainda incerto"
    },
    opt: {
      title: "Otimizar o regime",
      lead: "Ajustar dose, intervalo, via de administração e condições de penetração no foco infeccioso aborda diretamente o determinante farmacológico da falha terapêutica.",
      summary: "A intensificação racional começa com correção da exposição local e reavaliação do foco infeccioso. Só depois disso a ampliação farmacológica pode ser discutida de modo biologicamente consistente.",
      curve: "M60 172 C110 118, 150 95, 210 84 S320 88, 372 96 S470 120, 610 170",
      stroke: "#1abc9c",
      badgeText: "Adequada",
      badgeClass: "cap6-p58-badge cap6-p58-badge--ok",
      pressure: "Supressiva",
      control: "Mais consistente"
    }
  };

  function activate(key){
    const item = map[key];
    if(!item) return;

    tabs.forEach(tab => {
      tab.setAttribute("aria-selected", tab.dataset.p58Tab === key ? "true" : "false");
    });

    title.textContent = item.title;
    lead.textContent = item.lead;
    summary.textContent = item.summary;
    curve.setAttribute("d", item.curve);
    curve.style.stroke = item.stroke;

    badge.textContent = item.badgeText;
    badge.className = item.badgeClass;

    pressure.textContent = item.pressure;
    control.textContent = item.control;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.p58Tab));
  });

  activate("subexp");
})();
/* =========================
   PÁGINA 59 — CONSEQUÊNCIAS
   ========================= */

(function initCap6Page59(){
  const root = document.querySelector("[data-cap6-p59]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p59-tab]"));
  const title = root.querySelector("[data-p59-title]");
  const text = root.querySelector("[data-p59-text]");
  const summary = root.querySelector("[data-p59-summary]");

  const label1 = root.querySelector("[data-p59-label-1]");
  const label2 = root.querySelector("[data-p59-label-2]");
  const label3 = root.querySelector("[data-p59-label-3]");

  const value1 = root.querySelector("[data-p59-value-1]");
  const value2 = root.querySelector("[data-p59-value-2]");
  const value3 = root.querySelector("[data-p59-value-3]");

  if(!tabs.length || !title || !text || !summary || !label1 || !label2 || !label3 || !value1 || !value2 || !value3) return;

  const map = {
    organico: {
      title: "Impacto orgânico",
      text: "A exposição simultânea a múltiplos antibacterianos pode ampliar toxicidade sistêmica e interações medicamentosas, especialmente quando há sobreposição de vias de eliminação ou de perfis de evento adverso.",
      summary: "O risco não depende apenas do número de fármacos prescritos, mas da forma como seus perfis farmacológicos e tóxicos se sobrepõem no mesmo paciente.",
      flow: {
        l1: "Exposição",
        v1: "Somar fármacos",
        l2: "Amplificação",
        v2: "Sobrepor toxicidade",
        l3: "Consequência",
        v3: "Maior risco clínico"
      }
    },
    microbiota: {
      title: "Impacto na microbiota",
      text: "A exposição combinada reduz a diversidade da microbiota comensal e favorece a expansão de microrganismos oportunistas, incluindo patógenos como Clostridioides difficile.",
      summary: "A soma de agentes antibacterianos tende a prolongar e intensificar a disrupção ecológica intestinal, com perda de proteção contra colonização por oportunistas.",
      flow: {
        l1: "Exposição",
        v1: "Ampliar espectro",
        l2: "Desequilíbrio",
        v2: "Reduzir diversidade",
        l3: "Consequência",
        v3: "Disbiose e oportunistas"
      }
    },
    hospitalar: {
      title: "Impacto hospitalar",
      text: "A utilização frequente de múltiplos antibacterianos contribui para a seleção e disseminação de microrganismos multirresistentes em ambientes hospitalares.",
      summary: "A pressão seletiva repetida sobre a comunidade bacteriana do hospital favorece a persistência de cepas adaptadas e reduz progressivamente as opções terapêuticas disponíveis.",
      flow: {
        l1: "Exposição",
        v1: "Pressão repetida",
        l2: "Seleção",
        v2: "Favorecer resistentes",
        l3: "Consequência",
        v3: "Disseminação hospitalar"
      }
    }
  };

  function activate(key){
    const item = map[key];
    if(!item) return;

    tabs.forEach(tab => {
      tab.setAttribute("aria-selected", tab.dataset.p59Tab === key ? "true" : "false");
    });

    title.textContent = item.title;
    text.textContent = item.text;
    summary.textContent = item.summary;

    label1.textContent = item.flow.l1;
    value1.textContent = item.flow.v1;

    label2.textContent = item.flow.l2;
    value2.textContent = item.flow.v2;

    label3.textContent = item.flow.l3;
    value3.textContent = item.flow.v3;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.p59Tab));
  });

  activate("organico");
})();
/* =========================
   PÁGINA 60 — QUANDO NÃO ASSOCIAR
   ========================= */

(function initCap6Page60(){
  const root = document.querySelector("[data-cap6-p60]");
  if(!root) return;

  const cards = Array.from(root.querySelectorAll("[data-item]"));
  const result = root.querySelector("[data-result]");

  if(!cards.length || !result) return;

  const state = {
    sensivel: false,
    mono: false,
    poli: false,
    evolucao: false
  };

  function render(){
    const { sensivel, mono, poli, evolucao } = state;

    if (sensivel && mono && !poli && evolucao){
      result.textContent = "A associação perde sustentação biológica. O agente foi identificado, há exposição adequada em monoterapia, não há evidência plausível de infecção polimicrobiana e a evolução é favorável: o cenário aponta para revisão crítica e descalonamento.";
      return;
    }

    if (sensivel && mono && !poli){
      result.textContent = "A monoterapia já parece tecnicamente suficiente. Na ausência de infecção polimicrobiana plausível, manter dois antibacterianos tende a ampliar toxicidade e pressão seletiva sem benefício proporcional.";
      return;
    }

    if (poli){
      result.textContent = "Há justificativa potencial para manter cobertura ampliada, mas ela deve ser continuamente reavaliada. A presença de plausibilidade polimicrobiana impede descalonamento automático, porém não dispensa revisão microbiológica e clínica.";
      return;
    }

    if (evolucao && !poli){
      result.textContent = "A melhora clínica favorece reavaliação da combinação inicial. Quando o quadro evolui bem e não há evidência de etiologia polimicrobiana, o risco de exposição prolongada pode superar o benefício de manter a associação.";
      return;
    }

    if (sensivel || mono || evolucao){
      result.textContent = "Há elementos que enfraquecem a necessidade de manter associação, mas a decisão depende da integração entre microbiologia, exposição farmacológica, plausibilidade etiológica e evolução clínica.";
      return;
    }

    result.textContent = "Selecione os critérios presentes no caso para avaliar se a associação ainda possui justificativa biológica.";
  }

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.item;
      state[key] = !state[key];
      card.classList.toggle("is-active", state[key]);
      card.setAttribute("aria-pressed", state[key] ? "true" : "false");
      render();
    });
  });

  render();
})();
/* =========================
   PÁGINA 61 — QUIZ DE REVISÃO
   ========================= */

(function initCap6Page61Quiz(){
  const root = document.querySelector("[data-cap6-p61]");
  if(!root) return;

  const questions = Array.from(root.querySelectorAll(".cap6-p61Question"));
  const status = root.querySelector("[data-p61-status]");
  const statusValue = status ? status.querySelector(".cap6-p61Status__value") : null;
  const completion = root.querySelector("[data-p61-completion]");

  if(!questions.length || !statusValue) return;

  function updateStatus(){
    const confirmed = questions.filter(q => q.dataset.questionState === "done").length;
    statusValue.textContent = `${confirmed} de ${questions.length} situações confirmadas`;

    if(completion){
      completion.hidden = confirmed !== questions.length;
    }
  }

  function renderFeedback(container, type, title, text){
    container.innerHTML = `
      <div class="cap6-p61FeedbackCard cap6-p61FeedbackCard--${type}">
        <p class="cap6-p61FeedbackTitle">${title}</p>
        <p class="cap6-p61FeedbackText">${text}</p>
      </div>
    `;
  }

  questions.forEach(question => {
    const options = Array.from(question.querySelectorAll(".cap6-p61Options button"));
    const confirmBtn = question.querySelector('[data-p61-action="confirm"]');
    const resetBtn = question.querySelector('[data-p61-action="reset"]');
    const feedback = question.querySelector(".cap6-p61Feedback");
    const feedbackMapEl = question.querySelector(".cap6-p61FeedbackMap");

    if(!confirmBtn || !resetBtn || !feedback || !feedbackMapEl) return;

    let selected = null;
    let locked = false;
    let feedbackMap = {};

    try{
      feedbackMap = JSON.parse(feedbackMapEl.innerHTML.trim());
    }catch(e){
      feedbackMap = {};
    }

    function clearState(){
      selected = null;
      locked = false;
      question.dataset.questionState = "pending";
      confirmBtn.disabled = true;
      resetBtn.hidden = true;
      feedback.innerHTML = "";

      options.forEach(option => {
        option.classList.remove("is-selected", "is-correct", "is-wrong");
        option.disabled = false;
      });

      updateStatus();
    }

    options.forEach(option => {
      option.addEventListener("click", () => {
        if(locked) return;

        selected = option.dataset.answer;
        confirmBtn.disabled = false;

        options.forEach(btn => btn.classList.remove("is-selected"));
        option.classList.add("is-selected");
      });
    });

    confirmBtn.addEventListener("click", () => {
      if(!selected || locked) return;

      locked = true;
      question.dataset.questionState = "done";
      resetBtn.hidden = false;
      confirmBtn.disabled = true;

      const chosen = options.find(option => option.dataset.answer === selected);
      const correct = options.find(option => option.hasAttribute("data-correct"));

      options.forEach(option => {
        option.disabled = true;
      });

      if(chosen){
        chosen.classList.add(chosen.hasAttribute("data-correct") ? "is-correct" : "is-wrong");
      }

      if(correct && correct !== chosen){
        correct.classList.add("is-correct");
      }

      const entry = feedbackMap[selected];
      if(entry){
        renderFeedback(feedback, entry.type, entry.title, entry.text);
      }

      updateStatus();
    });

    resetBtn.addEventListener("click", clearState);

    clearState();
  });

  updateStatus();
})();