/** @format */

import axios from 'axios';
import ErrorHelper from '../../helper/error.helper';
import { ConfigState } from '../../store/slices/config.slice';
import { CreateTenantState } from '../slices/tenant-create.slice';
import { Tenant } from '../slices/tenant.slice';
import { CreatedTenant, CreateTenantBody } from '../types/tenant.type';

export const CreateTenantAction = async (createOptions: CreateTenantState, config: ConfigState): Promise<Tenant> => {
  let passkeyAttachment: AuthenticatorAttachment | undefined = undefined;
  if (createOptions.passkey.attachment !== 'none') {
    passkeyAttachment = createOptions.passkey.attachment;
  }

  let mfaAttachment: AuthenticatorAttachment = 'cross-platform';
  if (createOptions.passkey.attachment !== 'none') {
    mfaAttachment = createOptions.passkey.attachment;
  }

  const createTenantBody: CreateTenantBody = {
    create_api_key: true,
    display_name: createOptions.displayName,
    config: {
      cors: {
        allowed_origins: [createOptions.origin],
        allow_unsafe_wildcard: false,
      },
      webauthn: {
        relying_party: {
          display_name: createOptions.displayName,
          origins: [createOptions.origin],
          id: 'localhost',
        },
        timeout: createOptions.timeout,
        attestation_preference: createOptions.passkey.attestationPreference,
        user_verification: createOptions.passkey.userVerification,
        attachment: passkeyAttachment,
        discoverable_credential_requirement: createOptions.passkey.residentKeyRequirement,
      },
      mfa: {
        relying_party: {
          display_name: createOptions.displayName,
          origins: [createOptions.origin],
          id: 'localhost',
        },
        timeout: createOptions.timeout,
        attestation_preference: createOptions.mfa.attestationPreference,
        user_verification: createOptions.mfa.userVerification,
        attachment: mfaAttachment,
        discoverable_credential_requirement: createOptions.mfa.residentKeyRequirement,
      },
    },
  };

  try {
    const response = await axios.post<CreatedTenant>(`${config.adminUrl}/tenants`, createTenantBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id,
      apiKey: response.data.api_key.secret,
    } as Tenant;
  } catch (err) {
    throw new Error(ErrorHelper.CreateErrorResponse(err));
  }
};
