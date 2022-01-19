import Card from "./card";

export default class Player {
  constructor(id, name, score, cardSum, sideDeck) {
    this.id = id;
    this.name = name;
    this.score = score;
    this.cardSum = cardSum;
    this.sideDeck = sideDeck;
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
  generateSideDeck() {
    let out = [1, 2, 3, 4, 5, 6].flatMap((i) => [i, -i]);
    // Normal positive and negative 1-6 cards
    out.map(
      (i) => new Card(i, i < 0 ? "minus" : "plus", false, "sideDeck", null)
    );
    // Tiebreaker card
    out.push(new Card(1, "plus", true, "sideDeck", "tieBreaker"));
    // +/- 1-6 cards
    out.push(
      [1, 2, 3, 4, 5, 6].map((i) => new Card(i, "plus", true, "sideDeck", null))
    );
    this.sideDeck = out;
  }
  generateHand(sideDeck) {
    let out = [...sideDeck];
    out.shuffleCards();
    out = out.slice(0, 4);
    this.hand = out;
  }
}
