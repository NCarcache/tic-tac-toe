import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import WinnerModal from "./components/WinnerModal";
import {
  changeBoardIcons,
  changeTurnEmoji,
  checkEndGame,
  checkWinner,
} from "./logic/board";
import Square from "./components/Square";
import { O_ICONS, X_ICONS } from "./constants";
import {
  removeGameStorage,
  saveGameToStorage,
  savePlayersToStorage,
} from "./logic/storage";

function App() {
  const [players, setPlayers] = useState(() => {
    const playersFromStorage = window.localStorage.getItem("players");
    return playersFromStorage
      ? JSON.parse(playersFromStorage)
      : { X: "✖️", O: "⭕" };
  });

  const [iconsCounter, setIconsCounter] = useState(() => {
    const iconsCounterFromStorage = window.localStorage.getItem("iconsCounter");
    return iconsCounterFromStorage ? Number(iconsCounterFromStorage) : 0;
  });

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? players.X;
  });

  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === players.X ? players.O : players.X;
    setTurn(newTurn);
    saveGameToStorage(newBoard, newTurn);

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      confetti({
        shapes: [confetti.shapeFromText({ text: "😵‍💫", scalar: 2 })],
        scalar: 2,
        flat: true,
      });
    }
  };

  const changePlayersIcon = () => {
    let counter = iconsCounter + 1;

    if (counter === X_ICONS.length) {
      counter = 0;
    }

    const newPlayers = { X: X_ICONS[counter], O: O_ICONS[counter] };
    setPlayers(newPlayers);
    console.log(counter);
    setIconsCounter(counter);
    savePlayersToStorage(newPlayers, counter);
  };

  useEffect(() => {
    const player = changeTurnEmoji(turn);
    const newTurn = players[player];
    setTurn(newTurn);

    const newBoard = changeBoardIcons(board, players.X, players.O);
    setBoard(newBoard);

    saveGameToStorage(newBoard, newTurn);
  }, [players]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(players.X);
    setWinner(null);

    removeGameStorage();
  };

  return (
    <main className="game">
      <h1 className="game-title">Tic Tac Toe</h1>

      <section className="turn">
        <button className="turn-button" onClick={changePlayersIcon}>
          {players.X}
          {players.O}
        </button>
        <p className="turn-title">{turn} Turn</p>
        <button className="turn-button" onClick={resetGame}>
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </section>

      <section className="board">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
