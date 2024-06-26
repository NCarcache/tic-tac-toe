const Square = ({ children, isSelected, updateBoard, index }) => {
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div
      className={`square ${isSelected ? "is-selected" : ""}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Square;
