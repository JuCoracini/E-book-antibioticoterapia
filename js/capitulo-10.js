/* =====================================================
   CAPÍTULO 10
   PÁGINA 82 — A DECISÃO COMO PROCESSO CONTÍNUO
   ===================================================== */

(function initPage82DecisionModel(){
  const root = document.querySelector("[data-cap10-decision]");
  if(!root) return;

  const buttons = Array.from(root.querySelectorAll(".cap10-p82-node"));
  const eyebrow = document.getElementById("cap10DecisionEyebrow");
  const title = document.getElementById("cap10DecisionTitle");
  const text = document.getElementById("cap10DecisionText");
  const impact = document.getElementById("cap10DecisionImpact");

  if(!buttons.length || !eyebrow || !title || !text || !impact) return;

  const content = {
    probabilidade: {
      eyebrow: "Elemento em foco",
      title: "Probabilidade etiológica",
      text: "A decisão inicial raramente ocorre com identificação microbiológica confirmada. Por isso, a escolha em antibioticoterapia parte de uma estimativa probabilística construída a partir da síndrome clínica, do sítio provável da infecção, do contexto de aquisição e das características do hospedeiro.",
      impact: "Quando essa estimativa é mal construída, aumenta o risco de inadequação terapêutica precoce ou de ampliação desnecessária do espectro antimicrobiano."
    },
    gravidade: {
      eyebrow: "Elemento em foco",
      title: "Gravidade clínica",
      text: "A gravidade modifica a urgência e a tolerância ao erro terapêutico. Em quadros potencialmente graves, o risco de atraso na instituição de terapia ativa pode superar o risco ecológico inicial de um espectro mais amplo.",
      impact: "Quanto maior a instabilidade clínica, menor é a margem aceitável para inadequação antimicrobiana precoce."
    },
    resistencia: {
      eyebrow: "Elemento em foco",
      title: "Mecanismos de resistência",
      text: "A presença provável ou confirmada de mecanismos específicos de resistência altera a interpretação do esquema em uso. O problema deixa de ser apenas cobertura ampla ou estreita e passa a envolver atividade real frente ao microrganismo envolvido.",
      impact: "Ignorar o mecanismo de resistência pode manter um tratamento aparentemente robusto, mas microbiologicamente inativo."
    },
    pkpd: {
      eyebrow: "Elemento em foco",
      title: "Farmacocinética e farmacodinâmica",
      text: "A escolha de um antibacteriano depende não apenas do espectro, mas também da capacidade de alcançar o sítio da infecção em concentrações eficazes, com exposição compatível com o mecanismo de ação do fármaco.",
      impact: "Cobertura microbiológica sem exposição farmacológica adequada não garante resposta clínica satisfatória."
    },
    impacto: {
      eyebrow: "Elemento em foco",
      title: "Impacto individual e coletivo",
      text: "Toda decisão em antibioticoterapia produz consequências para o paciente individual e para o ecossistema microbiológico ao seu redor. Eventos adversos, disbiose e pressão seletiva fazem parte da análise de risco.",
      impact: "A prática racional exige tratar a infecção com proporcionalidade, evitando que a estratégia empírica provisória se transforme em exposição desnecessária persistente."
    }
  };

  function activate(key){
    const item = content[key];
    if(!item) return;

    buttons.forEach((button) => {
      const active = button.dataset.decisionKey === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
    impact.textContent = item.impact;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activate(button.dataset.decisionKey);
    });
  });

  activate("probabilidade");
})();
/* =====================================================
   CAPÍTULO 10
   PÁGINA 83 — SIMULAÇÃO 1
   ===================================================== */

