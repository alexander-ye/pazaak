import { Box, Button, Container, Grid, IconButton, Stack } from "@mui/material";
import Board from "./Board";
import SyncIcon from "@mui/icons-material/Sync";
import React, { useState } from "react";
import { useGameContext } from "@/contexts/GameContext";

const GameTable = () => {
  const { players, dealMainDeckCard, switchPlayer, resetTable, resetGame } =
    useGameContext();
  return (
    <Container>
      <Stack style={{ border: "2px solid cyan" }}>
        <Stack direction="row" style={{ border: "1px solid red" }}>
          {players.map((player: any, playerIndex: 0 | 1) => {
            return (
              <Container key={playerIndex} style={{ border: "1px solid pink" }}>
                <Stack
                  justifyContent="center"
                  style={{ border: "1px solid green" }}
                >
                  <Board player={player} />
                  <Stack direction="row" justifyContent="center" flex={1}>
                    {player.hand.map((card: Card, index: number) => {
                      return (
                        <PlayableCard
                          key={index}
                          playerIndex={playerIndex}
                          card={card}
                        />
                      );
                    })}
                  </Stack>
                </Stack>
              </Container>
            );
          })}
        </Stack>
        <Button onClick={dealMainDeckCard}>Deal Main Deck Card</Button>
        <Button onClick={switchPlayer}>Switch Player</Button>
        <Button onClick={resetTable}>Reset Table</Button>
        <Button onClick={resetGame}>Reset Game</Button>
      </Stack>
    </Container>
  );
};

export default GameTable;

const PlayableCard = ({
  card,
  playerIndex,
}: {
  card: Card;
  playerIndex: 0 | 1;
}) => {
  const { playCard } = useGameContext();
  const [value, setValue] = useState<number>(card.value);
  const [played, setPlayed] = useState<boolean>(false);

  const handleSwitchClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setValue(-1 * value);
  };

  const handlePlayCard = () => {
    console.log(playerIndex);
    if (played) return;
    const cardToPlay = {
      ...card,
      value: value,
    };
    playCard(cardToPlay, playerIndex);
    setPlayed(true);
  };

  return (
    <Button
      onClick={handlePlayCard}
      disabled={played}
      sx={{
        width: "100px",
        height: "140px",
        position: "relative",
      }}
      style={{
        border: "1px solid skyblue",
      }}
    >
      {card.type === "plus-minus" ? (
        <IconButton
          disabled={played}
          onClick={handleSwitchClick}
          sx={{ position: "absolute", top: 0, left: 0 }}
        >
          <SyncIcon />
        </IconButton>
      ) : null}
      {value}
    </Button>
  );
};
