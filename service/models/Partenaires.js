//   'id' => $partner->getId(),
//                 'name' => $partner->getName(),
//                 'description' => $partner->getDescription(),
//                 'url' => $partner->getUrl(),
//                 'sponsor' => $partner->isSponsor(),
//                 'image' => $imageUrl,
//                 'created_at'
//                 'updated_at' => $partner->getUpdatedAt()->format('Y-m-d H:i:s'), 



/**
 * @class
 */
export class Partenaire {
    /**
     * @param {string} id - The unique identifier of the partner.
     * @param {string} name - The name of the partner.
     * @param {string} description - The description of the partner.
     * @param {string} url - The URL of the partner's website.
     * @param {boolean} sponsor - Indicates if the partner is a sponsor.
     * @param {string} image - The URL of the partner's image
     * @param {string} createdAt - The creation date of the partner.
     * @param {string} updatedAt - The last update date of the partner.
     */
    constructor({ id, name, description, url, sponsor, image, created_at, updated_at }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.sponsor = sponsor;
        this.image = image;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static fromApi(data) {
        if (Array.isArray(data)) {
            return data.map(item => new Partenaire(item));
        }
        return new Partenaire(data);
    }

       // Méthode utilitaire pour obtenir le type d'affichage
    getPartnerType() {
        return this.sponsor ? 'Sponsor' : 'Partenaire';
    }

    // Méthode pour obtenir l'année de création
    getCreationYear() {
        return this.created_at ? new Date(this.created_at).getFullYear() : 'N/A';
    }
}

/**
 * @class
 * Represents a partner request.
 */
export class PartnerRequest {
    /**
     * @param {string} name - The name of the request.
     * @param {string} description - The description of the request.
     * @param {string} url - The URL of the request.
     * @param {boolean} sponsor - Indicates if the request is a sponsor.
     * @param {string[]} image - An array of only one image in base64 format.
        */
    constructor(name, description, url, sponsor, image) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.sponsor = sponsor;
        this.images = image; // Assuming image is an array with one base64 encoded image
    }
    toJson() {
        return {
            name: this.name,
            description: this.description,
            url: this.url,
            sponsor: this.sponsor,
            images: this.images // Assuming image is an array with one base64 encoded image
        };
    }
}