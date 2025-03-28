export const GRID_SIZE = 2;

export enum GameStatus {
  IDLE = 'idle',
  PLAYING = 'playing',
  WIN = 'win',
  LOSE = 'lose',
}

export enum Direction {
  RIGHT = 'right',
  LEFT = 'left',
  UP = 'up',
  DOWN = 'down',
}

export const directionOffsets = {
  [Direction.RIGHT]: { rowOffset: 0, colOffset: 1 },
  [Direction.LEFT]: { rowOffset: 0, colOffset: -1 },
  [Direction.UP]: { rowOffset: -1, colOffset: 0 },
  [Direction.DOWN]: { rowOffset: 1, colOffset: 0 },
};
