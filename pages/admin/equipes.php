<main class="teams-dashboard">
    <div class="teams-container">
        <!-- Header avec titre et bouton d'ajout -->
        <div class="teams-header">
            <h1>GESTION DES ÉQUIPES</h1>
            <button class="btn-primary" id="add-team-btn">
                <i class="fas fa-plus"></i>
                Ajouter une équipe
            </button>
        </div>

        <!-- Filtres -->
        <div class="teams-filters">
            <div class="filter-group">
                <label for="sport-filter">Filtrer par sport :</label>
                <select id="sport-filter" class="filter-select">
                    <option value="">Tous les sports</option>
                    <!-- Options ajoutées dynamiquement -->
                </select>
            </div>
            <div class="filter-group">
                <label for="search-teams">Rechercher :</label>
                <input type="text" id="search-teams" placeholder="Nom de l'équipe..." class="filter-input">
            </div>
        </div>

        <!-- Loader pour le chargement -->
        <div id="teams-loader" class="loader-container" style="display:none;">
            <div class="loader"></div>
            <p>Chargement des équipes...</p>
        </div>

        <!-- Liste des équipes -->
        <div class="teams-grid" id="teams-list">
            <!-- Les équipes seront affichées ici dynamiquement -->
        </div>

        <!-- Message si aucune équipe -->
        <div id="no-teams-message" class="no-data-message" style="display:none;">
            <i class="fas fa-users"></i>
            <h3>Aucune équipe trouvée</h3>
            <p>Commencez par ajouter votre première équipe.</p>
        </div>
    </div>

    <!-- Modal d'ajout/modification d'équipe -->
    <div class="modal" id="team-modal" style="display:none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="team-modal-title">Ajouter une équipe</h2>
                <span class="modal-close" id="close-team-modal">&times;</span>
            </div>
            <div class="modal-body">
                <form id="team-form" class="team-form">
                    <input type="hidden" id="team-id">
                    
                    <div class="form-group">
                        <label for="team-sport">Sport <span class="required">*</span></label>
                        <select id="team-sport" name="sport" required class="form-input">
                            <option value="">Sélectionner un sport</option>
                            <!-- Options ajoutées dynamiquement -->
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="team-name">Nom de l'équipe <span class="required">*</span></label>
                        <input type="text" id="team-name" name="name" required class="form-input" 
                               placeholder="Ex: Équipe Senior Homme">
                    </div>

                    <div class="form-group">
                        <label for="team-role">Description/Rôle</label>
                        <textarea id="team-role" name="role" class="form-textarea" rows="4" 
                                  placeholder="Décrivez l'équipe, ses objectifs, son niveau..."></textarea>
                    </div>

                    <div class="form-group">
                        <label for="team-images">Images de l'équipe</label>
                        <input type="file" id="team-images" name="images" accept="image/*" multiple class="form-input">
                        <div id="team-images-preview" class="images-preview"></div>
                        <small class="form-help">Vous pouvez sélectionner plusieurs images (max 5 Mo par image)</small>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn-secondary" id="cancel-team-btn">Annuler</button>
                        <button type="submit" class="btn-primary" id="submit-team-btn">
                            <span class="btn-text">Enregistrer</span>
                            <div class="btn-loader" style="display:none;">
                                <div class="spinner"></div>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal de visualisation d'équipe -->
    <div class="modal" id="view-team-modal" style="display:none;">
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h2 id="view-team-title">Détails de l'équipe</h2>
                <span class="modal-close" id="close-view-team-modal">&times;</span>
            </div>
            <div class="modal-body">
                <div class="team-details">
                    <div class="team-info">
                        <div class="info-item">
                            <span class="info-label">Sport :</span>
                            <span id="view-team-sport" class="info-value"></span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Nom :</span>
                            <span id="view-team-name" class="info-value"></span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Description :</span>
                            <div id="view-team-role" class="info-description"></div>
                        </div>
                    </div>
                    <div class="team-images-gallery" id="view-team-images">
                        <!-- Images affichées dynamiquement -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div class="modal" id="delete-team-modal" style="display:none;">
        <div class="modal-content modal-small">
            <div class="modal-header">
                <h2>Supprimer l'équipe</h2>
                <span class="modal-close" id="close-delete-team-modal">&times;</span>
            </div>
            <div class="modal-body">
                <div class="delete-confirmation">
                    <i class="fas fa-exclamation-triangle warning-icon"></i>
                    <p>Êtes-vous sûr de vouloir supprimer l'équipe <strong id="delete-team-name"></strong> ?</p>
                    <p class="warning-text">Cette action est irréversible.</p>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary" id="cancel-delete-team-btn">Annuler</button>
                    <button type="button" class="btn-danger" id="confirm-delete-team-btn">
                        <span class="btn-text">Supprimer</span>
                        <div class="btn-loader" style="display:none;">
                            <div class="spinner"></div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</main>