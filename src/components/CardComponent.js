import React, { useEffect, useState } from "react";

const CardComponent = ({
  handDisabled,
  cardSum,
  playCard,
  cardNumber,
  kind,
}) => {
  const [value, setValue] = useState(0);
  const [sign, setSign] = useState("positive");
  const [signSwitchable, setSignSwitchable] = useState(false);
  const [valueSwitchable, setValueSwitchable] = useState(false);
  const [played, setPlayed] = useState(false);

  const setCardValue = (number) => {
    if (number > 0 && number < 7) {
      setValue(number);
    } else if (number > -7 && number < 0) {
      setValue(number);
      setSign("negative");
    } else {
      if (number < 13) {
        setSignSwitchable(true);
      }
      switch (number) {
        case 7:
          setValue(1);
          break;
        case 8:
          setValue(2);
          break;
        case 9:
          setValue(3);
          break;
        case 10:
          setValue(4);
          break;
        case 11:
          setValue(5);
          break;
        case 12:
          setValue(6);
          break;
        case 13:
          // +/- 1 or 2
          setValue(1);
          break;
        case 100:
          setValue(1);
          break;
      }
    }
  };

  const logCard = () => {
    console.log(value);
    console.log(sign);
    console.log(signSwitchable);
    console.log(valueSwitchable);
  };

  const useCard = () => {
    if (!played) {
      logCard();
      setPlayed(true);
      playCard(value);
    }
  };

  const switchSign = () => {
    if (signSwitchable) {
      setValue(-value);
      if (sign === "positive") {
        setSign("negative");
      } else {
        setSign("positive");
      }
    }
  };

  useEffect(() => {
    setCardValue(cardNumber);
  }, []);

  if (signSwitchable) {
    return (
      <div className="pazaakCard">
        {/* <p className="pazaakCardNumber">{value}</p> */}
        <button onClick={useCard} disabled={played || handDisabled}>
          {value}
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
          {value}
        </button>
      </div>
    );
  }
};

export default CardComponent;
