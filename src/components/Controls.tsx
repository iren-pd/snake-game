import { FC } from 'react';
import arrowIcon from '../assets/controls.png';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../redux/store';
import { setDirection } from '../redux/features/directionSlice';
import { canChangeDirection } from '../utils/canChangeDirection';
import { Direction } from '../constants';

const Controls: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const direction = useSelector((state: RootState) => state.direction.value);
  const snake = useSelector((state: RootState) => state.snake);

  const handleChangeDirection = (nextDirection: Direction) => {
    canChangeDirection(snake, direction, nextDirection) &&
      dispatch(setDirection(nextDirection));
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <button
        className="transition flex items-center justify-center active:bg-blue-200 active:shadow-lg active:rounded-md"
        onClick={() => handleChangeDirection(Direction.UP)}
      >
        <img
          src={arrowIcon}
          alt="Up"
          className="w-10 h-10 md:w-12 md:h-12 transform rotate-[-90deg]"
        />
      </button>

      <div className="flex gap-8 md:gap-12">
        <button
          className="transition flex items-center justify-center active:bg-blue-200 active:shadow-lg active:rounded-md"
          onClick={() => handleChangeDirection(Direction.LEFT)}
        >
          <img
            src={arrowIcon}
            alt="Left"
            className="w-10 h-10 md:w-12 md:h-12 transform rotate-[-180deg]"
          />
        </button>
        <button
          className="transition flex items-center justify-center active:bg-blue-200 active:shadow-lg active:rounded-md"
          onClick={() => handleChangeDirection(Direction.RIGHT)}
        >
          <img
            src={arrowIcon}
            alt="Right"
            className="w-10 h-10 md:w-12 md:h-12"
          />
        </button>
      </div>

      <button
        className="transition flex items-center justify-center active:bg-blue-200 active:shadow-lg active:rounded-md"
        onClick={() => handleChangeDirection(Direction.DOWN)}
      >
        <img
          src={arrowIcon}
          alt="Down"
          className="w-10 h-10 md:w-12 md:h-12 transform rotate-[90deg]"
        />
      </button>
    </div>
  );
};

export default Controls;
