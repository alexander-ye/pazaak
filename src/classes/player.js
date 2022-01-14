class Player {
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
}

const out = {
  Player,
};

export default out;
