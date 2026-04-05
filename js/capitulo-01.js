/* =====================================================
   CAPÍTULO 01 — JS LIMPO
   Páginas estabilizadas: 1 e 2
   ===================================================== */

/* =========================
   LIGHTBOX ÚNICO
   ========================= */

(function initCap1Lightbox(){
  const lightbox = document.getElementById("cap1Lightbox");
  const img = document.getElementById("cap1LightboxImage");
  const caption = document.getElementById("cap1LightboxCaption");

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
    const trigger = e.target.closest(".cap1-zoomTrigger");
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
   PÁGINA 1 — AMR (CENÁRIOS CLÍNICOS)
   ========================= */

(function initPage1AMR(){

  const petri = document.getElementById("petri");
  const choices = document.querySelectorAll(".amr-choice");
  const feedback = document.getElementById("amrFeedback");

  if(!petri || !choices.length || !feedback) return;

  function spawn(type){

    petri.innerHTML = "";

    for(let i = 0; i < 70; i++){

      const dot = document.createElement("div");
      dot.className = "bug";

      const isResistant = i < 10;

      dot.classList.add(isResistant ? "resistant" : "sensitive");

      if(type === "adequado"){
        if(!isResistant){
          dot.style.opacity = 0.1;
        }
      }

      if(type === "subdose"){
        if(!isResistant){
          dot.style.opacity = 0.4;
        }
      }

      if(type === "interrupcao"){
        dot.style.opacity = 1;
      }

      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;

      petri.appendChild(dot);
    }
  }

  const feedbackMap = {
  adequado: "A exposição adequada tende a produzir maior controle da carga bacteriana e menor probabilidade de persistência do foco infeccioso, embora não elimine o risco ecológico associado ao uso do antibacteriano.",
  subdose: "A exposição insuficiente combina dois problemas: reduz a eficácia clínica no controle da infecção e mantém pressão antimicrobiana em nível inadequado, favorecendo um ambiente biologicamente desfavorável.",
  interrupcao: "A interrupção precoce desfaz parte do efeito obtido, permitindo repopulação bacteriana e aumentando a chance de evolução clínica insatisfatória, especialmente quando o foco infeccioso ainda não foi controlado."
};

  choices.forEach(btn => {
    btn.addEventListener("click", () => {

      choices.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const scenario = btn.dataset.scenario;

      spawn(scenario);
      feedback.textContent = feedbackMap[scenario];

    });
  });

  spawn("adequado");

})();
/* =========================
   PÁGINA 2 — TIMELINE FINAL
   ========================= */

(function initPage2Timeline(){

  const content = document.getElementById("timelineContent");
  const buttons = document.querySelectorAll(".timeline-item");

  if(!content || !buttons.length) return;

  const data = {

    "1928": {
      title: "1928 — Descoberta da Penicilina",
      img: "../../assets/capitulo-01/imagens/Era Fleming.png",
      caption: "Imagem referente à descoberta da penicilina.",
      text: "Em 1928, Alexander Fleming observou que substâncias produzidas por fungos do gênero Penicillium eram capazes de inibir o crescimento bacteriano em condições experimentais."
    },

    "1935": {
      title: "1935 — Introdução das Sulfonamidas",
      img: "../../assets/capitulo-01/imagens/1935.png",
      caption: "Uso inicial de antimicrobianos sistêmicos.",
      text: "A introdução das sulfonamidas representou um dos primeiros usos sistemáticos de agentes antimicrobianos na prática médica."
    },

    "1940": {
      title: "1940–1943 — Produção da penicilina",
      img: "../../assets/capitulo-01/imagens/1940.png",
      caption: "Expansão da produção da penicilina.",
      text: "A produção em larga escala permitiu a aplicação clínica sistemática da penicilina."
    },

    "1943": {
      title: "1943–1960 — Idade de ouro dos antibióticos",
      img: "../../assets/capitulo-01/imagens/1943.png",
      caption: "Expansão das classes antibacterianas.",
      text: "Diversas classes foram descobertas, ampliando significativamente as possibilidades terapêuticas."
    },

    "1961": {
      title: "1961 — MRSA",
      img: "../../assets/capitulo-01/imagens/1961.png",
      caption: "Emergência da resistência bacteriana.",
      text: "A resistência à meticilina evidenciou a capacidade adaptativa das bactérias."
    },

    "1988": {
      title: "1988 — VRE",
      img: "../../assets/capitulo-01/imagens/1988.png",
      caption: "Resistência à vancomicina.",
      text: "Mostrou que antibacterianos de última linha também podem perder eficácia."
    },

    "2018": {
      title: "2018 — Padronização BrCAST",
      img: "../../assets/capitulo-01/imagens/2018.png",
      caption: "Padronização dos testes.",
      text: "Integra microbiologia, PK/PD e evidência clínica."
    }

  };

 function render(key){
  const item = data[key];

  content.innerHTML = `
    <h2 class="timeline-title">${item.title}</h2>

    <div class="timeline-block">
      
      <figure class="timeline-figure">
        <img src="${item.img}" alt="">
        <figcaption class="timeline-caption">
          ${item.caption || ""}
        </figcaption>
      </figure>

      <p class="timeline-text">${item.text}</p>

    </div>
  `;
}

  buttons.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      buttons.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.year);
    });
  });

  render("1928");

})();
/* =========================
   PÁGINA 3 — ÁRVORE CONCEITUAL
   ========================= */

