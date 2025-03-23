import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Time } from '../../types';

const initialState: Time = { hours: 0, minutes: 0, seconds: 0 };

export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<Time>) => {
      state.hours = action.payload.hours;
      state.minutes = action.payload.minutes;
      state.seconds = action.payload.seconds;
    },
    tick: (state) => {
      state.seconds += 1;
      if (state.seconds >= 60) {
        state.seconds = 0;
        state.minutes += 1;
      }
      if (state.minutes >= 60) {
        state.minutes = 0;
        state.hours += 1;
      }
    },
    resetTime: () => initialState,
  },
});

export const { setTime, tick, resetTime } = timeSlice.actions;
export default timeSlice.reducer;
