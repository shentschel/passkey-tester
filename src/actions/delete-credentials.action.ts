/** @format */
import axios from 'axios';
import { Tenant } from '../types/passkey-tester.types';

export const DeleteCredentialsAction = async (
  tenant: Tenant,
  publicUrl: string,
  user: string,
  credId: string
): Promise<void> => {
  console.log('userId: ', user);

  await axios.delete(`${publicUrl}/${tenant.id}/credentials/${credId}`, {
    headers: {
      apiKey: tenant.apiKey,
    },
  });
};
