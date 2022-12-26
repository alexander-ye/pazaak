import React, { CSSProperties } from 'react';

const Card = ({card, onClick}: any) => {
  if (card) {
    return <div className="card-container" style={styles.cardContainer} onClick={onClick}>
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
    border: '1px solid blue',
  }
}