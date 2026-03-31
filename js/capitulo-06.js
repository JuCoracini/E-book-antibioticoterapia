/* =====================================================
   CAPÍTULO 06 — JS
   Páginas 54 e 55
   ===================================================== */

/* =========================
   LIGHTBOX — PÁGINA 54
   ========================= */

(function initCap6Lightbox(){
  const lightbox = document.getElementById("cap6Lightbox");
  const img = document.getElementById("cap6LightboxImage");
  const caption = document.getElementById("cap6LightboxCaption");

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
    const trigger = e.target.closest(".cap6-zoomTrigger");
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
      lead: "A combinação produz resultado equivalente à soma das contribuições individuais, sem interação biológica relevante entre os agentes.",
      summary: "O efeito observado reflete apenas a atividade independente de cada fármaco. Há somação de efeito, mas não potencialização verdadeira.",
      widths: { a: "42%", b: "38%", combo: "66%" }
    },
    indiferenca: {
      title: "Indiferença",
      lead: "A associação não altera de forma significativa a resposta que já seria obtida com monoterapia adequada.",
      summary: "A presença simultânea de dois agentes ativos não modifica substancialmente a dinâmica infecciosa nem acrescenta benefício consistente ao tratamento.",
      widths: { a: "62%", b: "56%", combo: "62%" }
    },
    antagonismo: {
      title: "Antagonismo",
      lead: "A combinação reduz a eficácia global porque a ação de um agente interfere no mecanismo necessário para a atividade do outro.",
      summary: "O resultado combinado torna-se inferior ao esperado, ilustrando que associação antibacteriana não corresponde automaticamente a maior atividade clínica ou microbiológica.",
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
   PÁGINA 60 — DECISÃO
   ========================= */

(function(){
  const root = document.querySelector('[data-cap6-p60]');
  if(!root) return;

  const resultBox = root.querySelector('[data-result]');

  let state = {};

  function updateResult(){
    if(state.step1 === 'no'){
      resultBox.innerHTML = 'Não há indicação de antibacteriano → NÃO ASSOCIAR';
      return;
    }

    if(state.step1 === 'yes' && state.step2 === 'yes' && state.step3 === 'yes'){
      resultBox.innerHTML = 'Monoterapia adequada → NÃO ASSOCIAR';
      return;
    }

    if(state.step2 === 'no'){
      resultBox.innerHTML = 'Incerteza etiológica → associação empírica pode ser considerada (transitória)';
      return;
    }

    if(state.step3 === 'no'){
      resultBox.innerHTML = 'Falha de exposição → ajustar dose/intervalo/penetração (não resolver com associação)';
      return;
    }
  }

  root.querySelectorAll('.cap6-p60-decision').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const step = btn.dataset.step;
      const answer = btn.dataset.answer;

      state['step'+step] = answer;

      updateResult();
    });
  });

})();
/* =========================
   PÁGINA 60 — DECISÃO
   ========================= */

(function(){
  const root = document.querySelector('[data-cap6-p60]');
  if(!root) return;

  const resultBox = root.querySelector('[data-result]');

  let state = {};

  function updateResult(){
    if(state.step1 === 'no'){
      resultBox.innerHTML = 'Não há indicação de antibacteriano → NÃO ASSOCIAR';
      return;
    }

    if(state.step1 === 'yes' && state.step2 === 'yes' && state.step3 === 'yes'){
      resultBox.innerHTML = 'Monoterapia adequada → NÃO ASSOCIAR';
      return;
    }

    if(state.step2 === 'no'){
      resultBox.innerHTML = 'Incerteza etiológica → associação empírica pode ser considerada (transitória)';
      return;
    }

    if(state.step3 === 'no'){
      resultBox.innerHTML = 'Falha de exposição → ajustar dose/intervalo/penetração (não resolver com associação)';
      return;
    }
  }

  root.querySelectorAll('.cap6-p60-decision').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const step = btn.dataset.step;
      const answer = btn.dataset.answer;

      state['step'+step] = answer;

      updateResult();
    });
  });

})();
/* =========================
   PÁGINA 61 — QUIZ
   ========================= */

