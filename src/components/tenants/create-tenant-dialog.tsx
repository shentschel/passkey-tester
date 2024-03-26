/** @format */

import React, { useState } from 'react';
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import ErrorHelper from '../../helper/error.helper';
import { CreateTenantAction, CreateTenantOptions, CreateWebauthnOptions } from '../../actions/create-tenant.action';
import { Alert, API, Tenant } from '../../types/passkey-tester.types';
import ButtonModal from '../common/button-modal';
import { PasskeySettings } from './passkey-settings';

type CreateTenantProps = {
  api: API;
  onChange: (tenant: Tenant) => void;
  onAlert: (alert: Alert) => void;
};

type CommonSettings = {
  displayName: string;
  timeout: number;
  origin: string;
};

type WebauthnSettings = {
  userVerification: UserVerificationRequirement;
  attachment: AuthenticatorAttachment | 'none';
  attestationPreference: AttestationConveyancePreference;
  residentKeyRequirement: ResidentKeyRequirement;
};

type CreateTenantState = {
  common: CommonSettings;
  passkey: WebauthnSettings;
  mfa: WebauthnSettings;
};

const initialState: CreateTenantState = {
  common: {
    displayName: 'Test Tenant',
    timeout: 60000,
    origin: 'http://localhost:3000',
  },

  passkey: {
    attachment: 'none',
    attestationPreference: 'direct',
    residentKeyRequirement: 'required',
    userVerification: 'required',
  },

  mfa: {
    attachment: 'none',
    attestationPreference: 'direct',
    residentKeyRequirement: 'preferred',
    userVerification: 'discouraged',
  },
};

const CreateTenantDialog = (props: CreateTenantProps) => {
  const [tenantSettings, setTenantSettings] = useState<CommonSettings>(initialState.common);
  const [passkeySettings, setPasskeySettings] = useState<WebauthnSettings>(initialState.passkey);
  const [mfaSettings, setMfaSettings] = useState<WebauthnSettings>(initialState.mfa);

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTenantSettings({ ...tenantSettings, displayName: e.target.value });

  const updateTimeout = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTenantSettings({ ...tenantSettings, timeout: parseInt(e.target.value) });

  const updateOrigin = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTenantSettings({ ...tenantSettings, origin: e.target.value });

  const createTenant = async () => {
    const createOptions: CreateTenantOptions = {
      ...tenantSettings,
      passkey: passkeySettings as CreateWebauthnOptions,
      mfa: mfaSettings as CreateWebauthnOptions,
    };

    try {
      const tenant = await CreateTenantAction(createOptions, props.api.admin);
      props.onChange(tenant);

      props.onAlert({
        type: 'success',
        message: 'Created Tenant',
        show: true,
      });
    } catch (err) {
      props.onAlert({
        type: 'danger',
        message: ErrorHelper.CreateErrorResponse(err),
        show: true,
      });
    }
  };

  return (
    <ButtonModal title="Create Tenant" variant="primary" handler={createTenant}>
      <div className="h5 mb-3">Default Settings</div>

      <FloatingLabel label="Display Name" controlId="create-display-name" className="mb-3">
        <Form.Control type="text" defaultValue={tenantSettings.displayName} onChange={updateName} />
      </FloatingLabel>

      <FloatingLabel label="Timeout" controlId="create-timeout" className="mb-3">
        <Form.Control type="number" defaultValue={tenantSettings.timeout} onChange={updateTimeout} />
      </FloatingLabel>

      <FloatingLabel label="Origin" controlId="create-origin" className="mb-3">
        <Form.Control type="text" defaultValue={tenantSettings.origin} onChange={updateOrigin} />
      </FloatingLabel>

      <Container>
        <Row>
          <Col>
            <PasskeySettings title={'Passkey Settings'} data={passkeySettings} handler={setPasskeySettings} />
          </Col>
          <Col>
            <PasskeySettings title={'MFA Settings'} data={mfaSettings} handler={setMfaSettings} />
          </Col>
        </Row>
      </Container>
    </ButtonModal>
  );
};

export default CreateTenantDialog;
