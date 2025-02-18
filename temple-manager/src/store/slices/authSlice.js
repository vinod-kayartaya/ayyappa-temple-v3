import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage if available
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }
};

const initialState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Save to localStorage
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Clear from localStorage
      localStorage.removeItem('authState');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer; 