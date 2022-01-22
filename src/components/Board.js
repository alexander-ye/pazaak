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
        <BoardCardContainer card={cardsPlayed[0]} />
        <BoardCardContainer card={cardsPlayed[1]} />
        <BoardCardContainer card={cardsPlayed[2]} />
      </div>
      <div className="boardRow" style={boardRowStyle}>
        <BoardCardContainer card={cardsPlayed[3]} />
        <BoardCardContainer card={cardsPlayed[4]} />
        <BoardCardContainer card={cardsPlayed[5]} />
      </div>
      <div className="boardRow" style={boardRowStyle}>
        <BoardCardContainer card={cardsPlayed[6]} />
        <BoardCardContainer card={cardsPlayed[7]} />
        <BoardCardContainer card={cardsPlayed[8]} />
      </div>
    </div>
  );
};

export default Board;
