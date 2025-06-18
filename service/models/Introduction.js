/**
 * @class
 */
export class Introduction {
  /**
   * @param {{id: number, title: string, image: string[], description: string}} data
   */
  constructor({id, title, image, description}) { 
    this.id = id;
    this.title = title;
    this.image = image;  
    this.description = description;
  }

  static fromApi(data) {
    if (Array.isArray(data)) {
      return data.map(item => new Introduction(item));
    } else {
      return new Introduction(data);
    }
  }
}

/**
 * @class
 */
export class IntroductionRequest {
  /**
   * @param {string} title
   * @param {string[]} images
   * @param {string} description
   */
  constructor(title, images, description) {
    this.title = title;
    this.images = images;
    this.description = description;
  }

  toJSON() {
    return {
      title: this.title,
      images: this.images,
      description: this.description,
    };
  }
}
