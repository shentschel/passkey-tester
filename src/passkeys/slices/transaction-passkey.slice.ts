/** @format */
import { createSlice } from '@reduxjs/toolkit';
import * as UUID from 'uuid';

export type TransactionPasskeyState = {
  showModal: boolean;
  transactionId: string;
  userId: string;
  transactionData: string;
};

const initialState: TransactionPasskeyState = {
  showModal: false,
  transactionId: UUID.v4(),
  transactionData: UUID.v4(),
  userId: '',
};

export const TransactionPasskeySlice = createSlice({
  name: 'loginPasskey',
  initialState,
  reducers: {
    updateUserId: (state, action: { payload: string }): TransactionPasskeyState => ({
      ...state,
      userId: action.payload,
    }),
    updateTransactionId: (state, action: { payload: string }): TransactionPasskeyState => ({
      ...state,
      transactionId: action.payload,
    }),
    updateTransactionData: (state, action: { payload: string }): TransactionPasskeyState => ({
      ...state,
      transactionData: action.payload,
    }),
    showTransaction: (state): TransactionPasskeyState => ({
      ...state,
      showModal: true,
    }),
    hideTransaction: (state): TransactionPasskeyState => ({
      ...state,
      showModal: false,
    }),
  },
});

export const { updateUserId, updateTransactionId, updateTransactionData, showTransaction, hideTransaction } =
  TransactionPasskeySlice.actions;

export default TransactionPasskeySlice.reducer;
