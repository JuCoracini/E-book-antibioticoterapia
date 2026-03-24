/* =========================
   Capítulo 2 — Página 11
   Zoom da imagem
   ========================= */

(function () {
  const lightbox = document.getElementById("cap2Lightbox");
  const lightboxImage = document.getElementById("cap2LightboxImage");
  const lightboxCaption = document.getElementById("cap2LightboxCaption");
  const zoomTriggers = Array.from(document.querySelectorAll(".cap2-zoomTrigger"));
  const lightboxClosers = Array.from(document.querySelectorAll("[data-lightbox-close]"));

  if (!lightbox || !lightboxImage || !lightboxCaption || !zoomTriggers.length) return;

  let lastTrigger = null;

  function openLightbox(src, alt, caption, trigger) {
    lightboxImage.src = src || "";
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lastTrigger = trigger || null;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";

    if (lastTrigger) {
      lastTrigger.focus();
    }
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
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
/* =========================
   Página 12 — Tabela interativa leve
   ========================= */
(function initCap2Page12(){

  const page = document.querySelector(".cap2-page12");
  if(!page) return;

  const rows = page.querySelectorAll(".cap2-table tbody tr");

  rows.forEach(row => {

    row.addEventListener("click", () => {

      rows.forEach(r => r.classList.remove("is-active"));
      row.classList.add("is-active");

    });

  });

})();
/* =========================
   Página 13 — Inibição da síntese da parede celular
   ========================= */
(function initCap2Page13() {
  const page = document.querySelector(".cap2-page13");
  if (!page) return;

  const explorer = page.querySelector("[data-wall-explorer]");
  if (!explorer) return;

  const chips = Array.from(explorer.querySelectorAll(".cap2-wall-chip[role='tab']"));
  const panels = Array.from(explorer.querySelectorAll(".cap2-wall-panel[data-panel]"));
  const phaseTitle = explorer.querySelector("[data-wall-phase-title]");
  const phaseGroup = explorer.querySelector("[data-wall-group]");
  const stageImage = explorer.querySelector("[data-wall-image]");
  const stageCaption = explorer.querySelector("[data-wall-caption]");
  const zoomTrigger = explorer.querySelector("[data-wall-zoom-trigger]");
if (!chips.length || !panels.length || !stageImage || !zoomTrigger) return;

  const lightbox = document.getElementById("cap2WallLightbox");
  const lightboxImage = document.getElementById("cap2WallLightboxImage");
  const lightboxCaption = document.getElementById("cap2WallLightboxCaption");
  const lightboxDialog = lightbox ? lightbox.querySelector(".cap2-lightbox__dialog") : null;
  const lightboxClosers = lightbox
    ? Array.from(lightbox.querySelectorAll("[data-wall-lightbox-close]"))
    : [];

  let lastTrigger = null;

  function activateChip(chip, { moveFocus = false } = {}) {
    if (!chip) return;

    const target = chip.dataset.target;
    const nextTitle = chip.dataset.title || "";
    const nextGroup = chip.dataset.group || "";
    const nextImage = chip.dataset.image || "";
    const nextAlt = chip.dataset.alt || "";
    const nextCaption = chip.dataset.caption || "";

    chips.forEach((item) => {
      const isActive = item === chip;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", isActive ? "true" : "false");
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === target;
      panel.toggleAttribute("hidden", !isActive);
      panel.classList.toggle("is-active", isActive);
    });

    if (phaseTitle) phaseTitle.textContent = nextTitle;
    if (phaseGroup) phaseGroup.textContent = nextGroup;

    if (stageImage) {
      stageImage.src = nextImage;
      stageImage.alt = nextAlt;
    }

    if (stageCaption) {
      stageCaption.textContent = `${nextCaption} Clique na imagem para ampliar.`;
    }

    if (zoomTrigger) {
      zoomTrigger.setAttribute("aria-label", `Ampliar imagem: ${nextTitle}`);
      zoomTrigger.dataset.zoomImage = nextImage;
      zoomTrigger.dataset.zoomAlt = nextAlt;
      zoomTrigger.dataset.zoomCaption = nextCaption;
    }

    if (moveFocus) chip.focus();
  }

  function openLightbox() {
    if (!lightbox || !lightboxImage || !zoomTrigger) return;

    const imgSrc = zoomTrigger.dataset.zoomImage || stageImage?.src || "";
    const imgAlt = zoomTrigger.dataset.zoomAlt || stageImage?.alt || "";
    const imgCaption = zoomTrigger.dataset.zoomCaption || "";

    if (!imgSrc) return;

    lastTrigger = zoomTrigger;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    lightboxImage.src = imgSrc;
    lightboxImage.alt = imgAlt;
    if (lightboxCaption) lightboxCaption.textContent = imgCaption;
    document.body.style.overflow = "hidden";

    const firstCloser = lightboxClosers[0];
    if (firstCloser) firstCloser.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    if (lightboxCaption) lightboxCaption.textContent = "";
    document.body.style.overflow = "";

    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  chips.forEach((chip, index) => {
    chip.addEventListener("click", () => activateChip(chip));

    chip.addEventListener("keydown", (e) => {
      const key = e.key;
      let nextIndex = null;

      if (key === "ArrowRight" || key === "ArrowDown") {
        nextIndex = (index + 1) % chips.length;
      } else if (key === "ArrowLeft" || key === "ArrowUp") {
        nextIndex = (index - 1 + chips.length) % chips.length;
      } else if (key === "Home") {
        nextIndex = 0;
      } else if (key === "End") {
        nextIndex = chips.length - 1;
      } else if (key === "Enter" || key === " ") {
        e.preventDefault();
        activateChip(chip);
        return;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        activateChip(chips[nextIndex], { moveFocus: true });
      }
    });
  });

  if (zoomTrigger) {
    zoomTrigger.addEventListener("click", openLightbox);

    zoomTrigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox();
      }
    });
  }

  lightboxClosers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (!lightboxDialog) return;
      if (!lightboxDialog.contains(e.target)) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  activateChip(chips[0]);
})();
/* =========================
   Página 14 — Ação sobre a membrana citoplasmática
   ========================= */
(function initCap2Page14() {
  const page = document.querySelector(".cap2-page14");
  if (!page) return;

  const explorer = page.querySelector("[data-membrane-explorer]");
  const introTriggers = Array.from(page.querySelectorAll(".cap2-membrane-intro .cap2-zoomTrigger"));

  const lightbox = document.getElementById("cap2MembraneLightbox");
  const lightboxImage = document.getElementById("cap2MembraneLightboxImage");
  const lightboxCaption = document.getElementById("cap2MembraneLightboxCaption");
  const lightboxDialog = lightbox ? lightbox.querySelector(".cap2-lightbox__dialog") : null;
  const lightboxClosers = lightbox
    ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]"))
    : [];

  let lastFocusedTrigger = null;

  function openLightboxFromData({ src, alt, caption, trigger }) {
    if (!lightbox || !lightboxImage || !src) return;

    lastFocusedTrigger = trigger || null;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    if (lightboxCaption) lightboxCaption.textContent = caption || "";
    document.body.style.overflow = "hidden";

    const firstCloser = lightboxClosers[0];
    if (firstCloser) firstCloser.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    if (lightboxCaption) lightboxCaption.textContent = "";
    document.body.style.overflow = "";

    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
  }

  introTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightboxFromData({
        src: trigger.dataset.zoomImage || "",
        alt: trigger.dataset.zoomAlt || "",
        caption: trigger.dataset.zoomCaption || "",
        trigger
      });
    });

    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightboxFromData({
          src: trigger.dataset.zoomImage || "",
          alt: trigger.dataset.zoomAlt || "",
          caption: trigger.dataset.zoomCaption || "",
          trigger
        });
      }
    });
  });

  if (!explorer) {
    lightboxClosers.forEach((el) => el.addEventListener("click", closeLightbox));
    if (lightbox) {
      lightbox.addEventListener("click", (e) => {
        if (!lightboxDialog) return;
        if (!lightboxDialog.contains(e.target)) closeLightbox();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
    });
    return;
  }

  const mechTitle = explorer.querySelector("[data-mech-title]");
  const mechEyebrow = explorer.querySelector("[data-mech-eyebrow]");
  const mechTabs = Array.from(explorer.querySelectorAll(".cap2-mech-tab[role='tab']"));
  const mechPanels = Array.from(explorer.querySelectorAll(".cap2-mech-panel[data-mech-panel]"));

  function getMechanismPanel(key) {
    return mechPanels.find((panel) => panel.dataset.mechPanel === key) || null;
  }

  function getMechanismTab(key) {
    return mechTabs.find((tab) => tab.dataset.mechanism === key) || null;
  }

  function updatePhaseState(panel, activePhaseKey, { moveFocus = false } = {}) {
    const phaseTabs = Array.from(panel.querySelectorAll(".cap2-phase-tab[role='tab']"));
    const phasePanels = Array.from(panel.querySelectorAll(".cap2-phase-panel[data-phase-panel]"));
    const figureTrigger = panel.querySelector("[data-phase-zoom-trigger]");
    const figureImage = panel.querySelector("[data-phase-image]");
    const figureCaption = panel.querySelector("[data-phase-caption]");
    const titleText = panel.querySelector("[data-phase-title-text]");

    const activeTab =
      phaseTabs.find((tab) => tab.dataset.phaseTarget === activePhaseKey) || phaseTabs[0];

    if (!activeTab || !figureImage || !figureTrigger) return;

    const nextImage = activeTab.dataset.image || "";
    const nextAlt = activeTab.dataset.alt || "";
    const nextCaption = activeTab.dataset.caption || "";
    const nextTitle = activeTab.dataset.phaseTitle || "";

    phaseTabs.forEach((tab) => {
      const isActive = tab === activeTab;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.tabIndex = isActive ? 0 : -1;
    });

    phasePanels.forEach((contentPanel) => {
      const isActive = contentPanel.dataset.phasePanel === activeTab.dataset.phaseTarget;
      contentPanel.toggleAttribute("hidden", !isActive);
      contentPanel.classList.toggle("is-active", isActive);
    });

    figureImage.src = nextImage;
    figureImage.alt = nextAlt;

    if (figureCaption) {
      figureCaption.textContent = `${nextCaption} Clique na imagem para ampliar.`;
    }

    if (titleText) {
      titleText.textContent = nextTitle;
    }

    figureTrigger.dataset.zoomImage = nextImage;
    figureTrigger.dataset.zoomAlt = nextAlt;
    figureTrigger.dataset.zoomCaption = nextCaption;
    figureTrigger.setAttribute("aria-label", `Ampliar imagem: ${nextTitle}`);

    if (moveFocus) activeTab.focus();

    phaseTabs.forEach((tab, index) => {
      if (tab.dataset.bound === "true") return;

      tab.addEventListener("click", () => {
        updatePhaseState(panel, tab.dataset.phaseTarget);
      });

      tab.addEventListener("keydown", (e) => {
        const key = e.key;
        let nextIndex = null;

        if (key === "ArrowRight" || key === "ArrowDown") {
          nextIndex = (index + 1) % phaseTabs.length;
        } else if (key === "ArrowLeft" || key === "ArrowUp") {
          nextIndex = (index - 1 + phaseTabs.length) % phaseTabs.length;
        } else if (key === "Home") {
          nextIndex = 0;
        } else if (key === "End") {
          nextIndex = phaseTabs.length - 1;
        } else if (key === "Enter" || key === " ") {
          e.preventDefault();
          updatePhaseState(panel, tab.dataset.phaseTarget);
          return;
        }

        if (nextIndex !== null) {
          e.preventDefault();
          updatePhaseState(panel, phaseTabs[nextIndex].dataset.phaseTarget, { moveFocus: true });
        }
      });

      tab.dataset.bound = "true";
    });

    if (figureTrigger.dataset.bound !== "true") {
      figureTrigger.addEventListener("click", () => {
        openLightboxFromData({
          src: figureTrigger.dataset.zoomImage || figureImage.src || "",
          alt: figureTrigger.dataset.zoomAlt || figureImage.alt || "",
          caption: figureTrigger.dataset.zoomCaption || "",
          trigger: figureTrigger
        });
      });

      figureTrigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightboxFromData({
            src: figureTrigger.dataset.zoomImage || figureImage.src || "",
            alt: figureTrigger.dataset.zoomAlt || figureImage.alt || "",
            caption: figureTrigger.dataset.zoomCaption || "",
            trigger: figureTrigger
          });
        }
      });

      figureTrigger.dataset.bound = "true";
    }
  }

  function activateMechanism(key, { moveFocus = false } = {}) {
    const activeTab = getMechanismTab(key);
    const activePanel = getMechanismPanel(key);
    if (!activeTab || !activePanel) return;

    mechTabs.forEach((tab) => {
      const isActive = tab === activeTab;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.tabIndex = isActive ? 0 : -1;
    });

    mechPanels.forEach((panel) => {
      const isActive = panel === activePanel;
      panel.toggleAttribute("hidden", !isActive);
      panel.classList.toggle("is-active", isActive);
    });

    if (mechTitle) mechTitle.textContent = activeTab.textContent.trim();
    if (mechEyebrow) mechEyebrow.textContent = "Pontos de interferência farmacológica";

    const firstPhaseTab = activePanel.querySelector(".cap2-phase-tab[role='tab']");
    if (firstPhaseTab) {
      updatePhaseState(activePanel, firstPhaseTab.dataset.phaseTarget);
    }

    if (moveFocus) activeTab.focus();
  }

  mechTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateMechanism(tab.dataset.mechanism);
    });

    tab.addEventListener("keydown", (e) => {
      const key = e.key;
      let nextIndex = null;

      if (key === "ArrowRight" || key === "ArrowDown") {
        nextIndex = (index + 1) % mechTabs.length;
      } else if (key === "ArrowLeft" || key === "ArrowUp") {
        nextIndex = (index - 1 + mechTabs.length) % mechTabs.length;
      } else if (key === "Home") {
        nextIndex = 0;
      } else if (key === "End") {
        nextIndex = mechTabs.length - 1;
      } else if (key === "Enter" || key === " ") {
        e.preventDefault();
        activateMechanism(tab.dataset.mechanism);
        return;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        activateMechanism(mechTabs[nextIndex].dataset.mechanism, { moveFocus: true });
      }
    });
  });

  lightboxClosers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (!lightboxDialog) return;
      if (!lightboxDialog.contains(e.target)) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  activateMechanism("polimixinas");
})();
/* =========================
   Página 15 — Inibição da síntese proteica
   ========================= */
