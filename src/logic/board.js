import { O_ICONS, WINNER_COMBOS, X_ICONS } from "../constants";

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[b] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }

  return null;
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};

export const changeTurnEmoji = (turn) => {
  return X_ICONS.includes(turn) ? "X" : "O";
};

export const changeBoardIcons = (board, X, O) => {
  return board.map((item) => {
    if (X_ICONS.includes(item)) {
      return X;
    } else if (O_ICONS.includes(item)) {
      return O;
    } else {
      return item;
    }
  });
};
