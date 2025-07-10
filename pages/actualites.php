<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styles.css">
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    <title>ACOO: Nos actualités</title>
    <script defer data-domain="acoo.charbelsnn.com" src="https://plausible.io/js/script.file-downloads.outbound-links.js"></script>
</head>
<body class="body-actualites">
    <?php include __DIR__ . '/../templates/components/layout/header.php'; ?>

    <!-- HERO SECTION -->
    <section class="actualites-hero">
        <div class="actualites-hero__content">
            <h1 class="actualites-hero__title">NOS ACTUALITÉS</h1>
            <p class="actualites-hero__subtitle">Restez informé de toutes nos dernières nouvelles</p>
        </div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="actualites-main">
        <div class="actualites-container">
            
            <!-- En-tête et description -->
            <header class="actualites-header">
                <h2 class="actualites-header__title">Actualités du Club</h2>
                <div class="actualites-header__description">
                    <p>Retrouvez toutes les actualités et newsletters publiées par l'ACOO.</p>
                    <p>Des photos, des suggestions de publications ou des témoignages ? N'hésitez pas à contacter le club ou le groupe communication.</p>
                </div>
            </header>

            <!-- Filtres et contrôles -->
            <section class="actualites-filters">
                <div class="filters-container">
                    <div class="filter-group">
                        <label for="date-filter" class="filter-label">
                            <i class="fas fa-calendar-alt"></i>
                            Filtrer par période
                        </label>
                        <select id="date-filter" class="filter-select">
                            <option value="all">Toutes les actualités</option>
                            <option value="week">Cette semaine</option>
                            <option value="month">Ce mois</option>
                            <option value="year">Cette année</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="sort-filter" class="filter-label">
                            <i class="fas fa-sort"></i>
                            Trier par
                        </label>
                        <select id="sort-filter" class="filter-select">
                            <option value="recent">Plus récent</option>
                            <option value="oldest">Plus ancien</option>
                            <option value="title">Titre A-Z</option>
                        </select>
                    </div>

                    <div class="filters-actions">
                        <button id="reset-filters" class="btn-reset-filters">
                            <i class="fas fa-refresh"></i>
                            Réinitialiser
                        </button>
                    </div>
                </div>

                <div class="results-info">
                    <span id="results-count" class="results-count">0 actualité(s) trouvée(s)</span>
                </div>
            </section>

            <!-- Loader -->
            <div id="actualites-loader" class="actualites-loader" style="display: none;">
                <div class="loader-spinner"></div>
                <p>Chargement des actualités...</p>
            </div>

            <!-- Message d'erreur -->
            <div id="error-message" class="error-message" style="display: none;">
                <div class="error-content">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Erreur de chargement</h3>
                    <p>Impossible de charger les actualités. Veuillez réessayer.</p>
                    <button id="retry-btn" class="btn-retry">
                        <i class="fas fa-redo"></i>
                        Réessayer
                    </button>
                </div>
            </div>

            <!-- Grille des actualités -->
            <section class="actualites-grid" id="actualites-grid">
                <!-- Les cartes d'actualités seront générées dynamiquement -->
            </section>

            <!-- Message aucun résultat -->
            <div id="no-results" class="no-results" style="display: none;">
                <div class="no-results-content">
                    <i class="fas fa-search"></i>
                    <h3>Aucune actualité trouvée</h3>
                    <p>Aucune actualité ne correspond à vos critères de recherche.</p>
                    <button id="clear-filters-btn" class="btn-clear-filters">
                        Afficher toutes les actualités
                    </button>
                </div>
            </div>

            <!-- Pagination -->
            <nav class="pagination" id="pagination" style="display: none;">
                <button id="prev-page" class="pagination-btn pagination-btn--prev" disabled>
                    <i class="fas fa-chevron-left"></i>
                    Précédent
                </button>
                <div class="pagination-info">
                    <span id="page-info">Page 1 sur 1</span>
                </div>
                <button id="next-page" class="pagination-btn pagination-btn--next" disabled>
                    Suivant
                    <i class="fas fa-chevron-right"></i>
                </button>
            </nav>

        </div>
           <!-- Modal de détail d'actualité -->
    <div class="modal-overlay" id="news-modal" style="display: none;">
        <div class="modal-container">
            <div class="modal-header">
                <h3 id="modal-title">Détails de l'actualité</h3>
                <button class="modal-close" id="close-modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body" id="modal-body">
                <!-- Contenu généré dynamiquement -->
            </div>
        </div>
    </div>
    </main>

 

    <script type="module" src="/script/pages/actualite.js"></script>
    <?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>
</body>
</html>
