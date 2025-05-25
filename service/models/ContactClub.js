export class ContactClub {
  constructor({ phoneNumber, mail, address, facebook, instagram }) {
    this.telephone = phoneNumber;
    this.email = mail;
    this.facebook = facebook;
    this.instagram = instagram;
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
}   