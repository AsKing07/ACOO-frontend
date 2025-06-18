<main class="body-club-dashboard">
    <div class="main-container">
        <h1>CLUB</h1>
        
        <!-- Section Organigramme -->
        <div class="container-editing">
            <div class="organigramme-container">
                <div class="organigramme-header">
                    <h2>Organigramme</h2>
                    <button class="btn-primary" id="add-staff-btn">Ajouter un membre</button>
                </div>
                  <div id="organigramme-loader" style="display:none;text-align:center;margin:2rem 0;">
  <span class="loader"></span>
</div>
                <div class="staffs" id="staffs-list">
                    <!-- Les membres de l'organigramme seront affichés ici dynamiquement. -->
                </div>
            </div>
        </div>
        
           <!-- Section Règlement Intérieur -->
            
                <div class="edit-wording-card">
                    <div class="edit-wording_content">
                        <h2 class="edit-wording_title">Règlement Intérieur</h2>
                        <p class="edit-wording_description">
                            Téléchargez le règlement intérieur actuel ou uploadez une nouvelle version. 
                            Ce document définit les règles de fonctionnement et de conduite au sein du club.
                        </p>
                        <div class="edit-wording_btn">
                            <button class="btn-primary">Télécharger</button>
                            <button class="btn-primary">Uploader</button>
                        </div>
                    </div>
                </div>
           
        <!-- Section Sports Proposés -->
       <div class="container-editing-column editing-sports-container">
    <div class="sports-dashboard__header">
        <h2>Sports Proposés</h2>
        <button class="btn-primary" id="add-sport-btn">Ajouter un sport</button>
    </div>
    <p>
        Découvrez la variété des disciplines sportives proposées par notre club. 
        Chaque activité est encadrée par des professionnels qualifiés et adaptée 
        à tous les niveaux de pratique.
    </p>
                      <div id="sports-loader" style="display:none;text-align:center;margin:2rem 0;">
  <span class="loader"></span>
</div>

    <div class="sports-dashboard__list" id="sports-list">
        <!-- Les sports seront affichés ici dynamiquement. -->
    </div>
</div>

    </div>
    
    <!-- Modal Membre -->
    <div class="modal" id="staff-modal" style="display:none;">
        <div class="modal-content">
            <span class="modal-close" id="close-staff-modal">&times;</span>
            <h2 id="staff-modal-title">Ajouter un membre</h2>
            <div class="form-section">
                <form id="staff-form" class="form">
                    <input type="hidden" id="staff-id">
                    <div class="form__group">
                        <input class="form__input" placeholder="" type="text" id="staff-name" name="name" required>
                        <label class="form__label" for="staff-name">Nom</label>
                    </div>
                    <div class="form__group">
                        <input class="form__input" placeholder="" type="email" id="staff-email" name="email" required>
                        <label class="form__label" for="staff-email">Email</label>
                    </div>
                    <div class="form__group">
                        <input class="form__input" placeholder="" type="text" id="staff-role" name="role" required>
                        <label class="form__label" for="staff-role">Rôle</label>
                    </div>
                    <div class="form__group">
                        <input class="form__input" placeholder="" type="tel" id="staff-phone" name="phone">
                        <label class="form__label" for="staff-phone">Téléphone</label>
                    </div>
                    <div class="form__group">
                        <input class="form__input" type="file" id="staff-photo" name="photo" accept="image/*">
                        <label class="form__label" for="staff-photo">Photo</label>
                    </div>
                    <div class="form__cta">
                        <button type="submit" class="btn-primary" id="staff-submit-btn">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <!-- Modal Sport -->
    <div class="modal" id="sport-modal" style="display:none;">
        <div class="modal-content">
            <span class="modal-close" id="close-sport-modal">&times;</span>
            <h2 id="sport-modal-title">Ajouter un sport</h2>
            <div class="form-section">
                <form id="sport-form" class="form">
                    <input type="hidden" id="sport-id">
                    <div class="form__group">
                        <input class="form__input" placeholder="" type="text" id="sport-name" name="name" required>
                        <label class="form__label" for="sport-name">Nom du sport</label>
                    </div>
                    <div class="form__group">
                        <textarea class="form__textarea form__input" placeholder="" id="sport-description" name="description"></textarea>
                        <label class="form__label" for="sport-description">Description</label>
                    </div>
                    <div class="form__group">
                        <input class="form__input" placeholder="" type="text" id="sport-contact" name="contact">
                        <label class="form__label" for="sport-contact">Contact à fournir pour plus d'information</label>
                    </div>
                    <div class="form__group">
                        <input class="form__input" type="file" id="sport-image" name="image" accept="image/*">
                        <label class="form__label" for="sport-image">Image du sport</label>
                    </div>
                 
                    <div class="form__cta">
                        <button type="submit" class="btn-primary" id="sport-submit-btn">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <!-- Modal Suppression Membre -->
    <div class="modal" id="delete-staff-modal" style="display:none;">
        <div class="modal-content">
            <span class="modal-close" id="close-delete-staff-modal">&times;</span>
            <h2>Supprimer le membre</h2>
            <p>Voulez-vous vraiment supprimer ce membre de l'organigramme ?</p>
            <div class="modal-actions">
                <button class="btn btn-danger" id="confirm-delete-staff-btn">Supprimer</button>
                <button class="btn btn-secondary" id="cancel-delete-staff-btn">Annuler</button>
            </div>
        </div>
    </div>
    
    <!-- Modal Suppression Sport -->
    <div class="modal" id="delete-sport-modal" style="display:none;">
        <div class="modal-content">
            <span class="modal-close" id="close-delete-sport-modal">&times;</span>
            <h2>Supprimer le sport</h2>
            <p>Voulez-vous vraiment supprimer ce sport de la liste ?</p>
            <div class="modal-actions">
                <button class="btn btn-danger" id="confirm-delete-sport-btn">Supprimer</button>
                <button class="btn btn-secondary" id="cancel-delete-sport-btn">Annuler</button>
            </div>
        </div>
    </div>
</main>
