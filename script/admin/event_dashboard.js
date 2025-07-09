// ===================================================================
// IMPORTS DES DÉPENDANCES
// ===================================================================
import { showNotification } from "../showNotification.js";
import { getEvents, addEvent, updateEvent, deleteEvent } from "../../service/api/eventsApi.js";
import { getRecurringSchedules, addRecurringSchedule, updateRecurringSchedule, deleteRecurringSchedule } from "../../service/api/recurringScheduleApi.js";
import { getScheduleExceptions, addScheduleException, updateScheduleException, deleteScheduleException } from "../../service/api/scheduleExceptionApi.js";
import { getSports } from "../../service/api/sportApi.js";
import { getTeams } from "../../service/api/teamApi.js";
import { fileToBase64 } from "../../service/imageFormatter.js";

// ===================================================================
// CLASSE PRINCIPALE - GESTIONNAIRE DE CALENDRIER UNIFIÉ
// ===================================================================
/**
 * UnifiedCalendarManager - Gestionnaire de calendrier unifié
 * 
 * Cette classe gère trois types d'éléments :
 * 1. Événements ponctuels (events)
 * 2. Horaires récurrents (recurring schedules)
 * 3. Exceptions d'horaires (schedule exceptions)
 * 
 * Fonctionnalités principales :
 * - Affichage en vue calendrier ou liste
 * - Filtrage par type et sport
 * - CRUD (Create, Read, Update, Delete) pour tous les types
 * - Export en ICS/CSV
 * - Interface modale pour l'édition
 */
class UnifiedCalendarManager {
    
    // ================================================================
    // CONSTRUCTEUR ET INITIALISATION
    // ================================================================
    
    constructor() {
        // Noms des mois en français pour l'affichage
        this.monthNames = [
            'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
            'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'
        ];
        
        // ---- Stockage des données ----
        this.allEvents = [];                // Événements ponctuels
        this.allRecurringSchedules = [];    // Horaires récurrents
        this.allScheduleExceptions = [];    // Exceptions d'horaires
        this.allSports = [];                // Liste des sports
        this.allTeams = [];                 // Liste des équipes
        
        // ---- Données filtrées pour l'affichage ----
        this.filteredItems = [];            // Éléments affichés après filtrage
        
        // ---- État de l'interface utilisateur ----
        this.currentDate = new Date();      // Date actuellement affichée dans le calendrier
        this.viewMode = 'calendar';         // Mode d'affichage : 'calendar' ou 'table'
        this.selectedDate = null;           // Date sélectionnée pour l'ajout d'éléments
        
        // ---- Filtres actifs ----
        this.activeFilters = {
            type: '',   // Type d'élément : '', 'events', 'recurring', 'exceptions'
            sport: ''   // ID du sport sélectionné ou '' pour tous
        };
        
        // ---- État des modales et formulaires ----
        this.currentItemId = null;          // ID de l'élément en cours d'édition
        this.currentItemType = null;        // Type de l'élément en cours d'édition
        this.deleteItemId = null;           // ID de l'élément à supprimer
        this.deleteItemType = null;         // Type de l'élément à supprimer
        
        // ---- Références aux éléments DOM ----
        this.elements = {};                 // Cache des éléments DOM importants
        
        // Démarrer l'initialisation
        this.init();
    }

