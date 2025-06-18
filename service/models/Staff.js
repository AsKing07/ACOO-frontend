// [
//   {
//     "id": 0,
//     "name": "John Doe",
//     "role": "Entraîneur principal",
//     "phoneNumber": "+33612345678",
//     "mail": "john.doe@example.com",
//     "image": [
//       "data:image/jpeg;base64,..."
//     ],
//     "team": [
// null
//     ]
//   }
// ]


/**
 * @class
 * Represents a staff member.
 */
export class Staff {
  /**
    * @param {{id: number, name: string, role: string, phoneNumber: string, mail: string, image: string[], team: number[]}} data
    * 
    */
    constructor({ id, name, role, phoneNumber, mail, image, team }) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.mail = mail;
    this.image = image; // Return only one image url, assuming the first one is the main image
    this.team = team;
  }
    static fromApi(data) {
    if (Array.isArray(data)) {
        return data.map(item => new Staff(item));
    } else {
        return new Staff(data);
    }
  }
}


/** * @class
 * Represents a staff member request.
 * */
export class StaffRequest {
    /**
     * @param {string} name
     * @param {string} role
     * @param {string} phoneNumber
     * @param {string} mail
     * @param {string} image
     * @param {number[]} team
     */
    constructor(name, role, phoneNumber, mail, images, team) {
        this.name = name;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.mail = mail;
        this.images = images; // Assuming images is an array of base64 strings
        this.team = team;
    }

    toJSON() {
        return {
            name: this.name,
            role: this.role,
            phoneNumber: this.phoneNumber,
            mail: this.mail,
            images: this.images,
            team: this.team
        };
    }
}