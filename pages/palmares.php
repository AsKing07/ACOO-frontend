<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACOO : Notre palmares</title>
    <link rel="stylesheet" href="../css/styles.css">
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
</head>


<body class="body-palmares">
 <header class="header">
  <div class="header__container">
    <a href="#" class="header__logo">
  
      <img src="../assets/images/Logo.png" alt="Logo ACOO" />
    </a>
    <nav class="header__nav">
      <a href="accueil.php">ACCUEIL</a>
      <a href="#">CLUB</a>
      <a href="#">ÉVÉNEMENTS</a>
      <a href="#">GALERIE</a>
      <a href="#">PALMARÈS</a>
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
      <a href="accueil.html">ACCUEIL</a>
      <a href="#">CLUB</a>
      <a href="#">ÉVÉNEMENTS</a>
      <a href="#">GALERIE</a>
      <a href="#">PALMARÈS</a>
      <a href="#">CONTACT</a>
    </nav>
  </div>
</header>

  <!-- Bannière avec image et titre -->
  <section class="palmares-hero">
    <img src="../assets/images/Palmares.png" alt="Champions" class="palmares-hero__img">
    <div class="palmares-hero__overlay">
      <img src="../assets/images/Logo.png" alt="Logo ACOO" class="palmares-hero__logo">
      <div class="palmares-hero__text">
        <h1>GALERIE DE CHAMPIONS</h1>
        <p>Les succès qui forgent notre légende</p>
      </div>
    </div>
  </section>

  <!-- Section Trophées -->
  <section class="palmares-trophees">
    <h2>Trophées</h2>
    <div class="palmares-trophees__content">
      <div class="palmares-trophees__card">
        <img src="../assets/images/trophees.png" alt="Trophées">
        <!-- <div class="palmares-trophees__label">TROPHÉES</div> -->
      </div>
     <div class="palmares-trophees__champion">
  <div class="palmares-trophees__video-wrapper">
    <iframe
      src="https://www.youtube.com/embed/SLultu3tZcU?si=vgxUnwyotM30nDXs"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  </div>
</div>
    </div>
    <div class="palmares-trophees__cta">
      <button class="btn-primary">Découvrir le calendrier</button>
    </div>
  </section>

  <!-- Section Champion Cards -->
  <section class="palmares-champions">
    <!-- Répète ce bloc pour chaque champion -->
    <div class="champion-card">
      <img src="../assets/images/champion1.png" alt="Champion" class="champion-card__image">
      <div class="champion-card__content">
        <h3 class="champion-card__title">Hervé RANCIR</h3>
        <p class="champion-card__description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
        <button class="btn-primary">EN SAVOIR +</button>
      </div>
    </div>
    <div class="champion-card">
      <img src="../assets/images/champion1.png" alt="Champion" class="champion-card__image">
      <div class="champion-card__content">
        <h3 class="champion-card__title">Hervé RANCIR</h3>
        <p class="champion-card__description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
        <button class="btn-primary">EN SAVOIR +</button>
      </div>
    </div>

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
        <a href="./accueil.php">ACCUEIL</a>
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
</html>