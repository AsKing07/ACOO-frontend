import { showNotification } from "../showNotification.js";
import { getEvents, addEvent, updateEvent, deleteEvent } from "../../service/api/eventApi.js";
import { getSports } from "../../service/api/sportApi.js";
import { getTeams } from "../../service/api/teamApi.js";

class EventsCalendarManager {
    constructor() {
        this.monthNames = [
            'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
            'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'
        ];
        
        this.allEvents = [];
        this.filteredEvents = [];
        this.allSports = [];
        this.allTeams = [];
        this.currentDate = new Date();
        this.currentEventId = null;
        this.currentImages = [];
        this.deleteEventId = null;
        this.viewMode = 'calendar'; // 'calendar' ou 'table'
        
        this.elements = {};
        this.init();
    }

    async init() {
        try {
            this.initElements();
            this.attachEventListeners();
            await this.loadData();
            this.renderCalendar(this.currentDate);
            this.renderEventsTable();
        } catch (error) {
            console.error('Erreur lors de l\'initialisation:', error);
            showNotification('Erreur lors de l\'initialisation de l\'interface', 'error');
        }
    }

    initElements() {
        this.elements = {
            // Calendrier
            monthDisplay: document.getElementById('month-display'),
            calendarGrid: document.getElementById('calendar-grid'),
            prevBtn: document.getElementById('prev-month-btn'),
            nextBtn: document.getElementById('next-month-btn'),
            todayBtn: document.getElementById('today-btn'),
            
            // Contrôles
            addEventBtn: document.getElementById('add-event-btn'),
            toggleViewBtn: document.getElementById('toggle-view-btn'),
            eventTypeFilter: document.getElementById('event-type-filter'),
            
            // Tableau
            eventsTableSection: document.getElementById('events-table-section'),
            eventsTableBody: document.getElementById('events-table-body'),
            eventsCount: document.getElementById('events-count'),
            noEventsMessage: document.getElementById('no-events-message'),
            
            // Modales
            eventModal: document.getElementById('event-modal'),
            eventViewModal: document.getElementById('event-view-modal'),
            deleteEventModal: document.getElementById('delete-event-modal'),
            
            // Formulaire
            eventForm: document.getElementById('event-form'),
            eventModalTitle: document.getElementById('event-modal-title'),
            eventSubmitBtn: document.getElementById('event-submit-btn'),
            
            // Loader
            eventsLoader: document.getElementById('events-loader'),
            
            // Labels
            labels: document.querySelectorAll('.labels-container > div')
        };
    }

    async loadData() {
        try {
            this.toggleLoader(true);
            
            // Chargement parallèle des données
            const [events, sports, teams] = await Promise.all([
                getEvents(),
                getSports(),
                getTeams()
            ]);
            
            this.allEvents = events;
            this.filteredEvents = [...events];
            this.allSports = sports;
            this.allTeams = teams;
            
            this.populateFormSelects();
            this.updateEventsCount();
            
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            showNotification('Erreur lors du chargement des données', 'error');
        } finally {
            this.toggleLoader(false);
        }
    }

    populateFormSelects() {
        // Remplir le select des sports
        const sportSelect = document.getElementById('event-sport');
        if (sportSelect) {
            sportSelect.innerHTML = '<option value="">Sélectionner un sport</option>';
            this.allSports.forEach(sport => {
                const option = document.createElement('option');
                option.value = sport.id;
                option.textContent = sport.name;
                sportSelect.appendChild(option);
            });
        }

        // Remplir le sélecteur d'équipes
        const teamsSelector = document.getElementById('teams-selector');
        if (teamsSelector) {
            teamsSelector.innerHTML = '';
            this.allTeams.forEach(team => {
                const teamCheckbox = document.createElement('div');
                teamCheckbox.className = 'team-checkbox';
                teamCheckbox.innerHTML = `
                    <input type="checkbox" id="team-${team.id}" value="${team.id}">
                    <label for="team-${team.id}">${team.name}</label>
                `;
                teamsSelector.appendChild(teamCheckbox);
            });
        }
    }

