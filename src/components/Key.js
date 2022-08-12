import React, { useContext } from "react";
import { BoardContext } from "../contexts/board.context";

const Key = ({ keyVal, bigKey}) => {
  const { onKeySelectionHandler, selectedKeys } =
    useContext(BoardContext);

  let keyClass = "";

  for (let i in selectedKeys) {
    if (selectedKeys[i].has(keyVal)) keyClass = i;
  }

  return (
    <div
      className={`key ${keyClass} ${bigKey && "big-key"}`}
      onClick={() => {
        if (keyClass !== "selected-key") onKeySelectionHandler(keyVal);
      }}
    >
      {keyVal}
    </div>
  );
};

export default Key;
