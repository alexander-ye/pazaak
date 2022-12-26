import React, { CSSProperties, useEffect} from 'react';
import { card, player} from '../../types';
import Card from '../Card/Card';

const Board = ({
  playerIndex,
  player,
  cardScore,
  isPlayersTurn, 
  stand,
  endTurn,
  playHouseCard,
  playHandCard,
  disabled,
  }: {
    playerIndex: number,
    player: player,
    cardScore: number,
    isPlayersTurn: boolean,
    stand: any,
    endTurn: any,
    playHouseCard: any,
    playHandCard: any,
    disabled: boolean,
  }) => {
  useEffect(() => {
    // On turn start
    if (isPlayersTurn) {
      playHouseCard();
    }
  }, [isPlayersTurn]);

  useEffect(() => {
    if (cardScore === 20) {
      stand() 
    }
  }, [cardScore]);

  const {name, board, hand, score}: any = player;

  return (
  <div className={`table`}>
    <div className='board-container' style={styles.boardContainer}>
      <div style={{display: 'flex', flexDirection: playerIndex === 0 ? 'row' : 'row-reverse', justifyContent: 'space-between', border: '2px solid red'}}>
        <div style={{display: 'flex', flexDirection: 'column', position: 'absolute',
          left: playerIndex === 0 ? '-36px' : 'auto',
          right: playerIndex === 0 ? 'auto' : '-36px',
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
          return <Card key={`card-slot-${index}`} card={card} style={{border: `2px solid ${card === null ? 'pink' : card?.deck === 'MAIN' ? 'blue' : 'springgreen'}`}} />
        })}
      </div>
    </div>
    {/* Card score */}
    <p>{cardScore}</p>
    {/* Hand */}
    <div style={{display: 'flex', flexDirection: 'row'}}>
      {hand.map((card: card) => {
        return <Card key={`${card.type}-${card.sign}-${card.value}`} card={card} playCard={playHandCard} playable={!disabled}/>
      })}
    </div>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <button 
        onClick={endTurn} 
        disabled={disabled}>End Turn</button>
      <button onClick={() => stand()} disabled={disabled}>Stand</button>
    </div>
  </div>
)}

export default Board;

const styles: {[key: string]: CSSProperties} = {
  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 102px)',
    gridTemplateRows: 'repeat(3, 162px)',
    justifyContent: 'center',
    gridGap: '0px',
    border: '2px solid pink'
  }
}

const GameScore = ({playerScore= 0}: {playerScore: number}) => {
  return <div style={{display: 'flex', flexDirection: 'column'}}>
    {[1, 2, 3].map((i: number) => {
      return <div 
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