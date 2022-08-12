import React, { useContext } from "react";
import { BoardContext } from "../contexts/board.context";
import Letter from "./Letter";

const Row = React.memo(({ row_no }) => {
  const { gameBoard } = useContext(BoardContext);

  return (
    <div className="row">
      {gameBoard[row_no].map((_, idx) => (
        <Letter key={idx} col_no={idx} row_no={row_no} />
      ))}
    </div>
  );
});

export default Row;
