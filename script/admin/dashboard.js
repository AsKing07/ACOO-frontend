// Fonction pour charger dynamiquement une page PHP
async function loadPage(url) {
  const res = await fetch(url, { credentials: 'same-origin' });
  const html = await res.text();
  document.getElementById('dashboard-content').innerHTML = html;

  // Charger dynamiquement le script JS associé à la page

  if (url.includes('galerie.php')) {
    import('../galleryCarrousel.js');
  }
if (url.includes('faq.php')) {
  import('/script/admin/faq_dashboard.js').then(module => {
    module.initFaq(); // Exécution de l'initialisation
  });
}

  // Ajoute d'autres conditions selon les besoins
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
          case 'accueil': url = '/pages/admin/partials/accueil.php'; break;
          case 'club': url = '/pages/admin/partials/club.php'; break;
          case 'palmares': url = '/pages/admin/partials/palmares.php'; break;
          case 'partenaires': url = '/pages/admin/partials/partenaires.php'; break;
          case 'actus': url = '/pages/admin/actualites'; break;
          case 'evenements': url = '/pages/admin/events.php'; break;
          case 'galerie': url = '/pages/admin/partials/galerie.php'; break;
          case 'faq': url = '/pages/admin/faq.php'; break;
          case 'messagerie': url = '/pages/admin/partials/messagerie.php'; break;
          case 'admin': url = '/pages/admin/partials/admin.php'; break;
          default: url = '';
        }
        if(url) loadPage(url);
      });
    });




    // Déconnexion
    document.querySelector('.btn-primary').addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.href = '/pages/admin/auth/login.php';
    });