import Card from "./card";

export default class Hand {
  constructor(cards) {
    this.cards = cards;
    this.remainingCards = cards;
    this.playedCards = [];
  }
}
