import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch, store } from '../redux/store';
import { GridCell, GridRow } from '../types';
import { moveSnakeFn } from '../utils/moveSnake';
import { generateFood } from '../utils/generateFood';
import { setGrid } from '../redux/features/gridSlice';
import { changeGrid } from '../utils/changeGrid';
import { tick } from '../redux/features/timeSlice';
import { GameStatus, GRID_SIZE } from '../constants';
import { setGameStatus } from '../redux/features/gameStatusSlice';

const GameBoard: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const snake = useSelector((state: RootState) => state.snake);
  const direction = useSelector((state: RootState) => state.direction.value);
  const food = useSelector((state: RootState) => state.food);
  const grid = useSelector((state: RootState) => state.grid);
  const score = useSelector((state: RootState) => state.score);
  const gameStatus = useSelector((state: RootState) => state.gameStatus.type);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStatus === GameStatus.PLAYING) dispatch(tick());
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStatus]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStatus === GameStatus.PLAYING)
        moveSnakeFn({ snake, direction, food, score, dispatch });
    }, 1000);

    return () => clearInterval(interval);
  }, [snake, food, direction, gameStatus]);

  useEffect(() => {
    if (food.row === null || food.col === null) {
      const timeout = setTimeout(() => {
        if (gameStatus === GameStatus.PLAYING) {
          const latestSnake = store.getState().snake;
          generateFood(latestSnake, dispatch);
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [food, gameStatus]);

  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING) {
      const newGrid = changeGrid(snake, food);
      dispatch(setGrid(newGrid));

      if (snake.length === GRID_SIZE * GRID_SIZE) {
        dispatch(setGameStatus(GameStatus.WIN));
        return;
      }
    }
  }, [snake, food, gameStatus]);

  return (
    <div className="relative w-[350px] h-[350px] bg-white border-2 border-blue-500 shadow-lg grid grid-cols-10 grid-rows-10">
      {grid.map((row: GridRow, rowIndex: number) =>
        row.map((cell: GridCell, colIndex: number) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-full h-full border border-blue-200 flex items-center justify-center"
          >
            {cell === 'food' && <span className="text-red-500">🐟</span>}
            {cell === 'snake' && (
              <span
                className={`w-full h-full block ${
                  rowIndex === snake[0].row && colIndex === snake[0].col
                    ? 'bg-blue-500'
                    : 'bg-blue-400'
                }`}
              ></span>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;
