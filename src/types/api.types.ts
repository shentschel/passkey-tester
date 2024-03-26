/** @format */

export type ApiTenantCreateRequest = {
  display_name: string;
  create_api_key: boolean;
  config: ApiConfigCreateRequest;
};

export type ApiConfigCreateRequest = {
  cors: ApiCorsCreateRequest;
  webauthn: ApiWebauthnCreateRequest;
  mfa: ApiMFACreateRequest;
};

export type ApiCorsCreateRequest = {
  allowed_origins: string[];
  allow_unsafe_wildcard: boolean;
};

export type ApiWebauthnCreateRequest = {
  relying_party: ApiRelyingPartyCreateRequest;
  timeout: number;
  user_verification: UserVerificationRequirement;
  attachment?: AuthenticatorAttachment;
  attestation_preference: AttestationConveyancePreference;
  resident_key_requirement: ResidentKeyRequirement;
};

export type ApiMFACreateRequest = {
  timeout: number;
  user_verification: UserVerificationRequirement;
  attachment?: AuthenticatorAttachment;
  attestation_preference: AttestationConveyancePreference;
  resident_key_requirement: ResidentKeyRequirement;
};

export type ApiRelyingPartyCreateRequest = {
  id: string;
  display_name?: string;
  icon?: string;
  origins: string[];
};

export type ApiTenantResponse = {
  id: string;
  api_key: ApiSecretResponse;
};

export type ApiSecretResponse = {
  id: string;
  name: string;
  secret: string;
  created_at: Date;
};

export type ApiRegisterRequest = {
  user_id: string;
  username: string;
  display_name: string;
  icon?: string;
};

export type ApiLoginRequest = {
  user_id: string;
};

export type ApiTransactionRequest = {
  user_id: string;
  transaction_id: string;
  transaction_data: Object;
};

export type ApiCredentialResponse = {
  id: string;
  name: string;
  is_mfa: boolean;
};

export type ApiCredentialRequest = {
  user_id: string;
};
