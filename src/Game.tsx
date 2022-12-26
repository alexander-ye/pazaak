import React, { createContext, CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import Board from './components/Board/Board';
import Hand from './components/Hand/Hand';
import { card, player } from './types';
import { MAIN_DECK_ALL_CARDS, shuffleCards, TEST_HAND } from './utils/cards';
import { createPlayer } from './utils/player';

const Game = () => {  
  const [playerIndex, setPlayerIndex] = useState<number>(0);
  const [players, setPlayers] = useState<player[]>([]);
  const [mainDeckIndex, setMainDeckIndex] = useState<number>(0);
  const [shuffledMainDeck, setShuffledMainDeck] = useState<card[]>(MAIN_DECK_ALL_CARDS);

  const resetGame = useCallback(() => {
    setPlayers([createPlayer('player1'),
    createPlayer('player2')]);
    setPlayerIndex(0);
    setShuffledMainDeck(shuffleCards(shuffledMainDeck));
    setMainDeckIndex(0);
  }, [shuffledMainDeck]);

  const switchPlayer = () => {
      setPlayerIndex((playerIndex + 1) % 2);
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
  }, [mainDeckIndex])

  useEffect(() => {
    resetGame()
  }, []);


  return <div className={`table`} style={styles.boardsContainer}>
    {players.map((player: player, index: number) => {
      const isPlayersTurn: boolean = index === playerIndex;
      const otherPlayerIndex: number = (index + 1) % 2;
  
      // TODO: Implement play card + switch turns
      return <div key={player.name} style={{display: 'flex', flexDirection: 'column'}}>
          <Board 
            player={player} 
            setPlayerIndex={setPlayerIndex} 
            drawMainDeckCard={drawMainDeckCard}
            isPlayersTurn={isPlayersTurn}
            switchPlayer={switchPlayer}
            opponentStanding={players[otherPlayerIndex].stand}
          />   
        </div>
    })}
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