(function initCap2Page15() {
  const page = document.querySelector(".cap2-page15");
  if (!page) return;

  const explorer = page.querySelector("[data-p15-explorer]");
  const hotspots = explorer ? Array.from(explorer.querySelectorAll(".cap2-p15-hotspot[data-target]")) : [];
  const panels = explorer ? Array.from(explorer.querySelectorAll(".cap2-p15-panel[data-panel]")) : [];
  const eyebrow = page.querySelector("[data-p15-eyebrow]");
  const title = page.querySelector("[data-p15-title]");

  const mainFigureTrigger = page.querySelector(".cap2-p15-figure__trigger");
  const bottomFigureTrigger = page.querySelector(".cap2-p15-bottomFigure .cap2-zoomTrigger");

  const lightbox = document.getElementById("cap2P15Lightbox");
  const lightboxImage = document.getElementById("cap2P15LightboxImage");
  const lightboxCaption = document.getElementById("cap2P15LightboxCaption");
  const lightboxDialog = lightbox ? lightbox.querySelector(".cap2-lightbox__dialog") : null;
  const lightboxClosers = lightbox
    ? Array.from(lightbox.querySelectorAll("[data-p15-lightbox-close]"))
    : [];

  const accordion = page.querySelector("[data-cap2-p15-accordion]");
  const accTriggers = accordion ? Array.from(accordion.querySelectorAll(".cap2-acc-trigger")) : [];

  let lastFocusedTrigger = null;

  const contentMap = {
    "30s": {
      eyebrow: "Subunidade ribossomal",
      title: "Subunidade 30S"
    },
    "50s": {
      eyebrow: "Subunidade ribossomal",
      title: "Subunidade 50S"
    },
    "iniciacao": {
      eyebrow: "Etapa da tradução",
      title: "Iniciação"
    },
    "elongacao": {
      eyebrow: "Etapa da tradução",
      title: "Elongação"
    },
    "terminacao": {
      eyebrow: "Etapa da tradução",
      title: "Terminação"
    }
  };

  function openLightboxFromTrigger(trigger) {
    if (!lightbox || !lightboxImage || !trigger) return;

    const src = trigger.dataset.zoomImage || "";
    const alt = trigger.dataset.zoomAlt || "";
    const caption = trigger.dataset.zoomCaption || "";

    if (!src) return;

    lastFocusedTrigger = trigger;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    document.body.style.overflow = "hidden";

    const firstCloser = lightboxClosers[0];
    if (firstCloser) firstCloser.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    if (lightboxCaption) lightboxCaption.textContent = "";
    document.body.style.overflow = "";

    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
  }

  function activateHotspot(targetKey, { moveFocus = false } = {}) {
    if (!targetKey) return;

    hotspots.forEach((spot) => {
      const isActive = spot.dataset.target === targetKey;
      spot.classList.toggle("is-active", isActive);
      spot.setAttribute("aria-pressed", isActive ? "true" : "false");
      spot.tabIndex = isActive ? 0 : 0;
      if (isActive && moveFocus) spot.focus();
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === targetKey;
      panel.toggleAttribute("hidden", !isActive);
      panel.classList.toggle("is-active", isActive);
    });

    const info = contentMap[targetKey];
    if (info) {
      if (eyebrow) eyebrow.textContent = info.eyebrow;
      if (title) title.textContent = info.title;
    }
  }

  function bindZoomTrigger(trigger) {
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      openLightboxFromTrigger(trigger);
    });

    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightboxFromTrigger(trigger);
      }
    });
  }

  if (explorer && hotspots.length && panels.length) {
    hotspots.forEach((spot, index) => {
      spot.addEventListener("click", () => {
        activateHotspot(spot.dataset.target);
      });

      spot.addEventListener("keydown", (e) => {
        const key = e.key;
        let nextIndex = null;

        if (key === "ArrowRight" || key === "ArrowDown") {
          nextIndex = (index + 1) % hotspots.length;
        } else if (key === "ArrowLeft" || key === "ArrowUp") {
          nextIndex = (index - 1 + hotspots.length) % hotspots.length;
        } else if (key === "Home") {
          nextIndex = 0;
        } else if (key === "End") {
          nextIndex = hotspots.length - 1;
        } else if (key === "Enter" || key === " ") {
          e.preventDefault();
          activateHotspot(spot.dataset.target);
          return;
        }

        if (nextIndex !== null) {
          e.preventDefault();
          activateHotspot(hotspots[nextIndex].dataset.target, { moveFocus: true });
        }
      });
    });

    activateHotspot("30s");
  }

  bindZoomTrigger(mainFigureTrigger);
  bindZoomTrigger(bottomFigureTrigger);

  if (accordion && accTriggers.length) {
    accTriggers.forEach((trigger) => {
      const panelId = trigger.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;

      trigger.addEventListener("click", () => {
        const isExpanded = trigger.getAttribute("aria-expanded") === "true";

        accTriggers.forEach((otherTrigger) => {
          const otherPanelId = otherTrigger.getAttribute("aria-controls");
          const otherPanel = otherPanelId ? document.getElementById(otherPanelId) : null;
          otherTrigger.setAttribute("aria-expanded", "false");
          if (otherPanel) otherPanel.hidden = true;
        });

        if (!isExpanded) {
          trigger.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });
  }

  lightboxClosers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (!lightboxDialog) return;
      if (!lightboxDialog.contains(e.target)) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
/* =========================
   Página 16 — Inibição da síntese de ácidos nucleicos
   ========================= */
(function initCap2Page16() {
  const page = document.querySelector(".cap2-page16");
  if (!page) return;

  const sequence = page.querySelector("[data-p16-sequence]");
  const frames = sequence ? Array.from(sequence.querySelectorAll(".cap2-p16-frame[data-frame]")) : [];
  const dots = sequence ? Array.from(sequence.querySelectorAll(".cap2-p16-dot[data-dot]")) : [];
  const caption = page.querySelector("[data-p16-caption]");
  const actionButtons = sequence ? Array.from(sequence.querySelectorAll("[data-p16-action]")) : [];
  const stageTrigger = page.querySelector("[data-p16-zoom-trigger]");

  const lightbox = document.getElementById("cap2P16Lightbox");
  const lightboxImage = document.getElementById("cap2P16LightboxImage");
  const lightboxCaption = document.getElementById("cap2P16LightboxCaption");
  const lightboxDialog = lightbox ? lightbox.querySelector(".cap2-lightbox__dialog") : null;
  const lightboxClosers = lightbox
    ? Array.from(lightbox.querySelectorAll("[data-p16-lightbox-close]"))
    : [];

  const accordion = page.querySelector("[data-cap2-p16-accordion]");
  const accTriggers = accordion ? Array.from(accordion.querySelectorAll(".cap2-acc-trigger")) : [];

  let current = 0;
  let autoplayTimer = null;
  let lastFocusedTrigger = null;

  const captions = [
    "Transcrição normal do RNA mensageiro.",
    "Interferência farmacológica na RNA polimerase.",
    "Falha na síntese de RNA mensageiro."
  ];

  function getPlayButton() {
    return actionButtons.find((btn) => btn.dataset.p16Action === "play") || null;
  }

  function updatePlayButtonState(isPlaying) {
    const playButton = getPlayButton();
    if (!playButton) return;
    playButton.classList.toggle("is-active", isPlaying);
    playButton.textContent = isPlaying ? "Pausar" : "Auto";
  }

  function showFrame(index) {
    if (!frames.length) return;

    current = (index + frames.length) % frames.length;

    frames.forEach((frame, i) => {
      const isActive = i === current;
      frame.hidden = !isActive;
      frame.classList.toggle("is-active", isActive);
    });

    dots.forEach((dot, i) => {
      const isActive = i === current;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    if (caption) {
      caption.textContent = captions[current] || "";
    }

    const activeFrame = frames[current];
    if (stageTrigger && activeFrame) {
      stageTrigger.dataset.zoomImage = activeFrame.getAttribute("src") || "";
      stageTrigger.dataset.zoomAlt = activeFrame.getAttribute("alt") || "";
      stageTrigger.dataset.zoomCaption = captions[current] || "";
      stageTrigger.setAttribute("aria-label", `Ampliar imagem: ${captions[current] || "etapa selecionada"}`);
    }
  }

  function startAutoplay() {
    if (autoplayTimer || frames.length < 2) return;

    autoplayTimer = window.setInterval(() => {
      showFrame(current + 1);
    }, 2400);

    updatePlayButtonState(true);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    updatePlayButtonState(false);
  }

  function toggleAutoplay() {
    if (autoplayTimer) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  function openLightboxFromStage() {
    if (!lightbox || !lightboxImage || !stageTrigger) return;

    const src = stageTrigger.dataset.zoomImage || "";
    const alt = stageTrigger.dataset.zoomAlt || "";
    const cap = stageTrigger.dataset.zoomCaption || "";

    if (!src) return;

    lastFocusedTrigger = stageTrigger;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    if (lightboxCaption) lightboxCaption.textContent = cap;
    document.body.style.overflow = "hidden";

    const firstCloser = lightboxClosers[0];
    if (firstCloser) firstCloser.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    if (lightboxCaption) lightboxCaption.textContent = "";
    document.body.style.overflow = "";

    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
  }

  if (frames.length) {
    showFrame(0);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoplay();
      showFrame(index);
    });

    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        stopAutoplay();
        showFrame(index);
      }
    });
  });

  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.p16Action;

      if (action === "next") {
        stopAutoplay();
        showFrame(current + 1);
      } else if (action === "prev") {
        stopAutoplay();
        showFrame(current - 1);
      } else if (action === "play") {
        toggleAutoplay();
      }
    });
  });

  if (sequence) {
    sequence.addEventListener("mouseenter", stopAutoplay);
  }

  if (stageTrigger) {
    stageTrigger.addEventListener("click", openLightboxFromStage);

    stageTrigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightboxFromStage();
      }
    });
  }

  if (accordion && accTriggers.length) {
    accTriggers.forEach((trigger) => {
      const panelId = trigger.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;

      trigger.addEventListener("click", () => {
        const isExpanded = trigger.getAttribute("aria-expanded") === "true";

        accTriggers.forEach((otherTrigger) => {
          const otherPanelId = otherTrigger.getAttribute("aria-controls");
          const otherPanel = otherPanelId ? document.getElementById(otherPanelId) : null;
          otherTrigger.setAttribute("aria-expanded", "false");
          if (otherPanel) otherPanel.hidden = true;
        });

        if (!isExpanded) {
          trigger.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });
  }

  lightboxClosers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (!lightboxDialog) return;
      if (!lightboxDialog.contains(e.target)) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
/* =========================
   Página 17 — Inibição do metabolismo do folato
   ========================= */
(function initCap2Page17() {
  const page = document.querySelector(".cap2-page17");
  if (!page) return;

  const zoomTriggers = Array.from(page.querySelectorAll(".cap2-zoomTrigger"));

  const lightbox = document.getElementById("cap2P17Lightbox");
  const lightboxImage = document.getElementById("cap2P17LightboxImage");
  const lightboxCaption = document.getElementById("cap2P17LightboxCaption");
  const lightboxDialog = lightbox ? lightbox.querySelector(".cap2-lightbox__dialog") : null;
  const lightboxClosers = lightbox
    ? Array.from(lightbox.querySelectorAll("[data-p17-lightbox-close]"))
    : [];

  let lastFocusedTrigger = null;

  function openLightboxFromTrigger(trigger) {
    if (!lightbox || !lightboxImage || !trigger) return;

    const src = trigger.dataset.zoomImage || "";
    const alt = trigger.dataset.zoomAlt || "";
    const caption = trigger.dataset.zoomCaption || "";

    if (!src) return;

    lastFocusedTrigger = trigger;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    document.body.style.overflow = "hidden";

    const firstCloser = lightboxClosers[0];
    if (firstCloser) firstCloser.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    if (lightboxCaption) lightboxCaption.textContent = "";
    document.body.style.overflow = "";

    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
  }

  zoomTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightboxFromTrigger(trigger);
    });

    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightboxFromTrigger(trigger);
      }
    });
  });

  lightboxClosers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (!lightboxDialog) return;
      if (!lightboxDialog.contains(e.target)) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
