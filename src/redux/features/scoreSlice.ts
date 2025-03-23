import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Score } from '../../types';

const initialState: Score = 0;

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore: (_state, action: PayloadAction<number>) => {
      return action.payload;
    },
    resetScore: () => initialState,
  },
});

export const { setScore } = scoreSlice.actions;
export default scoreSlice.reducer;
