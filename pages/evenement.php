<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- SEO Meta Tags -->
    <title>Calendrier des Événements ACOO - Compétitions & Entraînements | Aviron Orléans Olivet</title>
    <meta name="description" content="Consultez le calendrier complet des événements, compétitions et entraînements de l'ACOO. Restez informé de toutes nos activités d'aviron à Orléans-Olivet.">
    <meta name="keywords" content="calendrier aviron, événements ACOO, compétitions aviron Orléans, entraînements aviron, agenda club aviron, planning aviron">
    <meta name="author" content="ACOO - Aviron Club Orléans Olivet">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <meta name="googlebot" content="index, follow">
    <meta name="theme-color" content="#1a4d8f">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://club-acoo.fr/pages/evenement.php">
    <meta property="og:title" content="Calendrier des Événements ACOO | Aviron Orléans Olivet">
    <meta property="og:description" content="Consultez le calendrier complet des événements, compétitions et entraînements de l'ACOO.">
    <meta property="og:image" content="https://club-acoo.fr/assets/images/Logo.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="ACOO - Aviron Club Orléans Olivet">
    <meta property="og:locale" content="fr_FR">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@aviron_acoo">
    <meta name="twitter:creator" content="@aviron_acoo">
    <meta name="twitter:url" content="https://club-acoo.fr/pages/evenement.php">
    <meta name="twitter:title" content="Calendrier des Événements ACOO">
    <meta name="twitter:description" content="Calendrier des événements, compétitions et entraînements de l'ACOO.">
    <meta name="twitter:image" content="https://club-acoo.fr/assets/images/Logo.png">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://club-acoo.fr/pages/evenement.php">
    
    <!-- Alternate languages -->
    <link rel="alternate" hreflang="fr" href="https://club-acoo.fr/pages/evenement.php">
    <link rel="alternate" hreflang="x-default" href="https://club-acoo.fr/pages/evenement.php">
    
    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://plausible.io">
    <link rel="dns-prefetch" href="https://kit.fontawesome.com">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/images/Logo.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/images/Logo.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../assets/images/Logo.png">
    <link rel="manifest" href="../site.webmanifest">
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EventSchedule",
      "name": "Calendrier des Événements ACOO",
      "description": "Calendrier des événements et compétitions du club d'aviron ACOO",
      "url": "https://club-acoo.fr/pages/evenement.php",
      "organizer": {
        "@type": "SportsClub",
        "name": "ACOO - Aviron Club Orléans Olivet",
        "sameAs": [
          "https://www.facebook.com/avironorleans",
          "https://www.instagram.com/aviron_club_orleans_olivet"
        ]
      }
    }
    </script>
    
    <!-- BreadcrumbList Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://club-acoo.fr/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Événements",
          "item": "https://club-acoo.fr/pages/evenement.php"
        }
      ]
    }
    </script>
    
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/styles.css">
    
    <!-- Plausible Analytics -->
    <script defer data-domain="club-acoo.fr" src="https://plausible.io/js/script.file-downloads.outbound-links.js"></script>
</head>

