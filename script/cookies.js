
export function cookiesChecker() {
    console.log("Initialisation du gestionnaire de cookies");
  // Fonction interne pour définir un cookie
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Fonction interne pour récupérer un cookie
  function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(cname) == 0) return c.substring(cname.length, c.length);
    }
    return "";
  }

  // Fonction interne pour créer la bannière
  function createCookieBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookies-warning';
    banner.id = 'cookieBanner';
    
    banner.innerHTML = `
      <div class="cookies-warning__text">
        Pour vous offrir une meilleure expérience, nous utilisons des cookies. Vous pouvez accepter ou refuser l'utilisation de ces cookies.
        <a href="cookies.php" target="_blank" rel="noopener noreferrer">En savoir plus</a>
      </div>
      <div class="cookies-warning__button-group">
        <button class="cookies-warning__button" id="acceptBtn">Accepter</button>
        <button class="cookies-warning__button" id="refuseBtn">Refuser</button>
      </div>
    `;
    
    document.body.appendChild(banner);
    return banner;
  }

  // Fonction interne pour vérifier le consentement
  function checkConsent() {
    const consent = getCookie("userConsent");
    console.log("Consentement actuel:", consent);
    let banner = document.getElementById("cookieBanner");
    
    if (!banner) {
      console.log("Création de la bannière cookies");
      banner = createCookieBanner();
    }
    
    if (consent === "accepted" || consent === "refused") {
      banner.classList.add("cookies-warning--hidden");
      console.log("Bannière masquée car consentement déjà donné");
    } else {
      banner.classList.remove("cookies-warning--hidden");
      console.log("Bannière affichée car pas de consentement");
    }
  }

  // Fonction interne pour configurer les événements
  function setupEventListeners() {
    // Utiliser un délai pour s'assurer que les éléments sont dans le DOM
    setTimeout(() => {
      const acceptBtn = document.getElementById("acceptBtn");
      const refuseBtn = document.getElementById("refuseBtn");
      const cookieBanner = document.getElementById("cookieBanner");
      
      if (acceptBtn) {
        acceptBtn.addEventListener("click", function() {
          setCookie("userConsent", "accepted", 365);
          if (cookieBanner) {
            cookieBanner.classList.add("cookies-warning--hidden");
          }
          console.log("Cookies acceptés");
        });
      }

      if (refuseBtn) {
        refuseBtn.addEventListener("click", function() {
          setCookie("userConsent", "refused", 365);
          if (cookieBanner) {
            cookieBanner.classList.add("cookies-warning--hidden");
          }
          console.log("Cookies refusés");
        });
      }
    }, 0);
  }

  // Exécution de la logique principale
  checkConsent();
  setupEventListeners();
}
