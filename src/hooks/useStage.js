import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  //props destructure
  const [stage, setStage] = useState(createStage());
  const [rowCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) =>
      newStage.reduce((accumulator, row) => {
        //filled up a complete row
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          accumulator.unshift(new Array(newStage[0].length.fill([0, "clear"])));
          return accumulator;
        }
        accumulator.push(row);
        return accumulator;
      }, []);

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
        return sweepRows(newStage);
      }
      return newStage;
    };
    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowCleared];
};
