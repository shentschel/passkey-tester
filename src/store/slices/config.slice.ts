/** @format */

import { createSlice } from '@reduxjs/toolkit';

export type ConfigState = {
  adminUrl: string;
  publicUrl: string;
};

const initialState: ConfigState = {
  adminUrl: 'http://10.0.2.2:8001',
  publicUrl: 'http://10.0.2.2:8000',
};

export const ConfigSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
});

export default ConfigSlice.reducer;
