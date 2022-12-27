import React, { useState } from 'react';
import _ from 'lodash';
import MainGame from './screens/MainGame/MainGame';
import { card } from './types';
import SideDeckCreate from './screens/SideDeckCreate/SideDeckCreate';

// TODO: Choose side deck screen
// 
const Game = () => {  
  const [playerSideDeck, setPlayerSideDeck] = useState<card[]>([]);

  // if (playerSideDeck.length) {
    return <MainGame />
  // }
  // return <SideDeckCreate setPlayerSideDeck={setPlayerSideDeck} />
}

export default Game;