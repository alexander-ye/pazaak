export interface card {
  sign: string;
  value: number;
  type: string;
  deck: string;
  flipValues?: number[] | undefined;
  played?: boolean | undefined;
}

export interface player {
    name: string;
    roundsWon: number;
    score: number;
    stand: boolean;
    hand: card[];
    board: (card | null)[];
    bot: boolean;
 }