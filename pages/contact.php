<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    
    <link rel="stylesheet" href="../css/styles.css">
    <title>ACOO: Contact</title>
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
            <input class="acoo-acoo-fr" placeholder="2575 Rue de la Source, 45010 Orléans" type="adresse" />
          </div>
          <div class="div">
            <p class="p">
               <img src="../assets/images/icons/ph.png" alt="Icône phone">
            </p>
            <input class="acoo-acoo-fr" placeholder="06 27 37 26 34" type="telephone" />
          </div>
          <div class="div">
            <p class="p">
                <img src="../assets/images/icons/mail2.png" alt="Icône mail">
               
            </p>
            <input class="acoo-acoo-fr" placeholder="acoo@acoo.fr" type="email" />
          </div>
        </div>
      </div>
      <div class="formulaire-contact">
        <div class="text-wrapper-2">CONTACTEZ-NOUS</div>
          <form class="contact-form">
            <div class="input-field">
              <div class="input-field"><input class="value-wrapper" name="name" placeholder="Nom" type="text" /></div>
            </div>
            <div class="input-field"><input class="value-wrapper" name="mail" placeholder="Email" type="email" /></div>
            <div class="textarea-field">
              <textarea class="value-wrapper" name="subject" placeholder="Sujet" required></textarea>
            </div>
            <div class="textarea-field">
              <textarea class="value-wrapper" name="message" placeholder="Message" required></textarea>
            </div>
            <button type="submit" class="btn-primary">ENVOYER</button>
           </form>
          <div class="frame">
            <a href="https://twitter.com/ton-compte" target="_blank">
            <img src="../assets/images/icons/x.png" alt="Icône X (Twitter)">
            </a>

            <a href="https://www.facebook.com/ton-club" target="_blank">
            <img src="../assets/images/icons/f.png" alt="Icône Facebook">
            </a>

            <a href="https://www.instagram.com/ton-compte" target="_blank">
            <img src="../assets/images/icons/i.png" alt="Icône Instagram">
            </a>
          </div>
        </div> 
      </div>
    </div>
</body>

    <?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>


<script src="../script/navbar.js"></script>
<script type="module" src="../script/faq.js"></script>
<script type="module" src="../script/formContact.js"></script>
<script src="../script/galleryCarrousel.js"></script>
</body>
</html>