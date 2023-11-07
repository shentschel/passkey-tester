/** @format */

import { createSlice } from '@reduxjs/toolkit';

export type CreateTenantState = {
  showModal: boolean;
  displayName: string;
  origin: string;
  timeout: number;
  passkey: CreateWebauthnState;
  mfa: CreateWebauthnState;
};

export type CreateWebauthnState = {
  attestationPreference: AttestationConveyancePreference;
  attachment: AuthenticatorAttachment | 'none';
  residentKeyRequirement: ResidentKeyRequirement;
  userVerification: UserVerificationRequirement;
};

const initialState: CreateTenantState = {
  showModal: false,
  displayName: 'Test Tenant',
  origin: 'http://localhost:3000',
  timeout: 60000,

  passkey: {
    attestationPreference: 'none',
    attachment: 'none',
    residentKeyRequirement: 'preferred',
    userVerification: 'required',
  },

  mfa: {
    attestationPreference: 'none',
    attachment: 'cross-platform',
    userVerification: 'preferred',
    residentKeyRequirement: 'discouraged',
  },
};

export const CreateTenantSlice = createSlice({
  name: 'create-tenant',
  initialState,
  reducers: {
    showCreateModal: (state) => ({
      ...state,
      showModal: true,
    }),
    hideCreateModal: (state) => ({
      ...state,
      showModal: false,
    }),
    updateCommon: (state, action: { payload: Partial<CreateTenantState> }) => ({
      ...state,
      ...action.payload,
    }),
    updatePasskey: (state, action: { payload: Partial<CreateWebauthnState> }) => {
      const newPasskeyState: CreateWebauthnState = {
        ...state.passkey,
        ...action.payload,
      };

      return {
        ...state,
        passkey: newPasskeyState,
      };
    },
    updateMfa: (state, action: { payload: Partial<CreateWebauthnState> }) => {
      const newMfaState: CreateWebauthnState = {
        ...state.mfa,
        ...action.payload,
      };

      return {
        ...state,
        passkey: newMfaState,
      };
    },
  },
});

export const { showCreateModal, hideCreateModal, updateCommon, updatePasskey, updateMfa } = CreateTenantSlice.actions;

export default CreateTenantSlice.reducer;
