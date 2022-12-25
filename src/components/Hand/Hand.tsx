import React from 'react';
import Card from '../Card/Card';

const Hand = ({hand}: any) => {
  // useState to keep track of cards playd here
  return <div style={{display: 'flex', flexDirection: 'row'}}>
    {hand.map((card: any) => {
      return <Card />
    })}
  </div>
}

export default Hand;