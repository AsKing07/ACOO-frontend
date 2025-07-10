import { getFaqs } from '../service/api/faqApi.js';
import { showNotification } from './showNotification.js';

class FaqManager {
  constructor() {
    this.allFaqs = [];
    this.filteredFaqs = [];
    this.currentPage = 1;
    this.faqsPerPage = 5;
    this.currentCategory = '';
    
    // Éléments DOM
    this.faqContainer = document.getElementById('faq-container');
    this.categoryFilter = document.getElementById('faq-category-filter');
    this.pagination = document.getElementById('faq-pagination');
    this.prevBtn = document.getElementById('faq-prev-btn');
    this.nextBtn = document.getElementById('faq-next-btn');
    this.pageInfo = document.getElementById('faq-page-info');
    
    this.init();
  }

  async init() {
    try {
      await this.loadFaqs();
      this.setupEventListeners();
      this.updateCategoryFilter();
      this.filterAndPaginate();
    } catch (error) {
      console.error('Erreur lors du chargement des FAQs :', error);
      showNotification("Impossible de charger les FAQs", "error");
      this.faqContainer.innerHTML = '<p class="error">Erreur lors du chargement des FAQs.</p>';
    }
  }

  async loadFaqs() {
    this.allFaqs = await getFaqs();
    this.filteredFaqs = [...this.allFaqs];
  }

  setupEventListeners() {
    // Filtre par catégorie
    if (this.categoryFilter) {
      this.categoryFilter.addEventListener('change', (e) => {
        this.currentCategory = e.target.value;
        this.currentPage = 1; // Reset à la première page
        this.filterAndPaginate();
      });
    }

    // Pagination
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.filterAndPaginate();
        }
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(this.filteredFaqs.length / this.faqsPerPage);
        if (this.currentPage < totalPages) {
          this.currentPage++;
          this.filterAndPaginate();
        }
      });
    }
  }

  updateCategoryFilter() {
    if (!this.categoryFilter) return;

    // Extraire les catégories uniques
    const categories = [...new Set(this.allFaqs.map(faq => faq.category).filter(Boolean))];
    
    // Mettre à jour les options
    this.categoryFilter.innerHTML = '<option value="">Toutes les catégories</option>' +
      categories.map(category => `<option value="${category}">${category}</option>`).join('');
  }

  filterAndPaginate() {
    // Filtrage
    this.filteredFaqs = this.currentCategory
      ? this.allFaqs.filter(faq => faq.category === this.currentCategory)
      : [...this.allFaqs];

    // Calculer la pagination
    const totalPages = Math.ceil(this.filteredFaqs.length / this.faqsPerPage);
    const startIndex = (this.currentPage - 1) * this.faqsPerPage;
    const endIndex = startIndex + this.faqsPerPage;
    const faqsToShow = this.filteredFaqs.slice(startIndex, endIndex);

    // Afficher les FAQs
    this.displayFaqs(faqsToShow);

    // Mettre à jour la pagination
    this.updatePagination(totalPages);
  }

  displayFaqs(faqs) {
    if (!this.faqContainer) return;

    if (faqs.length === 0) {
      this.faqContainer.innerHTML = '<p class="no-faqs">Aucune FAQ trouvée pour cette catégorie.</p>';
      return;
    }

    // Vider le conteneur
    this.faqContainer.innerHTML = '';

    // Générer le HTML pour chaque FAQ
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
      this.faqContainer.appendChild(faqItem);
    });

    // Appliquer le comportement toggle
    this.attachToggleEvents();
  }

  attachToggleEvents() {
    document.querySelectorAll('.faq__question').forEach(btn => {
      btn.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        
        // Fermer toutes les autres FAQs
        document.querySelectorAll('.faq__question').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          b.querySelector('.faq__icon').textContent = '+';
          b.parentElement.querySelector('.faq__answer').style.maxHeight = null;
        });
        
        // Ouvrir celle-ci si elle était fermée
        if (!expanded) {
          this.setAttribute('aria-expanded', 'true');
          this.querySelector('.faq__icon').textContent = '−';
          const answer = this.parentElement.querySelector('.faq__answer');
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  updatePagination(totalPages) {
    if (!this.pagination) return;

    // Afficher/masquer la pagination selon le nombre de FAQs
    if (this.filteredFaqs.length <= this.faqsPerPage) {
      this.pagination.style.display = 'none';
      return;
    }

    this.pagination.style.display = 'flex';

    // Mettre à jour les boutons
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentPage <= 1;
    }

    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentPage >= totalPages;
    }

    // Mettre à jour l'info de page
    if (this.pageInfo) {
      this.pageInfo.textContent = `Page ${this.currentPage} sur ${totalPages}`;
    }
  }
}

// Initialiser au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
  new FaqManager();
});

  
  
