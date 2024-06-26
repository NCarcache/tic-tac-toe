const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null;

  const resultTitle = winner === false ? "It's a draw" : "Winner";
  const resultEmoji = winner === false ? "😅" : winner;
  return (
    <section className="winner">
      <div className="winner-modal">
        <h2>{resultTitle}</h2>

        <span className="winner-emoji">{resultEmoji}</span>

        <footer>
          <button className="winner-button" onClick={resetGame}>New Game</button>
        </footer>
      </div>
    </section>
  );
};

export default WinnerModal;
