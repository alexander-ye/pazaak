import { mainDeckCardValues, minusCards, plusCards, plusMinusCards, specialCards } from "./constants";
import { shuffle } from "./shuffle-cards";

export function generateMainDeck (variation: 'sattolo' | 'fisher-yates' | 'durstenfeld' | 'inside-out' = 'inside-out'): Card[] {
  return shuffle(new Array(9).fill(mainDeckCardValues).flat().map((value) => {
    return {
      value,
      type: 'main'
    }
  }), variation);
}

export function generateSideDeck (): Card[] {
  return [...plusCards, ...minusCards, ...plusMinusCards, ...specialCards];
}

export function generateHand (sideDeck: Card[], variation: 'sattolo' | 'fisher-yates' | 'durstenfeld' | 'inside-out' = 'inside-out'): [Card, Card, Card, Card] {
  return shuffle(sideDeck, variation).slice(0, 4) as [Card, Card, Card, Card];
}