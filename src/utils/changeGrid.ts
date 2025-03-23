import { GRID_SIZE } from '../constants';
import { FoodPoint, SnakePoint } from '../types';

export const changeGrid = (
  snake: SnakePoint[],
  food: FoodPoint,
) => {
  const newGrid = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(null)
  );

  snake.forEach((segment) => {
    newGrid[segment.row][segment.col] = 'snake';
  });

  if (food.row !== null && food.col !== null) {
    newGrid[food.row][food.col] = 'food';
  }

  return newGrid;
};
