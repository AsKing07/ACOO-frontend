<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>ACOO - Aviron Club Orléans | Club d'Aviron de Loire</title>
    <meta name="description" content="Découvrez l'ACOO, le club d'aviron d'Orléans. Rejoignez-nous pour pratiquer l'aviron sur la Loire dans une ambiance conviviale. Cours pour tous niveaux, compétitions et événements.">
    <meta name="keywords" content="aviron, club aviron, Orléans, Loire, sport nautique, rame, compétition aviron, ACOO, club sportif">
    <meta name="author" content="ACOO - Aviron Club Orléans">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://club-acoo.fr/">
    <meta property="og:title" content="ACOO - Aviron Club Orléans | Club d'Aviron de Loire">
    <meta property="og:description" content="Découvrez l'ACOO, le club d'aviron d'Orléans. Rejoignez-nous pour pratiquer l'aviron sur la Loire dans une ambiance conviviale.">
    <meta property="og:image" content="https://club-acoo.fr/assets/images/Logo.png">
    <meta property="og:site_name" content="ACOO - Aviron Club Orléans">
    <meta property="og:locale" content="fr_FR">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://club-acoo.fr/">
    <meta name="twitter:title" content="ACOO - Aviron Club Orléans | Club d'Aviron de Loire">
    <meta name="twitter:description" content="Découvrez l'ACOO, le club d'aviron d'Orléans. Rejoignez-nous pour pratiquer l'aviron sur la Loire dans une ambiance conviviale.">
    <meta name="twitter:image" content="https://club-acoo.fr/assets/images/Logo.png">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://club-acoo.fr/">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/images/Logo.png">
    <link rel="apple-touch-icon" href="../assets/images/Logo.png">
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SportsClub",
      "name": "ACOO - Aviron Club Orléans Olivet",
      "alternateName": "ACOO",
      "description": "Club d'aviron situé à Orléans, pratique de l'aviron sur la Loire pour tous niveaux",
      "url": "https://club-acoo.fr/",
      "logo": "https://club-acoo.fr/assets/images/Logo.png",
      "image": "https://club-acoo.fr/assets/images/Logo.png",
      "telephone": "+33-2-38-XX-XX-XX",
      "email": "contact@club-acoo.fr",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2575 Rue de la Source",
        "addressLocality": "Orléans",
        "addressRegion": "Centre-Val de Loire",
        "postalCode": "45160",
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "47.8489",
        "longitude": "1.9092"
      },
      "sport": "Aviron",
      "sameAs": [
        "https://www.facebook.com/avironorleans",
        "https://www.instagram.com/aviron_club_orleans_olivet"
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "priceRange": "€€"
    }
    </script>
    
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Signika:wght@300..700&display=swap" rel="stylesheet">

    <title>ACOO: Aviron Orléans</title>
<script defer data-domain="club-acoo.fr" src="https://plausible.io/js/script.file-downloads.outbound-links.js"></script>

</head>
<body class="body-accueil">

<?php include __DIR__ . '/templates/components/layout/header.php'; ?>

   
<!-- HERO -->
<section class="accueil-hero">
  <div class="accueil-hero__bg">
    <div id="hero-video"></div>
  </div>
  <div class="accueil-hero__content">
    <h1 class="accueil-hero__title">Aviron Club Orléans Olivet - ACOO</h1>
    <p class="accueil-hero__subtitle">Unis par l'aviron, portés par la passion.</p>
  </div>
</section>

  <!-- À PROPOS DU CLUB -->
  <section class="about-section">
    <h2 class="section-title">A PROPOS DU CLUB</h2>
    <div class="about-section__content">
      <img src="/assets/images/Logo.png" alt="Logo ACOO" class="about-section__image">
      <div class="about-section__description">
        <p class="about-text">
            L'Aviron Club Orléans Olivet est une structure sportive dynamique située en région Centre-Val de Loire, qui propose la pratique de l'aviron en loisir comme en compétition. Fort de ses installations modernes et d’un encadrement qualifié, le club accueille des pratiquants de tous âges et de tous niveaux, favorisant à la fois l’apprentissage technique, le dépassement de soi et l’esprit d’équipe.
        </p>
        <a href="/pages/club.php" class="btn-primary">EN SAVOIR +</a>
      </div>
    </div>
  </section>



 <!-- PROCHAINS ÉVÉNEMENTS   todo-->  
  <section class="event-section-accueil">
  <div class="event-section-accueils__header">
    <h2>PROCHAINS ÉVÉNEMENTS</h2>
    <div id="event-list"></div>
  </div>
  <div class="event-section-accueil__cards" id="event-section-accueil__cards">
  </div>
  <div class="event-section-accueil__cta">
    <a href="/pages/evenement.php" class="btn-primary">VOIR LE CALENDRIER</a>
  </div>

</section>



<!-- GALERIE PHOTOS -->
<?php include __DIR__ . '/templates/components/gallery_carousel.php'; ?>
<!-- Formulaire de contact -->
<?php include __DIR__ . '/templates/components/formulaire/formContact.php'; ?>
<!-- Footer -->
<?php include __DIR__ . '/templates/components/layout/footer.php'; ?>




</body>
<script src="/script/navbar.js"></script>
<script type="module" src="/script/pages/contact/formContact.js"></script>
<script type="module" src="/script/galleryCarrousel.js"></script>
<script type="module" src="/script/pages/accueil/accueil.js"></script>
<script type="module" src="/script/pages/accueil/showEvents.js"></script>
</html>