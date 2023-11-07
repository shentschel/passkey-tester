/** @format */

export type RegisterMfa = {
  user_id: string;
  username: string;
  display_name?: string;
  icon?: string;
};

export type LoginMfa = {
  user_id: string;
};

export type PasskeyToken = {
  token: string;
};
