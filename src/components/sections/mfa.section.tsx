/** @format */

import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Alert, API, Tenant } from '../../types/passkey-tester.types';
import LoginPasskey from '../passkeys/login-passkey';
import RegisterPasskey from '../passkeys/register-passkey';

type MFASectionProps = {
  tenant: Tenant;
  userId: string;
  api: API;
  onUserChange: (userId: string) => void;
  onRegister: () => void;
  alertHandler: (alert: Alert) => void;
};

const MFASection = (props: MFASectionProps) => {
  return (
    <>
      <h4 className="h4">MFA</h4>

      <ButtonGroup size="lg">
        <RegisterPasskey
          tenant={props.tenant}
          api={props.api}
          userId={props.userId}
          onUserChange={props.onUserChange}
          onRegister={props.onRegister}
          onAlert={props.alertHandler}
          isMFA={true}
        />

        <LoginPasskey
          tenant={props.tenant}
          api={props.api}
          userId={props.userId}
          onAlert={props.alertHandler}
          isMFA={true}
        />
      </ButtonGroup>
    </>
  );
};

export default MFASection;
