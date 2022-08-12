import React, { useState, createContext, useEffect } from "react";
import defaultBoard, { generateWordSet } from "../constants/defaultBoard";

export const BoardContext = createContext({
  gameBoard: [],
  setGameBoard: () => {},
  currentPosition: {
    row: Number,
    col: Number,
  },
  answer: String,
  setCurrentPosition: () => {},
  onKeySelectionHandler: () => {},
  selectedKeys: {
    correct: Set,
    almost: Set,
    attempted: Set,
  },
  gameStatus: {
    status: Boolean,
    result: Boolean,
  },
});

const BoardProvider = ({ children }) => {
  const [gameBoard, setGameBoard] = useState(defaultBoard);
  const [currentPosition, setCurrentPosition] = useState({
    row: 0,
    col: 0,
  });
  const [wordBank, setWordBank] = useState(new Set());
  const [selectedKeys, setSelectedKeys] = useState({
    attempted: new Set(),
    almost: new Set(),
    correct: new Set(),
  });
  const [gameStatus, setGameStatus] = useState({
    isGameOver: false,
    result: false,
  });
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchWordSet = async () => {
      const { wordSet } = await generateWordSet();
      setWordBank(wordSet);

      const idx = Math.floor(Math.random() * wordSet.size);

      setAnswer(Array.from(wordSet)[idx]);
      console.log(Array.from(wordSet)[idx]);
    };

    fetchWordSet();
  }, [setWordBank]);

  const onDeleteLetter = () => {
    if (currentPosition.col === 0) return;

    // delete the letter on the current position
    const board = [...gameBoard];
    board[currentPosition.row][currentPosition.col - 1] = "";
    setGameBoard([...board]);

    // update the current position (go one step behind)
    setCurrentPosition({ ...currentPosition, col: currentPosition.col - 1 });
  };

  const onSelectLetter = (keyVal) => {
    // return if the row has reached the letter limit
    if (currentPosition.col > 4) return;

    // add the letter to the game board
    const board = [...gameBoard];
    board[currentPosition.row][currentPosition.col] = keyVal;
    setGameBoard([...board]);

    // update the current position
    setCurrentPosition({ ...currentPosition, col: currentPosition.col + 1 });
  };

  const wordAldreadyEntered = (word) => {
    for (let i = 0; i < currentPosition.row; i++) {
      if (gameBoard[i].join("") === word) return true;
    }

    return false;
  };

  const updateSelectedKeys = () => {
    gameBoard[currentPosition.row].forEach((letter, idx) => {
      const correct = answer[idx] === letter;
      const almost_correct =
        !correct && letter !== "" && answer.includes(letter);

      const letterClass = correct
        ? "correct"
        : almost_correct
        ? "almost"
        : "attempted";

      const obj = {
        ...selectedKeys,
        [letterClass]: selectedKeys[letterClass].add(letter),
      };

      setSelectedKeys(obj);
    });
  };

  const onEnterLetter = () => {
    const word = gameBoard[currentPosition.row].join("");

    // the entered word is less than 5 chars
    if (word.length < 5) return;

    if (!wordBank.has(word)) return;

    if (wordAldreadyEntered(word)) return;

    // update the attempt number(row no)
    setCurrentPosition({
      ...currentPosition,
      row: currentPosition.row + 1,
      col: 0,
    });

    updateSelectedKeys();

    // check if the entered word is correct
    if (word === answer) {
      setGameStatus({
        isGameOver: true,
        result: true,
      });
    } // if we're on the last row
    else if (currentPosition.row === 5) {
      setGameStatus({
        ...gameStatus,
        isGameOver: true,
      });
      return;
    }
  };

  const onKeySelectionHandler = (enteredKey) => {
    if (gameStatus.isGameOver) return;

    const keyVal = enteredKey.toLowerCase();

    // regex for single alphabet
    const pattern = /^[a-z]{1,1}$/;

    if (currentPosition.row > 5) return;

    if (keyVal === "enter") onEnterLetter();
    else if (keyVal === "backspace" || keyVal === "delete") onDeleteLetter();
    else if (pattern.test(keyVal)) onSelectLetter(keyVal);
  };

  const value = {
    gameBoard,
    setGameBoard,
    currentPosition,
    setCurrentPosition,
    answer,
    onKeySelectionHandler,
    selectedKeys,
    gameStatus,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

export default BoardProvider;
