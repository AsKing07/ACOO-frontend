<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/styles.css">
    <title>ACOO: Calendrier des Événements</title>
    <script defer data-domain="acoo.charbelsnn.com" src="https://plausible.io/js/script.file-downloads.outbound-links.js"></script>
</head>

<body class="body-evenement">
    <?php include __DIR__ . '/../templates/components/layout/header.php'; ?>
    
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

    <script type="module" src="../script/evenement.js"></script>
    <?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>
</body>
</html>
