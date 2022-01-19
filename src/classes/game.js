import Card from "./card";
import Deck from "./deck";
import Player from "./player";

class Game {
  constructor(players) {
    this.player = players;
  }
  generateMainDeck() {
    let out = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].flatMap((i) => [i, i, i, i]);
    out.map((i) => new Card(i, "plus", false, "mainDeck", null));
    return out;
  }
  generateSideDeck() {
    let out = [1, 2, 3, 4, 5, 6].flatMap((i) => [i, -i]);
    // Normal positive and negative 1-6 cards
    out.map(
      (i) => new Card(i, i < 0 ? "minus" : "plus", false, "sideDeck", null)
    );
    // Tiebreaker card
    out.push(new Card(1, "plus", true, "sideDeck", "tieBreaker"));
    // +/- 1-6 cards
    out.push(
      [1, 2, 3, 4, 5, 6].map((i) => new Card(i, "plus", true, "sideDeck", null))
    );
    return out;
  }
}

const winConditions = () => {
  console.log(
    `
    BEGINNING OF GAME: Each player draws a card from the main deck, highest card determines who goes first
    In a turn: Player darws card from main deck, places it on table. Could put card down from hand or end turn.

    End turn: if player ends turn, draw new card from main deck at start of next turn, repeated until player stands, goes bust, fills table, reaches score of exactly 20
    Sum of 20 = auto stand

    4 ways to win set:
    1. Both players stand, player with score closest to but not over 20 wins
    2. Bust. If one player ends turn with score over 20, other player wins.
    3. Fill table: player placing 9 cards on table without busting ==> auto win if score is 20 or under
    4. Tiebreaker card
    5. Tie

    Implementation:
    Stand status.
    Stand IF: player stands, player busts, player hits 20
    IF both players stand:
    Score closest to but not over 20 wins

    `
  );
};
