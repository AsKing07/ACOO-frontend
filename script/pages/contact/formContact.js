// Import des services API
import { addMessagerie } from '../../../service/api/messagerieApi.js';

// Form validation
const contactForm = document.querySelector('.contact-form');


if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    console.log('Form submitted');
    const formData = new FormData(contactForm);
    const messagerie = {
      name: formData.get('name'),
      mail: formData.get('mail'),
      subject: formData.get('subject'),
      description: formData.get('message')
    };

    try {
      await addMessagerie(messagerie);
      alert('Votre message a été envoyé !');
      contactForm.reset();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
      alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
    }
  });
}
