<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACOO : Notre palmarès</title>
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
