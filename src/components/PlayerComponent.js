import React, { useState, useEffect } from "react";
import Board from "./Board";
import CardComponent from "./CardComponent";
import Card from "../classes/card";
import PlayerHandComponent from "./PlayerHandComponent";

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
    // Change player board
    const boardCards = [...player.cardsPlayed];
    boardCards.splice(player.numCardsPlayed, 1, card);
    const out = player.clone();
    out.cardsPlayed = boardCards;
    out.numCardsPlayed = player.numCardsPlayed + 1;
    out.cardSum = player.cardSum + card.value;
    // Disable card
    out.hand = out.hand.map((c) =>
      c.id === card.id ? card.cloneAsPlayed() : c
    );
    setPlayer(out);
    return out.cardSum;
  };

  const switchCardSign = (card) => {
    const playerClone = player.clone();
    playerClone.hand = playerClone.hand.map((c) =>
      card.id === c.id ? c.cloneSignSwitched() : c
    );
    setPlayer(playerClone);
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
      <h3>{cardSumToDisplay}</h3>
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
      <PlayerHandComponent
        hidden={currentPlayer !== ID}
        player={player}
        handDisabled={
          handCardPlayed ||
          player.standing ||
          handDisabled ||
          currentPlayer !== ID
        }
        playHandCard={playHandCard}
        switchCardSign={switchCardSign}
      />
    </div>
  );
};

export default PlayerComponent;
