import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../redux/store';
import { GridCell, GridRow } from '../types';
import { moveSnakeFn } from '../utils/moveSnake';
import { generateFood } from '../utils/generateFood';
import { setGrid } from '../redux/gridSlice';
import { changeGrid } from '../utils/changeGrid';

const GameBoard: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const snake = useSelector((state: RootState) => state.snake);
  const direction = useSelector((state: RootState) => state.direction.value);
  const food = useSelector((state: RootState) => state.food);
  const grid = useSelector((state: RootState) => state.grid);

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnakeFn({ snake, direction, food, dispatch });
    }, 1000);

    return () => clearInterval(interval);
  }, [snake, food, direction]);

  useEffect(() => {
    if (food.row === null || food.col === null) {
      const latestSnake = [...snake];

      const timeout = setTimeout(() => {
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
    <div className="relative w-[400px] h-[400px] bg-white border-2 border-blue-500 shadow-lg grid grid-cols-10 grid-rows-10">
      {grid.map((row: GridRow, rowIndex: number) =>
        row.map((cell: GridCell, colIndex: number) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-full h-full border border-blue-200 flex items-center justify-center"
          >
            {cell === 'food' && <span className="text-red-500">🐟</span>}
            {cell === 'snake' && (
              <span className="bg-blue-500 w-full h-full block"></span>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;