(function initPage83Simulation(){
  const root = document.querySelector("[data-cap10-p83]");
  if(!root) return;

  const steps = Array.from(root.querySelectorAll(".cap10-p83-step"));
  const feedback = document.getElementById("cap10P83Feedback");
  const feedbackFinal = document.getElementById("cap10P83FeedbackFinal");

  if(!steps.length || !feedback || !feedbackFinal) return;

  function showStep(stepNumber){
    steps.forEach((step) => {
      const isTarget = step.dataset.p83Step === String(stepNumber);
      step.classList.toggle("is-active", isTarget);
      step.hidden = !isTarget;
    });
  }

  function setFirstFeedback(choice){
    const map = {
      manter: "Essa estratégia pode aumentar o risco de inadequação terapêutica precoce em um quadro potencialmente grave.",
      ampliar: "Essa estratégia reduz o risco de cobertura insuficiente inicial, mas amplia a exposição desnecessária e a pressão seletiva.",
      reavaliar: "Essa estratégia valoriza a estimativa de risco, mas exige cuidado para não atrasar uma resposta em um cenário de maior gravidade."
    };

    feedback.textContent = map[choice] || "";
  }

  function setSecondFeedback(choice){
    const map = {
      manter2: "Manter automaticamente a estratégia inicial ignora informações novas que devem redefinir a interpretação do caso.",
      ajustar: "A integração dos dados microbiológicos permite substituir uma decisão apenas probabilística por uma estratégia mais precisa.",
      ampliar2: "Ampliar o espectro sem direcionamento específico não substitui adequação terapêutica e pode intensificar riscos sem benefício proporcional."
    };

    feedbackFinal.textContent = map[choice] || "";
  }

  root.addEventListener("click", (event) => {
    const option = event.target.closest(".cap10-p83-option");
    const next = event.target.closest(".cap10-p83-next");

    if(option){
      const choice = option.dataset.p83Choice;

      if(choice === "manter" || choice === "ampliar" || choice === "reavaliar"){
        setFirstFeedback(choice);
        showStep(2);
        return;
      }

      if(choice === "manter2" || choice === "ajustar" || choice === "ampliar2"){
        setSecondFeedback(choice);
        showStep(4);
        return;
      }
    }

    if(next){
      const target = next.dataset.p83Next;
      if(target){
        showStep(target);
      }
    }
  });

  showStep(1);
})();
/* =====================================================
   CAPÍTULO 10
   PÁGINA 84 — SIMULAÇÃO 1 (REAVALIAR E AJUSTAR)
   ===================================================== */

(function initPage84Simulation(){
  const root = document.querySelector("[data-cap10-p84]");
  if(!root) return;

  const steps = Array.from(root.querySelectorAll(".cap10-p84-step"));
  const feedback = document.getElementById("cap10P84Feedback");
  const feedbackFinal = document.getElementById("cap10P84FeedbackFinal");

  if(!steps.length || !feedback || !feedbackFinal) return;

  function showStep(stepNumber){
    steps.forEach((step) => {
      const isTarget = step.dataset.p84Step === String(stepNumber);
      step.classList.toggle("is-active", isTarget);
      step.hidden = !isTarget;
    });
  }

  function setFirstFeedback(choice){
    const map = {
      manter: "Manter automaticamente a estratégia inicial ignora a entrada de novos dados que devem redefinir a interpretação do caso.",
      ajustar: "A incorporação da identificação microbiológica e do perfil de resistência permite substituir uma decisão apenas probabilística por uma estratégia mais precisa.",
      ampliar: "Ampliar ainda mais o espectro, sem direcionamento microbiológico, não garante adequação e pode intensificar riscos sem benefício proporcional."
    };

    feedback.textContent = map[choice] || "";
  }

  function setSecondFeedback(choice){
    const map = {
      "permanecer-amplo": "A manutenção automática do espectro mais amplo disponível não representa, por si só, melhor adequação terapêutica.",
      "reavaliar-espectro": "A proporcionalidade do espectro deve ser reavaliada à luz da suscetibilidade identificada, da evolução clínica e do risco microbiológico real.",
      associar: "A associação indiscriminada de agentes não substitui coerência entre microrganismo identificado, resistência e estratégia terapêutica."
    };

    feedbackFinal.textContent = map[choice] || "";
  }

  root.addEventListener("click", (event) => {
    const option = event.target.closest(".cap10-p84-option");
    const next = event.target.closest(".cap10-p84-next");

    if(option){
      const choice = option.dataset.p84Choice;

      if(choice === "manter" || choice === "ajustar" || choice === "ampliar"){
        setFirstFeedback(choice);
        showStep(2);
        return;
      }

      if(choice === "permanecer-amplo" || choice === "reavaliar-espectro" || choice === "associar"){
        setSecondFeedback(choice);
        showStep(4);
        return;
      }
    }

    if(next){
      const target = next.dataset.p84Next;
      if(target){
        showStep(target);
      }
    }
  });

  showStep(1);
})();
/* =====================================================
   CAPÍTULO 10
   PÁGINA 85 — SIMULAÇÃO 2 (COBRIR, REAVALIAR E SIMPLIFICAR)
   ===================================================== */

