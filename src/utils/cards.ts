import { card } from "../types";

/**
 * Fisher-Yates (Knuth) Shuffle
 */
export const shuffleCards = (cardsToShuffle: card[]) : card[] => {
    // Fisher-Yates (aka Knuth) Shuffle
    const out = [...cardsToShuffle];
    let currentIndex = cardsToShuffle.length;
    let randomIndex;
  
    // While elements exist to shuffle
    while (currentIndex !== 0) {
      // Pick remaining element by random
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // Swap with current element
      [out[currentIndex], out[randomIndex]] = [
        out[randomIndex],
        out[currentIndex],
      ];
    }
    return out
  }
  
  /**
   * Main Deck cards from values
   */
  export const createMainDeckCardFromValue = (i: number) : card => {
    return {
      sign: 'PLUS',
      value: i,
      type: 'NORMAL'
    }
  }

/**
 * Create main deck
 */
export const createMainDeck = () : card[] => {
  return new Array(10)
      .fill(0)
      .flatMap((_, i) => {
        const card: card = createMainDeckCardFromValue(i + 1)
        return [card, card, card, card]
  });
}