(function initPage3Tree(){
  const buttons = document.querySelectorAll("[data-tree-target]");
  const panes = document.querySelectorAll("[data-tree-pane]");

  if(!buttons.length || !panes.length) return;

  function activate(key){
    buttons.forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.treeTarget === key);
    });

    panes.forEach(pane => {
      if(pane.dataset.treePane === key){
        pane.hidden = false;
      }else{
        pane.hidden = true;
      }
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => activate(btn.dataset.treeTarget));
  });

  activate("antimicrobianos");
})();
/* =========================
   PÁGINA 5 — JANELA TERAPÊUTICA
   ========================= */

(function initPage5Window(){
  const root = document.querySelector("[data-cap1-window]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-window-tab]"));
  const scenes = Array.from(root.querySelectorAll("[data-window-scene]"));
  const feedback = root.querySelector("[data-window-feedback]");
  const state = root.querySelector("[data-window-state]");
  const text = root.querySelector("[data-window-text]");

  if(!tabs.length || !scenes.length || !feedback || !state || !text) return;

  const map = {
    low: {
      title: "Baixa exposição",
      text: "Neste cenário, a concentração permanece abaixo da faixa terapêutica por tempo relevante, o que pode comprometer o controle da infecção e favorecer a persistência do microrganismo.",
      klass: "cap1-p05-feedback cap1-p05-feedback--low"
    },
    ok: {
      title: "Exposição terapêutica",
      text: "Neste cenário, a concentração do antibacteriano ultrapassa o nível mínimo necessário para efeito terapêutico e permanece abaixo do limiar em que a toxicidade se torna mais provável.",
      klass: "cap1-p05-feedback cap1-p05-feedback--ok"
    },
    high: {
      title: "Exposição excessiva",
      text: "Neste cenário, a concentração alcança níveis acima do limiar de toxicidade, aumentando a probabilidade de efeitos adversos sem necessariamente oferecer benefício proporcional.",
      klass: "cap1-p05-feedback cap1-p05-feedback--high"
    }
  };

  function activate(key){
    tabs.forEach(tab => {
      tab.setAttribute("aria-selected", tab.dataset.windowTab === key ? "true" : "false");
    });

    scenes.forEach(scene => {
      scene.hidden = scene.dataset.windowScene !== key;
    });

    const item = map[key];
    state.textContent = item.title;
    text.textContent = item.text;
    feedback.className = item.klass;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.windowTab));
  });

  activate("ok");
})();
/* =========================
   PÁGINA 6 — ESPECTRO DE AÇÃO
   ========================= */

