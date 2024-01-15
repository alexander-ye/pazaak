interface Card {
  value: number;
  type: 'main' | 'plus' | 'minus' | 'plus-minus' | 'plus-minus-one-two' | 'double' | 'tiebreaker' | '2-4-flip-card' | '3-4-flip-card';
}