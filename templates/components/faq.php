<section class="faq-section">
  <h2 class="faq-section__title">FAQ</h2>
  
  <!-- Filtre par catégorie -->
  <div class="faq-filters">
    <div class="faq-filter-group">
      <label for="faq-category-filter">Filtrer par catégorie :</label>
      <select id="faq-category-filter" class="faq-filter-select">
        <option value="">Toutes les catégories</option>
        <!-- Les catégories seront injectées ici -->
      </select>
    </div>
  </div>

  <!-- Conteneur des FAQs -->
  <div class="faq" id="faq-container"></div>
  
  <!-- Pagination -->
  <div class="faq-pagination" id="faq-pagination" style="display: none;">
    <button id="faq-prev-btn" class="pagination-btn">Précédent</button>
    <span id="faq-page-info" class="page-info"></span>
    <button id="faq-next-btn" class="pagination-btn">Suivant</button>
  </div>
</section>
