import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import Board from './components/Board/Board';
import { card, player } from './types';
import { CLEAR_BOARD, MAIN_DECK_ALL_CARDS, shuffleCards } from './utils/cards';
import { determineWinnerIndex, createPlayer, checkPlayerFilledBoard, checkBust } from './utils/player';

const Game = () => {  
  const [playerIndex, setPlayerIndex] = useState<number>(0);
  const [players, setPlayers] = useState<player[]>([]);
  const [mainDeckIndex, setMainDeckIndex] = useState<number>(0);
  const [shuffledMainDeck, setShuffledMainDeck] = useState<card[]>(MAIN_DECK_ALL_CARDS);
  const [newRound, setNewRound] = useState<boolean>(true);

  const resetGame = useCallback(() => {
    setShuffledMainDeck(shuffleCards(shuffledMainDeck));
    setMainDeckIndex(0);
  }, []);

  const resetRound = useCallback((i?: number) => {
    // TODO: Draw card for losing player
    if (players.length) {
      if (i === 0 || i === 1) {
        setPlayers(players.map((player: player, index: number) => {
          const updatedPlayer = {...player, board: CLEAR_BOARD, stand: false};
          if (index === i) {
            updatedPlayer.score += 1
          }
          return updatedPlayer;
        }))
        // Draw card for losing player
        setPlayerIndex(i === 0 ? 1 : 0);
      } else {
        setPlayers(players.map((player: player) => {
          return {...player, board: CLEAR_BOARD, stand: false}
        }))
        // Default to player 1
        setPlayerIndex(0);
      }
    } else {
      setPlayers([
        createPlayer('player1'),
        createPlayer('player2')
      ]);
      setShuffledMainDeck(shuffleCards(shuffledMainDeck));
      setPlayerIndex(0);
    }
    setNewRound(true);
  }, [players, shuffledMainDeck]);

  useEffect(() => {
    if (players.length && newRound) {
      console.log("datadatos")
      playHouseCard();
      setNewRound(false);
    }
  }, [newRound, playerIndex])


  const switchPlayer = () => {
    const otherPlayerIndex: number = (playerIndex + 1) % 2;
    if (checkBust(players, playerIndex)) {
      resetRound(otherPlayerIndex);
    } else {
      setPlayerIndex(otherPlayerIndex);
    }
  }

  const drawMainDeckCard = () => {
    const card = shuffledMainDeck[mainDeckIndex];
    setMainDeckIndex(mainDeckIndex + 1);
    return card;
  }

  useEffect(() => {
    if (mainDeckIndex === shuffledMainDeck.length) {
      setShuffledMainDeck(shuffleCards(shuffledMainDeck));
      setMainDeckIndex(0);
    }
  }, [mainDeckIndex]);

  const bothPlayersStanding: boolean = players[0]?.stand && players[1]?.stand;
  const playerFilledBoard: number = checkPlayerFilledBoard(players);
  useEffect(() => {
    if (playerFilledBoard !== -1) {
      resetRound(playerFilledBoard);
    }
    if (bothPlayersStanding) {
      // Calculate round winner
      const winnerIndex: number = determineWinnerIndex(players);
      if (winnerIndex === -1) {
        resetRound();
      } else {
        resetRound(winnerIndex);
      }
    }
  }, [playerFilledBoard, bothPlayersStanding])

  useEffect(() => {
    resetRound()
  }, []);

  const playHouseCard = () => {
    const nextCard = drawMainDeckCard();
    const playerBoard : (card|null)[] = players[playerIndex].board;
    const updatedBoard = [...playerBoard];
    updatedBoard[playerBoard.indexOf(null)] = nextCard;
    setPlayers(players.map((player: player, index: number) => {
      return index === playerIndex ? {...player, board: updatedBoard} : player
    }))
  }

  const playHandCard = (card: card | null) => {
    const playerBoard : (card|null)[] = players[playerIndex].board;
    const updatedBoard = [...playerBoard];
    updatedBoard[playerBoard.indexOf(null)] = card;
    setPlayers(players.map((player: player, index: number) => {
      return index === playerIndex ? {...player, board: updatedBoard} : player
    }))
  }

  return <div className={`table`} style={styles.boardsContainer}>
    {players.map((player: player, index: number) => {
      const isPlayersTurn: boolean = index === playerIndex;
      const otherPlayerIndex: number = (index + 1) % 2;
      const stand = () => {
        const playerToModify = {...players[index], stand: true};
        const out = [...players];
        out[index] =  playerToModify;
        setPlayers(out);
        if (!players[otherPlayerIndex].stand) {
          switchPlayer()
        }
      }

      return <div key={player.name} style={{display: 'flex', flexDirection: 'column'}}>
        <Board 
          player={player} 
          isPlayersTurn={isPlayersTurn}
          switchPlayer={switchPlayer}
          stand={stand}
          opponentStanding={players[otherPlayerIndex].stand}
          playHouseCard={playHouseCard}
          playHandCard={playHandCard}
        />   
        </div>
    })}
    {/* <button disabled={!bothPlayersStanding} onClick={resetGame}>Reset Game</button> */}
  </div>
}

export default Game;

const styles: {[key: string]: CSSProperties} = {
  boardsContainer: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row'
  }
}