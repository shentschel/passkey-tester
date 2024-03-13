/** @format */
import React from 'react';
import { MessageAction } from './message.types';
import { Config } from './passkey-tester.types';

export enum TenantViewActionType {
  UPDATE,
}

export type Tenant = {
  id: string;
  apiKey: string;
};

export type TenantViewAction = {
  tenant: Partial<Tenant>;
  type: TenantViewActionType;
};

export type TenantViewProps = {
  config: Config;
  tenant: Tenant;
  tenantDispatcher: React.Dispatch<TenantViewAction>;
  alertDispatcher: React.Dispatch<MessageAction>;
};

export type TenantWebauthnState = {
  attestation: AttestationConveyancePreference;
  attachment: AuthenticatorAttachment | 'none';
  residentKey: ResidentKeyRequirement;
  userVerification: UserVerificationRequirement;
};

export enum TenantCreateActionType {
  SHOW,
  HIDE,
  UPDATE,
  UPDATE_PASSKEY,
  UPDATE_MFA,
}

export type TenantCreateState = {
  show: boolean;
  displayName: string;
  timeout: number;
  origin: string;

  passkey: TenantWebauthnState;
  mfa: TenantWebauthnState;
};

export type TenantWebauthnProps = {
  title: string;
  webauthn: TenantWebauthnState;
  dispatcher: React.Dispatch<TenantCreateAction>;
  isMfa: boolean;
};

export type TenantCreateAction = {
  type: TenantCreateActionType;
  tenant?: Partial<TenantCreateState>;
  webauthn?: Partial<TenantWebauthnState>;
};

export type TenantCreateProps = {
  adminUrl: string;
  tenantDispatcher: React.Dispatch<TenantViewAction>;
  alertDispatcher: React.Dispatch<MessageAction>;
};
