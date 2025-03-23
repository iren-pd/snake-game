import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { Direction } from '../types';
import { setDirection } from '../redux/features/directionSlice';
import { canChangeDirection } from '../utils/canChangeDirection';

export const useKeyboardControls = () => {
  const dispatch = useDispatch<AppDispatch>();
  const snake = useSelector((state: RootState) => state.snake);
  const direction = useSelector((state: RootState) => state.direction.value);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (canChangeDirection(snake, direction, Direction.UP))
            dispatch(setDirection(Direction.UP));
          break;
        case 'ArrowDown':
          if (canChangeDirection(snake, direction, Direction.DOWN))
            dispatch(setDirection(Direction.DOWN));
          break;
        case 'ArrowLeft':
          if (canChangeDirection(snake, direction, Direction.LEFT))
            dispatch(setDirection(Direction.LEFT));
          break;
        case 'ArrowRight':
          if (canChangeDirection(snake, direction, Direction.RIGHT))
            dispatch(setDirection(Direction.RIGHT));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, dispatch]);
};