/* =========================
   Página 18 — Bactericida e bacteriostático
   ========================= */
(function initCap2Page18() {
  const page = document.querySelector(".cap2-page18");
  if (!page) return;

  const accordion = page.querySelector("[data-cap2-p18-accordion]");
  const accTriggers = accordion ? Array.from(accordion.querySelectorAll(".cap2-acc-trigger")) : [];

  const zoomables = Array.from(page.querySelectorAll(".cap2-zoomable"));
  const lightbox = page.querySelector("[data-cap2-lightbox]");
  const lightboxImg = lightbox ? lightbox.querySelector(".cap2-lightbox__img") : null;
  const lightboxDialog = lightbox ? lightbox.querySelector(".cap2-lightbox__dialog") : null;
  const lightboxClosers = lightbox
    ? Array.from(lightbox.querySelectorAll("[data-lightbox-close]"))
    : [];

  let lastFocusedTrigger = null;

  if (accordion && accTriggers.length) {
    accTriggers.forEach((trigger) => {
      const panelId = trigger.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;

      trigger.addEventListener("click", () => {
        const isExpanded = trigger.getAttribute("aria-expanded") === "true";

        accTriggers.forEach((otherTrigger) => {
          const otherPanelId = otherTrigger.getAttribute("aria-controls");
          const otherPanel = otherPanelId ? document.getElementById(otherPanelId) : null;
          otherTrigger.setAttribute("aria-expanded", "false");
          if (otherPanel) otherPanel.hidden = true;
        });

        if (!isExpanded) {
          trigger.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });
  }

  function openLightbox(trigger) {
    if (!lightbox || !lightboxImg || !trigger) return;

    const src = trigger.dataset.zoomSrc || "";
    const alt = trigger.dataset.zoomAlt || "";

    if (!src) return;

    lastFocusedTrigger = trigger;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    document.body.classList.add("cap2-lightbox-open");

    const firstCloser = lightboxClosers[0];
    if (firstCloser) firstCloser.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    lightboxImg.alt = "";
    document.body.classList.remove("cap2-lightbox-open");

    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
  }

  zoomables.forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger));

    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(trigger);
      }
    });
  });

  lightboxClosers.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (!lightboxDialog) return;
      if (!lightboxDialog.contains(e.target)) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
