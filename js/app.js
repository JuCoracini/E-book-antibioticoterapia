/* núcleo global do e-book */

(function () {
  "use strict";

  const $ = (s, sc = document) => sc.querySelector(s);
  const $$ = (s, sc = document) => Array.from(sc.querySelectorAll(s));

  const STORAGE_KEYS = {
    fontScale: "ebook_font_scale",
    pageZoom: "ebook_page_zoom",
    visionMode: "ebook_vision_mode"
  };

  const LIMITS = {
    fontMin: 0.9,
    fontMax: 1.35,
    fontStep: 0.05,
    zoomMin: 0.9,
    zoomMax: 1.2,
    zoomStep: 0.05
  };

  const Modal = {
    overlay: null,
    modal: null,
    body: null,
    title: null,

    init() {
      this.overlay = $("[data-modal-overlay]");
      this.modal = $("[data-modal]");
      this.body = $("[data-modal-body]");
      this.title = $("#modalTitle");

      $("[data-modal-close]")?.addEventListener("click", () => this.close());
      this.overlay?.addEventListener("click", () => this.close());

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.close();
      });
    },

    open(title, content) {
      if (!this.overlay || !this.modal || !this.body || !this.title) return;

      this.title.textContent = title;
      this.body.innerHTML = content;

      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = scrollBarWidth + "px";

      this.overlay.hidden = false;
      this.modal.hidden = false;
    },

    close() {
      if (!this.overlay || !this.modal || !this.body || !this.title) return;

      this.overlay.hidden = true;
      this.modal.hidden = true;

      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      this.body.innerHTML = "";
      this.title.textContent = "";
    },

    openImage(src, alt) {
      const html = `
        <figure class="modal-figure">
          <img src="${src}" alt="${alt || ""}" class="modal-figure__image">
          ${alt ? `<figcaption class="modal-figure__caption">${alt}</figcaption>` : ""}
        </figure>
      `;
      this.open(alt || "Imagem", html);
    }
  };

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getStoredNumber(key, fallback) {
    const raw = localStorage.getItem(key);
    const value = Number(raw);
    return Number.isFinite(value) ? value : fallback;
  }

  function applyFontScale(value) {
    document.documentElement.style.setProperty("--reader-font-scale", value.toFixed(2));
    localStorage.setItem(STORAGE_KEYS.fontScale, String(value));
  }

  function applyPageZoom(value) {
    document.documentElement.style.setProperty("--reader-page-zoom", value.toFixed(2));
    localStorage.setItem(STORAGE_KEYS.pageZoom, String(value));
  }

  function applyVisionMode(mode) {
    document.body.classList.remove(
      "vision-protanopia",
      "vision-deuteranopia",
      "vision-tritanopia"
    );

    if (mode && mode !== "default") {
      document.body.classList.add(`vision-${mode}`);
    }

    localStorage.setItem(STORAGE_KEYS.visionMode, mode);
  }

  function initReaderPreferences() {
    const savedFont = getStoredNumber(STORAGE_KEYS.fontScale, 1);
    const savedZoom = getStoredNumber(STORAGE_KEYS.pageZoom, 1);
    const savedVision = localStorage.getItem(STORAGE_KEYS.visionMode) || "default";

    applyFontScale(clamp(savedFont, LIMITS.fontMin, LIMITS.fontMax));
    applyPageZoom(clamp(savedZoom, LIMITS.zoomMin, LIMITS.zoomMax));
    applyVisionMode(savedVision);
  }

  function initFontControls() {
    $$("[data-font]").forEach((button) => {
      button.addEventListener("click", () => {
        let current = getStoredNumber(STORAGE_KEYS.fontScale, 1);
        const action = button.getAttribute("data-font");

        if (action === "increase") {
          current = clamp(current + LIMITS.fontStep, LIMITS.fontMin, LIMITS.fontMax);
        } else if (action === "decrease") {
          current = clamp(current - LIMITS.fontStep, LIMITS.fontMin, LIMITS.fontMax);
        } else {
          current = 1;
        }

        applyFontScale(current);
      });
    });
  }

  function initZoomControls() {
    $$("[data-zoom]").forEach((button) => {
      button.addEventListener("click", () => {
        let current = getStoredNumber(STORAGE_KEYS.pageZoom, 1);
        const action = button.getAttribute("data-zoom");

        if (action === "increase") {
          current = clamp(current + LIMITS.zoomStep, LIMITS.zoomMin, LIMITS.zoomMax);
        } else if (action === "decrease") {
          current = clamp(current - LIMITS.zoomStep, LIMITS.zoomMin, LIMITS.zoomMax);
        } else {
          current = 1;
        }

        applyPageZoom(current);
      });
    });
  }

  function initVisionControls() {
    $$("[data-vision]").forEach((button) => {
      button.addEventListener("click", () => {
        const mode = button.getAttribute("data-vision") || "default";
        applyVisionMode(mode);
      });
    });
  }

  function navigateWithTransition(href, dir = "next") {
    const page = document.querySelector(".page-shell");

    if (!page || !href) {
      window.location.href = href;
      return;
    }

    const className = dir === "prev" ? "is-leaving-prev" : "is-leaving-next";
    page.classList.add(className);

    setTimeout(() => {
      window.location.href = href;
    }, 380);
  }

  function initPager() {
    $$("[data-prev],[data-next]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const prev = btn.getAttribute("data-prev");
        const next = btn.getAttribute("data-next");

        if (prev) navigateWithTransition(prev, "prev");
        else if (next) navigateWithTransition(next, "next");
      });
    });
  }

  function init() {
    Modal.init();
    initReaderPreferences();
    initFontControls();
    initZoomControls();
    initVisionControls();
    initPager();

    window.AppModal = Modal;
  }

  document.addEventListener("DOMContentLoaded", init);
})();