/** @format */

import { createSlice } from '@reduxjs/toolkit';

export type MessageState = {
  show: boolean;
  type: string;
  message: string;
};

export type MessageAction = {
  type: string;
  message: string;
};

const initialState: MessageState = {
  show: false,
  type: 'info',
  message: 'Operation was successful',
};

export const CreateMessageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showSuccessMessage: (state, action: { payload: string }) => ({
      ...state,
      show: true,
      type: 'info',
      message: action.payload,
    }),
    showErrorMessage: (state, action: { payload: string }) => ({
      ...state,
      show: true,
      type: 'warning',
      message: action.payload,
    }),
    hideMessage: (state) => ({
      ...state,
      show: false,
    }),
  },
});

export const { hideMessage, showSuccessMessage, showErrorMessage } = CreateMessageSlice.actions;

export default CreateMessageSlice.reducer;
