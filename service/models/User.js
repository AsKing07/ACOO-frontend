
/**
 * @class
 */
export class User {
    /**
     * @param {{ username: string, email: string, roles: string[], token: string }} data
    */
    constructor({ username, email, roles, token }) {
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.token = token;

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
    get isAdmin() {
        // Vérifie si l'utilisateur a le rôle 'ROLE_ADMIN'
        return this.roles.includes('ROLE_ADMIN');
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
   

}