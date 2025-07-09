/**
 * @class
 * Represents a message in the messaging system.
 */
export class Messagerie {
    /**
     * @param {{id: number, name: string, mail: string, subject: string, description: string, created_at: string}} data
     */
    constructor({ id, name, mail, subject, description, created_at }) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.subject = subject;
        this.description = description;
        this.createdAt = created_at;
    }
    static fromApi(data) {
        if (Array.isArray(data)) {
            return data.map(item => new Messagerie(item));
        } else {
            return new Messagerie(data);
        }
    }
}

/** * @class
 * Represents a message request in the messaging system.
 */
export class MessagerieRequest {
    /**
     * @param {string} name
     * @param {string} mail
     * @param {string} subject
     * @param {string} description
     */
    constructor(name, mail, subject, description) {
        this.name = name;
        this.mail = mail;
        this.subject = subject;
        this.description = description;
    }
    toJSON() {
        return {
            name: this.name,
            mail: this.mail,
            subject: this.subject,
            description: this.description
        };
    }
}