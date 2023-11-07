/** @format */
import {
  CredentialCreationOptionsJSON,
  PublicKeyCredentialWithAttestationJSON,
  create as createWebauthnCredential,
} from '@github/webauthn-json';
import axios, { AxiosResponse } from 'axios';
import ErrorHelper from '../../helper/error.helper';
import { ConfigState } from '../../store/slices/config.slice';
import { Tenant } from '../../tenants/slices/tenant.slice';
import { RegisterPasskeyState } from '../slices/register-passkey.slice';
import { PasskeyToken, RegisterPasskey } from '../types/passkeys.type';

export const RegisterPasskeyAction = async (
  tenant: Tenant,
  registerOptions: RegisterPasskeyState,
  config: ConfigState
): Promise<PasskeyToken> => {
  try {
    const registerPasskeyBody: RegisterPasskey = {
      user_id: registerOptions.userId,
      username: registerOptions.userName,
      display_name: registerOptions.displayName,
      icon: registerOptions.icon,
    };

    const initResponse = await axios.post<
      CredentialCreationOptionsJSON,
      AxiosResponse<CredentialCreationOptionsJSON>,
      RegisterPasskey
    >(`${config.publicUrl}/${tenant.id}/registration/initialize`, registerPasskeyBody, {
      headers: {
        'Content-Type': 'application/json',
        'apiKey': tenant.apiKey,
      },
    });

    const credential = await createWebauthnCredential(initResponse.data);

    const response = await axios.post<
      PasskeyToken,
      AxiosResponse<PasskeyToken>,
      PublicKeyCredentialWithAttestationJSON
    >(`${config.publicUrl}/${tenant.id}/registration/finalize`, credential, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (err: any) {
    throw new Error(ErrorHelper.CreateErrorResponse(err));
  }
};
