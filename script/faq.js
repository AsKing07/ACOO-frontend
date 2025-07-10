import { getFaqs } from '../service/api/faqApi.js';

async function loadFaqs() {
  try {
    const faqs = await getFaqs(); // Récupère les FAQs via l'API
    const faqContainer = document.querySelector('.faq');

    // Vide le conteneur actuel
    faqContainer.innerHTML = '';

    // Génère le HTML pour chaque FAQ
    faqs.forEach(faq => {
      const faqItem = document.createElement('div');
      faqItem.className = 'faq__item';
      faqItem.innerHTML = `
        <button class="faq__question" aria-expanded="false">
          ${faq.question}
          <span class="faq__icon">+</span>
        </button>
        <div class="faq__answer">
          <p>${faq.answer}</p>
        </div>
      `;
      faqContainer.appendChild(faqItem);
    });

    // Applique le comportement toggle
    document.querySelectorAll('.faq__question').forEach(btn => {
      btn.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        // Ferme toutes les autres
        document.querySelectorAll('.faq__question').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          b.querySelector('.faq__icon').textContent = '+';
          b.parentElement.querySelector('.faq__answer').style.maxHeight = null;
        });
        // Ouvre celle-ci si elle était fermée
        if (!expanded) {
          this.setAttribute('aria-expanded', 'true');
          this.querySelector('.faq__icon').textContent = '−';
          const answer = this.parentElement.querySelector('.faq__answer');
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });

  } catch (err) {
    console.error('Erreur lors du chargement des FAQs :', err);
  }
}

// Appelle la fonction au chargement
window.addEventListener('DOMContentLoaded', loadFaqs);

  
  
  
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      // Ferme toutes les autres
      document.querySelectorAll('.faq__question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.querySelector('.faq__icon').textContent = '+';
        b.parentElement.querySelector('.faq__answer').style.maxHeight = null;
      });
      // Ouvre celle-ci si ce n'était pas déjà ouvert
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
        this.querySelector('.faq__icon').textContent = '−';
        const answer = this.parentElement.querySelector('.faq__answer');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
