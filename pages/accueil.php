<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/styles.css">

    <title>ACOO: Aviron Orléans</title>

</head>
<body class="body-accueil">
<header class="header">
  <div class="header__container">
    <a href="#" class="header__logo">
  
      <img src="../assets/images/Logo.png" alt="Logo ACOO" />
    </a>
    <nav class="header__nav">
      <a href="#">ACCUEIL</a>
      <a href="#">CLUB</a>
      <a href="#">ÉVÉNEMENTS</a>
      <a href="#">GALERIE</a>
      <a href="palmares.php">PALMARÈS</a>
      <a href="#">CONTACT</a>
    </nav>
    <button class="header__burger" aria-label="Menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
  <div class="header__mobile-menu">
    <nav>
      <a href="#">ACCUEIL</a>
      <a href="#">CLUB</a>
      <a href="#">ÉVÉNEMENTS</a>
      <a href="#">GALERIE</a>
      <a href="palmares.html">PALMARÈS</a>
      <a href="#">CONTACT</a>
    </nav>
  </div>
</header>
   
<!-- HERO -->
<header class="accueil-hero">
  <div class="accueil-hero__bg">
    <video  autoplay muted loop playsinline>
      <source src="../assets/videos/videoplayback.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
  <div class="accueil-hero__content">
    <h1 class="accueil-hero__title">ACOO</h1>
    <p class="accueil-hero__subtitle">Unis par l’aviron, portés par la passion.</p>
    <a href="#" class="btn-primary">EN SAVOIR +</a>
  </div>
</header>

  <!-- À PROPOS DU CLUB -->
  <section class="about-section">
    <h2 class="section-title">A PROPOS DU CLUB</h2>
    <div class="about-section__content">
      <img src="../assets/images/Logo.png" alt="Logo ACOO" class="about-section__image">
      <div class="about-section__text">
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <a href="#" class="btn-primary">EN SAVOIR +</a>
      </div>
    </div>
  </section>



 <!-- PROCHAINS ÉVÉNEMENTS  --> 
  <section class="event-section-accueil">
  <div class="event-section-accueils__header">
    <h2>PROCHAINS ÉVÉNEMENTS</h2>
  </div>
  <div class="event-section-accueil__cards">
    <div class="event-mini-card">
      <div class="event-mini-card__date">
        <span class="event-mini-card__day">6</span>
        <span class="event-mini-card__month">JUIN</span>
      </div>
      <div class="event-mini-card__divider"></div>
      <div class="event-mini-card__content">
        <div class="event-mini-card__title">Lorem Ipsum</div>
        <div class="event-mini-card__desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
      </div>
    </div>
    <div class="event-mini-card">
      <div class="event-mini-card__date">
        <span class="event-mini-card__day">6</span>
        <span class="event-mini-card__month">JUIN</span>
      </div>
      <div class="event-mini-card__divider"></div>
      <div class="event-mini-card__content">
        <div class="event-mini-card__title">Lorem Ipsum</div>
        <div class="event-mini-card__desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
      </div>
    </div>
  </div>
  <div class="event-section-accueil__cta">
    <button class="btn-primary">VOIR LE CALENDRIER</button>
  </div>

    


</section>

  <!-- GALERIE PHOTOS -->
  <section class="gallery-section">
    <h2 class="section-title">GALERIE PHOTOS</h2>
    <div class="gallery-section__container">
      <button class="gallery-section__nav gallery-section__nav--prev" aria-label="Précédent"></button>
      <img src="../assets/images/Galerie1.png" alt="Photo 1" class="gallery-section__image">
      <img src="../assets/images/Galerie2.png" alt="Photo 2" class="gallery-section__image">
      <img src="../assets/images/Galerie3.png" alt="Photo 3" class="gallery-section__image">
      <button class="gallery-section__nav gallery-section__nav--next" aria-label="Suivant"></button>
    </div>
    <div class="gallery-section__cta">
      <a href="#" class="btn-primary">VOIR +</a>
    </div>
  </section>

  <section class="form-section">
  <div class="form-section__header">
    <h2>CONTACTEZ-NOUS</h2>
  </div>
  <form class="contact-form form" autocomplete="off">
       <div class="form__group">
      <input type="text" id="nom" class="form__input" placeholder=" " required>
      <label for="nom" class="form__label">Nom</label>
    </div>
    <div class="form__group">
        <input type="email" class="form__input" placeholder=" " required>
        <label class="form__label">Email</label>
      </div>
      <div class="form__group">
        <textarea class="form__input form__textarea" placeholder=" " required></textarea>
        <label class="form__label">Message</label>
      </div>
       <div class="form__cta">
        <button type="submit" class="btn-primary">ENVOYER</button>
      </div>

  </form>
  </section>

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
        <a href="./palmares.php">PALMARÈS</a>
        <a href="#">CONTACT</a>
      </nav>
    </div>
    <div class="footer__divider"></div>
    <div class="footer__block footer__block--contact">
      <div class="footer__block-title">CONTACT</div>
      <div class="footer__contact-list">
        <div>Téléphone : 02 35 39 23 45</div>
        <div>Email : acoo@acoo.fr</div>
      </div>
     
                 <div class="footer__socials">
  <a  href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" class="footer__social-link">
  <i class="fa-brands fa-facebook"></i>
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" class="footer__social-link">
<i class="fa-brands fa-square-instagram"></i>
  </a>
</div>
    </div>
    <div class="footer__copyright">
      ACOO x EEMI - Copyright @2025
    </div>
  </div>
</footer>




</body>
<script src="../script/navbar.js"></script>
<script src="../script/formContact.js"></script>
<script src="../script/galleryCarrousel.js"></script>
</html>