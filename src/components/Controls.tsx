import { FC } from 'react';
import arrowIcon from '../assets/controls.png';
import { Direction } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../redux/store';
import { setDirection } from '../redux/features/directionSlice';
import { canChangeDirection } from '../utils/canChangeDirection';

const Controls: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const direction = useSelector((state: RootState) => state.direction.value);
  const snake = useSelector((state: RootState) => state.snake);

  return (
    <div className="flex flex-col items-center mt-4">
      <button
        className="transition flex items-center justify-center"
        onClick={() =>
          canChangeDirection(snake, direction, Direction.UP) &&
          setDirection(Direction.UP)
        }
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
          onClick={() =>
            canChangeDirection(snake, direction, Direction.LEFT) &&
            dispatch(setDirection(Direction.LEFT))
          }
        >
          <img
            src={arrowIcon}
            alt="Left"
            className="w-12 h-12 transform rotate-[-180deg]"
          />
        </button>
        <button
          className="transition flex items-center justify-center"
          onClick={() =>
            canChangeDirection(snake, direction, Direction.RIGHT) &&
            dispatch(setDirection(Direction.RIGHT))
          }
        >
          <img src={arrowIcon} alt="Right" className="w-12 h-12" />
        </button>
      </div>

      <button
        className="transition flex items-center justify-center"
        onClick={() =>
          canChangeDirection(snake, direction, Direction.DOWN) &&
          dispatch(setDirection(Direction.DOWN))
        }
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
