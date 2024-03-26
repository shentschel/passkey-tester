/** @format */

import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Alert, API, Tenant } from '../../types/passkey-tester.types';
import LoginPasskey from '../passkeys/login-passkey';
import RegisterPasskey from '../passkeys/register-passkey';
import TransactionPasskey from '../passkeys/transaction-passkey';

type PasskeySectionProps = {
  tenant: Tenant;
  userId: string;
  api: API;
  onUserChange: (userId: string) => void;
  onRegister: () => void;
  alertHandler: (alert: Alert) => void;
};

const PasskeySection = (props: PasskeySectionProps) => {
  return (
    <>
      <h4 className="h4">Passkey</h4>

      <ButtonGroup size="lg">
        <RegisterPasskey
          tenant={props.tenant}
          userId={props.userId}
          api={props.api}
          onUserChange={props.onUserChange}
          onAlert={props.alertHandler}
          onRegister={props.onRegister}
        />

        <LoginPasskey tenant={props.tenant} api={props.api} userId={props.userId} onAlert={props.alertHandler} />

        <TransactionPasskey tenant={props.tenant} api={props.api} userId={props.userId} onAlert={props.alertHandler} />
      </ButtonGroup>
    </>
  );
};

export default PasskeySection;
