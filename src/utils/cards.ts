import { card } from "../types";
  
// Local utils
  /**
   * Main Deck cards from values
   */
  const createMainDeckCardFromValue = (i: number) : card => {
    return {
      sign: 'PLUS',
      value: i,
      type: 'NORMAL',
      deck: 'MAIN'
    }
  }

/**
 * Create main deck
 */
const createMainDeck = () : card[] => {
  return new Array(10)
      .fill(0)
      .flatMap((_, i) => {
        const card: card = createMainDeckCardFromValue(i + 1)
        return [card, card, card, card]
  });
}

const SPECIAL_CARDS: card[] = [
  {
    sign: 'ZERO',
    value: 0,
    type: 'FLIP',
    flipValues: [2, 4],
    deck: 'SIDE'
  },
  {
    sign: 'ZERO',
    value: 0,
    type: 'FLIP',
    flipValues: [3,6],
    deck: 'SIDE'
  },
  {
    sign: 'ZERO',
    value: 0,
    type: 'TIEBREAKER',
    deck: 'SIDE'
  }
]

// EXPORT VARIABLES
export const MAIN_DECK_ALL_CARDS : card[] = createMainDeck();
// TODO: append SPECIAL_CARDS to SIDE_DECK_ALL_CARDS
export const SIDE_DECK_ALL_CARDS: card[] = [1, 2, 3, 4, 5, 6].flatMap(i => [-i, i]).map((value) => {
  return {
    sign: value > 0 ? 'PLUS' : 'MINUS',
    value,
    type: 'NORMAL',
    deck: 'SIDE'
  }
});

export const TEST_HAND: card[] = new Array(4).fill(null).map((value: null) : any => {
  return createMainDeckCardFromValue(Math.floor(Math.random() * (39 - 0 + 1) + 0))
})

// EXPORT FUNCTIONS
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