/** @format */

import React, { useReducer } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { CreateTenantCall } from '../../api/tenant';
import TenantCreateReducer from '../../state/reducers/tenant-create.reducer';
import { ApiTenant } from '../../types/api.types';
import { MessageActionType } from '../../types/message.types';
import {
  TenantCreateActionType,
  TenantCreateProps,
  TenantCreateState,
  TenantViewActionType,
} from '../../types/tenant.types';
import TenantWebauthnComponent from './create-webauthn.component';

const initialState: TenantCreateState = {
  show: false,
  displayName: 'Test Tenant',
  timeout: 60000,
  origin: 'http://localhost:3000',
  passkey: {
    attachment: 'none',
    attestation: 'none',
    residentKey: 'preferred',
    userVerification: 'required',
  },
  mfa: {
    attachment: 'cross-platform',
    attestation: 'none',
    residentKey: 'discouraged',
    userVerification: 'preferred',
  },
};

const TenantCreateComponent = ({ adminUrl, tenantDispatcher, alertDispatcher }: TenantCreateProps) => {
  const [tenantForm, createDispatcher] = useReducer(TenantCreateReducer, initialState);

  const create = async () => {
    const createdTenant: ApiTenant = await CreateTenantCall(adminUrl, tenantForm);
    tenantDispatcher({
      type: TenantViewActionType.UPDATE,
      tenant: {
        id: createdTenant.id,
        apiKey: createdTenant.api_key.secret,
      },
    });
    alertDispatcher({
      type: MessageActionType.SHOW,
      message: { message: 'Tenant created successful', type: 'success' },
    });
    createDispatcher({ type: TenantCreateActionType.HIDE });
  };

  const updateDisplayName = (e: React.ChangeEvent<HTMLInputElement>) =>
    createDispatcher({ type: TenantCreateActionType.UPDATE, tenant: { displayName: e.target.value } });

  const updateTimeout = (e: React.ChangeEvent<HTMLInputElement>) =>
    createDispatcher({ type: TenantCreateActionType.UPDATE, tenant: { timeout: parseInt(e.target.value) } });

  const updateOrigin = (e: React.ChangeEvent<HTMLInputElement>) =>
    createDispatcher({ type: TenantCreateActionType.UPDATE, tenant: { origin: e.target.value } });

  return (
    <>
      <Button variant="primary" size="lg" onClick={() => createDispatcher({ type: TenantCreateActionType.SHOW })}>
        Create Tenant
      </Button>

      <Modal
        size="lg"
        show={tenantForm.show}
        onHide={() => createDispatcher({ type: TenantCreateActionType.HIDE })}
        backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create Tenant</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="h5 mb-3">Default Settings</div>

          <FloatingLabel label="Display Name" controlId="create-display-name" className="mb-3">
            <Form.Control type="text" defaultValue={tenantForm.displayName} onChange={updateDisplayName} />
          </FloatingLabel>

          <FloatingLabel label="Timeout" controlId="create-timeout" className="mb-3">
            <Form.Control type="number" defaultValue={tenantForm.timeout} onChange={updateTimeout} />
          </FloatingLabel>

          <FloatingLabel label="Origin" controlId="create-origin" className="mb-3">
            <Form.Control type="text" defaultValue={tenantForm.origin} onChange={updateOrigin} />
          </FloatingLabel>

          <Container>
            <Row>
              <Col>
                <TenantWebauthnComponent
                  title="Passkey"
                  webauthn={tenantForm.passkey}
                  dispatcher={createDispatcher}
                  isMfa={false}
                />
              </Col>
              <Col>
                <TenantWebauthnComponent
                  title="MFA"
                  webauthn={tenantForm.mfa}
                  dispatcher={createDispatcher}
                  isMfa={true}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={async () => create()}>
            Create
          </Button>
          <Button variant="secondary" onClick={() => createDispatcher({ type: TenantCreateActionType.HIDE })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TenantCreateComponent;
