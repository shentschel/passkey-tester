/** @format */

import { createSlice } from '@reduxjs/toolkit';

export type Tenant = {
  id: string;
  apiKey: string;
};

const initialState: Tenant = {
  id: '',
  apiKey: '',
};

export const TenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    updateTenant: (state, action: { payload: Partial<Tenant> }) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { updateTenant } = TenantSlice.actions;

export default TenantSlice.reducer;
