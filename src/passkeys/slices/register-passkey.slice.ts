/** @format */

import { createSlice } from '@reduxjs/toolkit';
import * as uuid from 'uuid';

export type RegisterPasskeyState = {
  showModal: boolean;
  userId: string;
  userName: string;
  displayName?: string;
  icon?: string;
  registrationDone: boolean;
};

const initialState: RegisterPasskeyState = {
  showModal: false,
  userId: uuid.v4(),
  userName: 'sjacobi',
  displayName: 'Stefan Jacobi',
  icon: undefined,
  registrationDone: false,
};

export const RegisterPasskeySlice = createSlice({
  name: 'registerPasskey',
  initialState,
  reducers: {
    updateState: (state, action: { payload: Partial<RegisterPasskeyState> }) => ({
      ...state,
      ...action.payload,
    }),
    showRegisterPasskeyModal: (state) => ({
      ...state,
      showModal: true,
    }),
    hideRegisterPasskeyModal: (state) => ({
      ...state,
      showModal: false,
    }),
  },
});

export const { updateState, showRegisterPasskeyModal, hideRegisterPasskeyModal } = RegisterPasskeySlice.actions;

export default RegisterPasskeySlice.reducer;
