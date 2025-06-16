<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    
    <link rel="stylesheet" href="../css/styles.css">
    <title>ACOO: Contact</title>
</head>
<body class="body-accueil">
<header class="header">
  <div class="header__container">
    <a href="#" class="header__logo">
      <img src="../assets/images/Logo.png" alt="Logo ACOO">
    </a>
    <nav class="header__nav">
      <a href="accueil.php">ACCUEIL</a>
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
      <a href="accueil.html">ACCUEIL</a>
      <a href="#">CLUB</a>
      <a href="#">ÉVÉNEMENTS</a>
      <a href="#">GALERIE</a>
      <a href="palmares.php">PALMARÈS</a>
      <a href="#">CONTACT</a>
    </nav>
  </div>
</header>

<div class="division-contact">
      <div class="section-information">
        <div class="information">
          <div class="text-wrapper">Informations</div>
          <p class="vous-avez-une">
            Vous avez une question, une demande d'information ou souhaitez simplement nous laisser un message ,
            contactez nous directement aux coordonnées sont ci-dessous ou remplissez le formulaire&nbsp;&nbsp;suivant.
          </p>
          <!-- Carte Google Maps intégrée -->
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620.2654133538684!2d1.927755!3d47.887483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e4f0b4bcb9313d%3A0xe7a8409a51e6b8f1!2s2575%20Rue%20de%20la%20Source%2C%2045160%20Orl%C3%A9ans%2C%20France!5e0!3m2!1sfr!2sfr!4v1716468493000!5m2!1sfr!2sfr" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <div class="div">
            <img src="../assets/images/icons/ad.png" alt="Annonce">
            <p class="p">2575 Rue de la Source, 45010 Orléans</p>
          </div>
          <div class="div">
            <img src="../assets/images/icons/ph.png" alt="Icône phone">

            <p class="p">06 27 37 26 34</p>
          </div>
          <div class="div">
            <img src="/ACOO/ACOO-frontend/assets/images/icons/mail2.png" alt="Icône mail">

            <input class="acoo-acoo-fr" placeholder="acoo@acoo.fr" type="email">
          </div>
        </div>
      </div>
      <div class="formulaire-contact">
        <div class="text-wrapper-2">CONTACTEZ-NOUS</div>
        <div class="input-field">
          <input class="value-wrapper" placeholder="Nom" type="nom">
        </div>
        <div class="input-field"><input class="value-wrapper" placeholder="Email" type="email"></div>
        <form action="traitement.php" method="POST">
          <div class="textarea-field">
            <div class="textarea">

              <textarea id="message" name="message" class="value-wrapper" placeholder="Message" required=""></textarea>
              <img class="drag" src="img/drag.svg" alt="drag icon">
            </div>
          </div>

          <button type="submit" class="bouton">
            <div class="text-wrapper-3">ENVOYER</div>
          </button>
        </form>

        <div class="frame">
          <a href="https://twitter.com/ton-compte" target="_blank">
          <img src="../assets/images/icons/x.png" alt="Icône X (Twitter)">
          </a>

          <a href="https://www.facebook.com/ton-club" target="_blank">
          <img src="../assets/images/icons/f.png" alt="Icône Facebook">
          </a>

          <a href="https://www.instagram.com/ton-compte" target="_blank">
          <img src="../assets/images/icons/i.png" alt="Icône Instagram">
          </a>

        </div>
      </div>
    </div>
  

<footer class="footer">
  <div class="footer__container">
    <div class="footer__block footer__block--club">
      <div class="footer__block-title">ACOO - Club d'aviron</div>
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
  <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" class="footer__social-link">
  <i class="fa-brands fa-facebook" aria-hidden="true"></i>
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" class="footer__social-link">
<i class="fa-brands fa-square-instagram" aria-hidden="true"></i>
  </a>
</div>
    </div>
    <div class="footer__copyright">
      ACOO x EEMI - Copyright @2025
    </div>
  </div>
</footer>

<script src="../script/navbar.js"></script>
<script src="../script/formContact.js"></script>
<script src="../script/galleryCarrousel.js"></script>
</body>
</html>