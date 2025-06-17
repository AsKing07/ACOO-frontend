// Configuration des modules pour éviter la répétition
const PAGE_MODULES = {
    'galerie.php': {
        path: '/script/admin/gallerie_dahsboard.js',
        initFunction: 'initGallery',
        destroyFunction: 'destroyGallery'
    },
    'faq.php': {
        path: '/script/admin/faq_dashboard.js',
        initFunction: 'initFaq',
        destroyFunction: 'destroyFaq'
    },
    'actualites.php': {
        path: '/script/admin/actualites_dashboard.js',
        initFunction: 'initActualites',
        destroyFunction: 'destroyActualites'
    },
    'admin.php': {
        path: '/script/admin/adminProfil_dashboard.js',
        initFunction: 'initAdminProfilDashboard',
        destroyFunction: 'destroyAdminProfilDashboard'
    },
    'club.php': {
        path: '/script/admin/club_dahsboard.js',
        initFunction: 'initClub',
        destroyFunction: 'destroyClub'
    },
    'partenaires.php': {
        path: '/script/admin/partenaires_dashboard.js',
        initFunction: 'initPartenairesDashboard',
        destroyFunction: 'destroyPartenairesDashboard'
    },
    'dashboard-accueil.php': {
        path: '/script/admin/accueil_dashboard.js',
        initFunction: 'initDashboardAccueil',
        destroyFunction: 'destroyDashboardAccueil'
    },
    'events.php': {
        path: '/script/admin/events_dashboard.js',
        initFunction: 'initEventsDashboard',
        destroyFunction: 'destroyEventsDashboard'
    },
    'messagerie.php': {
        path: '/script/admin/messagerie_dahsboard.js',
        initFunction: 'initMessagerieDashboard',
        destroyFunction: 'destroyMessagerieDashboard'
    },
    'palmares.php': {
        path: '/script/admin/palmares_dashboard.js',
        initFunction: 'initPalmaresDashboard',
        destroyFunction: 'destroyPalmaresDashboard'
    },
    'partage_documents.php': {
        path: '/script/admin/partage_documents_dashboard.js',
        initFunction: 'initPartageDocumentsDashboard',
        destroyFunction: 'destroyPartageDocumentsDashboard'
    }
};

let currentCleanup = null;
let isPageLoading = false;

/**
 * Nettoie la page précédente avec gestion d'erreurs complète
 */
async function cleanupPreviousPage() {
    if (!currentCleanup) {
        console.log('Aucune fonction de nettoyage disponible');
        return;
    }

    if (typeof currentCleanup !== 'function') {
        console.warn('currentCleanup n\'est pas une fonction valide:', typeof currentCleanup);
        currentCleanup = null;
        return;
    }

    try {
        console.log('🧹 Exécution du nettoyage de la page précédente...');
        
        // Vérifier si c'est une fonction asynchrone
        const result = currentCleanup();
        if (result && typeof result.then === 'function') {
            await result;
            console.log('✅ Nettoyage asynchrone terminé avec succès');
        } else {
            console.log('✅ Nettoyage synchrone terminé avec succès');
        }
    } catch (error) {
        console.error('❌ Erreur pendant le nettoyage de la page précédente:', error);
        // Continuer malgré l'erreur pour ne pas bloquer la navigation
    } finally {
        // Toujours réinitialiser currentCleanup
        currentCleanup = null;
        console.log('🔄 Référence de nettoyage réinitialisée');
    }
}

/**
 * Charge le contenu HTML de la page
 */
async function fetchPageContent(url) {
    console.log(`📄 Chargement du contenu HTML pour: ${url}`);
    
    try {
        const res = await fetch(url, { 
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Cache-Control': 'no-cache'
            }
        });

        if (!res.ok) {
            throw new Error(`Erreur HTTP: ${res.status} ${res.statusText}`);
        }

        const html = await res.text();
        
        if (!html || html.trim().length === 0) {
            throw new Error('Contenu HTML vide reçu du serveur');
        }

        console.log('✅ Contenu HTML chargé avec succès');
        return html;
    } catch (error) {
        console.error('❌ Erreur lors du chargement du contenu HTML:', error);
        throw error;
    }
}

/**
 * Charge et initialise le module JavaScript associé à la page
 */
