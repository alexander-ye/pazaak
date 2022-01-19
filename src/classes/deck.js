export default class Deck {
  constructor(cards) {
    this.cards = cards;
    this.size = cards.length;
    this.remainingCards = cards;
    this.playedCards = [];
  }
  getSize() {
    return this.size;
  }
  shuffleCards() {
    // Fisher-Yates (aka Knuth) Shuffle
    const deckCopy = [...this.cards];
    let currentIndex = this.size;
    randomIndex;

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
}
