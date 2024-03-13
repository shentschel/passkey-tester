/** @format */

import { createSlice } from '@reduxjs/toolkit';
import * as uuid from 'uuid';

export type RegisterMfaState = {
  showModal: boolean;
  userId: string;
  userName: string;
  displayName?: string;
  icon?: string;
  registrationDone: boolean;
};

const initialState: RegisterMfaState = {
  showModal: false,
  userId: uuid.v4(),
  userName: 'sjacobi',
  displayName: 'Stefan Jacobi',
  icon: undefined,
  registrationDone: false,
};

export const RegisterMfaSlice = createSlice({
  name: 'registerMfa',
  initialState,
  reducers: {
    updateState: (state, action: { payload: Partial<RegisterMfaState> }) => ({
      ...state,
      ...action.payload,
    }),
    showRegisterMfaModal: (state) => ({
      ...state,
      showModal: true,
    }),
    hideRegisterMfaModal: (state) => ({
      ...state,
      showModal: false,
    }),
  },
});

export const { updateState, showRegisterMfaModal, hideRegisterMfaModal } = RegisterMfaSlice.actions;

export default RegisterMfaSlice.reducer;