(function initPage85Simulation(){
  const root = document.querySelector("[data-cap10-p85]");
  if(!root) return;

  const steps = Array.from(root.querySelectorAll(".cap10-p85-step"));
  const feedback = document.getElementById("cap10P85Feedback");
  const feedbackFinal = document.getElementById("cap10P85FeedbackFinal");

  if(!steps.length || !feedback || !feedbackFinal) return;

  function showStep(stepNumber){
    steps.forEach((step) => {
      const isTarget = step.dataset.p85Step === String(stepNumber);
      step.classList.toggle("is-active", isTarget);
      step.hidden = !isTarget;
    });
  }

  function setFirstFeedback(choice){
    const map = {
      "manter-associacao": "A manutenção automática da estratégia inicial ignora a mudança do cenário microbiológico e a necessidade de reavaliar proporcionalidade.",
      simplificar: "A reavaliação da necessidade de simplificar a estratégia reconhece que cobertura empírica inicial e manutenção prolongada não obedecem à mesma lógica.",
      "ampliar-precaucao": "Ampliar ainda mais a cobertura, sem novo fundamento microbiológico, aumenta exposição e pressão seletiva sem benefício proporcional demonstrado."
    };

    feedback.textContent = map[choice] || "";
  }

  function setSecondFeedback(choice){
    const map = {
      "cobertura-eterna": "Gravidade inicial não justifica, por si só, manutenção automática de estratégias mais amplas quando os dados posteriores reduzem a incerteza.",
      "ajuste-proporcional": "Quando o risco microbiológico real diminui e a toxicidade potencial cresce, a estratégia deve ser reinterpretada em termos de precisão e proporcionalidade.",
      "duplicar-seguranca": "A associação prolongada sem benefício microbiológico adicional transforma uma medida inicial de cobertura em potencial fonte de dano."
    };

    feedbackFinal.textContent = map[choice] || "";
  }

  root.addEventListener("click", (event) => {
    const option = event.target.closest(".cap10-p85-option");
    const next = event.target.closest(".cap10-p85-next");

    if(option){
      const choice = option.dataset.p85Choice;

      if(choice === "manter-associacao" || choice === "simplificar" || choice === "ampliar-precaucao"){
        setFirstFeedback(choice);
        showStep(2);
        return;
      }

      if(choice === "cobertura-eterna" || choice === "ajuste-proporcional" || choice === "duplicar-seguranca"){
        setSecondFeedback(choice);
        showStep(4);
        return;
      }
    }

    if(next){
      const target = next.dataset.p85Next;
      if(target){
        showStep(target);
      }
    }
  });

  showStep(1);
})();
/* =====================================================
   CAPÍTULO 10
   PÁGINA 86 — SIMULAÇÃO 3 (TRATAR INFECÇÃO, NÃO COLONIZAÇÃO)
   ===================================================== */

