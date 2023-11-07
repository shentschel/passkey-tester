/** @format */
import { createSlice } from '@reduxjs/toolkit';

export type LoginPasskeyState = {
  showModal: boolean;
  withUserId: boolean;
  userId: string;
};

const initialState: LoginPasskeyState = {
  showModal: false,
  withUserId: false,
  userId: '',
};

export const LoginPasskeySlice = createSlice({
  name: 'loginPasskey',
  initialState,
  reducers: {
    updateUserId: (state, action: { payload: string }): LoginPasskeyState => ({
      ...state,
      userId: action.payload,
    }),
    updateLogin: (state, action: { payload: boolean }): LoginPasskeyState => ({
      ...state,
      withUserId: action.payload,
    }),
    showLogin: (state): LoginPasskeyState => ({
      ...state,
      showModal: true,
    }),
    hideLogin: (state): LoginPasskeyState => ({
      ...state,
      showModal: false,
    }),
  },
});

export const { updateUserId, updateLogin, showLogin, hideLogin } = LoginPasskeySlice.actions;

export default LoginPasskeySlice.reducer;
