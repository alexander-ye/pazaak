import React, { CSSProperties, useState } from 'react';
import { card } from '../../types';
import CardSlot from '../CardSlot/CardSlot';

const Board = ({player, setPlayer, shuffledMainDeck}: any) => {
  // useState to keep track of cards, points, etc here.
  const [cards, setCards] = useState<(((card | null)[])[])>([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ])

  const onTurnEnd = () => {
    setPlayer({...player, stand: true})
  }
  
  return <div className='board-container'>
    <h2>{player.name}</h2>
    {cards.map((cardRow, rowIndex) => {
      return <div key={`board-row-${rowIndex}`} className='board-row' style={styles.boardRow}>
        {cardRow.map((card: card | null, colIndex: number) => {
          return <CardSlot key={`card-slot-${rowIndex}-${colIndex}`} card={card} />
        })}
        </div>
    })}
  </div>
}

export default Board;

const styles: {[key: string]: CSSProperties} = {
  boardContainer: {
    border: '1px solid black'
  },
  boardRow: {
    display: 'flex',
    flexDirection: 'row'
  }
}