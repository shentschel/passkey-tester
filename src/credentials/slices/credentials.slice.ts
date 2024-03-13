/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { Credentials } from '../types/credentials.type';

export type CredentialsState = {
  credentials: Credentials;
  hasNew: boolean;
};

const initialState: CredentialsState = {
  credentials: [],
  hasNew: false,
};

export const CredentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    set: (state, action: { payload: Credentials }) => ({
      ...state,
      credentials: action.payload,
    }),
    hasNew: (state) => ({
      ...state,
      hasNew: true,
    }),
    reset: (state) => ({
      ...state,
      hasNew: false,
    }),
  },
});

export const { set, hasNew, reset } = CredentialsSlice.actions;

export default CredentialsSlice.reducer;
