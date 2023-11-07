/** @format */

import React from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from '../../messages/slices/message.slice';
import { RootState } from '../../store/default.store';
import { ConfigState } from '../../store/slices/config.slice';
import { Tenant } from '../../tenants/slices/tenant.slice';
import { RegisterPasskeyAction } from '../actions/register.action';
import { updateUserId as updateLoginUserId } from '../slices/login-passkey.slice';
import { updateUserId as updateTransactionUserId } from '../slices/transaction-passkey.slice';
import {
  hideRegisterPasskeyModal,
  RegisterPasskeyState,
  showRegisterPasskeyModal,
  updateState,
} from '../slices/register-passkey.slice';

const RegisterPasskey = () => {
  const tenantState = useSelector((state: RootState): Tenant => state.tenant);
  const registerState = useSelector((state: RootState): RegisterPasskeyState => state.registerPasskey);
  const configState = useSelector((state: RootState): ConfigState => state.config);
  const dispatch = useDispatch();

  const updateUserId = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateState({ userId: evt.target.value }));
  };

  const updateUserName = (evt: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateState({ userName: evt.target.value }));
  const updateDisplayName = (evt: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateState({ displayName: evt.target.value }));
  const updateIcon = (evt: React.ChangeEvent<HTMLInputElement>) => dispatch(updateState({ icon: evt.target.value }));

  const register = async () => {
    try {
      await RegisterPasskeyAction(tenantState, registerState, configState);

      dispatch(updateLoginUserId(registerState.userId));
      dispatch(updateTransactionUserId(registerState.userId));

      dispatch(hideRegisterPasskeyModal());
      dispatch(showSuccessMessage('Passkey registration successful'));
    } catch (err: any) {
      dispatch(hideRegisterPasskeyModal());
      dispatch(showErrorMessage(err.message));
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => dispatch(showRegisterPasskeyModal())}>
        Register
      </Button>

      <Modal
        size="lg"
        show={registerState.showModal}
        onHide={() => dispatch(hideRegisterPasskeyModal())}
        backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Passkey Registration</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FloatingLabel label="ID" controlId="userId" className="mb-3">
            <Form.Control value={registerState.userId} onChange={updateUserId} />
          </FloatingLabel>

          <FloatingLabel label="User Name" controlId="username" className="mb-3">
            <Form.Control value={registerState.userName} onChange={updateUserName} />
          </FloatingLabel>

          <FloatingLabel label="Display Name" controlId="displayName" className="mb-3">
            <Form.Control value={registerState.displayName} onChange={updateDisplayName} />
          </FloatingLabel>

          <FloatingLabel label="Icon" controlId="icon" className="mb-3">
            <Form.Control value={registerState.icon} onChange={updateIcon} />
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={async () => await register()}>
            Create
          </Button>
          <Button variant="secondary" onClick={() => dispatch(hideRegisterPasskeyModal())}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterPasskey;