(function initCap6Page61Quiz(){
  const root = document.querySelector("[data-cap6-p61]");
  if(!root) return;

  const questions = Array.from(root.querySelectorAll(".cap6-p61Question"));
  const done = root.querySelector(".cap6-p61Done");
  const progress = root.querySelector(".cap6-p61Progress");
  const prevBtn = root.querySelector('[data-p61-action="prev"]');
  const nextBtn = root.querySelector('[data-p61-action="next"]');

  if(!questions.length || !progress || !prevBtn || !nextBtn) return;

  let current = 0;

  function updateNav(){
    progress.textContent = `Situação ${Math.min(current + 1, questions.length)} de ${questions.length}`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === questions.length - 1;
  }

  function showQuestion(index){
    questions.forEach((q, i) => {
      q.classList.toggle("active", i === index);
    });

    if(done){
      done.hidden = true;
    }

    current = index;
    updateNav();
  }

  function renderFeedback(container, type, title, text, rationaleHtml){
    container.innerHTML = `
      <div class="cap6-p61FeedbackCard cap6-p61FeedbackCard--${type}">
        <p class="cap6-p61FeedbackTitle">${title}</p>
        <p class="cap6-p61FeedbackText">${text}</p>
        ${rationaleHtml ? `<div class="cap6-p61FeedbackText" style="margin-top:10px;">${rationaleHtml}</div>` : ""}
      </div>
    `;
  }

  questions.forEach((question, qIndex) => {
    const options = Array.from(question.querySelectorAll(".cap6-p61Options button"));
    const confirmBtn = question.querySelector('[data-p61-action="confirm"]');
    const resetBtn = question.querySelector('[data-p61-action="reset"]');
    const feedback = question.querySelector(".cap6-p61Feedback");
    const feedbackMapEl = question.querySelector(".cap6-p61FeedbackMap");
    const rationaleEl = question.querySelector(".cap6-p61Rationale");

    if(!confirmBtn || !resetBtn || !feedback || !feedbackMapEl || !rationaleEl) return;

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
      confirmBtn.disabled = true;
      resetBtn.hidden = true;
      feedback.innerHTML = "";

      options.forEach(option => {
        option.classList.remove("is-selected", "is-correct", "is-wrong");
        option.disabled = false;
      });
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
      confirmBtn.disabled = true;
      resetBtn.hidden = false;

      const correctOption = question.querySelector('[data-correct="true"]');
      const selectedOption = question.querySelector(`[data-answer="${selected}"]`);
      const isCorrect = selectedOption && selectedOption.dataset.correct === "true";

      options.forEach(option => {
        option.disabled = true;
        if(option.dataset.correct === "true"){
          option.classList.add("is-correct");
        }
      });

      if(selectedOption && !isCorrect){
        selectedOption.classList.add("is-wrong");
      }

      const item = feedbackMap[selected] || {
        type: isCorrect ? "correct" : "error",
        title: isCorrect ? "Resposta correta" : "Resposta incorreta",
        text: ""
      };

      renderFeedback(
        feedback,
        item.type,
        item.title,
        item.text,
        rationaleEl.innerHTML.trim()
      );

      const allAnswered = questions.every(q => {
        return q.querySelector('[data-p61-action="reset"]:not([hidden])');
      });

      if(allAnswered && qIndex === questions.length - 1 && done){
        done.hidden = false;
      }
    });

    resetBtn.addEventListener("click", clearState);

    clearState();
  });

  prevBtn.addEventListener("click", () => {
    if(current > 0){
      showQuestion(current - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if(current < questions.length - 1){
      showQuestion(current + 1);
    }
  });

  showQuestion(0);
})();