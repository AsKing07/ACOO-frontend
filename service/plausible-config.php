<?php
/**
 * Configuration pour l'API Plausible intégrée
 * 
 * ⚠️ IMPORTANT : Cette configuration doit être synchronisée avec config.js
 * 
 * CONFIGURATION ACTUELLE DANS config.js :
 * - SITE_ID = "acoo.charbelsnn.com"
 * - PLAUSIBLE_API_KEY = "eWn4RufkS5Kv1iwTWLJSTXJFwTA-HMv_U45xIomzEXgl-F4Z-ygUoZHBHLfpvkRW"
 * - ANALYTICS_API_URL = "https://acoo-plausible-analytics-back.onrender.com/api/plausible" (ANCIEN - remplacé par cette API)
 * 
 * INSTRUCTIONS POUR MODIFIER LES VARIABLES :
 * 
 * 1. PLAUSIBLE_API_KEY : Votre clé API Plausible
 *    - Obtenez-la depuis votre compte Plausible : https://plausible.io/settings
 *    - ⚠️ DOIT ÊTRE IDENTIQUE à PLAUSIBLE_API_KEY dans config.js
 * 
 * 2. PLAUSIBLE_SITE_ID : L'ID de votre site dans Plausible
 *    - C'est le domaine de votre site (ex: "monsite.com")
 *    - ⚠️ DOIT ÊTRE IDENTIQUE à SITE_ID dans config.js
 * 
 * 3. Pour changer d'environnement (dev/prod) :
 *    - Modifiez les valeurs ci-dessous ET dans config.js
 *    - Gardez la synchronisation entre les deux fichiers
 * 
 * 4. SCRIPT PLAUSIBLE REQUIS DANS LES PAGES :
 *    - Ajoutez ce script dans l'en-tête (<head>) de TOUTES vos pages :
 *    <script defer data-domain="acoo.charbelsnn.com" src="https://plausible.io/js/script.js"></script>
 *    
 *    ⚠️ IMPORTANT : Le data-domain doit correspondre à PLAUSIBLE_SITE_ID ci-dessous
 *    
 *    Pour le site de production actuel :
 *    <script defer data-domain="acoo.charbelsnn.com" src="https://plausible.io/js/script.js"></script>
 */

// Configuration Plausible (synchronisée avec config.js)
define('PLAUSIBLE_API_KEY', 'nu9ezvKwk1ojXd5J-e5DA-QFkA8vTlJXDx4BlyzsDXxMdPBq_8363MI0L3SXupdm');
define('PLAUSIBLE_SITE_ID', 'acoo2.charbelsnn.com');

// URL de base de l'API (ne pas modifier sauf si Plausible change)
define('PLAUSIBLE_API_BASE_URL', 'https://plausible.io/api/v1/stats');

// Configuration optionnelle
define('API_TIMEOUT', 30); // Timeout en secondes
define('ENABLE_CACHE', false); // Cache simple (pour plus tard)
define('CACHE_DURATION', 300); // 5 minutes

/*
 * 📝 NOTES DE SYNCHRONISATION :
 * 
 * Quand vous modifiez ces variables, pensez aussi à mettre à jour :
 * - service/config.js : SITE_ID et PLAUSIBLE_API_KEY
 * 
 * Migration en cours :
 * - L'ancien ANALYTICS_API_URL dans config.js peut être supprimé
 * - Cette API PHP remplace le serveur Node.js externe
 * 
 * Vérification :
 * 1. PLAUSIBLE_API_KEY ici = PLAUSIBLE_API_KEY dans config.js ✓
 * 2. PLAUSIBLE_SITE_ID ici = SITE_ID dans config.js ✓
 * 3. Script Plausible ajouté dans <head> de toutes les pages ✓
 * 
 * EXEMPLE D'INTÉGRATION DU SCRIPT :
 * 
 * Dans vos fichiers PHP (ex: index.php, pages/*.php) :
 * <head>
 *     <title>Mon Site</title>
 *     <!-- Autres balises meta -->
 *     <script defer data-domain="acoo.charbelsnn.com" src="https://plausible.io/js/script.js"></script>
 * </head>
 * 
 * OU dans un template commun :
 * <?php echo '<script defer data-domain="' . PLAUSIBLE_SITE_ID . '" src="https://plausible.io/js/script.js"></script>'; ?>
 */
?>
