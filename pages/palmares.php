<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>Palmarès ACOO - Champions et Victoires | Aviron Club Orléans</title>
    <meta name="description" content="Découvrez le palmarès exceptionnel de l'ACOO : nos champions, leurs victoires et trophées. Plus de 140 ans de succès en aviron à Orléans.">
    <meta name="keywords" content="palmarès ACOO, champions aviron Orléans, victoires aviron, trophées club aviron, résultats compétitions aviron">
    <meta name="author" content="ACOO - Aviron Club Orléans">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://acoo.charbelsnn.com/pages/palmares.php">
    <meta property="og:title" content="Palmarès ACOO - Champions et Victoires | Aviron Club Orléans">
    <meta property="og:description" content="Découvrez le palmarès exceptionnel de l'ACOO : nos champions, leurs victoires et trophées. Plus de 140 ans de succès.">
    <meta property="og:image" content="https://acoo.charbelsnn.com/assets/images/Palmares.png">
    <meta property="og:site_name" content="ACOO - Aviron Club Orléans">
    <meta property="og:locale" content="fr_FR">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://acoo.charbelsnn.com/pages/palmares.php">
    <meta name="twitter:title" content="Palmarès ACOO - Champions et Victoires">
    <meta name="twitter:description" content="Découvrez le palmarès exceptionnel de l'ACOO : nos champions, leurs victoires et trophées.">
    <meta name="twitter:image" content="https://acoo.charbelsnn.com/assets/images/Palmares.png">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://acoo.charbelsnn.com/pages/palmares.php">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/images/Logo.png">
    <link rel="apple-touch-icon" href="../assets/images/Logo.png">
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Palmarès ACOO",
      "description": "Palmarès et champions du club d'aviron ACOO d'Orléans",
      "url": "https://acoo.charbelsnn.com/pages/palmares.php",
      "mainEntity": {
        "@type": "SportsClub",
        "name": "ACOO - Aviron Club Orléans",
        "sport": "Aviron"
      }
    }
    </script>
    
    <link rel="stylesheet" href="../css/styles.css">
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    <script defer data-domain="acoo.charbelsnn.com" src="https://plausible.io/js/script.file-downloads.outbound-links.js"></script>
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


    <section class="latest-trophies">
  <h2>Nos derniers trophés</h2>
  <div class="container" id="last-trophies-container">
    <!-- Les 3 derniers trophées seront insérés ici dynamiquement -->
  </div>
</section>

 

    <!-- Section Champions -->
    <section class="palmares-champions" id="palmares-champions">
        <h2>Nos Champions</h2>
        <div class="palmares-champions__container" id="palmares-container">
            <!-- Les cartes des champions seront insérées ici dynamiquement -->
        </div>
    </section>

    <?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>

    <!-- Scripts -->
    <script type="module" src="../script/pages/palmares.js"></script>
    <script src="../script/navbar.js"></script>
    <!-- Modale d’infos -->
<div id="palmares-modal" class="palmares-modal">
  <div class="palmares-modal__content" id="palmares-modal-content">
    <span id="palmares-modal-close" class="palmares-modal__close">&times;</span>
    <!-- Le contenu sera injecté par JS -->
  </div>
 
</div>

</body>
</html>
