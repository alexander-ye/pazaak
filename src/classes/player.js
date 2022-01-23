import Card from "./card";
import Deck from "./deck";

// TODO: SIDEDECK RANDOMIZES AND RERENDERS EVERY TIME!
export default class Player {
  constructor(id, name, score, cardSum, sideDeck) {
    this.id = id;
    this.name = name;
    this.score = score;
    this.cardSum = cardSum;
    this.sideDeck = sideDeck;
    this.hand = sideDeck;
    this.cardsPlayed = [0, 0, 0, 0, 0, 0, 0, 0, 0].flatMap((i) => [
      new Card(0, null, false, "cardSlot", null),
    ]);
    this.numCardsPlayed = 0;
    this.standing = false;
    this.bust = false;
    this.winRound = false;
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
  reset() {
    this.score = 0;
    this.cardSum = 0;
    this.sideDeck = [];
    this.hand = [];
    this.standing = false;
    this.bust = false;
    this.winRound = false;
  }
  roundReset() {
    this.cardSum = 0;
  }
  generateSideDeck() {
    let out = [1, 2, 3, 4, 5, 6].flatMap((i) => [
      // Plus cards
      new Card(i, "plus", false, "sideDeck", null),
      // Minus cards
      new Card(-i, "minus", false, "sideDeck", null),
      // Plus-minus cards
      new Card(i, "plus", true, "sideDeck", null),
    ]);
    // Tiebreaker card
    out.push(new Card(1, "plus", true, "sideDeck", "tieBreaker"));
    this.sideDeck = new Deck(out);
  }
  generateHand() {
    this.sideDeck.shuffleCards();
    const out = this.sideDeck.cards.slice(0, 4);
    this.hand = out;
  }

  clone() {
    const out = new Player(
      this.id,
      this.name,
      this.score,
      this.cardSum,
      this.sideDeck
    );
    out.hand = this.hand;
    out.cardsPlayed = this.cardsPlayed;
    out.standing = this.standing;
    out.bust = this.bust;
    out.winRound = this.winRound;
    return out;
  }
}
