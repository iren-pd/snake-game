import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStatus } from '../../constants';

const initialState = { type: GameStatus.IDLE };

export const gameStatusSlice = createSlice({
  name: 'gameStatus',
  initialState,
  reducers: {
    setGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.type = action.payload;
    },
  },
});

export const { setGameStatus } = gameStatusSlice.actions;
export default gameStatusSlice.reducer;