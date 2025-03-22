import { FC, useEffect, useState } from 'react';
import { directionOffsets, GRID_SIZE } from '../constants';
import { Direction } from '../types';

const GameBoard: FC<{ direction: Direction }> = ({ direction }) => {
  const [grid, setGrid] = useState<('snake' | 'food' | null)[][]>(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null))
  );
  const [snakePoint, setSnakePoint] = useState<{ row: number; col: number }[]>([
    { row: 0, col: 0 },
  ]);
  const [food, setFood] = useState<{ row: number | null; col: number | null }>({
    row: null,
    col: null,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const { rowOffset, colOffset } = directionOffsets[direction];

      setSnakePoint((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          row: head.row + rowOffset,
          col: head.col + colOffset,
        };

        const isFoodEaten =
          food.row === newHead.row && food.col === newHead.col;

        if (
          newHead.row < 0 ||
          newHead.row >= GRID_SIZE ||
          newHead.col < 0 ||
          newHead.col >= GRID_SIZE
        ) {
          return prevSnake;
        }

        setGrid((prevGrid) => {
          const cloneGrid = prevGrid.map((row) => [...row]);

          const tail = prevSnake[prevSnake.length - 1];
          cloneGrid[tail.row][tail.col] = null;
          cloneGrid[newHead.row][newHead.col] = 'snake';

          return cloneGrid;
        });

        return isFoodEaten
          ? [newHead, ...prevSnake]
          : [newHead, ...prevSnake.slice(0, -1)];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const cloneGrid = prevGrid.map((row) => [...row]);

        let row;
        let col;

        do {
          row = Math.floor(Math.random() * GRID_SIZE);
          col = Math.floor(Math.random() * GRID_SIZE);
        } while (cloneGrid[row][col] !== null);

        cloneGrid[row][col] = 'food';
        setFood({ row, col });
        return cloneGrid;
      });
    }, 10000);

    return () => {
      setGrid((prev) =>
        prev.map((row) => row.map((cell) => (cell === 'food' ? null : cell)))
      );

      setFood({ row: null, col: null });
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-[400px] h-[400px] bg-white border-2 border-blue-500 shadow-lg grid grid-cols-10 grid-rows-10">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
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
