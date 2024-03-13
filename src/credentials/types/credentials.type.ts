/** @format */

export type ApiCredential = {
  id: string;
  name: string;
};

export type ApiCredentials = ApiCredential[];

export type Credential = {
  id: string;
  name: string;
  type: 'mfa' | 'passkey';
};

export type Credentials = Credential[];
