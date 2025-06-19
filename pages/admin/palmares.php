<main class="body-palmares-dashboard">
    <div class="main-container">
        <h1>PALMARÈS</h1>

        <!-- Header dashboard avec bouton d'ajout -->
        <div class="dashboard-header">
            <p>Gérez les succès et victoires de votre club d'aviron. Ajoutez, modifiez ou supprimez les performances de vos athlètes.</p>
            <div class="add-champ_btn">
                <button class="btn-primary" id="add-palmares-btn">Ajouter Champion</button>
            </div>
        </div>

        <!-- Filtres -->
        <div class="filters-container">
            <div class="filter-group">
                <label for="filter-sport">Filtrer par sport :</label>
                <select id="filter-sport">
                    <option value="">Tous les sports</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="filter-year">Filtrer par année :</label>
                <select id="filter-year">
                    <option value="">Toutes les années</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="search-palmares">Rechercher :</label>
                <input type="text" id="search-palmares" placeholder="Nom d'athlète, compétition...">
            </div>
        </div>

        <!-- Loader pour le chargement -->
        <div id="palmares-loader" style="display:none;text-align:center;margin:2rem 0;">
            <span class="loader"></span>
        </div>

        <!-- Liste des palmarès -->
        <div class="palmares-list" id="palmares-list">
            <!-- Les palmarès seront affichés ici dynamiquement -->
        </div>

        <!-- Message si aucun palmarès -->
        <div id="no-palmares-message" style="display:none;" class="no-results">
            <p>Aucun palmarès trouvé.</p>
        </div>
    </div>

    <!-- Modal Ajout/Modification Palmarès -->
    <div class="modal" id="palmares-modal" style="display:none;">
        <div class="modal-content">
            <span class="modal-close" id="close-palmares-modal">&times;</span>
            <h2 id="palmares-modal-title">Ajouter un Champion</h2>
            <div class="form-section">
                <form id="palmares-form" class="form">
                    <input type="hidden" id="palmares-id">

                    <div class="form__group">
                        <input class="form__input" placeholder="" type="text" id="palmares-athlete-name" name="athleteName" required>
                        <label class="form__label" for="palmares-athlete-name">Nom de l'athlète</label>
                    </div>

                    <div class="form__group">
                        <input class="form__input" placeholder="" type="text" id="palmares-competition" name="competition" required>
                        <label class="form__label" for="palmares-competition">Compétition</label>
                    </div>

                    <div class="form__group">
                        <select class="form__input" id="palmares-sport" name="sport" required>
                            <option value="">Sélectionner un sport</option>
                        </select>
                        <label class="form__label" for="palmares-sport">Sport</label>
                    </div>

                    <div class="form__group">
                        <input class="form__input" placeholder="" type="text" id="palmares-category" name="category" required>
                        <label class="form__label" for="palmares-category">Catégorie</label>
                    </div>

                    <div class="form__group">
                        <select class="form__input" id="palmares-gender" name="gender" required>
                            <option value="">Sélectionner</option>
                            <option value="Masculin">Masculin</option>
                            <option value="Féminin">Féminin</option>
                            <option value="Mixte">Mixte</option>
                        </select>
                        <label class="form__label" for="palmares-gender">Genre</label>
                    </div>

                    <div class="form__group">
                        <input class="form__input" placeholder="" type="text" id="palmares-result" name="result" required>
                        <label class="form__label" for="palmares-result">Résultat (ex: 1er, 2ème, Médaille d'or...)</label>
                    </div>

                    <div class="form__group">
                        <input class="form__input" placeholder="" type="number" id="palmares-year" name="year" min="1900" max="2030" required>
                        <label class="form__label" for="palmares-year">Année</label>
                    </div>

                    <div class="form__group">
                        <input class="form__input" type="file" id="palmares-images" name="images" accept="image/*" multiple>
                        <label class="form__label" for="palmares-images">Images (optionnel)</label>
                        <div id="palmares-images-preview" class="images-preview"></div>
                    </div>

                    <div class="form__cta">
                        <button type="submit" class="btn-primary" id="palmares-submit-btn">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal Visualisation Palmarès -->
    <div class="modal" id="view-palmares-modal" style="display:none;">
        <div class="modal-content">
            <span class="modal-close" id="close-view-palmares-modal">&times;</span>
            <h2 id="view-palmares-title">Détails du Champion</h2>
            <div class="view-section">
                <div id="view-palmares-images" class="view-images-gallery"></div>
                <div class="view-details">
                    <div class="view-detail-item">
                        <strong>Athlète :</strong>
                        <span id="view-palmares-athlete"></span>
                    </div>
                    <div class="view-detail-item">
                        <strong>Compétition :</strong>
                        <span id="view-palmares-competition"></span>
                    </div>
                    <div class="view-detail-item">
                        <strong>Sport :</strong>
                        <span id="view-palmares-sport"></span>
                    </div>
                    <div class="view-detail-item">
                        <strong>Catégorie :</strong>
                        <span id="view-palmares-category"></span>
                    </div>
                    <div class="view-detail-item">
                        <strong>Genre :</strong>
                        <span id="view-palmares-gender"></span>
                    </div>
                    <div class="view-detail-item">
                        <strong>Résultat :</strong>
                        <span id="view-palmares-result"></span>
                    </div>
                    <div class="view-detail-item">
                        <strong>Année :</strong>
                        <span id="view-palmares-year"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Suppression Palmarès -->
    <div class="modal" id="delete-palmares-modal" style="display:none;">
        <div class="modal-content">
            <span class="modal-close" id="close-delete-palmares-modal">&times;</span>
            <h2>Supprimer le Champion</h2>
            <p>Voulez-vous vraiment supprimer le palmarès de <strong id="delete-palmares-name"></strong> ?</p>
            <div class="modal-actions">
                <button class="btn btn-danger" id="confirm-delete-palmares-btn">Supprimer</button>
                <button class="btn btn-secondary" id="cancel-delete-palmares-btn">Annuler</button>
            </div>
        </div>
    </div>
</main>