import { configureStore } from '@reduxjs/toolkit';
import snakeReducer from './snakeSlice';
import directionReducer from './directionSlice';
import foodReducer from './foodSlice';
import gridReducer from './gridSlice';

export const store = configureStore({
  reducer: {
    snake: snakeReducer,
    direction: directionReducer,
    food: foodReducer,
    grid: gridReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
