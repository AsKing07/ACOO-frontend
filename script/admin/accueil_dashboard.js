import { showNotification } from "../showNotification.js";
import { getUser } from "../../service/api/auth.js";
import { 
    getFormattedRealtime,
    getFormattedAggregateStats,
    getFormattedTimeseries,
    getFormattedTopPages,
    getFormattedCountries,
    getAllFormattedData,
    formatters
} from "../../service/api/analyticsFormatter.js";

// État global de l'application
let appState = null;

export function initDashboardAccueil() {
    console.log("Initialisation du dashboard avec les données formatées...");
    
    if(appState) {
        console.log("Une instance de dashboard existe déjà, nettoyage...");
        destroyDashboardAccueil();
    }
    
    appState = {
        isLoading: false,
        realtimeUpdateInterval: null,
        dataUpdateInterval: null,
        visitorsChart: null
    };

    // Gestion du formulaire profil
    setupProfileForm();
    
    // Chargement initial des données analytics
    loadAllAnalyticsData();
    
    // Démarrage des mises à jour automatiques
    startAutomaticUpdates();
}

/**
 * Charge toutes les données analytics (VERSION SIMPLIFIÉE)
 */
async function loadAllAnalyticsData(showLoadingIndicator = true) {
    if (showLoadingIndicator) {
        showLoading();
    }
    
    try {
        // Utilisation de la fonction getAllFormattedData pour tout charger en une fois
        const allData = await getAllFormattedData();
        
        // Mise à jour de l'interface avec les données formatées
        updateRealtimeDisplay(allData.realtime);
        updateAggregateDisplay(allData.aggregate);
        updateVisitorsChart(allData.timeseries);
        updatePagesTable(allData.topPages);
        updateCountriesTable(allData.countries);
        
        if (showLoadingIndicator) {
            setTimeout(hideLoading, 500);
        }
    } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        showNotification("Erreur lors du chargement des données analytics", "error");
        if (showLoadingIndicator) {
            hideLoading();
        }
    }
}

/**
 * Met à jour l'affichage des visiteurs en temps réel
 */
function updateRealtimeDisplay(realtimeData) {
    const element = document.getElementById('realtime-visitors');
    if (element) {
        element.textContent = formatters.formatNumber(realtimeData.visitors);
    }
}

/**
 * Met à jour l'affichage des métriques agrégées
 */
function updateAggregateDisplay(aggregateData) {
    const elements = {
        'total-visitors': aggregateData.visitors,
        'total-pageviews': aggregateData.pageviews,
        'visits': aggregateData.visits,
        'bounce-rate': aggregateData.bounceRate
    };
    
    Object.entries(elements).forEach(([elementId, value]) => {
        const element = document.getElementById(elementId);
        if (element) {
            if (elementId === 'bounce-rate') {
                element.textContent = formatters.formatPercentage(value);
            } else {
                element.textContent = formatters.formatNumber(value);
            }
        }
    });
}

/**
 * Met à jour le graphique des visiteurs (VERSION SIMPLIFIÉE)
 */
function updateVisitorsChart(timeseriesData) {
    const canvas = document.getElementById('visitors-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Détruire le graphique existant s'il existe
    if (appState.visitorsChart) {
        appState.visitorsChart.destroy();
    }
    

    const labels = timeseriesData.map(item => item.formattedDate);
    const data = timeseriesData.map(item => item.visitors);
    
    // Créer un nouveau graphique
    appState.visitorsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Visiteurs',
                data: data,
                backgroundColor: 'rgba(57, 73, 107, 0.1)',
                borderColor: 'rgba(31, 184, 205, 1)',
                borderWidth: 2,
                tension: 0.3,
                pointBackgroundColor: 'rgba(31, 184, 205, 1)',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: 'rgba(200, 200, 200, 0.5)',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 4,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return formatters.formatNumber(context.parsed.y) + ' visiteurs';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(200, 200, 200, 0.2)'
                    },
                    ticks: {
                        precision: 0,
                        callback: function(value) {
                            return formatters.formatNumber(value);
                        }
                    }
                }
            }
        }
    });
}

/**
 * Met à jour le tableau des pages populaires (VERSION SIMPLIFIÉE)
 */
