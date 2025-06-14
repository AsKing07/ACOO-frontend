// Fonction pour charger dynamiquement une page PHP
async function loadPage(url) {
  const res = await fetch(url, { credentials: 'same-origin' });
  const html = await res.text();
  document.getElementById('dashboard-content').innerHTML = html;

  // Charger dynamiquement le script JS associé à la page

  if (url.includes('galerie.php')) {
    import('/script/admin/gallerie_dahsboard.js').then(module => {
      module.initGallery(); // Exécution de l'initialisation
    });}
    // import('../galleryCarrousel.js');
  
if (url.includes('faq.php')) {
  import('/script/admin/faq_dashboard.js').then(module => {
    module.initFaq(); // Exécution de l'initialisation
  });
}

  if(url.includes('actualites.php')) {
    import('/script/admin/actualites_dashboard.js').then(module => {
      module.initActualites(); // Exécution de l'initialisation
    });
  }

    if(url.includes('admin.php'))
    {
      import('/script/admin/adminProfil_dashboard.js').then(module => {
        module.initAdminProfilDashboard(); // Exécution de l'initialisation
      });
    }

    if(url.includes('club.php')) {
      import('/script/admin/club_dahsboard.js').then(module => {
        module.initClub(); // Exécution de l'initialisation
      });
    }

    if(url.includes('partenaires.php')) {
      import('/script/admin/partenaires_dashboard.js').then(module => {
        module.initPartenairesDashboard(); // Exécution de l'initialisation
      });
    }


    if(url.includes('dashboard_accueil.php')) {
      import('/script/admin/accueil_dashboard.js').then(module => {
        module.initDashboardAccueil(); // Exécution de l'initialisation
      });
    }
    if(url.includes('events.php')) {
      import('/script/admin/events_dashboard.js').then(module => {
        module.initEventsDashboard(); // Exécution de l'initialisation
      });
    }
    if(url.includes('messagerie.php')) {
      import('/script/admin/messagerie_dahsboard.js').then(module => {
        module.initMessagerieDashboard(); // Exécution de l'initialisation
      });
    }
  if(url.includes('palmares.php')) {
    import('/script/admin/palmares_dashboard.js').then(module => {
      module.initPalmaresDashboard(); // Exécution de l'initialisation
    });
  }
  if(url.includes('partage_documents.php')) {
    import('/script/admin/partage_documents_dashboard.js').then(module => {
      module.initPartageDocumentsDashboard(); // Exécution de l'initialisation
    });
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