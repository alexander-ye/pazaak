import React from "react";

const boardCardContainerStyle = {
  flex: "1",
  backgroundColor: "blue",
  border: "1px solid red",
};

const BoardCardContainer = ({ i }) => {
  if (i === 0) {
    return (
      <div className="boardCardContainer" style={boardCardContainerStyle}>
        <button>NO CARD</button>
      </div>
    );
  } else {
    return (
      <div className="boardCardContainer" style={boardCardContainerStyle}>
        <button>{i}</button>
      </div>
    );
  }
};

export default BoardCardContainer;
