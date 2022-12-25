import React from 'react';

const Card = ({value, onClick}: any) => {
  return <div className="card-container" onClick={onClick}>
    <p>{value}</p>
  </div>
}

export default Card;