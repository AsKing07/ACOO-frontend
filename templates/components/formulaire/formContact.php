  <!-- Contact form -->
  <section class="form-section">
  <div class="form-section__header">
    <h2>CONTACTEZ-NOUS</h2>
  </div>
  <form class="contact-form form" autocomplete="off">
       <div class="form__group">
      <input name="name" type="text" id="nom" class="form__input" placeholder=" " required>
      <label for="nom" class="form__label">Nom</label>
    </div>
    <div class="form__group">
        <input name="mail" type="email" class="form__input" placeholder=" " required>
        <label class="form__label">Email</label>
      </div>
      <div class="form__group">
        <textarea name="subject" class="form__input form__textarea" placeholder=" " required></textarea>
        <label class="form__label">Sujet</label>
      </div>
      <div class="form__group">
        <textarea name="message" class="form__input form__textarea" placeholder=" " required></textarea>
        <label class="form__label">Message</label>
      </div>
       <div class="form__cta">
        <button type="submit" class="btn-primary">ENVOYER</button>
      </div>

  </form>
  </section>

  <script src="../../../script/formContact.js"></script>