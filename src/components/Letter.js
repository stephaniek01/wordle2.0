import React, { useContext } from "react";
import { BoardContext } from "../contexts/board.context";

const Letter = React.memo(({ row_no, col_no }) => {
  const { gameBoard, answer, currentPosition } = useContext(BoardContext);
  const letter = gameBoard[row_no][col_no];

  const correct = answer[col_no] === letter;
  const almost_correct = !correct && letter !== "" && answer.includes(letter);

  let letterClass = "";

  if (row_no < currentPosition.row)
    letterClass = correct ? "correct" : almost_correct ? "almost" : "attempted";

  if(letterClass.length > 0)
    letterClass += " attempted-letter-card";

  return (
    <div className={`letter ${letterClass}`}>
      <span>{letter}</span>
    </div>
  );
});

export default Letter;
