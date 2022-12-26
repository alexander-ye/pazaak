import React, { CSSProperties, useEffect} from 'react';
import { card, player } from '../../types';
import { sumCardValues, TEST_HAND } from '../../utils/cards';
import Card from '../Card/Card';

const Board = ({
  player, 
  isPlayersTurn, 
  switchPlayer, 
  stand,
  opponentStanding,
  playHouseCard,
  playHandCard
  }: {
    player: player,
    isPlayersTurn: boolean,
    switchPlayer: any,
    stand: any,
    opponentStanding: boolean,
    playHouseCard: any,
    playHandCard: any
  }) => {
  const cardScore: number = sumCardValues(player.board); 
 
  const canInteract: boolean = 
    isPlayersTurn && 
    !player.stand && 
    (player.board.indexOf(null) !== -1 || cardScore < 20);

  const endTurn = () => {
    if (opponentStanding) {
      if (cardScore < 19) {
        playHouseCard();
      } else {
        stand();
      }
    } else {
      if (cardScore > 19) {
        stand();
      } else {
        switchPlayer()
      }
    }}

  useEffect(() => {
    if (isPlayersTurn) {
      // On turn start
      playHouseCard();
    }
  }, [isPlayersTurn]);

  useEffect(() => {
    if (cardScore === 20) {
      stand() 
    }
  }, [cardScore]);

  return <div className={`table`}>
  <div className='board-container' style={styles.boardContainer}>
    <h2>{player.name}</h2>
    <h3>{player.score}</h3>
    {/* Played cards */}
    <div className='cards-container' style={styles.cardsContainer}>
      {player.board.map((card: card | null, index: number) => {
        return <Card key={`card-slot-${index}`} card={card} />
      })}
    </div>
  </div>
  {/* Card score */}
  <p>{cardScore}</p>
  {/* Hand */}
  <div style={{display: 'flex', flexDirection: 'row'}}>
    {TEST_HAND.map((card: card) => {
      return <Card key={`${card.type}-${card.sign}-${card.value}`} card={card} playCard={playHandCard} playable={canInteract}/>
    })}
  </div>
  <div style={{display: 'flex', flexDirection: 'row'}}>
    <button 
      onClick={endTurn} 
      disabled={!canInteract}>End Turn</button>
    <button onClick={() => stand()} disabled={!canInteract}>Stand</button>
  </div>
  </div>
}

export default Board;

const styles: {[key: string]: CSSProperties} = {
  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  }
}