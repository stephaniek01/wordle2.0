import React from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import BoardProvider from "./contexts/board.context";

function App() {
  return (
    <BoardProvider>
      <h1 className="heading">Wordle</h1>
      <Board />
      <Keyboard />
    </BoardProvider>
  );
}

export default App;
