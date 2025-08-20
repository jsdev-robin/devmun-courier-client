import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth';
import { userAuthApi } from './authApi';

const initialState: AuthState = {
  verifyToken: null,
  user: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (
      state,
      action: PayloadAction<{
        token: string;
      }>,
    ) => {
      state.verifyToken = action.payload.token;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      userAuthApi.endpoints.getProfile.matchFulfilled,
      (state, action) => {
        state.user = action.payload.data.user;
        state.isAuth = true;
      },
    );
    builder.addMatcher(
      userAuthApi.endpoints.signout.matchFulfilled,
      (state) => {
        state.user = null;
        state.isAuth = false;
        state.verifyToken = null;
      },
    );
  },
});

export const { signup } = authSlice.actions;

export default authSlice.reducer;
