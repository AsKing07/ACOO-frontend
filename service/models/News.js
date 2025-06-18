// 'id' => $item->getId(),
//                 'title' => $item->getTitle(),
//                 'content' => $item->getContent(),
//                 'image' => $imageUrl,
//                 'event' => $item->getEvent() ? '/events/' . $item->getEvent()->getId() : null,
//                 'created_at' => $item->getCreatedAt(),
//                 'updated_at' => $item->getUpdatedAt(),
//                 'id_admin' => $item->getIdAdmin() ? '/admin/' . $item->getIdAdmin()->getId() : null
/**
 * @class
 * Represents a news article.
 */
export class News {
    /**
     * @param {{id: number, title: string, content: string, image: string, event: string|null, created_at: string, updated_at: string, id_admin: string|null}} data
     */
    constructor({ id, title, content, image, event, created_at, updated_at, id_admin }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.image = image; // Assuming image is a URL string
        this.eventId = event; //This should be the ID of the event, or null if no event is associated
        this.createdAt = created_at; // Assuming this is a date string
        this.updatedAt = updated_at; // Assuming this is a date string
        this.adminId = id_admin; // This should be the ID of the admin, or null if no admin is associated
    }
    static fromApi(data) {
        if (Array.isArray(data)) {
            return data.map(item => new News(item));
        } else {
            return new News(data);
        }
    }
}

/** * @class
 * Represents a news article request.
 */
export class NewsRequest {
    /**
     * @param {string} title
     * @param {string} content
     * @param {number|null} id_admin
     * @param {string[]} images
     */
    constructor(title, content, images, id_admin) {
        this.title = title;
        this.content = content;

        this.id_admin = id_admin; // Assuming this is the ID of the admin, or null if no admin is associated
        this.images = images; // Assuming images is an array of base64 strings or URLs
    }


    toJSON() {
        return {
            title: this.title,
            content: this.content,
            id_admin: this.id_admin,
            images: this.images // Assuming images is an array of base64 strings or URLs
        };
    }
}

