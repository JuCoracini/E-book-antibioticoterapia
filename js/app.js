/* =========================
   APP GLOBAL
   ========================= */

(function initGlobalLightbox() {
  if (!document.body) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");

  lightbox.innerHTML = `
    <div class="lightbox__backdrop" data-lightbox-close></div>
    <div
      class="lightbox__dialog"
      role="dialog"
      aria-modal="true"
      aria-label="Imagem ampliada"
    >
      <button
        class="lightbox__close"
        type="button"
        aria-label="Fechar imagem ampliada"
        data-lightbox-close
      >
        ✕
      </button>
      <figure class="lightbox__figure">
        <img src="" alt="">
      </figure>
    </div>
  `;

  document.body.appendChild(lightbox);

  const image = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".lightbox__close");

  let lastFocusedElement = null;
  let isOpen = false;

  function openLightbox(src, alt) {
    if (isOpen) return;
    isOpen = true;

    lastFocusedElement = document.activeElement;

    image.src = src || "";
    image.alt = alt || "";

    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeButton?.focus();
  }

  function closeLightbox() {
    if (!isOpen) return;
    isOpen = false;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");

    image.src = "";
    image.alt = "";

    document.body.style.overflow = "";

    lastFocusedElement?.focus?.();
  }

  document.addEventListener("click", function (event) {
    const trigger = event.target.closest("[data-zoom]");

    if (trigger) {
      const nestedImage = trigger.matches("img")
        ? trigger
        : trigger.querySelector("img");

      const src =
        trigger.getAttribute("data-zoom") ||
        nestedImage?.getAttribute("src") ||
        "";

      const alt =
        trigger.getAttribute("alt") ||
        nestedImage?.getAttribute("alt") ||
        "";

      openLightbox(src, alt);
      return;
    }

    if (event.target.closest("[data-lightbox-close]")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen) {
      closeLightbox();
    }
  });
})();

/* =========================
   PAGINAÇÃO GLOBAL
   ========================= */

document.addEventListener("click", function (event) {

  const next = event.target.closest("[data-next]");
  if (next && !next.hasAttribute("disabled")) {
    event.preventDefault();

    const url = next.getAttribute("data-next");

    if (url) {
      window.location.href = url;
    }
    return;
  }

  const prev = event.target.closest("[data-prev]");
  if (prev && !prev.hasAttribute("disabled")) {
    event.preventDefault();

    const url = prev.getAttribute("data-prev");

    if (url) {
      window.location.href = url;
    }
  }

});