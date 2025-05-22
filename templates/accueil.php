<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <section>
        <header class="header">
  <div class="header__container">
    <a href="#" class="header__logo">
  
      <img src="https://charbel_sonon.etudiant.eemi.tech/acoo/images/Logo.png" alt="Logo ACOO" />
    </a>
    <nav class="header__nav">
      <a href="#">ACCUEIL</a>
      <a href="#">CLUB</a>
      <a href="#">ÉVÉNEMENTS</a>
      <a href="#">GALERIE</a>
      <a href="pages/Palmares.html">PALMARÈS</a>
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
      <a href="#">PALMARÈS</a>
      <a href="#">CONTACT</a>
    </nav>
  </div>
</header>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.header__mobile-menu');
    burger.addEventListener('click', function () {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', burger.classList.contains('active'));
    });
  });
</script>
    </section>


   <div class="video-background">
        <video autoplay muted loop>
            <source src="/images/videoplayback.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>       
        <div class="text">
            <h1>ACOO</h1>
            <p>Unis par l’aviron, portés par la passion.</p>
               <a href="#" class="">
                  <button class="btn-primary">EN SAVOIR +</button>
                </a>
        </div>
      

    </div>

 <section>

    <div class="champion-card bgNomcolor">
         <img src="../images/logo.png" alt="Illustration champion" class="event-card__image">
         <div class="event-card__content">

            <h3 class="champion-card__title">A PROPOS DU CLUB</h3>
                  <p class="champion-card__description">
                       Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.
                  </p>

                  <a href="#" class="">
                  <button class="btn-primary">EN SAVOIR +</button>
                </a>
         </div>
    </div>
 </section>

    <section class="sectiondesous">

    <div class="event-section-accueils__header">
    <h2>EVENT CARD (Page Accueil)</h2>
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

<div class="galerie-photos">
    <h2>GALERIE PHOTOS</h2>
    <div class="galerie-photos__container">
        <img src="../images/Galerie1.png" alt="Photo 1" class="galerie-photos__image">
        <img src="../images/Galerie2.png" alt="Photo 2" class="galerie-photos__image">
        <img src="../images/Galerie3.png" alt="Photo 3" class="galerie-photos__image">
    </div>
    <div class="event-section-accueil__cta">
    <button class="btn-primary">VOIR LE CALENDRIER</button>
  </div>

</div>

<footer class="footer">
    <h2 style="text-align: center;">FOOTER</h2>
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
        <div>Téléphone : 02 35 39 23 45</div>
        <div>Email : acoo@acoo.fr</div>
      </div>
    </div>
    <div class="footer__copyright">
      ACOO x EEMI - Copyright @2025
    </div>
  </div>
</footer>




</body>
</html>