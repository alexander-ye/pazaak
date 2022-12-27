import { card, player } from "../types"
import { CLEAR_BOARD, sumCardValues, TEST_HAND } from "./cards"

export const createPlayer = (name: string, bot: boolean = false) : player => {
  return {
    name,
    roundsWon: 0,
    score: 0,
    stand: false,
    hand: TEST_HAND,
    board: CLEAR_BOARD,
    bot
  }
}

export const checkPlayerFilledBoard = (players: player[]) : number => {
  let out: number = NaN;
  players.forEach((player: player, index: number) => {
    if (player.board.indexOf(null) === -1 && sumCardValues(player.board) < 21) {
      out = index
    }
  })
  return out;
}

/**
 * Check if player busts
 * @param players 
 * @returns array index of unbust player
 */
export const checkBust = (players: player[], currentPlayerIndex: number) : boolean => {
  if (sumCardValues(players[currentPlayerIndex]?.board) > 20) {
    return true;
  }
  return false;
}

/**
 * Calcualate game winner
 * First player to win three sets wins the game (and whatever is being wagered).
 */
export const checkForWinner = (players: player[]) : number => {
  let winnerIndex: number = NaN;
  players.forEach((player: player, index: number) => {
    if (player.score === 3) {
      winnerIndex = index;
    }
  })
  return winnerIndex;
}

/**
 * Calculate round winner's index
 * -1 indicates tie
 * Four ways to win the set:
 * 1. Outscoring: If both players stand, player with the score closest to but not over 20 wins.
 * 2. Bust: If player ends turn with a score over 20, "bust": other player wins.
 * 3. Filling the table: If player places 9 cards on table without busting, player automatically wins if their score <= 20.
 * 4. Tiebreaker: Golden tiebreaker; when used last, user wins if both players have same score.
 * If set ties, no one gets point for set; play new set.
 * 
 * @param players 
 * @param currentPlayerIndex 
 * @returns 
 */

export const checkForRoundWinner = (players: player[], currentPlayerIndex: number) : number => {
  let tiebreaker: number = -1;
  const player0CardSum: number = players[0]?.board?.reduce((prev: number, boardCard: card | null) => {
    if (boardCard?.type === 'TIEBREAKER') {
      tiebreaker = 0;
      return prev;
    }
    if (boardCard === null) {
      return prev;
    } 
    return prev + boardCard.value;
  }, 0);
  const player1CardSum: number = players[1]?.board?.reduce((prev: number, boardCard: card | null) => {
    if (boardCard?.type === 'TIEBREAKER') {
      tiebreaker = 1;
      return prev;
    }
    if (boardCard === null) {
      return prev;
    } 
    return prev + boardCard.value;
  }, 0);
  let player0HasCardsLeft: boolean = false;
  let player1HasCardsLeft: boolean = false;
  players[0]?.hand.forEach((card: card) => {
    if (!card.played) {
      player0HasCardsLeft = true;
    }
  })
  players[1]?.hand.forEach((card: card) => {
    if (!card.played) {
      player1HasCardsLeft = true;
    }
  })
  // Check for bust
  if (player0CardSum > 20 && (currentPlayerIndex !== 0 || !player0HasCardsLeft)) {
    return 1;
  }
  if (player1CardSum > 20 && (currentPlayerIndex !== 1 || !player1HasCardsLeft)) {
    return 0;
  }
  if (players[0]?.stand && players[1]?.stand) {
    if (player0CardSum === player1CardSum) {
      return tiebreaker;
    }
    if (player1CardSum > 20) {
      return 0;
    }
    if (player0CardSum > 20) {
      return 1;
    }
    if (player0CardSum > player1CardSum) {
      return 0;
    }
    return 1;
  }
  if (players[0]?.stand) {
    if (player1CardSum < 21 && player1CardSum > player0CardSum) {
      return 1;
    }
  } else if (players[1]?.stand) {
    if (player0CardSum < 21 && player0CardSum > player1CardSum) {
      return 0;
    }
  }
  return checkPlayerFilledBoard(players);
}