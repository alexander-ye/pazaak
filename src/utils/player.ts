import { card, player } from "../types"
import { CLEAR_BOARD } from "./cards"

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
  if (playerScores[0] === 20) {
    if (playerScores[0] === playerScores[1]) {
      if (tiebreaker === 0 || tiebreaker === 1) {
        return tiebreaker;
      }
    } else {
      return 0;
    }
  } else if (playerScores[1] === 20) {
    return 1;
  }
  // TODO:
  return tiebreaker;
}