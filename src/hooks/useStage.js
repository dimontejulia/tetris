import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  //props destructure
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    const updateStage = (prevStage) => {
      // clear the stage contents
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // draw the generated tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          //valid cell of tetromino
          if (value !== 0) {
            //coordinates of stage
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              // merged: we know it should keep it in the stage
              // otherwise set to clear
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });
      if (player.collided) {
        resetPlayer();
      }
      return newStage;
    };
    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage];
};
