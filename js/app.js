/* =========================
   ZOOM GLOBAL DE IMAGEM
   ========================= */

(function(){

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="">
  `;
  document.body.appendChild(lightbox);

  const img = lightbox.querySelector("img");
  const close = lightbox.querySelector(".lightbox-close");

  document.addEventListener("click", function(e){
    const trigger = e.target.closest("[data-zoom]");
    if(!trigger) return;

    const src = trigger.getAttribute("data-zoom") || trigger.src;

    img.src = src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  close.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e)=>{
    if(e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") closeLightbox();
  });

  function closeLightbox(){
    lightbox.classList.remove("active");
    img.src = "";
    document.body.style.overflow = "";
  }

})();

/* =========================
   PAGINAÇÃO (ÚNICA E LIMPA)
   ========================= */

document.addEventListener("click", function(e){

  const next = e.target.closest("[data-next]");
  const prev = e.target.closest("[data-prev]");

  if(next){
    const url = next.getAttribute("data-next");
    if(url && !next.hasAttribute("disabled")){
      window.location.href = url;
    }
  }

  if(prev){
    const url = prev.getAttribute("data-prev");
    if(url && !prev.hasAttribute("disabled")){
      window.location.href = url;
    }
  }

});
/* =========================
   ZOOM GLOBAL DE IMAGEM
   ========================= */

(function(){

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="">
  `;
  document.body.appendChild(lightbox);

  const img = lightbox.querySelector("img");
  const close = lightbox.querySelector(".lightbox-close");

  document.addEventListener("click", function(e){
    const trigger = e.target.closest("img[data-zoom]");
    if(!trigger) return;

    img.src = trigger.getAttribute("data-zoom") || trigger.src;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  close.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e)=>{
    if(e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") closeLightbox();
  });

  function closeLightbox(){
    lightbox.classList.remove("active");
    img.src = "";
    document.body.style.overflow = "";
  }

})();

/* =========================
   PAGINAÇÃO
   ========================= */

document.addEventListener("click", function(e){

  const next = e.target.closest("[data-next]");
  const prev = e.target.closest("[data-prev]");

  if(next && !next.hasAttribute("disabled")){
    const url = next.getAttribute("data-next");
    if(url) window.location.href = url;
  }

  if(prev && !prev.hasAttribute("disabled")){
    const url = prev.getAttribute("data-prev");
    if(url) window.location.href = url;
  }

});
/* =========================
   CAPA — NAVEGAÇÃO
   ========================= */

(function initCoverNextButton(){
  const nextButton = document.querySelector(".cover-next[data-next]");
  if(!nextButton) return;

  nextButton.addEventListener("click", function(){
    const target = this.dataset.next;
    if(target){
      window.location.href = target;
    }
  });
})();
/* =========================
   SUMÁRIO — NAVEGAÇÃO
   ========================= */

(function initSummaryNavigation(){
  const prevButton = document.querySelector('.sumario-page [data-prev]');
  const nextButton = document.querySelector('.sumario-page [data-next]');

  function go(button){
    if(!button) return;
    const target = button.dataset.prev || button.dataset.next;
    if(target){
      window.location.href = target;
    }
  }

  if(prevButton){
    prevButton.addEventListener('click', function(){
      go(this);
    });
  }

  if(nextButton){
    nextButton.addEventListener('click', function(){
      go(this);
    });
  }
})();