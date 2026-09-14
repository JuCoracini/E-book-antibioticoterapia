/* =========================
   PÁGINA 54 — POR QUE ASSOCIAR ANTIBACTERIANOS?
   ========================= */

(function initCap6Page54(){

  const root =
    document.querySelector(".cap6-page54");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p54]");

  if(!interaction) return;

  const answers = Array.from(
    interaction.querySelectorAll("[data-p54-answer]")
  );

  const feedback =
    interaction.querySelector("[data-p54-feedback]");

  if(!answers.length || !feedback) return;

  const content = {

    quantidade:{
      correct:false,

      title:
        "Mais antibacterianos não significam maior eficácia.",

      text:
        "A combinação não deve ser mantida apenas porque contém dois agentes. Sem um objetivo microbiológico ou clínico definido, a associação pode aumentar toxicidade, pressão seletiva e alterações da microbiota sem oferecer benefício proporcional."
    },

    objetivo:{
      correct:true,

      title:
        "Interpretação adequada.",

      text:
        "A associação deve responder a uma finalidade específica: ampliar a cobertura empírica, obter sinergismo comprovado, reduzir a seleção de resistência em situações bem estabelecidas ou tratar uma infecção polimicrobiana."
    }

  };

  answers.forEach(function(button){

    button.addEventListener("click", function(){

      const key =
        button.dataset.p54Answer;

      const selected =
        content[key];

      if(!selected) return;

      answers.forEach(function(item){

        item.classList.remove(
          "is-correct",
          "is-wrong"
        );

      });

      button.classList.add(
        selected.correct
          ? "is-correct"
          : "is-wrong"
      );

      feedback.className =
        "cap6-p54-case__feedback " +
        (
          selected.correct
            ? "is-correct"
            : "is-wrong"
        );

      feedback.innerHTML = `
        <strong>${selected.title}</strong>
        <p>${selected.text}</p>
      `;

    });

  });

  const revealItems =
    root.querySelectorAll(".cap6-p54-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

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
        threshold:0.18,
        rootMargin:"0px 0px -40px 0px"
      }

    );

  revealItems.forEach(function(item){

    observer.observe(item);

  });

})();
/* =========================
   PÁGINA 55 — INTERAÇÃO ENTRE ANTIBACTERIANOS
   ========================= */

(function initCap6Page55(){

  const root =
    document.querySelector(".cap6-page55");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p55]");

  if(!interaction) return;

  const answers = Array.from(
    interaction.querySelectorAll("[data-p55-answer]")
  );

  const feedback =
    interaction.querySelector("[data-p55-feedback]");

  if(!answers.length || !feedback) return;

  const content = {

    suficiente:{
      correct:false,

      title:
        "O resultado laboratorial não define sozinho a indicação.",

      text:
        "O sinergismo descreve uma interação observada em condições experimentais, mas não comprova automaticamente benefício clínico. A associação deve possuir indicação específica, sustentada por evidências e pelo contexto da infecção."
    },

    contexto:{
      correct:true,

      title:
        "Interpretação adequada.",

      text:
        "Os resultados de estudos in vitro ajudam a compreender o comportamento da combinação, mas devem ser integrados às evidências clínicas. A indicação depende do microrganismo, do foco infeccioso e do objetivo terapêutico."
    }

  };

  answers.forEach(function(button){

    button.addEventListener("click", function(){

      const key =
        button.dataset.p55Answer;

      const selected =
        content[key];

      if(!selected) return;

      answers.forEach(function(item){

        item.classList.remove(
          "is-correct",
          "is-wrong"
        );

      });

      button.classList.add(
        selected.correct
          ? "is-correct"
          : "is-wrong"
      );

      feedback.className =
        "cap6-p55-case__feedback " +
        (
          selected.correct
            ? "is-correct"
            : "is-wrong"
        );

      feedback.innerHTML = `
        <strong>${selected.title}</strong>
        <p>${selected.text}</p>
      `;

    });

  });

  const revealItems =
    root.querySelectorAll(".cap6-p55-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

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
        threshold:0.18,
        rootMargin:"0px 0px -40px 0px"
      }

    );

  revealItems.forEach(function(item){

    observer.observe(item);

  });

})();
/* =========================
   PÁGINA 56 — ASSOCIAÇÃO PARA AMPLIAR A COBERTURA
   ========================= */

