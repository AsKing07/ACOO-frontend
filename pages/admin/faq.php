<main class="faq-dashboard">
  <div class="faq-dashboard__header">
    <h1>FAQ</h1>
    <button class="btn-primary" id="reload-faqs-btn">
        <i class="fas fa-sync-alt"></i> Recharger
    </button>
    <button class="btn btn-primary" id="add-faq-btn">Ajouter une FAQ</button>
  </div>
  <div class="faq-dashboard__filter">
  <label for="faq-category-filter">Filtrer par catégorie :</label>
  <select id="faq-category-filter">
    <option value="">Toutes</option>
    <!-- Les catégories seront injectées ici -->
  </select>
</div>
  <div id="faq-loader" style="display:none;text-align:center;margin:2rem 0;">
  <span class="loader"></span>
</div>
  <div class="faq-dashboard__list" id="faq-list">
    <!-- Les FAQs seront injectées ici -->
  </div>

  <!-- Modal Ajout/Modification -->
  <div class="modal" id="faq-modal" style="display:none;">
    <div class="modal-content">
      <span class="modal-close" id="close-faq-modal">&times;</span>
      <h2 id="modal-title">Ajouter une FAQ</h2>
      <div class="form-section">
        <form id="faq-form" class="form">
        <input type="hidden" id="faq-id">
        <div class="form__group">
            <input class="form__input" placeholder="" type="text" id="faq-question" name="question" required>
            <label class="form__label" for="faq-question">Question</label>
        </div>
        <div class="form__group">
            <textarea class="form__textarea form__input" placeholder=""  id="faq-answer" name="answer" required></textarea>
          <label class="form__label" for="faq-answer">Réponse</label>
         
        </div>
       
            <div class="form__group">

              <select id="faq-category-select" class="form__input form__select" name="category">
    <!-- Les catégories seront injectées ici -->
      <option value="" disabled selected hidden>Choisissez...</option>
    <option value="__new__">Créer une nouvelle catégorie…</option>
  </select>


              <label  class="form__label" for="faq-category-select">Catégorie</label>
            </div>
<div class="form__group ">
    <input class="form__input" type="text" id="faq-category-new" placeholder="Nouvelle catégorie" style="display:none;">
</div>


        <div class="form__cta">
        <button type="submit" class="btn-primary" id="faq-submit-btn">Enregistrer</button>


        </div>
      </form>
      </div>
      
    </div>
  </div>

  <!-- Modal Suppression -->
  <div class="modal" id="delete-modal" style="display:none;">
    <div class="modal-content">
      <span class="modal-close" id="close-delete-modal">&times;</span>
      <h2>Supprimer la FAQ</h2>
      <p>Voulez-vous vraiment supprimer cette FAQ ?</p>
      <button class="btn btn-danger" id="confirm-delete-btn">Supprimer</button>
      <button class="btn" id="cancel-delete-btn">Annuler</button>
    </div>
  </div>
</main>