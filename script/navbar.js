  document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.header__mobile-menu');
    burger.addEventListener('click', function () {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', burger.classList.contains('active'));
    });
  });