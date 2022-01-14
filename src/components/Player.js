import React, { useState, useEffect } from "react";
import Board from "./Board";

const Player = ({
  playerNumber,
  setPlayerNumber,
  currentPlayer,
  switchPlayer,
}) => {
  const [sideDeck, setSideDeck] = useState([]);
  const [cardsPlayed, setCardsPlayed] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [numCardsPlayed, setNumCardsPlayed] = useState(0);
  // const [sideDeck, setSideDeck] = useState([]);

  const ID = playerNumber;

  const testButton = () => {
    setNumCardsPlayed(numCardsPlayed + 1);
  };

  return (
    <div>
      <button onClick={testButton}>{`PLAYER ${ID}`}</button>
      <Board cardsPlayed={cardsPlayed} setCardsPlayed={setCardsPlayed} />
      {/* End turn */}
      <button onClick={switchPlayer} disabled={currentPlayer !== playerNumber}>
        END TURN
      </button>
      {/* Keep current sum */}
      <button disabled={currentPlayer !== playerNumber}>STAND</button>
      {/* Forfeit game */}
      <button disabled={currentPlayer !== playerNumber}>FORFEIT</button>
    </div>
  );
};

export default Player;