(function initPage6Spectrum(){
  const root = document.querySelector("[data-cap1-spectrum]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-spectrum-tab]"));
  const fills = {
    gp: root.querySelector('[data-spectrum-fill="gp"]'),
    gn: root.querySelector('[data-spectrum-fill="gn"]'),
    ana: root.querySelector('[data-spectrum-fill="ana"]'),
    impact: root.querySelector('[data-spectrum-fill="impact"]')
  };
  const feedback = root.querySelector("[data-spectrum-feedback]");
  const title = root.querySelector("[data-spectrum-title]");
  const text = root.querySelector("[data-spectrum-text]");

  if(!tabs.length || !fills.gp || !fills.gn || !fills.ana || !fills.impact || !feedback || !title || !text) return;

  const map = {
    restrito: {
      widths: { gp: "55%", gn: "20%", ana: "10%", impact: "28%" },
      title: "Espectro restrito",
      text: "Atua sobre grupos bacterianos mais específicos, com menor impacto ecológico quando comparado a agentes mais amplos.",
      klass: "cap1-p06-feedback cap1-p06-feedback--restrito"
    },
    ampliado: {
      widths: { gp: "82%", gn: "58%", ana: "36%", impact: "58%" },
      title: "Espectro ampliado",
      text: "Amplia a cobertura inicial quando o agente etiológico ainda não foi definido, alcançando bactérias Gram-positivas e parte das Gram-negativas.",
      klass: "cap1-p06-feedback cap1-p06-feedback--ampliado"
    },
    "muito-amplo": {
      widths: { gp: "94%", gn: "90%", ana: "80%", impact: "88%" },
      title: "Espectro muito amplo",
      text: "Cobre múltiplos grupos bacterianos, mas tende a produzir maior impacto ecológico sobre a microbiota e maior pressão seletiva.",
      klass: "cap1-p06-feedback cap1-p06-feedback--muito-amplo"
    }
  };

  function activate(key){
    const item = map[key];
    if(!item) return;

    tabs.forEach(tab => {
      const active = tab.dataset.spectrumTab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    fills.gp.style.width = item.widths.gp;
    fills.gn.style.width = item.widths.gn;
    fills.ana.style.width = item.widths.ana;
    fills.impact.style.width = item.widths.impact;

    title.textContent = item.title;
    text.textContent = item.text;
    feedback.className = item.klass;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.spectrumTab));
  });

  activate("restrito");
})();
/* =========================
   PÁGINA 7 — COLONIZAÇÃO, CONTAMINAÇÃO E INFECÇÃO
   ========================= */

(function initPage7CCI(){
  const root = document.querySelector("[data-cap1-cci]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-cci-tab]"));
  const panes = Array.from(root.querySelectorAll("[data-cci-pane]"));

  if(!tabs.length || !panes.length) return;

  function activate(key){
    tabs.forEach(tab => {
      const active = tab.dataset.cciTab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    panes.forEach(pane => {
      pane.hidden = pane.dataset.cciPane !== key;
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.cciTab));
  });

  activate("colonizacao");
})();
/* =========================
   PÁGINA 8 — TERAPIA EMPÍRICA E DIRIGIDA
   ========================= */

(function initPage8Therapy(){
  const root = document.querySelector("[data-cap1-therapy]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-therapy-tab]"));
  const panes = Array.from(root.querySelectorAll("[data-therapy-pane]"));

  if(!tabs.length || !panes.length) return;

  function activate(key){
    tabs.forEach(tab => {
      const active = tab.dataset.therapyTab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    panes.forEach(pane => {
      pane.hidden = pane.dataset.therapyPane !== key;
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.therapyTab));
  });

  activate("manter");
})();
/* =========================
   PÁGINA 9 — PROFILAXIA ANTIBACTERIANA
   ========================= */

(function initPage9Profilaxia(){
  const root = document.querySelector("[data-cap1-profilaxia]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-profilaxia-tab]"));
  const panes = Array.from(root.querySelectorAll("[data-profilaxia-pane]"));

  if(!tabs.length || !panes.length) return;

  function activate(key){
    tabs.forEach(tab => {
      const active = tab.dataset.profilaxiaTab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    panes.forEach(pane => {
      pane.hidden = pane.dataset.profilaxiaPane !== key;
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.profilaxiaTab));
  });

  activate("indicacao");
})();
document.querySelectorAll(".cap1-p10Options button").forEach(btn=>{
  btn.addEventListener("click", function(){
    const group = this.closest(".cap1-p10Options");
    group.querySelectorAll("button").forEach(b=>{
      b.classList.remove("selected");
    });

    this.classList.add("selected");

    const confirmBtn = this.closest(".cap1-p10Question")
      .querySelector('[data-p10-action="confirm"]');

    confirmBtn.disabled = false;
  });
});
/* =========================
   PÁGINA 10 — QUIZ DE REVISÃO
   ========================= */

