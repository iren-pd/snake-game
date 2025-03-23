import { directionOffsets, GRID_SIZE } from '../constants';
import { Direction, FoodPoint, SnakePoint } from '../types';
import { AppDispatch } from '../redux/store';
import { growSnake, moveSnake } from '../redux/snakeSlice';
import { setFoodPoint } from '../redux/foodSlice';

type moveSnakeArg = {
  snake: SnakePoint[];
  direction: Direction;
  food: FoodPoint;
  dispatch: AppDispatch;
};

export const moveSnakeFn = ({
  snake,
  direction,
  food,
  dispatch,
}: moveSnakeArg) => {
  const { rowOffset, colOffset } = directionOffsets[direction];

  const head = snake[0];
  const newHead = {
    row: head.row + rowOffset,
    col: head.col + colOffset,
  };

  const isFoodEaten = food.row === newHead.row && food.col === newHead.col;

  if (
    newHead.row < 0 ||
    newHead.row >= GRID_SIZE ||
    newHead.col < 0 ||
    newHead.col >= GRID_SIZE
  ) {
    return;
  }
  let newSnake;

  if (isFoodEaten) {
    newSnake = [newHead, ...snake];
    dispatch(growSnake(newHead));
    dispatch(setFoodPoint({ row: null, col: null })); 
  } else {
    newSnake = [newHead, ...snake.slice(0, -1)];
    dispatch(moveSnake(newHead));
  }

  return newSnake;
};
