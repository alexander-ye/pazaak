import React from 'react';
import { card } from '../../types';
import Card from '../Card/Card';

const Hand = ({hand, isTurn=false}: {hand: card[], isTurn: boolean}) => {
  // useState to keep track of cards playd here
  return <div style={{display: 'flex', flexDirection: 'row'}}>
    {hand.map((card: card) => {
      return <Card card={card} key={`${card.type}-${card.sign}-${card.value}`} />
    })}
  </div>
}

export default Hand;