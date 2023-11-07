/** @format */

import { configureStore } from '@reduxjs/toolkit';
import TenantReducer from '../tenants/slices/tenant.slice';
import CreateTenantReducer from '../tenants/slices/tenant-create.slice';
import ConfigReducer from './slices/config.slice';
import MessageReducer from '../messages/slices/message.slice';
import RegisterPasskeyReducer from '../passkeys/slices/register-passkey.slice';
import LoginPasskeyReducer from '../passkeys/slices/login-passkey.slice';
import TransactionPasskeyReducer from '../passkeys/slices/transaction-passkey.slice';
import RegisterMfaReducer from '../mfa/slices/register-mfa.slice';
import LoginMfaReducer from '../mfa/slices/login-mfa.slice';

const store = configureStore({
  reducer: {
    tenant: TenantReducer,
    createTenant: CreateTenantReducer,
    message: MessageReducer,
    config: ConfigReducer,
    registerPasskey: RegisterPasskeyReducer,
    loginPasskey: LoginPasskeyReducer,
    transactionPasskey: TransactionPasskeyReducer,
    registerMfa: RegisterMfaReducer,
    loginMfa: LoginMfaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
