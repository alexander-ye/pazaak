import React, { CSSProperties } from 'react';
import { card } from '../../types';
import { getCardBackgroundColor } from '../../utils/cards';

const Card = ({card, onClick, subOnClick, style}: {card: card | null, onClick?: any, subOnClick?: any, style?:CSSProperties | undefined}) => {

  if (card) {
    // Todo: onclick flip
    const backgroundColor: any = getCardBackgroundColor(card);
    return (
      <div className="card-container" style={{...styles.cardContainer, border: `2px solid ${card.played ? 'brown' : backgroundColor}`, ...style}}>
        <div style={{backgroundColor: backgroundColor, flex: 1}} onClick={onClick}>
          <p>{card.value}</p>
        </div>
        {onClick 
        ? <div 
          className={`flex-row`} style={{alignItems: 'center', justifyContent: 'center', height: '1.2rem', borderRadius: '4px'}}
          onClick={subOnClick}
          >
          {card.type === 'PLUSMINUS' 
            ? <p>{`${card.sign === 'PLUS' ? '+/-' : '-/+'}`}</p> 
            : card.type === 'FLIP' 
              ? <p>flip</p> 
              : null }
          </div> 
        : null}
      </div>
    )
  } return <div className="card-slot" style={{...styles.cardContainer, ...style}}>
    <p>N</p>
  </div>

}

export default Card;

const styles : {[key: string]: CSSProperties } = {
  cardContainer: {
    width: '100px',
    height: '160px',
    border: '1px solid pink',
    display: 'flex',
    flexDirection: 'column'
  },
}