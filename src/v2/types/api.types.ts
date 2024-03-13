/** @format */

export type ApiTenant = {
  id: string;
  api_key: ApiKey;
};

export type ApiKey = {
  secret: string;
};

export type ApiTenantRequestBody = {
  create_api_key: boolean;
  display_name: string;
  config: ApiTenantConfigBody;
};

export type ApiTenantConfigBody = {
  cors: ApiTenantCorsBody;
  webauthn: ApiTenantWebauthnBody;
  mfa: ApiTenantWebauthnBody;
};

export type ApiTenantCorsBody = {
  allowed_origins: string[];
  allow_unsafe_wildcard: boolean;
};

export type ApiTenantWebauthnBody = {
  relying_party: ApiTenantRelyingPartyBody;
  timeout: number;
  user_verification: UserVerificationRequirement;
  attachment?: AuthenticatorAttachment;
  attestation_preference: AttestationConveyancePreference;
  discoverable_credential_requirement: ResidentKeyRequirement;
};

export type ApiTenantRelyingPartyBody = {
  id: string;
  display_name: string;
  origins: string[];
};
