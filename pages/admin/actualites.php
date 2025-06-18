<main class="body-actualites-dashboard">




    <div class="main-container">
        <h1>ACTUALITÉS</h1>

        <div class="responsive cta-container">
                <button class="btn-primary" id="add-news-btn">Ajouter une actualité</button>
        </div>

                </div>
                  <div id="loader" style="display:none;text-align:center;margin:2rem 0;">
  <span class="loader"></span> </div>

        <div id="news-list" class="news">
            <!-- Les actualités seront affichées ici. -->
               <div class="editing-img-wording-container newItem ">
            <div class="edit-img">
                <img src="" alt="actualité">
            </div>

            <div class="edit-description">
            <h2>Sur tous les fronts : l’aviron en pleine accélération</h2>

            <div class="desc-wording">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>

            <div class="edit-btnS">
                
                <button class="btn-primary btn-edit">Modifier</button>
               

                
                <button class="btn-danger btn-delete">Supprimer</button>
               
            </div>
            </div>
        </div>

        </div>

      


 
    </div>

    <!-- Modal pour ajouter et modifier une actualité  -->
    <div class="modal" id="news-modal" style="display: none;">
        <div class="modal-content">
            <span class="modal-close" id="close-news-modal">&times;</span>
            <h2 id="news-modal-title">Ajouter une actualité</h2>
            <div class="form-section">
                <form id="news-form" class="form">
                    <input type="hidden" id="news-id">
                    <div class="form__group">
                        <input class="form__input" placeholder="" type="text" id="news-title" name="title" required>
                        <label class="form__label" for="news-title">Titre de l'actualité</label>
                    </div>
                    <div class="form__group">
                        <textarea class="form__input" placeholder="" id="news-content" name="content" required></textarea>
                        <label class="form__label" for="news-content">Contenu de l'actualité</label>
                    </div>
                    <div class="form__group">
                        <input class="form__input" type="file" id="news-image" name="image" accept="image/*">
                        <label class="form__label" for="news-image">Image de l'actualité</label>
                    </div>
                    <div class="form__cta">
                        <button type="submit" class="btn-primary" id="news-submit-btn">Enregistrer</button>
                    </div>

                </form>
            </div>


        </div>
    </div>
    <!-- Modal de confirmation de suppression -->
    <div class="modal" id="delete-news-modal" style="display: none;">
        <div class="modal-content">
            <span class="modal-close" id="close-delete-news-modal">&times;</span>
            <h2>Supprimer l'actualité</h2>
            <p>Voulez-vous vraiment supprimer cette actualité ?</p>
            <div class="modal-actions">
                <button class="btn btn-danger" id="confirm-delete-news-btn">Supprimer</button>
                <button class="btn btn-secondary" id="cancel-delete-news-btn">Annuler</button>
            </div>
        </div>
    </div>
</div>
</main>