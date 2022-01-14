import React from "react";

const boardCardContainerStyle = {
  flex: "1",
  backgroundColor: "blue",
  border: "1px solid red",
};

const textStyle = {
  color: "white",
  fontFamily: "sans serif",
  fontWeight: "bold",
  textAlign: "center",
};

const BoardCardContainer = ({ i }) => {
  if (i === 0) {
    return (
      <div className="boardCardContainer" style={boardCardContainerStyle}>
        <p style={textStyle}>NO CARD</p>
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
