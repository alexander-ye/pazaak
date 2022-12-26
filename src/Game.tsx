import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import Board from './components/Board/Board';
import { card, player } from './types';
import { CLEAR_BOARD, MAIN_DECK_ALL_CARDS, shuffleCards } from './utils/cards';
import { createPlayer, checkForRoundWinner, checkForWinner } from './utils/player';
import _ from 'lodash';

const Game = () => {  
  const [playerIndex, setPlayerIndex] = useState<number>(0);
  const nextPlayerIndex: number = (playerIndex + 1) % 2;
  const [players, setPlayers] = useState<player[]>([]);
  const [mainDeckIndex, setMainDeckIndex] = useState<number>(0);
  const [shuffledMainDeck, setShuffledMainDeck] = useState<card[]>(MAIN_DECK_ALL_CARDS);
  const [newRound, setNewRound] = useState<boolean>(true);

  // State so board renders before winner popup
  const [roundWinningIndex, setRoundWinningIndex] = useState<number>(NaN);
  const [gameWinningIndex, setGameWinningIndex] = useState<number>(NaN);

  const resetGame = useCallback(() => {
    setShuffledMainDeck(shuffleCards(shuffledMainDeck));
    setMainDeckIndex(0);
    setGameWinningIndex(NaN);
    resetRound();
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
    setRoundWinningIndex(NaN);
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
      const gameWinningPlayerIndex = checkForWinner(players);
      if (isNaN(gameWinningPlayerIndex)) {
        const roundWinningPlayerIndex = checkForRoundWinner(players, playerIndex);
        if (isNaN(roundWinningPlayerIndex)) {
          return
        } else {
          setRoundWinningIndex(roundWinningPlayerIndex);
        }
      } else {
        setGameWinningIndex(gameWinningPlayerIndex);
      }
    }
  }, [players])

  useEffect(() => {
    if (isNaN(roundWinningIndex)) {
      return;
    }
    if (roundWinningIndex === -1) {
      window.alert('TIE');
      resetRound();
    } else {
      window.alert(`Round winner index is ${roundWinningIndex}`);
      resetRound(roundWinningIndex)
    }
  }, [roundWinningIndex])

  useEffect(() => {
    if (isNaN(gameWinningIndex)) {
      return;
    }
    // Window alerts occur before the appropriate render...
    window.alert(`Player index ${gameWinningIndex} wins`);
    resetGame();
  }, [gameWinningIndex])

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
    const playerHand : card[] = players[playerIndex].hand;
    const updatedHand: card[] = playerHand.map((handCard: card) => {
      if (_.isEqual(handCard, card)) {
        return {...handCard, played: true};
      }
      return handCard;
    });
    setPlayers(players.map((player: player, index: number) => {
      return index === playerIndex ? {...player, board: updatedBoard, hand: updatedHand} : player
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