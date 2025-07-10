<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>Vie du Club & Règlement Intérieur - ACOO | Aviron Club Orléans</title>
    <meta name="description" content="Découvrez la vie du club ACOO et téléchargez notre règlement intérieur. Toutes les informations sur le fonctionnement et les règles de notre club d'aviron.">
    <meta name="keywords" content="vie du club, règlement intérieur, ACOO, aviron Orléans, règles club, fonctionnement club">
    <meta name="author" content="ACOO - Aviron Club Orléans">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://acoo.charbelsnn.com/pages/reglement_interieur.php">
    <meta property="og:title" content="Vie du Club & Règlement Intérieur - ACOO">
    <meta property="og:description" content="Découvrez la vie du club ACOO et téléchargez notre règlement intérieur.">
    <meta property="og:image" content="https://acoo.charbelsnn.com/assets/images/Logo.png">
    <meta property="og:site_name" content="ACOO - Aviron Club Orléans">
    <meta property="og:locale" content="fr_FR">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://acoo.charbelsnn.com/pages/reglement_interieur.php">
    <meta name="twitter:title" content="Vie du Club & Règlement Intérieur - ACOO">
    <meta name="twitter:description" content="Découvrez la vie du club ACOO et téléchargez notre règlement intérieur.">
    <meta name="twitter:image" content="https://acoo.charbelsnn.com/assets/images/Logo.png">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://acoo.charbelsnn.com/pages/reglement_interieur.php">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/images/Logo.png">
    <link rel="apple-touch-icon" href="../assets/images/Logo.png">
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Vie du Club & Règlement Intérieur - ACOO",
      "description": "Page dédiée à la vie du club et au règlement intérieur de l'ACOO",
      "url": "https://acoo.charbelsnn.com/pages/reglement_interieur.php",
      "isPartOf": {
        "@type": "WebSite",
        "name": "ACOO - Aviron Club Orléans",
        "url": "https://acoo.charbelsnn.com/"
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

    <script defer data-domain="acoo.charbelsnn.com" src="https://plausible.io/js/script.file-downloads.outbound-links.js"></script>
</head>
<body class="body-reglement">

<?php include __DIR__ . '/../templates/components/layout/header.php'; ?>

<!-- HERO SECTION -->
<section class="reglement-hero">
    <div class="container">
        <h1 class="reglement-hero__title">Vie du Club</h1>
        <h2 class="reglement-hero__subtitle">Règlement Intérieur</h2>
    </div>
</section>

<!-- CONTENU PRINCIPAL -->
<section class="reglement-content">
    <div class="container">
        
        <!-- Section Introduction/Vie du club -->
        <div class="reglement-introduction">
            <div id="club-life-loader" class="loader" style="display: block;">
                <div class="loader__spinner"></div>
                <p>Chargement des informations...</p>
            </div>
            
            <div id="club-life-content" style="display: none;">
                <!-- Le contenu sera chargé dynamiquement via JavaScript -->
            </div>
            
            <div id="club-life-error" style="display: none;">
                <div class="error-message">
                    <div class="error-message__icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="error-message__title">Erreur de chargement</h3>
                    <p class="error-message__text">
                        Impossible de charger les informations sur la vie du club. 
                        Veuillez réessayer plus tard.
                    </p>
                </div>
            </div>
        </div>

        <!-- Section Règlement Intérieur -->
        <div class="reglement-download">
            <div class="reglement-download__content">
                <h2 class="section-title">Règlement Intérieur</h2>
                <p class="reglement-download__text">
                    Téléchargez notre règlement intérieur pour connaître toutes les règles 
                    de fonctionnement et de conduite au sein du club. Ce document est 
                    essentiel pour tous les membres et contient les informations importantes 
                    sur la vie du club.
                </p>
                <div class="reglement-download__cta">
                    <a href="../assets/docs/reglement_club.pdf" 
                       class="btn-primary" 
                       download="ACOO_Reglement_Interieur.pdf"
                       target="_blank">
                        <i class="fas fa-download"></i>
                        Télécharger le règlement intérieur
                    </a>
                </div>
            </div>
        </div>

    </div>
</section>

<!-- Footer -->
<?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>

</body>
<script src="../script/navbar.js"></script>
<script type="module" src="../script/cookies.js"></script>
<script type="module" src="../script/pages/reglement.js"></script>
</html>
