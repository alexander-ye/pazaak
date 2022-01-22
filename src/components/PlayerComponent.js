import React, { useState, useEffect } from "react";
import Board from "./Board";
import CardComponent from "./CardComponent";
import Card from "../classes/card";

const PlayerComponent = ({
  player,
  currentPlayer,
  switchPlayer,
  dealMainDeckCard,
  setPlayer,
  getOtherPlayerState,
  local,
}) => {
  const [handDisabled, setHandDisabled] = useState(true);
  const [handCardPlayed, setHandCardPlayed] = useState(false);
  const [cardSumToDisplay, setCardSumToDisplay] = useState(player.cardSum);
  const ID = player.id;
  const sideDeck = player.sideDeck;
  const hand = player.hand;

  // If cardSum === 20 {setStanding(true)}
  const setPlayerCardSum = (i) => {
    const playerToModify = player.clone();
    playerToModify.cardSum = i;
    setPlayer(playerToModify);
  };

  const stand = () => {
    if (checkBust()) {
      console.log("Lose");
    } else {
      const playerToModify = player.clone();
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

  const setCardOnBoard = (card) => {
    const boardCards = [...player.cardsPlayed];
    boardCards.splice(player.numCardsPlayed, 1, card);
    const out = player.clone();
    out.cardsPlayed = boardCards;
    out.numCardsPlayed = player.numCardsPlayed + 1;
    out.cardSum = player.cardSum + card.value;
    setPlayer(out);
    return out.cardSum;
  };

  const playCard = (card) => {
    if (card.value !== 0) {
      const newCardSum = setCardOnBoard(card);
      setCardSumToDisplay(newCardSum);
    }
  };

  const playHandCard = (card) => {
    if (!handCardPlayed) {
      playCard(card);
      setHandCardPlayed(true);
    }
  };

  const drawFromMainDeck = () => {
    const cardToDeal = dealMainDeckCard(player.cardSum);
    playCard(cardToDeal);
  };

  const turnLoop = () => {
    if (checkBust()) {
      // Stand and bust if over 20
      const playerToModify = player.clone();
      playerToModify.bust = true;
      playerToModify.standing = true;
      setPlayer(playerToModify);
      switchPlayer();
    } else if (check20()) {
      // Stand if 20
      const playerToModify = player.clone();
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
      const playerToModify = player.clone();
      playerToModify.standing = true;
      setPlayer(playerToModify);
      if (!getOtherPlayerState(ID).standing) {
        switchPlayer();
      }
    }
  }, [player.cardSum]);

  return (
    <div>
      <Board cardsPlayed={player.cardsPlayed} />
      <h3>
        {cardSumToDisplay} || Other Player Card Sum:{" "}
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

      <h2>Player Hand</h2>
      <ul>
        {player.hand.map((card) => (
          <li>
            <CardComponent
              handDisabled={
                handCardPlayed ||
                player.standing ||
                handDisabled ||
                currentPlayer !== ID
              }
              cardSum={player.cardSum}
              playCard={playHandCard}
              cardObject={card}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerComponent;
