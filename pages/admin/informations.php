<main class="body-information_dashboard">
    <!-- Section profil/Contact du club -->
    <div class="container-dashboard-profil">
        <div class="dashboard-profil-title">
            <h2>INFORMATIONS DE CONTACT</h2>
        </div>
        <form id="form-dashboard-profil" class="dashboard-profil-form">
            <div id="contact-loader" class="loader-container" style="display: none;">
                <div class="loader"></div>
            </div>
        
            <div class="dashboard-profil-info-display">
                <div class="dashboard-profil-info">
                    <div class="profil-info">
                        <label for="email">Mail</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <i class="fa-regular fa-edit edit-icon" data-field="email"></i>
                </div>
                <div class="dashboard-profil-info">
                    <div class="profil-info">
                        <label for="telephone">Téléphone</label>
                        <input type="tel" id="telephone" name="telephone" disabled>
                    </div>
                    <i class="fa-regular fa-edit edit-icon" data-field="telephone"></i>
                </div>
            </div>
            <div class="dashboard-profil-info-display-solo">
                <div class="dashboard-profil-info">
                    <div class="profil-info">
                        <label for="address">Adresse</label>
                        <input type="text" id="address" name="address" disabled>
                    </div>
                    <i class="fa-regular fa-edit edit-icon" data-field="address"></i>
                </div>
            </div>
            <div class="dashboard-profil-info-btn">
                <button type="submit" class="btn-primary" id="save-contact-btn">MODIFIER LES INFOS</button>
            </div>
        </form>
    </div>

    <!-- Section Réseaux Sociaux -->
    <div class="container-dashboard-profil">
        <div class="dashboard-profil-title">
            <h2>RÉSEAUX SOCIAUX</h2>
            <button class="btn-secondary" id="add-social-btn">
                <i class="fa-solid fa-plus"></i> Ajouter
            </button>
        </div>
        <div id="social-loader" class="loader-container" style="display: none;">
            <span class="loader"></span>
        </div>
        <div id="social-medias-list" class="social-medias-container">
            <!-- Les réseaux sociaux seront rendus ici -->
        </div>
    </div>

    <!-- Sections Contenus Textuels -->
    <div class="container-editing">
        <div class="edit-wording-card" data-title="Histoire du club">
            <div class="edit-wording_content">
                <h2 class="edit-wording_title">Histoire du club</h2>
                <p class="edit-wording_description" id="histoire-description">
                    Chargement...
                </p>
                <div class="edit-actions-wording_btns">                   
                    <button class="btn-primary view-content-btn" data-title="Histoire du club">Voir</button>
                    <button class="btn-primary edit-content-btn" data-title="Histoire du club">Modifier</button>                    
                </div>
            </div>
        </div>

        <div class="edit-wording-card" data-title="A propos de nous">
            <div class="edit-wording_content">
                <h2 class="edit-wording_title">À propos de nous</h2>
                <p class="edit-wording_description" id="apropos-description">
                    Chargement...
                </p>
                <div class="edit-actions-wording_btns">                   
                    <button class="btn-primary view-content-btn" data-title="A propos de nous">Voir</button>
                    <button class="btn-primary edit-content-btn" data-title="A propos de nous">Modifier</button>                    
                </div>
            </div>
        </div>
    </div>

    <div class="container-editing">
        <div class="edit-wording-card" data-title="Vie du club">
            <div class="edit-wording_content">
                <h2 class="edit-wording_title">Vie du club</h2>
                <p class="edit-wording_description" id="vie-description">
                    Chargement...
                </p>
                <div class="edit-actions-wording_btns">                   
                    <button class="btn-primary view-content-btn" data-title="Vie du club">Voir</button>
                    <button class="btn-primary edit-content-btn" data-title="Vie du club">Modifier</button>                    
                </div>
            </div>
        </div>

        <div class="edit-wording-card" data-title="Guide de l'avironnier">
            <div class="edit-wording_content">
                <h2 class="edit-wording_title">Guide de l'avironnier</h2>
                <p class="edit-wording_description" id="guide-description">
                    Chargement...
                </p>
                <div class="edit-actions-wording_btns">                   
                    <button class="btn-primary view-content-btn" data-title="Guide de l'avironnier">Voir</button>
                    <button class="btn-primary edit-content-btn" data-title="Guide de l'avironnier">Modifier</button>                    
                </div>
            </div>
        </div>
    </div>

    <!-- Modal pour éditer les contenus textuels -->
    <div id="content-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="content-modal-title">Modifier le contenu</h3>
                <span class="close" id="close-content-modal">&times;</span>
            </div>
            <form id="content-form">
                <input type="hidden" id="content-id">
                <div class="form-group">
                    <label for="content-title">Titre</label>
                    <input type="text" id="content-title" readonly>
                </div>
                <div class="form-group">
                    <label for="content-description">Description</label>
                    <textarea id="content-description" rows="10" required></textarea>
                </div>
 <div class="form-group">
    <label for="content-images">Images</label>
    <input type="file" id="content-images" accept="image/*" multiple>
    <small class="form-text">Vous pouvez sélectionner plusieurs images</small>
</div>


<div class="form-group" id="image-preview-container" style="display: none;">
    <label>Aperçu des images sélectionnées:</label>
    <div id="image-preview" class="image-preview-grid"></div>
</div>

                <div class="modal-actions">
                    <button type="button" class="btn-secondary" id="cancel-content-btn">Annuler</button>
                    <button type="submit" class="btn-primary" id="save-content-btn">Enregistrer</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal pour voir les contenus textuels -->
    <div id="view-content-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="view-content-modal-title">Contenu</h3>
                <span class="close" id="close-view-content-modal">&times;</span>
            </div>
            <div class="view-content-body">
                <h4 id="view-content-title"></h4>
                <div id="view-content-images"></div>
                <div id="view-content-description"></div>
            </div>
        </div>
    </div>

    <!-- Modal pour gérer les réseaux sociaux -->
    <div id="social-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="social-modal-title">Ajouter un réseau social</h3>
                <span class="close" id="close-social-modal">&times;</span>
            </div>
            <form id="social-form">
                <input type="hidden" id="social-id">
                <div class="form-group">
                    <label for="social-platform">Plateforme</label>
                    <select id="social-platform" required>
                        <option value="">Choisir une plateforme</option>
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="twitter">Twitter</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="youtube">YouTube</option>
                        <option value="tiktok">TikTok</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="social-url">URL</label>
                    <input type="url" id="social-url" required placeholder="https://...">
                </div>
                <div class="form-group">
                    <label for="social-icon-url">URL de l'icône (optionnel)</label>
                    <input type="url" id="social-icon-url" placeholder="https://...">
                </div>
                <div class="form-group">
                    <label for="social-image">Image</label>
                    <input type="file" id="social-image" accept="image/*">
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn-secondary" id="cancel-social-btn">Annuler</button>
                    <button type="submit" class="btn-primary" id="save-social-btn">Enregistrer</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div id="delete-social-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirmer la suppression</h3>
            </div>
            <p>Êtes-vous sûr de vouloir supprimer ce réseau social ?</p>
            <div class="modal-actions">
                <button type="button" class="btn-secondary" id="cancel-delete-social-btn">Annuler</button>
                <button type="button" class="btn-danger" id="confirm-delete-social-btn">Supprimer</button>
            </div>
        </div>
    </div>
</main>
