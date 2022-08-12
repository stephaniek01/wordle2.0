import React, { useContext, useEffect } from "react";
import keyboard from "../constants/keyboard";
import { BoardContext } from "../contexts/board.context";
import Key from "./Key";

const Keyboard = () => {
  const { onKeySelectionHandler } = useContext(BoardContext);

  // useCallback()
  const handleKeyboard = (event) => {
    onKeySelectionHandler(event.key.toUpperCase());
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      {keyboard.map((keyboard_row, idx) => (
        // keyboard row
        <div className="keyboard_row" key={idx}>
          {keyboard_row.map((key, idx) => (
            // individual key
            <Key key={idx} keyVal={key.toLowerCase()} bigKey={key.length > 1}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
