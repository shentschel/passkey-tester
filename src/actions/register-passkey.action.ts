/** @format */

import {
  create as createWebauthnCredential,
  CredentialCreationOptionsJSON,
  PublicKeyCredentialWithAttestationJSON,
} from '@github/webauthn-json';
import axios, { AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { ApiRegisterRequest } from '../types/api.types';
import { Tenant } from '../types/passkey-tester.types';

export type RegisterPasskeyOptions = {
  tenant: Tenant;
  user: ApiRegisterRequest;
  isMfa: boolean;
};

export const RegisterPasskeyAction = async (registerOptions: RegisterPasskeyOptions, publicUrl: string) => {
  const initHeaders: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
    'apiKey': registerOptions.tenant.apiKey,
  };

  let registerInitUrl = `${publicUrl}/${registerOptions.tenant.id}/${registerOptions.isMfa ? 'mfa/' : ''}registration/initialize`;
  let registerFinishUrl = `${publicUrl}/${registerOptions.tenant.id}/${registerOptions.isMfa ? 'mfa/' : ''}registration/finalize`;

  const initResponse = await axios.post<
    CredentialCreationOptionsJSON,
    AxiosResponse<CredentialCreationOptionsJSON>,
    ApiRegisterRequest
  >(registerInitUrl, registerOptions.user, {
    headers: initHeaders,
  });

  const credential = await createWebauthnCredential(initResponse.data);

  await axios.post<any, AxiosResponse<any>, PublicKeyCredentialWithAttestationJSON>(registerFinishUrl, credential, {
    headers: initHeaders,
  });
};
