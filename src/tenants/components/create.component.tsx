/** @format */

import React from 'react';
import { Button, Col, Container, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/default.store';
import { showErrorMessage, showSuccessMessage } from '../../messages/slices/message.slice';
import { CreateTenantAction } from '../actions/create-tenant.action';
import {
  hideCreateModal,
  showCreateModal,
  updateCommon,
  updateMfa,
  updatePasskey,
} from '../slices/tenant-create.slice';
import { updateTenant } from '../slices/tenant.slice';
import TenantCreateWebauthnDialog from './webauthn-dialog.component';

const TenantCreate = () => {
  const createTenantState = useSelector((state: RootState) => state.createTenant);
  const configState = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();

  const updateDisplayName = (evt: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateCommon({ displayName: evt.target.value }));
  const updateTimeout = (evt: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateCommon({ timeout: parseInt(evt.target.value) }));
  const updateOrigin = (evt: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateCommon({ origin: evt.target.value }));

  const createTenant = async () => {
    try {
      const tenant = await CreateTenantAction(createTenantState, configState);

      dispatch(updateTenant(tenant));
      dispatch(hideCreateModal());
      dispatch(showSuccessMessage('Tenant creation successful.'));
    } catch (error: any) {
      dispatch(hideCreateModal());
      dispatch(showErrorMessage(error.message));
    }
  };

  return (
    <>
      <Button variant="primary" className="mb-3" onClick={() => dispatch(showCreateModal())}>
        Create Tenant
      </Button>

      <Modal size="lg" show={createTenantState.showModal} onHide={() => dispatch(hideCreateModal())} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create Tenant</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="h5 mb-3">Default Settings</div>

          <FloatingLabel label="Display Name" controlId="create-display-name" className="mb-3">
            <Form.Control type="text" defaultValue={createTenantState.displayName} onChange={updateDisplayName} />
          </FloatingLabel>

          <FloatingLabel label="Timeout" controlId="create-timeout" className="mb-3">
            <Form.Control type="number" defaultValue={createTenantState.timeout} onChange={updateTimeout} />
          </FloatingLabel>

          <FloatingLabel label="Origin" controlId="create-origin" className="mb-3">
            <Form.Control type="text" defaultValue={createTenantState.origin} onChange={updateOrigin} />
          </FloatingLabel>

          <Container>
            <Row>
              <Col>
                <TenantCreateWebauthnDialog
                  title="Passkey Settings"
                  webauthn={createTenantState.passkey}
                  updateAction={updatePasskey}
                />
              </Col>
              <Col>
                <TenantCreateWebauthnDialog
                  title="MFA Settings"
                  webauthn={createTenantState.mfa}
                  updateAction={updateMfa}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={async () => await createTenant()}>
            Create
          </Button>
          <Button variant="secondary" onClick={() => dispatch(hideCreateModal())}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TenantCreate;
