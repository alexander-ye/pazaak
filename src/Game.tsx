import React, { createContext, CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import Board from './components/Board/Board';
import Hand from './components/Hand/Hand';
import { card } from './types';
import { createMainDeck, shuffleCards } from './utils/cards';


const mainDeck: card[] = createMainDeck();
const sideDeck: card[] = [1, 2, 3, 4, 5, 6].flatMap(i => [-i, i]).map((value) => {
  return {
    sign: value > 0 ? 'PLUS' : 'MINUS',
    value,
    type: 'NORMAL'
  }
});
const specialCards = [
  {
    sign: 'ZERO',
    value: 0,
    type: 'FLIP',
    flipValues: [2, 4]
  },
  {
    sign: 'ZERO',
    value: 0,
    type: 'FLIP',
    flipValues: [3,6]
  },
  {
    sign: 'ZERO',
    value: 0,
    type: 'TIEBREAKER'
  }
]

const GameContext = createContext({});

const Game = () => {
  // const rulesOfTheGame = ```
  // Pazaak used two decks.

  // The Main Deck consisted of four sets of cards numbered 1 to 10.

  // The Side Deck consisted of ten unique cards the player chose before the match.

  // At the start of each game, four of these cards were chosen at random for the player to keep
  // in their hand and play at any time they desired.
  // ```
  // points: number of rounds won
  // score: cards add up to this number this round
  // stand: player standing?
  // cards played: if 9, board is filled and can't fill anymore
  
  const [currentPlayerId, setCurrentPlayerId] = useState<string>('player1');
  const [players, setPlayers] = useState({
    player1: {
      name: 'player1',
      points: 0,
      score: 0,
      stand: false,
      hand: [null, null, null, null],
      bot: false,
    },
    player2: {
      name: 'player2',
      points: 0,
      score: 0,
      stand: false,
      hand: [null, null, null, null],
      bot: false,
    }
  });

  const [shuffledMainDeck, setShuffledMainDeck] = useState<card[]>(mainDeck)

  const resetGame = useCallback(() => {
    setPlayers({player1: {
      name: 'player1',
      points: 0,
      score: 0,
      stand: false,
      hand: [null, null, null, null],
      bot: false,
    },
    player2: {
      name: 'player2',
      points: 0,
      score: 0,
      stand: false,
      hand: [null, null, null, null],
      bot: false,
    }});
    setCurrentPlayerId('player1');
    shuffleCards(mainDeck);
    setShuffledMainDeck(shuffleCards(shuffledMainDeck))
  }, [shuffledMainDeck]);

  const [mainDeckIndex, setMainDeckIndex] = useState(0);

  return <div className={`game-container`} style={styles.boardsContainer}>
    {Object.entries(players).map(([key, player]) => {
      return <div key={key} style={{display: 'flex', flexDirection: 'column'}}>
        <Board 
          player={player} 
          setCurrentPlayerId={setCurrentPlayerId} 
          shuffledMainDeck={shuffledMainDeck} 
          mainDeckIndex={mainDeckIndex} 
          setMainDeckIndex={setMainDeckIndex} />
        <Hand hand={player.hand} />
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

// https://starwars.fandom.com/wiki/Pazaak/Legends