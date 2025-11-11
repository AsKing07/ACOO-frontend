

<footer class="footer">

  <div class="footer__container">
    <div class="footer__block footer__block--club">
      <div class="footer__block-title">ACOO - Club d’aviron</div>
      <div class="footer__block-desc">
        L'Aviron Club Orléans Olivet est une structure sportive dynamique située en région Centre-Val de Loire, qui propose la pratique de l'aviron en loisir comme en compétition. Fort de ses installations modernes et d’un encadrement qualifié, le club accueille des pratiquants de tous âges et de tous niveaux, favorisant à la fois l’apprentissage technique, le dépassement de soi et l’esprit d’équipe.
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
    <a id="footer-phone" href="tel:0671053266">06 71 05 32 66</a> <br/>
    <a id="footer-email" href="mailto:contact@club-acoo.fr">contact@club-acoo.fr</a>
  </div>
  <div class="footer__socials" id="footer-socials"></div>
  <div class="footer__contact-address">
  <span id="footer-address">
    2575 Rue de la Source, 45160 Olivet - Orléans
  </span>
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
        case 'linkedin':
          icon.classList.add('fa-linkedin');
          break;
        case 'youtube':
          icon.classList.add('fa-youtube');
          break;
        default:
          icon.classList.remove('fa-brands');
          
          icon.classList.add( 'fa-solid',  'fa-globe'); // Fallback icon
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