async function loadPageModule(url) {
    // Trouver la configuration du module correspondant
    const moduleConfig = Object.entries(PAGE_MODULES).find(([pagePattern, config]) => 
        url.includes(pagePattern)
    );

    if (!moduleConfig) {
        console.log('ℹ️ Aucun module JavaScript requis pour cette page');
        return;
    }

    const [pagePattern, config] = moduleConfig;
    console.log(`🔧 Chargement du module pour: ${pagePattern}`);

    try {
        // Import du module avec gestion d'erreur
        console.log(`📦 Import du module: ${config.path}`);
        const module = await import(config.path);

        if (!module) {
            throw new Error('Module importé est null ou undefined');
        }

        // Vérifier et exécuter la fonction d'initialisation
        if (typeof module[config.initFunction] === 'function') {
            console.log(`🚀 Initialisation: ${config.initFunction}()`);
            
            // Exécuter l'initialisation (peut être sync ou async)
            const initResult = module[config.initFunction]();
            if (initResult && typeof initResult.then === 'function') {
                await initResult;
                console.log('✅ Initialisation asynchrone terminée');
            } else {
                console.log('✅ Initialisation synchrone terminée');
            }
        } else {
            console.warn(`⚠️ Fonction d'initialisation '${config.initFunction}' introuvable dans le module`);
        }

        // Configurer la fonction de nettoyage
        if (typeof module[config.destroyFunction] === 'function') {
            console.log(`🔗 Configuration de la fonction de nettoyage: ${config.destroyFunction}`);
            currentCleanup = module[config.destroyFunction];
        } else {
            console.warn(`⚠️ Fonction de nettoyage '${config.destroyFunction}' introuvable dans le module`);
            currentCleanup = null;
        }

    } catch (error) {
        console.error(`❌ Erreur lors du chargement du module pour ${pagePattern}:`, error);
        currentCleanup = null;
        
        // Ne pas faire échouer complètement le chargement de la page
        // si seul le module JavaScript a des problèmes
        console.log('⚠️ La page sera affichée sans fonctionnalités JavaScript');
    }
}

/**
 * Met à jour le contenu DOM avec le nouveau HTML
 */
function updatePageContent(html) {
    try {
        const contentElement = document.getElementById('dashboard-content');
        
        if (!contentElement) {
            throw new Error('Élément #dashboard-content introuvable dans le DOM');
        }

        console.log('🔄 Mise à jour du contenu DOM...');
        contentElement.innerHTML = html;
        console.log('✅ Contenu DOM mis à jour avec succès');
        
    } catch (error) {
        console.error('❌ Erreur lors de la mise à jour du DOM:', error);
        throw error;
    }
}

/**
 * Affiche une page d'erreur en cas de problème
 */
function showErrorPage(error, url) {
    const contentElement = document.getElementById('dashboard-content');
    if (contentElement) {
        contentElement.innerHTML = `
            <div class="error-container" style="padding: 2rem; text-align: center; background: #f8f9fa; border-radius: 8px; margin: 1rem;">
                <h2 style="color: #dc3545; margin-bottom: 1rem;">❌ Erreur de chargement</h2>
                <p style="color: #6c757d; margin-bottom: 1rem;">
                    Impossible de charger la page: <strong>${url}</strong>
                </p>
                <p style="color: #6c757d; margin-bottom: 1.5rem;">
                    Détails: ${error.message}
                </p>
                <button 
                    onclick="location.reload()" 
                    style="background: #007bff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;"
                >
                    🔄 Recharger la page
                </button>
            </div>
        `;
    }
}

/**
 * Fonction principale de chargement de page - Version complètement refactorisée
 */
async function loadPage(url) {
    // Prévenir les appels simultanés
    if (isPageLoading) {
        console.warn('⚠️ Chargement de page déjà en cours, annulation de cette demande');
        return;
    }

    isPageLoading = true;
    console.log(`🌐 === DÉBUT DU CHARGEMENT DE PAGE: ${url} ===`);
    
    try {
        // Étape 1: Nettoyer la page précédente
        await cleanupPreviousPage();
        
        // Étape 2: Charger le contenu HTML
        const html = await fetchPageContent(url);
        
        // Étape 3: Mettre à jour le DOM
        updatePageContent(html);
        
        // Étape 4: Charger et initialiser le module JavaScript
        await loadPageModule(url);
        
        console.log(`✅ === CHARGEMENT DE PAGE TERMINÉ: ${url} ===`);
        
    } catch (error) {
        console.error(`❌ === ÉCHEC DU CHARGEMENT DE PAGE: ${url} ===`, error);
        showErrorPage(error, url);
    } finally {
        isPageLoading = false;
    }
}

















    // Sélection des éléments du menu de la sidebar
    document.querySelectorAll('.container_nav_pages li, .container_nav_system li').forEach(item => {
      item.addEventListener('click', function() {
         // Retire la classe active de tous les items
    document.querySelectorAll('.container_nav_pages li, .container_nav_system li').forEach(li => li.classList.remove('active'));
    // Ajoute la classe active à l'item cliqué
    this.classList.add('active');

    const page = this.querySelector('span').textContent.trim().toLowerCase();
    let url = '';
        switch(page) {
          case 'accueil': url = '/pages/admin/dashboard-accueil.php'; break;
          case 'club': url = '/pages/admin/club.php'; break;
          case 'palmares': url = '/pages/admin/palmares.php'; break;
          case 'partenaires': url = '/pages/admin/partenaires.php'; break;
          case 'actus': url = '/pages/admin/actualites.php'; break;
          case 'evenements': url = '/pages/admin/events.php'; break;
          case 'galerie': url = '/pages/admin/gallerie.php'; break;
          case 'faq': url = '/pages/admin/faq.php'; break;
          case 'messagerie': url = '/pages/admin/messagerie.php'; break;
          case 'admin': url = '/pages/admin/admin.php'; break;
          case 'partage de documents': url = '/pages/admin/partage_documents.php'; break;
          default: url = '/pages/admin/dashboard-accueil.php';
        }
        if(url) loadPage(url);
      });
    });




    // Déconnexion
    document.querySelector('.btn-primary').addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.href = '/pages/admin/auth/login.php';
    });