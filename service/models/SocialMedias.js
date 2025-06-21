
export class SocialMedias {
  /**
   * @param {{id: number, platform: string, url: string, iconUrl: string, image: string}} data
   */
  constructor({id, platform, url, iconUrl, images}) {
    this.id = id;
    this.platform = platform;
    this.url = url;
    this.iconUrl = iconUrl;
    this.image = images ?(Array.isArray(images) ? images[0] : images) : null; // Assuming images is an array and we take the first one
  }
    static fromApi(data) {
    if (Array.isArray(data)) {
      return data.map(item => new SocialMedias(item));
    }
    return new SocialMedias(data);
  }
}

/**
 * @class
 */
export class SocialMediaRequest {
  /**
   * @param {string} platform
   * @param {string} url
   * @param {string} iconUrl
   * @param {File} image
   */
  constructor(platform, url, iconUrl, image) {
    this.platform = platform;
    this.url = url;
    this.iconUrl = iconUrl;
    this.image = image;
  }
    toJSON() {
    return {
      platform: this.platform,
      url: this.url,
      iconUrl: this.iconUrl,
      image: this.image
    };
  }
}