import { FC, useEffect, useState } from 'react';
import { directionOffsets, GRID_SIZE } from '../constants';
import { Direction } from '../types';

const GameBoard: FC<{ direction: Direction }> = ({ direction }) => {
  const [grid, setGrid] = useState(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null))
  );
  const [snakePoint, setSnakePoint] = useState({ row: 0, col: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const cloneGrid = prevGrid.map((row) => [...row]);

        const { rowOffset, colOffset } = directionOffsets[direction];
        const newRow = snakePoint.row + rowOffset;
        const newCol = snakePoint.col + colOffset;

        if (
          newRow >= 0 &&
          newRow < GRID_SIZE &&
          newCol >= 0 &&
          newCol < GRID_SIZE
        ) {
          cloneGrid[snakePoint.row][snakePoint.col] = null;
          cloneGrid[newRow][newCol] = 'snake';

          setSnakePoint({ row: newRow, col: newCol });
          return cloneGrid;
        } else {
          return prevGrid;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [snakePoint, direction]);

  return (
    <div className="relative w-[400px] h-[400px] bg-white border-2 border-blue-500 shadow-lg grid grid-cols-10 grid-rows-10">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-full h-full border border-blue-200 flex items-center justify-center"
          >
            {cell === 'food' && <span className="text-red-500">🍏</span>}
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
