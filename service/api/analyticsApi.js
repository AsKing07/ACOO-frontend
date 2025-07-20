import { PLAUSIBLE_API_KEY, SITE_ID } from "../config.js"

// URL de l'API PHP intégrée (remplace le serveur Node.js externe)
const PHP_API_URL = window.location.origin + "service/api/plausible/plausible.php";

// Configuration pour les headers d'authentification
const getHeaders = () => ({
    "Authorization": `Bearer ${PLAUSIBLE_API_KEY}`, // Remplacez par votre système d'auth
    "Content-Type": "application/json"
});

/**
 * Récupère les visiteurs en temps réel
 */
export async function getRealtime() {
    const url = `${PHP_API_URL}?endpoint=realtime&site_id=${SITE_ID}`;
    const res = await fetch(url, {
        headers: getHeaders()
    });
    if (!res.ok) throw new Error("Erreur lors de la récupération des visiteurs temps réel");
    return res.json();
}

/**
 * Récupère les métriques agrégées (visiteurs, pages vues, etc.)
 */
export async function getAggregateStats( period = "7d", metrics = "visitors,pageviews,visits,bounce_rate") {
    const url = `${PHP_API_URL}?endpoint=aggregate&site_id=${SITE_ID}&period=${period}&metrics=${metrics}`;
    const res = await fetch(url, {
        headers: getHeaders()
    });
    if (!res.ok) throw new Error("Erreur lors de la récupération des stats agrégées");
    return res.json();
}

/**
 * Récupère les données temporelles pour le graphique
 */
export async function getTimeseries( period = "7d", metrics = "visitors") {
    const url = `${PHP_API_URL}?endpoint=timeseries&site_id=${SITE_ID}&period=${period}&metrics=${metrics}&dimensions=time:day`;
    const res = await fetch(url, {
        headers: getHeaders()
    });
    if (!res.ok) throw new Error("Erreur lors de la récupération des données temporelles");
    return res.json();
}

/**
 * Récupère les pages les plus populaires
 */
export async function getTopPages( period = "7d") {
    const url = `${PHP_API_URL}?endpoint=breakdown&dimensions=event:page&site_id=${SITE_ID}&period=${period}&metrics=visitors`;
    const res = await fetch(url, {
        headers: getHeaders()
    });
    if (!res.ok) throw new Error("Erreur lors de la récupération des pages populaires");
    return res.json();
}

/**
 * Récupère le trafic par pays
 */
export async function getCountries( period = "7d") {
    const url = `${PHP_API_URL}?endpoint=breakdown&dimensions=visit:country_name&site_id=${SITE_ID}&period=${period}&metrics=visitors`;
    const res = await fetch(url, {
        headers: getHeaders()
    });
    if (!res.ok) throw new Error("Erreur lors de la récupération du trafic par pays");
    return res.json();
}

/**
 * Teste la connexion à l'API
 */
export async function testConnection() {
    const url = `${PHP_API_URL}?endpoint=test-connection`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ api_key: PLAUSIBLE_API_KEY, site_id: SITE_ID})
    });
    if (!res.ok) throw new Error("Erreur lors du test de connexion");
    return res.json();
}