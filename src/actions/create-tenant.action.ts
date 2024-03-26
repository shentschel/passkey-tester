/** @format */
import axios, { AxiosResponse } from 'axios';
import { ApiTenantCreateRequest, ApiTenantResponse } from '../types/api.types';
import { Tenant } from '../types/passkey-tester.types';

export type CreateTenantOptions = {
  displayName: string;
  origin: string;
  timeout: number;
  passkey: CreateWebauthnOptions;
  mfa: CreateWebauthnOptions;
};

export type CreateWebauthnOptions = {
  userVerification: UserVerificationRequirement;
  attachment: AuthenticatorAttachment | 'none';
  attestationPreference: AttestationConveyancePreference;
  residentKeyRequirement: ResidentKeyRequirement;
};

export const CreateTenantAction = async (
  createTenantOptions: CreateTenantOptions,
  adminUrl: string
): Promise<Tenant> => {
  const url: URL = new URL(createTenantOptions.origin);

  const body: ApiTenantCreateRequest = {
    create_api_key: true,
    display_name: createTenantOptions.displayName,
    config: {
      cors: {
        allow_unsafe_wildcard: false,
        allowed_origins: [createTenantOptions.origin],
      },
      webauthn: {
        relying_party: {
          display_name: createTenantOptions.displayName,
          id: url.hostname,
          origins: [createTenantOptions.origin],
        },
        timeout: createTenantOptions.timeout,
        user_verification: createTenantOptions.passkey.userVerification,
        attestation_preference: createTenantOptions.passkey.attestationPreference,
        resident_key_requirement: createTenantOptions.passkey.residentKeyRequirement,
      },
      mfa: {
        timeout: createTenantOptions.timeout,
        user_verification: createTenantOptions.passkey.userVerification,
        attestation_preference: createTenantOptions.passkey.attestationPreference,
        resident_key_requirement: createTenantOptions.passkey.residentKeyRequirement,
      },
    },
  };
  const response = await axios.post<ApiTenantResponse, AxiosResponse<ApiTenantResponse>, ApiTenantCreateRequest>(
    `${adminUrl}/tenants`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return {
    id: response.data.id,
    apiKey: response.data.api_key.secret,
  } as Tenant;
};
