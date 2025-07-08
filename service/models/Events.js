/**
 * @class
 * Represents an event.
 */
export class Event {
    /**
     * @param {Object} data - Event data from API
     * @param {number} data.id - The unique identifier of the event
     * @param {string} data.title - The title of the event
     * @param {string} data.content - The content/description of the event
     * @param {string} data.eventType - The type of event
     * @param {string} data.location - The location of the event
     * @param {boolean} data.isCancelled - Whether the event is cancelled
     * @param {string} data.startDatetime - Start date and time
     * @param {string} data.endDatetime - End date and time
     * @param {string} data.sport - Sport ID
     * @param {Array} data.teams - Array of team IDs
     * @param {Array} data.images - Array of image URLs
     * @param {boolean} data.isRecurring - Whether this is a recurring event
     * @param {number} data.recurringScheduleId - ID of the recurring schedule if applicable
     * @param {boolean} data.hasException - Whether this event has exceptions
     * @param {number} data.exceptionId - ID of the exception if applicable
     */
    constructor({ id, title, content, eventType, location, isCancelled, startDatetime, endDatetime, sport, teams, images, isRecurring, recurringScheduleId, hasException, exceptionId }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.eventType = eventType;
        this.location = location;
        this.isCancelled = isCancelled || false;
        this.startDatetime = startDatetime;
        this.endDatetime = endDatetime;
        this.sport = sport;
        this.teams = teams || [];
        this.images = images || [];
        this.isRecurring = isRecurring || false;
        this.recurringScheduleId = recurringScheduleId;
        this.hasException = hasException || false;
        this.exceptionId = exceptionId;
    }

    static fromApi(data) {
        if (Array.isArray(data)) {
            return data.map(item => new Event(item));
        }
        return new Event(data);
    }

    // Méthode utilitaire pour obtenir la date de début
    getStartDate() {
        return new Date(this.startDatetime);
    }

    // Méthode utilitaire pour obtenir la date de fin
    getEndDate() {
        return new Date(this.endDatetime);
    }

    // Méthode pour formater la date de début
    getFormattedStartDate() {
        return this.getStartDate().toLocaleDateString('fr-FR');
    }

    // Méthode pour formater l'heure de début
    getFormattedStartTime() {
        return this.getStartDate().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }

    // Méthode pour formater l'heure de fin
    getFormattedEndTime() {
        return this.getEndDate().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }

    // Méthode pour obtenir la couleur selon le type d'événement
    getEventTypeColor() {
        // Couleur spéciale pour les événements récurrents
        if (this.isRecurring) {
            return this.hasException ? '#ffc107' : '#17a2b8'; // Orange si exception, cyan sinon
        }
        
        const colorMap = {
            'Para-Aviron': '#007bff',
            'Avifit': '#6c757d',
            'Aviron Indoor': '#28a745',
            'Aviron en rivière': '#ffc107',
            'Aviron Santé et bien-être': '#6f42c1',
            'Compétition': '#dc3545',
            'Formation': '#17a2b8',
            'Entraînement récurrent': '#17a2b8'
        };
        return colorMap[this.eventType] || '#6c757d';
    }

    // Méthode pour vérifier si l'événement est modifiable
    isEditable() {
        // Les événements récurrents nécessitent une gestion spéciale
        return !this.isRecurring || this.hasException;
    }

    // Méthode pour obtenir le type d'affichage
    getDisplayType() {
        if (this.isRecurring) {
            return this.hasException ? 'Récurrent (modifié)' : 'Récurrent';
        }
        return this.eventType;
    }

    // Méthode pour obtenir l'image principale
    getMainImage() {
        return this.images && this.images.length > 0 ? this.images[0] : null;
    }

    // Méthode toJSON pour cohérence
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            eventType: this.eventType,
            location: this.location,
            isCancelled: this.isCancelled,
            startDatetime: this.startDatetime,
            endDatetime: this.endDatetime,
            sport: this.sport,
            teams: this.teams,
            images: this.images,
            isRecurring: this.isRecurring,
            recurringScheduleId: this.recurringScheduleId,
            hasException: this.hasException,
            exceptionId: this.exceptionId
        };
    }
}

/**
 * @class
 * Represents an event request for API calls.
 */
export class EventRequest {
    /**
     * @param {string} title - The title of the event
     * @param {string} content - The content/description of the event
     * @param {string} eventType - The type of event
     * @param {string} location - The location of the event
     * @param {boolean} isCancelled - Whether the event is cancelled
     * @param {string} startDatetime - Start date and time in format "DD/MM/YYYY HH:mm"
     * @param {string} endDatetime - End date and time in format "DD/MM/YYYY HH:mm"
     * @param {string} sport - Sport ID
     * @param {Array} teams - Array of team IDs
     * @param {Array} images - Array of images in base64 format
     */
    constructor(title, content, eventType, location, isCancelled, startDatetime, endDatetime, sport, teams, images) {
        this.title = title;
        this.content = content;
        this.eventType = eventType;
        this.location = location;
        this.isCancelled = isCancelled || false;
        this.startDatetime = startDatetime;
        this.endDatetime = endDatetime;
        this.sport = sport;
        this.teams = teams || [];
        this.images = images || [];
    }

    toJSON() {
        return {
            title: this.title,
            content: this.content,
            eventType: this.eventType,
            location: this.location,
            isCancelled: this.isCancelled,
            startDatetime: this.startDatetime,
            endDatetime: this.endDatetime,
            sport: this.sport,
            teams: this.teams,
            images: this.images
        };
    }
}
