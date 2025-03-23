import { GRID_SIZE } from '../constants';
import { AppDispatch } from '../redux/store';
import { setFoodPoint } from '../redux/features/foodSlice';
import { SnakePoint } from '../types';

export const generateFood = (snake: SnakePoint[], dispatch: AppDispatch) => {
  const allCells = [];

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      allCells.push({ row, col });
    }
  }

  const freeCells = allCells.filter(
    (cell) => !snake.some((segment) => segment.row === cell.row && segment.col === cell.col)
  );

  const randomIndex = Math.floor(Math.random() * freeCells.length);
  const newFood = freeCells[randomIndex];

  dispatch(setFoodPoint(newFood));
};
