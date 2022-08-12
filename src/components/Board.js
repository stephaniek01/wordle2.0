import React, { useContext } from "react";
import { BoardContext } from "../contexts/board.context";
import Row from "./Row";

const Board = () => {
  const { gameBoard, gameStatus,answer } = useContext(BoardContext);

  return (
    <div className="board">
      {gameBoard.map((_, idx) => (
        <Row key={idx} row_no={idx} />
      ))}

      {gameStatus.isGameOver && (
        <p className="result">
          {gameStatus.result ? "You won!!" : "Sorry, please try again"}
        </p>
      )}
      <p className="answer">{answer}</p>
    </div>
  );
};

export default Board;
