import React, { useState, useEffect } from "react";
import Board from "./Board";
import Card from "./CardComponent";

const PlayerComponent = ({
  currentPlayer,
  switchPlayer,
  generatePlayerDeck,
  dealMainDeckCard,
  player,
  setPlayer,
  getOtherPlayerState,
}) => {
  const [handDisabled, setHandDisabled] = useState(true);
  const [cardsPlayed, setCardsPlayed] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [numCardsPlayed, setNumCardsPlayed] = useState(0);
  const [handCardPlayed, setHandCardPlayed] = useState(false);
  const ID = player.id;
  const playerDeck = generatePlayerDeck();

  // If cardSum === 20 {setStanding(true)}

  const setCardSum = (i) => {
    const playerToModify = { ...player };
    playerToModify.cardSum = i;
    setPlayer(playerToModify);
  };

  const stand = () => {
    if (checkBust()) {
      console.log("Lose");
    } else {
      const playerToModify = { ...player };
      playerToModify.standing = true;
      setPlayer(playerToModify);
      switchPlayer();
    }
  };

  const checkBust = () => {
    if (player.cardSum > 20) {
      return true;
    }
  };

  const check20 = () => {
    if (player.cardSum === 20) {
      return true;
    }
  };

  const setCardOnBoard = (cardVal) => {
    const boardCards = [...cardsPlayed];
    boardCards.splice(numCardsPlayed, 1, cardVal);
    setCardsPlayed(boardCards);
  };

  const playCard = (cardVal) => {
    setCardOnBoard(cardVal);
    setNumCardsPlayed(numCardsPlayed + 1);
    setCardSum(player.cardSum + cardVal);
  };

  const playHandCard = (cardVal) => {
    if (!handCardPlayed) {
      playCard(cardVal);
      setHandCardPlayed(true);
    }
  };

  const drawFromMainDeck = () => {
    const cardToDeal = dealMainDeckCard(numCardsPlayed, player.cardSum);
    playCard(cardToDeal);
  };

  const turnLoop = () => {
    if (checkBust()) {
      // Stand and bust if over 20
      const playerToModify = { ...player };
      playerToModify.bust = true;
      playerToModify.standing = true;
      setPlayer(playerToModify);
      switchPlayer();
    } else if (check20()) {
      // Stand if 20
      const playerToModify = { ...player };
      playerToModify.standing = true;
      setPlayer(playerToModify);
      switchPlayer();
    } else {
      if (getOtherPlayerState(ID).standing) {
        drawFromMainDeck();
      } else {
        switchPlayer();
      }
    }
  };

  useEffect(() => {
    if (currentPlayer === ID && !player.standing) {
      drawFromMainDeck();
      setHandDisabled(false);
      setHandCardPlayed(false);
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (check20()) {
      const playerToModify = { ...player };
      playerToModify.standing = true;
      setPlayer(playerToModify);
      if (!getOtherPlayerState(ID).standing) {
        switchPlayer();
      }
    }
  }, [player.cardSum]);

  return (
    <div>
      <Board cardsPlayed={cardsPlayed} setCardsPlayed={setCardsPlayed} />
      <h3>
        {player.cardSum} || Other Player Card Sum:{" "}
        {getOtherPlayerState(ID).cardSum}
      </h3>
      {/* End turn */}
      <button
        onClick={turnLoop}
        disabled={player.standing || currentPlayer !== ID}
      >
        END TURN
      </button>
      {/* Keep current sum */}
      <button
        onClick={() => {
          stand();
          console.log("standing");
        }}
        disabled={player.standing || currentPlayer !== ID}
      >
        STAND
      </button>
      {/* Forfeit game */}
      <button disabled={player.standing || currentPlayer !== ID}>
        FORFEIT
      </button>

      <h2>Player Deck</h2>
      <ul>
        {playerDeck.map((i) => (
          <li>
            <Card
              handDisabled={
                handCardPlayed ||
                player.standing ||
                handDisabled ||
                currentPlayer !== ID
              }
              cardSum={player.cardSum}
              playCard={playHandCard}
              cardNumber={i}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerComponent;
