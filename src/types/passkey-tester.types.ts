/** @format */

import { Variant } from 'react-bootstrap/types';

export type RootState = {
  alert: Alert;
  api: API;
  tenant: Tenant;
  user: User;
  credentials: Credentials;
};

export type Alert = {
  message: string;
  type: Variant;
  show: boolean;
};

export type API = {
  public: string;
  admin: string;
};

export type Tenant = {
  id: string;
  apiKey: string;
};

export type User = {
  id: string;
};

export type WebauthnData = {
  userVerification: UserVerificationRequirement;
  attachment: AuthenticatorAttachment | 'none';
  attestationPreference: AttestationConveyancePreference;
  residentKeyRequirement: ResidentKeyRequirement;
};

export type Credential = {
  id: string;
  name: string;
  isMFA: boolean;
};

export type Credentials = Credential[];
