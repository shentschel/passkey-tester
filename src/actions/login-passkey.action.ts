/** @format */

import {
  CredentialRequestOptionsJSON,
  get as getWebauthnCrededential,
  PublicKeyCredentialWithAssertionJSON,
} from '@github/webauthn-json';
import axios, { AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { ApiLoginRequest } from '../types/api.types';
import { Tenant } from '../types/passkey-tester.types';

export type LoginPasskeyOptions = {
  tenant: Tenant;
  user?: ApiLoginRequest;
  isMfa: boolean;
};

export const LoginPasskeyAction = async (loginOptions: LoginPasskeyOptions, publicUrl: string) => {
  const initHeaders: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
    'apiKey': loginOptions.tenant.apiKey,
  };

  let initUrl = `${publicUrl}/${loginOptions.tenant.id}/${loginOptions.isMfa ? 'mfa/' : ''}login/initialize`;
  let finishUrl = `${publicUrl}/${loginOptions.tenant.id}/${loginOptions.isMfa ? 'mfa/' : ''}login/finalize`;

  const initResponse = await axios.post<
    CredentialRequestOptionsJSON,
    AxiosResponse<CredentialRequestOptionsJSON>,
    ApiLoginRequest
  >(initUrl, loginOptions.user, {
    headers: initHeaders,
  });

  const credential = await getWebauthnCrededential(initResponse.data);

  await axios.post<any, AxiosResponse<any>, PublicKeyCredentialWithAssertionJSON>(finishUrl, credential, {
    headers: initHeaders,
  });
};
