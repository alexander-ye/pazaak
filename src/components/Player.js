import React, { useState, useEffect } from "react";
import Board from "./Board";
import Card from "./Card";

const Player = ({
  playerNumber,
  currentPlayer,
  switchPlayer,
  generatePlayerDeck,
  dealMainDeckCard,
}) => {
  const [sideDeck, setSideDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [handDisabled, setHandDisabled] = useState(true);
  const [cardsPlayed, setCardsPlayed] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [numCardsPlayed, setNumCardsPlayed] = useState(0);
  const [cardSum, setCardSum] = useState(0);
  // const [sideDeck, setSideDeck] = useState([]);

  const ID = playerNumber;
  const playerDeck = generatePlayerDeck();

  const testButton = () => {
    setNumCardsPlayed(numCardsPlayed + 1);
  };

  const turnLoop = () => {
    const cardToDeal = dealMainDeckCard(numCardsPlayed, cardSum);
    setCardSum(cardSum + cardToDeal);
    const boardCards = [...cardsPlayed];
    boardCards.splice(numCardsPlayed, 1, cardToDeal);
    setCardsPlayed(boardCards);
    setNumCardsPlayed(numCardsPlayed + 1);
    setHandDisabled(false);
    switchPlayer();
  };

  return (
    <div>
      <button onClick={testButton}>{`PLAYER ${ID}`}</button>
      <Board cardsPlayed={cardsPlayed} setCardsPlayed={setCardsPlayed} />
      <h3>{cardSum}</h3>
      {/* End turn */}
      <button onClick={turnLoop} disabled={currentPlayer !== playerNumber}>
        END TURN
      </button>
      {/* Keep current sum */}
      <button disabled={currentPlayer !== playerNumber}>STAND</button>
      {/* Forfeit game */}
      <button disabled={currentPlayer !== playerNumber}>FORFEIT</button>

      <h2>Player Deck</h2>
      <ul>
        {playerDeck.map((i) => (
          <li>
            <Card
              handDisabled={handDisabled}
              cardSum={cardSum}
              setCardSum={setCardSum}
              cardNumber={i}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Player;
