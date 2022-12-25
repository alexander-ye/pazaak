import React, { createContext, CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import Board from './components/Board/Board';
import Hand from './components/Hand/Hand';
import { card } from './types';
import { MAIN_DECK_ALL_CARDS, shuffleCards, TEST_HAND } from './utils/cards';
import { createPlayer } from './utils/player';

const Game = () => {  
  const [currentPlayerId, setCurrentPlayerId] = useState<string>('player1');
  const [players, setPlayers] = useState({
    player1: createPlayer('player1'),
    player2: createPlayer('player2')
  });

  const [shuffledMainDeck, setShuffledMainDeck] = useState<card[]>(MAIN_DECK_ALL_CARDS)

  const resetGame = useCallback(() => {
    setPlayers({
      player1: createPlayer('player1'),
      player2: createPlayer('player2')
  });
    setCurrentPlayerId('player1');
    setShuffledMainDeck(shuffleCards(shuffledMainDeck))
  }, [shuffledMainDeck]);

  const [mainDeckIndex, setMainDeckIndex] = useState(0);

  return <div className={`game-container`} style={styles.boardsContainer}>
    {Object.entries(players).map(([key, player]) => {
      // TODO: Implement play card + switch turns
      return <div key={key} style={{display: 'flex', flexDirection: 'column'}}>
        <Board 
          player={player} 
          setCurrentPlayerId={setCurrentPlayerId} 
          shuffledMainDeck={shuffledMainDeck} 
          mainDeckIndex={mainDeckIndex} 
          setMainDeckIndex={setMainDeckIndex} />
        <Hand hand={TEST_HAND} />
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