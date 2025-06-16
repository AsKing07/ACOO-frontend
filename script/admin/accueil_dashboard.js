import { showNotification } from "../showNotification.js";
import { getUser } from "../../service/api/auth.js";
import { getPlausibleStats, getPlausibleTopPages } from "../../service/api/analyticsApi.js";

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



    async function displayPlausibleStats() {
    try {
        const data = await getPlausibleStats();

        document.querySelector('.unique-users-value').textContent = data.results.visitors.value;
        document.querySelector('.total-session-value').textContent = data.results.pageviews.value;
        document.querySelector('.curent-users-value').textContent = data.results.visits.value; // Si tu as une autre source pour les utilisateurs actifs, adapte ici
        // Tu peux adapter pour d'autres métriques si besoin
    } catch (e) {
        console.error("Erreur stats Plausible :", e);
    }
}

    async function displayPlausibleTopPages() {
        try {
            const data = await getPlausibleTopPages();
            // Prépare les données pour le graphique
            const pages = data.results;
            // Ex : [{page: "/accueil", pageviews: 120}, ...]
            // Mets à jour le DOM ou le graphique ici
            updatePieChart(pages);
        } catch (e) {
            console.error("Erreur top pages Plausible :", e);
        }
    }

        // Fonction pour afficher le graphique (exemple avec Chart.js)
    function updatePieChart(pages) {
        const ctx = document.getElementById('topPagesChart').getContext('2d');
        const labels = pages.map(p => p.page);
        const values = pages.map(p => p.pageviews);
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: ['#4fc3f7', '#1976d2', '#90caf9', '#e3f2fd', '#1565c0']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

displayPlausibleStats();
displayPlausibleTopPages();


}
 initDashboardAccueil();