"use client";

import GameTable from "./GameTable";
import { GameProvider } from "@/contexts/GameContext";

const Game = () => {
  return (
    <GameProvider>
      <GameTable />
    </GameProvider>
  );
};

export default Game;