(function initCap6Page56(){

  const root =
    document.querySelector(".cap6-page56");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p56]");

  if(!interaction) return;

  const answers = Array.from(
    interaction.querySelectorAll("[data-p56-answer]")
  );

  if(!answers.length) return;

  const content = {

    "complementar-sinergismo":{
      caseName:"complementar",
      correct:false,

      title:
        "O objetivo principal não é o sinergismo.",

      text:
        "Nesse contexto, a associação é empírica e busca cobrir grupos diferentes de microrganismos enquanto o agente etiológico permanece desconhecido. A demonstração de sinergismo não é a justificativa central."
    },

    "complementar-cobertura":{
      caseName:"complementar",
      correct:true,

      title:
        "Interpretação adequada: cobertura complementar.",

      text:
        "O cefepime amplia a cobertura contra bacilos Gram-negativos, incluindo Pseudomonas aeruginosa, enquanto a vancomicina cobre cocos Gram-positivos resistentes, incluindo MRSA. A combinação aumenta a probabilidade de atividade inicial contra o agente responsável."
    },

    "duplicacao-sim":{
      caseName:"duplicacao",
      correct:false,

      title:
        "Dois antibacterianos não significam dois espectros diferentes.",

      text:
        "Piperacilina-tazobactam e meropenem apresentam ampla sobreposição de atividade contra Gram-negativos, incluindo Pseudomonas aeruginosa, e anaeróbios. A presença de dois agentes não garante ampliação relevante da cobertura."
    },

    "duplicacao-nao":{
      caseName:"duplicacao",
      correct:true,

      title:
        "Interpretação adequada: duplicação de espectro.",

      text:
        "Quando os dois agentes cobrem vários dos mesmos grupos bacterianos, o ganho de cobertura pode ser pequeno. Na ausência de indicação específica, a associação pode aumentar toxicidade, custos e pressão seletiva sem benefício proporcional."
    }

  };

  answers.forEach(function(button){

    button.addEventListener("click", function(){

      const key =
        button.dataset.p56Answer;

      const selected =
        content[key];

      if(!selected) return;

      const currentCase =
        interaction.querySelector(
          `[data-p56-case="${selected.caseName}"]`
        );

      if(!currentCase) return;

      const caseButtons = Array.from(
        currentCase.querySelectorAll(
          "[data-p56-answer]"
        )
      );

      const feedback =
        currentCase.querySelector(
          `[data-p56-feedback="${selected.caseName}"]`
        );

      if(!feedback) return;

      caseButtons.forEach(function(item){

        item.classList.remove(
          "is-correct",
          "is-wrong"
        );

      });

      button.classList.add(
        selected.correct
          ? "is-correct"
          : "is-wrong"
      );

      feedback.className =
        "cap6-p56-case__feedback " +
        (
          selected.correct
            ? "is-correct"
            : "is-wrong"
        );

      feedback.innerHTML = `
        <strong>${selected.title}</strong>
        <p>${selected.text}</p>
      `;

    });

  });

  const revealItems =
    root.querySelectorAll(".cap6-p56-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

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
        threshold:0.18,
        rootMargin:"0px 0px -40px 0px"
      }

    );

  revealItems.forEach(function(item){

    observer.observe(item);

  });

})();
/* =========================
   PÁGINA 57 — TRATAMENTO EMPÍRICO E DESCALONAMENTO
   ========================= */

