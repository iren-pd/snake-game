import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SnakePoint } from '../types';

const initialState: SnakePoint[] = [{ row: 0, col: 0 }];

export const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    moveSnake: (state, action: PayloadAction<SnakePoint>) => {
      return [action.payload, ...state.slice(0, -1)];
    },
    growSnake: (state, action: PayloadAction<SnakePoint>) => {
      return [action.payload, ...state];
    },
    resetSnake: () => initialState,
  },
});

export const { moveSnake, growSnake, resetSnake } = snakeSlice.actions;
export default snakeSlice.reducer;
