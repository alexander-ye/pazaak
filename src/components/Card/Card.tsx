import React, { CSSProperties, useState } from 'react';
import { card } from '../../types';

const Card = ({card, playCard, playable}: {card: card | null, playCard?: any, playable?: any}) => {
  const [played, setPlayed] = useState<boolean>(false);

  if (card) {
    const onClick = playCard && playable && !played 
      ? () => {playCard(card); setPlayed(true);} 
      : undefined;
    return <div className="card-container" style={{...styles.cardContainer, border: `1px solid ${played ? 'brown' : 'blue'}`}} onClick={onClick}>
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