function updatePagesTable(pagesData) {
    const tableBody = document.getElementById('pages-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';

    if (pagesData.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 2;
        cell.textContent = 'Aucune donnée disponible';
        cell.style.textAlign = 'center';
        cell.style.color = '#666';
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }

    pagesData.forEach(item => {
        const row = document.createElement('tr');

        // Utilisation du displayName formaté
        const pageCell = document.createElement('td');
        pageCell.textContent = item.displayName;
        pageCell.title = item.page;

        const visitorsCell = document.createElement('td');
        visitorsCell.textContent = formatters.formatNumber(item.visitors);

        row.appendChild(pageCell);
        row.appendChild(visitorsCell);
        tableBody.appendChild(row);
    });
}

/**
 * Met à jour le tableau des pays (VERSION SIMPLIFIÉE)
 */
function updateCountriesTable(countriesData) {
    const tableBody = document.getElementById('countries-table');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (countriesData.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 2;
        cell.textContent = 'Aucune donnée disponible';
        cell.style.textAlign = 'center';
        cell.style.color = '#666';
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }

    countriesData.forEach(item => {
        const row = document.createElement('tr');

        const countryCell = document.createElement('td');
        // Possibilité d'ajouter des drapeaux avec le countryCode
        countryCell.innerHTML = `
            <span class="country-flag" data-country-code="${item.countryCode}"></span>
            ${item.country}
        `;

        const visitorsCell = document.createElement('td');
        visitorsCell.textContent = formatters.formatNumber(item.visitors);

        row.appendChild(countryCell);
        row.appendChild(visitorsCell);
        tableBody.appendChild(row);
    });
}

/**
 * Récupération individuelle pour les mises à jour automatiques
 */
async function fetchRealtimeVisitors() {
    try {
        const data = await getFormattedRealtime();
        updateRealtimeDisplay(data);
    } catch (error) {
        console.error("Erreur visiteurs temps réel:", error);
        document.getElementById('realtime-visitors').textContent = '--';
    }
}

/**
 * Démarre les mises à jour automatiques
 */
function startAutomaticUpdates() {
    // D'abord, arrêter les mises à jour existantes
    stopAutomaticUpdates();
    
    console.log("Démarrage des mises à jour automatiques...");
    
    // Mise à jour des visiteurs temps réel toutes les minutes
    appState.realtimeUpdateInterval = setInterval(() => {
        fetchRealtimeVisitors();
    }, 60000);
    
    // Mise à jour complète des données toutes les 2 minutes
    appState.dataUpdateInterval = setInterval(() => {
        loadAllAnalyticsData(false);
    }, 120000);
}

/**
 * Arrête les mises à jour automatiques
 */
function stopAutomaticUpdates() {
    if (appState.realtimeUpdateInterval) {
        clearInterval(appState.realtimeUpdateInterval);
        appState.realtimeUpdateInterval = null;
    }
    if (appState.dataUpdateInterval) {
        clearInterval(appState.dataUpdateInterval);
        appState.dataUpdateInterval = null;
    }
}

/**
 * Affiche l'indicateur de chargement
 */
function showLoading() {
    appState.isLoading = true;
    const loadingElement = document.getElementById('loading-indicator');
    if (loadingElement) {
        loadingElement.classList.remove('hidden');
    }
}

/**
 * Cache l'indicateur de chargement
 */
function hideLoading() {
    appState.isLoading = false;
    const loadingElement = document.getElementById('loading-indicator');
    if (loadingElement) {
        loadingElement.classList.add('hidden');
    }
}

// Nettoyage lors de la fermeture/navigation
window.addEventListener('beforeunload', () => {
    stopAutomaticUpdates();
    if (appState.visitorsChart) {
        appState.visitorsChart.destroy();
    }
});

export function destroyDashboardAccueil() {
    console.log("Destruction du dashboard...");
    
    if (!appState) {
        console.log("Aucune instance de dashboard à nettoyer");
        return;
    }
    
    // Arrêter les mises à jour automatiques
    stopAutomaticUpdates();
    
    // Détruire le graphique
    if (appState.visitorsChart) {
        console.log("Destruction du graphique...");
        try {
            appState.visitorsChart.destroy();
        } catch (error) {
            console.error("Erreur lors de la destruction du graphique:", error);
        }
        appState.visitorsChart = null;
    }
    
    // Réinitialiser l'instance
    appState = null;
    console.log("Dashboard complètement nettoyé");
}

// Initialisation automatique
initDashboardAccueil();
