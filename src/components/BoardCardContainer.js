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

const textStyle = {
  color: "white",
  fontFamily: "sans serif",
  fontWeight: "bold",
  textAlign: "center",
};

const BoardCardContainer = ({ i, cardType }) => {
  if (i === 0) {
    return (
      <div className="boardCardContainer" style={boardCardContainerStyle}>
        <p style={textStyle}>NO CARD</p>
      </div>
    );
  } else if (cardType === "mainDeck") {
    return (
      <div className="boardCardContainer" style={boardCardContainerStyle}>
        <p style={textStyle}>{i}</p>
      </div>
    );
  } else if (cardType === "plus") {
    return (
      <div className="boardCardContainer" style={boardCardContainerStyle}>
        <p style={textStyle}>{i}</p>
      </div>
    );
  } else if (cardType === "minus") {
    return (
      <div className="boardCardContainer" style={boardCardContainerStyle}>
        <p style={textStyle}>{i}</p>
      </div>
    );
  } else {
    return (
      <div className="boardCardContainer" style={boardCardContainerStyle}>
        <p style={textStyle}>{i}</p>
      </div>
    );
  }
};

export default BoardCardContainer;