(function initPage86Simulation(){
  const root = document.querySelector("[data-cap10-p86]");
  if(!root) return;

  const steps = Array.from(root.querySelectorAll(".cap10-p86-step"));
  const feedback = document.getElementById("cap10P86Feedback");
  const feedbackFinal = document.getElementById("cap10P86FeedbackFinal");

  if(!steps.length || !feedback || !feedbackFinal) return;

  function showStep(stepNumber){
    steps.forEach((step) => {
      const isTarget = step.dataset.p86Step === String(stepNumber);
      step.classList.toggle("is-active", isTarget);
      step.hidden = !isTarget;
    });
  }

  function setFirstFeedback(choice){
    const map = {
      tratar: "O crescimento bacteriano isolado pode induzir tratamento desnecessário quando não há síndrome clínica compatível com infecção ativa.",
      repetir: "Repetir a cultura raramente modifica a interpretação quando o quadro clínico continua incompatível com infecção urinária.",
      avaliar: "A decisão racional exige analisar se o achado microbiológico realmente corresponde a doença infecciosa, e não apenas à presença de microrganismos."
    };

    feedback.textContent = map[choice] || "";
  }

  function setSecondFeedback(choice){
    const map = {
      laboratorio: "O número de colônias, isoladamente, não distingue colonização de infecção ativa.",
      sindrome: "A interpretação correta integra o resultado microbiológico à presença de sintomas e sinais compatíveis com síndrome infecciosa.",
      idade: "Idade avançada, por si só, não transforma colonização assintomática em indicação de antibacteriano."
    };

    feedbackFinal.textContent = map[choice] || "";
  }

  root.addEventListener("click", (event) => {
    const option = event.target.closest(".cap10-p86-option");
    const next = event.target.closest(".cap10-p86-next");

    if(option){
      const choice = option.dataset.p86Choice;

      if(choice === "tratar" || choice === "repetir" || choice === "avaliar"){
        setFirstFeedback(choice);
        showStep(2);
        return;
      }

      if(choice === "laboratorio" || choice === "sindrome" || choice === "idade"){
        setSecondFeedback(choice);
        showStep(4);
        return;
      }
    }

    if(next){
      const target = next.dataset.p86Next;
      if(target){
        showStep(target);
      }
    }
  });

  showStep(1);
})();
/* =====================================================
   CAPÍTULO 10
   PÁGINA 87 — SIMULAÇÃO 4 (TEMPO E AJUSTE RESPONSÁVEL)
   ===================================================== */

(function initPage87Simulation(){
  const root = document.querySelector("[data-cap10-p87]");
  if(!root) return;

  const steps = Array.from(root.querySelectorAll(".cap10-p87-step"));
  const feedback = document.getElementById("cap10P87Feedback");
  const feedbackFinal = document.getElementById("cap10P87FeedbackFinal");

  if(!steps.length || !feedback || !feedbackFinal) return;

  function showStep(stepNumber){
    steps.forEach((step) => {
      const isTarget = step.dataset.p87Step === String(stepNumber);
      step.classList.toggle("is-active", isTarget);
      step.hidden = !isTarget;
    });
  }

  function setFirstFeedback(choice){
    const map = {
      aguardar: "Em um hospedeiro de alto risco, aguardar confirmação microbiológica antes de agir pode aumentar a probabilidade de deterioração clínica precoce.",
      iniciar: "Em cenários de maior vulnerabilidade, a resposta inicial precisa priorizar o risco do atraso terapêutico sem perder de vista a necessidade de reavaliação posterior.",
      observar: "Postergar a decisão em um contexto de neutropenia profunda pode transformar incerteza inicial em atraso clinicamente relevante."
    };

    feedback.textContent = map[choice] || "";
  }

  function setSecondFeedback(choice){
    const map = {
      "falha-automatica": "A persistência de febre, isoladamente, não define falha terapêutica nem justifica ampliação automática do espectro.",
      "reavaliar-contexto": "A interpretação racional exige integrar persistência febril, estabilidade clínica, evolução global e novos dados microbiológicos.",
      "associar-rotina": "A associação rotineira de múltiplos agentes, sem nova indicação clara, aumenta toxicidade e pressão seletiva sem benefício proporcional demonstrado."
    };

    feedbackFinal.textContent = map[choice] || "";
  }

  root.addEventListener("click", (event) => {
    const option = event.target.closest(".cap10-p87-option");
    const next = event.target.closest(".cap10-p87-next");

    if(option){
      const choice = option.dataset.p87Choice;

      if(choice === "aguardar" || choice === "iniciar" || choice === "observar"){
        setFirstFeedback(choice);
        showStep(2);
        return;
      }

      if(choice === "falha-automatica" || choice === "reavaliar-contexto" || choice === "associar-rotina"){
        setSecondFeedback(choice);
        showStep(4);
        return;
      }
    }

    if(next){
      const target = next.dataset.p87Next;
      if(target){
        showStep(target);
      }
    }
  });

  showStep(1);
})();
/* =====================================================
   CAPÍTULO 10
   PÁGINA 88 — A DECISÃO COMO PROCESSO CONTÍNUO
   ===================================================== */

