/** @format */

import React, { useState } from 'react';
import ErrorHelper from '../../helper/error.helper';
import { RegisterPasskeyAction, RegisterPasskeyOptions } from '../../actions/register-passkey.action';
import { Alert, API, Tenant } from '../../types/passkey-tester.types';
import ButtonModal from '../common/button-modal';
import { FloatedLabelInput } from '../common/labeled-input';

type RegisterPasskeyProps = {
  tenant: Tenant;
  userId: string;
  isMFA?: boolean;
  api: API;
  onUserChange: (userId: string) => void;
  onAlert: (newAlert: Alert) => void;
  onRegister: () => void;
};

type RegisterPasskeyState = {
  name: string;
  displayName: string;
  icon?: string;
};

const initialState: RegisterPasskeyState = {
  name: 'sjacobi',
  displayName: 'Stefan Jacobi',
};

const RegisterPasskey = (props: RegisterPasskeyProps) => {
  const [name, setName] = useState(initialState.name);
  const [displayName, setDisplayName] = useState(initialState.displayName);
  const [icon, setIcon] = useState(initialState.icon);

  const execute = async () => {
    try {
      const options: RegisterPasskeyOptions = {
        tenant: props.tenant,
        isMfa: props.isMFA ?? false,
        user: {
          user_id: props.userId,
          username: name,
          display_name: displayName,
        },
      };

      if (icon !== undefined) {
        options.user.icon = icon;
      }

      await RegisterPasskeyAction(options, props.api.public);

      props.onRegister();

      props.onAlert({
        show: true,
        message: `${props.isMFA ? 'MFA' : 'Passkey'} registration successful`,
        type: 'success',
      });
    } catch (err) {
      props.onAlert({
        show: true,
        message: ErrorHelper.CreateErrorResponse(err),
        type: 'danger',
      });
    }
  };

  return (
    <ButtonModal title="Register" variant="primary" buttonSize={'lg'} handler={execute}>
      <FloatedLabelInput
        id="register-passkey-userid"
        label="User ID"
        value={props.userId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onUserChange(e.target.value)}
      />

      <FloatedLabelInput
        id="register-passkey-name"
        label="Username"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />

      <FloatedLabelInput
        id="register-passkey-displayname"
        label="Display Name"
        value={displayName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
      />

      <FloatedLabelInput
        id="register-passkey-icon"
        label="Icon"
        value={icon}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIcon(e.target.value)}
      />
    </ButtonModal>
  );
};

export default RegisterPasskey;
