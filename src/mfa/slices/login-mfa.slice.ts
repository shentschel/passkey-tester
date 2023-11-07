/** @format */
import { createSlice } from '@reduxjs/toolkit';

export type LoginMfaState = {
  showModal: boolean;
  userId: string;
};

const initialState: LoginMfaState = {
  showModal: false,
  userId: '',
};

export const LoginMfaSlice = createSlice({
  name: 'loginPasskey',
  initialState,
  reducers: {
    updateUserId: (state, action: { payload: string }): LoginMfaState => ({
      ...state,
      userId: action.payload,
    }),
    showMfaLogin: (state): LoginMfaState => ({
      ...state,
      showModal: true,
    }),
    hideMfaLogin: (state): LoginMfaState => ({
      ...state,
      showModal: false,
    }),
  },
});

export const { updateUserId, showMfaLogin, hideMfaLogin } = LoginMfaSlice.actions;

export default LoginMfaSlice.reducer;
