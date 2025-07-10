


// === BURGER MENU ===
const burgerBtn = document.querySelector('.burger-toggle');
const sidebar = document.querySelector('.container_sidebar');

burgerBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});


// === CONFIGURATION DES MODULES ===
const PAGE_MODULES = {
    'gallerie.php': {
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
        path: '/script/admin/event_dashboard.js',
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
    'informations.php': {
        path: '/script/admin/informations_dashboard.js',
        initFunction: 'initInformationsDashboard',
        destroyFunction: 'destroyInformationsDashboard'
    },
    'equipes.php': {
        path: '/script/admin/equipes_dashboard.js',
        initFunction: 'initEquipesDashboard',
        destroyFunction: 'destroyEquipesDashboard'
    },
    'video.php': {
        path: '/script/admin/video_dashboard.js',
        initFunction: 'initVideos',
        destroyFunction: null
    },

    
};

let currentCleanup = null;
let isPageLoading = false;

// === NETTOYAGE ===
async function cleanupPreviousPage() {
  if (!currentCleanup || typeof currentCleanup !== 'function') {
    currentCleanup = null;
    return;
  }
  try {
    const result = currentCleanup();
    if (result && typeof result.then === 'function') await result;
  } catch (e) {
    console.error('Erreur nettoyage:', e);
  } finally {
    currentCleanup = null;
  }
}

// === CHARGEMENT HTML ===
async function fetchPageContent(url) {
  const res = await fetch(url, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'text/html,application/xhtml+xml',
      'Cache-Control': 'no-cache',
    },
  });

  if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
  return await res.text();
}

// === MODULE JS PAR PAGE ===
async function loadPageModule(url) {
  const moduleConfig = Object.entries(PAGE_MODULES).find(([key]) => url.includes(key));
  if (!moduleConfig) return;

  const [, config] = moduleConfig;
  try {
    const module = await import(config.path);
    if (module[config.initFunction]) await module[config.initFunction]();
    if (module[config.destroyFunction]) currentCleanup = module[config.destroyFunction];
  } catch (e) {
    console.error(`Erreur module ${config.path}:`, e);
    currentCleanup = null;
  }
}

// === MISE À JOUR DOM ===
function updatePageContent(html) {
  const contentElement = document.getElementById('dashboard-content');
  if (!contentElement) throw new Error('#dashboard-content introuvable');
  contentElement.innerHTML = html;
}

// === ERREUR AFFICHAGE ===
function showErrorPage(error, url) {
  const contentElement = document.getElementById('dashboard-content');
  if (contentElement) {
    contentElement.innerHTML = `
      <div style="padding:2rem;text-align:center">
        <h2>❌ Erreur lors du chargement de : ${url}</h2>
        <p>${error.message}</p>
        <button onclick="location.reload()">🔄 Recharger</button>
      </div>
    `;
  }
}

// === CHARGEMENT GLOBAL DE PAGE ===
async function loadPage(url) {
  if (isPageLoading) return;
  isPageLoading = true;

  try {
    await cleanupPreviousPage();
    const html = await fetchPageContent(url);
    updatePageContent(html);
    await loadPageModule(url);
  } catch (err) {
    showErrorPage(err, url);
  } finally {
    isPageLoading = false;
  }
}

// === LIENS DU MENU (Pages & Système) ===
document.querySelectorAll('.container_nav_pages li, .container_nav_system li').forEach(item => {
  item.addEventListener('click', function () {
    // Gestion active
    document.querySelectorAll('.container_nav_pages li, .container_nav_system li').forEach(li => li.classList.remove('active'));
    this.classList.add('active');

    // Déterminer URL
    const page = this.querySelector('span').textContent.trim().toLowerCase();
    let url = '';
    switch (page) {
      case 'accueil': url = '/pages/admin/dashboard-accueil.php'; break;
      case 'club': url = '/pages/admin/club.php'; break;
      case 'informations': url = '/pages/admin/informations.php'; break;
      case 'palmares': url = '/pages/admin/palmares.php'; break;
      case 'partenaires': url = '/pages/admin/partenaires.php'; break;
      case 'actus': url = '/pages/admin/actualites.php'; break;
      case 'evenements': url = '/pages/admin/events.php'; break;
      case 'galerie': url = '/pages/admin/gallerie.php'; break;
          case 'vidéo': url = '/pages/admin/video.php'; break;
      case 'faq': url = '/pages/admin/faq.php'; break;
      case 'messagerie': url = '/pages/admin/messagerie.php'; break;
      case 'admin': url = '/pages/admin/admin.php'; break;
      case 'equipes': url = '/pages/admin/equipes.php'; break;
      default: url = '/pages/admin/dashboard-accueil.php';
    }

    if (url) loadPage(url);

    // 🔒 Ferme le menu si mobile
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('active');
    }
  });
});


// === DÉCONNEXION ===
document.querySelector('.btn-primary').addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = '/pages/admin/auth/login.php';
});