document.querySelectorAll(".cap2-p19Question").forEach((q)=>{

  const options = q.querySelectorAll("[data-option]");
  const confirmBtn = q.querySelector('[data-p19-action="confirm"]');
  const resetBtn = q.querySelector('[data-p19-action="reset"]');
  const feedback = q.querySelector(".cap2-p19Feedback");
  const rationale = q.querySelector(".cap2-p19Rationale");

  let selected = null;

  options.forEach(btn=>{
    btn.addEventListener("click",()=>{
      options.forEach(o=>o.classList.remove("selected"));
      btn.classList.add("selected");
      selected = btn.dataset.option;
    });
  });

  confirmBtn.addEventListener("click",()=>{
    if(!selected) return;

    const correct = q.dataset.correct;

    options.forEach(btn=>{
      if(btn.dataset.option === correct){
        btn.classList.add("correct");
      }else if(btn.dataset.option === selected){
        btn.classList.add("wrong");
      }
    });

    if(selected === correct){
      feedback.textContent = "Resposta correta";
      feedback.className = "cap2-p19Feedback correct";
    }else{
      feedback.textContent = "Resposta incorreta";
      feedback.className = "cap2-p19Feedback wrong";
    }

    feedback.hidden = false;
    rationale.hidden = false;
  });

  resetBtn.addEventListener("click",()=>{
    selected = null;

    options.forEach(btn=>{
      btn.classList.remove("selected","correct","wrong");
    });

    feedback.hidden = true;
    rationale.hidden = true;
  });

});