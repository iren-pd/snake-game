import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GRID_SIZE } from '../constants';
import { GridState } from '../types';

const initialState: GridState = Array.from({ length: GRID_SIZE }, () =>
  Array(GRID_SIZE).fill(null)
);

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setGrid: (_state, action: PayloadAction<GridState>) => {
      return action.payload;
    },
    resetGrid: () => initialState,
  },
});

export const { setGrid, resetGrid } = gridSlice.actions;
export default gridSlice.reducer;
