/**
 * @class
 */
export class Faq {
  /**
   * @param {{id: number, question: string, answer: string, category: string}} data
   */
  constructor({ id,question, answer, category }){
    this.id = id; 
    this.question = question;
    this.answer = answer;
    this.category = category;

  }

  static fromApi(data) {
    if (Array.isArray(data)) {
        return data.map(item => new Faq(item));
        }
    return new Faq(data);
  }
}
      
/**
 * @class
 */
export class FaqRequest {
  /**
   * @param {string} question
   * @param {string} answer
   * @param {string} category
   */
  constructor(question, answer, category) {
    this.question = question;
    this.answer = answer;
    this.category = category;
  }

  toJSON() {
    return {
      question: this.question,
      answer: this.answer,
      category: this.category,
    };
  }
}




   