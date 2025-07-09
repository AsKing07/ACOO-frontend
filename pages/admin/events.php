<main class="body-event-dashboard" id="body-event-dashboard">
    <div class="main-container">
        <!-- En-tête principal avec stats -->
        <div class="page-header">
            <div class="page-header__content">
                <h1 class="page-title">
                    <i class="fas fa-calendar-alt"></i>
                    Gestion du Calendrier
                </h1>
                <p class="page-subtitle">Organisez et planifiez tous vos événements et horaires</p>
            </div>
            <div class="page-header__stats">
                <div class="stat-card">
                    <div class="stat-value" id="events-count">0</div>
                    <div class="stat-label">Événements</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="recurring-count">0</div>
                    <div class="stat-label">Horaires récurrents</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="exceptions-count">0</div>
                    <div class="stat-label">Exceptions</div>
                </div>
            </div>
        </div>
        
        <!-- Section contrôles unifiés -->
        <div class="events-controls">
            <div class="events-controls__actions">
                <div class="dropdown">
                    <button class="btn-primary dropdown-toggle" id="add-dropdown-btn">
                        <i class="fas fa-plus"></i>
                        Ajouter
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="dropdown-menu" id="add-dropdown-menu">
                        <button class="dropdown-item" id="add-event-btn">
                            <i class="fas fa-calendar-plus"></i>
                            Événement ponctuel
                        </button>
                        <button class="dropdown-item" id="add-recurring-btn">
                            <i class="fas fa-repeat"></i>
                            Horaire récurrent
                        </button>
                        <button class="dropdown-item" id="add-exception-btn">
                            <i class="fas fa-exclamation-triangle"></i>
                            Exception d'horaire
                        </button>
                    </div>
                </div>
                <button class="btn-secondary" id="toggle-view-btn">
                    <i class="fas fa-list"></i>
                    Vue liste
                </button>
            </div>
            <div class="events-controls__filters">
                <select id="calendar-type-filter" class="filter-select">
                    <option value="">Tous les éléments</option>
                    <option value="events">Événements ponctuels</option>
                    <option value="recurring">Horaires récurrents</option>
                    <option value="exceptions">Exceptions</option>
                </select>
                <select id="sport-filter" class="filter-select">
                    <option value="">Tous les sports</option>
                    <!-- Les sports seront chargés dynamiquement -->
                </select>
            </div>
        </div>

        <!-- Loader -->
        <div id="calendar-loader" style="display:none;text-align:center;margin:2rem 0;">
            <div class="loader-spinner"></div>
            <p>Chargement du calendrier...</p>
        </div>

        <!-- Calendrier unifié -->
        <div class="calendar-container">
            <div class="calendar">
                <div class="header-calendar">
                    <button id="prev-month-btn" class="nav-btn">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="month" id="month-display">JUILLET<br>2025</div>
                    <button id="next-month-btn" class="nav-btn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="calendar-legend">
                    <button class="btn-today" id="today-btn">Aujourd'hui</button>
                    <div class="calendar-legend-items">
                        <div class="legend-item">
                            <div class="legend-color event-color"></div>
                            <span>Événements</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color recurring-color"></div>
                            <span>Horaires récurrents</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color exception-color"></div>
                            <span>Exceptions</span>
                        </div>
                    </div>
                </div>
                <div class="day-names">
                    <div>LUNDI</div>
                    <div>MARDI</div>
                    <div>MERCREDI</div>
                    <div>JEUDI</div>
                    <div>VENDREDI</div>
                    <div>SAMEDI</div>
                    <div>DIMANCHE</div>
                </div>
                <div class="grid-calendar" id="calendar-grid">
                    <!-- Les jours seront générés dynamiquement -->
                </div>
            </div>
        </div>

        <!-- Tableau unifié modernisé -->
        <div class="data-section" id="calendar-table-section">
            <div class="data-section__header">
                <div class="data-section__title">
                    <h2>
                        <i class="fas fa-list"></i>
                        Calendrier détaillé
                    </h2>
                    <span id="calendar-count" class="item-count">0 élément(s)</span>
                </div>
                <div class="data-section__actions">
                    <button class="btn-action btn-export" id="export-calendar-btn">
                        <i class="fas fa-download"></i>
                        Exporter
                    </button>
                    <button class="btn-action btn-refresh" id="refresh-calendar-btn">
                        <i class="fas fa-sync-alt"></i>
                        Actualiser
                    </button>
                </div>
            </div>
            
            <div class="table-container">
                <table class="modern-table">
                    <thead>
                        <tr>
                            <th>
                                <div class="th-content">
                                    <i class="fas fa-heading"></i>
                                    Titre
                                </div>
                            </th>
                            <th>
                                <div class="th-content">
                                    <i class="fas fa-tag"></i>
                                    Type
                                </div>
                            </th>
                            <th>
                                <div class="th-content">
                                    <i class="fas fa-dumbbell"></i>
                                    Sport/Équipe
                                </div>
                            </th>
                            <th>
                                <div class="th-content">
                                    <i class="fas fa-clock"></i>
                                    Horaire
                                </div>
                            </th>
                            <th>
                                <div class="th-content">
                                    <i class="fas fa-map-marker-alt"></i>
                                    Lieu
                                </div>
                            </th>
                            <th>
                                <div class="th-content">
                                    <i class="fas fa-info-circle"></i>
                                    Statut
                                </div>
                            </th>
                            <th>
                                <div class="th-content">
                                    <i class="fas fa-cog"></i>
                                    Actions
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="calendar-table-body">
                        <!-- Les éléments seront chargés dynamiquement -->
                    </tbody>
                </table>
                
                <div id="no-calendar-items-message" style="display:none;" class="empty-state">
                    <div class="empty-state__icon">
                        <i class="fas fa-calendar-times"></i>
                    </div>
                    <h3 class="empty-state__title">Aucun élément trouvé</h3>
                    <p class="empty-state__message">Aucun élément ne correspond à vos critères de recherche.</p>
                    <button class="btn-primary" onclick="calendarManager.showAddDropdown()">
                        <i class="fas fa-plus"></i>
                        Ajouter un élément
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de visualisation d'événement -->
    <div class="modal" id="view-modal" style="display:none;">
        <div class="modal-content modal-view">
            <div class="modal-header">
                <h2 id="view-modal-title">
                    <i class="fas fa-eye"></i>
                    Détails de l'événement
                </h2>
                <span class="modal-close" id="close-view-modal">&times;</span>
            </div>
            
            <div class="view-content">
                <div class="view-section">
                    <div class="view-header">
                        <h3 id="view-item-title" class="view-title">Titre de l'événement</h3>
                        <div class="view-badges">
                            <span id="view-item-type" class="badge badge-primary">Type</span>
                            <span id="view-item-status" class="badge badge-status">Statut</span>
                        </div>
                    </div>
                    
                    <div class="view-details">
                        <div class="detail-group">
                            <div class="detail-item">
                                <div class="detail-label">
                                    <i class="fas fa-align-left"></i>
                                    Description
                                </div>
                                <div id="view-item-description" class="detail-value">
                                    <!-- Description sera injectée ici -->
                                </div>
                            </div>
                        </div>
                        
                        <div class="detail-grid">
                            <div class="detail-item">
                                <div class="detail-label">
                                    <i class="fas fa-calendar"></i>
                                    Date
                                </div>
                                <div id="view-item-date" class="detail-value">
                                    <!-- Date sera injectée ici -->
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <div class="detail-label">
                                    <i class="fas fa-clock"></i>
                                    Horaire
                                </div>
                                <div id="view-item-time" class="detail-value">
                                    <!-- Horaire sera injecté ici -->
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <div class="detail-label">
                                    <i class="fas fa-map-marker-alt"></i>
                                    Lieu
                                </div>
                                <div id="view-item-location" class="detail-value">
                                    <!-- Lieu sera injecté ici -->
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <div class="detail-label">
                                    <i class="fas fa-dumbbell"></i>
                                    Sport
                                </div>
                                <div id="view-item-sport" class="detail-value">
                                    <!-- Sport sera injecté ici -->
                                </div>
                            </div>
                        </div>
                        
                        <div id="view-teams-section" class="detail-group" style="display:none;">
                            <div class="detail-item">
                                <div class="detail-label">
                                    <i class="fas fa-users"></i>
                                    Équipes participantes
                                </div>
                                <div id="view-item-teams" class="detail-value teams-list">
                                    <!-- Équipes seront injectées ici -->
                                </div>
                            </div>
                        </div>
                        
                        <div id="view-recurring-info" class="detail-group recurring-info" style="display:none;">
                            <div class="recurring-header">
                                <i class="fas fa-repeat"></i>
                                <span>Informations de récurrence</span>
                            </div>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <div class="detail-label">Jour de la semaine</div>
                                    <div id="view-recurring-day" class="detail-value">-</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">Fréquence</div>
                                    <div id="view-recurring-frequency" class="detail-value">-</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">Durée</div>
                                    <div id="view-recurring-duration" class="detail-value">-</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">Date de fin</div>
                                    <div id="view-recurring-end" class="detail-value">-</div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="view-exception-info" class="detail-group exception-info" style="display:none;">
                            <div class="exception-header">
                                <i class="fas fa-exclamation-triangle"></i>
                                <span>Informations d'exception</span>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Raison</div>
                                <div id="view-exception-reason" class="detail-value">-</div>
                            </div>
                        </div>
                        
                        <div id="view-images-section" class="detail-group" style="display:none;">
                            <div class="detail-item">
                                <div class="detail-label">
                                    <i class="fas fa-images"></i>
                                    Images
                                </div>
                                <div id="view-item-images" class="detail-value images-gallery">
                                    <!-- Images seront injectées ici -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="view-actions">
                <button class="btn-modern btn-secondary" id="close-view-btn">
                    <i class="fas fa-times"></i>
                    Fermer
                </button>
                <button class="btn-modern btn-primary" id="edit-from-view-btn">
                    <i class="fas fa-edit"></i>
                    Modifier
                </button>
            </div>
        </div>
    </div>

    <!-- Modal Événement -->
    <div class="modal" id="event-modal" style="display:none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="event-modal-title">Ajouter un Événement</h2>
                <span class="modal-close" id="close-event-modal">&times;</span>
            </div>
            
            <form id="event-form" class="modern-form">
                <input type="hidden" id="event-id">
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="event-title" class="form-label">
                            <i class="fas fa-heading"></i>
                            Titre de l'événement *
                        </label>
                        <div class="input-wrapper">
                            <input type="text" id="event-title" name="title" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="event-content" class="form-label">
                            <i class="fas fa-align-left"></i>
                            Description
                        </label>
                        <div class="input-wrapper">
                            <textarea id="event-content" name="content" rows="3" class="form-input"></textarea>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row form-row-2cols">
                    <div class="form-group">
                        <label for="event-type" class="form-label">
                            <i class="fas fa-tag"></i>
                            Type d'événement *
                        </label>
                        <div class="input-wrapper">
                            <select id="event-type" name="eventType" class="form-input" required>
                                <option value="">Sélectionner un type</option>
                                <option value="Para-Aviron">Para-Aviron</option>
                                <option value="Avifit">Avifit</option>
                                <option value="Aviron Indoor">Aviron Indoor</option>
                                <option value="Aviron en rivière">Aviron en rivière</option>
                                <option value="Aviron Santé et bien-être">Aviron Santé et bien-être</option>
                                <option value="Compétition">Compétition</option>
                                <option value="Formation">Formation</option>
                            </select>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="event-sport" class="form-label">
                            <i class="fas fa-dumbbell"></i>
                            Sport
                        </label>
                        <div class="input-wrapper">
                            <select id="event-sport" name="sport" class="form-input">
                                <option value="">Sélectionner un sport</option>
                                <!-- Les sports seront chargés dynamiquement -->
                            </select>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="event-location" class="form-label">
                            <i class="fas fa-map-marker-alt"></i>
                            Lieu *
                        </label>
                        <div class="input-wrapper">
                            <input type="text" id="event-location" name="location" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row form-row-2cols">
                    <div class="form-group">
                        <label for="event-start-date" class="form-label">
                            <i class="fas fa-calendar"></i>
                            Date de début *
                        </label>
                        <div class="input-wrapper">
                            <input type="date" id="event-start-date" name="startDate" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="event-start-time" class="form-label">
                            <i class="fas fa-clock"></i>
                            Heure de début *
                        </label>
                        <div class="input-wrapper">
                            <input type="time" id="event-start-time" name="startTime" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row form-row-2cols">
                    <div class="form-group">
                        <label for="event-end-date" class="form-label">
                            <i class="fas fa-calendar"></i>
                            Date de fin *
                        </label>
                        <div class="input-wrapper">
                            <input type="date" id="event-end-date" name="endDate" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="event-end-time" class="form-label">
                            <i class="fas fa-clock"></i>
                            Heure de fin *
                        </label>
                        <div class="input-wrapper">
                            <input type="time" id="event-end-time" name="endTime" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-users"></i>
                            Équipes participantes
                        </label>
                        <div id="teams-selector" class="teams-selector">
                            <!-- Les équipes seront chargées dynamiquement -->
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="event-cancelled" name="isCancelled">
                            <span class="checkbox-custom"></span>
                            <span class="checkbox-text">Événement annulé</span>
                        </label>
                    </div>
                </div>

                <div class="form-actions-modern">
                    <button type="button" class="btn-modern btn-secondary" id="cancel-event-btn">
                        <i class="fas fa-times"></i>
                        <span class="btn-text">Annuler</span>
                    </button>
                    <button type="submit" class="btn-modern btn-primary" id="event-submit-btn">
                        <i class="fas fa-save"></i>
                        <span class="btn-text">Enregistrer</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Horaire Récurrent -->
    <div class="modal" id="recurring-modal" style="display:none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="recurring-modal-title">Ajouter un Horaire Récurrent</h2>
                <span class="modal-close" id="close-recurring-modal">&times;</span>
            </div>
            
            <form id="recurring-form" class="modern-form">
                <input type="hidden" id="recurring-id">
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="recurring-title" class="form-label">
                            <i class="fas fa-heading"></i>
                            Titre de l'horaire *
                        </label>
                        <div class="input-wrapper">
                            <input type="text" id="recurring-title" name="title" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="recurring-description" class="form-label">
                            <i class="fas fa-align-left"></i>
                            Description
                        </label>
                        <div class="input-wrapper">
                            <textarea id="recurring-description" name="description" rows="3" class="form-input"></textarea>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row form-row-2cols">
                    <div class="form-group">
                        <label for="recurring-sport" class="form-label">
                            <i class="fas fa-dumbbell"></i>
                            Sport *
                        </label>
                        <div class="input-wrapper">
                            <select id="recurring-sport" name="sport" class="form-input" required>
                                <option value="">Sélectionner un sport</option>
                                <!-- Les sports seront chargés dynamiquement -->
                            </select>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="recurring-team" class="form-label">
                            <i class="fas fa-users"></i>
                            Équipe
                        </label>
                        <div class="input-wrapper">
                            <select id="recurring-team" name="team" class="form-input">
                                <option value="">Sélectionner une équipe</option>
                                <!-- Les équipes seront chargées dynamiquement -->
                            </select>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row form-row-2cols">
                    <div class="form-group">
                        <label for="recurring-day" class="form-label">
                            <i class="fas fa-calendar-day"></i>
                            Jour de la semaine *
                        </label>
                        <div class="input-wrapper">
                            <select id="recurring-day" name="day_of_week" class="form-input" required>
                                <option value="">Sélectionner un jour</option>
                                <option value="Lundi">Lundi</option>
                                <option value="Mardi">Mardi</option>
                                <option value="Mercredi">Mercredi</option>
                                <option value="Jeudi">Jeudi</option>
                                <option value="Vendredi">Vendredi</option>
                                <option value="Samedi">Samedi</option>
                                <option value="Dimanche">Dimanche</option>
                            </select>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="recurring-location" class="form-label">
                            <i class="fas fa-map-marker-alt"></i>
                            Lieu *
                        </label>
                        <div class="input-wrapper">
                            <input type="text" id="recurring-location" name="location" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row form-row-3cols">
                    <div class="form-group">
                        <label for="recurring-start-time" class="form-label">
                            <i class="fas fa-clock"></i>
                       1er Jour et Heure de début *
                        </label>
                        <div class="input-wrapper">
                            <input type="datetime-local" id="recurring-start-time" name="start_time" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="recurring-duration" class="form-label">
                            <i class="fas fa-hourglass-half"></i>
                            Durée (minutes) *
                        </label>
                        <div class="input-wrapper">
                            <input type="number" id="recurring-duration" name="duration" min="15" max="480" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="recurring-frequency" class="form-label">
                            <i class="fas fa-repeat"></i>
                            Fréquence
                        </label>
                        <div class="input-wrapper">
                            <select id="recurring-frequency" name="frequency" class="form-input">
                                <option value="Hebdomadaire">Hebdomadaire</option>
                                <option value="Bi-hebdomadaire">Bi-hebdomadaire</option>
                                <option value="Mensuel">Mensuel</option>
                            </select>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="recurring-end-date" class="form-label">
                            <i class="fas fa-calendar-times"></i>
                            Date de fin (optionnelle)
                        </label>
                        <div class="input-wrapper">
                            <input type="date" id="recurring-end-date" name="end_date" class="form-input">
                            <span class="input-focus-border"></span>
                        </div>
                        <small class="field-help">Laissez vide pour un horaire permanent</small>
                    </div>
                </div>

                <div class="form-actions-modern">
                    <button type="button" class="btn-modern btn-secondary" id="cancel-recurring-btn">
                        <i class="fas fa-times"></i>
                        Annuler
                    </button>
                    <button type="submit" class="btn-modern btn-primary" id="recurring-submit-btn">
                        <i class="fas fa-save"></i>
                        <span class="btn-text">Enregistrer</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Exception d'Horaire -->
    <div class="modal" id="exception-modal" style="display:none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="exception-modal-title">Ajouter une Exception d'Horaire</h2>
                <span class="modal-close" id="close-exception-modal">&times;</span>
            </div>
            
            <form id="exception-form" class="modern-form">
                <input type="hidden" id="exception-id">
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="exception-recurring" class="form-label">
                            <i class="fas fa-repeat"></i>
                            Horaire récurrent concerné *
                        </label>
                        <div class="input-wrapper">
                            <select id="exception-recurring" name="recurring_schedule" class="form-input" required>
                                <option value="">Sélectionner un horaire récurrent</option>
                                <!-- Les horaires récurrents seront chargés dynamiquement -->
                            </select>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="exception-date" class="form-label">
                            <i class="fas fa-calendar"></i>
                            Date de l'exception *
                        </label>
                        <div class="input-wrapper">
                            <input type="date" id="exception-date" name="date" class="form-input" required>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="exception-cancelled" name="is_cancelled">
                            <span class="checkbox-custom">
                                <i class="fas fa-check"></i>
                            </span>
                            <span class="checkbox-text">
                                <i class="fas fa-ban"></i>
                                Séance annulée
                            </span>
                        </label>
                        <small class="field-help">Cochez si la séance est annulée, ou modifiez les détails ci-dessous</small>
                    </div>
                </div>

                <div id="exception-modification-fields">
                    <div class="form-row form-row-2cols">
                        <div class="form-group">
                            <label for="exception-start-time" class="form-label">
                                <i class="fas fa-clock"></i>
                                Nouvelle heure de début
                            </label>
                            <div class="input-wrapper">
                                <input type="time" id="exception-start-time" name="startTime" class="form-input">
                                <span class="input-focus-border"></span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="exception-end-time" class="form-label">
                                <i class="fas fa-clock"></i>
                                Nouvelle heure de fin
                            </label>
                            <div class="input-wrapper">
                                <input type="time" id="exception-end-time" name="endTime" class="form-input">
                                <span class="input-focus-border"></span>
                            </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="exception-location" class="form-label">
                                <i class="fas fa-map-marker-alt"></i>
                                Nouveau lieu
                            </label>
                            <div class="input-wrapper">
                                <input type="text" id="exception-location" name="location" class="form-input">
                                <span class="input-focus-border"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="exception-reason" class="form-label">
                            <i class="fas fa-comment"></i>
                            Raison de l'exception
                        </label>
                        <div class="input-wrapper">
                            <textarea id="exception-reason" name="reason" rows="3" class="form-input" 
                                     placeholder="Ex: Report pour météo, changement de lieu, etc."></textarea>
                            <span class="input-focus-border"></span>
                        </div>
                    </div>
                </div>

                <div class="form-actions-modern">
                    <button type="button" class="btn-modern btn-secondary" id="cancel-exception-btn">
                        <i class="fas fa-times"></i>
                        Annuler
                    </button>
                    <button type="submit" class="btn-modern btn-primary" id="exception-submit-btn">
                        <i class="fas fa-save"></i>
                        <span class="btn-text">Enregistrer</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal de suppression unifiée -->
    <div class="modal" id="delete-modal" style="display:none;">
        <div class="modal-content">
            <span class="modal-close" id="close-delete-modal">&times;</span>
            <h2>Supprimer l'élément</h2>
            <p>Voulez-vous vraiment supprimer <strong id="delete-item-name"></strong> ?</p>
            <div id="delete-warning" class="warning-message" style="display:none;">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Attention : Supprimer cet horaire récurrent supprimera aussi toutes ses exceptions associées.</span>
            </div>
            <div class="modal-actions">
                <button class="btn btn-danger" id="confirm-delete-btn">Supprimer</button>
                <button class="btn btn-secondary" id="cancel-delete-btn">Annuler</button>
            </div>
        </div>
    </div>
</main>
