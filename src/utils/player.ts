import { card, player } from "../types"
import { CLEAR_BOARD, sumCardValues } from "./cards"

export const createPlayer = (name: string, bot: boolean = false) : player => {
  return {
    name,
    roundsWon: 0,
    score: 0,
    stand: false,
    hand: [],
    board: CLEAR_BOARD,
    bot
  }
}

export const checkPlayerFilledBoard = (players: player[]) : number => {
  let out: number = -1;
  players.forEach((player: player, index: number) => {
    if (player.board.indexOf(null) === -1 && sumCardValues(player.board) < 21) {
      out = index
    }
  })
  return out;
}

/**
 * 
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
 * Determine winner, assuming we have already checked for board filled and bust
 * Assumes only 2 players
 * 
 * @param players 
 * @returns indexOfWinningPlayer (-1 indicates tie)
 */
export const determineWinnerIndex = (players: player[]) : number => {
  let tiebreaker: number = -1;
  // TODO: Determine winner
  const playerScores: number[] = players.map((player: player, i: number) => {
    return player.board.reduce((prev: number, boardCard: card | null) => {
      if (boardCard?.type === 'TIEBREAKER') {
        tiebreaker = i;
        return prev;
      }
      if (boardCard === null) {
        return prev;
      } 
      return prev + boardCard.value;
    }, 0)
  });
  if (playerScores[0] === playerScores[1]) {
    return tiebreaker;
  }
  if (playerScores[0] > playerScores[1]) {
    return 0;
  }
  return 1;
}