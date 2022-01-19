export default class Player {
  constructor(name, score, cardSum, hand) {
    this.name = name;
    this.score = score;
    this.cardSum = cardSum;
    this.hand = hand;
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
  generateHand(sideDeck) {
    let out = [...sideDeck];
    out.shuffleCards();
    out = out.slice(0, 4);
    this.hand = out;
  }
}
