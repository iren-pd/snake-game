import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Direction } from '../../types';

const initialState = { value: Direction.RIGHT };

export const directionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    setDirection: (state, action: PayloadAction<Direction>) => {
      state.value = action.payload;
    },
  },
});

export const { setDirection } = directionSlice.actions;
export default directionSlice.reducer;
