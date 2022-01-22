import React from "react";

const boardCardContainerStyle = {
  flex: "1",
  backgroundColor: "tan",
  border: "3px solid brown",
  borderRadius: "15px",
  marginLeft: "5px",
  marginRight: "5px",
  marginBottom: "10px",
};

const boardCardMainDeckStyle = {
  flex: "1",
  backgroundColor: "green",
  border: "3px solid olive",
  borderRadius: "15px",
  marginLeft: "5px",
  marginRight: "5px",
  marginBottom: "10px",
};

const boardCardPlusStyle = {
  flex: "1",
  backgroundColor: "blue",
  border: "3px solid cyan",
  borderRadius: "15px",
  marginLeft: "5px",
  marginRight: "5px",
  marginBottom: "10px",
};

const boardCardMinusStyle = {
  flex: "1",
  backgroundColor: "red",
  border: "3px solid pink",
  borderRadius: "15px",
  marginLeft: "5px",
  marginRight: "5px",
  marginBottom: "10px",
};

const boardCardPlusMinusStyle = {
  flex: "1",
  backgroundColor: "teal",
  border: "3px solid cyan",
  borderRadius: "15px",
  marginLeft: "5px",
  marginRight: "5px",
  marginBottom: "10px",
};

const boardCardMinusPlusStyle = {
  flex: "1",
  backgroundColor: "teal",
  border: "3px solid cyan",
  borderRadius: "15px",
  marginLeft: "5px",
  marginRight: "5px",
  marginBottom: "10px",
};

const textStyle = {
  color: "white",
  fontFamily: "sans serif",
  fontWeight: "bold",
  textAlign: "center",
};

const BoardCardContainer = ({ card }) => {
  const cardKind = card.kind;
  const cardValue = card.value;
  const cardSign = card.sign;
  const cardSignSwitchable = card.signSwitchable;

  if (cardKind === "cardSlot") {
    return (
      <div className="boardCardContainer" style={boardCardContainerStyle}>
        <p style={textStyle}>NO CARD</p>
      </div>
    );
  } else if (cardKind === "mainDeck") {
    return (
      <div
        className="boardCardContainer mainDeckCard"
        style={boardCardMainDeckStyle}
      >
        <p style={textStyle}>{cardValue}</p>
      </div>
    );
  } else if (cardSign === "plus") {
    return (
      <div className="boardCardContainer" style={boardCardPlusStyle}>
        <p style={textStyle}>{cardValue}</p>
      </div>
    );
  } else if (cardSign === "minus") {
    return (
      <div className="boardCardContainer" style={boardCardMinusStyle}>
        <p style={textStyle}>{cardValue}</p>
      </div>
    );
  } else {
    return (
      <div className="boardCardContainer" style={boardCardPlusMinusStyle}>
        <p style={textStyle}>{cardValue}</p>
      </div>
    );
  }
};

export default BoardCardContainer;