(function initCap6Page57(){

  const root =
    document.querySelector(".cap6-page57");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p57]");

  if(!interaction) return;

  const answers = Array.from(
    interaction.querySelectorAll("[data-p57-answer]")
  );

  const feedback =
    interaction.querySelector("[data-p57-feedback]");

  if(!answers.length || !feedback) return;

  const content = {

    manter:{
      correct:false,

      title:
        "A cobertura empírica deve ser reavaliada.",

      text:
        "A associação foi utilizada enquanto o agente etiológico era desconhecido. Após a identificação de um único microrganismo suscetível ao cefepime, a vancomicina perde sua justificativa microbiológica. Manter ambos aumenta a exposição sem benefício proporcional."
    },

    descalonar:{
      correct:true,

      title:
        "Interpretação adequada: descalonamento.",

      text:
        "Quando o agente etiológico e seu perfil de suscetibilidade são conhecidos, o esquema deve ser direcionado. O descalonamento consiste em retirar componentes desnecessários e manter o antibacteriano de menor espectro que permaneça eficaz."
    }

  };

  answers.forEach(function(button){

    button.addEventListener("click", function(){

      const key =
        button.dataset.p57Answer;

      const selected =
        content[key];

      if(!selected) return;

      answers.forEach(function(item){

        item.classList.remove(
          "is-correct",
          "is-wrong"
        );

      });

      button.classList.add(
        selected.correct
          ? "is-correct"
          : "is-wrong"
      );

      feedback.className =
        "cap6-p57-case__feedback " +
        (
          selected.correct
            ? "is-correct"
            : "is-wrong"
        );

      feedback.innerHTML = `
        <strong>${selected.title}</strong>
        <p>${selected.text}</p>
      `;

    });

  });

  const revealItems =
    root.querySelectorAll(".cap6-p57-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

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
        threshold:0.18,
        rootMargin:"0px 0px -40px 0px"
      }

    );

  revealItems.forEach(function(item){

    observer.observe(item);

  });

})();
/* =========================
   PÁGINA 58 — ASSOCIAÇÃO PARA PREVENIR RESISTÊNCIA
   ========================= */

(function initCap6Page58(){

  const root =
    document.querySelector(".cap6-page58");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p58]");

  if(!interaction) return;

  const answers = Array.from(
    interaction.querySelectorAll("[data-p58-case-answer]")
  );

  if(!answers.length) return;

  const content = {

    "tuberculose-sim":{
      caseName:"tuberculose",
      correct:true,

      title:
        "Interpretação adequada.",

      text:
        "Na tuberculose, diferentes fármacos são utilizados simultaneamente para reduzir a probabilidade de seleção de mutantes naturalmente resistentes durante o tratamento."
    },

    "tuberculose-nao":{
      caseName:"tuberculose",
      correct:false,

      title:
        "Reavalie a finalidade da associação.",

      text:
        "A tuberculose constitui o exemplo clássico em que a prevenção da seleção de resistência é um objetivo direto da terapia combinada."
    },

    "itu-sim":{
      caseName:"itu",
      correct:false,

      title:
        "A associação não reduz resistência automaticamente.",

      text:
        "Quando existe um único microrganismo suscetível e um antibacteriano apropriado, acrescentar outro agente geralmente amplia exposição, toxicidade e pressão seletiva sem benefício microbiológico proporcional."
    },

    "itu-nao":{
      caseName:"itu",
      correct:true,

      title:
        "Interpretação adequada.",

      text:
        "Nas infecções bacterianas comuns, a monoterapia costuma ser suficiente quando existe um agente ativo. A prevenção da resistência depende principalmente de escolha, dose, duração e controle do foco adequados."
    }

  };

  answers.forEach(function(button){

    button.addEventListener("click", function(){

      const key =
        button.dataset.p58CaseAnswer;

      const selected =
        content[key];

      if(!selected) return;

      const currentCase =
        interaction.querySelector(
          `[data-p58-case="${selected.caseName}"]`
        );

      if(!currentCase) return;

      const caseButtons = Array.from(
        currentCase.querySelectorAll(
          "[data-p58-case-answer]"
        )
      );

      const feedback =
        currentCase.querySelector(
          `[data-p58-feedback="${selected.caseName}"]`
        );

      if(!feedback) return;

      caseButtons.forEach(function(item){

        item.classList.remove(
          "is-correct",
          "is-wrong"
        );

      });

      button.classList.add(
        selected.correct
          ? "is-correct"
          : "is-wrong"
      );

      feedback.className =
        "cap6-p58-case__feedback " +
        (
          selected.correct
            ? "is-correct"
            : "is-wrong"
        );

      feedback.innerHTML = `
        <strong>${selected.title}</strong>
        <p>${selected.text}</p>
      `;

    });

  });

  const revealItems =
    root.querySelectorAll(".cap6-p58-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

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
        threshold:0.18,
        rootMargin:"0px 0px -40px 0px"
      }

    );

  revealItems.forEach(function(item){

    observer.observe(item);

  });

})();
/* =========================
   PÁGINA 59 — QUANDO A ASSOCIAÇÃO NÃO CORRIGE O PROBLEMA
   ========================= */

