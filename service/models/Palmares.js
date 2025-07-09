/**
 * @class
 */
export class Palmares {
  /**
   * @param {{id: number, athleteName: string, competition: string, category: string, sport: string, gender: string, result: string, year: number, image: string, createdAt: string, updatedAt: string}[]} data
   */
    constructor({ id, athleteName, competition, category, sport, gender, result, year, createdAt, updatedAt, images }) {
    this.id = id;
    this.athleteName = athleteName;
    this.competition = competition;
    this.category = category;
    this.sport = sport
    this.gender = gender;
    this.result = result;
    this.year = year;
    this.image = images[0]; // L'url de l'image principale
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.images = images; // Tableau des urls des images
  }
    static fromApi(data) {
    if (Array.isArray(data)) {
      return data.map(item => new Palmares(item));
    }
    return new Palmares(data);
  }
}

/**
 * @class
 */
export class PalmaresRequest {
  /**
   * @param {string} athleteName
   * @param {string} competition
   * @param {string} category
   * @param {string} sport
   * @param {string} gender
   * @param {string} result
   * @param {number} year
   * @param {string[]} images // tableau des images en base64
   */
  constructor(athleteName, competition, category, sport, gender, result, year, images) {
    this.athleteName = athleteName;
    this.competition = competition;
    this.category = category;
    this.sport = sport;
    this.gender = gender;
    this.result = result;
    this.year = year;
    this.images = images;
  }
    toJSON() {
    return {
        athleteName: this.athleteName,
        competition: this.competition, 
        category: this.category,
        sport: this.sport,
        gender: this.gender,
        result: this.result,
        year: this.year,
        images: this.images,
    };
  }
}
   



