


export class Sport {
  /**
   * @param {{id: number, name: string, description: string, contact: string, image: string[] }} data
   */
  constructor({ id, name, description, contact, images }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.contact = contact;
    this.images = images; // Return an array of image URLs, assuming the first one is the main image
  }
    static fromApi(data) {
    if (Array.isArray(data)) {
        return data.map(item => new Sport(item));
    }
    return new Sport(data);
  }
}


/** * @class
 * Represents a sport request.
 */export class SportRequest {
    /**
     * Creates an instance of SportRequest.
     * @param {string} name - The name of the sport.
     * @param {string} description - The description of the sport.
     * @param {string} contact - The contact information for the sport.
     * @param {string[]} images - The images encoded in base64 format.
     */
    constructor(name, description, contact, images) {
        this.name = name;
        this.description = description;
        this.contact = contact;
        this.images = images;
    } 
    
    toJson() {
        return {
            name: this.name,
            description: this.description,
            contact: this.contact,
            images: this.images
        };
    }
}


    