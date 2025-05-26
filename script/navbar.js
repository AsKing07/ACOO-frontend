document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.header__burger');
  const mobileMenu = document.querySelector('.header__mobile-menu');

  burger.addEventListener('click', function (e) {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', burger.classList.contains('active'));
    e.stopPropagation(); // Empêche la propagation pour éviter la fermeture immédiate
  });

  // Fermer le menu si on clique en dehors
  document.addEventListener('click', function (e) {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});