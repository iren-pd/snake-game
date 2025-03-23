import { Direction, SnakePoint } from '../types';

export const canChangeDirection = (
  snake: SnakePoint[],
  current: Direction,
  next: Direction
) => {
  if (snake.length === 1) return true;

  return !(
    (current === Direction.UP && next === Direction.DOWN) ||
    (current === Direction.DOWN && next === Direction.UP) ||
    (current === Direction.LEFT && next === Direction.RIGHT) ||
    (current === Direction.RIGHT && next === Direction.LEFT)
  );
};
