
/**
 * @class
 */
export class Picture {
    /**
     * @param {string} id - The unique identifier of the picture.
     * @param {string} description - The description of the picture.
     * @param {Object} gallery - The gallery object containing id and theme.
     * @param {string} images
     * @param {string} createdAt - The creation date of the picture.
     * @param {string} updatedAt - The last update date of the picture.
     */
    constructor({ id, description, gallery, images, created_at, updated_at }) {
        this.id = id;
        this.description = description;
        this.gallery = gallery;
        this.image = Array.isArray(images) ? images[0] : images; // Assuming images is an array, we take the first image
        this.createdAt = created_at;
        this.updatedAt = updated_at;
    }
    static fromApi(data) {
        if (Array.isArray(data)) {
            return data.map(item => Picture.fromApi(item));
        }
        return new Picture(data);
    }
}

/**
 * @class
 */
export class  PictureRequest {
    /**
     * @param {string} description - The description of the picture.
     * @param {id} gallery_id - The unique identifier of the gallery.
     * @param {string[]} images - An array  of only one image encoded in base64 format
     * */
    constructor(description, gallery_id, images) {
        this.description = description;
        this.gallery_id = gallery_id;
        this.images = images;
    }
    toJson() {
        return {
            description: this.description,
            gallery_id: this.gallery_id,
            images: this.images
        };
    }
}