<main class="body-gallerie-dashboard">
    <div class="main-container">
        <h1>GESTION DES GALERIES</h1>
        
        <!-- Section de contrôles -->
        <div class="gallery-controls">
            <div class="gallery-controls__actions">
                <button class="btn-primary" id="add-gallery-btn">
                    <i class="fas fa-plus"></i>
                    Créer une Galerie
                </button>
                <!-- <button class="btn-secondary" id="bulk-upload-btn">
                    <i class="fas fa-upload"></i>
                    Upload Multiple
                </button> -->
            </div>
            <div class="gallery-controls__search">
                <input type="text" id="search-galleries" placeholder="Rechercher une galerie..." class="search-input">
            </div>
        </div>

        <!-- Loader -->
        <div id="galleries-loader" style="display:none;text-align:center;margin:2rem 0;">
            <span class="loader"></span>
        </div>

        <!-- Affichage des galeries -->
        <div class="galleries-container" id="galleries-container">
            <!-- Les galeries seront chargées dynamiquement ici -->
        </div>

        <!-- Message d'absence de galeries -->
        <div id="no-galleries-message" style="display:none;" class="no-content-message">
            <i class="fas fa-images"></i>
            <h3>Aucune galerie trouvée</h3>
            <p>Créez votre première galerie pour commencer à organiser vos images.</p>
        </div>
    </div>

    <!-- Modal Galerie -->
    <div class="modal" id="gallery-modal" style="display:none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="gallery-modal-title">Créer une Galerie</h2>
                <span class="modal-close" id="close-gallery-modal">&times;</span>
            </div>
            
            <form id="gallery-form" class="modern-form">
                <input type="hidden" id="gallery-id">
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="gallery-theme" class="form-label">
                            <i class="fas fa-tag"></i>
                            Thème de la galerie *
                        </label>
                        <div class="input-wrapper">
                            <input type="text" id="gallery-theme" name="theme" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-actions-modern">
                    <button type="button" class="btn-modern btn-secondary" id="cancel-gallery-btn">
                        <i class="fas fa-times"></i>
                        Annuler
                    </button>
                    <button type="submit" class="btn-modern btn-primary" id="gallery-submit-btn">
                        <i class="fas fa-save"></i>
                        <span class="btn-text">Créer</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Image -->
    <div class="modal" id="picture-modal" style="display:none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="picture-modal-title">Ajouter une Image</h2>
                <span class="modal-close" id="close-picture-modal">&times;</span>
            </div>
            
            <form id="picture-form" class="modern-form">
                <input type="hidden" id="picture-id">
                <input type="hidden" id="picture-gallery-id">
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="picture-description" class="form-label">
                            <i class="fas fa-align-left"></i>
                            Description de l'image
                        </label>
                        <div class="input-wrapper">
                            <textarea id="picture-description" name="description" rows="3" class="form-input"></textarea>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="picture-image" class="form-label">
                            <i class="fas fa-image"></i>
                            Image *
                        </label>
                        <div class="file-upload-wrapper">
                            <input type="file" id="picture-image" name="image" accept="image/*" class="file-input" required>
                            <label for="picture-image" class="file-upload-label">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <span class="file-upload-text">Choisir une image</span>
                            </label>
                            <div id="picture-image-preview" class="image-preview-modern"></div>
                        </div>
                    </div>
                </div>

                <div class="form-actions-modern">
                    <button type="button" class="btn-modern btn-secondary" id="cancel-picture-btn">
                        <i class="fas fa-times"></i>
                        Annuler
                    </button>
                    <button type="submit" class="btn-modern btn-primary" id="picture-submit-btn">
                        <i class="fas fa-save"></i>
                        <span class="btn-text">Ajouter</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

<!-- Modal Visualisation Galerie -->
<div class="modal" id="gallery-view-modal" style="display:none;">
    <div class="modal-content gallery-viewer">
        <div class="modal-header">
            <h2 id="gallery-view-title">Galerie</h2>
            <span class="modal-close" id="close-gallery-view-modal">&times;</span>
        </div>
        
        <div class="gallery-viewer-content">
            <div class="gallery-viewer-header">
                <div class="gallery-info-display">
                    <h3 id="gallery-view-theme"></h3>
                    <p class="gallery-stats">
                        <span id="gallery-view-count"></span> images
                    </p>
                </div>
                <div class="gallery-viewer-actions">
                    <button class="btn-modern btn-primary" id="add-picture-from-gallery-btn">
                        <i class="fas fa-plus"></i>
                        Ajouter une Image
                    </button>
                    <button class="btn-modern btn-secondary" id="edit-gallery-from-viewer-btn">
                        <i class="fas fa-edit"></i>
                        Modifier la Galerie
                    </button>
                </div>
            </div>
            
            <div class="gallery-images-grid" id="gallery-images-grid">
                <!-- Les images seront chargées dynamiquement ici -->
            </div>
            
            <div id="no-images-in-gallery" style="display:none;" class="no-content-message">
                <i class="fas fa-image"></i>
                <h4>Aucune image dans cette galerie</h4>
                <p>Commencez par ajouter des images à cette galerie.</p>
            </div>
        </div>
    </div>
</div>



    <!-- Modal Visualisation Image -->
    <div class="modal" id="picture-view-modal" style="display:none;">
        <div class="modal-content picture-viewer">
            <span class="modal-close" id="close-picture-view-modal">&times;</span>
            <div class="picture-viewer-content">
                <img id="view-picture-image" src="" alt="">
                <div class="picture-viewer-info">
                    <h3 id="view-picture-description"></h3>
                    <p class="picture-meta">
                        Galerie: <span id="view-picture-gallery"></span> |
                        Ajoutée le: <span id="view-picture-date"></span>
                    </p>
                    <div class="picture-actions">
                        <button class="btn-modern btn-primary" id="edit-picture-btn">
                            <i class="fas fa-edit"></i>
                            Modifier
                        </button>
                        <button class="btn-modern btn-danger" id="delete-picture-btn">
                            <i class="fas fa-trash"></i>
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Suppression -->
    <div class="modal" id="delete-modal" style="display:none;">
        <div class="modal-content">
            <span class="modal-close" id="close-delete-modal">&times;</span>
            <h2>Confirmer la Suppression</h2>
            <p id="delete-message"></p>
            <div class="modal-actions">
                <button class="btn btn-danger" id="confirm-delete-btn">Supprimer</button>
                <button class="btn btn-secondary" id="cancel-delete-btn">Annuler</button>
            </div>
        </div>
    </div>
</main>