(function initCap6Page59(){

  const root =
    document.querySelector(".cap6-page59");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p59]");

  if(!interaction) return;

  const answers = Array.from(
    interaction.querySelectorAll("[data-p59-answer]")
  );

  const feedback =
    interaction.querySelector("[data-p59-feedback]");

  if(!answers.length || !feedback) return;

  const content = {

    ampliar:{
      correct:false,

      title:
        "A ampliação da cobertura não é a primeira explicação.",

      text:
        "O microrganismo já demonstra suscetibilidade ao antibacteriano utilizado. Antes de interpretar a ausência de resposta como necessidade de outro agente, devem ser considerados a exposição farmacológica e o controle do foco infeccioso."
    },

    reavaliar:{
      correct:true,

      title:
        "Interpretação adequada.",

      text:
        "A suscetibilidade no antibiograma é apenas um dos determinantes da resposta. Dose, intervalo, via, penetração no sítio infeccioso e controle do foco também influenciam o sucesso terapêutico. A associação não corrige essas falhas."
    }

  };

  answers.forEach(function(button){

    button.addEventListener("click", function(){

      const key =
        button.dataset.p59Answer;

      const selected =
        content[key];

      if(!selected) return;

      answers.forEach(function(item){

        item.classList.remove(
          "is-correct",
          "is-wrong"
        );

      });

      button.classList.add(
        selected.correct
          ? "is-correct"
          : "is-wrong"
      );

      feedback.className =
        "cap6-p59-case__feedback " +
        (
          selected.correct
            ? "is-correct"
            : "is-wrong"
        );

      feedback.innerHTML = `
        <strong>${selected.title}</strong>
        <p>${selected.text}</p>
      `;

    });

  });

  const revealItems =
    root.querySelectorAll(".cap6-p59-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

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
        threshold:0.18,
        rootMargin:"0px 0px -40px 0px"
      }

    );

  revealItems.forEach(function(item){

    observer.observe(item);

  });

})();
/* =========================
   PÁGINA 60 — CONSEQUÊNCIAS DO USO INDISCRIMINADO
   ========================= */

(function initCap6Page60(){

  const root =
    document.querySelector(".cap6-page60");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p60]");

  if(!interaction) return;

  const revealButton =
    interaction.querySelector("[data-p60-reveal]");

  const consequences =
    interaction.querySelector("[data-p60-consequences]");

  if(!revealButton || !consequences) return;

  function setExpanded(expanded){

    revealButton.setAttribute(
      "aria-expanded",
      expanded ? "true" : "false"
    );

    consequences.hidden = !expanded;

    revealButton.textContent =
      expanded
        ? "Ocultar consequências"
        : "Mostrar consequências";

    if(expanded){

      consequences
        .querySelectorAll(".cap6-p60-consequence")
        .forEach(function(item, index){

          item.style.opacity = "0";
          item.style.transform = "translateY(8px)";

          window.setTimeout(function(){

            item.style.transition =
              "opacity .32s ease, transform .32s ease";

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

          }, index * 85);

        });

    }

  }

  revealButton.addEventListener(
    "click",
    function(){

      const expanded =
        revealButton.getAttribute(
          "aria-expanded"
        ) === "true";

      setExpanded(!expanded);

    }
  );

  setExpanded(false);

  const revealItems =
    root.querySelectorAll(".cap6-p60-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

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
        threshold:0.18,
        rootMargin:"0px 0px -40px 0px"
      }

    );

  revealItems.forEach(function(item){

    observer.observe(item);

  });

})();
/* =========================
   PÁGINA 61 — QUIZ DE REVISÃO
   ========================= */

