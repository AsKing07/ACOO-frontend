import { getIntroductionByTitle } from "../../../service/api/introductionApi.js";
import { cookiesChecker } from "../../cookies.js";
import { getVideos } from "../../../service/api/videoApi.js";

// Chargement de l'introduction "A propos de nous"

getIntroductionByTitle('A propos de nous').then(data => {
    console.log("Introduction Data fetched from API:", data);;

    const aboutUsText  = document.querySelector('.about-text');

   
        aboutUsText.textContent = data[0].description;
    
}).catch(error => {
    console.error("Error fetching introduction data:", error);
});

// Initialisation du gestionnaire de cookies
cookiesChecker();


// Vidéo du hero


function extractYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
(async function() {
    try {
        const videos = await getVideos();
        const featured = videos.find(v => v.highlighting);
        if (featured) {
            const id = extractYoutubeId(featured.videoUrl);
            if (id) {
                document.getElementById('hero-video').innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&color=white&wmode=transparent&disablekb=1&playsinline=1&enablejsapi=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="pointer-events: none;"></iframe>`;
            }
        }
    } catch (e) {
        document.getElementById('hero-video').innerHTML = '<p>Vidéo non disponible</p>';
    }
})();
