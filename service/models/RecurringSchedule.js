/**
 * @class
 * Represents a recurring schedule.
 */
export class RecurringSchedule {
    /**
     * @param {Object} data - Recurring schedule data from API
     * @param {number} data.id - The unique identifier of the recurring schedule
     * @param {string} data.sport - The sport ID
     * @param {string} data.team - The team ID
     * @param {string} data.title - The title of the recurring schedule
     * @param {string} data.description - The description
     * @param {string} data.location - The location
     * @param {string} data.start_time - Start time (JJ/MM/AAAA HH:mm) (first day and next times)
     * @param {number} data.duration - Duration in minutes
     * @param {string} data.frequency - Frequency (weekly, monthly, etc.)
     * @param {string} data.end_date - End date
     * @param {string} data.day_of_week - Day of the week
     * @param {string} data.created_at - Creation date
     * @param {string} data.updated_at - Update date
     */
    constructor({ id, sport, team, title, description, location, start_time, duration, frequency, end_date, day_of_week, created_at, updated_at }) {
        this.id = id;
        this.sport = sport;
        this.team = team;
        this.title = title;
        this.description = description;
        this.location = location;
        this.start_time = start_time;
        this.duration = duration || 0;
        this.frequency = frequency;
        this.end_date = end_date;
        this.day_of_week = day_of_week;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static fromApi(data) {
        if (Array.isArray(data)) {
            return data.map(item => new RecurringSchedule(item));
        }
        return new RecurringSchedule(data);
    }

    // Méthode pour obtenir l'heure de début formatée
    getFormattedStartTime() {
        return this.start_time;
    }

    // Méthode pour calculer l'heure de fin
    getEndTime() {
        if (!this.start_time || !this.duration) return null;
        
        const [hours, minutes] = this.start_time.split(':').map(Number);
        const startMinutes = hours * 60 + minutes;
        const endMinutes = startMinutes + this.duration;
        
        const endHours = Math.floor(endMinutes / 60);
        const endMins = endMinutes % 60;
        
        return `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}:00`;
    }

    // Méthode pour obtenir l'heure de fin formatée
    getFormattedEndTime() {
        const endTime = this.getEndTime();
        return endTime ? endTime.substring(0, 5) : '';
    }

   

    // Méthode pour obtenir un résumé formaté de l'horaire récurrent
    getFormattedSchedule() {
        const startTime = this.start_time || '00:00';
        const endTime = this.getFormattedEndTime() || '00:00';
        const day = this.day_of_week || 'Non défini';
        const duration = this.duration ? `${this.duration}min` : '';
        
        return `${day} ${startTime}-${endTime} ${duration ? `(${duration})` : ''}`.trim();
    }

    // Méthode pour obtenir la couleur selon le jour de la semaine
    getDayColor() {
        const colorMap = {
            'Lundi': '#007bff',
            'Mardi': '#28a745',
            'Mercredi': '#ffc107',
            'Jeudi': '#dc3545',
            'Vendredi': '#6f42c1',
            'Samedi': '#17a2b8',
            'Dimanche': '#6c757d'
        };
        return colorMap[this.day_of_week] || '#6c757d';
    }

    // Générer les instances d'événements pour une période donnée
    generateEventsForPeriod(startDate, endDate) {
        const events = [];
        const dayOfWeekMap = {
            'Dimanche': 0,
            'Lundi': 1,
            'Mardi': 2,
            'Mercredi': 3,
            'Jeudi': 4,
            'Vendredi': 5,
            'Samedi': 6
        };

        const targetDay = dayOfWeekMap[this.day_of_week];
        if (targetDay === undefined) return events;

        let currentDate = new Date(startDate);
        
        // Trouver le premier jour correspondant
        while (currentDate.getDay() !== targetDay && currentDate <= endDate) {
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Générer les événements pour chaque occurrence
        while (currentDate <= endDate) {
            const eventDate = new Date(currentDate);
            const [hours, minutes] = this.start_time.split(':').map(Number);
            
            eventDate.setHours(hours, minutes, 0, 0);
            
            const endEventDate = new Date(eventDate);
            endEventDate.setMinutes(endEventDate.getMinutes() + this.duration);

            events.push({
                id: `recurring_${this.id}_${eventDate.getTime()}`,
                title: this.title,
                content: this.description,
                eventType: 'Entraînement récurrent',
                location: this.location,
                isCancelled: false,
                startDatetime: this.formatDateTimeForAPI(eventDate),
                endDatetime: this.formatDateTimeForAPI(endEventDate),
                sport: this.sport,
                teams: this.team ? [this.team] : [],
                images: [],
                isRecurring: true,
                recurringScheduleId: this.id
            });

            // Passer au prochain occurrence (1 semaine plus tard)
            currentDate.setDate(currentDate.getDate() + 7);
        }

        return events;
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
            sport: this.sport,
            team: this.team,
            title: this.title,
            description: this.description,
            location: this.location,
            start_time: this.start_time,
            duration: this.duration,
            frequency: this.frequency,
            end_date: this.end_date,
            day_of_week: this.day_of_week,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

/**
 * @class
 * Represents a recurring schedule request for API calls.
 */
export class RecurringScheduleRequest {
    constructor(sport, team, title, description, location, start_time, duration, frequency, end_date, day_of_week) {
        this.sport = sport;
        this.team = team;
        this.title = title;
        this.description = description;
        this.location = location;
        this.start_time = start_time;
        this.duration = duration;
        this.frequency = frequency;
        this.end_date = end_date;
        this.day_of_week = day_of_week;
    }

    toJSON() {
        return {
            sport: this.sport,
            team: this.team,
            title: this.title,
            description: this.description,
            location: this.location,
            start_time: this.start_time,
            duration: this.duration,
            frequency: this.frequency,
            end_date: this.end_date,
            day_of_week: this.day_of_week
        };
    }
}
