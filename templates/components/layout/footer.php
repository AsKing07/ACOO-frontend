

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
        <a href="#">ACCUEIL</a>
        <a href="#">CLUB</a>
        <a href="#">ÉVÉNEMENTS</a>
        <a href="#">GALERIE</a>
        <a href="#">PALMARÈS</a>
        <a href="#">CONTACT</a>
      </nav>
    </div>
    <div class="footer__divider"></div>
    <div class="footer__block footer__block--contact">
  <div class="footer__block-title">CONTACT</div>
  <div class="footer__contact-list">
    <div>Téléphone : <span id="footer-phone"></span></div>
    <div>Email : <span id="footer-email"></span></div>
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
  import { getSocialMedias} from '/service/api/socialMediasApi.js';
  import { getIntroductionByTitle} from '/service/api/introductionApi.js';



  getContactClub().then(data => {
          console.log("Contact club Data fetched from API:", data);

    document.getElementById('footer-phone').textContent = data.telephone;
    document.getElementById('footer-email').textContent = data.email;
    document.getElementById('footer-address').textContent = data.adresse;


  });
  getSocialMedias().then(data => {
    console.log("Social Media Data fetched from API:", data);

const socialMediaList = document.getElementById('footer-socials');

data.forEach(socialMedia =>{
  const a = document.createElement('a');
  a.href = socialMedia.url;
  a.target = '_blank';
  a.rel = 'noopener';
  a.ariaLabel = socialMedia.platform;
  a.classList.add('footer__social-link');

  const icon = document.createElement('i');
  icon.src = socialMedia.iconUrl;

  icon.classList.add('fa-brands');
  switch (socialMedia.platform.toLowerCase()) {
    case 'facebook':
      icon.classList.add('fa-facebook');
      break;
    case 'instagram':
      icon.classList.add('fa-square-instagram');
      break;
    case 'x':
      icon.classList.add('fa-x');
      break;
    default:
      icon.classList.add('fa-globe'); // Default icon for other platforms
      break;
  }



  icon.alt = socialMedia.platform;
  icon.classList.add('footer__social-icon');

  a.appendChild(icon);
  socialMediaList.appendChild(a);

})

  });


getIntroductionByTitle('A propos de nous').then(data => {
  console.log("Introduction Data fetched from API:", data);

  const footerClubBlock = document.querySelector('.footer__block-desc');
  footerClubBlock.textContent = data[0].description;
}).catch(error => {
  console.error("Error fetching introduction data:", error);
});
</script>