(function initPage10Quiz(){
  const root = document.querySelector("[data-cap1-p10]");
  if(!root) return;

  const questions = Array.from(root.querySelectorAll(".cap1-p10Question"));
  const done = root.querySelector(".cap1-p10Done");
  const progress = root.querySelector(".cap1-p10Progress");
  const prevBtn = root.querySelector('[data-p10-action="prev"]');
  const nextBtn = root.querySelector('[data-p10-action="next"]');

  if(!questions.length || !progress || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function updateNav(){
    progress.textContent = `Questão ${currentIndex + 1} de ${questions.length}`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === questions.length - 1;
  }

  function showQuestion(index){
    questions.forEach((q, i) => {
      q.classList.toggle("active", i === index);
      q.hidden = i !== index;
    });

    if(done) done.hidden = true;
    currentIndex = index;
    updateNav();
  }

  function showDone(){
    questions.forEach(q => {
      q.classList.remove("active");
      q.hidden = true;
    });

    if(done) done.hidden = false;
    progress.textContent = "Quiz concluído";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }

  questions.forEach((question, qIndex) => {
    const optionButtons = Array.from(question.querySelectorAll(".cap1-p10Options button"));
    const confirmBtn = question.querySelector('[data-p10-action="confirm"]');
    const resetBtn = question.querySelector('[data-p10-action="reset"]');
    const feedbackBox = question.querySelector(".cap1-p10Feedback");
    const feedbackTemplate = question.querySelector(".cap1-p10FeedbackMap");

    if(!confirmBtn || !resetBtn || !feedbackBox || !feedbackTemplate) return;

    let selectedAnswer = null;
    let confirmed = false;

    let feedbackMap = {};
    try{
      feedbackMap = JSON.parse(feedbackTemplate.innerHTML.trim());
    }catch(err){
      console.error("Erro ao ler feedback do quiz:", err);
    }

    optionButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        if(confirmed) return;

        optionButtons.forEach(b => {
          b.classList.remove("selected");
        });

        btn.classList.add("selected");
        selectedAnswer = btn.dataset.answer || null;
        confirmBtn.disabled = !selectedAnswer;
      });
    });

    confirmBtn.addEventListener("click", () => {
      if(!selectedAnswer || confirmed) return;

      confirmed = true;

      const chosen = question.querySelector(`.cap1-p10Options button[data-answer="${selectedAnswer}"]`);
      const correct = question.querySelector('.cap1-p10Options button[data-correct="true"]');
      const item = feedbackMap[selectedAnswer];

      optionButtons.forEach(b => b.disabled = true);

      if(chosen){
        if(chosen.dataset.correct === "true"){
          chosen.classList.add("correct");
          feedbackBox.className = "cap1-p10Feedback correct";
        }else{
          chosen.classList.add("error");
          if(correct) correct.classList.add("correct");
          feedbackBox.className = "cap1-p10Feedback error";
        }
      }

      if(item){
        feedbackBox.innerHTML = `
          <p><strong>${item.title}</strong></p>
          <p>${item.text}</p>
        `;
      }

      confirmBtn.hidden = true;
      resetBtn.hidden = false;

      if(qIndex === questions.length - 1){
        nextBtn.disabled = false;
      }
    });

    resetBtn.addEventListener("click", () => {
      confirmed = false;
      selectedAnswer = null;

      optionButtons.forEach(b => {
        b.disabled = false;
        b.classList.remove("selected", "correct", "error");
      });

      feedbackBox.innerHTML = "";
      feedbackBox.className = "cap1-p10Feedback";

      confirmBtn.hidden = false;
      confirmBtn.disabled = true;
      resetBtn.hidden = true;
    });
  });

  prevBtn.addEventListener("click", () => {
    if(currentIndex > 0){
      showQuestion(currentIndex - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if(currentIndex < questions.length - 1){
      showQuestion(currentIndex + 1);
    }else{
      showDone();
    }
  });

  showQuestion(0);
})();