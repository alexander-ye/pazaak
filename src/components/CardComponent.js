import React, { useEffect, useState } from "react";

const CardComponent = ({
  handDisabled,
  cardSum,
  playCard,
  cardNumber,
  cardObject,
}) => {
  const [card, setCard] = useState(cardObject);
  const [played, setPlayed] = useState(false);

  const logCard = () => {
    console.log(card);
  };

  const useCard = () => {
    if (!played) {
      logCard();
      setPlayed(true);
      playCard(card);
    }
  };

  const switchSign = () => {
    console.log(card.signSwitchable);
    if (card.signSwitchable) {
      const out = { ...card };
      out.value = -card.value;
      if (card.sign === "plus") {
        out.sign = "minus";
      } else {
        out.sign = "plus";
      }
      setCard(out);
    }
  };

  if (card.signSwitchable) {
    return (
      <div className="pazaakCard">
        {/* <p className="pazaakCardNumber">{value}</p> */}
        <button onClick={useCard} disabled={played || handDisabled}>
          {card.value}
        </button>
        <button onClick={switchSign} disabled={played || handDisabled}>
          SWITCH
        </button>
      </div>
    );
  } else {
    return (
      <div className="pazaakCard">
        {/* <p className="pazaakCardNumber">{value}</p> */}
        <button onClick={useCard} disabled={played || handDisabled}>
          {card.value}
        </button>
      </div>
    );
  }
};

export default CardComponent;
