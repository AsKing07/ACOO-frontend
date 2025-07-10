/**
 * @class
 */
export class Teams {
    /**
     * @param {{id: number, sport: object, name: string, events: Array<string>, recurringSchedules: Array<string>, role: string, images: Array<string>}} data
     */
    constructor(data) {
        this.id = data.id;
   
        this.sport = data.sport; // Ajout du sport complet
        this.name = data.name;
        this.eventsIds = data.events || [];
        this.recurringSchedulesIds = data.recurringSchedules || [];
        this.role = data.role;
        this.images = data.images || []; // Ajout du champ images
    }

    static fromApi(data) {
        if (Array.isArray(data)) {
            return data.map(item => new Teams(item));
        }
        return new Teams(data);
    }

    // Ajout de la méthode toJSON pour la cohérence
    toJSON() {
        return {
            id: this.id,
            sport: this.sportId,
            name: this.name,
            events: this.eventsIds,
            recurringSchedules: this.recurringSchedulesIds,
            role: this.role,
            images: this.images
        };
    }
}

export class TeamsRequest {
    /**
     * @param {string} sport //sport id
     * @param {string} name //team name
     * @param {string} role //team role/description
     * @param {Array<string>} images //team images in base64 format 
     */
    constructor(sport, name, role, images = []) {
        this.sport = sport;
        this.name = name;
        this.role = role;
        this.images = images;
    }

    toJSON() {
        return {
            sport: this.sport,
            name: this.name,
            role: this.role,
            images: this.images
        };
    }
}
