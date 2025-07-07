// contactApi.js

export async function sendContactForm({ nom, email, message }) {
  const response = await fetch('/ACOO-frontend/service/api/contactClubApi.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nom, email, message })
  });
  return response.json();
}


import { sendContactForm } from '/ACOO-frontend/service/api/contactApi.js';

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
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

    // Appel à l'API
    try {
      const result = await sendContactForm({ nom, email, message });
      if (result.success) {
        contactForm.innerHTML = "<p>Merci, votre message a bien été envoyé.</p>";
      } else {
        alert("Une erreur est survenue. Merci de réessayer.");
      }
    } catch (error) {
      alert("Erreur de connexion au serveur.");
    }
  });
}
