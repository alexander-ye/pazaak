import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import Board from './components/Board/Board';
import { card, player } from '../../types';
import { CLEAR_BOARD, MAIN_DECK_ALL_CARDS, shuffleCards, sumCardValues } from '../../utils/cards';
import { createPlayer, checkForRoundWinner, checkForWinner } from '../../utils/player';
import _ from 'lodash';

const MainGame = () => {  
  // Game state
  const [roundWinnerIndex, setRoundWinnerIndex] = useState<number>(NaN);
  const [gameWinnerIndex, setGameWinnerIndex] = useState<number>(NaN);
  const roundContinues: boolean = useMemo(() : boolean => {
    return isNaN(roundWinnerIndex) && isNaN(gameWinnerIndex)}, 
    [roundWinnerIndex, gameWinnerIndex]);

  // Players
  const [players, setPlayers] = useState<player[]>([]);
  const [playerIndex, setPlayerIndex] = useState<number>(NaN);
  const nextPlayerIndex: number = (playerIndex + 1) % 2;

  // Decks
  const [mainDeckIndex, setMainDeckIndex] = useState<number>(0);
  const [shuffledMainDeck, setShuffledMainDeck] = useState<card[]>(MAIN_DECK_ALL_CARDS);

  const resetGame = useCallback(() : void => {
    setShuffledMainDeck(shuffleCards(shuffledMainDeck));
    setMainDeckIndex(0);
    setGameWinnerIndex(NaN);
    setPlayers([
      createPlayer('player1'),
      createPlayer('player2')
    ]);
    resetRound();
  }, []);

  /**
   * @i index of winning player
   */
  const resetRound = useCallback((i: number = NaN) : void=> {
    // TODO: Draw card for losing player
    if (players.length) {
      let gameWon: boolean = false;
      if (i !== -1) {
        setPlayers(players.map((player: player, index: number) : player => {
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
        setPlayers(players.map((player: player) : player => {
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
  }, [players, shuffledMainDeck]);

  const switchPlayer = () :void => {
    if (roundContinues) {
      setPlayerIndex(nextPlayerIndex);
    }
  }

  const drawMainDeckCard = () :card => {
    const card = shuffledMainDeck[mainDeckIndex];
    setMainDeckIndex(mainDeckIndex + 1);
    return card;
  }

  useEffect(() : void => {
    if (mainDeckIndex === shuffledMainDeck.length) {
      setShuffledMainDeck(shuffleCards(shuffledMainDeck));
      setMainDeckIndex(0);
    }
  }, [mainDeckIndex]);

  // Check for game and round winner
  useEffect(() : void => {
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

  const playHouseCard = () : void => {
    const nextCard = drawMainDeckCard();
    const playerBoard : (card|null)[] = players[playerIndex].board;
    const updatedBoard = [...playerBoard];
    updatedBoard[playerBoard?.indexOf(null)] = nextCard;
    setPlayers(players.map((player: player, index: number) : player => {
      return index === playerIndex ? {...player, board: updatedBoard} : player
    }))
  }

  const playHandCard = (cardIndex: number) : void => {
    const playerBoard : (card|null)[] = players[playerIndex].board;
    const updatedBoard = [...playerBoard];
    const playerHand : card[] = players[playerIndex].hand;
    const updatedHand: card[] = playerHand.map((handCard: card, i: number) : card => {
      if (i === cardIndex) {
        updatedBoard[playerBoard?.indexOf(null)] = handCard;
        return {...handCard, played: true};
      }
      return handCard;
    });
    setPlayers(players.map((player: player, index: number) : player => {
      return index === playerIndex ? {...player, board: updatedBoard, hand: updatedHand} : player
    }))
  }

  const flipPlusMinusCard = (cardIndex: number) : void => {
    const playerHand : card[] = players[playerIndex].hand;
    const updatedHand: card[] = playerHand.map((handCard: card, i: number) : card => {
      if (i === cardIndex) {
        const newSign: string = handCard?.sign === 'PLUS' ? 'MINUS' : 'PLUS';
        const newValue: number = -handCard?.value;
        return {...handCard, sign: newSign, value: newValue}
      }
      return handCard;
    });
    setPlayers(players.map((player: player, index: number): player => {
      return index === playerIndex ? {...player, hand: updatedHand} : player
    }))
  }

  useEffect(() : void => {
    if (isNaN(playerIndex)) {
      return;
    }
    // Draw card on player turn start
    if (roundContinues) {
      playHouseCard();
    }
  }, [roundContinues, playerIndex])

  return <div className={`table`} style={styles.boardsContainer}>
      <dialog open={!roundContinues}
        style={styles.dialog}
      >
        {!isNaN(gameWinnerIndex) 
        ? <div>
            <p>{gameWinnerIndex} wins game</p>
            <button onClick={() => setGameWinnerIndex(-1)}>Quit</button>
            <button onClick={resetGame}>Play Again</button>
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

      const stand = () : void => {
        const playerToModify = {...players[index], stand: true};
        const out = [...players];
        out[index] =  playerToModify;
        setPlayers(out);
        if (cardScore > 20) {
          setRoundWinnerIndex(otherPlayerIndex);
          return;
        }
        if (!players[otherPlayerIndex].stand) {
          switchPlayer()
        }
      }

      const cardScore: number = sumCardValues(player.board);

      const boardDisabled: boolean = 
        !roundContinues || 
        !isPlayersTurn || 
        player?.stand || 
        player?.board?.indexOf(null) === -1;

      const endTurn = () : void => {
        if (cardScore > 20) {
          setRoundWinnerIndex(otherPlayerIndex);
          return; 
        }
        if (players[otherPlayerIndex].stand) {
          if (cardScore < 20 && roundContinues) {
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

      return <div key={player.name} style={styles.boardContainer}>
        <Board 
          playerIndex={index}
          player={player}
          cardScore={cardScore}
          isPlayersTurn={isPlayersTurn}
          stand={stand}
          endTurn={endTurn}
          playHandCard={playHandCard}
          flipPlusMinusCard={flipPlusMinusCard}
          disabled={boardDisabled}
        />   
        </div>
    })}
  </div>
}

export default MainGame;

const styles: {[key: string]: CSSProperties} = {
  boardsContainer: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row' as 'row',
    position: 'relative' as 'relative'
  },
  boardContainer: {
    display: 'flex', 
    flexDirection: 'column' as 'column', 
    margin: 'auto'},
  dialog: {
    width: '600px',
    height: '400px',
    position: 'fixed' as 'fixed',
    top: '50%',
    left:' 50%',
    transform: 'translateX(-50%) translateY(-50%)',
    zIndex: 1,
    backgroundColor: '#ffffff60'
 }
}