import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodPoint } from '../types';

const initialState: FoodPoint = { row: null, col: null };

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoodPoint: (state, action: PayloadAction<FoodPoint>) => {
      return action.payload;
    },
  },
});

export const { setFoodPoint } = foodSlice.actions;
export default foodSlice.reducer;
