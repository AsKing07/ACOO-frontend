// contact.js

// Menu burger toggle
const burger = document.querySelector('.header__burger');
const mobileMenu = document.querySelector('.header__mobile-menu');

burger.addEventListener('click', () => {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!expanded));
  mobileMenu.classList.toggle('active');
});

// Form validation
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nom = contactForm.querySelector('input[name="nom"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    if (!nom || !email || !message) {
      alert('Merci de remplir tous les champs.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Veuillez entrer un email valide.');
      return;
    }

    alert('Votre message a été envoyé !');
    contactForm.reset();
  });
}

// Scroll animation for sections
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.section-information, .formulaire-contact').forEach((el) => {
  observer.observe(el);
});
