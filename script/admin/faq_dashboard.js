import { getFaqs, addFaq, updateFaq, deleteFaq } from '../../service/api/faqApi.js';

const faqList = document.getElementById('faq-list');
const addBtn = document.getElementById('add-faq-btn');
const faqModal = document.getElementById('faq-modal');
const deleteModal = document.getElementById('delete-modal');
const closeFaqModal = document.getElementById('close-faq-modal');
const closeDeleteModal = document.getElementById('close-delete-modal');
const faqForm = document.getElementById('faq-form');
const modalTitle = document.getElementById('modal-title');
const faqIdInput = document.getElementById('faq-id');
const questionInput = document.getElementById('faq-question');
const answerInput = document.getElementById('faq-answer');
const categoryInput = document.getElementById('faq-category');
const faqSubmitBtn = document.getElementById('faq-submit-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
const loaderDiv = document.getElementById('faq-loader');
const reloadBtn = document.getElementById('reload-faqs-btn');

// Ajout d'un conteneur pour les erreurs
let errorDiv = document.getElementById('faq-error');
if (!errorDiv) {
  errorDiv = document.createElement('div');
  errorDiv.id = 'faq-error';
  errorDiv.style.color = '#e74c3c';
  errorDiv.style.background = '#fbeaea';
  errorDiv.style.borderRadius = '6px';
  errorDiv.style.padding = '0.7rem 1rem';
  errorDiv.style.marginBottom = '1rem';
  errorDiv.style.fontSize = '1rem';
  errorDiv.style.display = 'none';
  faqList.parentNode.insertBefore(errorDiv, faqList);
}

let faqs = [];
let faqToDelete = null;


// Affiche la liste des FAQs
async function renderFaqs() {
  errorDiv.style.display = 'none';
  loaderDiv.style.display = 'block'; // Affiche le loader
  try {
    faqs = await getFaqs();
    faqList.innerHTML = '';
    faqs.forEach(faq => {
      const card = document.createElement('div');
      card.className = 'faq-card';
      card.innerHTML = `
        <div class="faq-card__question">${faq.question}</div>
        <div class="faq-card__answer">${faq.answer}</div>
        <div class="faq-card__category">${faq.category ? 'Catégorie : ' + faq.category : ''}</div>
        <div class="faq-card__actions">
          <button class="btn btn-primary btn-edit" data-id="${faq.id}">Modifier</button>
          <button class="btn btn-danger btn-delete" data-id="${faq.id}">Supprimer</button>
        </div>
      `;
      faqList.appendChild(card);
    });
    // Ajoute les listeners sur les boutons
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => openEditModal(e.target.dataset.id));
    });
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => openDeleteModal(e.target.dataset.id));
    });
  } catch (err) {
    errorDiv.textContent = err.message || "Erreur lors du chargement des FAQs.";
    errorDiv.style.display = 'block';
  } finally {
    loaderDiv.style.display = 'none'; // Cache le loader
  }
}

// Ouvre le modal d'ajout
addBtn.addEventListener('click', () => {
  modalTitle.textContent = "Ajouter une FAQ";
  faqForm.reset();
  faqIdInput.value = '';
  faqModal.style.display = 'flex';
    faqModal.style.display = 'flex';
  errorDiv.style.display = 'none';
});

// Ouvre le modal d'édition
function openEditModal(id) {
  const faq = faqs.find(f => f.id == id);
  if (!faq) return;
  modalTitle.textContent = "Modifier la FAQ";
  faqIdInput.value = faq.id;
  questionInput.value = faq.question;
  answerInput.value = faq.answer;
  categoryInput.value = faq.category || '';
  faqModal.style.display = 'flex';
   errorDiv.style.display = 'none';
}

// Ouvre le modal de suppression
function openDeleteModal(id) {
  faqToDelete = id;
  deleteModal.style.display = 'flex';
   errorDiv.style.display = 'none';
}

// Fermer les modals
closeFaqModal.onclick = () => faqModal.style.display = 'none';
closeDeleteModal.onclick = () => deleteModal.style.display = 'none';
cancelDeleteBtn.onclick = () => deleteModal.style.display = 'none';

// Soumission du formulaire (ajout/modif)
faqForm.onsubmit = async (e) => {
  e.preventDefault();
  const faqData = {
    question: questionInput.value,
    answer: answerInput.value,
    category: categoryInput.value
  };
try {
    if (faqIdInput.value) {
      await updateFaq(faqIdInput.value, faqData);
    } else {
      await addFaq(faqData);
    }
    faqModal.style.display = 'none';
    renderFaqs();
  } catch (err) {
    errorDiv.textContent = err.message || "Erreur lors de l'enregistrement de la FAQ.";
    errorDiv.style.display = 'block';
    faqModal.style.display = 'none';
  }
};

// Suppression
confirmDeleteBtn.onclick = async () => {
  if (faqToDelete) {
   try {
      await deleteFaq(faqToDelete);
      faqToDelete = null;
      deleteModal.style.display = 'none';
      renderFaqs();
    } catch (err) {
      errorDiv.textContent = err.message || "Erreur lors de la suppression de la FAQ.";
      errorDiv.style.display = 'block';
      deleteModal.style.display = 'none';
    }
  }
};

reloadBtn.onclick = renderFaqs;


// Initialisation
renderFaqs();