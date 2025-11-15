<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>Inscription - ACOO | Rejoignez notre Club d'Aviron à Orléans</title>
    <meta name="description" content="Rejoignez l'ACOO ! Découvrez nos équipes d'aviron et inscrivez-vous dans notre club d'Orléans. Téléchargez notre guide d'inscription et commencez votre aventure sur la Loire.">
    <meta name="keywords" content="inscription aviron, club aviron Orléans, équipes aviron, s'inscrire ACOO, guide inscription, aviron Loire">
    <meta name="author" content="ACOO - Aviron Club Orléans">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://club-acoo.fr/pages/inscription.php">
    <meta property="og:title" content="Inscription - ACOO | Rejoignez notre Club d'Aviron à Orléans">
    <meta property="og:description" content="Rejoignez l'ACOO ! Découvrez nos équipes d'aviron et inscrivez-vous dans notre club d'Orléans.">
    <meta property="og:image" content="https://club-acoo.fr/assets/images/Logo.png">
    <meta property="og:site_name" content="ACOO - Aviron Club Orléans">
    <meta property="og:locale" content="fr_FR">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://club-acoo.fr/pages/inscription.php">
    <meta name="twitter:title" content="Inscription - ACOO | Rejoignez notre Club d'Aviron à Orléans">
    <meta name="twitter:description" content="Rejoignez l'ACOO ! Découvrez nos équipes d'aviron et inscrivez-vous dans notre club d'Orléans.">
    <meta name="twitter:image" content="https://club-acoo.fr/assets/images/Logo.png">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://club-acoo.fr/pages/inscription.php">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/images/Logo.png">
    <link rel="apple-touch-icon" href="../assets/images/Logo.png">
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Inscription - ACOO",
      "description": "Page d'inscription au club d'aviron ACOO d'Orléans",
      "url": "https://club-acoo.fr/pages/inscription.php",
      "isPartOf": {
        "@type": "WebSite",
        "name": "ACOO - Aviron Club Orléans",
        "url": "https://club-acoo.fr/"
      },
      "about": {
        "@type": "SportsClub",
        "name": "ACOO - Aviron Club Orléans",
        "sport": "Aviron"
      }
    }
    </script>
    
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Signika:wght@300..700&display=swap" rel="stylesheet">

    <script defer data-domain="club-acoo.fr" src="https://plausible.io/js/script.file-downloads.outbound-links.js"></script>
</head>
<body class="body-inscription">

<?php include __DIR__ . '/../templates/components/layout/header.php'; ?>

<!-- HERO SECTION -->
<section class="inscription-hero">
    <div class="container">
        <h1 class="inscription-hero__title">Rejoignez l'ACOO</h1>
        <p class="inscription-hero__subtitle">Découvrez notre guide d'inscription et la liste de nos équipes et commencez votre aventure sur la Loire</p>
    </div>
</section>

<main>
    <!-- INTRODUCTION -->
<section class="inscription-intro">
    <div class="container">
        <div class="inscription-intro__content">
            <h2 class="section-title">Pourquoi nous rejoindre ?</h2>
            <p class="inscription-intro__text">
                L'ACOO vous offre l'opportunité de découvrir l'aviron dans un cadre exceptionnel sur les bords de Loire. 
                Que vous soyez débutant ou confirmé, nos équipes sauront vous accueillir et vous accompagner dans votre progression. 
                Rejoignez une communauté passionnée qui partage les valeurs de dépassement de soi, d'esprit d'équipe et de respect de l'environnement.
            </p>
            <p class="inscription-intro__text">
                Notre club propose des créneaux adaptés à tous les niveaux et tous les âges. De l'initiation à la compétition, 
                en passant par l'aviron loisir, chacun trouvera sa place au sein de nos différentes équipes.
            </p>
        </div>
    </div>
</section>

<!-- GUIDE D'INSCRIPTION -->
<section class="inscription-guide">
    <div class="container">
        <div class="inscription-guide__content">
            <h2 class="section-title">Guide d'inscription</h2>
            <p class="inscription-guide__text">
                Téléchargez notre guide d'inscription complet pour connaître toutes les modalités, 
                les tarifs et les pièces à fournir pour rejoindre l'ACOO.
            </p>
            <div class="inscription-guide__cta">
                <a href="../assets/docs/guide_inscription.pdf" 
                   class="btn-primary" 
                   download="ACOO_Guide_Inscription.pdf"
                   target="_blank">
                    <i class="fas fa-download"></i>
                    Télécharger le guide d'inscription
                </a>
            </div>
        </div>
    </div>
</section>

<!-- NOS ÉQUIPES -->
<section class="inscription-teams">
    <div class="container">
        <h2 class="section-title">Nos Équipes</h2>
        <div class="teams-grid" id="teams-container">
            <!-- Les équipes seront chargées dynamiquement via JavaScript -->
            <div class="loader" id="teams-loader">
                <div class="loader__spinner"></div>
                <p>Chargement des équipes...</p>
            </div>
        </div>
    </div>
</section>


</main>


<!-- CONTACT -->
<section class="inscription-contact">
    <div class="container">
        <div class="inscription-contact__content">
            <h2 class="section-title">Une question ?</h2>
            <p class="inscription-contact__text">
                Notre équipe est à votre disposition pour répondre à toutes vos questions concernant l'inscription.
            </p>
            <div class="inscription-contact__cta">
                <a href="contact.php" class="btn-secondary">
                    <i class="fas fa-envelope"></i>
                    Nous contacter
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Footer -->
<?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>

</body>
<script src="../script/navbar.js"></script>
<script type="module" src="../script/cookies.js"></script>
<script type="module" src="../script/pages/inscription.js"></script>
</html>