//Service de Formatage des Données Analytics

// analyticsFormatter.js
import { 
    getRealtime, 
    getAggregateStats, 
    getTimeseries, 
    getTopPages, 
    getCountries 
} from "./analyticsApi.js";

/**
 * Service de formatage des données analytics
 * Transforme les données brutes de l'API en format utilisable pour le front-end
 */

/**
 * Récupère et formate les visiteurs en temps réel
 * @returns {Promise<{visitors: number}>}
 */
export async function getFormattedRealtime() {
    try {
        const data = await getRealtime();
        return {
            visitors: data.visitors || data.results?.visitors || 0
        };
    } catch (error) {
        console.error("Erreur lors du formatage des visiteurs temps réel:", error);
        return { visitors: 0 };
    }
}

/**
 * Récupère et formate les métriques agrégées
 * @param {string} period - Période (défaut: "7d")
 * @param {string} metrics - Métriques à récupérer
 * @returns {Promise<{visitors: number, pageviews: number, visits: number, bounceRate: number}>}
 */
export async function getFormattedAggregateStats(period = "7d", metrics = "visitors,pageviews,visits,bounce_rate") {
    try {
        const data = await getAggregateStats(period, metrics);
        
        // Gestion des deux formats de réponse possibles
        const results = data?.data?.results?.[0] || data?.results?.[0];
        const metricsArray = results?.metrics || [];
        const queryMetrics = data?.data?.query?.metrics || data?.query?.metrics || ["visitors", "pageviews", "visits", "bounce_rate"];
        
        // Création de l'objet formaté avec des noms de propriétés clairs
        const formattedData = {
            visitors: 0,
            pageviews: 0,
            visits: 0,
            bounceRate: 0
        };
        
        // Mapping des métriques selon l'ordre de la requête
        queryMetrics.forEach((metricName, index) => {
            const value = metricsArray[index] || 0;
            switch(metricName) {
                case 'visitors':
                    formattedData.visitors = value;
                    break;
                case 'pageviews':
                    formattedData.pageviews = value;
                    break;
                case 'visits':
                    formattedData.visits = value;
                    break;
                case 'bounce_rate':
                    formattedData.bounceRate = value;
                    break;
            }
        });
        
        return formattedData;
    } catch (error) {
        console.error("Erreur lors du formatage des métriques agrégées:", error);
        return {
            visitors: 0,
            pageviews: 0,
            visits: 0,
            bounceRate: 0
        };
    }
}

/**
 * Récupère et formate les données temporelles pour le graphique
 * @param {string} period - Période (défaut: "7d")
 * @param {string} metrics - Métriques à récupérer
 * @returns {Promise<Array<{date: string, visitors: number, formattedDate: string}>>}
 */
export async function getFormattedTimeseries(period = "7d", metrics = "visitors") {
    try {
        const data = await getTimeseries(period, metrics);
        
        // Gestion des deux formats de réponse possibles
        const results = data?.data?.results || data?.results || [];
        
        return results.map((item, index) => {
            const rawDate = item.dimensions && item.dimensions[0] ? item.dimensions[0] : null;
            const visitors = item.metrics && item.metrics[0] ? item.metrics[0] : 0;
            
            // Formatage de la date
            let formattedDate = `Jour ${index + 1}`;
            let date = rawDate;
            
            if (rawDate) {
                try {
                    const dateObj = new Date(rawDate);
                    formattedDate = dateObj.toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'short' 
                    });
                    date = rawDate;
                } catch (dateError) {
                    console.warn("Erreur lors du formatage de la date:", rawDate);
                }
            }
            
            return {
                date: date || `day-${index + 1}`,
                visitors: visitors,
                formattedDate: formattedDate
            };
        });
    } catch (error) {
        console.error("Erreur lors du formatage des données temporelles:", error);
        return [];
    }
}

/**
 * Récupère et formate les pages les plus populaires
 * @param {string} period - Période (défaut: "7d")
 * @returns {Promise<Array<{page: string, visitors: number, displayName: string}>>}
 */
