import { useState } from "react";
import { randomTetromino } from "../tetrominos";

export const usePlayer = () => {
  //props destructure
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: randomTetromino().shape,
    collided: false,
  });

  return [player];
};
