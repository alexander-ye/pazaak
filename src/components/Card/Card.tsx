import React, { CSSProperties } from 'react';

const Card = ({value, onClick}: any) => {
  return <div className="card-container" style={styles.cardContainer} onClick={onClick}>
    <p>{value}</p>
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