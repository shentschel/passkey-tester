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
import { LoginMfaState } from '../slices/login-mfa.slice';
import { LoginMfa, PasskeyToken } from '../types/passkeys.type';

export const LoginMfaAction = async (
  tenant: Tenant,
  loginOptions: LoginMfaState,
  config: ConfigState
): Promise<PasskeyToken> => {
  try {
    let body: LoginMfa = {
      user_id: loginOptions.userId,
    };

    const initResponse = await axios.post<
      CredentialRequestOptionsJSON,
      AxiosResponse<CredentialRequestOptionsJSON>,
      LoginMfa
    >(`${config.publicUrl}/${tenant.id}/login/initialize`, body, {
      headers: {
        'Content-Type': 'application/json',
        'apiKey': tenant.apiKey,
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
        'apiKey': tenant.apiKey,
      },
    });

    return tokenResponse.data;
  } catch (err) {
    throw new Error(ErrorHelper.CreateErrorResponse(err));
  }
};
