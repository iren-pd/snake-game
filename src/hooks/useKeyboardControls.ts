import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { Direction } from '../types';
import { setDirection } from '../redux/directionSlice';

export const useKeyboardControls = () => {
  const dispatch = useDispatch<AppDispatch>();
  const direction = useSelector((state: RootState) => state.direction.value);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== Direction.DOWN)
            dispatch(setDirection(Direction.UP));
          break;
        case 'ArrowDown':
          if (direction !== Direction.UP)
            dispatch(setDirection(Direction.DOWN));
          break;
        case 'ArrowLeft':
          if (direction !== Direction.RIGHT)
            dispatch(setDirection(Direction.LEFT));
          break;
        case 'ArrowRight':
          if (direction !== Direction.LEFT)
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
