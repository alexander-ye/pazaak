import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import PlayerComponent from "./PlayerComponent";
import DeckComponent from "./DeckComponent";
import Card from "../classes/card";
import Game from "../classes/game";
import Player from "../classes/player";

// TODOS:
// ROUNDS
// Outscore: 20 or under, greater than opponent
// Tie: both players same pts
// Bust: over 20 after turn
// Fill table: 9 cards on table without busting, autowin
// Tiebreaker
// First to 3 sets
// Side deck: 10 unique cards player chooses before match
// Four cards of side deck chosen at random for player
// Plus cards: 1-6 pts
// Minus cards: 1-6 pts
// Plus/minus cards: 1-6 pts
// +/- 1 or 2 card
// Flip card: change signs of written number of all cards on player's table
// 2&4, 3&6
// Double Card: double value of player's last played card
// Tiebreaker card: +/-1 card, tiebreaker

const allBoardsContainerStyle = {
  display: "flex",
  flexDirection: "row",
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
  player1.generateSideDeck();
  player1.generateHand();
  player2.generateSideDeck();
  player2.generateHand();

  const newGame = new Game();
  newGame.generateMainDeck();
  newGame.players = [player1, player2];

  // Game
  const [game, setGame] = useState(newGame);

  // Decks
  const [mainDeck, setMainDeck] = useState(game.getMainDeck());

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

  useEffect(() => {
    if (setOver) {
      if (window.confirm("New Set?")) {
        newRound();
      }
    }
  }, [setOver]);

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

  const playAgain = (message) => {
    if (window.confirm(`${message} Play again?`)) {
      return; // TODO
    } else {
      return;
    }
  };

  const newRound = () => {
    setGame(game.prepNewRound());
  };

  const resetGame = () => {
    newGame.resetPlayers();
    newGame.generateMainDeck();
    newGame.mainDeck.shuffleCards();
  };

  // Create and shuffle main deck
  useEffect(() => {
    resetGame();
  }, []);

  const dealMainDeckCard = (cardSum) => {
    if (mainDeck.playedCards.length < 9 && cardSum < 20) {
      const workingMainDeck = mainDeck.clone();
      workingMainDeck.shuffleCards();
      const cardToDeal = workingMainDeck.playNextCard();
      setMainDeck(workingMainDeck);
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
        <PlayerComponent
          currentPlayer={currentPlayer}
          switchPlayer={switchPlayer}
          dealMainDeckCard={dealMainDeckCard}
          player={currentPlayer === 0 ? player1 : player2}
          setPlayer={currentPlayer === 0 ? setPlayer1 : setPlayer2}
          getOtherPlayerState={getOtherPlayerState}
          local={true}
        />
      );
    } else {
      return (
        <div>
          <h2>Player {currentPlayer + 1}'s Turn</h2>
          <button onClick={switchTurnFalse}>Ready</button>
        </div>
      );
    }
    // return (
    //   <div>
    //     <DeckComponent />
    //     <div className="allBoardsContainer" style={allBoardsContainerStyle}>
    //       <PlayerComponent
    //         currentPlayer={currentPlayer}
    //         switchPlayer={switchPlayer}
    //         generatePlayerDeck={generatePlayerDeck}
    //         dealMainDeckCard={dealMainDeckCard}
    //         player={player1}
    //         setPlayer={setPlayer1}
    //         getOtherPlayerState={getOtherPlayerState}
    //       />
    //       <PlayerComponent
    //         currentPlayer={currentPlayer}
    //         switchPlayer={switchPlayer}
    //         generatePlayerDeck={generatePlayerDeck}
    //         dealMainDeckCard={dealMainDeckCard}
    //         player={player2}
    //         setPlayer={setPlayer2}
    //         getOtherPlayerState={getOtherPlayerState}
    //       />
    //     </div>
    //   </div>
    // );
  } else {
    return <button onClick={() => setGameStart(true)}>START GAME</button>;
  }
};

export default LocalGameComponent;
