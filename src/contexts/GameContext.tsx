import {
  generateHand,
  generateMainDeck,
  generateSideDeck,
} from "@/lib/generate-deck";
import { createContext, useContext, useState } from "react";

export const GameContext = createContext<any>({});

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }: any) => {
  // TODO: usereducer
  const [playerTurn, setPlayerTurn] = useState(0);
  const [round, setRound] = useState(0);
  const [mainDeck, setMainDeck] = useState(generateMainDeck());
  const [nextMainDeckCardIndex, setNextMainDeckCardIndex] = useState<number>(0);
  const [players, setPlayers] = useState([
    {
      standing: false,
      roundsWon: 0,
      hand: generateHand(generateSideDeck()),
      board: new Array(9).fill(null),
    },
    {
      standing: false,
      roundsWon: 0,
      hand: generateHand(generateSideDeck()),
      board: new Array(9).fill(null),
    },
  ]);

  const switchPlayer = () => {
    if (playerTurn === 0) {
      setPlayerTurn(1);
    } else {
      setPlayerTurn(0);
    }
  };

  const dealMainDeckCard = () => {
    if (players[playerTurn].board[8] !== null) return;
    if (
      players[playerTurn].board.reduce((boardValue: 0, card) => {
        if (!card) return boardValue;
        return boardValue + card.value;
      }, 0) > 19
    )
      return;
    const card = mainDeck[nextMainDeckCardIndex];
    setNextMainDeckCardIndex(nextMainDeckCardIndex + 1);
    setPlayers(
      players.map((player: any, index: number) => {
        if (index === playerTurn) {
          const board = player.board;
          // Find first occcurrence of null
          const nextAvailableSlot = board.indexOf(null);
          if (nextAvailableSlot === -1) return player;
          board[nextAvailableSlot] = card;

          return {
            ...player,
            board: board,
          };
        }
        return player;
      })
    );
  };

  const playCard = (card: Card, playerIndex: 0 | 1) => {
    if (players[playerIndex].board[8] !== null) return;
    setPlayers(
      players.map((player: any, index: number) => {
        if (index === playerIndex) {
          const board = player.board;
          // Find first occcurrence of null
          const nextAvailableSlot = board.indexOf(null);
          if (nextAvailableSlot === -1) return player;
          board[nextAvailableSlot] = card;

          return {
            ...player,
            board: board,
          };
        }
        return player;
      })
    );
  };

  const resetTable = () => {
    setPlayers(
      players.map((player: any) => {
        return {
          ...player,
          board: new Array(9).fill(null),
        };
      })
    );
  };

  const resetGame = () => {
    setPlayers(
      players.map((player: any) => {
        return {
          ...player,
          board: new Array(9).fill(null),
          roundsWon: 0,
          standing: false,
        };
      })
    );
    setRound(0);
    setPlayerTurn(0);
    setNextMainDeckCardIndex(0);
    setMainDeck(generateMainDeck());
  };

  return (
    <GameContext.Provider
      value={{
        playerTurn,
        round,
        mainDeck,
        nextMainDeckCardIndex,
        players,
        playCard,
        switchPlayer,
        dealMainDeckCard,
        resetTable,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
