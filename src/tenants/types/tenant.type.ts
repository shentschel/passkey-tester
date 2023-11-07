export type CreatedTenant = {
  id: string,
  api_key: ApiKey
}

export type ApiKey = {
  id: string,
  secret: string,
  name: string,
  created_at: Date
}

export type CreateTenantBody = {
  create_api_key: boolean,
  display_name: string,
  config: CreateConfigBody,
}

export type CreateConfigBody = {
  cors: CreateCorsBody,
  webauthn: CreateWebauthnBody
  mfa: CreateWebauthnBody
}

export type CreateCorsBody = {
  allowed_origins: string[],
  allow_unsafe_wildcard: boolean
}

export type CreateWebauthnBody = {
  relying_party: CreateRelyingPartyBody
  timeout: number
  user_verification: UserVerificationRequirement,
  attachment?: AuthenticatorAttachment
  attestation_preference: AttestationConveyancePreference,
  discoverable_credential_requirement: ResidentKeyRequirement
}

export type CreateRelyingPartyBody = {
  id: string,
  display_name: string,
  origins: string[]
}
