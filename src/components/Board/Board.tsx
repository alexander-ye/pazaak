import React, { CSSProperties, useEffect, useState } from 'react';
import { card } from '../../types';
import { TEST_HAND } from '../../utils/cards';
import Card from '../Card/Card';
import Hand from '../Hand/Hand';

const Board = ({
  player, 
  setPlayerIndex, 
  drawMainDeckCard, 
  isPlayersTurn, 
  switchPlayer, 
  opponentStanding}: any) => {
  // useState to keep track of cards, points, etc here.
  const [cards, setCards] = useState<((card | null)[])>(new Array(9).fill(null))

  useEffect(() => {
    if (isPlayersTurn) {
      // on turn start
      const nextCard = drawMainDeckCard();
      const out = [...cards];
      out[cards.indexOf(null)] = nextCard;
      setCards(out);
    }
  }, [isPlayersTurn]);

  const endTurn = () => {
    if (opponentStanding) {
      const nextCard = drawMainDeckCard();
    } else {
      switchPlayer();
    }
  }
  
  return <div className={`table`}>
  <div className='board-container' style={styles.boardContainer}>
    <h2>{player.name}</h2>
    <div className='cards-container' style={styles.cardsContainer}>
      {cards.map((card: card | null, index: number) => {
        return <Card key={`card-slot-${index}`} card={card} />
      })}
    </div>
  </div>
  <p>{cards.reduce((prev: number, card: card | null) => {
    if (card === null) {
      return prev;
    } 
    return prev + card.value;
  }, 0)}</p>
  <Hand hand={TEST_HAND} isTurn={isPlayersTurn} />
  <div style={{display: 'flex', flexDirection: 'row'}}>
    <button onClick={switchPlayer} disabled={!isPlayersTurn}>End Turn</button>
    <button onClick={() => console.log('TODO: STAND')} disabled={!isPlayersTurn}>Stand</button>
  </div>
  </div>
}

export default Board;

const styles: {[key: string]: CSSProperties} = {
  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  }
}