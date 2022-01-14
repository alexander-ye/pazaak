import React, { useState, useEffect } from "react";
import Card from "./Card";
import Player from "./Player";

// Outscore: 20 or under, greater than opponent
// Tie: both players same pts
// Bust: over 20 after turn
// Fill table: 9 cards on table without busting, autowin
// Tiebreaker
// First to 3 sets

const allBoardsContainerStyle = {
  display: "flex",
  flexDirection: "row",
};

const Game = () => {
  // Main deck: four sets of cards numbered 1-10
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  const [setOver, setSetOver] = useState("");
  const [gameOver, setGameOver] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameStart, setGameStart] = useState(false);
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

  const switchPlayer = () => {
    setCurrentPlayer(-currentPlayer);
  };

  const shuffleDeck = (deckArray) => {
    // Fisher-Yates (aka Knuth) Shuffle
    const deckArrayCopy = [...deckArray];
    let currentIndex = deckArray.length,
      randomIndex;

    // While elements exist to shuffle
    while (currentIndex != 0) {
      // Pick remaining element by random
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap with current element
      [deckArrayCopy[currentIndex], deckArrayCopy[randomIndex]] = [
        deckArrayCopy[randomIndex],
        deckArrayCopy[currentIndex],
      ];
    }

    return deckArrayCopy;
  };

  const generateMainDeck = () => {
    let out = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].flatMap((i) => [i, i, i, i]);
    out = shuffleDeck(out);
    return out;
  };

  const generateSideDeck = () => {
    let out = [1, 2, 3, 4, 5, 6].flatMap((i) => [i, -i, i + 6]);
    out.push(13, 100);
    return out;
  };

  const generatePlayerDeck = () => {
    let out = [...sideDeck];
    out = shuffleDeck(out);
    out = out.slice(0, 4);
    return out;
  };

  const playAgain = (message) => {
    if (window.confirm(`${message} Play again?`)) {
      resetGame();
    } else {
      return;
    }
  };

  const setOverPopup = () => {
    let message;
    if (setOver === "win") {
      message = "You win!";
    } else if (setOver === "tie") {
      message = "Tie!";
    } else if (setOver === "lose") {
      message = "You lose.";
    }
    playAgain(message);
  };

  // const checkGameStatus = () => {
  //   if (cardSum > 20) {
  //     setSetOver("lose");
  //     setOverPopup();
  //   } else if (cardSum === 20) {
  //     setSetOver("win");
  //     setOverPopup();
  //   }
  // };

  const resetGame = () => {
    setGameOver("");
    setMainDeck(generateMainDeck());
    setSideDeck(generateSideDeck());
  };

  // Create and shuffle main deck
  useEffect(() => {
    resetGame();
  }, []);

  const dealMainDeckCard = (numCardsPlayed, cardSum) => {
    if (numCardsPlayed < 9 && cardSum < 20) {
      const workingMainDeck = [...mainDeck];
      const cardToDeal = workingMainDeck.pop();
      setMainDeck(workingMainDeck);
      return cardToDeal;
    }
  };

  // Each turn:
  // 1. Deal main deck card
  // 2. Play cards
  // 3. End turn

  const logDecks = () => {
    console.log(mainDeck);
    console.log(sideDeck);
  };

  if (gameStart) {
    return (
      <div>
        <div className="allBoardsContainer" style={allBoardsContainerStyle}>
          <Player
            playerNumber={1}
            currentPlayer={currentPlayer}
            switchPlayer={switchPlayer}
            generatePlayerDeck={generatePlayerDeck}
            dealMainDeckCard={dealMainDeckCard}
          />
          <Player
            playerNumber={-1}
            currentPlayer={currentPlayer}
            switchPlayer={switchPlayer}
            generatePlayerDeck={generatePlayerDeck}
            dealMainDeckCard={dealMainDeckCard}
          />
        </div>
      </div>
    );
  } else {
    return <button onClick={() => setGameStart(true)}>START GAME</button>;
  }
};

export default Game;
