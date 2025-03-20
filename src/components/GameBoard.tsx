import { FC, useEffect, useState } from 'react';

const GRID_SIZE = 10;
enum Direction {
  RIGHT = 'right',
  LEFT = 'left',
  UP = 'up',
  DOWN = 'down',
}

const directionOffsets = {
  [Direction.RIGHT]: { rowOffset: 0, colOffset: 1 },
  [Direction.LEFT]: { rowOffset: 0, colOffset: -1 },
  [Direction.UP]: { rowOffset: -1, colOffset: 0 },
  [Direction.DOWN]: { rowOffset: 1, colOffset: 0 },
};

const GameBoard: FC = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null))
  );
  const [snakePoint, setSnakePoint] = useState({ row: 0, col: 0 });
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    if (!canMove) return;

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
          setCanMove(false);
          return prevGrid;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [snakePoint, direction, canMove]);

  return (
    <div className="relative w-[400px] h-[400px] bg-white border-2 border-green-500 shadow-lg grid grid-cols-10 grid-rows-10">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-full h-full border border-green-200 flex items-center justify-center"
          >
            {cell === 'food' && <span className="text-red-500">🍏</span>}
            {cell === 'snake' && (
              <span className="bg-green-500 w-full h-full block"></span>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;
