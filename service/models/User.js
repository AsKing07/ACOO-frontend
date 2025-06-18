

/**
 * @class
 */
export class User {
    /**
     * @param {{id:string,  username: string, email: string, role: string[], phone: string, address: string tokenData: { expires_at: string, token: string } }} data
     */
    constructor({id, username, email, roles, tokenData, phone, address }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.tokenData = tokenData;
        this.isAdmin = roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_SUPER_ADMIN');
        this.phone = phone || 'Non renseigné';
        this.address = address || 'Non renseigné';

        // Assurez-vous que les rôles sont toujours un tableau
        if (!Array.isArray(this.roles)) {
            this.roles = [];
        }
    }
    static fromApi(data) {
        // Si l'API retourne un tableau, prends le premier élément
        if (Array.isArray(data)) {
            return new User(data[0]);
        }
        return new User(data);
    }


    static getCurrentUser() {
        const userData = localStorage.getItem('user');
        console.log('Récupération de l\'utilisateur courant depuis localStorage:', userData);
        if (userData) {
            try {
                const parsedData = JSON.parse(userData);
                return User.fromApi(parsedData);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur courant:', error);
                return null;
            }
        }
        return null;
    }

    isTokenValid() {
        if (!this.tokenData) {
            return false;
        }
        const now = new Date();
        const expiresAt = new Date(this.tokenData.expires_at*1000);
        // console.log(`Vérification de la validité du token: maintenant=${now}, expiration=${expiresAt}`);
        return now < expiresAt;
    }
   

}


/**
 * @class
 */
export class UserRequest {
    /**
     * @param {string} username
     * @param {string} email
     * @param {string} password
     * @param {string} [phone]
     * @param {string} [address]
     */
    constructor(username, email, password, phone, address) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
    }
    toJSON() {
        const json = {
            username: this.username,
            email: this.email,
            password: this.password
        };
        if (this.phone !== undefined) json.phone = this.phone;
        if (this.address !== undefined) json.address = this.address;
        return json;
    }
}