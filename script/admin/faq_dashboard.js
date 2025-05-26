import { getFaqs, addFaq, updateFaq, deleteFaq } from '../../service/api/faqApi.js';
import { showNotification } from '../showNotification.js';

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
const categoryInput = document.getElementById('faq-category-select');
// const categoryInput = document.getElementById('faq-category');
const faqSubmitBtn = document.getElementById('faq-submit-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
const loaderDiv = document.getElementById('faq-loader');
const reloadBtn = document.getElementById('reload-faqs-btn');
const categoryFilter = document.getElementById('faq-category-filter');
const categorySelect = document.getElementById('faq-category-select');
const categoryNewInput = document.getElementById('faq-category-new');


let faqs = [];
let faqToDelete = null;
let categories = [];
let currentCategory = "";

// Récupère les catégories uniques
function extractCategories() {
  categories = [...new Set(faqs.map(f => f.category).filter(Boolean))];
}

// Met à jour les options du filtre et du select
function updateCategoryOptions() {
  // Pour le filtre
  if (categoryFilter) {
    categoryFilter.innerHTML = `<option value="">Toutes</option>` +
      categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    categoryFilter.value = currentCategory;
  }
  // Pour le select du formulaire
  if (categorySelect) {
    categorySelect.innerHTML =
     `option value="" disabled selected >Choisissez...</option>` +
      categories.map(cat => `<option value="${cat}">${cat}</option>`).join('') +
     
      `<option value="__new__">Créer une nouvelle catégorie…</option>`;
  }
}


// Affiche la liste des FAQs
async function renderFaqs() {
  loaderDiv.style.display = 'block';
  try {
    faqs = await getFaqs();
    extractCategories();
    updateCategoryOptions();
    faqList.innerHTML = '';
    let filteredFaqs = currentCategory
      ? faqs.filter(f => f.category === currentCategory)
      : faqs;
    filteredFaqs.forEach(faq => {
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
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => openEditModal(e.target.dataset.id));
    });
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => openDeleteModal(e.target.dataset.id));
    });
  } catch (err) {
    // showError(err.message || "Erreur lors du chargement des FAQs.");
    showNotification(err.message || "Erreur lors du chargement des FAQs.", 'error');
  } finally {
    loaderDiv.style.display = 'none';
  }
}

// Filtre par catégorie
if (categoryFilter) {
  categoryFilter.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    renderFaqs();
  });
}

// Gestion du select/nouvelle catégorie dans le formulaire
if (categorySelect && categoryNewInput) {
  categorySelect.addEventListener('change', (e) => {
    if (e.target.value === "__new__") {
      categoryNewInput.style.display = 'block';
      categoryNewInput.required = true;
    } else {
      categoryNewInput.style.display = 'none';
      categoryNewInput.required = false;
    }
  });
}


// Ouvre le modal d'ajout
addBtn.addEventListener('click', () => {
  modalTitle.textContent = "Ajouter une FAQ";
  faqForm.reset();
  faqIdInput.value = '';
  faqModal.style.display = 'flex';
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
}

// Ouvre le modal de suppression
function openDeleteModal(id) {
  faqToDelete = id;
  deleteModal.style.display = 'flex';
}

// Fermer les modals
closeFaqModal.onclick = () => faqModal.style.display = 'none';
closeDeleteModal.onclick = () => deleteModal.style.display = 'none';
cancelDeleteBtn.onclick = () => deleteModal.style.display = 'none';

// Soumission du formulaire (ajout/modif)
faqForm.onsubmit = async (e) => {
  e.preventDefault();
  // Affiche un loader sur le bouton
  faqSubmitBtn.disabled = true;
  const oldBtnContent = faqSubmitBtn.innerHTML;
  faqSubmitBtn.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle;"></span>`;

    let categoryValue = categorySelect.value === "__new__"
    ? categoryNewInput.value.trim()
    : categorySelect.value;

  const faqData = {
    question: questionInput.value,
    answer: answerInput.value,
    category: categoryValue
  };
  try {
    if (faqIdInput.value) {
      await updateFaq(faqIdInput.value, faqData);
    } else {
      await addFaq(faqData);
    }
    faqModal.style.display = 'none';
    renderFaqs();
    showNotification("FAQ enregistrée avec succès.", 'success');
  } catch (err) {
    // showError(err.message || "Erreur lors de l'enregistrement de la FAQ.");
    showNotification(err.message || "Erreur lors de l'enregistrement de la FAQ.", 'error');
    faqModal.style.display = 'none';
  } finally {
    faqSubmitBtn.disabled = false;
    faqSubmitBtn.innerHTML = oldBtnContent;
  }
};

// Suppression
confirmDeleteBtn.onclick = async () => {
  if (faqToDelete) {
    // Affiche un loader sur le bouton
    confirmDeleteBtn.disabled = true;
    const oldBtnContent = confirmDeleteBtn.innerHTML;
    confirmDeleteBtn.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle;"></span>`;
    try {
      await deleteFaq(faqToDelete);
      faqToDelete = null;
      deleteModal.style.display = 'none';
      renderFaqs();
      showNotification("FAQ supprimée avec succès.", 'success');
    } catch (err) {
    //   showError(err.message || "Erreur lors de la suppression de la FAQ.");
      deleteModal.style.display = 'none';
              showNotification(err.message || "Erreur lors de la suppression de la FAQ.", 'error');

    } finally {
      confirmDeleteBtn.disabled = false;
      confirmDeleteBtn.innerHTML = oldBtnContent;
    }
  }
};

reloadBtn.onclick = renderFaqs;

// Initialisation
renderFaqs();