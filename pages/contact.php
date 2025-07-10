<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>Contact ACOO - Nous Contacter | Aviron Club Orléans</title>
    <meta name="description" content="Contactez l'ACOO pour toute information sur l'aviron à Orléans. Adresse, téléphone, email, horaires. FAQ et formulaire de contact disponibles.">
    <meta name="keywords" content="contact ACOO, contacter club aviron Orléans, adresse ACOO, téléphone aviron, email club, FAQ aviron">
    <meta name="author" content="ACOO - Aviron Club Orléans">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://acoo.charbelsnn.com/pages/contact.php">
    <meta property="og:title" content="Contact ACOO - Nous Contacter | Aviron Club Orléans">
    <meta property="og:description" content="Contactez l'ACOO pour toute information sur l'aviron à Orléans. Formulaire de contact et coordonnées disponibles.">
    <meta property="og:image" content="https://acoo.charbelsnn.com/assets/images/Logo.png">
    <meta property="og:site_name" content="ACOO - Aviron Club Orléans">
    <meta property="og:locale" content="fr_FR">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://acoo.charbelsnn.com/pages/contact.php">
    <meta name="twitter:title" content="Contact ACOO - Nous Contacter">
    <meta name="twitter:description" content="Contactez l'ACOO pour toute information sur l'aviron à Orléans. Formulaire de contact et coordonnées.">
    <meta name="twitter:image" content="https://acoo.charbelsnn.com/assets/images/Logo.png">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://acoo.charbelsnn.com/pages/contact.php">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/images/Logo.png">
    <link rel="apple-touch-icon" href="../assets/images/Logo.png">
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact ACOO",
      "description": "Page de contact du club d'aviron ACOO d'Orléans",
      "url": "https://acoo.charbelsnn.com/pages/contact.php",
      "mainEntity": {
        "@type": "SportsClub",
        "name": "ACOO - Aviron Club Orléans",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "2575 Rue de la Source",
          "addressLocality": "Orléans",
          "postalCode": "45160",
          "addressCountry": "FR"
        }
      }
    }
    </script>
    
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/styles.css">
    <script defer data-domain="acoo.charbelsnn.com" src="https://plausible.io/js/script.file-downloads.outbound-links.js"></script>

</head>
<body class="body-contact">
    <?php include __DIR__ . '/../templates/components/layout/header.php'; ?>
    
    <?php include __DIR__ . '/../templates/components/faq.php'; ?>
    
    <div class="division-contact">
      <div class="section-information">
        <div class="information">
          <div class="text-wrapper">Informations</div>
          <p class="vous-avez-une">
            Vous avez une question, une demande d&#39;information ou souhaitez simplement nous laisser un message ,
            contactez nous directement aux coordonnées sont ci-dessous ou remplissez le formulaire&nbsp;&nbsp;suivant.
          </p>
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620.2654133538684!2d1.927755!3d47.887483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e4f0b4bcb9313d%3A0xe7a8409a51e6b8f1!2s2575%20Rue%20de%20la%20Source%2C%2045160%20Orl%C3%A9ans%2C%20France!5e0!3m2!1sfr!2sfr!4v1716468493000!5m2!1sfr!2sfr" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <div class="div">
            <p class="p">
                <img src="../assets/images/icons/ad.png" alt="adresse">
            </p>
            <p class="acoo-acoo-fr" id="p-address"></p>
          </div>
          <div class="div">
            <p class="p">
               <img src="../assets/images/icons/ph.png" alt="Icône phone">
            </p>
            <a class="acoo-acoo-fr" href="" id="p-phone"></a>
          </div>
          <div class="div">
            <p class="p">
                <img src="../assets/images/icons/mail2.png" alt="Icône mail">
               
            </p>
            <a class="acoo-acoo-fr" href="" id="p-email"></a>
          </div>
        </div>
      </div>
      <div class="formulaire-contact">
        <div class="text-wrapper-2">CONTACTEZ-NOUS</div>
          <form class="contact-form">
            <div class="input-field">
              <label for="nom" class="sr-only">Nom</label>
              <input id="nom" class="value-wrapper" placeholder="Nom" name="name" type="text" required />
            </div>
            <div class="input-field">
              <label for="email" class="sr-only">Email</label>
              <input id="email" class="value-wrapper" placeholder="Email" name="mail" type="email" required />
            </div>
            <div class="input-field">
              <label for="sujet" class="sr-only">Sujet</label>
              <input id="sujet" class="value-wrapper" placeholder="Sujet" name="subject" type="text" required />
            </div>
            <div class="textarea-field">
              <label for="message" class="sr-only">Message</label>
              <textarea
                id="message"
                name="message"
                class="value-wrapper"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn-primary">ENVOYER</button>
          </form>

          <div class="frame" id="frame-socials">           
          </div>
        </div> 
      </div>
    </div>
</body>

    <?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>


<script src="../script/navbar.js"></script>
<script type="module" src="../script/pages/contact/faq.js"></script>
<script type="module" src="../script/pages/contact/formContact.js"></script>
<script type="module" src="../script/pages/contact/contact.js">

</script>
</body>
</html>