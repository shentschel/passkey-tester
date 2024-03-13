/** @format */

import { Message } from './message.types';
import { Tenant } from './tenant.types';
import { User } from './user.types';

export type RootState = {
  message: Message;
  tenant: Tenant;
  config: Config;
  user: User;
};

export type Config = {
  adminUrl: string;
  publicUrl: string;
};
