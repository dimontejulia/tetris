export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[0].length; x += 1) {
      //check we're on a tetromino cell
      if (player.tetromino[y][x] !== 0) {
        //check we're within height bounds (y)
        if (
          !stage[y + player.pos.y + moveY] ||
          //check we're within width bounds (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          //check cell is not set to clear (not colliding with something)
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
};
