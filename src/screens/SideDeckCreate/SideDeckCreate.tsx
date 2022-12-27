import React, { Dispatch, SetStateAction, useState } from 'react';
import Card from '../../components/Card/Card';
import { card } from '../../types';
import { SIDE_DECK_ALL_CARDS } from '../../utils/cards';

const SideDeckCreate = (
  {setPlayerSideDeck}: 
  {setPlayerSideDeck: Dispatch<SetStateAction<card[]>>}) => {

  const [selectedCards, setSelectedCards] = useState<card[]>([]);
  return <div>
    {SIDE_DECK_ALL_CARDS.map((card: card) => {
      return <div>
          <Card card={card} />
        </div>
    })}
    {selectedCards.map((card: card) => {
      return <Card card={card} />
    })}
  </div>
}

export default SideDeckCreate;