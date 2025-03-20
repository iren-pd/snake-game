import { Direction } from "../types";

export const GRID_SIZE = 10;

export const directionOffsets = {
  [Direction.RIGHT]: { rowOffset: 0, colOffset: 1 },
  [Direction.LEFT]: { rowOffset: 0, colOffset: -1 },
  [Direction.UP]: { rowOffset: -1, colOffset: 0 },
  [Direction.DOWN]: { rowOffset: 1, colOffset: 0 },
};