import React, { useState, useEffect } from "react";
import Card from "./Card";
import Deck from "./Deck";

// Outscore: 20 or under, greater than opponent
// Tie: both players same pts
// Bust: over 20 after turn
// Fill table: 9 cards on table without busting, autowin
// Tiebreaker
// First to 3 sets

const Game = () => {
  // Main deck: four sets of cards numbered 1-10
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [cardsPlayed, setCardsPlayed] = useState(0);
  const [cardSum, setCardSum] = useState(0);
  const [turn, setTurn] = useState(0);
  const [setOver, setSetOver] = useState("");
  const [gameOver, setGameOver] = useState("");
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

  const checkGameStatus = () => {
    if (cardSum > 20) {
      setSetOver("lose");
      setOverPopup();
    } else if (cardSum === 20) {
      setSetOver("win");
      setOverPopup();
    }
  };

  const resetGame = () => {
    setGameOver("");
    setMainDeck(generateMainDeck());
    setSideDeck(generateSideDeck());
  };

  // Create and shuffle main deck
  useEffect(() => {
    resetGame();
  }, []);

  // Create player deck
  useEffect(() => {
    setPlayerDeck(generatePlayerDeck());
  }, [sideDeck]);

  // Game status
  useEffect(() => {
    checkGameStatus();
  }, [cardSum]);

  const drawMainCard = () => {
    if (cardsPlayed < 9 && cardSum < 20) {
      const gameMainDeck = [...mainDeck];
      const cardToDraw = gameMainDeck.pop();
      setDrawnCards([...drawnCards, cardToDraw]);
      setMainDeck(gameMainDeck);
      setCardSum(cardSum + cardToDraw);
      setCardsPlayed(cardsPlayed + 1);
      setTurn(turn + 1);
    }
  };

  const logDecks = () => {
    console.log(mainDeck);
    console.log(sideDeck);
  };

  return (
    <div>
      <button onClick={drawMainCard}>DRAW</button>
      <p>{cardSum}</p>
      <h2>Player Deck</h2>
      <ul>
        {playerDeck.map((i) => (
          <li>
            <Card
              turn={turn}
              setTurn={setTurn}
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

export default Game;
