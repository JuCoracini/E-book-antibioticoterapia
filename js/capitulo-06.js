/* =========================
   Capítulo 06 — Zoom
   ========================= */

(function initCap6Zoom(){

  const triggers = document.querySelectorAll(".cap6-zoomTrigger");
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap6Lightbox");
  const image = document.getElementById("cap6LightboxImage");
  const caption = document.getElementById("cap6LightboxCaption");
  const closers = document.querySelectorAll("[data-lightbox-close]");

  function open(src, alt, text){
    image.src = src;
    image.alt = alt || "";
    caption.textContent = text || "";

    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  }

  function close(){
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden","true");

    image.src = "";
    image.alt = "";
    caption.textContent = "";

    document.body.style.overflow = "";
  }

  triggers.forEach(trigger=>{
    trigger.addEventListener("click", ()=>{
      open(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
    });
  });

  closers.forEach(el=>{
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown",(e)=>{
    if(e.key === "Escape" && !lightbox.hidden){
      close();
    }
  });

})();
/* =========================
   Capítulo 06 — Página 57
   Interação farmacodinâmica
   ========================= */

(function initCap6Interaction(){

  const root = document.querySelector(".cap6-stage");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap6-tab"));
  const title = root.querySelector("[data-title]");
  const text = root.querySelector("[data-text]");
  const image = document.getElementById("cap6-img");
  const panel = root.querySelector(".cap6-panel");

  if (!tabs.length || !title || !text || !image || !panel) return;

  const data = {

    sinergismo: {
      title: "Sinergismo",
      text: "O sinergismo ocorre quando a atividade antimicrobiana observada com a combinação de dois fármacos é superior àquela obtida com cada agente isoladamente. Nesse cenário, um agente favorece ou potencializa a ação do outro.",
      img: "../../assets/capitulo-06/imagens/sinergismo.png",
      tone: "rgba(31,60,136,.05)"
    },

    aditivo: {
      title: "Aditivo / Indiferença",
      text: "A combinação pode produzir resultado equivalente à soma das atividades individuais ou não modificar de forma relevante a resposta clínica, refletindo ausência de interação biológica significativa entre os agentes.",
      img: "../../assets/capitulo-06/imagens/aditivo.png",
      tone: "rgba(120,120,120,.08)"
    },

    antagonismo: {
      title: "Antagonismo",
      text: "O antagonismo ocorre quando a ação de um antibacteriano interfere no mecanismo necessário para a atividade do outro, reduzindo a eficácia global da combinação.",
      img: "../../assets/capitulo-06/imagens/antagonismo.png",
      tone: "rgba(217,106,67,.10)"
    }

  };

  function setState(key){

    const d = data[key];
    if (!d) return;

    tabs.forEach(tab=>{
      const active = tab.dataset.tab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    title.textContent = d.title;
    text.textContent = d.text;
    image.src = d.img;
    panel.style.background = d.tone;
  }

  tabs.forEach((tab, i) => {

    tab.addEventListener("click", () => {
      setState(tab.dataset.tab);
    });

    tab.addEventListener("keydown", (e) => {

      if (e.key === "ArrowRight") {
        e.preventDefault();
        tabs[(i + 1) % tabs.length].focus();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        tabs[(i - 1 + tabs.length) % tabs.length].focus();
      }

      if (e.key === "Home") {
        e.preventDefault();
        tabs[0].focus();
      }

      if (e.key === "End") {
        e.preventDefault();
        tabs[tabs.length - 1].focus();
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setState(tab.dataset.tab);
      }

    });

  });

  setState("sinergismo");

})();
/* =========================
   Capítulo 06 — Página 56
   Zoom
   ========================= */

(function initCap6Zoom(){
  const triggers = document.querySelectorAll(".cap6-zoomTrigger");
  if (!triggers.length) return;

  const lightbox = document.getElementById("cap6Lightbox");
  const image = document.getElementById("cap6LightboxImage");
  const caption = document.getElementById("cap6LightboxCaption");
  const closers = document.querySelectorAll("[data-lightbox-close]");

  if (!lightbox || !image || !caption) return;

  function open(src, alt, text){
    image.src = src;
    image.alt = alt || "";
    caption.textContent = text || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  }

  function close(){
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden","true");
    image.src = "";
    image.alt = "";
    caption.textContent = "";
    document.body.style.overflow = "";
  }

  triggers.forEach((trigger)=>{
    trigger.addEventListener("click", ()=>{
      open(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption
      );
    });
  });

  closers.forEach((el)=>{
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && !lightbox.hidden){
      close();
    }
  });
})();

/* =========================
   Capítulo 06 — Página 57
   Interação farmacodinâmica
   ========================= */

(function initCap6Interaction(){
  const root = document.querySelector(".cap6-stage");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap6-tab"));
  const title = root.querySelector("[data-title]");
  const text = root.querySelector("[data-text]");
  const image = document.getElementById("cap6-img");
  const panel = root.querySelector(".cap6-panel");

  if (!tabs.length || !title || !text || !image || !panel) return;

  const data = {
    sinergismo: {
      title: "Sinergismo",
      text: "O sinergismo ocorre quando a atividade antimicrobiana observada com a combinação de dois fármacos é superior àquela obtida com cada agente isoladamente. Nesse cenário, um agente favorece ou potencializa a ação do outro.",
      img: "../../assets/capitulo-06/imagens/sinergismo.png",
      tone: "rgba(31,60,136,.05)"
    },
    aditivo: {
      title: "Aditivo / Indiferença",
      text: "A combinação pode produzir resultado equivalente à soma das atividades individuais ou não modificar de forma relevante a resposta clínica, refletindo ausência de interação biológica significativa entre os agentes.",
      img: "../../assets/capitulo-06/imagens/aditivo.png",
      tone: "rgba(120,120,120,.08)"
    },
    antagonismo: {
      title: "Antagonismo",
      text: "O antagonismo ocorre quando a ação de um antibacteriano interfere no mecanismo necessário para a atividade do outro, reduzindo a eficácia global da combinação.",
      img: "../../assets/capitulo-06/imagens/antagonismo.png",
      tone: "rgba(217,106,67,.10)"
    }
  };

  function setState(key){
    const d = data[key];
    if (!d) return;

    tabs.forEach((tab)=>{
      const active = tab.dataset.tab === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    title.textContent = d.title;
    text.textContent = d.text;
    image.src = d.img;
    panel.style.background = d.tone;
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      setState(tab.dataset.tab);
    });

    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        tabs[(i + 1) % tabs.length].focus();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        tabs[(i - 1 + tabs.length) % tabs.length].focus();
      }

      if (e.key === "Home") {
        e.preventDefault();
        tabs[0].focus();
      }

      if (e.key === "End") {
        e.preventDefault();
        tabs[tabs.length - 1].focus();
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setState(tab.dataset.tab);
      }
    });
  });

  setState("sinergismo");
})();
