export const mainDeckCardValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const sideDeckCardValues: number[] = [1, 2, 3, 4, 5, 6];

export const plusCards: Card[] = sideDeckCardValues.map((card) => ({
  value: card,
  type: 'plus'
}));
export const minusCards: Card[] = sideDeckCardValues.map((card) => ({
  value: card * -1,
  type: 'minus'
}));
export const plusMinusCards: Card[] = sideDeckCardValues.map((card) => {
  return {
    value: card,
    type: 'plus-minus'
  }
})

export const specialCards: Card[] = [
  {
    value: 1,
    type: 'plus-minus-one-two'
  },
  {
    value: 0,
    type: 'double',
  },
  {
    value: 1,
    type: 'tiebreaker'
  },
  {
    value: 0,
    type: '2-4-flip-card'
  },
  {
    value: 0,
    type: '3-4-flip-card'
  }
]