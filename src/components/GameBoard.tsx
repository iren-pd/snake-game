import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch, store } from '../redux/store';
import { GridCell, GridRow } from '../types';
import { moveSnakeFn } from '../utils/moveSnake';
import { generateFood } from '../utils/generateFood';
import { setGrid } from '../redux/features/gridSlice';
import { changeGrid } from '../utils/changeGrid';
import { tick } from '../redux/features/timeSlice';

const GameBoard: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const snake = useSelector((state: RootState) => state.snake);
  const direction = useSelector((state: RootState) => state.direction.value);
  const food = useSelector((state: RootState) => state.food);
  const grid = useSelector((state: RootState) => state.grid);
  const score = useSelector((state: RootState) => state.score);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnakeFn({ snake, direction, food, score, dispatch });
    }, 1000);

    return () => clearInterval(interval);
  }, [snake, food, direction]);

  useEffect(() => {
    if (food.row === null || food.col === null) {
      const timeout = setTimeout(() => {
        const latestSnake = store.getState().snake;
        generateFood(latestSnake, dispatch);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [food]);

  useEffect(() => {
    const newGrid = changeGrid(snake, food);
    dispatch(setGrid(newGrid));
  }, [snake, food]);

  return (
    <div className="relative w-[350px] h-[350px] bg-white border-2 border-blue-500 shadow-lg grid grid-cols-3 grid-rows-3">
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
