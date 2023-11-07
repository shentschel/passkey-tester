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
import { TransactionPasskeyState } from '../slices/transaction-passkey.slice';
import { LoginPasskey, PasskeyToken, TransactionPasskey } from '../types/passkeys.type';

export const TransactionPasskeyAction = async (
  tenant: Tenant,
  transactionOptions: TransactionPasskeyState,
  config: ConfigState
): Promise<PasskeyToken> => {
  try {
    let body: TransactionPasskey = {
      user_id: transactionOptions.userId,
      transaction_id: transactionOptions.transactionId,
      transaction_data: {
        test: transactionOptions.transactionData,
      },
    };

    const initResponse = await axios.post<
      CredentialRequestOptionsJSON,
      AxiosResponse<CredentialRequestOptionsJSON>,
      LoginPasskey | undefined
    >(`${config.publicUrl}/${tenant.id}/transaction/initialize`, body, {
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
    >(`${config.publicUrl}/${tenant.id}/transaction/finalize`, credential, {
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
