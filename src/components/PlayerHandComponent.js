import React from "react";
import CardComponent from "./CardComponent";

const PlayerHandComponent = ({
  hidden,
  player,
  handDisabled,
  playHandCard,
  switchCardSign,
}) => {
  console.log(player.hand);
  if (hidden) {
    return (
      <div className="playerHand">
        <h2>Player Hand</h2>
        <ul>
          {player.hand.map((card) => (
            <li>
              <CardComponent
                handDisabled={handDisabled}
                cardSum={player.cardSum}
                playCard={playHandCard}
                cardObject={card}
                hidden={hidden}
                cardPlayed={card.played}
                switchCardSign={switchCardSign}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="playerHand">
        <h2>Player Hand</h2>
        <ul>
          {player.hand.map((card) => (
            <li>
              <CardComponent
                handDisabled={handDisabled}
                cardSum={player.cardSum}
                playCard={playHandCard}
                cardObject={card}
                hidden={false}
                cardPlayed={card.played}
                switchCardSign={switchCardSign}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default PlayerHandComponent;
