import { FC } from 'react';
import arrowIcon from '../assets/controls.png';
import { Direction } from '../types';

const Controls: FC<{ setDirection: (dir: Direction) => void }> = ({
  setDirection,
}) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <button
        className="transition flex items-center justify-center"
        onClick={() => setDirection(Direction.UP)}
      >
        <img
          src={arrowIcon}
          alt="Up"
          className="w-12 h-12 transform rotate-[-90deg]"
        />
      </button>

      <div className="flex gap-12">
        <button
          className="transition flex items-center justify-center"
          onClick={() => setDirection(Direction.LEFT)}
        >
          <img
            src={arrowIcon}
            alt="Left"
            className="w-12 h-12 transform rotate-[-180deg]"
          />
        </button>
        <button
          className="transition flex items-center justify-center"
          onClick={() => setDirection(Direction.RIGHT)}
        >
          <img src={arrowIcon} alt="Right" className="w-12 h-12" />
        </button>
      </div>
      
      <button
        className="transition flex items-center justify-center"
        onClick={() => setDirection(Direction.DOWN)}
      >
        <img
          src={arrowIcon}
          alt="Down"
          className="w-12 h-12 transform rotate-[90deg]"
        />
      </button>
    </div>
  );
};

export default Controls;
