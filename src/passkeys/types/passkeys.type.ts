/** @format */

export type RegisterPasskey = {
  user_id: string;
  username: string;
  display_name?: string;
  icon?: string;
};

export type LoginPasskey = {
  user_id: string;
};

export type TransactionPasskey = {
  user_id: string;
  transaction_id: string;
  transaction_data: Object;
};

export type PasskeyToken = {
  token: string;
};
