

/**
 * @class
 */
export class Admin {
    /**
     * @param {{id:string,  username: string, email: string }} data
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
        return new User(data);
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
        const json = {
            username: this.username,
            email: this.email,
            password: this.password
        };

        return json;
    }
}