import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import Board from './components/Board/Board';
import { card, player } from './types';
import { CLEAR_BOARD, MAIN_DECK_ALL_CARDS, shuffleCards, sumCardValues } from './utils/cards';
import { createPlayer, checkForRoundWinner, checkForWinner } from './utils/player';
import _ from 'lodash';

// TODO: Need to sequence functions so things happen in order and bugs don't occur
// e.g. switching player board & playing card even on victory screen
const Game = () => {  
  // Game state
  const [roundWinnerIndex, setRoundWinnerIndex] = useState<number>(NaN);
  const [gameWinnerIndex, setGameWinnerIndex] = useState<number>(NaN);
  const roundContinues: boolean = useMemo(() => {
    return isNaN(roundWinnerIndex) && isNaN(gameWinnerIndex)}, 
    [roundWinnerIndex, gameWinnerIndex]);
    
  const [newRound, setNewRound] = useState<boolean>(true);

  // Players
  const [players, setPlayers] = useState<player[]>([]);
  const [playerIndex, setPlayerIndex] = useState<number>(0);
  const nextPlayerIndex: number = (playerIndex + 1) % 2;

  // Decks
  const [mainDeckIndex, setMainDeckIndex] = useState<number>(0);
  const [shuffledMainDeck, setShuffledMainDeck] = useState<card[]>(MAIN_DECK_ALL_CARDS);

  const resetGame = useCallback(() => {
    setShuffledMainDeck(shuffleCards(shuffledMainDeck));
    setMainDeckIndex(0);
    setGameWinnerIndex(NaN);
    resetRound();
  }, []);

  /**
   * @i index of winning player
   */
  const resetRound = useCallback((i: number = NaN) => {
    // TODO: Draw card for losing player
    if (players.length) {
      let gameWon: boolean = false;
      if (i !== -1) {
        setPlayers(players.map((player: player, index: number) => {
          const updatedPlayer = {...player, board: CLEAR_BOARD, stand: false};
          if (index === i) {
            updatedPlayer.score += 1
          }
          if (updatedPlayer.score === 3) {
            gameWon = true;
          }
          return updatedPlayer;
        }))
        // Prevent drawing card if game is won
        if (gameWon) {
          return
        }
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
    setRoundWinnerIndex(NaN);
    setNewRound(true);
  }, [players, shuffledMainDeck]);

  useEffect(() => {
    if (players.length && isNaN(gameWinnerIndex) && newRound) {
      playHouseCard();
      setNewRound(false);
    }
  }, [gameWinnerIndex, newRound, playerIndex])

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

  // Check for game and round winner
  useEffect(() => {
    if (players.length) {
      const gameWinningPlayerIndex = checkForWinner(players);
      if (isNaN(gameWinningPlayerIndex)) {
        const roundWinningPlayerIndex = checkForRoundWinner(players, playerIndex);
        if (isNaN(roundWinningPlayerIndex)) {
          return
        } else {
          setRoundWinnerIndex(roundWinningPlayerIndex);
        }
      } else {
        setGameWinnerIndex(gameWinningPlayerIndex);
      }
    }
  }, [players])

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
      <dialog open={!roundContinues}
        style={{
          width: '600px',
          height: '400px',
          position: 'fixed',
          top: '50%',
          left:' 50%',
          transform: 'translateX(-50%) translateY(-50%)',
          zIndex: 1
       }}
      >
        {!isNaN(gameWinnerIndex) 
        ? <div>
            <p>{gameWinnerIndex} wins game</p>
            <button onClick={resetGame}>OK</button>
          </div>
        : <div>
            <p>{roundWinnerIndex} wins round</p>
            <button onClick={() => {
              if (isNaN(gameWinnerIndex)) {
                resetRound(roundWinnerIndex)
              }}}>OK</button>
          </div>
        }
      </dialog>
    {players.map((player: player, index: number) => {
      const isPlayersTurn: boolean = index === playerIndex && roundContinues;
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

      const cardScore: number = sumCardValues(player.board);

      const boardDisabled: boolean = 
        !roundContinues || 
        !isPlayersTurn || 
        player.stand || 
        player.board.indexOf(null) === -1;

      const endTurn = () => {
        if (cardScore > 20) {
          setRoundWinnerIndex(otherPlayerIndex);
          return; 
        }
        if (players[otherPlayerIndex].stand) {
          if (cardScore < 20) {
            playHouseCard();
          } else {
            stand();
          }
        } else {
          if (cardScore > 19) { 
            stand();
          } else {
            switchPlayer()
          }
        }
      }

      return <div key={player.name} style={{display: 'flex', flexDirection: 'row', margin: 'auto'}}>
        <Board 
          playerIndex={index}
          player={player}
          cardScore={cardScore}
          isPlayersTurn={isPlayersTurn}
          stand={stand}
          endTurn={endTurn}
          playHouseCard={playHouseCard}
          playHandCard={playHandCard}
          disabled={boardDisabled}
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
    flexDirection: 'row',
    position: 'relative'
  }
}