import { card } from "../types";
  
/**
 * Create empty board
 */
const createClearBoard = () : null[] => new Array(9).fill(null);

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

/**
 * Pazaak has the following cards for side deck:
 * - Plus cards (1-6)
 * - Minus cards (1-6)
 * - Plus/Minus cards (1-6)
 * - Plus/Minus One/Two card (+/- 1/2) card
 * - Flip cards (2s and 4s become -2s -4s, 3s and 6s become -3s -6s)
 * - Double card (double value of most recently played card)
 * - Tiebreaker (+/- 1 card, player who plays wins in event of tie)
 */
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
    flipValues: [3, 6],
    deck: 'SIDE'
  },
  {
    sign: 'TIEBREAKER',
    value: 1,
    type: 'TIEBREAKER',
    deck: 'SIDE'
  }
]

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

export const sumCardValues = (cards: (card | null)[]) : number => {
  return cards.reduce((prev: number, card: card | null) => {
    if (card === null) {
      return prev;
    } 
    return prev + card.value;
  }, 0)
}

const getPlusMinusColor = (sign: string) : any => {
  if (sign === 'PLUS') {
    return 'skyblue';
  }
  return 'pink'
}

export const getCardBackgroundColor = (card: card) : any => {
  const {deck, type, sign} : any = card;
  if (deck === 'MAIN') {
    return 'springgreen';
  } else {
    switch (type) {
      case 'FLIP':
        return ['',]
      case 'TIEBREAKER':
        return 'gold';
      case 'PLUSMINUS':
      case 'NORMAL':
        return getPlusMinusColor(sign);
      default:
        return 'pink';
    }
  }
}

// EXPORT VARIABLES
export const MAIN_DECK_ALL_CARDS : card[] = createMainDeck();
// TODO: append SPECIAL_CARDS to SIDE_DECK_ALL_CARDS
export const SIDE_DECK_ALL_CARDS: card[] = [1, 2, 3, 4, 5, 6].flatMap(i => [
  {sign: 'PLUS',
  value: i,
  type: 'NORMAL',
  deck: 'SIDE'}, 
  {sign: 'MINUS',
  value: -i,
  type: 'NORMAL',
  deck: 'SIDE'}, 
  {sign: 'PLUS',
  value: i,
  type: 'PLUSMINUS',
  deck: 'SIDE'}
])

export const CLEAR_BOARD: null[] = createClearBoard();

export const TEST_HAND: card[] = shuffleCards(SIDE_DECK_ALL_CARDS).slice(0, 4)