    /**
     * Initialisation principale du gestionnaire de calendrier
     * Séquence d'initialisation :
     * 1. Initialisation des références DOM
     * 2. Attachement des événements
     * 3. Chargement des données depuis l'API
     * 4. Rendu initial du calendrier et de la table
     * 5. Initialisation des tooltips
     */
    async init() {
        try {
            console.log('Initialisation du calendrier unifié...');
            this.initElements();        // Récupérer les références aux éléments DOM
            this.attachEventListeners(); // Attacher les gestionnaires d'événements
            await this.loadAllData();   // Charger toutes les données depuis l'API
            this.renderCalendar(this.currentDate);  // Afficher le calendrier
            this.renderUnifiedTable();  // Afficher la table unifiée
            this.initializeTooltips();  // Initialiser les tooltips
            console.log('Calendrier unifié initialisé avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'initialisation:', error);
            showNotification('Erreur lors de l\'initialisation du calendrier', 'error');
        }
    }

    // ================================================================
    // INITIALISATION DES RÉFÉRENCES DOM
    // ================================================================
    
    /**
     * Initialise les références aux éléments DOM importants
     * Organise les éléments par catégorie pour une meilleure lisibilité
     */
    initElements() {
        this.elements = {
            // ---- Navigation du calendrier ----
            monthDisplay: document.getElementById('month-display'),        // Affichage mois/année
            calendarGrid: document.getElementById('calendar-grid'),        // Grille des jours
            prevBtn: document.getElementById('prev-month-btn'),            // Bouton mois précédent
            nextBtn: document.getElementById('next-month-btn'),            // Bouton mois suivant
            todayBtn: document.getElementById('today-btn'),               // Bouton "Aujourd'hui"
            
            // ---- Contrôles d'ajout ----
            addDropdownBtn: document.getElementById('add-dropdown-btn'),   // Bouton dropdown d'ajout
            addDropdownMenu: document.getElementById('add-dropdown-menu'), // Menu dropdown
            addEventBtn: document.getElementById('add-event-btn'),         // Ajouter événement
            addRecurringBtn: document.getElementById('add-recurring-btn'), // Ajouter horaire récurrent
            addExceptionBtn: document.getElementById('add-exception-btn'), // Ajouter exception
            toggleViewBtn: document.getElementById('toggle-view-btn'),     // Toggle vue calendrier/liste
            
            // ---- Filtres ----
            calendarTypeFilter: document.getElementById('calendar-type-filter'), // Filtre par type
            sportFilter: document.getElementById('sport-filter'),               // Filtre par sport
            
            // ---- Vue tableau ----
            calendarTableSection: document.getElementById('calendar-table-section'),     // Section table
            calendarTableBody: document.getElementById('calendar-table-body'),           // Corps de table
            calendarCount: document.getElementById('calendar-count'),                    // Compteur d'éléments
            noCalendarItemsMessage: document.getElementById('no-calendar-items-message'), // Message "aucun élément"
            
            // ---- Modales ----
            eventModal: document.getElementById('event-modal'),           // Modale événement
            recurringModal: document.getElementById('recurring-modal'),   // Modale horaire récurrent
            exceptionModal: document.getElementById('exception-modal'),   // Modale exception
            deleteModal: document.getElementById('delete-modal'),         // Modale confirmation suppression
            
            // ---- Formulaires ----
            eventForm: document.getElementById('event-form'),             // Formulaire événement
            recurringForm: document.getElementById('recurring-form'),     // Formulaire horaire récurrent
            exceptionForm: document.getElementById('exception-form'),     // Formulaire exception
            
            // ---- Loader ----
            calendarLoader: document.getElementById('calendar-loader')    // Indicateur de chargement
        };

        // Vérifier les éléments manquants et les signaler
        const missingElements = [];
        Object.keys(this.elements).forEach(key => {
            if (!this.elements[key]) {
                missingElements.push(key);
            }
        });
        
        if (missingElements.length > 0) {
            console.warn('Éléments DOM manquants:', missingElements);
        }
    }

    // ================================================================
    // CHARGEMENT ET GESTION DES DONNÉES
    // ================================================================
    
    /**
     * Charge toutes les données nécessaires depuis l'API
     * Utilise Promise.all pour un chargement parallèle optimal
     */
    async loadAllData() {
        try {
            this.toggleLoader(true);
            
            // Chargement parallèle de toutes les données pour optimiser les performances
            const [events, recurringSchedules, scheduleExceptions, sports, teams] = await Promise.all([
                getEvents(),
                getRecurringSchedules(),
                getScheduleExceptions(),
                getSports(),
                getTeams()
            ]);
            
            // Stockage des données récupérées
            this.allEvents = events;
            this.allRecurringSchedules = recurringSchedules;
            this.allScheduleExceptions = scheduleExceptions;
            this.allSports = sports;
            this.allTeams = teams;
            
            // Mise à jour de l'interface avec les nouvelles données
            this.populateFormSelects();  // Remplir les selects des formulaires
            this.applyFilters();          // Appliquer les filtres actifs
            
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            showNotification('Erreur lors du chargement des données', 'error');
        } finally {
            this.toggleLoader(false);
        }
    }

    /**
     * Remplit les éléments de sélection (select, checkboxes) des formulaires
     * avec les données des sports et équipes
     */
    populateFormSelects() {
        // ---- Remplissage des selects de sports ----
        const sportSelects = ['event-sport', 'recurring-sport', 'sport-filter'];
        sportSelects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                const isFilter = selectId.includes('filter');
                // Option par défaut différente pour les filtres et les formulaires
                select.innerHTML = isFilter ? 
                    '<option value="">Tous les sports</option>' : 
                    '<option value="">Sélectionner un sport</option>';
                
                // Ajouter une option pour chaque sport
                this.allSports.forEach(sport => {
                    const option = document.createElement('option');
                    option.value = sport.id;
                    option.textContent = sport.name;
                    select.appendChild(option);
                });
            }
        });

        // ---- Remplissage des selects d'équipes ----
        const teamSelects = ['recurring-team', 'teams-selector'];
        teamSelects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                if (selectId === 'teams-selector') {
                    // Checkboxes pour les événements (sélection multiple)
                    select.innerHTML = '';
                    this.allTeams.forEach(team => {
                        const teamCheckbox = document.createElement('div');
                        teamCheckbox.className = 'team-checkbox';
                        teamCheckbox.innerHTML = `
                            <input type="checkbox" id="team-${team.id}" value="${team.id}">
                            <label for="team-${team.id}">${team.name}</label>
                        `;
                        select.appendChild(teamCheckbox);
                    });
                } else {
                    // Select classique pour horaires récurrents (sélection unique)
                    select.innerHTML = '<option value="">Sélectionner une équipe</option>';
                    this.allTeams.forEach(team => {
                        const option = document.createElement('option');
                        option.value = team.id;
                        option.textContent = team.name;
                        select.appendChild(option);
                    });
                }
            }
        });

        // ---- Remplissage du select des horaires récurrents pour les exceptions ----
        this.populateRecurringSchedulesSelect();
    }

    /**
     * Remplit le select des horaires récurrents pour le formulaire d'exception
     */
    populateRecurringSchedulesSelect() {
        const recurringSelect = document.getElementById('exception-recurring');
        if (recurringSelect) {
            recurringSelect.innerHTML = '<option value="">Sélectionner un horaire récurrent</option>';
            this.allRecurringSchedules.forEach(schedule => {
                const option = document.createElement('option');
                option.value = schedule.id;
                option.textContent = `${schedule.title} - ${schedule.getFormattedSchedule()}`;
                recurringSelect.appendChild(option);
            });
        }
    }

    // ================================================================
    // SYSTÈME DE FILTRAGE
    // ================================================================
    
    /**
     * Applique les filtres actifs aux données pour déterminer quels éléments afficher
     * Supporte le filtrage par type d'élément et par sport
     */
    applyFilters() {
        this.filteredItems = [];
        
        // ---- Filtrage des événements ponctuels ----
        if (!this.activeFilters.type || this.activeFilters.type === 'events') {
            let filteredEvents = this.allEvents;
            // Filtrage par sport si un sport est sélectionné
            if (this.activeFilters.sport) {
                filteredEvents = filteredEvents.filter(event => event.sport == this.activeFilters.sport);
            }
            // Marquer le type pour l'affichage unifié
            filteredEvents.forEach(item => item.itemType = 'event');
            this.filteredItems.push(...filteredEvents);
        }
        
        // ---- Filtrage des horaires récurrents ----
        if (!this.activeFilters.type || this.activeFilters.type === 'recurring') {
            let filteredRecurring = this.allRecurringSchedules;
            // Filtrage par sport si un sport est sélectionné
            if (this.activeFilters.sport) {
                filteredRecurring = filteredRecurring.filter(schedule => schedule.sport == this.activeFilters.sport);
            }
            // Marquer le type pour l'affichage unifié
            filteredRecurring.forEach(item => item.itemType = 'recurring');
            this.filteredItems.push(...filteredRecurring);
        }
        
        // ---- Filtrage des exceptions d'horaires ----
        if (!this.activeFilters.type || this.activeFilters.type === 'exceptions') {
            const filteredExceptions = this.allScheduleExceptions;
            // Note: Les exceptions n'ont pas de sport direct, elles héritent de l'horaire récurrent
            // Marquer le type pour l'affichage unifié
            filteredExceptions.forEach(item => item.itemType = 'exception');
            this.filteredItems.push(...filteredExceptions);
        }
        
        // Mettre à jour le compteur d'éléments affichés
        this.updateCalendarCount();
    }

    renderCalendar(date) {
        if (!this.elements.calendarGrid || !this.elements.monthDisplay) return;

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const startDay = (firstDayOfMonth.getDay() + 6) % 7; // Lundi = 0
        const totalDays = lastDayOfMonth.getDate();

        this.elements.calendarGrid.innerHTML = '';

        // Cellules vides pour aligner le premier jour de la semaine
        for (let i = 0; i < startDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day empty-day';
            this.elements.calendarGrid.appendChild(emptyCell);
        }

        // Jours du mois courant uniquement
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

        for (let i = 1; i <= totalDays; i++) {
            const currentDay = new Date(year, month, i);
            const isToday = isCurrentMonth && i === today.getDate();
            const dayElement = this.createDayElement(i, false, currentDay, isToday);
            this.elements.calendarGrid.appendChild(dayElement);
        }

        // Cellules vides pour compléter la grille si nécessaire
        const totalDisplayed = startDay + totalDays;
        const remaining = Math.ceil(totalDisplayed / 7) * 7 - totalDisplayed;

        for (let i = 0; i < remaining; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day empty-day';
            this.elements.calendarGrid.appendChild(emptyCell);
        }

        // Mise à jour du mois + année
        this.elements.monthDisplay.innerHTML = `${this.monthNames[month]}<br>${year}`;
    }

    createDayElement(dayNumber, isAdjacent, date, isToday = false) {
        const dayElement = document.createElement('div');
        dayElement.className = `day ${isAdjacent ? 'adjacent' : ''} ${isToday ? 'today' : ''}`;
        
        // Numéro du jour
        const dayNumberElement = document.createElement('div');
        dayNumberElement.className = 'day-number';
        dayNumberElement.textContent = dayNumber;
        dayElement.appendChild(dayNumberElement);

        if (!isAdjacent) {
            // Rechercher tous les éléments de ce jour
            const dayItems = this.getItemsForDate(date);
            
            if (dayItems.length > 0) {
                dayElement.classList.add('has-items');
                
                const itemsListElement = document.createElement('div');
                itemsListElement.className = 'items-list';
                
                // Afficher jusqu'à 2 éléments avec plus de détails
                const visibleItems = dayItems.slice(0, 2);
                visibleItems.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.className = `item-event ${item.itemType}-item`;
                    
                    // Titre plus lisible (avec vérification de l'existence)
                    const titleElement = document.createElement('div');
                    titleElement.className = 'item-title';
                    let itemTitle = item.title || '';
                    if(item.itemType === 'exception')
                    {
                        itemTitle = `Exception de l'horaire récurrent: ${item.recurring_schedule.title || 'Non spécifié'}`;

                    }
                   
                    titleElement.textContent = itemTitle.length > 15 ? 
                        itemTitle.substring(0, 15) + '...' : itemTitle;
                    
                    // Heure si disponible
                    const timeElement = document.createElement('div');
                    timeElement.className = 'item-time';
                    if (item.itemType === 'event' && item.startDatetime) {
                        const eventDate = this.parseApiDateTime(item.startDatetime);
                        const endDate = this.parseApiDateTime(item.endDatetime);
                        if (eventDate) {
                            timeElement.textContent = eventDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                        }
                        if (endDate) {
                            timeElement.textContent += ` - ${endDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
                        }
                    } else if (item.itemType === 'recurring' && item.start_time) {
                        timeElement.textContent = this.extractTimeFromDateTime(item.start_time);
                        if(item.duration)
                        {
                            timeElement.textContent += ` - ${this.getFormattedEndTimeForRecurring(item)}`;
                        }
                    } else if (item.itemType === 'exception') {
                        timeElement.textContent = item.is_cancelled ? 'Annulé' : 'Modifié';
                    }
                    
                    itemElement.appendChild(titleElement);
                    if (timeElement.textContent) {
                        itemElement.appendChild(timeElement);
                    }
                    
                    itemElement.title = this.getItemTooltip(item);
                    itemElement.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.viewItem(item.id, item.itemType);
                    });
                    itemsListElement.appendChild(itemElement);
                });

                // Afficher "+X autres" si il y a plus de 2 éléments
                if (dayItems.length > 2) {
                    const moreItems = document.createElement('div');
                    moreItems.className = 'more-items';
                    moreItems.textContent = `+${dayItems.length - 2} autres`;
                    moreItems.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.showDayItems(date, dayItems);
                    });
                    itemsListElement.appendChild(moreItems);
                }

                dayElement.appendChild(itemsListElement);
            }

            // Clic sur le jour pour ajouter un élément
            dayElement.addEventListener('click', () => {
                this.showAddDropdown(date);
            });
        }

        return dayElement;
    }

    isRecurringScheduleOnDate(schedule, date) {
        const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const dayOfWeek = dayNames[date.getDay()];
        
        if (schedule.day_of_week !== dayOfWeek) {
            return false;
        }
        
        // Vérifier si la date est dans la plage de validité
        if (schedule.end_date) {
            const endDate = new Date(schedule.end_date);
            if (date > endDate) {
                return false;
            }
        }
        
        // Vérifier les exceptions pour cette date
        const hasException = this.allScheduleExceptions.some(exception => {
            let exceptionDate;
            if (exception.date.includes(' ')) {
                exceptionDate = this.parseApiDateTime(exception.date);
            } else {
                exceptionDate = this.parseApiDateTime(exception.date + ' 00:00');
            }
            return exception.recurring_schedule == schedule.id && 
                   exceptionDate && exceptionDate.toDateString() === date.toDateString();
        });
        
        return !hasException;
    }

    getItemTooltip(item) {
        switch (item.itemType) {
            case 'event':
                return `Événement: ${item.title}`;
            case 'recurring':
                return `Horaire récurrent: ${item.title} - ${this.extractTimeFromDateTime(item.start_time)}`;
            case 'exception':
                const status = item.is_cancelled ? 'Annulé' : 'Modifié';
                return `Exception: ${status} - ${item.reason || 'Aucune raison'}`;
            default:
                return item.title;
        }
    }

    renderUnifiedTable() {
        if (!this.elements.calendarTableBody) return;

        if (this.filteredItems.length === 0) {
            this.elements.calendarTableBody.innerHTML = '';
            if (this.elements.noCalendarItemsMessage) {
                this.elements.noCalendarItemsMessage.style.display = 'block';
            }
        } else {
            if (this.elements.noCalendarItemsMessage) {
                this.elements.noCalendarItemsMessage.style.display = 'none';
            }
            
            this.elements.calendarTableBody.innerHTML = this.filteredItems.map(item => 
                this.createUnifiedTableRow(item)
            ).join('');
        }
        
        this.updateCalendarCount();
    }

    createUnifiedTableRow(item) {
        const typeLabels = {
            'event': 'Événement',
            'recurring': 'Horaire récurrent',
            'exception': 'Exception'
        };
        
        const typeLabel = typeLabels[item.itemType];
        const typeClass = `type-${item.itemType}`;
        
        let sportTeamInfo = '';
        let scheduleInfo = '';
        let statusInfo = '';
        let rowClass = '';
        
        switch (item.itemType) {
            case 'event':
                const sportName = this.allSports.find(s => s.id == item.sport)?.name || '';
                const teamNames = item.teams?.map(teamId => 
                    this.allTeams.find(t => t.id == teamId)?.name
                ).filter(Boolean).join(', ') || '';
                sportTeamInfo = [sportName, teamNames].filter(Boolean).join(' - ');
                
                const startDate = this.parseApiDateTime(item.startDatetime);
                const endDate = this.parseApiDateTime(item.endDatetime);
                if (startDate && endDate) {
                    scheduleInfo = `
                        <div class="schedule-info">
                            <div class="schedule-date">${startDate.toLocaleDateString('fr-FR')}</div>
                            <div class="schedule-time">${startDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})} - ${endDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</div>
                        </div>
                    `;
                } else {
                    scheduleInfo = `
                        <div class="schedule-info">
                            <div class="schedule-date">Date invalide</div>
                            <div class="schedule-time">-</div>
                        </div>
                    `;
                }
                
                statusInfo = item.isCancelled ? 
                    '<span class="badge badge-status status-cancelled"><i class="fas fa-ban"></i> Annulé</span>' : 
                    '<span class="badge badge-status status-active"><i class="fas fa-check"></i> Programmé</span>';
                break;
                
            case 'recurring':
                rowClass = 'item-recurring';
                const recurSport = this.allSports.find(s => s.id == item.sport)?.name || '';
                const recurTeam = this.allTeams.find(t => t.id == item.team)?.name || '';
                sportTeamInfo = [recurSport, recurTeam].filter(Boolean).join(' - ');
                
                scheduleInfo = `
                    <div class="schedule-info">
                        <div class="schedule-date">${item.day_of_week}</div>
                        <div class="schedule-time">${this.extractTimeFromDateTime(item.start_time)} - ${this.getFormattedEndTimeForRecurring(item)}</div>
                    </div>
                `;
                
                statusInfo = '<span class="badge badge-status status-recurring"><i class="fas fa-repeat"></i> Récurrent</span>';
                break;
                
            case 'exception':
                rowClass = 'item-exception';
                const recurringSchedule = this.allRecurringSchedules.find(rs => rs.id == item.recurring_schedule);
                if (recurringSchedule) {
                    const exceptSport = this.allSports.find(s => s.id == recurringSchedule.sport)?.name || '';
                    sportTeamInfo = exceptSport;
                }
                
                let exceptionDate;
                if (item.date.includes(' ')) {
                    exceptionDate = this.parseApiDateTime(item.date);
                } else {
                    exceptionDate = this.parseApiDateTime(item.date + ' 00:00');
                }
                
                if (exceptionDate) {
                    scheduleInfo = item.is_cancelled ? 
                        `<div class="schedule-info">
                            <div class="schedule-date">${exceptionDate.toLocaleDateString('fr-FR')}</div>
                            <div class="schedule-time">Séance annulée</div>
                        </div>` :
                        `<div class="schedule-info">
                            <div class="schedule-date">${exceptionDate.toLocaleDateString('fr-FR')}</div>
                            <div class="schedule-time">${this.extractTimeFromDateTime(item.startTime)} - ${this.extractTimeFromDateTime(item.endTime)}</div>
                        </div>`;
                } else {
                    scheduleInfo = `<div class="schedule-info">
                        <div class="schedule-date">Date invalide</div>
                        <div class="schedule-time">-</div>
                    </div>`;
                }
                
                statusInfo = item.is_cancelled ? 
                    '<span class="badge badge-status status-cancelled"><i class="fas fa-ban"></i> Annulé</span>' : 
                    '<span class="badge badge-status status-modified"><i class="fas fa-exclamation-triangle"></i> Modifié</span>';
                break;
        }

        return `
            <tr class="${rowClass}" data-item-id="${item.id}" data-item-type="${item.itemType}">
                <td>
                    <div class="item-title">
                        <strong>${item.itemType ==='exception'? `Exception de l'horaire récurrent ${item.recurring_schedule.title}` : item.title}</strong>
                        ${item.content ? `<div class="item-description">${item.content.substring(0, 60)}${item.content.length > 60 ? '...' : ''}</div>` : ''}
                    </div>
                </td>
                <td><span class="type-badge ${typeClass}">${typeLabel}</span></td>
                <td>${sportTeamInfo}</td>
                <td>${scheduleInfo}</td>
                <td>
                    <div class="location-info">
                        <i class="fas fa-map-marker-alt"></i>
                        ${item.location || 'Non spécifié'}
                    </div>
                </td>
                <td>${statusInfo}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-table-action btn-view" onclick="window.calendarManager.viewItem(${item.id}, '${item.itemType}')" title="Voir les détails">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-table-action btn-edit" onclick="window.calendarManager.editItem(${item.id}, '${item.itemType}')" title="Modifier">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-table-action btn-delete" onclick="window.calendarManager.confirmDeleteItem(${item.id}, '${item.itemType}')" title="Supprimer">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    updateCalendarCount() {
        if (this.elements.calendarCount) {
            this.elements.calendarCount.textContent = `${this.filteredItems.length} élément(s)`;
        }
        
        // Mettre à jour les statistiques de l'en-tête
        this.updateHeaderStats();
    }

    updateHeaderStats() {
        const eventsCount = this.allEvents.length;
        const recurringCount = this.allRecurringSchedules.length;
        const exceptionsCount = this.allScheduleExceptions.length;
        
        const eventsCountEl = document.getElementById('events-count');
        const recurringCountEl = document.getElementById('recurring-count');
        const exceptionsCountEl = document.getElementById('exceptions-count');
        
        if (eventsCountEl) eventsCountEl.textContent = eventsCount;
        if (recurringCountEl) recurringCountEl.textContent = recurringCount;
        if (exceptionsCountEl) exceptionsCountEl.textContent = exceptionsCount;
    }

    toggleLoader(show) {
        if (this.elements.calendarLoader) {
            this.elements.calendarLoader.style.display = show ? 'flex' : 'none';
        }
    }

    // Méthodes d'interface pour les modales
    showAddDropdown(date = null) {
        const dropdown = this.elements.addDropdownMenu;
        if (dropdown) {
            dropdown.classList.toggle('show');
            // Stocker la date pour l'utiliser lors de l'ajout
            this.selectedDate = date;
        }
    }

    openAddEventModal(date = null) {
        this.currentItemType = 'event';
        this.currentItemId = null;
        
        const modalTitle = document.getElementById('event-modal-title');
        if (modalTitle) modalTitle.textContent = 'Ajouter un Événement';
        
        const submitBtn = document.getElementById('event-submit-btn');
        if (submitBtn) submitBtn.querySelector('.btn-text').textContent = 'Enregistrer';
        
        if (this.elements.eventForm) this.elements.eventForm.reset();
        
        // Pré-remplir la date si on a cliqué sur un jour spécifique
        if (date || this.selectedDate) {
            const selectedDate = date || this.selectedDate;
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const dateString = `${year}-${month}-${day}`;
            
            const startDateInput = document.getElementById('event-start-date');
            const endDateInput = document.getElementById('event-end-date');
            
            if (startDateInput) startDateInput.value = dateString;
            if (endDateInput) endDateInput.value = dateString;
            
            // Définir une heure par défaut (ex: 14h00 - 16h00)
            const startTimeInput = document.getElementById('event-start-time');
            const endTimeInput = document.getElementById('event-end-time');
            
            if (startTimeInput && !startTimeInput.value) startTimeInput.value = '14:00';
            if (endTimeInput && !endTimeInput.value) endTimeInput.value = '16:00';
        }
        
        this.showModal(this.elements.eventModal);
    }

    openAddRecurringModal() {
        this.currentItemType = 'recurring';
        this.currentItemId = null;
        
        const modalTitle = document.getElementById('recurring-modal-title');
        if (modalTitle) modalTitle.textContent = 'Ajouter un Horaire Récurrent';
        
        const submitBtn = document.getElementById('recurring-submit-btn');
        if (submitBtn) submitBtn.querySelector('.btn-text').textContent = 'Enregistrer';
        
        if (this.elements.recurringForm) this.elements.recurringForm.reset();
        
        this.showModal(this.elements.recurringModal);
    }

    openAddExceptionModal() {
        this.currentItemType = 'exception';
        this.currentItemId = null;
        
        const modalTitle = document.getElementById('exception-modal-title');
        if (modalTitle) modalTitle.textContent = 'Ajouter une Exception d\'Horaire';
        
        const submitBtn = document.getElementById('exception-submit-btn');
        if (submitBtn) submitBtn.querySelector('.btn-text').textContent = 'Enregistrer';
        
        if (this.elements.exceptionForm) this.elements.exceptionForm.reset();
        
        // Pré-remplir la date si on a cliqué sur un jour
        if (this.selectedDate) {
            const dateInput = document.getElementById('exception-date');
            if (dateInput) {
                const year = this.selectedDate.getFullYear();
                const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
                const day = String(this.selectedDate.getDate()).padStart(2, '0');
                dateInput.value = `${year}-${month}-${day}`;
            }
        }
        
        this.showModal(this.elements.exceptionModal);
    }

    viewItem(itemId, itemType) {
        // Trouver l'élément à afficher
        let item = null;
        let itemData = null;
        
        switch (itemType) {
            case 'event':
                item = this.allEvents.find(e => e.id == itemId);
                break;
            case 'recurring':
                item = this.allRecurringSchedules.find(r => r.id == itemId);
                break;
            case 'exception':
                item = this.allScheduleExceptions.find(e => e.id == itemId);
                break;
        }
        
        if (!item) {
            console.error(`Item ${itemId} de type ${itemType} non trouvé`);
            return;
        }
        
        // Préparer les données pour l'affichage
        itemData = this.prepareItemForView(item, itemType);
        this.showViewModal(itemData, itemType);
    }

    prepareItemForView(item, itemType) {
        const data = { ...item, itemType };
        
        // Enrichir avec les informations liées
        switch (itemType) {
            case 'event':
                data.sportName = this.allSports.find(s => s.id == item.sport)?.name || 'Non spécifié';
                data.teamNames = item.teams?.map(teamId => 
                    this.allTeams.find(t => t.id == teamId)?.name
                ).filter(Boolean) || [];
                break;
                
            case 'recurring':
                data.sportName = this.allSports.find(s => s.id == item.sport)?.name || 'Non spécifié';
                data.teamName = this.allTeams.find(t => t.id == item.team)?.name || 'Non spécifié';
                break;
                
            case 'exception':
                const recurringSchedule = this.allRecurringSchedules.find(rs => rs.id == item.recurring_schedule);
                if (recurringSchedule) {
                    data.recurringTitle = recurringSchedule.title;
                    data.sportName = this.allSports.find(s => s.id == recurringSchedule.sport)?.name || 'Non spécifié';
                }
                break;
        }
        
        return data;
    }

    //Modal pour afficher les détails d'un élément
    showViewModal(itemData, itemType) {
        const modal = document.getElementById('view-modal');
        const modalTitle = document.getElementById('view-modal-title');
        const itemTitle = document.getElementById('view-item-title');
        const itemTypeSpan = document.getElementById('view-item-type');
        const itemStatus = document.getElementById('view-item-status');
        const itemDescription = document.getElementById('view-item-description');
        const itemDate = document.getElementById('view-item-date');
        const itemTime = document.getElementById('view-item-time');
        const itemLocation = document.getElementById('view-item-location');
        const itemSport = document.getElementById('view-item-sport');
        
        if (!modal) return;
        
        // Titre du modal
        const typeLabels = {
            'event': 'Détails de l\'événement',
            'recurring': 'Détails de l\'horaire récurrent',
            'exception': 'Détails de l\'exception'
        };
        modalTitle.innerHTML = `<i class="fas fa-eye"></i> ${typeLabels[itemType]}`;
        
        // Informations principales
        itemTitle.textContent = itemData.title || `Exception de l'horaire récurrent '${itemData.recurring_schedule.title}'` || 'Sans titre';
        
        const typeBadges = {
            'event': 'Événement ponctuel',
            'recurring': 'Horaire récurrent',
            'exception': 'Exception d\'horaire'
        };
        itemTypeSpan.textContent = typeBadges[itemType];
        itemTypeSpan.className = `badge badge-primary type-${itemType}`;
        
        // Statut
        this.updateStatusBadge(itemStatus, itemData, itemType);
        
        // Description
        itemDescription.innerHTML = itemData.description || itemData.content || '<em>Aucune description disponible</em>';
        
        // Informations temporelles et spatiales
        this.updateDateTimeInfo(itemDate, itemTime, itemData, itemType);
        itemLocation.textContent = itemData.location || 'Non spécifié';
        itemSport.textContent = itemData.sportName || 'Non spécifié';
        
        // Sections conditionnelles
        this.updateConditionalSections(itemData, itemType);
        
        // Bouton d'édition
        const editBtn = document.getElementById('edit-from-view-btn');
        if (editBtn) {
            editBtn.onclick = () => {
                this.closeModal(modal);
                this.editItem(itemData.id, itemType);
            };
        }
        
        // Afficher le modal
        this.showModal(modal);
    }

    updateStatusBadge(statusElement, itemData, itemType) {
        let statusText = '';
        let statusClass = 'badge badge-status';
        
        switch (itemType) {
            case 'event':
                if (itemData.isCancelled) {
                    statusText = 'Annulé';
                    statusClass += ' status-cancelled';
                } else {
                    statusText = 'Programmé';
                    statusClass += ' status-active';
                }
                break;
            case 'recurring':
                statusText = 'Actif';
                statusClass += ' status-recurring';
                break;
            case 'exception':
                if (itemData.is_cancelled) {
                    statusText = 'Séance annulée';
                    statusClass += ' status-cancelled';
                } else {
                    statusText = 'Séance modifiée';
                    statusClass += ' status-modified';
                }
                break;
        }
        
        statusElement.textContent = statusText;
        statusElement.className = statusClass;
    }

    updateDateTimeInfo(dateElement, timeElement, itemData, itemType) {
        switch (itemType) {
            case 'event':
                const startDate = this.parseApiDateTime(itemData.startDatetime);
                const endDate = this.parseApiDateTime(itemData.endDatetime);
                
                if (startDate && endDate) {
                    if (startDate.toDateString() === endDate.toDateString()) {
                        dateElement.textContent = startDate.toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        });
                    } else {
                        dateElement.innerHTML = `Du ${startDate.toLocaleDateString('fr-FR')} au ${endDate.toLocaleDateString('fr-FR')}`;
                    }
                    
                    timeElement.textContent = `${startDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})} - ${endDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}`;
                } else {
                    dateElement.textContent = 'Date invalide';
                    timeElement.textContent = '-';
                }
                break;
                
            case 'recurring':
                dateElement.textContent = `Tous les ${itemData.day_of_week}`;
                const endTime = this.getFormattedEndTimeForRecurring(itemData);
                const startTime = this.extractTimeFromDateTime(itemData.start_time);
                timeElement.textContent = `${startTime} - ${endTime}`;
                break;
                
            case 'exception':
                // Pour les exceptions, la date peut être au format d/m/Y ou d/m/Y H:i
                let exceptionDate;
                if (itemData.date.includes(' ')) {
                    // Format avec heure
                    exceptionDate = this.parseApiDateTime(itemData.date);
                } else {
                    // Format date seule, ajouter une heure par défaut
                    exceptionDate = this.parseApiDateTime(itemData.date + ' 00:00');
                }
                
                if (exceptionDate) {
                    dateElement.textContent = exceptionDate.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    });
                } else {
                    dateElement.textContent = 'Date invalide';
                }
                
                if (itemData.is_cancelled) {
                    timeElement.innerHTML = '<em>Séance annulée</em>';
                } else {
                    timeElement.textContent = `${itemData.startTime || '-'} - ${itemData.endTime || '-'}`;
                }
                break;
        }
    }

    updateConditionalSections(itemData, itemType) {
        // Section équipes
        const teamsSection = document.getElementById('view-teams-section');
        const teamsList = document.getElementById('view-item-teams');
        
        if (itemType === 'event' && itemData.teamNames && itemData.teamNames.length > 0) {
            teamsSection.style.display = 'block';
            teamsList.innerHTML = itemData.teamNames.map(name => 
                `<span class="team-tag">${name}</span>`
            ).join('');
        } else if (itemType === 'recurring' && itemData.teamName) {
            teamsSection.style.display = 'block';
            teamsList.innerHTML = `<span class="team-tag">${itemData.teamName}</span>`;
        } else {
            teamsSection.style.display = 'none';
        }
        
        // Section récurrence
        const recurringSection = document.getElementById('view-recurring-info');
        if (itemType === 'recurring') {
            recurringSection.style.display = 'block';
            document.getElementById('view-recurring-day').textContent = itemData.day_of_week;
            document.getElementById('view-recurring-frequency').textContent = itemData.frequency || 'Hebdomadaire';
            document.getElementById('view-recurring-duration').textContent = `${itemData.duration} minutes`;
            document.getElementById('view-recurring-end').textContent = itemData.end_date || 'Aucune date de fin';
        } else {
            recurringSection.style.display = 'none';
        }
        
        // Section exception
        const exceptionSection = document.getElementById('view-exception-info');
        if (itemType === 'exception') {
            exceptionSection.style.display = 'block';
            document.getElementById('view-exception-reason').textContent = itemData.reason || 'Aucune raison spécifiée';
        } else {
            exceptionSection.style.display = 'none';
        }
        
        // Section images
        const imagesSection = document.getElementById('view-images-section');
        const imagesList = document.getElementById('view-item-images');
        
        if (itemType === 'event' && itemData.images && itemData.images.length > 0) {
            imagesSection.style.display = 'block';
            imagesList.innerHTML = itemData.images.map(imageUrl => 
                `<img src="${imageUrl}" alt="Image événement" class="image-thumbnail" onclick="window.open('${imageUrl}', '_blank')">`
            ).join('');
        } else {
            imagesSection.style.display = 'none';
        }
    }

    editItem(itemId, itemType) {
        // Rediriger vers la bonne fonction d'édition selon le type
        switch (itemType) {
            case 'event':
                this.editEvent(itemId);
                break;
            case 'recurring':
                this.editRecurringSchedule(itemId);
                break;
            case 'exception':
                this.editScheduleException(itemId);
                break;
        }
    }

    confirmDeleteItem(itemId, itemType) {
        this.deleteItemId = itemId;
        this.deleteItemType = itemType;
        
        let itemName = '';
        let showWarning = false;
        
        switch (itemType) {
            case 'event':
                const event = this.allEvents.find(e => e.id == itemId);
                itemName = event ? event.title : 'cet événement';
                break;
            case 'recurring':
                const schedule = this.allRecurringSchedules.find(rs => rs.id == itemId);
                itemName = schedule ? schedule.title : 'cet horaire récurrent';
                showWarning = true; // Avertir de la suppression des exceptions associées
                break;
            case 'exception':
                const exception = this.allScheduleExceptions.find(se => se.id == itemId);
                itemName = exception ? `l'exception du ${exception.getFormattedDate()}` : 'cette exception';
                break;
        }
        
        document.getElementById('delete-item-name').textContent = itemName;
        
        const warningElement = document.getElementById('delete-warning');
        if (warningElement) {
            warningElement.style.display = showWarning ? 'block' : 'none';
        }
        
        this.showModal(this.elements.deleteModal);
    }

    showModal(modal) {
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'flex';
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    attachEventListeners() {
        console.log('Attachement des event listeners du calendrier unifié...');
        
        // Navigation calendrier
        if (this.elements.prevBtn) {
            this.elements.prevBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.renderCalendar(this.currentDate);
            });
        }

        if (this.elements.nextBtn) {
            this.elements.nextBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.renderCalendar(this.currentDate);
            });
        }

        if (this.elements.todayBtn) {
            this.elements.todayBtn.addEventListener('click', () => {
                this.currentDate = new Date();
                this.renderCalendar(this.currentDate);
            });
        }

        // Dropdown d'ajout
        if (this.elements.addDropdownBtn) {
            this.elements.addDropdownBtn.addEventListener('click', () => {
                this.showAddDropdown();
            });
        }

        // Boutons d'ajout spécifiques
        if (this.elements.addEventBtn) {
            this.elements.addEventBtn.addEventListener('click', () => {
                this.openAddEventModal(this.selectedDate);
                this.elements.addDropdownMenu.classList.remove('show');
            });
        }

        if (this.elements.addRecurringBtn) {
            this.elements.addRecurringBtn.addEventListener('click', () => {
                this.openAddRecurringModal();
                this.elements.addDropdownMenu.classList.remove('show');
            });
        }

        if (this.elements.addExceptionBtn) {
            this.elements.addExceptionBtn.addEventListener('click', () => {
                this.openAddExceptionModal();
                this.elements.addDropdownMenu.classList.remove('show');
            });
        }

        // Toggle vue
        if (this.elements.toggleViewBtn) {
            this.elements.toggleViewBtn.addEventListener('click', () => {
                this.toggleView();
            });
        }

        // Filtres
        if (this.elements.calendarTypeFilter) {
            this.elements.calendarTypeFilter.addEventListener('change', (e) => {
                this.activeFilters.type = e.target.value;
                this.applyFilters();
                this.renderCalendar(this.currentDate);
                this.renderUnifiedTable();
            });
        }

        if (this.elements.sportFilter) {
            this.elements.sportFilter.addEventListener('change', (e) => {
                this.activeFilters.sport = e.target.value;
                this.applyFilters();
                this.renderCalendar(this.currentDate);
                this.renderUnifiedTable();
            });
        }

        // Boutons d'action de la section données
        const exportBtn = document.getElementById('export-calendar-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportCalendar('ics');
            });
        }

        const refreshBtn = document.getElementById('refresh-calendar-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', async () => {
                this.toggleLoader(true);
                await this.loadAllData();
                this.applyFilters();
                this.renderCalendar(this.currentDate);
                this.renderUnifiedTable();
                this.toggleLoader(false);
            });
        }

        // Soumission des formulaires
        if (this.elements.eventForm) {
            this.elements.eventForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleEventFormSubmit();
            });
        }

        if (this.elements.recurringForm) {
            this.elements.recurringForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleRecurringFormSubmit();
            });
        }

        if (this.elements.exceptionForm) {
            this.elements.exceptionForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleExceptionFormSubmit();
            });
        }

        // Gestion des modales
        this.setupModalClosing();

        // Toggle des champs d'exception selon l'état annulé/modifié
        const exceptionCancelledCheckbox = document.getElementById('exception-cancelled');
        const modificationFields = document.getElementById('exception-modification-fields');
        if (exceptionCancelledCheckbox && modificationFields) {
            exceptionCancelledCheckbox.addEventListener('change', (e) => {
                modificationFields.style.display = e.target.checked ? 'none' : 'block';
            });
        }

        // Fermer le dropdown en cliquant ailleurs
        document.addEventListener('click', (e) => {
            if (!this.elements.addDropdownBtn.contains(e.target) && 
                !this.elements.addDropdownMenu.contains(e.target)) {
                this.elements.addDropdownMenu.classList.remove('show');
            }
        });

        console.log('Event listeners attachés avec succès');
    }

    setupModalClosing() {
        // Boutons de fermeture
        const closeButtons = [
            { id: 'close-event-modal', modal: this.elements.eventModal },
            { id: 'close-recurring-modal', modal: this.elements.recurringModal },
            { id: 'close-exception-modal', modal: this.elements.exceptionModal },
            { id: 'close-delete-modal', modal: this.elements.deleteModal },
            { id: 'close-view-modal', modal: document.getElementById('view-modal') },
            { id: 'cancel-event-btn', modal: this.elements.eventModal },
            { id: 'cancel-recurring-btn', modal: this.elements.recurringModal },
            { id: 'cancel-exception-btn', modal: this.elements.exceptionModal },
            { id: 'cancel-delete-btn', modal: this.elements.deleteModal },
            { id: 'close-view-btn', modal: document.getElementById('view-modal') }
        ];

        closeButtons.forEach(({ id, modal }) => {
            const button = document.getElementById(id);
            if (button && modal) {
                button.addEventListener('click', () => this.closeModal(modal));
            }
        });

        // Clic à l'extérieur des modales
        [this.elements.eventModal, this.elements.recurringModal, this.elements.exceptionModal, this.elements.deleteModal, document.getElementById('view-modal')].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal(modal);
                    }
                });
            }
        });

        // Confirmation de suppression
        const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', async () => {
                await this.handleDeleteItem();
            });
        }

        // Fermeture avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                [this.elements.eventModal, this.elements.recurringModal, this.elements.exceptionModal, this.elements.deleteModal, document.getElementById('view-modal')].forEach(modal => {
                    if (modal && modal.classList.contains('show')) {
                        this.closeModal(modal);
                    }
                });
            }
        });
    }

    async handleEventFormSubmit() {
        const formData = this.collectEventFormData();
        
        if (!this.validateEventFormData(formData)) {
            return;
        }

        try {
            const submitBtn = document.getElementById('event-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.querySelector('.btn-text').textContent = 'Enregistrement...';
            }

            if (this.currentItemId) {
                await updateEvent(this.currentItemId, formData);
                showNotification('Événement modifié avec succès', 'success');
            } else {
                await addEvent(formData);
                showNotification('Événement ajouté avec succès', 'success');
            }

            this.closeModal(this.elements.eventModal);
            await this.loadAllData();
            this.renderCalendar(this.currentDate);
            this.renderUnifiedTable();

        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de l\'événement:', error);
            showNotification(error.message, 'error');
        } finally {
            const submitBtn = document.getElementById('event-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = this.currentItemId ? 'Modifier' : 'Enregistrer';
            }
        }
    }

    collectEventFormData() {
        // Collecte des données de base
        const title = document.getElementById('event-title')?.value.trim();
        const content = document.getElementById('event-content')?.value.trim();
        const eventType = document.getElementById('event-type')?.value;
        const location = document.getElementById('event-location')?.value.trim();
        const isCancelled = document.getElementById('event-cancelled')?.checked || false;
        const sport = document.getElementById('event-sport')?.value;
        
        // Gestion des dates et heures
        const startDate = document.getElementById('event-start-date')?.value;
        const startTime = document.getElementById('event-start-time')?.value;
        const endDate = document.getElementById('event-end-date')?.value;
        const endTime = document.getElementById('event-end-time')?.value;
        
        // Formatage des dates pour l'API (format DD/MM/YYYY HH:mm)
        const startDatetime = this.formatDateTimeForApi(startDate, startTime);
        const endDatetime = this.formatDateTimeForApi(endDate, endTime);
        
        // Collecte des équipes sélectionnées
        const teams = [];
        const teamCheckboxes = document.querySelectorAll('#teams-selector input[type="checkbox"]:checked');
        teamCheckboxes.forEach(checkbox => {
            teams.push(parseInt(checkbox.value));
        });
        
        // Collecte des images (si applicable)
        const images = this.collectEventImages();
        
        return {
            title,
            content,
            eventType,
            location,
            isCancelled,
            startDatetime,
            endDatetime,
            sport: sport ? parseInt(sport) : null,
            teams,
            images
        };
    }

   formatDateTimeForApi(date, time) {
    if (!date || !time) return '';
    
    // Convertir de YYYY-MM-DD HH:mm vers d/m/Y H:i
    const [year, month, day] = date.split('-');
    
    // Retirer les zéros de tête pour le jour et le mois
    const dayFormatted = parseInt(day).toString();
    const monthFormatted = parseInt(month).toString();
    
    // Retirer les zéros de tête pour l'heure
    const [hour, minute] = time.split(':');
    const hourFormatted = parseInt(hour).toString();
    const minuteFormatted = minute; // Garder les minutes avec zéro si nécessaire
    
    return `${dayFormatted}/${monthFormatted}/${year} ${hourFormatted}:${minuteFormatted}`;
}


    collectEventImages() {
        // Collecte des images si elles existent dans le formulaire
        const images = [];
        const imageInputs = document.querySelectorAll('#event-images input[type="file"]');
        
        imageInputs.forEach(input => {
            if (input.files && input.files.length > 0) {
               
                Array.from(input.files).forEach(file => {
                
                    console.log('Image à traiter:', file.name);

                    const imageUrlToBase64 = fileToBase64(file);
                    images.push(imageUrlToBase64);
                });
            }
        });
        
        return images;
    }

    validateEventFormData(data) {
        const errors = [];
        
        if (!data.title) {
            errors.push('Le titre est obligatoire');
        }
        
        if (!data.eventType) {
            errors.push('Le type d\'événement est obligatoire');
        }
        
        if (!data.startDatetime) {
            errors.push('La date et heure de début sont obligatoires');
        }
        
        if (!data.endDatetime) {
            errors.push('La date et heure de fin sont obligatoires');
        }
        
        if (data.startDatetime && data.endDatetime) {
            const startDate = this.parseApiDateTime(data.startDatetime);
            const endDate = this.parseApiDateTime(data.endDatetime);
            
            if (endDate <= startDate) {
                errors.push('L\'heure de fin doit être postérieure à l\'heure de début');
            }
        }
        
        if (!data.location) {
            errors.push('Le lieu est obligatoire');
        }
        
        if (errors.length > 0) {
            showNotification(errors.join('\n'), 'error');
            return false;
        }
        
        return true;
    }