(function initPage88Synthesis(){
  const root = document.querySelector("[data-cap10-p88]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap10-p88-tab"));
  const eyebrow = document.getElementById("cap10P88Eyebrow");
  const title = document.getElementById("cap10P88Title");
  const text = document.getElementById("cap10P88Text");
  const impact = document.getElementById("cap10P88Impact");

  if(!tabs.length || !eyebrow || !title || !text || !impact) return;

  const content = {
    adequacao: {
      eyebrow: "Princípio em foco",
      title: "Adequação precoce",
      text: "Em situações de maior gravidade, a escolha inicial influencia diretamente o desfecho clínico. O atraso na instituição de terapia ativa pode permitir progressão da infecção e piora do prognóstico.",
      impact: "Iniciar corretamente, quando o risco microbiológico e clínico justifica, é parte essencial da antibioticoterapia racional."
    },
    espectro: {
      eyebrow: "Princípio em foco",
      title: "Espectro proporcional",
      text: "Ampliar o espectro pode ser justificável em certos contextos iniciais, mas a manutenção automática de estratégias mais amplas não substitui precisão diagnóstica nem adequação terapêutica.",
      impact: "A proporcionalidade do espectro depende da integração entre gravidade, probabilidade etiológica, suscetibilidade e risco ecológico."
    },
    "nao-prescrever": {
      eyebrow: "Princípio em foco",
      title: "Não prescrever também é decisão",
      text: "Quando a probabilidade de infecção bacteriana é baixa, a ausência de prescrição antimicrobiana representa uma intervenção clínica ativa, e não omissão terapêutica.",
      impact: "Evitar exposição desnecessária protege o paciente e contribui para preservar a eficácia futura dos antibacterianos."
    },
    reavaliacao: {
      eyebrow: "Princípio em foco",
      title: "Reavaliação contínua",
      text: "A decisão inicial em antibioticoterapia é sempre provisória. À medida que novos dados clínicos e microbiológicos se tornam disponíveis, a estratégia precisa ser reinterpretada.",
      impact: "A prática racional exige iniciar, observar, interpretar, ajustar e, sempre que possível, simplificar."
    }
  };

  function activate(key){
    const item = content[key];
    if(!item) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.p88Key === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
    impact.textContent = item.impact;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activate(tab.dataset.p88Key);
    });
  });

  activate("adequacao");
})();
/* =====================================================
   PÁGINA FINAL PREMIUM
   ===================================================== */

(function initFinalPage(){
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(prefersReducedMotion){
    document.querySelectorAll(".final-prose p, .final-quote-block, .final-mark").forEach((el) => {
      el.style.animation = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }
})();