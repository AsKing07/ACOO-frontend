import { cookiesChecker } from "../../cookies.js";


  import { getContactClub } from "../../../service/api/contactClubApi.js";
  import { getSocialMedias} from '../../../service/api/socialMediasApi.js';

  getContactClub().then(data => {
          console.log("Contact club Data fetched from API:", data);

    const telEl = document.getElementById('p-phone');
    telEl.textContent = data.telephone;
    telEl.href = `tel:${data.telephone}`;
    const email = document.getElementById('p-email');
    email.textContent = data.email;
    email.href = `mailto:${data.email}`;
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


// Initialisation du gestionnaire de cookies
cookiesChecker();