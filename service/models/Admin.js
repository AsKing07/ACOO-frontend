/**
 * @class
 */
export class Admin {
    /**
     * @param {{id: string, username: string, email: string}} data
     */
    constructor({id, username, email}) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
    
    static fromApi(data) {
        if (Array.isArray(data)) {
            return data.map(item => new Admin(item));
        }
        return new Admin(data); // Correction : Admin au lieu de User
    }

    // Méthode utilitaire pour obtenir l'initiale
    getInitials() {
        console.log(`Username: ${this.username}`);
        if (typeof this.username === 'string' && this.username.length > 0) {
            return this.username.substring(0, 2).toUpperCase();
        }
        return '';
    }

    // Méthode pour vérifier si c'est l'utilisateur courant
    isCurrentUser() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        return currentUser && currentUser.id === this.id;
    }




    // Méthode toJSON pour cohérence
    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email
        };
    }
}

/**
 * @class
 */
export class AdminRequest {
    /**
     * @param {string} username
     * @param {string} email
     * @param {string} password
     */
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    
    toJSON() {
        return {
            username: this.username,
            email: this.email,
            password: this.password
        };
    }
}
