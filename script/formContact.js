// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
   
    alert('Votre message a été envoyé !');
    contactForm.reset();
  });
}