(function initCap6Page61Quiz() {
  "use strict";

  const root = document.querySelector("[data-cap6-p61]");

  if (!root) {
    return;
  }

  const situations = [
    {
      kicker: "Situação clínica 1",

      caseText:
        "Um paciente de 68 anos é internado com sepse de " +
        "provável origem abdominal. Após a coleta de culturas, " +
        "inicia tratamento empírico com cefepime e vancomicina. " +
        "Após 72 horas, a hemocultura identifica Escherichia " +
        "coli suscetível ao cefepime, sem crescimento de outros " +
        "microrganismos. O paciente apresenta evolução clínica " +
        "favorável.",

      prompt:
        "Qual decisão utiliza melhor as novas informações sem " +
        "comprometer a eficácia do tratamento?",

      correct: "b",

      options: [
        {
          id: "a",
          text:
            "Manter os dois antibacterianos até o final, pois " +
            "a associação inicialmente adequada deve ser " +
            "preservada durante todo o tratamento."
        },
        {
          id: "b",
          text:
            "Reavaliar a necessidade da vancomicina e direcionar " +
            "o tratamento ao agente identificado, mantendo um " +
            "antibacteriano ativo e adequado ao foco."
        },
        {
          id: "c",
          text:
            "Acrescentar outro antibacteriano contra " +
            "Gram-negativos para reduzir a possibilidade de " +
            "resistência durante o restante do tratamento."
        }
      ],

      feedback: {
        a:
          "A necessidade da cobertura empírica pode mudar após " +
          "a identificação do agente e a liberação do perfil de " +
          "suscetibilidade. Manter componentes sem indicação " +
          "amplia a exposição sem benefício proporcional.",

        b:
          "A associação ampliou a cobertura enquanto o agente " +
          "era desconhecido. Com a identificação de Escherichia " +
          "coli suscetível e evolução favorável, o esquema deve " +
          "ser reavaliado e direcionado, retirando a cobertura " +
          "que perdeu sua justificativa microbiológica.",

        c:
          "A associação não reduz automaticamente a emergência " +
          "de resistência. Acrescentar outro agente sem um " +
          "objetivo definido aumenta a exposição e a pressão " +
          "seletiva."
      }
    },

    {
      kicker: "Situação clínica 2",

      caseText:
        "Um paciente com infecção intra-abdominal recebe um " +
        "antibacteriano ativo contra o microrganismo isolado. " +
        "Apesar do resultado de suscetibilidade, mantém febre e " +
        "sinais inflamatórios. A avaliação por imagem mostra " +
        "uma coleção abdominal ainda não drenada.",

      prompt:
        "Qual conduta interpreta melhor a ausência de resposta?",

      correct: "c",

      options: [
        {
          id: "a",
          text:
            "Associar imediatamente um segundo antibacteriano, " +
            "pois a persistência da febre comprova que a " +
            "monoterapia é insuficiente."
        },
        {
          id: "b",
          text:
            "Trocar o antibacteriano por outro de maior espectro, " +
            "mesmo sem evidência de resistência ou de novo " +
            "microrganismo."
        },
        {
          id: "c",
          text:
            "Reavaliar o controle do foco e a exposição " +
            "farmacológica, pois a associação não compensa uma " +
            "coleção não drenada nem uma exposição inadequada."
        }
      ],

      feedback: {
        a:
          "A persistência da febre não demonstra, isoladamente, " +
          "a necessidade de terapia combinada. Mesmo um esquema " +
          "microbiologicamente ativo pode falhar se o foco " +
          "infeccioso permanecer sem controle.",

        b:
          "Ampliar o espectro sem investigar as causas da falha " +
          "pode aumentar a exposição desnecessária. O caso não " +
          "apresenta evidência de resistência nem de cobertura " +
          "microbiológica insuficiente.",

        c:
          "A suscetibilidade do microrganismo é apenas um dos " +
          "determinantes do sucesso. A resposta também depende " +
          "da dose, da exposição no sítio e do controle do foco, " +
          "que pode exigir drenagem, desbridamento ou remoção de " +
          "um dispositivo."
      }
    },

    {
      kicker: "Situação clínica 3",

      caseText:
        "Uma paciente de 68 anos foi internada por pneumonia " +
        "adquirida na comunidade. Após cinco dias de tratamento, " +
        "está afebril, hemodinamicamente estável e com melhora " +
        "clínica. Mesmo sem nova justificativa microbiológica ou " +
        "clínica, o meropenem é mantido por mais sete dias por " +
        "segurança.",

      prompt:
        "Qual análise considera de forma mais completa as " +
        "consequências dessa decisão?",

      correct: "b",

      options: [
        {
          id: "a",
          text:
            "A manutenção oferece proteção adicional sem riscos " +
            "relevantes, porque um antibacteriano só exerce " +
            "pressão seletiva quando o agente da infecção é " +
            "resistente."
        },
        {
          id: "b",
          text:
            "O benefício adicional pode ser pequeno, enquanto " +
            "a exposição prolongada aumenta os riscos de " +
            "toxicidade, disbiose, Clostridioides difficile e " +
            "seleção de bactérias resistentes."
        },
        {
          id: "c",
          text:
            "O principal efeito será impedir definitivamente " +
            "a recorrência da pneumonia, pois tratamentos mais " +
            "longos sempre apresentam maior eficácia."
        }
      ],

      feedback: {
        a:
          "A pressão seletiva ocorre sempre que a microbiota é " +
          "exposta ao antibacteriano. A eliminação de populações " +
          "suscetíveis pode favorecer a sobrevivência e expansão " +
          "de bactérias resistentes.",

        b:
          "Quando a manutenção não oferece benefício clínico " +
          "proporcional, a exposição continua produzindo riscos " +
          "individuais e ecológicos, incluindo toxicidade, " +
          "alteração da microbiota, Clostridioides difficile e " +
          "seleção de resistência.",

        c:
          "A duração deve ser suficiente para tratar a infecção, " +
          "mas prolongá-la sem indicação não garante maior " +
          "eficácia nem impede definitivamente a recorrência. " +
          "A necessidade de manutenção deve ser reavaliada."
      }
    }
  ];

  const progress =
    root.querySelector("[data-p61-progress]");

  const dots = Array.from(
    root.querySelectorAll(".cap6-p61Dots span")
  );

  const kicker =
    root.querySelector("[data-p61-kicker]");

  const caseText =
    root.querySelector("[data-p61-case]");

  const prompt =
    root.querySelector("[data-p61-prompt]");

  const options =
    root.querySelector("[data-p61-options]");

  const confirmButton =
    root.querySelector("[data-p61-confirm]");

  const resetButton =
    root.querySelector("[data-p61-reset]");

  const feedback =
    root.querySelector("[data-p61-feedback]");

  const previousButton =
    root.querySelector("[data-p61-prev]");

  const nextButton =
    root.querySelector("[data-p61-next]");

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

      letter.className = "cap6-p61Letter";
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
      "cap6-p61Feedback is-visible " +
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

    feedback.className = "cap6-p61Feedback";
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