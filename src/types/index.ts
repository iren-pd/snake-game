export type GridCell = 'snake' | 'food' | null;
export type GridRow = GridCell[];
export type GridState = GridRow[];

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

export type SnakePoint = {
  row: number;
  col: number;
};

export type FoodPoint = {
  row: number | null;
  col: number | null;
};

export type Score = number;

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};
