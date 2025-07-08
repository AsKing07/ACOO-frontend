//Traitement des introductions récupérées

import { getGalleryByName } from "../../service/api/galleryApi.js";
import { getIntroductionByTitle } from "../../service/api/introductionApi.js";
import{ getStaff } from '../../service/api/staffApi.js';

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
