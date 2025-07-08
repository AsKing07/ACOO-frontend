// Import des services API
import { getEvents } from '../service/api/eventsApi.js';
import { getRecurringSchedules } from '../service/api/recurringScheduleApi.js';
import { getScheduleExceptions } from '../service/api/scheduleExceptionApi.js';
import { getSports } from '../service/api/sportApi.js';

/**
 * Gestionnaire de calendrier frontend optimisé
 */
class OptimizedCalendar {
    constructor() {
        this.monthNames = [
            'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
            'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'
        ];
        
        this.dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        
        // Données
        this.allEvents = [];
        this.allRecurringSchedules = [];
        this.allScheduleExceptions = [];
        this.allSports = [];
        this.filteredItems = [];
        
        // État
        this.currentDate = new Date();
        this.viewMode = 'calendar';
        this.filters = { sport: '', type: '' };
        this.sortMode = 'date';
        
        // Cache optimisé
        this.itemsCache = new Map();
        this.lastCacheUpdate = 0;
        
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Initialisation du calendrier optimisé...');
            this.initElements();
            this.attachEventListeners();
            await this.loadAllData();
            this.renderCalendar();
            this.updateStats();
            console.log('✅ Calendrier optimisé initialisé avec succès');
        } catch (error) {
            console.error('❌ Erreur initialisation:', error);
            this.showError('Erreur lors de l\'initialisation du calendrier');
        }
    }

    initElements() {
        this.elements = {
            // Navigation
            calendarGrid: document.getElementById('calendar-grid'),
            monthDisplay: document.getElementById('month-display'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            todayBtn: document.getElementById('today-btn'),
            refreshBtn: document.getElementById('refresh-btn'),
            
            // Vues
            toggleViewBtn: document.getElementById('toggle-view-btn'),
            calendarView: document.getElementById('calendar-view'),
            listView: document.getElementById('list-view'),
            listViewContent: document.getElementById('list-view-content'),
            listCount: document.getElementById('list-count'),
            listSort: document.getElementById('list-sort'),
            noListEvents: document.getElementById('no-list-events'),
            
            // Filtres
            sportFilter: document.getElementById('sport-filter'),
            typeFilter: document.getElementById('type-filter'),
            
            // Statistiques
            eventsCount: document.getElementById('events-count'),
            recurringCount: document.getElementById('recurring-count'),
            exceptionsCount: document.getElementById('exceptions-count'),
            filteredCount: document.getElementById('filtered-count'),
            
            // Modals
            eventModal: document.getElementById('event-modal'),
            dayEventsModal: document.getElementById('day-events-modal'),
            modalTitle: document.getElementById('modal-title'),
            modalBody: document.getElementById('modal-body'),
            eventTypeBadge: document.getElementById('event-type-badge'),
            
            // Messages
            loader: document.getElementById('calendar-loader'),
            errorMessage: document.getElementById('error-message'),
            retryBtn: document.getElementById('retry-btn')
        };
    }

    async loadAllData() {
        try {
            this.showLoader(true);
            this.hideError();
            
            console.log('📥 Chargement des données...');
            
            const results = await Promise.allSettled([
                getEvents(),
                getRecurringSchedules(),
                getScheduleExceptions(),
                getSports()
            ]);
            
            this.allEvents = results[0].status === 'fulfilled' ? results[0].value : [];
            this.allRecurringSchedules = results[1].status === 'fulfilled' ? results[1].value : [];
            this.allScheduleExceptions = results[2].status === 'fulfilled' ? results[2].value : [];
            this.allSports = results[3].status === 'fulfilled' ? results[3].value : [];
            
            console.log('📊 Données chargées:', {
                events: this.allEvents.length,
                recurring: this.allRecurringSchedules.length,
                exceptions: this.allScheduleExceptions.length,
                sports: this.allSports.length
            });
            
            this.populateFilters();
            this.applyFilters();
            this.lastCacheUpdate = Date.now();
            
        } catch (error) {
            console.error('❌ Erreur chargement données:', error);
            this.showError('Erreur lors du chargement des données');
        } finally {
            this.showLoader(false);
        }
    }

    populateFilters() {
        if (this.elements.sportFilter) {
            this.elements.sportFilter.innerHTML = '<option value="">Tous les sports</option>';
            this.allSports.forEach(sport => {
                const option = document.createElement('option');
                option.value = sport.id;
                option.textContent = sport.name;
                this.elements.sportFilter.appendChild(option);
            });
        }
    }

    applyFilters() {
        this.filteredItems = [];
        
        // Événements ponctuels
        if (!this.filters.type || this.filters.type === 'event') {
            let events = this.allEvents;
            if (this.filters.sport) {
                events = events.filter(event => event.sport == this.filters.sport);
            }
            this.filteredItems.push(...events.map(item => ({...item, itemType: 'event'})));
        }
        
        // Horaires récurrents
        if (!this.filters.type || this.filters.type === 'recurring') {
            let recurring = this.allRecurringSchedules;
            if (this.filters.sport) {
                recurring = recurring.filter(schedule => schedule.sport == this.filters.sport);
            }
            this.filteredItems.push(...recurring.map(item => ({...item, itemType: 'recurring'})));
        }
        
        // Exceptions
        if (!this.filters.type || this.filters.type === 'exception') {
            let exceptions = this.allScheduleExceptions;
            if (this.filters.sport) {
                exceptions = exceptions.filter(exception => {
                    const schedule = this.allRecurringSchedules.find(s => s.id == exception.recurring_schedule);
                    return schedule && schedule.sport == this.filters.sport;
                });
            }
            this.filteredItems.push(...exceptions.map(item => ({...item, itemType: 'exception'})));
        }
        
        this.clearCache();
        this.updateStats();
        
        // Redessiner la vue active
        if (this.viewMode === 'calendar') {
            this.renderCalendar();
        } else {
            this.renderListView();
        }
    }

    renderCalendar() {
        if (!this.elements.calendarGrid || !this.elements.monthDisplay) return;

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDay = (firstDay.getDay() + 6) % 7; // Lundi = 0
        const totalDays = lastDay.getDate();

        this.elements.calendarGrid.innerHTML = '';

        // Jours du mois précédent
        const prevMonth = new Date(year, month, 0);
        for (let i = startDay - 1; i >= 0; i--) {
            const day = prevMonth.getDate() - i;
            const date = new Date(year, month - 1, day);
            this.elements.calendarGrid.appendChild(this.createDayElement(day, true, date));
        }

        // Jours du mois courant
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

        for (let i = 1; i <= totalDays; i++) {
            const date = new Date(year, month, i);
            const isToday = isCurrentMonth && i === today.getDate();
            this.elements.calendarGrid.appendChild(this.createDayElement(i, false, date, isToday));
        }

        // Jours du mois suivant
        const totalDisplayed = startDay + totalDays;
        const remaining = Math.ceil(totalDisplayed / 7) * 7 - totalDisplayed;

        for (let i = 1; i <= remaining; i++) {
            const date = new Date(year, month + 1, i);
            this.elements.calendarGrid.appendChild(this.createDayElement(i, true, date));
        }

        this.elements.monthDisplay.innerHTML = `${this.monthNames[month]}<br>${year}`;
    }

    createDayElement(dayNumber, isAdjacent, date, isToday = false) {
        const dayElement = document.createElement('div');
        dayElement.className = `day ${isAdjacent ? 'adjacent' : ''} ${isToday ? 'today' : ''}`;
        
        const dayNumberEl = document.createElement('div');
        dayNumberEl.className = 'day-number';
        dayNumberEl.textContent = dayNumber;
        dayElement.appendChild(dayNumberEl);

        if (!isAdjacent) {
            const dayItems = this.getItemsForDate(date);
            
            if (dayItems.length > 0) {
                dayElement.classList.add('has-items');
                
                const itemsContainer = document.createElement('div');
                itemsContainer.className = 'items-list';
                
                // Afficher jusqu'à 3 événements
                const visibleItems = dayItems.slice(0, 3);
                visibleItems.forEach(item => {
                    const itemEl = this.createItemElement(item);
                    itemsContainer.appendChild(itemEl);
                });

                // "+X autres" si nécessaire
                if (dayItems.length > 3) {
                    const moreEl = document.createElement('div');
                    moreEl.className = 'more-items';
                    moreEl.textContent = `+${dayItems.length - 3} autres`;
                    moreEl.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.showDayEvents(date, dayItems);
                    });
                    itemsContainer.appendChild(moreEl);
                }

                dayElement.appendChild(itemsContainer);
            }

            // Clic sur le jour
            dayElement.addEventListener('click', () => {
                const dayItems = this.getItemsForDate(date);
                if (dayItems.length > 0) {
                    this.showDayEvents(date, dayItems);
                }
            });
        }

        return dayElement;
    }

    createItemElement(item) {
        const itemEl = document.createElement('div');
        itemEl.className = `item-event ${item.itemType}-item`;
        
        // Titre
        const titleEl = document.createElement('div');
        titleEl.className = 'item-title';
        const title = this.getItemTitle(item);
        titleEl.textContent = title.length > 20 ? title.substring(0, 20) + '...' : title;
        
        // Heure
        const timeEl = document.createElement('div');
        timeEl.className = 'item-time';
        timeEl.textContent = this.getItemDisplayTime(item);
        
        itemEl.appendChild(titleEl);
        if (timeEl.textContent) {
            itemEl.appendChild(timeEl);
        }
        
        // Tooltip
        itemEl.title = this.generateTooltip(item);
        
        // Event listener pour afficher le modal
        itemEl.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showEventModal(item);
        });
        
        return itemEl;
    }

    getItemTitle(item) {
        if (item.itemType === 'exception') {
            const recurringSchedule = this.allRecurringSchedules.find(r => r.id == item.recurring_schedule);
            return `Exception: ${recurringSchedule ? recurringSchedule.title : 'Horaire inconnu'}`;
        }
        return item.title || 'Sans titre';
    }

    getItemsForDate(date) {
        const dateKey = date.toDateString();
        
        if (this.itemsCache.has(dateKey)) {
            return this.itemsCache.get(dateKey);
        }
        
        const items = [];

        // Événements ponctuels
        this.filteredItems.filter(item => item.itemType === 'event').forEach(event => {
            const eventDate = this.parseDateTime(event.startDatetime);
            if (eventDate && eventDate.toDateString() === dateKey) {
                items.push(event);
            }
        });

        // Horaires récurrents
        this.filteredItems.filter(item => item.itemType === 'recurring').forEach(schedule => {
            if (this.isRecurringOnDate(schedule, date)) {
                const hasException = this.allScheduleExceptions.some(exception => {
                    const exceptionDate = this.parseDate(exception.date);
                    return exception.recurring_schedule == schedule.id && 
                           exceptionDate && exceptionDate.toDateString() === dateKey;
                });
                
                if (!hasException) {
                    items.push(schedule);
                }
            }
        });

        // Exceptions
        this.filteredItems.filter(item => item.itemType === 'exception').forEach(exception => {
            const exceptionDate = this.parseDate(exception.date);
            if (exceptionDate && exceptionDate.toDateString() === dateKey) {
                items.push(exception);
            }
        });

        // Trier par heure
        items.sort((a, b) => {
            const timeA = this.getItemSortTime(a);
            const timeB = this.getItemSortTime(b);
            return timeA.localeCompare(timeB);
        });
        
        this.itemsCache.set(dateKey, items);
        return items;
    }

    isRecurringOnDate(schedule, date) {
        const scheduleDayName = schedule.day_of_week;
        const dateDayName = this.dayNames[date.getDay()];
        
        if (scheduleDayName !== dateDayName) {
            return false;
        }
        
        // Vérifier la date de fin si elle existe
        if (schedule.end_date) {
            const endDate = this.parseDate(schedule.end_date);
            if (endDate && date > endDate) {
                return false;
            }
        }
        
        return true;
    }

    getItemDisplayTime(item) {
        switch (item.itemType) {
            case 'event':
                const startDate = this.parseDateTime(item.startDatetime);
                const endDate = this.parseDateTime(item.endDatetime);
                if (startDate && endDate) {
                    return `${this.formatTime(startDate)}-${this.formatTime(endDate)}`;
                }
                return startDate ? this.formatTime(startDate) : '';
                
            case 'recurring':
                const startTime = this.extractTime(item.start_time);
                const endTime = this.getFormattedEndTimeForRecurring(item);
                return endTime ? `${startTime}-${endTime}` : startTime;
                
            case 'exception':
                if (item.is_cancelled) {
                    return 'Annulé';
                } else if ( item.startTime && item.endTime) {
                    return `${this.extractTime( item.startTime)}-${this.extractTime( item.endTime)}`;
                }
                return 'Modifié';
                
            default:
                return '';
        }
    }

    getItemSortTime(item) {
        const displayTime = this.getItemDisplayTime(item);
        if (displayTime.includes('-')) {
            return displayTime.split('-')[0];
        }
        return displayTime || '00:00';
    }

    renderListView() {
        if (!this.elements.listViewContent) return;
        
        const allItems = this.getAllItemsForListView();
        
        if (allItems.length === 0) {
            this.elements.listViewContent.innerHTML = '';
            if (this.elements.noListEvents) {
                this.elements.noListEvents.style.display = 'block';
            }
            return;
        }
        
        if (this.elements.noListEvents) {
            this.elements.noListEvents.style.display = 'none';
        }
        
        // Trier les éléments
        this.sortItems(allItems);
        
        let html = '';
        allItems.forEach(item => {
            html += this.createListItemHTML(item);
        });
        
        this.elements.listViewContent.innerHTML = html;
        this.attachListItemListeners();
    }

    getAllItemsForListView() {
        const items = [];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30); // 30 jours dans le passé
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 90); // 90 jours dans le futur
        
        // Événements ponctuels
        this.filteredItems.filter(item => item.itemType === 'event').forEach(event => {
            const eventDate = this.parseDateTime(event.startDatetime);
            if (eventDate && eventDate >= startDate && eventDate <= endDate) {
                items.push({
                    ...event,
                    sortDate: eventDate,
                    displayDate: this.formatDate(eventDate)
                });
            }
        });
        
        // Horaires récurrents - générer des instances
        this.filteredItems.filter(item => item.itemType === 'recurring').forEach(schedule => {
            const instances = this.generateRecurringInstances(schedule, startDate, endDate);
            items.push(...instances);
        });
        
        // Exceptions
        this.filteredItems.filter(item => item.itemType === 'exception').forEach(exception => {
            const exceptionDate = this.parseDate(exception.date);
            if (exceptionDate && exceptionDate >= startDate && exceptionDate <= endDate) {
                items.push({
                    ...exception,
                    sortDate: exceptionDate,
                    displayDate: this.formatDate(exceptionDate)
                });
            }
        });
        
        return items;
    }

    generateRecurringInstances(schedule, startDate, endDate) {
        const instances = [];
        const targetDay = this.dayNames.indexOf(schedule.day_of_week);
        
        if (targetDay === -1) return instances;
        
        let currentDate = new Date(startDate);
        while (currentDate.getDay() !== targetDay && currentDate <= endDate) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        while (currentDate <= endDate) {
            // Vérifier s'il n'y a pas d'exception
            const hasException = this.allScheduleExceptions.some(exception => {
                const exceptionDate = this.parseDate(exception.date);
                return exception.recurring_schedule == schedule.id && 
                       exceptionDate && exceptionDate.toDateString() === currentDate.toDateString();
            });
            
            if (!hasException) {
                instances.push({
                    ...schedule,
                    sortDate: new Date(currentDate),
                    displayDate: this.formatDate(currentDate)
                });
            }
            
            currentDate.setDate(currentDate.getDate() + 7);
        }
        
        return instances;
    }

    sortItems(items) {
        switch (this.sortMode) {
            case 'date':
                items.sort((a, b) => a.sortDate - b.sortDate);
                break;
            case 'title':
                items.sort((a, b) => this.getItemTitle(a).localeCompare(this.getItemTitle(b)));
                break;
            case 'type':
                items.sort((a, b) => a.itemType.localeCompare(b.itemType));
                break;
        }
    }

    createListItemHTML(item) {
        const sport = this.allSports.find(s => s.id == item.sport);
        const sportName = sport ? sport.name : 'Sport inconnu';
        
        const typeLabels = {
            'event': 'Événement',
            'recurring': 'Entraînement',
            'exception': item.is_cancelled ? 'Annulation' : 'Modification'
        };
        
        return `
            <div class="list-event-item ${item.itemType}-item" data-item='${JSON.stringify(item)}'>
                <div class="list-item-header">
                    <div class="list-item-title">${this.getItemTitle(item)}</div>
                    <div class="list-item-type ${item.itemType}-badge">${typeLabels[item.itemType]}</div>
                </div>
                <div class="list-item-meta">
                    <div class="list-item-date">
                        <i class="fas fa-calendar"></i>
                        ${item.displayDate}
                    </div>
                    <div class="list-item-time">
                        <i class="fas fa-clock"></i>
                        ${this.getItemDisplayTime(item)}
                    </div>
                </div>
                ${item.location ? `
                    <div class="list-item-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${item.location}
                    </div>
                ` : ''}
                <div class="list-item-sport">
                    <i class="fas fa-trophy"></i>
                    ${sportName}
                </div>
                ${item.description || item.content || item.reason ? `
                    <div class="list-item-description">
                        ${item.description || item.content || item.reason}
                    </div>
                ` : ''}
            </div>
        `;
    }

    attachListItemListeners() {
        const listItems = this.elements.listViewContent.querySelectorAll('.list-event-item');
        listItems.forEach(item => {
            item.addEventListener('click', () => {
                const itemData = JSON.parse(item.dataset.item);
                this.showEventModal(itemData);
            });
        });
    }

    showEventModal(item) {
        if (!this.elements.eventModal) return;
        
        if (this.elements.modalTitle) {
            this.elements.modalTitle.textContent = this.getItemTitle(item);
        }
        
        if (this.elements.eventTypeBadge) {
            this.elements.eventTypeBadge.textContent = this.getTypeLabel(item.itemType);
            this.elements.eventTypeBadge.className = `event-type-badge ${item.itemType}-badge`;
        }
        
        if (this.elements.modalBody) {
            this.elements.modalBody.innerHTML = this.generateEventDetailsHTML(item);
        }
        
        this.elements.eventModal.style.display = 'flex';
        this.elements.eventModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    showDayEvents(date, events) {
        if (!this.elements.dayEventsModal) return;
        
        const dateString = this.formatDate(date, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        document.getElementById('day-modal-title').textContent = `Événements du ${dateString}`;

        let html = '';
        events.forEach(event => {
            html += `
                <div class="day-event-item ${event.itemType}-item" data-event='${JSON.stringify(event)}'>
                    <div class="day-event-header">
                        <h4>${this.getItemTitle(event)}</h4>
                        <span class="event-type-mini-badge ${event.itemType}-badge">${this.getTypeLabel(event.itemType)}</span>
                    </div>
                    <div class="day-event-details">
                        <p><i class="fas fa-clock"></i> ${this.getItemDisplayTime(event)}</p>
                        ${event.location ? `<p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>` : ''}
                        ${event.itemType === 'exception' && event.is_cancelled ? '<p class="cancellation-notice"><i class="fas fa-ban"></i> Séance annulée</p>' : ''}
                    </div>
                </div>
            `;
        });

        document.getElementById('day-modal-body').innerHTML = html;
        
        setTimeout(() => {
            document.querySelectorAll('.day-event-item').forEach(item => {
                item.addEventListener('click', () => {
                    const eventData = JSON.parse(item.dataset.event);
                    this.closeDayModal();
                    this.showEventModal(eventData);
                });
            });
        }, 100);
        
        this.elements.dayEventsModal.style.display = 'flex';
        this.elements.dayEventsModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    generateEventDetailsHTML(item) {
        let html = `<div class="event-details">`;
        
        // Badge de statut
        html += `<div class="status-section">`;
        html += `<span class="status-badge ${item.itemType}-status">${this.getTypeLabel(item.itemType)}</span>`;
        html += `</div>`;
        
        // Section date/heure
        html += `<div class="detail-section">`;
        html += `<h4><i class="fas fa-calendar"></i> Date et horaire</h4>`;
        
        switch (item.itemType) {
            case 'event':
                const startDate = this.parseDateTime(item.startDatetime);
                const endDate = this.parseDateTime(item.endDatetime);
                if (startDate) {
                    html += `<p><strong>Date :</strong> ${this.formatDate(startDate, { 
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                    })}</p>`;
                    if (endDate) {
                        html += `<p><strong>Horaire :</strong> ${this.formatTime(startDate)} - ${this.formatTime(endDate)}</p>`;
                    }
                }
                break;
                
            case 'recurring':
                html += `<p><strong>Récurrence :</strong> Tous les ${item.day_of_week}</p>`;
                html += `<p><strong>Horaire :</strong> ${this.getItemDisplayTime(item)}</p>`;
                if (item.duration) {
                    html += `<p><strong>Durée :</strong> ${item.duration} minutes</p>`;
                }
                break;
                
            case 'exception':
                const exceptionDate = this.parseDate(item.date);
                if (exceptionDate) {
                    html += `<p><strong>Date :</strong> ${this.formatDate(exceptionDate, { 
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                    })}</p>`;
                }
                html += `<p><strong>Statut :</strong> ${item.is_cancelled ? 'Séance annulée' : 'Horaire modifié'}</p>`;
                if (!item.is_cancelled && item.startTime) {
                    html += `<p><strong>Nouvel horaire :</strong> ${item.startTime} - ${item.endTime}</p>`;
                }
                break;
        }
        html += `</div>`;
        
        // Section lieu
        if (item.location) {
            html += `<div class="detail-section">`;
            html += `<h4><i class="fas fa-map-marker-alt"></i> Lieu</h4>`;
            html += `<p>${item.location}</p>`;
            html += `</div>`;
        }
        
        // Section sport
        const sport = this.allSports.find(s => s.id == item.sport);
        if (sport) {
            html += `<div class="detail-section">`;
            html += `<h4><i class="fas fa-dumbbell"></i> Sport</h4>`;
            html += `<p>${sport.name}</p>`;
            html += `</div>`;
        }
        
        // Section description
        if (item.description || item.content || item.reason) {
            html += `<div class="detail-section">`;
            html += `<h4><i class="fas fa-info-circle"></i> ${item.itemType === 'exception' ? 'Raison' : 'Description'}</h4>`;
            html += `<p>${item.description || item.content || item.reason}</p>`;
            html += `</div>`;
        }
        
        html += `</div>`;
        return html;
    }

    generateTooltip(item) {
        let tooltip = `${this.getItemTitle(item)}\n`;
        
        switch (item.itemType) {
            case 'event':
                const startDate = this.parseDateTime(item.startDatetime);
                const endDate = this.parseDateTime(item.endDatetime);
                if (startDate) {
                    tooltip += `📅 ${this.formatDate(startDate)}\n`;
                    if (endDate) {
                        tooltip += `🕐 ${this.formatTime(startDate)} - ${this.formatTime(endDate)}\n`;
                    }
                }
                break;
                
            case 'recurring':
                tooltip += `🔄 Tous les ${item.day_of_week}\n`;
                tooltip += `🕐 ${this.getItemDisplayTime(item)}\n`;
                if (item.duration) {
                    tooltip += `⏱️ Durée: ${item.duration} min\n`;
                }
                break;
                
            case 'exception':
                const excDate = this.parseDate(item.date);
                if (excDate) {
                    tooltip += `📅 ${this.formatDate(excDate)}\n`;
                }
                tooltip += `⚠️ ${item.is_cancelled ? 'Séance annulée' : 'Horaire modifié'}\n`;
                break;
        }
        
        if (item.location) tooltip += `📍 ${item.location}\n`;
        if (item.description || item.content || item.reason) {
            tooltip += `\n${item.description || item.content || item.reason}`;
        }
        
        return tooltip;
    }

    getTypeLabel(itemType) {
        const labels = {
            'event': 'Événement',
            'recurring': 'Récurrent',
            'exception': 'Exception'
        };
        return labels[itemType] || itemType;
    }

    // Méthodes utilitaires optimisées
    formatDate(date, options = {}) {
        const defaultOptions = { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        };
        return date.toLocaleDateString('fr-FR', { ...defaultOptions, ...options });
    }

    formatTime(date) {
        return date.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    }

    parseDate(dateString) {
        if (!dateString) return null;
        try {
            if (dateString.includes('/')) {
                const [day, month, year] = dateString.split('/').map(Number);
                return new Date(year, month - 1, day);
            }
            return new Date(dateString);
        } catch {
            return null;
        }
    }

    parseDateTime(dateTimeString) {
        if (!dateTimeString) return null;
        try {
            if (dateTimeString.includes('/')) {
                const [datePart, timePart] = dateTimeString.split(' ');
                const [day, month, year] = datePart.split('/').map(Number);
                if (timePart) {
                    const [hours, minutes] = timePart.split(':').map(Number);
                    return new Date(year, month - 1, day, hours, minutes);
                }
                return new Date(year, month - 1, day);
            }
            return new Date(dateTimeString);
        } catch {
            return null;
        }
    }

    extractTime(timeString) {
        if (!timeString) return '';
        
        try {
            if (/^\d{2}:\d{2}$/.test(timeString)) {
                return timeString;
            }
            
            if (timeString.includes(' ')) {
                const timePart = timeString.split(' ')[1];
                return timePart ? timePart.substring(0, 5) : '';
            }
            
            if (timeString.includes('T')) {
                const timePart = timeString.split('T')[1];
                return timePart ? timePart.substring(0, 5) : '';
            }
            
            return timeString.substring(0, 5);
        } catch {
            return '';
        }
    }

    getFormattedEndTimeForRecurring(item) {
        if (!item.start_time || !item.duration) return '';
        
        try {
            const startTime = this.extractTime(item.start_time);
            if (!startTime) return '';
            
            const [hours, minutes] = startTime.split(':').map(Number);
            const startMinutes = hours * 60 + minutes;
            const endMinutes = startMinutes + parseInt(item.duration);
            
            const endHours = Math.floor(endMinutes / 60) % 24;
            const endMins = endMinutes % 60;
            
            return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
        } catch {
            return '';
        }
    }

    // Méthodes de contrôle
    toggleView() {
        this.viewMode = this.viewMode === 'calendar' ? 'list' : 'calendar';
        
        if (this.viewMode === 'calendar') {
            this.elements.calendarView.style.display = 'block';
            this.elements.listView.style.display = 'none';
            this.elements.toggleViewBtn.innerHTML = '<i class="fas fa-list"></i>';
            this.elements.toggleViewBtn.title = 'Basculer vers la vue liste';
            this.renderCalendar();
        } else {
            this.elements.calendarView.style.display = 'none';
            this.elements.listView.style.display = 'block';
            this.elements.toggleViewBtn.innerHTML = '<i class="fas fa-calendar"></i>';
            this.elements.toggleViewBtn.title = 'Basculer vers la vue calendrier';
            this.renderListView();
        }
    }

    closeEventModal() {
        if (this.elements.eventModal) {
            this.elements.eventModal.classList.remove('show');
            setTimeout(() => {
                this.elements.eventModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    closeDayModal() {
        if (this.elements.dayEventsModal) {
            this.elements.dayEventsModal.classList.remove('show');
            setTimeout(() => {
                this.elements.dayEventsModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    updateStats() {
        if (this.elements.eventsCount) {
            this.elements.eventsCount.textContent = this.allEvents.length;
        }
        if (this.elements.recurringCount) {
            this.elements.recurringCount.textContent = this.allRecurringSchedules.length;
        }
        if (this.elements.exceptionsCount) {
            this.elements.exceptionsCount.textContent = this.allScheduleExceptions.length;
        }
        if (this.elements.filteredCount) {
            this.elements.filteredCount.textContent = this.filteredItems.length;
        }
        if (this.elements.listCount) {
            this.elements.listCount.textContent = `${this.filteredItems.length} événement(s)`;
        }
    }

    showLoader(show) {
        if (this.elements.loader) {
            this.elements.loader.style.display = show ? 'flex' : 'none';
        }
    }

    showError(message) {
        if (this.elements.errorMessage) {
            this.elements.errorMessage.querySelector('p').textContent = message;
            this.elements.errorMessage.style.display = 'block';
        }
    }

    hideError() {
        if (this.elements.errorMessage) {
            this.elements.errorMessage.style.display = 'none';
        }
    }

    clearCache() {
        this.itemsCache.clear();
    }

    attachEventListeners() {
        // Navigation calendrier
        this.elements.prevBtn?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.clearCache();
            this.renderCalendar();
        });

        this.elements.nextBtn?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.clearCache();
            this.renderCalendar();
        });

        this.elements.todayBtn?.addEventListener('click', () => {
            this.currentDate = new Date();
            this.clearCache();
            this.renderCalendar();
        });

        this.elements.refreshBtn?.addEventListener('click', async () => {
            await this.loadAllData();
        });

        // Filtres
        this.elements.sportFilter?.addEventListener('change', (e) => {
            this.filters.sport = e.target.value;
            this.applyFilters();
        });

        this.elements.typeFilter?.addEventListener('change', (e) => {
            this.filters.type = e.target.value;
            this.applyFilters();
        });

        this.elements.listSort?.addEventListener('change', (e) => {
            this.sortMode = e.target.value;
            if (this.viewMode === 'list') {
                this.renderListView();
            }
        });

        // Basculement de vue
        this.elements.toggleViewBtn?.addEventListener('click', () => {
            this.toggleView();
        });

        // Fermeture des modals
        document.getElementById('close-modal')?.addEventListener('click', () => {
            this.closeEventModal();
        });

        document.getElementById('close-day-modal')?.addEventListener('click', () => {
            this.closeDayModal();
        });

        // Clic à l'extérieur des modals
        this.elements.eventModal?.addEventListener('click', (e) => {
            if (e.target === this.elements.eventModal) {
                this.closeEventModal();
            }
        });

        this.elements.dayEventsModal?.addEventListener('click', (e) => {
            if (e.target === this.elements.dayEventsModal) {
                this.closeDayModal();
            }
        });

        // Bouton retry
        this.elements.retryBtn?.addEventListener('click', () => {
            this.loadAllData();
        });

        // Touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeEventModal();
                this.closeDayModal();
            }
        });
    }
}

// Initialisation
let optimizedCalendar;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initialisation du calendrier optimisé...');
    optimizedCalendar = new OptimizedCalendar();
    window.optimizedCalendar = optimizedCalendar;
});

export { OptimizedCalendar };
