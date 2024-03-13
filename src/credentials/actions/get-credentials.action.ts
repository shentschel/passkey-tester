/** @format */

import axios, { AxiosResponse } from 'axios';
import ErrorHelper from '../../helper/error.helper';
import { RegisterMfaState } from '../../mfa/slices/register-mfa.slice';
import { RegisterPasskeyState } from '../../passkeys/slices/register-passkey.slice';
import { ConfigState } from '../../store/slices/config.slice';
import { Tenant } from '../../tenants/slices/tenant.slice';
import { ApiCredentials, Credential, Credentials } from '../types/credentials.type';

export const GetCredentialsAction = async (
  tenant: Tenant,
  config: ConfigState,
  user: RegisterPasskeyState | RegisterMfaState,
  isMfa: boolean = false
): Promise<Credentials> => {
  console.log('userId: ', user.userId);
  if (!user.registrationDone) {
    return [];
  }

  try {
    const response: AxiosResponse<ApiCredentials> = await axios.get(`${config.publicUrl}/${tenant.id}/credentials`, {
      params: {
        user_id: user.userId,
      },
      headers: {
        apiKey: tenant.apiKey,
      },
    });

    return response.data.map(
      (credential): Credential => ({
        ...credential,
        type: isMfa ? 'mfa' : 'passkey',
      })
    );
  } catch (error) {
    throw new Error(ErrorHelper.CreateErrorResponse(error));
  }
};
