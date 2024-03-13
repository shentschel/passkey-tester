/** @format */

import axios, { AxiosResponse } from 'axios';
import { TenantCreateState } from '../types/tenant.types';
import { ApiTenant, ApiTenantRequestBody } from '../types/api.types';

const CreateTenantCall = async (adminUrl: string, tenantCreateOptions: TenantCreateState) => {
  const body: ApiTenantRequestBody = {
    create_api_key: true,
    display_name: tenantCreateOptions.displayName,
    config: {
      cors: {
        allowed_origins: [tenantCreateOptions.origin],
        allow_unsafe_wildcard: false,
      },
      webauthn: {
        relying_party: {
          id: 'localhost',
          display_name: tenantCreateOptions.displayName,
          origins: [tenantCreateOptions.origin],
        },
        timeout: tenantCreateOptions.timeout,
        user_verification: tenantCreateOptions.passkey.userVerification,
        attestation_preference: tenantCreateOptions.passkey.attestation,
        discoverable_credential_requirement: tenantCreateOptions.passkey.residentKey,
      },
      mfa: {
        relying_party: {
          id: 'localhost',
          display_name: tenantCreateOptions.displayName,
          origins: [tenantCreateOptions.origin],
        },
        timeout: tenantCreateOptions.timeout,
        user_verification: tenantCreateOptions.mfa.userVerification,
        attestation_preference: tenantCreateOptions.mfa.attestation,
        discoverable_credential_requirement: tenantCreateOptions.mfa.residentKey,
      },
    },
  };

  if (tenantCreateOptions.passkey.attachment !== 'none') {
    body.config.webauthn.attachment = tenantCreateOptions.passkey.attachment;
  }

  if (tenantCreateOptions.mfa.attachment !== 'none') {
    body.config.mfa.attachment = tenantCreateOptions.mfa.attachment;
  }

  const tenantResponse: AxiosResponse<ApiTenant> = await axios.post<
    ApiTenant,
    AxiosResponse<ApiTenant>,
    ApiTenantRequestBody
  >(`${adminUrl}/tenants`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return tenantResponse.data;
};

export { CreateTenantCall };
