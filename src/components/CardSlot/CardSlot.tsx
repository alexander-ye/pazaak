import React from 'react';
import Card from '../Card/Card';

const CardSlot = ({card}: any) => {
  return <div className="card-slot-container" style={styles.cardSlot}>
    {card ? <Card value={card} /> : null}
  </div>
}

export default CardSlot;

const styles = {
  cardSlot: {
    width: '120px',
    height: '200px',
    border: '1px solid brown',
    margin: '1px'
  }
}