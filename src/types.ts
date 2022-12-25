export interface card {
  sign: string;
  value: number;
  type: string;
  deck: string;
  flipValues?: number[] | undefined;
}

export interface player {
    name: string;
    points: number;
    score: number;
    stand: boolean;
    hand: card[];
    bot: boolean;
  }