export async function getFormattedTopPages(period = "7d") {
    try {
        const data = await getTopPages(period);
        
        // Gestion des deux formats de réponse possibles
        const results = data?.data?.results || data?.results || [];
        
        return results.map(item => {
            const page = item.dimensions && item.dimensions[0] ? item.dimensions[0] : 'Page inconnue';
            const visitors = item.metrics && item.metrics[0] ? item.metrics[0] : 0;
            
            // Nettoyage du nom de la page pour l'affichage
            let displayName = page;
            if (page !== 'Page inconnue') {
                // Supprime les extensions .php et nettoie le chemin
                displayName = page
                    .replace(/\.php$/, '')
                    .replace(/^\/pages\//, '')
                    .replace(/^\//, '')
                    .replace(/[_-]/g, ' ')
                    .split('/')
                    .pop() || page;
                
                // Capitalise la première lettre
                displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
            }
            
            return {
                page: page,
                visitors: visitors,
                displayName: displayName
            };
        });
    } catch (error) {
        console.error("Erreur lors du formatage des pages populaires:", error);
        return [];
    }
}

/**
 * Récupère et formate le trafic par pays
 * @param {string} period - Période (défaut: "7d")
 * @returns {Promise<Array<{country: string, visitors: number, countryCode: string}>>}
 */
export async function getFormattedCountries(period = "7d") {
    try {
        const data = await getCountries(period);
        
        // Gestion des deux formats de réponse possibles
        const results = data?.data?.results || data?.results || [];
        
        return results.map(item => {
            const country = item.dimensions && item.dimensions[0] ? item.dimensions[0] : 'Pays inconnu';
            const visitors = item.metrics && item.metrics[0] ? item.metrics[0] : 0;
            
            // Mapping des codes pays (peut être étendu selon les besoins)
            const countryCodeMap = {
                'France': 'FR',
                'United States': 'US',
                'Germany': 'DE',
                'United Kingdom': 'GB',
                'Spain': 'ES',
                'Italy': 'IT',
                'Canada': 'CA',
                'Belgium': 'BE',
                'Switzerland': 'CH',
                'Netherlands': 'NL'
            };
            
            return {
                country: country,
                visitors: visitors,
                countryCode: countryCodeMap[country] || 'XX'
            };
        });
    } catch (error) {
        console.error("Erreur lors du formatage du trafic par pays:", error);
        return [];
    }
}

/**
 * Récupère toutes les données formatées en une seule fois
 * @param {string} period - Période (défaut: "7d")
 * @returns {Promise<{realtime: Object, aggregate: Object, timeseries: Array, topPages: Array, countries: Array}>}
 */
export async function getAllFormattedData(period = "7d") {
    try {
        const [realtime, aggregate, timeseries, topPages, countries] = await Promise.all([
            getFormattedRealtime(),
            getFormattedAggregateStats(period),
            getFormattedTimeseries(period),
            getFormattedTopPages(period),
            getFormattedCountries(period)
        ]);
        
        return {
            realtime,
            aggregate,
            timeseries,
            topPages,
            countries,
            lastUpdated: new Date().toISOString()
        };
    } catch (error) {
        console.error("Erreur lors de la récupération de toutes les données:", error);
        return {
            realtime: { visitors: 0 },
            aggregate: { visitors: 0, pageviews: 0, visits: 0, bounceRate: 0 },
            timeseries: [],
            topPages: [],
            countries: [],
            lastUpdated: new Date().toISOString()
        };
    }
}

/**
 * Utilitaires de formatage
 */
export const formatters = {
    /**
     * Formate un nombre avec des séparateurs de milliers
     * @param {number} number - Nombre à formater
     * @param {string} locale - Locale (défaut: 'fr-FR')
     * @returns {string}
     */
    formatNumber: (number, locale = 'fr-FR') => {
        return number.toLocaleString(locale);
    },
    
    /**
     * Formate un pourcentage
     * @param {number} percentage - Pourcentage à formater
     * @returns {string}
     */
    formatPercentage: (percentage) => {
        return `${percentage}%`;
    },
    
    /**
     * Formate une date
     * @param {string|Date} date - Date à formater
     * @param {string} locale - Locale (défaut: 'fr-FR')
     * @returns {string}
     */
    formatDate: (date, locale = 'fr-FR') => {
        try {
            const dateObj = typeof date === 'string' ? new Date(date) : date;
            return dateObj.toLocaleDateString(locale, { 
                day: 'numeric', 
                month: 'short',
                year: 'numeric'
            });
        } catch (error) {
            return 'Date invalide';
        }
    }
};
