/** @format */

import {
  CredentialRequestOptionsJSON,
  get as getWebauthnCrededential,
  PublicKeyCredentialWithAssertionJSON,
} from '@github/webauthn-json';
import axios, { AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { ApiTransactionRequest } from '../types/api.types';
import { Tenant } from '../types/passkey-tester.types';

export type TransactionPasskeyOptions = {
  tenant: Tenant;
  transaction?: ApiTransactionRequest;
};

export const TransactionPasskeyAction = async (transactionOptions: TransactionPasskeyOptions, publicUrl: string) => {
  const initHeaders: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
    'apiKey': transactionOptions.tenant.apiKey,
  };

  let initUrl = `${publicUrl}/${transactionOptions.tenant.id}/transaction/initialize`;
  let finishUrl = `${publicUrl}/${transactionOptions.tenant.id}/transaction/finalize`;

  const initResponse = await axios.post<
    CredentialRequestOptionsJSON,
    AxiosResponse<CredentialRequestOptionsJSON>,
    ApiTransactionRequest
  >(initUrl, transactionOptions.transaction, {
    headers: initHeaders,
  });

  const credential = await getWebauthnCrededential(initResponse.data);

  await axios.post<any, AxiosResponse<any>, PublicKeyCredentialWithAssertionJSON>(finishUrl, credential, {
    headers: initHeaders,
  });
};
