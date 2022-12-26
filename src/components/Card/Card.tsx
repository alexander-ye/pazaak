import React, { CSSProperties, useState } from 'react';
import { card } from '../../types';

const Card = ({card, playCard, playable, style}: {card: card | null, playCard?: any, playable?: any, style?:CSSProperties | undefined}) => {

  if (card) {
    const onClick = playCard && playable && !card.played 
      ? () => {playCard(card);} 
      : undefined;
    return <div className="card-container" style={{...styles.cardContainer, border: `2px solid ${card.played ? 'brown' : 'blue'}`, ...style}} onClick={onClick}>
    <p>{card.value}</p>
  </div>
  } return <div className="card-slot" style={{...styles.cardContainer, ...style}}>
    <p>N</p>
  </div>

}

export default Card;

const styles : {[key: string]: CSSProperties } = {
  cardContainer: {
    width: '100px',
    height: '160px',
    border: '1px solid blue'
  }
}