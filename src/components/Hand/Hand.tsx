import React from 'react';
import { card } from '../../types';
import Card from '../Card/Card';

const Hand = ({hand}: {hand: card[]}) => {
  // useState to keep track of cards playd here
  return <div style={{display: 'flex', flexDirection: 'row'}}>
    {hand.map((card: card) => {
      console.log(card)
      return <Card card={card}/>
    })}
  </div>
}

export default Hand;