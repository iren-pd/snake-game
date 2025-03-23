import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodPoint } from '../../types';

const initialState: FoodPoint = { row: null, col: null };

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoodPoint: (state, action: PayloadAction<FoodPoint>) => {
      state.row = action.payload.row;
      state.col = action.payload.col;
    },
  },
});

export const { setFoodPoint } = foodSlice.actions;
export default foodSlice.reducer;
