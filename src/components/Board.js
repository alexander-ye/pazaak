import React from "react";
import BoardCardContainer from "./BoardCardContainer";

const boardContainerStyle = {
  width: "400px",
  height: "600px",
  marginLeft: "10px",
  marginRight: "10px",
  marginTop: "10px",
  marginBottom: "10px",
  display: "flex",
  flexDirection: "column",
};

const boardRowStyle = {
  display: "flex",
  flexDirection: "row",
  flex: "1",
};

const Board = ({ cardsPlayed, setCardsPlayed }) => {
  return (
    <div className="boardContainer" style={boardContainerStyle}>
      <div className="boardRow" style={boardRowStyle}>
        <BoardCardContainer i={cardsPlayed[0]} />
        <BoardCardContainer i={cardsPlayed[1]} />
        <BoardCardContainer i={cardsPlayed[2]} />
      </div>
      <div className="boardRow" style={boardRowStyle}>
        <BoardCardContainer i={cardsPlayed[3]} />
        <BoardCardContainer i={cardsPlayed[4]} />
        <BoardCardContainer i={cardsPlayed[5]} />
      </div>
      <div className="boardRow" style={boardRowStyle}>
        <BoardCardContainer i={cardsPlayed[6]} />
        <BoardCardContainer i={cardsPlayed[7]} />
        <BoardCardContainer i={cardsPlayed[8]} />
      </div>
    </div>
  );
};

export default Board;
