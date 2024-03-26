/** @format */
import axios from 'axios';
import { Tenant } from '../types/passkey-tester.types';

export type CreateTenantOptions = {
  displayName: string;
  origin: string;
  timeout: number;
  passkey: CreateWebauthnOptions;
  mfa: CreateWebauthnOptions;
};

export type CreateWebauthnOptions = {
  userVerification: UserVerificationRequirement;
  attachment: AuthenticatorAttachment | 'none';
  attestationPreference: AttestationConveyancePreference;
  residentKeyRequirement: ResidentKeyRequirement;
};

export const DeleteTenantAction = async (tenant: Tenant, adminUrl: string): Promise<void> => {
  await axios.delete(`${adminUrl}/tenants/${tenant.id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
