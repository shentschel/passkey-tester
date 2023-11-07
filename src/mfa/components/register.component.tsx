/** @format */

import React from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from '../../messages/slices/message.slice';
import { RootState } from '../../store/default.store';
import { ConfigState } from '../../store/slices/config.slice';
import { Tenant } from '../../tenants/slices/tenant.slice';
import { RegisterMfaAction } from '../actions/register.action';
import { updateUserId as updateLoginUserId } from '../slices/login-mfa.slice';
import {
  hideRegisterMfaModal,
  RegisterMfaState,
  showRegisterMfaModal,
  updateState,
} from '../slices/register-mfa.slice';

const RegisterMfa = () => {
  const tenantState = useSelector((state: RootState): Tenant => state.tenant);
  const registerState = useSelector((state: RootState): RegisterMfaState => state.registerMfa);
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
      await RegisterMfaAction(tenantState, registerState, configState);

      dispatch(updateLoginUserId(registerState.userId));

      dispatch(hideRegisterMfaModal());
      dispatch(showSuccessMessage('MFA registration successful'));
    } catch (err: any) {
      dispatch(hideRegisterMfaModal());
      dispatch(showErrorMessage(err.message));
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => dispatch(showRegisterMfaModal())}>
        Register
      </Button>

      <Modal size="lg" show={registerState.showModal} onHide={() => dispatch(hideRegisterMfaModal())} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>MFA Registration</Modal.Title>
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
          <Button variant="secondary" onClick={() => dispatch(hideRegisterMfaModal())}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterMfa;
