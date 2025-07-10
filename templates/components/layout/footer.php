

<footer class="footer">

  <div class="footer__container">
    <div class="footer__block footer__block--club">
      <div class="footer__block-title">ACOO - Club d’aviron</div>
      <div class="footer__block-desc">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </div>
    </div>
    <div class="footer__divider"></div>
    <div class="footer__block footer__block--links">
      <div class="footer__block-title">LIENS</div>
      <nav class="footer__links">
        <a href="/pages/accueil.php">ACCUEIL</a>
        <a href="/pages/club.php#">CLUB</a>
        <a href="/pages/evenement.php">ÉVÉNEMENTS</a>
        <a href="/pages/galerie.php">GALERIE</a>
        <a href="/pages/palmares.php">PALMARÈS</a>
        <a href="/pages/contact.php">CONTACT</a>
        <a href="/assets/docs/CGU.pdf" target="_blank" rel="noopener noreferrer">CONDITIONS GÉNÉRALES</a>
      </nav>
    </div>
    <div class="footer__divider"></div>
    <div class="footer__block footer__block--contact">
  <div class="footer__block-title">CONTACT</div>
  <div class="footer__contact-list">
    <a id="footer-phone" href=""></a>
    <a id="footer-email" href=""></a>
  </div>
  <div class="footer__socials" id="footer-socials"></div>
  <div class="footer__contact-address">
  <span id="footer-address"></span>
</div>
</div>
    <div class="footer__copyright">
      ACOO x EEMI - Copyright @2025
    </div>
  </div>
</footer>

</section>


<script type="module">
  import { getContactClub } from '/service/api/contactClubApi.js';
  import { getSocialMedias } from '/service/api/socialMediasApi.js';
  import { getIntroductionByTitle } from '/service/api/introductionApi.js';

  // 📞 Chargement des infos de contact
  getContactClub().then(data => {
    console.log("Contact club Data fetched from API:", data);

    const phoneEl = document.getElementById('footer-phone');
    const emailEl = document.getElementById('footer-email');
    const addressEl = document.getElementById('footer-address');

    // Téléphone cliquable
    phoneEl.href = `tel:${data.telephone}`;
    phoneEl.textContent = data.telephone;

    // Email cliquable
    emailEl.href = `mailto:${data.email}`;
    emailEl.textContent = data.email;

    // Adresse
    addressEl.textContent = data.adresse;
  });

  // 🌐 Chargement des réseaux sociaux
  getSocialMedias().then(data => {
    console.log("Social Media Data fetched from API:", data);

    const socialMediaList = document.getElementById('footer-socials');

    data.forEach(socialMedia => {
      const a = document.createElement('a');
      a.href = socialMedia.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.ariaLabel = socialMedia.platform;
      a.classList.add('footer__social-link');

      const icon = document.createElement('i');
      icon.classList.add('fa-brands', 'footer__social-icon');

      // Détection de la plateforme
      switch (socialMedia.platform.toLowerCase()) {
        case 'facebook':
          icon.classList.add('fa-facebook');
          break;
        case 'instagram':
          icon.classList.add('fa-square-instagram');
          break;
        case 'x':
        case 'twitter':
          icon.classList.add('fa-x-twitter');
          break;
        default:
          icon.classList.add('fa-globe'); // Fallback icon
          break;
      }

      a.appendChild(icon);
      socialMediaList.appendChild(a);
    });
  });

  // 📝 Chargement de l’introduction "À propos de nous"
  getIntroductionByTitle('A propos de nous').then(data => {
    console.log("Introduction Data fetched from API:", data);

    const footerClubBlock = document.querySelector('.footer__block-desc');
    if (data.length > 0) {
      footerClubBlock.textContent = data[0].description;
    }
  }).catch(error => {
    console.error("Error fetching introduction data:", error);
  });
</script>
