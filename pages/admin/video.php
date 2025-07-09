<main class="body-video-dashboard">
    <div class="main-container">
        <h1>VIDÉOS</h1>
        <div class="responsive cta-container">
            <button class="btn-primary" id="add-video-btn">Ajouter une vidéo</button>
        </div>
        <div id="loader" style="display:none;text-align:center;margin:2rem 0;">
            <span class="loader"></span>
        </div>
        <div id="video-list" class="video-list">
            <!-- Les vidéos seront affichées ici -->
        </div>
    </div>
    <!-- Modal pour ajouter/modifier une vidéo -->
    <div class="modal" id="video-modal" style="display: none;">
        <div class="modal-content">
            <span class="modal-close" id="close-video-modal">&times;</span>
            <h2 id="video-modal-title">Ajouter une vidéo</h2>
            <div class="form-section">
                <form id="video-form" class="form">
                    <input type="hidden" id="video-id">
                    <div class="form__group">
                        <input class="form__input" placeholder="" type="text" id="video-name" name="name" required>
                        <label class="form__label" for="video-name">Nom de la vidéo</label>
                    </div>
                    <div class="form__group">
                        <input class="form__input" placeholder="" type="text" id="video-url" name="videoUrl" required>
                        <label class="form__label" for="video-url">URL YouTube</label>
                    </div>
                    <div class="form__cta">
                        <button type="submit" class="btn-primary" id="video-submit-btn">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Modal de confirmation de suppression -->
    <div class="modal" id="delete-video-modal" style="display: none;">
        <div class="modal-content">
            <span class="modal-close" id="close-delete-video-modal">&times;</span>
            <h2>Supprimer la vidéo</h2>
            <p>Voulez-vous vraiment supprimer cette vidéo ?</p>
            <div class="modal-actions">
                <button class="btn btn-danger" id="confirm-delete-video-btn">Supprimer</button>
                <button class="btn btn-secondary" id="cancel-delete-video-btn">Annuler</button>
            </div>
        </div>
    </div>
</main>
