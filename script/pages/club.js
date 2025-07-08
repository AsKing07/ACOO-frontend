//Traitement des introductions récupérées

import { getGalleryByName } from "../../service/api/galleryApi.js";
import { getIntroductionByTitle } from "../../service/api/introductionApi.js";
import{ getStaff } from '../../service/api/staffApi.js';
import { getSports } from "../../service/api/sportApi.js";
import { getPartenaires } from "../../service/api/partenairesApi.js";

//console.log("Bonjour club");

getGalleryByName('Nos Locaux')
  .then(data => {
    if (!data || data.length === 0) {
      //console.warn("Aucune galerie trouvée avec ce nom.");
      return;
    }

    const tableauPicture = data[0].pictures; // ou .images si ton champ s'appelle comme ça
    //console.log("Voici les images de la galerie :", tableauPicture);

    const carrousel = document.querySelector('.carousel-track');

    
    if(tableauPicture.length != 0){
        // 🧼 On vide d'abord le carrousel
        carrousel.innerHTML = "";
    }
    
    tableauPicture.forEach(element => {
      const img = document.createElement('img');
      img.src = element.image;                         // URL de l'image
      img.alt = element.description || 'Image de la galerie'; // Texte alternatif
      carrousel.appendChild(img);
    });
    
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données :", error);
  });

getIntroductionByTitle('Histoire du club')
    .then(data =>{ 
        //console.log("Introduction trouvé: ", data);
        const container = document.querySelector('#presentation');
        container.innerHTML = `${data[0].description}`;
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
    });

getStaff()
  .then(data =>{
      console.log('Voici les données récupéré concernant les personnels: ', data);
      const container = document.querySelector('.container_equipe');
      const personnels = data ;

      if(data.length != 0){
        container.innerHTML = '';
      }
      
      personnels.forEach(personnel =>{

        let box = document.createElement('div');
        box.className = "container_card";
        container.appendChild(box);

        let imageBox = document.createElement('div');
        imageBox.className = 'container_img';
        box.appendChild(imageBox);

        let image = document.createElement('img');
        image.src = personnel.image
        imageBox.appendChild(image);

        let infoBox = document.createElement('div');
        infoBox.className ="container_info";
        
        let prenomNom = document.createElement('h4');
        prenomNom.innerText = personnel.name;
        infoBox.appendChild(prenomNom);

        
        let role = document.createElement('span');
        role.innerText = personnel.role;
        infoBox.appendChild(role);
        
        let mail = document.createElement('span');
        mail.innerText = personnel.mail;
        infoBox.appendChild(mail);
        box.appendChild(infoBox);
        
      })
  })
  .catch(error => {
      console.error("Erreur lors de la récupération des données :", error);
  });


getSports()
  .then( data =>{
    console.log("Les Sports proposé au seins de ACOO :",data);
    const container = document.querySelector('#carousel');
    const Sports = data ;

    if(data.length != 0){
      container.innerHTML = '';
    }

    Sports.forEach(sport =>{
      let box = document.createElement('div');
        box.className = "aviron-item";
        container.appendChild(box);

      let image = document.createElement('img');
      image.src = sport.images[0];
      box.appendChild(image);

      let span = document.createElement('span');
      span.className = "aviron-title";
      span.innerText = sport.name;
      box.appendChild(span);
    })

   
    const leftBtn = document.querySelector('.carousel-btn.left');
    const rightBtn = document.querySelector('.carousel-btn.right');

    const hasEnoughChildren = container.children.length > 5;

    const display = hasEnoughChildren ? 'block' : 'none';
    leftBtn.style.display = display;
    rightBtn.style.display = display;

  })
  .catch(error => {
      console.error("Erreur lors de la récupération des données :", error);
  });

getPartenaires()
   .then(dataList => {
    console.log("Partenaires trouvés :", dataList);

    const sponsorsContainer = document.querySelector('.sponsors-gallery');
    const partenairesContainer = document.querySelector('.partenaire-gallery');

   
    sponsorsContainer.innerHTML = '';
    partenairesContainer.innerHTML = '';

    dataList.forEach(data => {
     
      const img = document.createElement('img');
      img.src = data.image;
      img.alt = 'Logo';
      img.classList.add('logo');

      let elementToAdd;
      if (data.url) {
        const link = document.createElement('a');
        link.href = data.url;
        link.target = '_blank';
        link.appendChild(img);
        elementToAdd = link;
      } else {
        elementToAdd = img;
      }

      if (data.sponsor === true) {
        sponsorsContainer.appendChild(elementToAdd);
      } else if (data.sponsor === false) {
        partenairesContainer.appendChild(elementToAdd);
      }
    });
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données :", error);
  });