    renderCalendar(date) {
        if (!this.elements.calendarGrid || !this.elements.monthDisplay) return;

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const lastDayOfPreviousMonth = new Date(year, month, 0);

        const startDay = (firstDayOfMonth.getDay() + 6) % 7; // Lundi = 0
        const totalDays = lastDayOfMonth.getDate();
        const prevMonthDays = lastDayOfPreviousMonth.getDate();

        this.elements.calendarGrid.innerHTML = '';

        // Jours du mois précédent
        for (let i = startDay - 1; i >= 0; i--) {
            const day = prevMonthDays - i;
            const dayElement = this.createDayElement(day, true, new Date(year, month - 1, day));
            this.elements.calendarGrid.appendChild(dayElement);
        }

        // Jours du mois courant
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

        for (let i = 1; i <= totalDays; i++) {
            const currentDay = new Date(year, month, i);
            const isToday = isCurrentMonth && i === today.getDate();
            const dayElement = this.createDayElement(i, false, currentDay, isToday);
            this.elements.calendarGrid.appendChild(dayElement);
        }

        // Jours du mois suivant
        const totalDisplayed = startDay + totalDays;
        const remaining = 42 - totalDisplayed;

        for (let i = 1; i <= remaining; i++) {
            const dayElement = this.createDayElement(i, true, new Date(year, month + 1, i));
            this.elements.calendarGrid.appendChild(dayElement);
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
            // Rechercher les événements de ce jour
            const dayEvents = this.getEventsForDate(date);
            
            if (dayEvents.length > 0) {
                dayElement.classList.add('has-events');
                
                const eventsListElement = document.createElement('div');
                eventsListElement.className = 'events-list';
                
                // Afficher jusqu'à 3 événements
                const visibleEvents = dayEvents.slice(0, 3);
                visibleEvents.forEach(event => {
                    const eventDot = document.createElement('div');
                    eventDot.className = 'event-dot';
                    eventDot.style.backgroundColor = event.getEventTypeColor();
                    eventDot.textContent = event.title.length > 12 ? 
                        event.title.substring(0, 12) + '...' : event.title;
                    eventDot.title = `${event.title} - ${event.getFormattedStartTime()}`;
                    eventDot.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.viewEvent(event.id);
                    });
                    eventsListElement.appendChild(eventDot);
                });

                // Afficher "+X autres" si il y a plus de 3 événements
                if (dayEvents.length > 3) {
                    const moreEvents = document.createElement('div');
                    moreEvents.className = 'more-events';
                    moreEvents.textContent = `+${dayEvents.length - 3} autres`;
                    moreEvents.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.showDayEvents(date, dayEvents);
                    });
                    eventsListElement.appendChild(moreEvents);
                }

                dayElement.appendChild(eventsListElement);
            }

            // Clic sur le jour pour ajouter un événement
            dayElement.addEventListener('click', () => {
                this.openAddEventModal(date);
            });
        }

        return dayElement;
    }

    getEventsForDate(date) {
        return this.filteredEvents.filter(event => {
            const eventDate = event.getStartDate();
            return eventDate.toDateString() === date.toDateString();
        });
    }

    renderEventsTable() {
        if (!this.elements.eventsTableBody) return;

        if (this.filteredEvents.length === 0) {
            this.elements.eventsTableBody.innerHTML = '';
            if (this.elements.noEventsMessage) {
                this.elements.noEventsMessage.style.display = 'block';
            }
        } else {
            if (this.elements.noEventsMessage) {
                this.elements.noEventsMessage.style.display = 'none';
            }
            
            this.elements.eventsTableBody.innerHTML = this.filteredEvents.map(event => 
                this.createEventRow(event)
            ).join('');
        }
        
        this.updateEventsCount();
    }

    createEventRow(event) {
        const startDate = event.getFormattedStartDate();
        const startTime = event.getFormattedStartTime();
        const endTime = event.getFormattedEndTime();
        const mainImage = event.getMainImage();

        return `
            <tr data-event-id="${event.id}">
                <td>
                    <div class="event-table__name">
                        <img src="${mainImage || 'https://via.placeholder.com/40x40?text=E'}" 
                             alt="${event.title}" class="event-table__avatar">
                        <span>${event.title}</span>
                    </div>
                </td>
                <td title="${event.content}">${event.content ? 
                    (event.content.length > 50 ? event.content.substring(0, 50) + '...' : event.content) : 
                    'Aucune description'}</td>
                <td>
                    <span class="event-table__type" data-type="${event.eventType}">${event.eventType}</span>
                </td>
                <td>
                    <div>${startDate}</div>
                    <small>${startTime} - ${endTime}</small>
                </td>
                <td>${event.location}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn view-btn" onclick="eventsManager.viewEvent(${event.id})" title="Voir">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" onclick="eventsManager.editEvent(${event.id})" title="Modifier">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" onclick="eventsManager.confirmDeleteEvent(${event.id})" title="Supprimer">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    // Utilitaire pour la conversion d'image en base64
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = e => reject(e);
            reader.readAsDataURL(file);
        });
    }

    toggleLoader(show) {
        if (this.elements.eventsLoader) {
            this.elements.eventsLoader.style.display = show ? 'flex' : 'none';
        }
    }

    updateEventsCount() {
        if (this.elements.eventsCount) {
            this.elements.eventsCount.textContent = `${this.filteredEvents.length} événement(s)`;
        }
    }

    openAddEventModal(date = null) {
        this.currentEventId = null;
        this.currentImages = [];
        
        if (this.elements.eventModalTitle) {
            this.elements.eventModalTitle.textContent = 'Ajouter un Événement';
        }
        if (this.elements.eventSubmitBtn) {
            this.elements.eventSubmitBtn.querySelector('.btn-text').textContent = 'Ajouter';
        }
        
        this.elements.eventForm.reset();
        document.getElementById('event-images-preview').innerHTML = '';
        
        // Pré-remplir la date si fournie
        if (date) {
            const dateTimeString = this.formatDateTimeForInput(date);
            const startInput = document.getElementById('event-start');
            if (startInput) {
                startInput.value = dateTimeString;
            }
        }
        
        this.showModal(this.elements.eventModal);
    }

    formatDateTimeForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    viewEvent(eventId) {
        const event = this.allEvents.find(e => e.id == eventId);
        if (!event) return;
        
        // Remplir la modal de visualisation
        document.getElementById('view-event-title').textContent = event.title;
        document.getElementById('view-event-type').textContent = event.eventType;
        document.getElementById('view-event-type').style.backgroundColor = event.getEventTypeColor();
        document.getElementById('view-event-date').textContent = event.getFormattedStartDate();
        document.getElementById('view-event-time').textContent = `${event.getFormattedStartTime()} - ${event.getFormattedEndTime()}`;
        document.getElementById('view-event-location').textContent = event.location;
        document.getElementById('view-event-description').textContent = event.content || 'Aucune description';
        
        const statusBadge = document.getElementById('view-event-status');
        if (statusBadge) {
            statusBadge.textContent = event.isCancelled ? 'Annulé' : 'Programmé';
            statusBadge.className = `event-status-badge ${event.isCancelled ? 'cancelled' : 'scheduled'}`;
        }
        
        // Image principale
        const imageContainer = document.getElementById('view-event-image-container');
        const eventImage = document.getElementById('view-event-image');
        if (event.getMainImage()) {
            imageContainer.style.display = 'block';
            eventImage.src = event.getMainImage();
            eventImage.alt = event.title;
        } else {
            imageContainer.style.display = 'none';
        }
        
        // Configurer les boutons d'action
        document.getElementById('edit-event-from-view-btn').onclick = () => {
            this.closeModal(this.elements.eventViewModal);
            this.editEvent(eventId);
        };
        
        document.getElementById('delete-event-from-view-btn').onclick = () => {
            this.closeModal(this.elements.eventViewModal);
            this.confirmDeleteEvent(eventId);
        };
        
        this.showModal(this.elements.eventViewModal);
    }

    editEvent(eventId) {
        const event = this.allEvents.find(e => e.id == eventId);
        if (!event) return;
        
        this.currentEventId = eventId;
        this.currentImages = [...event.images];
        
        if (this.elements.eventModalTitle) {
            this.elements.eventModalTitle.textContent = 'Modifier l\'Événement';
        }
        if (this.elements.eventSubmitBtn) {
            this.elements.eventSubmitBtn.querySelector('.btn-text').textContent = 'Modifier';
        }
        
        // Remplir le formulaire
        document.getElementById('event-id').value = event.id;
        document.getElementById('event-title').value = event.title;
        document.getElementById('event-content').value = event.content || '';
        document.getElementById('event-type').value = event.eventType;
        document.getElementById('event-location').value = event.location;
        document.getElementById('event-sport').value = event.sport || '';
        document.getElementById('event-cancelled').checked = event.isCancelled;
        
        // Dates
        const startDate = new Date(event.startDatetime);
        const endDate = new Date(event.endDatetime);
        document.getElementById('event-start').value = this.formatDateTimeForInput(startDate);
        document.getElementById('event-end').value = this.formatDateTimeForInput(endDate);
        
        // Équipes
        const teamCheckboxes = document.querySelectorAll('#teams-selector input[type="checkbox"]');
        teamCheckboxes.forEach(checkbox => {
            checkbox.checked = event.teams.includes(parseInt(checkbox.value));
        });
        
        // Images
        this.displayImagePreviews();
        
        this.showModal(this.elements.eventModal);
    }

    confirmDeleteEvent(eventId) {
        const event = this.allEvents.find(e => e.id == eventId);
        if (!event) return;
        
        this.deleteEventId = eventId;
        document.getElementById('delete-event-name').textContent = event.title;
        this.showModal(this.elements.deleteEventModal);
    }

    filterEvents(eventType = '') {
        if (eventType) {
            this.filteredEvents = this.allEvents.filter(event => event.eventType === eventType);
        } else {
            this.filteredEvents = [...this.allEvents];
        }
        
        this.renderCalendar(this.currentDate);
        this.renderEventsTable();
    }

    toggleView() {
        this.viewMode = this.viewMode === 'calendar' ? 'table' : 'calendar';
        
        const calendarContainer = document.querySelector('.calendar-container');
        const tableSection = this.elements.eventsTableSection;
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

    displayImagePreviews() {
        const previewContainer = document.getElementById('event-images-preview');
        if (!previewContainer) return;
        
        previewContainer.innerHTML = '';
        this.currentImages.forEach((image, index) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'image-preview-item';
            previewItem.innerHTML = `
                <img src="${image}" alt="Aperçu ${index + 1}">
                <button type="button" class="remove-image-btn" onclick="eventsManager.removeImage(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            previewContainer.appendChild(previewItem);
        });
    }

    removeImage(index) {
        this.currentImages.splice(index, 1);
        this.displayImagePreviews();
    }

    attachEventListeners() {
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

        // Boutons de contrôle
        if (this.elements.addEventBtn) {
            this.elements.addEventBtn.addEventListener('click', () => this.openAddEventModal());
        }

        if (this.elements.toggleViewBtn) {
            this.elements.toggleViewBtn.addEventListener('click', () => this.toggleView());
        }

        // Filtre par type
        if (this.elements.eventTypeFilter) {
            this.elements.eventTypeFilter.addEventListener('change', (e) => {
                this.filterEvents(e.target.value);
            });
        }

        // Labels de filtre
        this.elements.labels.forEach(label => {
            label.addEventListener('click', () => {
                const eventType = label.dataset.type;
                
                // Toggle active state
                if (label.classList.contains('active')) {
                    label.classList.remove('active');
                    this.filterEvents('');
                    if (this.elements.eventTypeFilter) {
                        this.elements.eventTypeFilter.value = '';
                    }
                } else {
                    this.elements.labels.forEach(l => l.classList.remove('active'));
                    label.classList.add('active');
                    this.filterEvents(eventType);
                    if (this.elements.eventTypeFilter) {
                        this.elements.eventTypeFilter.value = eventType;
                    }
                }
            });
        });

        // Upload d'images
        const imagesInput = document.getElementById('event-images');
        if (imagesInput) {
            imagesInput.addEventListener('change', async (e) => {
                const files = Array.from(e.target.files);
                
                for (const file of files) {
                    try {
                        const base64 = await this.fileToBase64(file);
                        this.currentImages.push(base64);
                    } catch (error) {
                        console.error('Erreur lors du chargement de l\'image:', error);
                        showNotification('Erreur lors du chargement d\'une image', 'error');
                    }
                }
                
                this.displayImagePreviews();
            });
        }

        // Soumission du formulaire
        if (this.elements.eventForm) {
            this.elements.eventForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleFormSubmit();
            });
        }

        // Fermeture des modales
        this.setupModalClosing();
    }

    setupModalClosing() {
        // Boutons de fermeture
        const closeButtons = [
            { id: 'close-event-modal', modal: this.elements.eventModal },
            { id: 'close-event-view-modal', modal: this.elements.eventViewModal },
            { id: 'close-delete-event-modal', modal: this.elements.deleteEventModal },
            { id: 'cancel-event-btn', modal: this.elements.eventModal },
            { id: 'cancel-delete-event-btn', modal: this.elements.deleteEventModal }
        ];

        closeButtons.forEach(({ id, modal }) => {
            const button = document.getElementById(id);
            if (button && modal) {
                button.addEventListener('click', () => this.closeModal(modal));
            }
        });

        // Clic à l'extérieur des modales
        [this.elements.eventModal, this.elements.eventViewModal, this.elements.deleteEventModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal(modal);
                    }
                });
            }
        });

        // Confirmation de suppression
        const confirmDeleteBtn = document.getElementById('confirm-delete-event-btn');
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', async () => {
                await this.handleDeleteEvent();
            });
        }

        // Fermeture avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                [this.elements.eventModal, this.elements.eventViewModal, this.elements.deleteEventModal].forEach(modal => {
                    if (modal && modal.classList.contains('show')) {
                        this.closeModal(modal);
                    }
                });
            }
        });
    }

    async handleFormSubmit() {
        const formData = this.collectFormData();
        
        if (!this.validateFormData(formData)) {
            return;
        }

        try {
            const submitBtn = this.elements.eventSubmitBtn;
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.querySelector('.btn-text').textContent = 'Enregistrement...';
            }

            if (this.currentEventId) {
                await updateEvent(this.currentEventId, formData);
                showNotification('Événement modifié avec succès', 'success');
            } else {
                await addEvent(formData);
                showNotification('Événement ajouté avec succès', 'success');
            }

            this.closeModal(this.elements.eventModal);
            await this.loadData();
            this.renderCalendar(this.currentDate);
            this.renderEventsTable();

        } catch (error) {
            console.error('Erreur lors de l\'enregistrement:', error);
            showNotification(error.message, 'error');
        } finally {
            const submitBtn = this.elements.eventSubmitBtn;
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = this.currentEventId ? 'Modifier' : 'Ajouter';
            }
        }
    }

    collectFormData() {
        // Collecter les équipes sélectionnées
        const selectedTeams = [];
        const teamCheckboxes = document.querySelectorAll('#teams-selector input[type="checkbox"]:checked');
        teamCheckboxes.forEach(checkbox => {
            selectedTeams.push(parseInt(checkbox.value));
        });

        // Formater les dates pour l'API
        const startDateTime = new Date(document.getElementById('event-start').value);
        const endDateTime = new Date(document.getElementById('event-end').value);

        const formatDateTimeForAPI = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        };

        return {
            title: document.getElementById('event-title').value.trim(),
            content: document.getElementById('event-content').value.trim(),
            eventType: document.getElementById('event-type').value,
            location: document.getElementById('event-location').value.trim(),
            isCancelled: document.getElementById('event-cancelled').checked,
            startDatetime: formatDateTimeForAPI(startDateTime),
            endDatetime: formatDateTimeForAPI(endDateTime),
            sport: document.getElementById('event-sport').value || null,
            teams: selectedTeams,
            images: this.currentImages
        };
    }

    validateFormData(data) {
        if (!data.title) {
            showNotification('Le titre est obligatoire', 'error');
            return false;
        }

        if (!data.eventType) {
            showNotification('Le type d\'événement est obligatoire', 'error');
            return false;
        }

        if (!data.location) {
            showNotification('Le lieu est obligatoire', 'error');
            return false;
        }

        if (!data.startDatetime || !data.endDatetime) {
            showNotification('Les dates de début et de fin sont obligatoires', 'error');
            return false;
        }

        const startDate = new Date(document.getElementById('event-start').value);
        const endDate = new Date(document.getElementById('event-end').value);

        if (endDate <= startDate) {
            showNotification('La date de fin doit être postérieure à la date de début', 'error');
            return false;
        }

        return true;
    }

    async handleDeleteEvent() {
        if (!this.deleteEventId) return;

        try {
            const confirmBtn = document.getElementById('confirm-delete-event-btn');
            if (confirmBtn) {
                confirmBtn.disabled = true;
                confirmBtn.textContent = 'Suppression...';
            }

            await deleteEvent(this.deleteEventId);
            showNotification('Événement supprimé avec succès', 'success');

            this.closeModal(this.elements.deleteEventModal);
            await this.loadData();
            this.renderCalendar(this.currentDate);
            this.renderEventsTable();

        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            showNotification(error.message, 'error');
        } finally {
            const confirmBtn = document.getElementById('confirm-delete-event-btn');
            if (confirmBtn) {
                confirmBtn.disabled = false;
                confirmBtn.textContent = 'Supprimer';
            }
            this.deleteEventId = null;
        }
    }

    // Méthodes globales pour les onclick
    viewEvent(eventId) {
        this.viewEvent(eventId);
    }

    editEvent(eventId) {
        this.editEvent(eventId);
    }

    confirmDeleteEvent(eventId) {
        this.confirmDeleteEvent(eventId);
    }

    removeImage(index) {
        this.removeImage(index);
    }
}

// Initialisation globale
let eventsManager;

document.addEventListener('DOMContentLoaded', () => {
    eventsManager = new EventsCalendarManager();
    
    // Exposer les méthodes globalement pour les onclick dans le HTML
    window.eventsManager = eventsManager;
});
