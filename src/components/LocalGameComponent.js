import React, { useState, useEffect } from "react";
import PlayerComponent from "./PlayerComponent";
import Card from "../classes/card";
import Game from "../classes/game";
import Player from "../classes/player";

const allBoardsContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "800px",
};

const centerTextStyle = {
  textAlign: "center",
};

const LocalGameComponent = () => {
  // Turn switching
  const [switchingTurns, setSwitchingTurns] = useState(false);

  const switchTurnTrue = () => {
    setSwitchingTurns(true);
  };

  const switchTurnFalse = () => {
    setSwitchingTurns(false);
  };

  const [currentPlayer, setCurrentPlayer] = useState(0);

  // Round state
  const [setOver, setSetOver] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [roundWinner, setRoundWinner] = useState("");
  const [tie, setTie] = useState(false);
  // Players
  // Player states
  const [player1, setPlayer1] = useState(new Player(0, "Player 1", 0, 0, []));
  const [player2, setPlayer2] = useState(new Player(1, "Player 2", 0, 0, []));

  // Game
  const [game, setGame] = useState(new Game());

  const pickWinner = (player) => {
    setRoundWinner(`Player ${player.id + 1}`);
  };

  useEffect(() => {
    if (player1.standing && player2.standing) {
      if (player1.cardSum === player2.cardSum) {
        setTie(true);
      } else if (player1.cardSum === 20) {
        pickWinner(player1);
      } else if (player2.cardSum === 20) {
        pickWinner(player2);
      } else if (player1.cardSum < 20 && player2.cardSum < 20) {
        if (player1.cardSum > player2.cardSum) {
          pickWinner(player1);
        } else {
          pickWinner(player2);
        }
      } else {
        if (player1.cardSum > 20) {
          pickWinner(player2);
        } else {
          pickWinner(player1);
        }
      }
    }
  }, [player1, player2]);

  useEffect(() => {
    if (roundWinner) {
      console.log(`${roundWinner} wins`);
      setSetOver(true);
    } else if (tie) {
      console.log("Round tie");
      setSetOver(true);
    }
  }, [roundWinner, tie]);

  // useEffect(() => {
  //   if (setOver) {
  //     if (window.confirm(`${roundWinner} wins! Refresh to play again!`)) {
  //       console.log(`${roundWinner} win`);
  //     }
  //   }
  // }, [setOver]);

  const getOtherPlayerState = (playerID) => {
    if (playerID === 0) {
      return player2;
    } else {
      return player1;
    }
  };

  const switchPlayer = () => {
    switchTurnTrue();
    if (currentPlayer === 0) {
      setCurrentPlayer(1);
    } else {
      setCurrentPlayer(0);
    }
  };

  // Create and shuffle main deck
  useEffect(() => {
    const newGameStart = game.clone();
    newGameStart.players = [player1, player2];
    newGameStart.generateMainDeck();
    setGame(newGameStart);
    const player1Start = player1.clone();
    player1Start.generateSideDeck();
    player1Start.generateHand();
    const player2Start = player2.clone();
    player2Start.generateSideDeck();
    player2Start.generateHand();
    setPlayer1(player1Start);
    setPlayer2(player2Start);
  }, []);

  const dealMainDeckCard = (cardSum) => {
    if (game.mainDeck.playedCards.length < 9 && cardSum < 20) {
      const workingMainDeck = game.mainDeck.clone();
      workingMainDeck.shuffleCards();
      const cardToDeal = workingMainDeck.playNextCard();
      const gameClone = game.clone();
      gameClone.mainDeck = workingMainDeck;
      setGame(gameClone);
      return cardToDeal;
    } else {
      console.log("Cant deal");
      return new Card(0, null, false, "cardSlot", null);
    }
  };

  // Each turn:
  // 1. Deal main deck card
  // 2. Play cards
  // 3. End turn
  if (gameStart) {
    if (!switchingTurns) {
      return (
        <div>
          <h1 style={centerTextStyle}>PAZAAK</h1>
          <h3 style={centerTextStyle}>
            {setOver ? `${roundWinner} wins! Refresh to play again!` : ``}
          </h3>
          <div className="allBoardsContainer" style={allBoardsContainerStyle}>
            <PlayerComponent
              currentPlayer={currentPlayer}
              switchPlayer={switchPlayer}
              dealMainDeckCard={dealMainDeckCard}
              player={player1}
              setPlayer={setPlayer1}
              getOtherPlayerState={getOtherPlayerState}
              local={true}
            />
            <PlayerComponent
              currentPlayer={currentPlayer}
              switchPlayer={switchPlayer}
              dealMainDeckCard={dealMainDeckCard}
              player={player2}
              setPlayer={setPlayer2}
              getOtherPlayerState={getOtherPlayerState}
              local={true}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Player {currentPlayer + 1}'s Turn</h2>
          <button onClick={switchTurnFalse}>Ready</button>
        </div>
      );
    }
  } else {
    return <button onClick={() => setGameStart(true)}>START GAME</button>;
  }
};

export default LocalGameComponent;
