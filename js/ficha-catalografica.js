document.addEventListener("DOMContentLoaded", () => {
  const imagemFicha = document.querySelector(
    ".catalog-page__image"
  );

  if (!imagemFicha) {
    return;
  }

  imagemFicha.classList.add("is-loading");

  function mostrarImagem() {
    imagemFicha.classList.remove("is-loading");
    imagemFicha.classList.add("is-loaded");
  }

  if (imagemFicha.complete) {
    mostrarImagem();
    return;
  }

  imagemFicha.addEventListener(
    "load",
    mostrarImagem,
    { once: true }
  );

  imagemFicha.addEventListener(
    "error",
    () => {
      imagemFicha.classList.remove("is-loading");

      console.error(
        "A imagem da ficha catalográfica não foi encontrada."
      );
    },
    { once: true }
  );
});