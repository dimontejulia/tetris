import React from "react";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

const Tetris = ({ callback }) => {
  return (
    <div>
      <Stage />
      <aside>
        <div>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Level 1" />
        </div>
        <StartButton />
      </aside>
    </div>
  );
};

export default Tetris;