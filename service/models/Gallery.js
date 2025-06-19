

import { Picture } from "./Pictures.js";
/**
 * @class
 * Represents a gallery.
 */
export class Gallery {
    /**
     * @param {string} id - The unique identifier of the gallery.
     * @param {string} theme - The theme of the gallery.
     * @param {Array} pictures - An array of Picture objects in the gallery.
     */
    constructor({ id, theme, pictures }) {
        this.id = id;
        this.theme = theme;
        this.pictures = pictures ? pictures.map(picture => Picture.fromApi(picture)) : [];
    }

    static fromApi(data) {
        if (Array.isArray(data)) {
            return data.map(item => new Gallery(item));
        }
        return new Gallery(data);
    }

    // Méthode utilitaire pour obtenir le nombre d'images
    getPictureCount() {
        return this.pictures ? this.pictures.length : 0;
    }

    // Méthode pour obtenir l'image de couverture (première image)
    getCoverImage() {
        return this.pictures && this.pictures.length > 0 ? this.pictures[0].image : null;
    }

    // Méthode toJSON pour cohérence
    toJSON() {
        return {
            id: this.id,
            theme: this.theme,
            pictures: this.pictures
        };
    }
}

/**
 * @class
 */
export class GalleryRequest {
    /**
     * @param {string} theme - The theme of the gallery.
     */
    constructor(theme) {
        this.theme = theme;
    }
    toJson() {
        return {
            theme: this.theme
        };
    }
}