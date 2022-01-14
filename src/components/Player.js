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
  const [active, setActive] = useState(true);
  const ID = playerNumber;
  const playerDeck = generatePlayerDeck();

  const testButton = () => {
    setNumCardsPlayed(numCardsPlayed + 1);
  };

  const setCardOnBoard = (cardVal) => {
    const boardCards = [...cardsPlayed];
    boardCards.splice(numCardsPlayed, 1, cardVal);
    setCardsPlayed(boardCards);
  };

  const playCard = (cardVal) => {
    setCardOnBoard(cardVal);
    setNumCardsPlayed(numCardsPlayed + 1);
    setCardSum(cardSum + cardVal);
  };

  const drawFromMainDeck = () => {
    const cardToDeal = dealMainDeckCard(numCardsPlayed, cardSum);
    playCard(cardToDeal);
  };

  const turnLoop = () => {
    setHandDisabled(true);
    switchPlayer();
  };

  useEffect(() => {
    if (currentPlayer === ID) {
      drawFromMainDeck();
      setHandDisabled(false);
    }
  }, [currentPlayer]);

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
              handDisabled={handDisabled || currentPlayer !== playerNumber}
              cardSum={cardSum}
              playCard={playCard}
              cardNumber={i}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Player;
