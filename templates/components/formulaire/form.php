
<section class="form-section">
  <div class="form-section__header">
    <h2>FORMULAIRE TEMPLATE</h2>
  </div>
  <form class="form" autocomplete="off">
    <div class="form__group">
      <input type="text" id="nom" class="form__input" placeholder=" " required>
      <label for="nom" class="form__label">Nom</label>
    </div>
    <div class="form__group">
      <input type="email" id="email" class="form__input" placeholder=" " required>
      <label for="email" class="form__label">Email</label>
    </div>
    <div class="form__group">
      <input type="search" id="recherche" class="form__input form__input--search" placeholder=" " required>
      <label for="recherche" class="form__label">Recherche</label>
    </div>
    <div class="form__group">
      <select id="choix" class="form__input form__select" required>
        <option value="" disabled selected hidden>Choisissez...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <label for="choix" class="form__label">Choix</label>
    </div>
    <div class="form__group">
      <textarea id="message" class="form__input form__textarea" placeholder=" " required></textarea>
      <label for="message" class="form__label">Message</label>
    </div>
    <button type="submit" class="btn-primary">ENVOYER</button>
  </form>
</section>



