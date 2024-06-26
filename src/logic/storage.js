export const saveGameToStorage = (board, turn) => {
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

export const removeGameStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};

export const savePlayersToStorage = (players, counter) => {
  window.localStorage.setItem("players", JSON.stringify(players));
  window.localStorage.setItem("iconsCounter", counter);
};
