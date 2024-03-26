/** @format */
import axios, { AxiosResponse } from 'axios';
import { ApiCredentialRequest, ApiCredentialResponse } from '../types/api.types';
import { Tenant, Credential } from '../types/passkey-tester.types';

export const GetCredentialsAction = async (tenant: Tenant, publicUrl: string, user: string): Promise<Credential[]> => {
  console.log('userId: ', user);

  const response: AxiosResponse<ApiCredentialResponse[]> = await axios.get<
    ApiCredentialResponse[],
    AxiosResponse<ApiCredentialResponse[]>,
    ApiCredentialRequest
  >(`${publicUrl}/${tenant.id}/credentials`, {
    params: {
      user_id: user,
    },
    headers: {
      apiKey: tenant.apiKey,
    },
  });

  console.log(response.data);

  return response.data.map(
    (credential: ApiCredentialResponse): Credential => ({
      ...credential,
      isMFA: credential.is_mfa,
    })
  );
};
