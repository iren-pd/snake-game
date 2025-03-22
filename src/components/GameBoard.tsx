import { FC, useEffect, useState } from 'react';
import { directionOffsets, GRID_SIZE } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { moveSnake, growSnake } from '../redux/snakeSlice';
import { setFoodPoint } from '../redux/foodSlice';
import { setGrid } from '../redux/gridSlice';
import { GridCell, GridRow, GridState } from '../types';

const GameBoard: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const snake = useSelector((state: RootState) => state.snake);
  const direction = useSelector((state: RootState) => state.direction.value);
  const food = useSelector((state: RootState) => state.food);
  const grid = useSelector((state: RootState) => state.grid);

  // const [grid, setGrid] = useState<('snake' | 'food' | null)[][]>(
  //   Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null))
  // );

  useEffect(() => {
    const interval = setInterval(() => {
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

      setGrid((prevGrid) => {
        const cloneGrid = prevGrid.map((row) => [...row]);

        const tail = snake[snake.length - 1];
        cloneGrid[tail.row][tail.col] = null;
        cloneGrid[newHead.row][newHead.col] = 'snake';

        return cloneGrid;
      });

      if (isFoodEaten) {
        dispatch(growSnake(newHead));
      } else {
        dispatch(moveSnake(newHead));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [direction, snake, food]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        setGrid((prevGrid: GridState[][]) => {
          const cloneGrid = prevGrid.map((row) => [...row]);

          let row;
          let col;

          do {
            row = Math.floor(Math.random() * GRID_SIZE);
            col = Math.floor(Math.random() * GRID_SIZE);
          } while (cloneGrid[row][col] !== null);

          cloneGrid[row][col] = 'food';
          dispatch(setFoodPoint({ row, col }));
          return cloneGrid;
        })
      );
    }, 7000);

    return () => {
      dispatch(
        setGrid((prev) =>
          prev.map((row) =>
            row.map((cell: GridCell) => (cell === 'food' ? null : cell))
          )
        )
      );

      dispatch(setFoodPoint({ row: null, col: null }));
      clearInterval(interval);
    };
  }, []);

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
