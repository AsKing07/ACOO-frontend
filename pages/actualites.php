<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="../css/styles.css">

    <title>ACOO: Nos actualités</title>
</head>
<body class="body-actualites">
    <?php include __DIR__ . '/../templates/components/layout/header.php'; ?>

    <!-- HERO -->
    <section class="actualites-hero">
        <div class="actualites-hero__bg">
            <video autoplay muted loop playsinline>
                <source src="../assets/videos/videoplayback.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="actualites-hero__content">
            <h1 class="actualites-hero__title">NOS ACTUALITÉS</h1>
            <p class="actualites-hero__subtitle">Restez informé de toutes nos actualités.</p>
        </div>
    </section>

    <!-- NEWSLETTERS -->
    <section class="newsletters-section">
        <div class="newsletters-section__header">
            <h2>NEWSLETTERS</h2>
        </div>
        <div class="newsletters-section__content">
            <p>Retrouvez sur cette page les newsletters publiées par l'ACOO.</p>
            <p>Des photos, des suggestions de publications ou des témoignages ? N'hésitez pas à contacter le club ou le groupe communication de l'ACOO.</p>
            <div class="newsletters-section__card">
                  <?php include __DIR__ . '/../templates/components/cards/event_card.php'; ?>
                  <?php include __DIR__ . '/../templates/components/cards/event_card.php'; ?>
            </div>
        </div>

        <div class="newsletters-section__suggestion">
            <h3>Une suggestion ?</h3>
            <?php include __DIR__ . '/../templates/components/formulaire/formContact.php'; ?>
        </div>
    </section>


        
       

    

    
</body>
</html>

