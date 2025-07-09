import { getIntroductionByTitle } from "../../../service/api/introductionApi.js";

getIntroductionByTitle('A propos de nous').then(data => {
    console.log("Introduction Data fetched from API:", data);;

    const aboutUsText  = document.querySelector('.about-text');

   
        aboutUsText.textContent = data[0].description;
    
}).catch(error => {
    console.error("Error fetching introduction data:", error);
});