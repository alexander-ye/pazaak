import { player } from "../types"

export const createPlayer = (name: string, bot: boolean = false) : player => {
  return {
    name,
    points: 0,
    score: 0,
    stand: false,
    hand: [],
    bot
  }
}