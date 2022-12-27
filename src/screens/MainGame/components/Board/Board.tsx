import React, { CSSProperties, useEffect} from 'react';
import { card, player} from '../../../../types';
import Card from '../../../../components/Card/Card';

const Board = ({
  playerIndex,
  player,
  cardScore,
  isPlayersTurn, 
  stand,
  endTurn,
  playHandCard,
  flipPlusMinusCard,
  disabled,
  }: {
    playerIndex: number,
    player: player,
    cardScore: number,
    isPlayersTurn: boolean,
    stand: () => void,
    endTurn: () => void,
    playHandCard: (card: card, index: number) => void,
    flipPlusMinusCard: (cardIndex: number) => void,
    disabled: boolean,
  }) => {
  useEffect(() => {
    if (cardScore === 20) {
      stand() 
    }
  }, [cardScore]);

  const {name, board, hand, score}: player = player;

  return (
  <div className={`table`}>
    <div className='flex-col board-container' style={styles.boardContainer}>
      <div className={`${playerIndex === 0 ? 'flex-row' : 'flex-row-reverse'}`} style={{justifyContent: 'space-between', alignItems: 'center'}}>
        <div className={`flex-col`} style={{position: 'absolute',
          left: playerIndex === 0 ? '-36px' : 'auto',
          right: playerIndex === 0 ? 'auto' : '-36px',
          top: '4px',
          alignItems: 'center',
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '28px',
          backgroundColor: isPlayersTurn ? 'red' : 'brown',
          marginBottom: '4px'
      }}/>
        <GameScore playerScore={score} />
        </div>
      <h2>{name}</h2>
      <h3>{cardScore}</h3>
      </div>
      {/* Played cards */}
      <div className='cards-container' style={styles.cardsContainer}>
        {board.map((card: card | null, index: number) => {
          return <Card key={`card-slot-${index}`} card={card} />
        })}
      </div>
    </div>
    {/* Hand */}
    <div className={`flex-row`}>
      {hand.map((card: card, index: number) => {
        const onClick = !disabled && !card.played ? () : void => playHandCard(card, index) : undefined;
        const subOnClick = card.type === 'PLUSMINUS' ? () : void => flipPlusMinusCard(index) : undefined;
        return <Card 
          key={`${card.type}-${card.sign}-${card.value}`} 
          card={card} 
          onClick={onClick}
          subOnClick={subOnClick}
        />
      })}
    </div>
    <div className={`flex-row`}>
      <button 
        onClick={endTurn} 
        disabled={disabled}>End Turn</button>
      <button onClick={stand} disabled={disabled}>Stand</button>
    </div>
  </div>
)}

export default Board;

const styles: {[key: string]: CSSProperties} = {
  boardContainer: {
    position: 'relative'
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 102px)',
    gridTemplateRows: 'repeat(3, 162px)',
    justifyContent: 'center',
    gridGap: '0px',
  }
}

const GameScore = ({playerScore= 0}: {playerScore: number}) => {
  return <div className={`flex-col`}>
    {[1, 2, 3].map((i: number) => {
      return <div 
        key={i}
        style={{
          margin: '8px 6px',
          width: '20px',
          height: '20px',
          borderRadius: '20px',
          backgroundColor: i <= playerScore ? 'green' : 'brown'
        }}
      />
    })}
  </div>
}