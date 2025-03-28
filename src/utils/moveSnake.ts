import { directionOffsets, GameStatus, GRID_SIZE } from '../constants';
import { moveSnakeArg } from '../types';

import { growSnake, moveSnake } from '../redux/features/snakeSlice';
import { setFoodPoint } from '../redux/features/foodSlice';
import { setScore } from '../redux/features/scoreSlice';
import { setGameStatus } from '../redux/features/gameStatusSlice';

export const moveSnakeFn = ({
  snake,
  direction,
  food,
  score,
  dispatch,
}: moveSnakeArg) => {
  const { rowOffset, colOffset } = directionOffsets[direction];

  const head = snake[0];
  const newHead = {
    row: head.row + rowOffset,
    col: head.col + colOffset,
  };
  const isCollisionWithSelf = snake.some(
    (segment) => segment.row === newHead.row && segment.col === newHead.col
  );
  const isOutOfBounds =
    newHead.row < 0 ||
    newHead.row >= GRID_SIZE ||
    newHead.col < 0 ||
    newHead.col >= GRID_SIZE;
  const isFoodEaten = food.row === newHead.row && food.col === newHead.col;

  if (isOutOfBounds || isCollisionWithSelf) {
    dispatch(setGameStatus(GameStatus.LOSE));
    return;
  }

  let newSnake;

  if (isFoodEaten) {
    newSnake = [newHead, ...snake];
    const newScore = score + 10;

    dispatch(growSnake(newHead));
    dispatch(setScore(newScore));
    dispatch(setFoodPoint({ row: null, col: null }));
  } else {
    newSnake = [newHead, ...snake.slice(0, -1)];
    dispatch(moveSnake(newHead));
  }

  return newSnake;
};
