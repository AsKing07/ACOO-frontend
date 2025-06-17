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
<?php include __DIR__ . '/../templates/components/layout/header.php'; ?>


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
    <?php include __DIR__ . '/../templates/components/cards/champion_card.php'; ?>
    <?php include __DIR__ . '/../templates/components/cards/champion_card.php'; ?>
  
  </section>
  
<?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>
</body>
<script src="../script/navbar.js"></script>
<script src="../script/formContact.js"></script>
<script src="../script/galleryCarrousel.js"></script>
</html>