/**
 * @class
 */
export class Faq {
  /**
   * @param {{question: string, answer: string, category: string}} data
   */
  constructor({ id,question, answer, category }){
    this.id = id; 
    this.question = question;
    this.answer = answer;
    this.category = category;

  }

  static fromApi(data) {
    // Si l'API retourne un tableau, prends le premier élément
    if (Array.isArray(data)) {
        return data.map(item => new Faq(item));
        }
    return new Faq(data);
  }
}
      



   