<main class="body-partenaires-dahsboard">
    <div class="main-container">
        <h1>PARTENAIRES</h1>
        
        <!-- Section de contrôles -->
        <div class="partners-controls">
            <div class="partners-controls__search">
                <input type="text" id="search-partners" placeholder="Rechercher un partenaire..." class="search-input">
                <select id="filter-type" class="filter-select">
                    <option value="">Tous les types</option>
                    <option value="sponsor">Sponsors</option>
                    <option value="partner">Partenaires</option>
                </select>
            </div>
            <button class="btn-primary" id="add-partner-btn">Ajouter un Partenaire</button>
        </div>

        <!-- Loader -->
        <div id="partners-loader" style="display:none;text-align:center;margin:2rem 0;">
            <span class="loader"></span>
        </div>

        <div class="responsive event-table">
            <section class="event-table-section">
                <div class="event-table__container">
                    <div class="event-table__header">
                        <h2 class="event-table__title">Liste des partenaires</h2>
                        <span id="partners-count" class="partners-count">0 partenaire(s)</span>
                    </div>
                    <div class="event-table__wrapper">
                        <table class="event-table">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Description</th>
                                    <th>Type</th>
                                    <th>Site web</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="partners-table-body">
                                <!-- Les partenaires seront chargés dynamiquement ici -->
                            </tbody>
                        </table>
                        <div id="no-partners-message" style="display:none;text-align:center;padding:2rem;color:white;">
                            <p>Aucun partenaire trouvé.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>

    <!-- Modal Partenaire -->
   <!-- Modal Partenaire Améliorée -->
<div class="modal" id="partner-modal" style="display:none;">
    <div class="modal-content">
        <div class="modal-header">
            <h2 id="partner-modal-title">Ajouter un Partenaire</h2>
            <span class="modal-close" id="close-partner-modal">&times;</span>
        </div>
        
        <form id="partner-form" class="modern-form">
            <input type="hidden" id="partner-id">
            
            <div class="form-row">
                <div class="form-group">
                    <label for="partner-name" class="form-label">
                        <i class="fas fa-building"></i>
                        Nom du partenaire *
                    </label>
                    <div class="input-wrapper">
                        <input type="text" id="partner-name" name="name" class="form-input" required>
                        <span class="input-focus-border"></span>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="partner-description" class="form-label">
                        <i class="fas fa-align-left"></i>
                        Description
                    </label>
                    <div class="input-wrapper">
                        <textarea id="partner-description" name="description" rows="4" class="form-input"></textarea>
                        <span class="input-focus-border"></span>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="partner-url" class="form-label">
                        <i class="fas fa-link"></i>
                        Site web
                    </label>
                    <div class="input-wrapper">
                        <input type="url" id="partner-url" name="url" class="form-input" placeholder="https://exemple.com">
                        <span class="input-focus-border"></span>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <div class="checkbox-wrapper">
                        <input type="checkbox" id="partner-sponsor" name="sponsor" class="custom-checkbox">
                        <label for="partner-sponsor" class="checkbox-label">
                            <span class="checkbox-custom">
                                <i class="fas fa-check"></i>
                            </span>
                            <span class="checkbox-text">
                                <i class="fas fa-star"></i>
                                C'est un sponsor
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="partner-image" class="form-label">
                        <i class="fas fa-image"></i>
                        Logo du partenaire
                    </label>
                    <div class="file-upload-wrapper">
                        <input type="file" id="partner-image" name="image" accept="image/*" class="file-input">
                        <label for="partner-image" class="file-upload-label">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <span class="file-upload-text">Choisir un fichier</span>
                        </label>
                        <div id="partner-image-preview" class="image-preview-modern"></div>
                    </div>
                </div>
            </div>

            <div class="form-actions-modern">
                <button type="button" class="btn-modern btn-secondary" id="cancel-partner-btn">
                    <i class="fas fa-times"></i>
                    Annuler
                </button>
                <button type="submit" class="btn-modern btn-primary" id="partner-submit-btn">
                    <i class="fas fa-save"></i>
                    <span class="btn-text">Enregistrer</span>
                </button>
            </div>
        </form>
    </div>
</div>


    <!-- Modal Visualisation -->
    <div class="modal" id="partner-view-modal" style="display:none;">
        <div class="modal-content">
            <span class="modal-close" id="close-partner-view-modal">&times;</span>
            <div class="partner-view-content">
                <div class="partner-view-header">
                    <img id="view-partner-image" src="" alt="Logo" class="partner-view-logo">
                    <div class="partner-view-info">
                        <h2 id="view-partner-name"></h2>
                        <span id="view-partner-type" class="partner-type-badge"></span>
                    </div>
                </div>
                <div class="partner-view-details">
                    <p id="view-partner-description"></p>
                    <div class="partner-view-links">
                        <a id="view-partner-url" href="#" target="_blank" class="partner-website-link" style="display:none;">
                            <i class="fas fa-external-link-alt"></i> Visiter le site web
                        </a>
                    </div>
                    <div class="partner-view-meta">
                        <small>Partenaire depuis <span id="view-partner-year"></span></small>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Suppression -->
    <div class="modal" id="delete-partner-modal" style="display:none;">
        <div class="modal-content">
            <span class="modal-close" id="close-delete-partner-modal">&times;</span>
            <h2>Supprimer le Partenaire</h2>
            <p>Voulez-vous vraiment supprimer le partenaire <strong id="delete-partner-name"></strong> ?</p>
            <div class="modal-actions">
                <button class="btn btn-danger" id="confirm-delete-partner-btn">Supprimer</button>
                <button class="btn btn-secondary" id="cancel-delete-partner-btn">Annuler</button>
            </div>
        </div>
    </div>
</main>
