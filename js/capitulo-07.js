/* =====================================================
   CAPÍTULO 07 — JS
   PÁGINA 65
   ===================================================== */

/* =========================
   LIGHTBOX CAPÍTULO 7
   ========================= */

(function initCap7Lightbox(){
  const lightbox = document.getElementById("cap7Lightbox");
  const img = document.getElementById("cap7LightboxImage");
  const caption = document.getElementById("cap7LightboxCaption");

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
    const trigger = e.target.closest(".cap7-zoomTrigger");
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
   PÁGINA 65 — FLUXO CLÍNICO
   ========================= */

(function initPage65Flow(){
  const root = document.querySelector("[data-cap7-p65]");
  if(!root) return;

  const steps = Array.from(root.querySelectorAll(".cap7-p65-step"));
  const panes = Array.from(root.querySelectorAll(".cap7-p65-pane"));

  function activate(step){
    steps.forEach(btn => {
      const active = btn.dataset.step === step;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    panes.forEach(pane => {
      const active = pane.dataset.pane === step;
      pane.classList.toggle("is-active", active);
      pane.hidden = !active;
    });
  }

  steps.forEach(btn => {
    btn.addEventListener("click", () => activate(btn.dataset.step));
  });

  activate("1");
})();