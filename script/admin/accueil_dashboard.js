import { showNotification } from "../showNotification.js";
import { getUser } from "../../service/api/auth.js";

export function initDashboardAccueil() {
    // Ici sera le code JavaScript pour gérer le tableau de bord d'accueil
    // showNotification("La page d'accueil du tableau de board est en cours de développement.", "info");

    getUser().then(user => {
        if (user) {
          document.getElementById('email').value = user.email || '';
          document.getElementById('username').value = user.username || '';
          document.getElementById('telephone').value = user.phone || '';
          document.getElementById('address').value = user.address || '';
        } else {
            console.log("Aucun utilisateur connecté.");
        }
    }).catch(error => {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
    });


    //Navigate to the admin profile page
    document.getElementById("form-dashboard-profil").addEventListener("submit", async function(event) {
        event.preventDefault();
 document.querySelectorAll('.container_nav_pages li, .container_nav_system li').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector('.container_nav_system li#container_nav_system_admin').classList.add('active');


         const res = await fetch('/pages/admin/admin.php', { credentials: 'same-origin' });
        const html = await res.text();
        document.getElementById('dashboard-content').innerHTML = html;
        // Charger dynamiquement le script JS associé à la page
        import('/script/admin/adminProfil_dashboard.js').then(module => {
            module.initAdminProfilDashboard(); // Exécution de l'initialisation
        });
    });




}
 initDashboardAccueil();