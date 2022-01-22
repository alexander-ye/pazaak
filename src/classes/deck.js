export default class Deck {
  constructor(cards) {
    this.cards = cards;
    this.size = cards.length;
    this.remainingCards = cards;
    this.playedCards = [];
  }
  getCards() {
    return this.cards;
  }
  getSize() {
    return this.size;
  }

  playNextCard() {
    const cardToPlay = this.cards.pop();
    this.size = this.cards.length;
    this.playedCards = [...this.playedCards, cardToPlay];
    return cardToPlay;
  }
  shuffleCards() {
    // Fisher-Yates (aka Knuth) Shuffle
    const deckCopy = [...this.cards];
    let currentIndex = this.size;
    let randomIndex;

    // While elements exist to shuffle
    while (currentIndex != 0) {
      // Pick remaining element by random
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap with current element
      [deckCopy[currentIndex], deckCopy[randomIndex]] = [
        deckCopy[randomIndex],
        deckCopy[currentIndex],
      ];
    }
    this.cards = deckCopy;
  }

  clone() {
    const out = new Deck(this.cards);
    out.remainingCards = this.remainingCards;
    out.playedCards = this.playedCards;
    return out;
  }
}
