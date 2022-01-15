import React, { useState, useEffect } from "react";
import Card from "./Card";
import PlayerComponent from "./PlayerComponent";
import Deck from "./Deck";
import Player from "../classes/player";

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

const Game = () => {
  // Decks
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  // Round state
  const [setOver, setSetOver] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [roundWinner, setRoundWinner] = useState("");
  const [tie, setTie] = useState(false);
  // Player states
  const [player1, setPlayer1] = useState({
    id: 0,
    score: 0,
    cardSum: 0,
    cardsPlayed: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    standing: false,
    active: false,
    bust: false,
    winRound: false,
  });
  const [player2, setPlayer2] = useState({
    id: 1,
    score: 0,
    cardSum: 0,
    cardsPlayed: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    standing: false,
    active: false,
    bust: false,
    winRound: false,
  });

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

  const resetPlayer = (player) => {
    const out = { ...player };
    out.score = 0;
    out.cardSum = 0;
    out.standing = false;
    out.active = false;
    out.bust = false;
    out.win = false;
  };

  const resetPlayers = () => {
    setPlayer1(resetPlayer(player1));
    setPlayer2(resetPlayer(player2));
  };
  const testPlayer = new Player("Hi", 0, 0);

  // const resetPlayers = () => {
  //   const new1, new2 =
  // }

  const getOtherPlayerState = (playerID) => {
    if (playerID === 0) {
      return player2;
    } else {
      return player1;
    }
  };

  const switchPlayer = () => {
    if (currentPlayer === 0) {
      setCurrentPlayer(1);
    } else {
      setCurrentPlayer(0);
    }
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
      return; // TODO
    } else {
      return;
    }
  };

  const newRound = () => {
    setMainDeck(generateMainDeck());
    resetPlayers();
  };

  const resetRound = () => {
    setMainDeck(generateMainDeck());
    setSideDeck(generateSideDeck());
  };

  // Create and shuffle main deck
  useEffect(() => {
    resetRound();
  }, []);

  const dealMainDeckCard = (numCardsPlayed, cardSum) => {
    if (numCardsPlayed < 9 && cardSum < 20) {
      const workingMainDeck = [...mainDeck];
      const cardToDeal = workingMainDeck.pop();
      setMainDeck(workingMainDeck);
      return cardToDeal;
    } else {
      console.log("Cant deal");
      return 0;
    }
  };

  // Each turn:
  // 1. Deal main deck card
  // 2. Play cards
  // 3. End turn

  if (gameStart) {
    return (
      <div>
        <Deck />
        <div className="allBoardsContainer" style={allBoardsContainerStyle}>
          <PlayerComponent
            currentPlayer={currentPlayer}
            switchPlayer={switchPlayer}
            generatePlayerDeck={generatePlayerDeck}
            dealMainDeckCard={dealMainDeckCard}
            player={player1}
            setPlayer={setPlayer1}
            getOtherPlayerState={getOtherPlayerState}
          />
          <PlayerComponent
            currentPlayer={currentPlayer}
            switchPlayer={switchPlayer}
            generatePlayerDeck={generatePlayerDeck}
            dealMainDeckCard={dealMainDeckCard}
            player={player2}
            setPlayer={setPlayer2}
            getOtherPlayerState={getOtherPlayerState}
          />
        </div>
      </div>
    );
  } else {
    return <button onClick={() => setGameStart(true)}>START GAME</button>;
  }
};

export default Game;
