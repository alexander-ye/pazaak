import React, { CSSProperties, useEffect, useState } from 'react';
import { card } from '../../types';
import { TEST_HAND } from '../../utils/cards';
import Card from '../Card/Card';

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
      // On turn start
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
  
  const playHandCard = (card: card | null) => {
    const out = [...cards];
    out[cards.indexOf(null)] = card;
    setCards(out);
  }

  return <div className={`table`}>
  <div className='board-container' style={styles.boardContainer}>
    <h2>{player.name}</h2>
    {/* Played cards */}
    <div className='cards-container' style={styles.cardsContainer}>
      {cards.map((card: card | null, index: number) => {
        return <Card key={`card-slot-${index}`} card={card} />
      })}
    </div>
  </div>
  {/* Card score */}
  <p>{cards.reduce((prev: number, card: card | null) => {
    if (card === null) {
      return prev;
    } 
    return prev + card.value;
  }, 0)}</p>
  {/* Hand */}
  <div style={{display: 'flex', flexDirection: 'row'}}>
    {TEST_HAND.map((card: card) => {
      return <Card key={`${card.type}-${card.sign}-${card.value}`} card={card} playCard={playHandCard} playable={isPlayersTurn}/>
    })}
  </div>
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