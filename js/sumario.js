(function initSumarioPage(){
  const items = document.querySelectorAll('.sumario-item');
  if(!items.length) return;

  items.forEach(item => {
    item.addEventListener('focus', () => {
      item.classList.add('is-focus');
    });

    item.addEventListener('blur', () => {
      item.classList.remove('is-focus');
    });
  });
})();