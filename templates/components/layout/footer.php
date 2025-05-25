

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

  getContactClub().then(data => {
          console.log("Data fetched from API:", data);

    document.getElementById('footer-phone').textContent = data.telephone;
    document.getElementById('footer-email').textContent = data.email;
    document.getElementById('footer-address').textContent = data.adresse;
    document.getElementById('footer-socials').innerHTML = `
      <a href="${data.facebook}" target="_blank" rel="noopener" aria-label="Facebook" class="footer__social-link">
        <i class="fa-brands fa-facebook"></i>
      </a>
      <a href="${data.instagram}" target="_blank" rel="noopener" aria-label="Instagram" class="footer__social-link">
        <i class="fa-brands fa-square-instagram"></i>
      </a>
    `;
  });
</script>