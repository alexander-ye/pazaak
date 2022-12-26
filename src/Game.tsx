import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import Board from './components/Board/Board';
import { card, player } from './types';
import { CLEAR_BOARD, MAIN_DECK_ALL_CARDS, shuffleCards, sumCardValues } from './utils/cards';
import { determineWinnerIndex, createPlayer, checkPlayerFilledBoard, checkBust } from './utils/player';

const Game = () => {  
  const [playerIndex, setPlayerIndex] = useState<number>(0);
  const nextPlayerIndex: number = (playerIndex + 1) % 2;
  const [players, setPlayers] = useState<player[]>([]);
  const [mainDeckIndex, setMainDeckIndex] = useState<number>(0);
  const [shuffledMainDeck, setShuffledMainDeck] = useState<card[]>(MAIN_DECK_ALL_CARDS);
  const [newRound, setNewRound] = useState<boolean>(true);
  const [winnerIndex, setWinnerIndex] = useState<number>(-1);

  const resetGame = useCallback(() => {
    setShuffledMainDeck(shuffleCards(shuffledMainDeck));
    setMainDeckIndex(0);
  }, []);

  /**
   * @i index of winning player
   */
  const resetRound = useCallback((i?: number) => {
    // TODO: Draw card for losing player
    if (players.length) {
      if (i !== -1) {
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
      playHouseCard();
      setNewRound(false);
    }
  }, [newRound, playerIndex])

  const switchPlayer = () => {
    setPlayerIndex(nextPlayerIndex);
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

  useEffect(() => {
    if (players.length) {
      // Check for round winner
      if (checkBust(players, playerIndex)) {
        setWinnerIndex(playerIndex);
      }
      const player0CardSum: number = sumCardValues(players[0]?.board);
      const player1CardSum: number = sumCardValues(players[1]?.board);
      if (players[0]?.stand) {
        if (player1CardSum < 21 && player1CardSum > player0CardSum) {
          setWinnerIndex(1);
        }
      } else if (players[1]?.stand) {
        if (player0CardSum < 21 && player0CardSum > player1CardSum) {
          setWinnerIndex(0);
        }
      }
      const bothPlayersStanding: boolean = players[0]?.stand && players[1]?.stand;
      if (bothPlayersStanding) {
        const winnerIndex: number = determineWinnerIndex(players);
        if (winnerIndex === -1) {
          // TODO: alert tie
          window.alert('TIE')
          resetRound();
        } else {
          setWinnerIndex(winnerIndex);
        }
      }
      const playerFilledBoard: number = checkPlayerFilledBoard(players);
      if (playerFilledBoard !== -1) {
        setWinnerIndex(playerFilledBoard);
        return;
      }
    }
  }, [players])

  useEffect( () => {
    if (winnerIndex !== -1) {
      window.alert(`Winner is, ${winnerIndex}`)
        resetRound(winnerIndex);
        setWinnerIndex(-1);
      }
    }, [winnerIndex])

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
        // TODO: Check win conditions here for UX (autowin if other player < 21, this player < other player)
        const playerToModify = {...players[index], stand: true};
        const out = [...players];
        out[index] =  playerToModify;
        setPlayers(out);
        // But: won't detect bust
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