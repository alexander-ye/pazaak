import React, { useState, useEffect } from "react";
import Board from "./Board";
import Card from "./Card";

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
    console.log(`${ID} ${player.cardSum}`);
    if (player.cardSum === 20) {
      return true;
    }
  };

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
    setCardSum(player.cardSum + cardVal);
  };

  const drawFromMainDeck = () => {
    const cardToDeal = dealMainDeckCard(numCardsPlayed, player.cardSum);
    playCard(cardToDeal);
  };

  const turnLoop = () => {
    if (checkBust()) {
      player.bust = true;
      getOtherPlayerState(ID).winRound = true;
      switchPlayer();
    } else if (check20()) {
      player.standing = true;
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
    if (currentPlayer === ID && !player.winRound) {
      drawFromMainDeck();
      setHandDisabled(false);
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (check20()) {
      player.standing = true;
      if (!getOtherPlayerState(ID).standing) {
        switchPlayer();
      }
    }
  }, [player.cardSum]);
  // useEffect(() => {
  //   if (checkBust()) {
  //     console.log("Bust");
  //   }
  // }, [player]);

  return (
    <div>
      <button onClick={testButton}>{`PLAYER ${ID}`}</button>
      <Board cardsPlayed={cardsPlayed} setCardsPlayed={setCardsPlayed} />
      <h3>{player.cardSum}</h3>
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
                player.standing || handDisabled || currentPlayer !== ID
              }
              cardSum={player.cardSum}
              playCard={playCard}
              cardNumber={i}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerComponent;
