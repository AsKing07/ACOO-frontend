<main id="container_admin">
    <div class="container_dashboard_admin">
        <h1>GESTION DES ADMINISTRATEURS</h1>
        
        <!-- Section de contrôles -->
        <div class="admin-controls">
            <div class="admin-controls__actions">
                <button class="btn-primary" id="toggleFormBtn">
                    <i class="fas fa-user-plus"></i>
                    Ajouter un administrateur
                </button>
                <button class="btn-tertiary" id="toggleViewBtn">
                    <i class="fas fa-user-edit"></i>
                    Afficher mon profil
                </button>
            </div>
            <div class="admin-controls__search">
                <input type="text" id="search-admins" placeholder="Rechercher un administrateur..." class="search-input">
            </div>
        </div>

        <!-- Loader -->
        <div id="admins-loader" style="display:none;text-align:center;margin:2rem 0;">
            <span class="loader"></span>
        </div>

        <!-- Formulaire d'ajout d'administrateur -->
        <form id="adminForm" class="modern-form hidden">
            <div class="form-header">
                <h2>Ajouter un administrateur</h2>
                <button type="button" class="close-form-btn" id="closeFormBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="admin-username" class="form-label">
                        <i class="fas fa-user"></i>
                        Nom d'utilisateur *
                    </label>
                    <div class="input-wrapper">
                        <input type="text" id="admin-username" name="username" class="form-input" required>
                        <span class="input-focus-border"></span>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="admin-email" class="form-label">
                        <i class="fas fa-envelope"></i>
                        Email *
                    </label>
                    <div class="input-wrapper">
                        <input type="email" id="admin-email" name="email" class="form-input" required>
                        <span class="input-focus-border"></span>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="admin-password" class="form-label">
                        <i class="fas fa-lock"></i>
                        Mot de passe *
                    </label>
                    <div class="input-wrapper">
                        <input type="password" id="admin-password" name="password" class="form-input" required>
                        <span class="input-focus-border"></span>
                    </div>
                </div>
            </div>

            <div class="form-actions-modern">
                <button type="button" class="btn-modern btn-secondary" id="cancel-admin-btn">
                    <i class="fas fa-times"></i>
                    Annuler
                </button>
                <button type="submit" class="btn-modern btn-primary" id="admin-submit-btn">
                    <i class="fas fa-user-plus"></i>
                    <span class="btn-text">Ajouter</span>
                </button>
            </div>
        </form>

        <!-- Tableau des administrateurs -->
        <section id="adminListSection" class="admin-table-section">
            <div class="table-header">
                <h2>Liste des administrateurs</h2>
                <span id="admins-count" class="admins-count">0 administrateur(s)</span>
            </div>
            
            <div class="table-wrapper">
                <table class="modern-table">
                    <thead>
                        <tr>
                            <th>Administrateur</th>
                            <th>Email</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="admins-table-body">
                        <!-- Les administrateurs seront chargés dynamiquement ici -->
                    </tbody>
                </table>
                
                <div id="no-admins-message" style="display:none;" class="no-content-message">
                    <i class="fas fa-users"></i>
                    <h3>Aucun administrateur trouvé</h3>
                    <p>Aucun administrateur ne correspond à votre recherche.</p>
                </div>
            </div>
        </section>

        <!-- Section de modification du profil -->
        <section id="adminProfileSection" class="profile-section hidden">
            <div class="profile-header">
                <h2>Modifier mon profil</h2>
                <div class="profile-avatar">
                    <div class="avatar-circle" id="profile-avatar">
                        <span id="profile-initials"></span>
                    </div>
                </div>
            </div>
            
            <form id="profileForm" class="modern-form">
                <input type="hidden" id="profile-id">
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="profile-username" class="form-label">
                            <i class="fas fa-user"></i>
                            Nom d'utilisateur
                        </label>
                        <div class="input-wrapper">
                            <input type="text" id="profile-username" name="username" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="profile-email" class="form-label">
                            <i class="fas fa-envelope"></i>
                            Email
                        </label>
                        <div class="input-wrapper">
                            <input type="email" id="profile-email" name="email" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="profile-password" class="form-label">
                            <i class="fas fa-lock"></i>
                            Nouveau mot de passe (optionnel)
                        </label>
                        <div class="input-wrapper">
                            <input type="password" id="profile-password" name="password" class="form-input">
                            <span class="input-focus-border"></span>
                        </div>
                        <small class="field-help">Laissez vide pour conserver le mot de passe actuel</small>
                    </div>
                </div>

                <div class="form-actions-modern">
                    <button type="submit" class="btn-modern btn-primary" id="profile-submit-btn">
                        <i class="fas fa-save"></i>
                        <span class="btn-text">Sauvegarder</span>
                    </button>
                </div>
            </form>
        </section>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div class="modal" id="delete-admin-modal" style="display:none;">
        <div class="modal-content">
            <span class="modal-close" id="close-delete-admin-modal">&times;</span>
            <h2>Supprimer l'Administrateur</h2>
            <p>Voulez-vous vraiment supprimer l'administrateur <strong id="delete-admin-name"></strong> ?</p>
            <div class="modal-actions">
                <button class="btn btn-danger" id="confirm-delete-admin-btn">Supprimer</button>
                <button class="btn btn-secondary" id="cancel-delete-admin-btn">Annuler</button>
            </div>
        </div>
    </div>
</main>
