/** @format */

import {
  CredentialRequestOptionsJSON,
  get as getWebauthnCrededential,
  PublicKeyCredentialWithAssertionJSON,
} from '@github/webauthn-json';
import axios, { AxiosResponse } from 'axios';
import ErrorHelper from '../../helper/error.helper';
import { ConfigState } from '../../store/slices/config.slice';
import { Tenant } from '../../tenants/slices/tenant.slice';
import { LoginPasskeyState } from '../slices/login-passkey.slice';
import { LoginPasskey, PasskeyToken } from '../types/passkeys.type';

export const LoginPasskeyAction = async (
  tenant: Tenant,
  loginOptions: LoginPasskeyState,
  config: ConfigState
): Promise<PasskeyToken> => {
  try {
    let body: LoginPasskey | undefined = undefined;
    if (loginOptions.withUserId) {
      body = {
        user_id: loginOptions.userId,
      };
    }

    const initResponse = await axios.post<
      CredentialRequestOptionsJSON,
      AxiosResponse<CredentialRequestOptionsJSON>,
      LoginPasskey | undefined
    >(`${config.publicUrl}/${tenant.id}/login/initialize`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const credential = await getWebauthnCrededential(initResponse.data);

    const tokenResponse = await axios.post<
      PasskeyToken,
      AxiosResponse<PasskeyToken>,
      PublicKeyCredentialWithAssertionJSON
    >(`${config.publicUrl}/${tenant.id}/login/finalize`, credential, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return tokenResponse.data;
  } catch (err) {
    throw new Error(ErrorHelper.CreateErrorResponse(err));
  }
};
