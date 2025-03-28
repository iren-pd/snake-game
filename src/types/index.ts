import { Direction } from '../constants';
import { AppDispatch } from '../redux/store';

export type GridCell = 'snake' | 'food' | null;
export type GridRow = GridCell[];
export type GridState = GridRow[];

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

export type moveSnakeArg = {
  snake: SnakePoint[];
  direction: Direction;
  food: FoodPoint;
  score: Score;
  dispatch: AppDispatch;
};
