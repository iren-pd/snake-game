import { setDirection } from '../redux/features/directionSlice';
import { setFoodPoint } from '../redux/features/foodSlice';
import { setGameStatus } from '../redux/features/gameStatusSlice';
import { setScore } from '../redux/features/scoreSlice';
import { resetSnake } from '../redux/features/snakeSlice';
import { resetTime } from '../redux/features/timeSlice';
import { AppDispatch } from '../redux/store';
import { Direction, GameStatus } from '../constants';

export const restartGame = (dispatch: AppDispatch) => {
  dispatch(setGameStatus(GameStatus.PLAYING));
  dispatch(setDirection(Direction.RIGHT));
  dispatch(setFoodPoint({ row: null, col: null }));
  dispatch(setScore(0));
  dispatch(resetSnake());
  dispatch(resetTime());
};
