import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  temples: [],
  loading: false,
  error: null,
};

const templeSlice = createSlice({
  name: 'temple',
  initialState,
  reducers: {
    setTemples: (state, action) => {
      state.temples = action.payload;
    },
    addTemple: (state, action) => {
      state.temples.push(action.payload);
    },
    // Add more reducers as needed
  },
});

export const { setTemples, addTemple } = templeSlice.actions;
export default templeSlice.reducer; 