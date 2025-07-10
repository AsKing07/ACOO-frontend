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
            <p class="acoo-acoo-fr" id="p-address"></p>
          </div>
          <div class="div">
            <p class="p">
               <img src="../assets/images/icons/ph.png" alt="Icône phone">
            </p>
            <p class="acoo-acoo-fr" id="p-phone"></p>
          </div>
          <div class="div">
            <p class="p">
                <img src="../assets/images/icons/mail2.png" alt="Icône mail">
               
            </p>
            <p class="acoo-acoo-fr" id="p-email"></p>
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
<script type="module" src="../script/faq.js"></script>
<script type="module" src="../script/formContact.js"></script>
<script type="module">
  import { getContactClub } from '../service/api/contactClubApi.js';
  import { getSocialMedias} from '../service/api/socialMediasApi.js';

  getContactClub().then(data => {
          console.log("Contact club Data fetched from API:", data);

    document.getElementById('p-phone').textContent = data.telephone;
    document.getElementById('p-email').textContent = data.email;
    document.getElementById('p-address').textContent = data.adresse;
  });
  getSocialMedias().then(data => {
    console.log("Social Media Data fetched from API:", data);

  const socialMediaList = document.getElementById('frame-socials');

data.forEach(socialMedia =>{
  const a = document.createElement('a');
  a.href = socialMedia.url;
  a.target = '_blank';
  a.rel = 'noopener';
  a.ariaLabel = socialMedia.platform;
  a.classList.add('footer__social-link');

  const icon = document.createElement('i');
  icon.src = socialMedia.iconUrl;

  icon.classList.add('fa-brands');
  switch (socialMedia.platform.toLowerCase()) {
    case 'facebook':
      icon.classList.add('fa-facebook');
      break;
    case 'instagram':
      icon.classList.add('fa-square-instagram');
      break;
    case 'x':
      icon.classList.add('fa-x');
      break;
    default:
      icon.classList.add('fa-globe'); // Default icon for other platforms
      break;
  }



  icon.alt = socialMedia.platform;
  icon.classList.add('footer__social-icon');

  a.appendChild(icon);
  socialMediaList.appendChild(a);

})
  });
</script>
</body>
</html>