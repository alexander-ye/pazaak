import React, { CSSProperties, useState } from 'react';
import { card } from '../../types';

const Card = ({card, playCard, playable}: {card: card | null, playCard?: any, playable?: any}) => {

  if (card) {
    const onClick = playCard && playable && !card.played 
      ? () => {playCard(card);} 
      : undefined;
    return <div className="card-container" style={{...styles.cardContainer, border: `1px solid ${card.played ? 'brown' : 'blue'}`}} onClick={onClick}>
    <p>{card.value}</p>
  </div>
  } return <div className="card-slot" style={styles.cardContainer}>
    <p>N</p>
  </div>

}

export default Card;

const styles : {[key: string]: CSSProperties } = {
  cardContainer: {
    width: '84px',
    height: '160px',
    margin: '0px 3px',
    border: '1px solid blue'
  }
}