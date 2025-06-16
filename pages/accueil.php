<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/styles.css">

    <title>ACOO: Aviron Orléans</title>
    <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MZCJ4FZG');</script>
<!-- End Google Tag Manager -->

</head>
<body class="body-accueil">
  <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MZCJ4FZG"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<?php include __DIR__ . '/../templates/components/layout/header.php'; ?>
   
<!-- HERO -->
<section class="accueil-hero">
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
</section>

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



 <!-- PROCHAINS ÉVÉNEMENTS   todo-->  
  <section class="event-section-accueil">
  <div class="event-section-accueils__header">
    <h2>PROCHAINS ÉVÉNEMENTS</h2>
  </div>
  <div class="event-section-accueil__cards">

  <?php include __DIR__ . '/../templates/components/cards/mini_event_card.php'; ?>
  <?php include __DIR__ . '/../templates/components/cards/mini_event_card.php'; ?>
  </div>
  <div class="event-section-accueil__cta">
    <button class="btn-primary">VOIR LE CALENDRIER</button>
  </div>

</section>

  <!-- GALERIE PHOTOS -->
  <?php include __DIR__ . '/../templates/components/gallery_carousel.php'; ?>





<?php include __DIR__ . '/../templates/components/formulaire/formContact.php'; ?>

<?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>




</body>
<script src="../script/navbar.js"></script>
<script src="../script/formContact.js"></script>
<script src="../script/galleryCarrousel.js"></script>
</html>