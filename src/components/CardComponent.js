import React, { useEffect, useState } from "react";

const CardComponent = ({
  handDisabled,
  cardSum,
  playCard,
  cardNumber,
  cardObject,
  hidden,
  cardPlayed,
  switchCardSign,
}) => {
  const card = cardObject;
  const logCard = () => {
    console.log(card);
  };

  const useCard = () => {
    if (!cardPlayed) {
      playCard(cardObject);
    }
  };

  const switchSign = () => {
    switchCardSign(cardObject);
  };

  const hiddenCardstyle = {
    width: "15px",
    height: "15px",
    backgroundColor: "olive",
    border: "3px solid green",
    margin: "2px",
  };

  const hiddenPlayedCardstyle = {
    width: "15px",
    height: "15px",
    backgroundColor: "gray",
    border: "3px solid black",
    margin: "2px",
  };

  if (hidden) {
    if (cardPlayed) {
      return (
        <div className="hiddenPlayedCard" style={hiddenPlayedCardstyle}></div>
      );
    } else {
      return <div className="hiddenCard" style={hiddenCardstyle}></div>;
    }
  } else if (card.signSwitchable) {
    return (
      <div className="pazaakCard">
        {/* <p className="pazaakCardNumber">{value}</p> */}
        <button onClick={useCard} disabled={cardPlayed || handDisabled}>
          {card.value}
        </button>
        <button onClick={switchSign} disabled={cardPlayed || handDisabled}>
          SWITCH
        </button>
      </div>
    );
  } else {
    return (
      <div className="pazaakCard">
        {/* <p className="pazaakCardNumber">{value}</p> */}
        <button onClick={useCard} disabled={cardPlayed || handDisabled}>
          {card.value}
        </button>
      </div>
    );
  }
};

export default CardComponent;
