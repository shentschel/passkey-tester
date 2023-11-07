/** @format */

import { createSlice } from '@reduxjs/toolkit';

export type ConfigState = {
  adminUrl: string;
  publicUrl: string;
};

const initialState: ConfigState = {
  adminUrl: 'http://localhost:8001',
  publicUrl: 'http://localhost:8000',
};

export const ConfigSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
});

export default ConfigSlice.reducer;