<body class="body-evenement" itemscope itemtype="https://schema.org/WebPage">
    <?php include_once __DIR__ . '/../templates/components/layout/header.php'; ?>
    
    <section id="evenement_page">
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-calendar-alt"></i>
                Calendrier des Événements
            </h1>
            <p class="page-subtitle">Découvrez tous nos événements et entraînements</p>
        </div>

        <!-- Contrôles améliorés -->
        <div class="calendar-controls">
            <div class="controls-left">
                <button class="btn-today" id="today-btn">
                    <i class="fas fa-calendar-day"></i>
                    Aujourd'hui
                </button>
                <button class="btn-refresh" id="refresh-btn">
                    <i class="fas fa-sync-alt"></i>
                    Actualiser
                </button>
            </div>
            <div class="controls-right">
                <select id="sport-filter" class="filter-select">
                    <option value="">Tous les sports</option>
                </select>
                <select id="type-filter" class="filter-select">
                    <option value="">Tous les types</option>
                    <option value="event">Événements ponctuels</option>
                    <option value="recurring">Entraînements réguliers</option>
                    <option value="exception">Modifications/Annulations</option>
                </select>
                <button class="btn-view-toggle" id="toggle-view-btn" title="Basculer entre vue calendrier et liste">
                    <i class="fas fa-list"></i>
                </button>
            </div>
        </div>

        <!-- Statistiques -->
        <div class="calendar-stats">
            <div class="stat-item">
                <div class="stat-number" id="events-count">0</div>
                <div class="stat-label">Événements</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="recurring-count">0</div>
                <div class="stat-label">Entraînements</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="exceptions-count">0</div>
                <div class="stat-label">Exceptions</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="filtered-count">0</div>
                <div class="stat-label">Affichés</div>
            </div>
        </div>

        <!-- Légende améliorée -->
        <div class="calendar-legend">
            <div class="legend-item">
                <span class="legend-color event-color"></span>
                <span class="legend-text">Événements ponctuels</span>
            </div>
            <div class="legend-item">
                <span class="legend-color recurring-color"></span>
                <span class="legend-text">Entraînements réguliers</span>
            </div>
            <div class="legend-item">
                <span class="legend-color exception-color"></span>
                <span class="legend-text">Modifications/Annulations</span>
            </div>
            <div class="legend-item">
                <span class="legend-color today-color"></span>
                <span class="legend-text">Aujourd'hui</span>
            </div>
        </div>

        <!-- Loader -->
        <div class="calendar-loader" id="calendar-loader" style="display: none;">
            <div class="loader-spinner"></div>
            <p>Chargement du calendrier...</p>
        </div>

        <!-- Calendrier principal -->
        <div class="calendar-container" id="calendar-view">
            <div class="calendar">
                <div class="header-calendar">
                    <button class="nav-btn" id="prev-btn">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="month" id="month-display">JUILLET<br>2025</div>
                    <button class="nav-btn" id="next-btn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="day-names">
                    <div>LUNDI</div>
                    <div>MARDI</div>
                    <div>MERCREDI</div>
                    <div>JEUDI</div>
                    <div>VENDREDI</div>
                    <div>SAMEDI</div>
                    <div>DIMANCHE</div>
                </div>
                <div class="grid-calendar" id="calendar-grid">
                    <!-- Le contenu sera généré dynamiquement -->
                </div>
            </div>
        </div>

        <!-- Vue liste améliorée -->
        <div class="list-view-container" id="list-view" style="display: none;">
            <div class="list-view-header">
                <h3><i class="fas fa-list"></i> Liste des événements</h3>
                <div class="list-view-controls">
                    <div class="list-view-stats" id="list-count">0 événement(s)</div>
                    <select id="list-sort" class="sort-select">
                        <option value="date">Trier par date</option>
                        <option value="title">Trier par titre</option>
                        <option value="type">Trier par type</option>
                    </select>
                </div>
            </div>
            <div class="list-view-content" id="list-view-content">
                <!-- Le contenu sera généré dynamiquement -->
            </div>
            <div class="no-events-message" id="no-list-events" style="display: none;">
                <i class="fas fa-calendar-times"></i>
                <p>Aucun événement trouvé pour les filtres sélectionnés.</p>
            </div>
        </div>

        <!-- Message d'erreur -->
        <div class="error-message" id="error-message" style="display: none;">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Une erreur est survenue lors du chargement du calendrier.</p>
            <button class="btn-retry" id="retry-btn">Réessayer</button>
        </div>

        <!-- Modal d'événement amélioré -->
        <div class="modal-overlay" id="event-modal">
            <div class="modal-container">
                <div class="modal-header">
                    <div class="modal-title-container">
                        <h3 id="modal-title">Détails de l'événement</h3>
                        <span class="event-type-badge" id="event-type-badge"></span>
                    </div>
                    <button class="modal-close" id="close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="modal-body">
                    <!-- Contenu généré dynamiquement -->
                </div>
            </div>
        </div>

        <!-- Modal liste des événements du jour -->
        <div class="modal-overlay" id="day-events-modal">
            <div class="modal-container">
                <div class="modal-header">
                    <h3 id="day-modal-title">Événements du jour</h3>
                    <button class="modal-close" id="close-day-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="day-modal-body">
                    <!-- Contenu généré dynamiquement -->
                </div>
            </div>
        </div>
    </section>

    <script type="module" src="../script/pages/evenement.js"></script>
    <script type="module" src="../script/navbar.js"></script>
    <?php include_once __DIR__ . '/../templates/components/layout/footer.php'; ?>
</body>
</html>
