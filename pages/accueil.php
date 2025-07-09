<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/styles.css">

    <title>ACOO: Aviron Orléans</title>
<script defer data-domain="acoo.charbelsnn.com" src="https://plausible.io/js/script.file-downloads.outbound-links.js"></script>

</head>
<body class="body-accueil">

<?php include __DIR__ . '/../templates/components/layout/header.php'; ?>

   
<!-- HERO -->
<section class="accueil-hero">
  <div class="accueil-hero__bg">
    <div id="hero-video"></div>
  </div>
  <div class="accueil-hero__content">
    <h1 class="accueil-hero__title">ACOO</h1>
    <p class="accueil-hero__subtitle">Unis par l'aviron, portés par la passion.</p>
    <a href="#" class="btn-primary">EN SAVOIR +</a>
  </div>
</section>

  <!-- À PROPOS DU CLUB -->
  <section class="about-section">
    <h2 class="section-title">A PROPOS DU CLUB</h2>
    <div class="about-section__content">
      <img src="../assets/images/Logo.png" alt="Logo ACOO" class="about-section__image">
      <div class="about-section__description">
        <p class="about-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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
<!-- Formulaire de contact -->
<?php include __DIR__ . '/../templates/components/formulaire/formContact.php'; ?>
<!-- Footer -->
<?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>




</body>
<script src="../script/navbar.js"></script>
<script src="../script/formContact.js"></script>
<script type="module" src="../script/galleryCarrousel.js"></script>
<script type="module">
import { getVideos } from '../service/api/videoApi.js';
function extractYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
(async function() {
    try {
        const videos = await getVideos();
        const featured = videos.find(v => v.highlighting);
        if (featured) {
            const id = extractYoutubeId(featured.videoUrl);
            if (id) {
                document.getElementById('hero-video').innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&color=white&wmode=transparent" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            }
        }
    } catch (e) {
        document.getElementById('hero-video').innerHTML = '<p>Vidéo non disponible</p>';
    }
})();
</script>
<script type="module" src="../script/pages/accueil.js"></script>
</html>