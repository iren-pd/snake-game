import { configureStore } from '@reduxjs/toolkit';
import {
  snakeReducer,
  directionReducer,
  foodReducer,
  gridReducer,
  scoreReducer,
} from './features';

export const store = configureStore({
  reducer: {
    snake: snakeReducer,
    direction: directionReducer,
    food: foodReducer,
    grid: gridReducer,
    score: scoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
