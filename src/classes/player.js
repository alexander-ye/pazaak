export default class Player {
  constructor(name, score, cardSum) {
    this.name = name;
    this.score = score;
    this.cardSum = cardSum;
  }
  getScore() {
    return this.score;
  }
  getCardSum() {
    return this.cardSum;
  }
  setScore(i) {
    this.score = i;
  }
  setCardSum(m) {
    this.cardSum = m;
  }
  gameReset() {
    this.score = 0;
    this.cardSum = 0;
  }
  roundReset() {
    this.cardSum = 0;
  }
}
