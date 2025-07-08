/**
 * @class
 * Represents a schedule exception.
 */
export class ScheduleException {
    /**
     * @param {Object} data - Schedule exception data from API
     * @param {number} data.id - The unique identifier of the exception
     * @param {string} data.recurring_schedule - The recurring schedule ID
     * @param {string} data.date - The exception date
     * @param {string} data.startTime - Start time (JJ/MM/AAAA HH:mm)
     * @param {string} data.endTime - End time (JJ/MM/AAAA HH:mm)
     * @param {string} data.location - The location (if different)
     * @param {boolean} data.is_cancelled - Whether the occurrence is cancelled
     * @param {string} data.reason - Reason for the exception
     * @param {string} data.createdAt - Creation date
     * @param {string} data.updatedAt - Update date
     */
    constructor({ id, recurring_schedule, date, startTime, endTime, location, is_cancelled, reason, createdAt, updatedAt }) {
        this.id = id;
        this.recurring_schedule = recurring_schedule;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.is_cancelled = is_cancelled || false;
        this.reason = reason;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromApi(data) {
        if (Array.isArray(data)) {
            return data.map(item => new ScheduleException(item));
        }
        return new ScheduleException(data);
    }

    // Méthode pour obtenir la date de l'exception
    getExceptionDate() {
        return new Date(this.date);
    }

    // Méthode pour formater la date
    getFormattedDate() {
        return this.getExceptionDate().toLocaleDateString('fr-FR');
    }

    // Méthode pour formater l'heure de début
    getFormattedStartTime() {
        return this.startTime ? this.startTime.substring(0, 5) : '';
    }

    // Méthode pour formater l'heure de fin
    getFormattedEndTime() {
        return this.endTime ? this.endTime.substring(0, 5) : '';
    }

    // Vérifie si cette exception correspond à une date donnée
    matchesDate(date) {
        const exceptionDate = this.getExceptionDate();
        return exceptionDate.toDateString() === date.toDateString();
    }

    // Applique l'exception à un événement récurrent
    applyToRecurringEvent(recurringEvent) {
        if (this.is_cancelled) {
            return null; // L'événement est annulé
        }

        // Modifier l'événement avec les données de l'exception
        const modifiedEvent = { ...recurringEvent };
        
        if (this.startTime) {
            const exceptionDate = this.getExceptionDate();
            const [hours, minutes] = this.startTime.split(':').map(Number);
            exceptionDate.setHours(hours, minutes, 0, 0);
            modifiedEvent.startDatetime = this.formatDateTimeForAPI(exceptionDate);
        }
        
        if (this.endTime) {
            const exceptionDate = this.getExceptionDate();
            const [hours, minutes] = this.endTime.split(':').map(Number);
            exceptionDate.setHours(hours, minutes, 0, 0);
            modifiedEvent.endDatetime = this.formatDateTimeForAPI(exceptionDate);
        }
        
        if (this.location) {
            modifiedEvent.location = this.location;
        }

        if (this.reason) {
            modifiedEvent.content = `${modifiedEvent.content || ''}\n\nModification: ${this.reason}`.trim();
        }

        modifiedEvent.hasException = true;
        modifiedEvent.exceptionId = this.id;

        return modifiedEvent;
    }

    formatDateTimeForAPI(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    toJSON() {
        return {
            id: this.id,
            recurring_schedule: this.recurring_schedule,
            date: this.date,
            startTime: this.startTime,
            endTime: this.endTime,
            location: this.location,
            is_cancelled: this.is_cancelled,
            reason: this.reason,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

/**
 * @class
 * Represents a schedule exception request for API calls.
 */
export class ScheduleExceptionRequest {
    constructor(recurring_schedule, date, startTime, endTime, location, is_cancelled, reason) {
        this.recurring_schedule = recurring_schedule;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.is_cancelled = is_cancelled || false;
        this.reason = reason;
    }

    toJSON() {
        return {
            recurring_schedule: this.recurring_schedule,
            exeption_date: this.date,
            start_time: this.startTime,
            end_time: this.endTime,
            location: this.location,
            is_cancelled: this.is_cancelled,
            reason: this.reason
        };
    }
}
