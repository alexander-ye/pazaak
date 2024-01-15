import { Box, Container, Grid } from "@mui/material";

const Board = ({ player }: any) => {
  if (!player) return null;
  const { board } = player;

  if (!board) return null;

  return (
    // https://mui.com/material-ui/react-grid/
    <Container sx={{ width: 480, height: 640 }}>
      <Grid
        container
        spacing={1}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        {board.map((slot: Card | null, index: number) => (
          <Grid key={index} item xs={4}>
            <Box
              sx={{ height: "100%", width: "100%", bgcolor: "primary.main" }}
            >
              {slot?.value ? slot.value : null}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Board;
