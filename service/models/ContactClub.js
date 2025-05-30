/**
 * @class
 */
export class ContactClub {
  /**
   * @param {{phoneNumber: string, mail: string}} data
   */
  constructor({id, phoneNumber, mail, address}) {
    this.id = id;
    this.telephone = phoneNumber;
    this.email = mail;
    this.adresse = address;
  }

 
  getFormattedPhone() {
    // Formatage simple, à adapter selon besoin
    return this.telephone.replace(/(\d{2})(?=\d)/g, '$1 ');
  }

static fromApi(data) {
    // Si l'API retourne un tableau, prends le premier élément
    if (Array.isArray(data)) {
      return new ContactClub(data[0]);
    }
    return new ContactClub(data);
  }
};

/**
 * @class
 */
export class contactClubRequest
{
  /**
   * @param {string} phoneNumber
   * @param {string} mail
   * @param {string} address
   */
  constructor(phoneNumber, mail, address) {
    this.telephone = phoneNumber;
    this.email = mail;
    this.adresse = adress;
  }
  toJSON() {
    return {
      phoneNumber: this.telephone,
      mail: this.email,
      facebook: this.facebook,
      instagram: this.instagram,
      address: this.adresse
    };
  }
}