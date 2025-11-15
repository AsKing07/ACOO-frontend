// Import des services API
import { getEvents } from '../../../service/api/eventsApi.js';
import { getRecurringSchedules } from '../../../service/api/recurringScheduleApi.js';
import { getScheduleExceptions } from '../../../service/api/scheduleExceptionApi.js';
import { getSports } from '../../../service/api/sportApi.js';

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
            
            // Debug des données récurrentes
            if (this.allRecurringSchedules.length > 0) {
                console.log('🔄 Premier horaire récurrent:', this.allRecurringSchedules[0]);
            }
            
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
                events = events.filter(event => event.sport.id == this.filters.sport);
            }
            this.filteredItems.push(...events.map(item => ({...item, itemType: 'event'})));
        }
        
        // Horaires récurrents
        if (!this.filters.type || this.filters.type === 'recurring') {
            let recurring = this.allRecurringSchedules;
            if (this.filters.sport) {
                recurring = recurring.filter(schedule => schedule.sport.id == this.filters.sport);
            }
            const recurringItems = recurring.map(item => ({...item, itemType: 'recurring'}));
            console.log('🔄 Horaires récurrents filtrés:', recurringItems);
            this.filteredItems.push(...recurringItems);
        }
        
        // Exceptions
        if (!this.filters.type || this.filters.type === 'exception') {
            let exceptions = this.allScheduleExceptions;
            if (this.filters.sport) {
                exceptions = exceptions.filter(exception => {
                    const schedule = this.allRecurringSchedules.find(s => s.id == exception.recurring_schedule);
                    return schedule && schedule.sport.id == this.filters.sport;
                });
            }
            this.filteredItems.push(...exceptions.map(item => ({...item, itemType: 'exception'})));
        }
        
        console.log('📊 Filtres appliqués:', {
            total: this.filteredItems.length,
            events: this.filteredItems.filter(i => i.itemType === 'event').length,
            recurring: this.filteredItems.filter(i => i.itemType === 'recurring').length,
            exceptions: this.filteredItems.filter(i => i.itemType === 'exception').length
        });
        
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
        
        // Diagnostic temporaire
        console.log('📅 Calendrier rendu pour:', `${this.monthNames[month]} ${year}`);
        setTimeout(() => {
            this.diagnoseRecurringIssues();
            this.testMondaySchedules();
        }, 100);
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
           
            return `Exception: ${item.recurring_schedule ? item.recurring_schedule.title : 'Horaire inconnu'}`;
        }
        return item.title || 'Sans titre';
    }

    getItemsForDate(date) {
        const dateKey = date.toDateString();
        
        if (this.itemsCache.has(dateKey)) {
            return this.itemsCache.get(dateKey);
        }
        
        const items = [];
        
        console.log('📅 Recherche d\'événements pour:', dateKey, {
            recurringCount: this.filteredItems.filter(item => item.itemType === 'recurring').length
        });

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
                    return String(exception.recurring_schedule) === String(schedule.id) && 
                           exceptionDate && exceptionDate.toDateString() === dateKey;
                });
                
                console.log('✅ Horaire récurrent trouvé:', {
                    schedule: schedule.title || schedule.id,
                    hasException,
                    date: dateKey
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
        
        console.log('📊 Items trouvés pour', dateKey, ':', items.length, items);
        
        this.itemsCache.set(dateKey, items);
        return items;
    }

    isRecurringOnDate(schedule, date) {
        const scheduleDayName = schedule.day_of_week;
        const dateDayName = this.dayNames[date.getDay()];
        
        console.log('🔍 Vérification récurrence:', {
            schedule: schedule.title || schedule.id,
            scheduleDayName,
            dateDayName,
            date: date.toDateString(),
            match: scheduleDayName === dateDayName,
            rawEndDate: schedule.end_date
        });
        
        if (scheduleDayName !== dateDayName) {
            return false;
        }
        
        // Vérifier la date de fin si elle existe
        if (schedule.end_date) {
            // Ignorer les dates de fin invalides ou vides
            if (schedule.end_date === '0000-00-00' || 
                schedule.end_date === '0000-00-00 00:00:00' || 
                schedule.end_date === '' || 
                schedule.end_date === null || 
                schedule.end_date === undefined ||
                schedule.end_date.startsWith('0000-00-00')) {
                console.log('🔄 Date de fin ignorée (invalide):', schedule.end_date);
                return true;
            }
            
            const endDate = this.parseDate(schedule.end_date);
            console.log('📅 Date de fin parsée:', {
                raw: schedule.end_date,
                parsed: endDate ? endDate.toDateString() : 'null',
                currentDate: date.toDateString(),
                isValid: endDate && !isNaN(endDate.getTime())
            });
            
            if (endDate && !isNaN(endDate.getTime()) && date > endDate) {
                console.log('⏰ Horaire récurrent expiré:', {
                    schedule: schedule.title || schedule.id,
                    endDate: endDate.toDateString(),
                    currentDate: date.toDateString()
                });
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
                } else if (item.startTime && item.endTime) {
                    return `${this.extractTime(item.startTime)}-${this.extractTime(item.endTime)}`;
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
                return String(exception.recurring_schedule) === String(schedule.id) && 
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

       /**
     * Génère les informations de statut pour un élément
     * @returns {Object} { text: string, class: string, icon: string }
     */
    getStatusInfo(itemData, itemType) {
        let statusText = '';
        let statusClass = 'badge badge-status';
        let statusIcon = '';
        const endDate = this.parseDateTime(itemData.endDatetime);
        const now = new Date();
        
        switch (itemType) {
            case 'event':
                if (itemData.isCancelled) {
                    statusText = 'Annulé';
                    statusClass += ' status-cancelled';
                    statusIcon = '<i class="fas fa-ban"></i>';
                } else if (endDate && endDate < now) {
                    statusText = 'Événement passé';
                    statusClass += ' status-past';
                    statusIcon = '<i class="fas fa-history"></i>';
                } else {
                    statusText = 'À venir';
                    statusClass += ' status-active';
                    statusIcon = '<i class="fas fa-check"></i>';
                }
                break;
            case 'recurring':
                statusText = 'Actif';
                statusClass += ' status-recurring';
                statusIcon = '<i class="fas fa-repeat"></i>';
                break;
            case 'exception':
                if (itemData.is_cancelled) {
                    statusText = 'Séance annulée';
                    statusClass += ' status-cancelled';
                    statusIcon = '<i class="fas fa-ban"></i>';
                } else {
                    statusText = 'Séance modifiée';
                    statusClass += ' status-modified';
                    statusIcon = '<i class="fas fa-exclamation-triangle"></i>';
                }
                break;
        }
        
        return { text: statusText, class: statusClass, icon: statusIcon };
    }

    /**
     * Met à jour un élément DOM avec le badge de statut
     */
    updateStatusBadge(statusElement, itemData, itemType) {
        const statusInfo = this.getStatusInfo(itemData, itemType);
        statusElement.textContent = statusInfo.text;
        statusElement.className = statusInfo.class;
    }

    generateEventDetailsHTML(item) {
        let html = `<div class="event-details">`;
        
        // Badge de statut
        html += `<div style="display: flex; gap: 10px; align-items: center;" class="status-section">`;
        html += `<span class="status-badge ${item.itemType}-status">${this.getTypeLabel(item.itemType)}</span>`;
        
        // Utiliser getStatusInfo pour obtenir les informations de statut
        const statusInfo = this.getStatusInfo(item, item.itemType);
        html += `<span class="${statusInfo.class}">${statusInfo.icon} ${statusInfo.text}</span>`;
        
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
                    html += `<p><strong>Nouvel horaire :</strong> ${this.extractTime(item.startTime)} - ${this.extractTime(item.endTime)}</p>`;
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
            'event': 'Événement Ponctuel',
            'recurring': 'Récurrent',
            'exception': 'Exception'
        };
        return labels[itemType] || itemType;
    }

    // Méthodes utilitaires optimisées
    formatDate(date, options = {}) {
        if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
            console.warn('Date invalide fournie à formatDate:', date);
            return 'Date invalide';
        }
        
        const defaultOptions = { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        };
        return date.toLocaleDateString('fr-FR', { ...defaultOptions, ...options });
    }

    formatTime(date) {
        if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
            console.warn('Date invalide fournie à formatTime:', date);
            return '';
        }
        
        return date.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    }

    parseDate(dateString) {
        if (!dateString) return null;
        
        // Ignorer les dates invalides communes
        if (dateString === '0000-00-00' || 
            dateString === '0000-00-00 00:00:00' || 
            dateString === '' || 
            dateString === null ||
            dateString.startsWith('0000-00-00')) {
            return null;
        }
        
        try {
            // Format d/m/Y ou dd/mm/yyyy
            if (dateString.includes('/')) {
                const [datePart] = dateString.split(' ');
                const parts = datePart.split('/');
                if (parts.length === 3) {
                    const [day, month, year] = parts.map(Number);
                    // Vérifier que l'année est valide
                    if (year > 1900 && year < 3000 && month > 0 && month <= 12 && day > 0 && day <= 31) {
                        return new Date(year, month - 1, day);
                    }
                }
            }
            
            // Format YYYY-MM-DD (ISO)
            if (dateString.includes('-')) {
                const parts = dateString.split(' ')[0].split('-'); // Ignore time part
                if (parts.length === 3) {
                    const [year, month, day] = parts.map(Number);
                    // Vérifier que l'année est valide
                    if (year > 1900 && year < 3000 && month > 0 && month <= 12 && day > 0 && day <= 31) {
                        return new Date(year, month - 1, day);
                    }
                }
            }
            
            // Essayer le parsing par défaut
            const date = new Date(dateString);
            if (!isNaN(date.getTime()) && date.getFullYear() > 1900 && date.getFullYear() < 3000) {
                return date;
            }
            
            console.warn('Format de date non supporté:', dateString);
            return null;
        } catch (error) {
            console.warn('Erreur de parsing de date:', dateString, error);
            return null;
        }
    }

    parseDateTime(dateTimeString) {
        if (!dateTimeString) return null;
        try {
            if (dateTimeString.includes('/')) {
                // Format d/m/Y H:i
                const [datePart, timePart] = dateTimeString.split(' ');
                if (!datePart) return null;
                
                const [day, month, year] = datePart.split('/').map(Number);
                if (!day || !month || !year) return null;
                
                if (timePart) {
                    const [hours, minutes] = timePart.split(':').map(Number);
                    return new Date(year, month - 1, day, hours || 0, minutes || 0);
                }
                return new Date(year, month - 1, day);
            }
            return new Date(dateTimeString);
        } catch {
            console.warn('Erreur de parsing de date/heure:', dateTimeString);
            return null;
        }
    }

    extractTime(timeString) {
        if (!timeString) return '';
        
        try {
            // Si c'est déjà au format HH:mm
            if (/^\d{1,2}:\d{2}$/.test(timeString)) {
                const [hours, minutes] = timeString.split(':');
                return `${hours.padStart(2, '0')}:${minutes}`;
            }
            
            // Si c'est au format d/m/Y H:i
            if (timeString.includes('/') && timeString.includes(' ')) {
                const [, timePart] = timeString.split(' ');
                if (timePart && timePart.includes(':')) {
                    const [hours, minutes] = timePart.split(':');
                    return `${hours.padStart(2, '0')}:${minutes}`;
                }
            }
            
            // Si c'est au format ISO (avec T)
            if (timeString.includes('T')) {
                const timePart = timeString.split('T')[1];
                if (timePart) {
                    const [hours, minutes] = timePart.split(':');
                    return `${hours.padStart(2, '0')}:${minutes}`;
                }
            }
            
            // Fallback : prendre les 5 premiers caractères si ça ressemble à une heure
            if (timeString.length >= 5) {
                return timeString.substring(0, 5);
            }
            
            return timeString;
        } catch {
            console.warn('Erreur d\'extraction de l\'heure:', timeString);
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

    // Méthode de diagnostic temporaire
    diagnoseRecurringIssues() {
        console.log('🔬 === DIAGNOSTIC DES ÉLÉMENTS RÉCURRENTS ===');
        
        console.log('📊 Données brutes:', {
            allRecurringSchedules: this.allRecurringSchedules.length,
            filteredRecurring: this.filteredItems.filter(i => i.itemType === 'recurring').length
        });
        
        // Tester quelques dates spécifiques
        const testDates = [
            new Date(), // Aujourd'hui
            new Date(Date.now() + 24 * 60 * 60 * 1000), // Demain
            new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Après-demain
        ];
        
        testDates.forEach(date => {
            console.log(`\n📅 Test pour ${date.toDateString()} (${this.dayNames[date.getDay()]}):`);
            
            this.filteredItems.filter(i => i.itemType === 'recurring').forEach(schedule => {
                const isOnDate = this.isRecurringOnDate(schedule, date);
                console.log(`  - ${schedule.title || schedule.id}: ${isOnDate ? '✅' : '❌'} (${schedule.day_of_week})`);
            });
            
            const items = this.getItemsForDate(date);
            console.log(`  → Résultat final: ${items.length} item(s)`);
        });
        
        // Vérifier si le calendrier affiche ces jours
        const calendarGrid = this.elements.calendarGrid;
        if (calendarGrid) {
            const days = calendarGrid.querySelectorAll('.day:not(.adjacent)');
            console.log(`📋 Jours visibles dans le calendrier: ${days.length}`);
            days.forEach((day, index) => {
                const hasItems = day.classList.contains('has-items');
                const dayNumber = day.querySelector('.day-number')?.textContent;
                if (hasItems) {
                    console.log(`  Jour ${dayNumber}: a des événements`);
                }
            });
        }
    }

    // Test temporaire pour diagnostiquer le problème
    testMondaySchedules() {
        console.log('🧪 === TEST SPÉCIFIQUE DES LUNDIS ===');
        
        if (this.allRecurringSchedules.length === 0) {
            console.log('❌ Aucun horaire récurrent trouvé');
            return;
        }
        
        const mondaySchedule = this.allRecurringSchedules.find(s => s.day_of_week === 'Lundi');
        if (!mondaySchedule) {
            console.log('❌ Aucun horaire récurrent pour lundi trouvé');
            return;
        }
        
        console.log('📋 Horaire du lundi trouvé:', mondaySchedule);
        
        // Tester les prochains lundis
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const testDate = new Date(today);
            testDate.setDate(today.getDate() + (7 * i));
            
            // Trouver le prochain lundi
            while (testDate.getDay() !== 1) { // 1 = lundi
                testDate.setDate(testDate.getDate() + 1);
            }
            
            const shouldShow = this.isRecurringOnDate(mondaySchedule, testDate);
            console.log(`📅 Lundi ${testDate.toDateString()}: ${shouldShow ? '✅ DOIT APPARAÎTRE' : '❌ NE DOIT PAS APPARAÎTRE'}`);
        }
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
