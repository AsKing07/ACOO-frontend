
export class SocialMedias {
  /**
   * @param {{id: number, platform: string, url: string, iconUrl: string, image: string}} data
   */
  constructor({id, platform, url, iconUrl, image}) {
    this.id = id;
    this.platform = platform;
    this.url = url;
    this.iconUrl = iconUrl;
    this.image = image;
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