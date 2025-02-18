import { configureStore } from '@reduxjs/toolkit';
import templeReducer from './slices/templeSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    temple: templeReducer,
    auth: authReducer,
  },
}); 