parseApiDateTime(dateTimeString) {
    if (!dateTimeString || typeof dateTimeString !== 'string') {
        return null;
    }
    
    // Convertir d/m/Y H:i vers objet Date
    const [datePart, timePart] = dateTimeString.split(' ');
    
    if (!datePart || !timePart) {
        console.warn('Format de date invalide:', dateTimeString);
        return null;
    }
    
    const [day, month, year] = datePart.split('/');
    const [hour, minute] = timePart.split(':');
    
    // Validation des composants
    if (!day || !month || !year || !hour || !minute) {
        console.warn('Composants de date manquants:', dateTimeString);
        return null;
    }
    
    return new Date(
        parseInt(year), 
        parseInt(month) - 1, // Les mois sont indexés à partir de 0
        parseInt(day), 
        parseInt(hour), 
        parseInt(minute)
    );
}


    async handleRecurringFormSubmit() {
        const formData = this.collectRecurringFormData();
        
        if (!this.validateRecurringFormData(formData)) {
            return;
        }

        try {
            const submitBtn = document.getElementById('recurring-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.querySelector('.btn-text').textContent = 'Enregistrement...';
            }

            if (this.currentItemId) {
                await updateRecurringSchedule(this.currentItemId, formData);
                showNotification('Horaire récurrent modifié avec succès', 'success');
            } else {
                await addRecurringSchedule(formData);
                showNotification('Horaire récurrent ajouté avec succès', 'success');
            }

            this.closeModal(this.elements.recurringModal);
            await this.loadAllData();
            this.renderCalendar(this.currentDate);
            this.renderUnifiedTable();

        } catch (error) {
            console.error('Erreur lors de l\'enregistrement:', error);
            showNotification(error.message, 'error');
        } finally {
            const submitBtn = document.getElementById('recurring-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = this.currentItemId ? 'Modifier' : 'Enregistrer';
            }
        }
    }

    collectRecurringFormData() {
        const startTimeValue = document.getElementById('recurring-start-time').value;
        let formattedStartTime = '';
        
        // Convertir datetime-local vers le format attendu JJ/MM/AAAA HH:mm
        if (startTimeValue) {
            const date = new Date(startTimeValue);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            formattedStartTime = `${day}/${month}/${year} ${hours}:${minutes}`;
        }
        
        return {
            title: document.getElementById('recurring-title').value.trim(),
            description: document.getElementById('recurring-description').value.trim(),
            sport: document.getElementById('recurring-sport').value,
            team: document.getElementById('recurring-team').value || null,
            day_of_week: document.getElementById('recurring-day').value,
            location: document.getElementById('recurring-location').value.trim(),
            start_time: formattedStartTime,
            duration: parseInt(document.getElementById('recurring-duration').value),
            frequency: document.getElementById('recurring-frequency').value,
            end_date: document.getElementById('recurring-end-date').value || null
        };
    }

    validateRecurringFormData(data) {
        if (!data.title) {
            showNotification('Le titre est obligatoire', 'error');
            return false;
        }

        if (!data.sport) {
            showNotification('Le sport est obligatoire', 'error');
            return false;
        }

        if (!data.day_of_week) {
            showNotification('Le jour de la semaine est obligatoire', 'error');
            return false;
        }

        if (!data.location) {
            showNotification('Le lieu est obligatoire', 'error');
            return false;
        }

        if (!data.start_time) {
            showNotification('L\'heure de début est obligatoire', 'error');
            return false;
        }

        if (!data.duration || data.duration < 15) {
            showNotification('La durée doit être d\'au moins 15 minutes', 'error');
            return false;
        }

        return true;
    }

    async handleExceptionFormSubmit() {
        const formData = this.collectExceptionFormData();
        
        if (!this.validateExceptionFormData(formData)) {
            return;
        }

        // Debug : afficher les données qui vont être envoyées
        console.log('📤 Données exception à envoyer à l\'API:', formData);

        try {
            const submitBtn = document.getElementById('exception-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.querySelector('.btn-text').textContent = 'Enregistrement...';
            }

            if (this.currentItemId) {
                const result = await updateScheduleException(this.currentItemId, formData);
                console.log('✅ Exception modifiée, réponse API:', result);
                showNotification('Exception d\'horaire modifiée avec succès', 'success');
            } else {
                const result = await addScheduleException(formData);
                console.log('✅ Exception ajoutée, réponse API:', result);
                showNotification('Exception d\'horaire ajoutée avec succès', 'success');
            }

            this.closeModal(this.elements.exceptionModal);
            await this.loadAllData();
            this.renderCalendar(this.currentDate);
            this.renderUnifiedTable();

        } catch (error) {
            console.error('❌ Erreur lors de l\'enregistrement:', error);
            
            // Essayer d'obtenir plus de détails sur l'erreur
            let errorMessage = error.message;
            if (error.response) {
                console.error('📄 Réponse d\'erreur complète:', error.response);
            }
            
            showNotification(errorMessage, 'error');
        } finally {
            const submitBtn = document.getElementById('exception-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = this.currentItemId ? 'Modifier' : 'Enregistrer';
            }
        }
    }

    collectExceptionFormData() {
        const isCancelled = document.getElementById('exception-cancelled').checked;
        const exceptionDate = document.getElementById('exception-date').value;
        
        // Convertir la date du format YYYY-MM-DD vers DD/MM/YYYY HH:mm
        let formattedDate = '';
formattedDate =  this.formatDateTimeForApi(exceptionDate, document.getElementById('exception-start-time').value);

    
        
        const formData = {
            recurring_schedule: document.getElementById('exception-recurring').value,
            date: formattedDate,
            is_cancelled: isCancelled,
            startTime: !isCancelled ? document.getElementById('exception-start-time').value : null,
            endTime: !isCancelled ? document.getElementById('exception-end-time').value : null,
            location: !isCancelled ? document.getElementById('exception-location').value.trim() : null,
            reason: document.getElementById('exception-reason').value.trim()
        };
        
        // Debug : afficher les données collectées
        console.log('🔍 Données collectées pour exception:', {
            rawDate: exceptionDate,
            formattedDate: formattedDate,
            dateValidation: {
                isValid: formattedDate.match(/^\d{2}\/\d{2}\/\d{4}$/),
                pattern: formattedDate
            },
            ...formData
        });
        
        return formData;
    }

    validateExceptionFormData(data) {
        if (!data.recurring_schedule) {
            showNotification('L\'horaire récurrent est obligatoire', 'error');
            return false;
        }

        if (!data.date) {
            showNotification('La date est obligatoire', 'error');
            return false;
        }

        if (!data.is_cancelled) {
            if (!data.startTime || !data.endTime) {
                showNotification('Les heures de début et fin sont obligatoires pour une modification', 'error');
                return false;
            }
            
            if (data.startTime >= data.endTime) {
                showNotification('L\'heure de fin doit être postérieure à l\'heure de début', 'error');
                return false;
            }
        }

        return true;
    }

    // Suppression d'un élément (événement, horaire récurrent, exception)
    async handleDeleteItem() {
        if (!this.deleteItemId || !this.deleteItemType) return;

        try {
            const confirmBtn = document.getElementById('confirm-delete-btn');
            if (confirmBtn) {
                confirmBtn.disabled = true;
                confirmBtn.textContent = 'Suppression...';
            }

            switch (this.deleteItemType) {
                case 'event':
                    await deleteEvent(this.deleteItemId);
                    showNotification('Événement supprimé avec succès', 'success');
                    break;
                case 'recurring':
                    await deleteRecurringSchedule(this.deleteItemId);
                    showNotification('Horaire récurrent supprimé avec succès', 'success');
                    break;
                case 'exception':
                    await deleteScheduleException(this.deleteItemId);
                    showNotification('Exception d\'horaire supprimée avec succès', 'success');
                    break;
            }

            this.closeModal(this.elements.deleteModal);
            await this.loadAllData();
            this.renderCalendar(this.currentDate);
            this.renderUnifiedTable();

        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            showNotification(error.message, 'error');
        } finally {
            const confirmBtn = document.getElementById('confirm-delete-btn');
            if (confirmBtn) {
                confirmBtn.disabled = false;
                confirmBtn.textContent = 'Supprimer';
            }
            this.deleteItemId = null;
            this.deleteItemType = null;
        }
    }

    // Toggle entre vue calendrier et liste
    toggleView() {
        this.viewMode = this.viewMode === 'calendar' ? 'table' : 'calendar';
        
        const calendarContainer = document.querySelector('.calendar-container');
        const tableSection = this.elements.calendarTableSection;
        const toggleBtn = this.elements.toggleViewBtn;
        
        if (this.viewMode === 'calendar') {
            calendarContainer.style.display = 'block';
            tableSection.style.display = 'none';
            toggleBtn.innerHTML = '<i class="fas fa-list"></i> Vue liste';
        } else {
            calendarContainer.style.display = 'none';
            tableSection.style.display = 'block';
            toggleBtn.innerHTML = '<i class="fas fa-calendar"></i> Vue calendrier';
        }
    }

   
    
    // Ouvrir le modal d'édition d'un évènement ponctuel
    editEvent(eventId) {
        const event = this.allEvents.find(e => e.id == eventId);
        if (!event) {
            showNotification('Événement introuvable', 'error');
            return;
        }
        
        this.currentItemType = 'event';
        this.currentItemId = eventId;
        
        // Remplir le formulaire d'événement
        document.getElementById('event-id').value = event.id;
        document.getElementById('event-title').value = event.title;
        document.getElementById('event-content').value = event.content || '';
        document.getElementById('event-type').value = event.eventType;
        document.getElementById('event-location').value = event.location;
        document.getElementById('event-cancelled').checked = event.isCancelled;
        document.getElementById('event-sport').value = event.sport;
        
        // Gestion des dates et heures
        if (event.startDatetime) {
            const startDate = this.parseApiDateTime(event.startDatetime);
            const startDateStr = startDate.toISOString().split('T')[0];
            const startTimeStr = startDate.toTimeString().slice(0, 5);
            document.getElementById('event-start-date').value = startDateStr;
            document.getElementById('event-start-time').value = startTimeStr;
        }
        
        if (event.endDatetime) {
            const endDate = this.parseApiDateTime(event.endDatetime);
            const endDateStr = endDate.toISOString().split('T')[0];
            const endTimeStr = endDate.toTimeString().slice(0, 5);
            document.getElementById('event-end-date').value = endDateStr;
            document.getElementById('event-end-time').value = endTimeStr;
        }
        
        // Sélectionner les équipes
        if (event.teams && event.teams.length > 0) {
            const teamCheckboxes = document.querySelectorAll('#teams-selector input[type="checkbox"]');
            teamCheckboxes.forEach(checkbox => {
                checkbox.checked = event.teams.includes(parseInt(checkbox.value));
            });
        }
        
        const modalTitle = document.getElementById('event-modal-title');
        if (modalTitle) modalTitle.textContent = 'Modifier l\'Événement';
        
        const submitBtn = document.getElementById('event-submit-btn');
        if (submitBtn) submitBtn.querySelector('.btn-text').textContent = 'Modifier';
        
        this.showModal(this.elements.eventModal);
    }

   
    // Ouvrir le modal d'édition d'un horaire récurrent
    editRecurringSchedule(scheduleId) {
        const schedule = this.allRecurringSchedules.find(rs => rs.id == scheduleId);
        if (!schedule) return;
        
        this.currentItemType = 'recurring';
        this.currentItemId = scheduleId;
        
        // Remplir le formulaire
        document.getElementById('recurring-id').value = schedule.id;
        document.getElementById('recurring-title').value = schedule.title;
        document.getElementById('recurring-description').value = schedule.description || '';
        document.getElementById('recurring-sport').value = schedule.sport;
        document.getElementById('recurring-team').value = schedule.team || '';
        document.getElementById('recurring-day').value = schedule.day_of_week;
        document.getElementById('recurring-location').value = schedule.location;
        document.getElementById('recurring-start-time').value = schedule.start_time;
        document.getElementById('recurring-duration').value = schedule.duration;
        document.getElementById('recurring-frequency').value = schedule.frequency;
        document.getElementById('recurring-end-date').value = schedule.end_date || '';
        
        const modalTitle = document.getElementById('recurring-modal-title');
        if (modalTitle) modalTitle.textContent = 'Modifier l\'Horaire Récurrent';
        
        const submitBtn = document.getElementById('recurring-submit-btn');
        if (submitBtn) submitBtn.querySelector('.btn-text').textContent = 'Modifier';
        
        this.showModal(this.elements.recurringModal);
    }

    // Ouvrir le modal d'édition d'une exception d'horaire
   editScheduleException(exceptionId) {
    const exception = this.allScheduleExceptions.find(se => se.id == exceptionId);
    if (!exception) return;
    
    this.currentItemType = 'exception';
    this.currentItemId = exceptionId;
    
    // Remplir le formulaire
    document.getElementById('exception-id').value = exception.id;
    document.getElementById('exception-recurring').value = exception.recurring_schedule;
    
    // Convertir la date du format d/m/Y vers YYYY-MM-DD pour l'input date
    if (exception.date) {
        const dateObj = this.parseApiDateTime(exception.date + ' 00:00'); // Ajouter une heure fictive
        if (dateObj) {
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            document.getElementById('exception-date').value = `${year}-${month}-${day}`;
        }
    }
    
    document.getElementById('exception-cancelled').checked = exception.is_cancelled;
    document.getElementById('exception-start-time').value = exception.startTime || '';
    document.getElementById('exception-end-time').value = exception.endTime || '';
    document.getElementById('exception-location').value = exception.location || '';
    document.getElementById('exception-reason').value = exception.reason || '';
    
    // Gérer l'affichage des champs selon l'état annulé
    const modificationFields = document.getElementById('exception-modification-fields');
    if (modificationFields) {
        modificationFields.style.display = exception.is_cancelled ? 'none' : 'block';
    }
    
    const modalTitle = document.getElementById('exception-modal-title');
    if (modalTitle) modalTitle.textContent = 'Modifier l\'Exception d\'Horaire';
    
    const submitBtn = document.getElementById('exception-submit-btn');
    if (submitBtn) submitBtn.querySelector('.btn-text').textContent = 'Modifier';
    
    this.showModal(this.elements.exceptionModal);
}


    initializeTooltips() {
        // Initialiser les tooltips pour une meilleure UX
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip.bind(this));
            element.addEventListener('mouseleave', this.hideTooltip.bind(this));
        });
    }

    showTooltip(event) {
        const element = event.target;
        const tooltipText = element.dataset.tooltip;
        if (!tooltipText) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';

        setTimeout(() => tooltip.classList.add('show'), 10);
        element._tooltip = tooltip;
    }

    hideTooltip(event) {
        const element = event.target;
        if (element._tooltip) {
            element._tooltip.remove();
            element._tooltip = null;
        }
    }

    showDayItems(date, items) {
        // Créer une popup pour afficher tous les éléments d'un jour
        const popup = document.createElement('div');
        popup.className = 'day-items-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <div class="popup-header">
                    <h3>Éléments du ${date.toLocaleDateString('fr-FR')}</h3>
                    <button class="close-popup"><i class="fas fa-times"></i></button>
                </div>
                <div class="popup-items">
                    ${items.map(item => `
                        <div class="popup-item ${item.itemType}-item">
                            <div class="item-info">
                                <h4>${item.title}</h4>
                                <span class="item-type">${this.getTypeLabel(item.itemType)}</span>
                                <p class="item-details">${this.getItemDetailsText(item)}</p>
                            </div>
                            <div class="item-actions">
                                <button onclick="window.calendarManager.viewItem(${item.id}, '${item.itemType}')" class="btn-small btn-view">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button onclick="window.calendarManager.editItem(${item.id}, '${item.itemType}')" class="btn-small btn-edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
document.getElementById("body-event-dashboard").appendChild(popup);
   
        
        // Positionner la popup
        setTimeout(() => {
            popup.classList.add('show');
        }, 10);

        // Fermer la popup
        popup.querySelector('.close-popup').addEventListener('click', () => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        });

        // Fermer en cliquant à l'extérieur
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('show');
                setTimeout(() => popup.remove(), 300);
            }
        });
    }

    getTypeLabel(itemType) {
        const labels = {
            'event': 'Événement',
            'recurring': 'Horaire récurrent',
            'exception': 'Exception'
        };
        return labels[itemType] || itemType;
    }

    getItemDetailsText(item) {
        switch (item.itemType) {
            case 'event':
                const startDate = this.parseApiDateTime(item.startDatetime);
                const endDate = this.parseApiDateTime(item.endDatetime);
                if (startDate && endDate) {
                    const startTime = startDate.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    const endTime = endDate.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    return `${startTime} - ${endTime} • ${item.location || 'Lieu non défini'}`;
                } else {
                    return `Heure invalide • ${item.location || 'Lieu non défini'}`;
                }
            case 'recurring':
                return `${item.start_time} (${item.duration}min) • ${item.location || 'Lieu non défini'}`;
            case 'exception':
                const status = item.is_cancelled ? 'Annulé' : 'Modifié';
                return `${status} • ${item.reason || 'Aucune raison'}`;
            default:
                return '';
        }
    }

    // Méthode pour générer les événements récurrents dans une plage de dates
    generateRecurringEvents(schedule, startDate, endDate) {
        const events = [];
        const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const targetDay = dayNames.indexOf(schedule.day_of_week);

        if (targetDay === -1) return events;

        // Trouver la première occurrence
        let currentDate = new Date(startDate);
        while (currentDate.getDay() !== targetDay && currentDate <= endDate) {
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Générer les occurrences
        const scheduleEndDate = schedule.end_date ? new Date(schedule.end_date) : endDate;
        const actualEndDate = scheduleEndDate < endDate ? scheduleEndDate : endDate;

        while (currentDate <= actualEndDate) {
            // Vérifier s'il y a une exception pour cette date
            const hasException = this.allScheduleExceptions.some(exception => {
                const exceptionDate = new Date(exception.date);
                return exception.recurring_schedule == schedule.id && 
                       exceptionDate.toDateString() === currentDate.toDateString();
            });

            if (!hasException) {
                // Vérifier que start_time est valide
                if (!schedule.start_time || typeof schedule.start_time !== 'string') {
                    console.warn('start_time invalide pour l\'horaire récurrent:', schedule);
                    continue;
                }
                
                // Extraire l'heure du format DD/MM/YYYY HH:mm
                const timeString = this.extractTimeFromDateTime(schedule.start_time);
                if (!timeString) {
                    console.warn('Format start_time invalide:', schedule.start_time);
                    continue;
                }
                
                // Parser l'heure
                const timeParts = timeString.split(':');
                if (timeParts.length !== 2) {
                    console.warn('Format d\'heure invalide:', timeString);
                    continue;
                }
                
                const hours = parseInt(timeParts[0]);
                const minutes = parseInt(timeParts[1]);
                
                if (isNaN(hours) || isNaN(minutes)) {
                    console.warn('Heures/minutes invalides:', timeString);
                    continue;
                }
                
                const startDateTime = new Date(currentDate);
                startDateTime.setHours(hours, minutes, 0, 0);

                const endDateTime = new Date(startDateTime);
                endDateTime.setMinutes(endDateTime.getMinutes() + (schedule.duration || 0));

                // Vérifier que les dates sont valides
                if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
                    console.warn('Dates invalides générées pour l\'horaire récurrent:', schedule);
                    continue;
                }

                events.push({
                    ...schedule,
                    itemType: 'recurring-instance',
                    generatedId: `${schedule.id}_${currentDate.toDateString()}`,
                    instanceDate: new Date(currentDate),
                    startDatetime: startDateTime.toISOString(),
                    endDatetime: endDateTime.toISOString()
                });
            }

            // Passer à la prochaine occurrence selon la fréquence
            switch (schedule.frequency) {
                case 'Hebdomadaire':
                    currentDate.setDate(currentDate.getDate() + 7);
                    break;
                case 'Bi-hebdomadaire':
                    currentDate.setDate(currentDate.getDate() + 14);
                    break;
                case 'Mensuel':
                    currentDate.setMonth(currentDate.getMonth() + 1);
                    break;
                default:
                    currentDate.setDate(currentDate.getDate() + 7);
                    break;
            }
        }

        return events;
    }

    // Améliorer la méthode pour obtenir les éléments d'une date
    getItemsForDate(date) {
        const items = [];
        
        // Événements ponctuels
        this.filteredItems.filter(item => item.itemType === 'event').forEach(event => {
            if (event.startDatetime) {
                const eventDate = this.parseApiDateTime(event.startDatetime);
                if (eventDate && eventDate.toDateString() === date.toDateString()) {
                    items.push(event);
                }
            }
        });
        
        // Horaires récurrents - générer les instances pour cette date
        this.allRecurringSchedules.forEach(schedule => {
            // Vérifier si ce schedule est dans les filtres actifs
            const isFiltered = this.filteredItems.some(item => 
                item.itemType === 'recurring' && item.id === schedule.id
            );
            
            if (isFiltered && this.isRecurringScheduleOnDate(schedule, date)) {
                if (schedule.start_time) {
                    // Créer une instance pour cette date
                    const recurringInstance = {
                        ...schedule,
                        itemType: 'recurring',
                        instanceDate: new Date(date),
                        displayDate: date.toLocaleDateString('fr-FR')
                    };
                    items.push(recurringInstance);
                }
            }
        });
        
        // Exceptions d'horaires
        this.filteredItems.filter(item => item.itemType === 'exception').forEach(exception => {
            if (exception.date) {
                let exceptionDate;
                if (exception.date.includes(' ')) {
                    exceptionDate = this.parseApiDateTime(exception.date);
                } else {
                    exceptionDate = this.parseApiDateTime(exception.date + ' 00:00');
                }
                if (exceptionDate && exceptionDate.toDateString() === date.toDateString()) {
                    items.push(exception);
                }
            }
        });
        
        // Trier les éléments par heure
        return items.sort((a, b) => {
            let timeA = '00:00';
            let timeB = '00:00';
            
            if (a.itemType === 'event' && a.startDatetime) {
                const eventDate = new Date(a.startDatetime);
                timeA = eventDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            } else if (a.itemType === 'recurring' && a.start_time) {
                timeA = this.extractTimeFromDateTime(a.start_time) || '00:00';
            }
            
            if (b.itemType === 'event' && b.startDatetime) {
                const eventDate = new Date(b.startDatetime);
                timeB = eventDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            } else if (b.itemType === 'recurring' && b.start_time) {
                timeB = this.extractTimeFromDateTime(b.start_time) || '00:00';
            }
            
            return timeA.localeCompare(timeB);
        });
    }

    formatTime(date) {
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Fonction utilitaire pour extraire l'heure du format DD/MM/YYYY HH:mm, ISO ou HH:mm
 extractTimeFromDateTime(dateTimeString) {
    if (!dateTimeString || typeof dateTimeString !== 'string') {
        return null;
    }
    
    // Format H:i direct (ex: "9:30" ou "14:45")
    if (dateTimeString.match(/^\d{1,2}:\d{2}$/)) {
        return dateTimeString;
    }
    
    // Format d/m/Y H:i (ex: "15/7/2025 9:30")
    const parts = dateTimeString.split(' ');
    if (parts.length === 2) {
        const timePart = parts[1]; // Récupérer la partie H:i
        if (timePart.match(/^\d{1,2}:\d{2}$/)) {
            return timePart;
        }
    }
    
    // Format ISO pour compatibilité (si encore présent)
    if (dateTimeString.includes('T')) {
        try {
            const timePart = dateTimeString.split('T')[1];
            if (timePart) {
                const timeOnly = timePart.split(':').slice(0, 2).join(':');
                if (timeOnly.match(/^\d{1,2}:\d{2}$/)) {
                    return timeOnly;
                }
            }
        } catch (e) {
            console.warn('Erreur lors du parsing de la date ISO:', e);
        }
    }
    
    console.warn('Format de date/heure non reconnu:', dateTimeString);
    return null;
}


    // Fonction utilitaire pour calculer l'heure de fin formatée pour les horaires récurrents
getFormattedEndTimeForRecurring(item) {
    if (!item.start_time || !item.duration) return '';
    
    const timeString = this.extractTimeFromDateTime(item.start_time);
    if (!timeString) return '';
    
    // Parser l'heure de début
    const timeParts = timeString.split(':');
    if (timeParts.length !== 2) return '';
    
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    
    if (isNaN(hours) || isNaN(minutes)) return '';
    
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + (item.duration || 0);
    
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    
    // Formatter selon le format H:i (sans zéros de tête pour les heures)
    return `${endHours}:${String(endMins).padStart(2, '0')}`;
}

/**
 * Valide si une chaîne correspond au format d/m/Y H:i
 */
isValidBackendDateFormat(dateString) {
    if (!dateString || typeof dateString !== 'string') return false;
    
    // Regex pour d/m/Y H:i (ex: "5/7/2025 9:30" ou "15/12/2025 14:45")
    const regex = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}$/;
    return regex.test(dateString);
}

/**
 * Formate une date du backend (d/m/Y H:i) pour l'affichage français
 */
formatBackendDateForDisplay(backendDateString) {
    if (!this.isValidBackendDateFormat(backendDateString)) {
        return 'Date invalide';
    }
    
    const dateObj = this.parseApiDateTime(backendDateString);
    if (!dateObj) return 'Date invalide';
    
    return {
        date: dateObj.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }),
        time: dateObj.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        }),
        dateOnly: dateObj.toLocaleDateString('fr-FR'),
        timeOnly: dateObj.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        })
    };
}



    // Méthode pour exporter le calendrier
    exportCalendar(format = 'ics') {
        try {
            const startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
            const endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 2, 0);
            
            let content = '';
            const allItems = this.getAllItemsInRange(startDate, endDate);

            if (format === 'ics') {
                content = this.generateICSContent(allItems);
                this.downloadFile(content, `calendrier_${this.currentDate.getFullYear()}_${this.currentDate.getMonth() + 1}.ics`, 'text/calendar');
            } else if (format === 'csv') {
                content = this.generateCSVContent(allItems);
                this.downloadFile(content, `calendrier_${this.currentDate.getFullYear()}_${this.currentDate.getMonth() + 1}.csv`, 'text/csv');
            }

            showNotification(`Calendrier exporté avec succès au format ${format.toUpperCase()}`, 'success');
        } catch (error) {
            console.error('Erreur lors de l\'export:', error);
            showNotification('Erreur lors de l\'export du calendrier', 'error');
        }
    }

    getAllItemsInRange(startDate, endDate) {
        const items = [];
        
        // Événements ponctuels dans la plage
        this.allEvents.forEach(event => {
            const eventDate = this.parseApiDateTime(event.startDatetime);
            if (eventDate && eventDate >= startDate && eventDate <= endDate) {
                items.push({ ...event, itemType: 'event' });
            }
        });

        // Instances d'horaires récurrents dans la plage
        this.allRecurringSchedules.forEach(schedule => {
            const instances = this.generateRecurringEvents(schedule, startDate, endDate);
            items.push(...instances);
        });

        // Exceptions dans la plage
        this.allScheduleExceptions.forEach(exception => {
            let exceptionDate;
            if (exception.date.includes(' ')) {
                exceptionDate = this.parseApiDateTime(exception.date);
            } else {
                exceptionDate = this.parseApiDateTime(exception.date + ' 00:00');
            }
            if (exceptionDate && exceptionDate >= startDate && exceptionDate <= endDate) {
                items.push({ ...exception, itemType: 'exception' });
            }
        });

        return items.sort((a, b) => {
            const dateA = this.parseApiDateTime(a.startDatetime) || new Date(0);
            const dateB = this.parseApiDateTime(b.startDatetime) || new Date(0);
            return dateA - dateB;
        });
    }

    generateICSContent(items) {
        let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:ACOO Calendar\n';
        
        items.forEach(item => {
            if (item.itemType === 'exception' && item.is_cancelled) return; // Ignorer les exceptions annulées
            
            let startDate, endDate;
            
            // Gestion des différents types d'éléments et de leurs dates
            if (item.itemType === 'event') {
                startDate = new Date(item.startDatetime);
                endDate = new Date(item.endDatetime);
            } else if (item.itemType === 'recurring') {
                // Pour les horaires récurrents, on ne peut pas les exporter directement
                // car ils n'ont pas de date fixe, on les ignore dans l'export ICS
                console.warn('Horaire récurrent ignoré dans l\'export ICS:', item.title);
                return;
            } else if (item.itemType === 'exception') {
                const exceptionDate = new Date(item.date);
                if (item.startTime && item.endTime) {
                    const [startHour, startMin] = item.startTime.split(':').map(Number);
                    const [endHour, endMin] = item.endTime.split(':').map(Number);
                    
                    startDate = new Date(exceptionDate);
                    startDate.setHours(startHour, startMin, 0, 0);
                    
                    endDate = new Date(exceptionDate);
                    endDate.setHours(endHour, endMin, 0, 0);
                } else {
                    startDate = exceptionDate;
                    endDate = new Date(exceptionDate.getTime() + 60 * 60 * 1000); // +1 heure par défaut
                }
            } else {
                console.warn('Type d\'élément non reconnu pour l\'export ICS:', item);
                return;
            }
            
            // Vérifier que les dates sont valides
            if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                console.warn('Dates invalides pour l\'élément:', item);
                return;
            }
            
            ics += 'BEGIN:VEVENT\n';
            ics += `UID:${item.id || item.generatedId}_${Date.now()}@acoo.fr\n`;
            ics += `DTSTART:${this.formatDateForICS(startDate)}\n`;
            ics += `DTEND:${this.formatDateForICS(endDate)}\n`;
            ics += `SUMMARY:${this.escapeICSText(item.title)}\n`;
            
            if (item.location) {
                ics += `LOCATION:${this.escapeICSText(item.location)}\n`;
            }
            
            if (item.description || item.content) {
                ics += `DESCRIPTION:${this.escapeICSText(item.description || item.content || '')}\n`;
            }
            
            ics += 'END:VEVENT\n';
        });
        
        ics += 'END:VCALENDAR';
        return ics;
    }

    generateCSVContent(items) {
        let csv = 'Date,Heure début,Heure fin,Titre,Type,Sport,Lieu,Statut\n';
        
        items.forEach(item => {
            let startDate, endDate;
            
            // Gestion des différents types d'éléments
            if (item.itemType === 'event') {
                startDate = new Date(item.startDatetime);
                endDate = new Date(item.endDatetime);
            } else if (item.itemType === 'recurring') {
                // Pour les horaires récurrents, on affiche les informations génériques
                csv += `"${item.day_of_week}",`;
                csv += `"${item.start_time}",`;
                csv += `"${this.getFormattedEndTimeForRecurring(item)}",`;
                csv += `"${this.escapeCSVText(item.title)}",`;
                csv += `"${this.getTypeLabel(item.itemType)}",`;
                csv += `"${this.allSports.find(s => s.id == item.sport)?.name || ''}",`;
                csv += `"${this.escapeCSVText(item.location || '')}",`;
                csv += `"Récurrent"\n`;
                return;
            } else if (item.itemType === 'exception') {
                const exceptionDate = new Date(item.date);
                if (item.startTime && item.endTime) {
                    const [startHour, startMin] = item.startTime.split(':').map(Number);
                    const [endHour, endMin] = item.endTime.split(':').map(Number);
                    
                    startDate = new Date(exceptionDate);
                    startDate.setHours(startHour, startMin, 0, 0);
                    
                    endDate = new Date(exceptionDate);
                    endDate.setHours(endHour, endMin, 0, 0);
                } else {
                    startDate = exceptionDate;
                    endDate = exceptionDate;
                }
            }
            
            // Vérifier que les dates sont valides
            if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                console.warn('Dates invalides pour l\'élément CSV:', item);
                return;
            }
            
            const sport = this.allSports.find(s => s.id == item.sport)?.name || '';
            
            let status = 'Actif';
            if (item.itemType === 'exception') {
                status = item.is_cancelled ? 'Annulé' : 'Modifié';
            } else if (item.isCancelled) {
                status = 'Annulé';
            }
            
            csv += `"${startDate.toLocaleDateString('fr-FR')}",`;
            csv += `"${startDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}",`;
            csv += `"${endDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}",`;
            csv += `"${this.escapeCSVText(item.title)}",`;
            csv += `"${this.getTypeLabel(item.itemType)}",`;
            csv += `"${sport}",`;
            csv += `"${this.escapeCSVText(item.location || '')}",`;
            csv += `"${status}"\n`;
        });
        
        return csv;
    }

    formatDateForICS(date) {
        // Vérifier si la date est valide
        if (!date || isNaN(date.getTime())) {
            console.warn('Date invalide pour ICS:', date);
            return new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        }
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    escapeICSText(text) {
        return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    }

    escapeCSVText(text) {
        return text.replace(/"/g, '""');
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// Initialisation globale
let calendarManager;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé, initialisation du calendrier unifié...');
    calendarManager = new UnifiedCalendarManager();
    
    // Exposer globalement pour les onclick
    window.calendarManager = calendarManager;
    console.log('Calendrier unifié initialisé et exposé globalement');
});

// Export pour compatibilité
export function initEventsDashboard() {
    if (!calendarManager) {
        calendarManager = new UnifiedCalendarManager();
        window.calendarManager = calendarManager;
        window.UnifiedCalendarManager = UnifiedCalendarManager;
    }
    return calendarManager;
}



export function destroyEventsDashboard() {
  if (calendarManager) {
    // Nettoyer les event listeners globaux
    const globalListeners = ['keydown'];
    globalListeners.forEach(eventType => {
      document.removeEventListener(eventType, calendarManager);
    });

    // Nettoyer les références globales
    if (window.calendarManager) {
      delete window.calendarManager;
    }
    if (window.UnifiedCalendarManager) {
      delete window.UnifiedCalendarManager;
    }

    // Fermer toutes les modales ouvertes
    if (calendarManager.elements) {
      [calendarManager.elements.eventModal, 
       calendarManager.elements.recurringModal,
       calendarManager.elements.exceptionModal,
       calendarManager.elements.deleteModal,
       document.getElementById('view-modal')].forEach(modal => {
        if (modal && modal.classList.contains('show')) {
          calendarManager.closeModal(modal);
        }
      });
    }

    // Nettoyer les données
    calendarManager.allEvents = [];
    calendarManager.allRecurringSchedules = [];
    calendarManager.allScheduleExceptions = [];
    calendarManager.allSports = [];
    calendarManager.allTeams = [];
    calendarManager.filteredItems = [];
    calendarManager.currentItemId = null;
    calendarManager.currentItemType = null;
    calendarManager.deleteItemId = null;
    calendarManager.deleteItemType = null;

    // Supprimer la référence
    calendarManager = null;
    
    console.log('UnifiedCalendarManager détruit avec succès');
  }
}
