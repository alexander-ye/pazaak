import Card from "./card";
import Deck from "./deck";
import Player from "./player";

export default class Game {
  constructor() {
    this.players = [];
    this.mainDeck = [];
  }

  getMainDeck() {
    return this.mainDeck;
  }

  resetPlayers() {
    this.players.map((player) => player.reset());
  }

  generateMainDeck() {
    let out = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].flatMap((i) => [
      new Card(i, "plus", false, "mainDeck", null),
      new Card(i, "plus", false, "mainDeck", null),
      new Card(i, "plus", false, "mainDeck", null),
      new Card(i, "plus", false, "mainDeck", null),
    ]);
    this.mainDeck = new Deck(out);
  }

  prepNewRound() {
    this.resetPlayers();
    this.generateMainDeck();
  }

  prepNewGame() {
    this.resetPlayers();
    this.generateMainDeck();
  }

  clone() {
    const out = new Game();
    out.players = this.players;
    out.mainDeck = this.mainDeck;
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
