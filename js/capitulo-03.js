/* ==========================================
   CAPÍTULO 3 — PÁGINA 20
   Resistência como fenômeno adaptativo
   ========================================== */

(function () {
  const panel = document.querySelector("[data-p20-panel]");
  if (!panel) return;

  const tabs = Array.from(panel.querySelectorAll(".cap3-p20-tab"));
  const stages = Array.from(panel.querySelectorAll(".cap3-p20-stage"));

  const lightbox = document.getElementById("cap3Lightbox");
  const lightboxImage = document.getElementById("cap3LightboxImage");
  const lightboxCaption = document.getElementById("cap3LightboxCaption");
  const zoomTriggers = Array.from(panel.querySelectorAll(".cap3-p20-zoomTrigger"));
  const lightboxClosers = Array.from(document.querySelectorAll("[data-lightbox-close]"));

  let currentStep = 0;
  let autoTimer = null;
  let lastTrigger = null;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setStep(index) {
    currentStep = index;

    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });

    stages.forEach((stage, i) => {
      const active = i === index;
      stage.classList.toggle("is-active", active);
      stage.hidden = !active;
    });
  }

  function nextStep() {
    const next = (currentStep + 1) % tabs.length;
    setStep(next);
  }

  function startAuto() {
    if (reduceMotion) return;
    stopAuto();
    autoTimer = window.setInterval(nextStep, 4500);
  }

  function stopAuto() {
    if (autoTimer) {
      window.clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      setStep(index);
      startAuto();
    });

    tab.addEventListener("keydown", (event) => {
      let targetIndex = null;

      if (event.key === "ArrowRight") {
        targetIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        targetIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        targetIndex = 0;
      } else if (event.key === "End") {
        targetIndex = tabs.length - 1;
      }

      if (targetIndex !== null) {
        event.preventDefault();
        tabs[targetIndex].focus();
        setStep(targetIndex);
        startAuto();
      }
    });
  });

  panel.addEventListener("mouseenter", stopAuto);
  panel.addEventListener("mouseleave", startAuto);
  panel.addEventListener("focusin", stopAuto);
  panel.addEventListener("focusout", startAuto);

  function openLightbox(src, alt, caption, trigger) {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = src || "";
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lastTrigger = trigger || null;
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
    if (lastTrigger) lastTrigger.focus();
  }

  zoomTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(
        trigger.dataset.zoomImage,
        trigger.dataset.zoomAlt,
        trigger.dataset.zoomCaption,
        trigger
      );
    });
  });

  lightboxClosers.forEach((closer) => {
    closer.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  setStep(0);
  startAuto();
})();