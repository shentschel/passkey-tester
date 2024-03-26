/** @format */

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ErrorHelper from '../../helper/error.helper';
import { LoginPasskeyAction, LoginPasskeyOptions } from '../../actions/login-passkey.action';
import { Alert, API, Tenant } from '../../types/passkey-tester.types';
import ButtonModal from '../common/button-modal';
import { FloatedLabelInput } from '../common/labeled-input';

type LoginPasskeyProps = {
  tenant: Tenant;
  userId: string;
  api: API;
  isMFA?: boolean;
  onAlert: (newAlert: Alert) => void;
};

const LoginPasskey = (props: LoginPasskeyProps) => {
  const [useDiscoverable, setUseDiscoverable] = useState(!props.isMFA);
  const [userId, setUserId] = useState(props.userId);

  const renderDiscoverableCheckbox = () => {
    if (props.isMFA) {
      return;
    } else {
      return (
        <Form.Check
          type="switch"
          checked={useDiscoverable}
          onChange={() => setUseDiscoverable(!useDiscoverable)}
          id="login-use-discover"
          label="Use discoverable passkey"
        />
      );
    }
  };

  const execute = async () => {
    try {
      const options: LoginPasskeyOptions = {
        tenant: props.tenant,
        isMfa: props.isMFA ?? false,
        user: props.isMFA || !useDiscoverable ? { user_id: userId } : undefined,
      };

      await LoginPasskeyAction(options, props.api.public);

      props.onAlert({
        show: true,
        message: `${props.isMFA ? 'MFA' : 'Passkey'} login successful`,
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
    <ButtonModal title={'Login'} variant={'secondary'} handler={execute}>
      <FloatedLabelInput
        id={'login-user-id'}
        label={'User ID'}
        value={userId}
        disabled={useDiscoverable}
        readonly={useDiscoverable}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
      />

      {renderDiscoverableCheckbox()}
    </ButtonModal>
  );
};

export default LoginPasskey;
