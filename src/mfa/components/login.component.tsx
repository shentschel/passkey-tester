/** @format */

import React from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from '../../messages/slices/message.slice';
import { RootState } from '../../store/default.store';
import { ConfigState } from '../../store/slices/config.slice';
import { Tenant } from '../../tenants/slices/tenant.slice';
import { LoginMfaAction } from '../actions/login.action';
import { hideMfaLogin, LoginMfaState, showMfaLogin, updateUserId } from '../slices/login-mfa.slice';

const LoginMfa = () => {
  const tenantState = useSelector((state: RootState): Tenant => state.tenant);
  const loginState = useSelector((state: RootState): LoginMfaState => state.loginMfa);
  const configState = useSelector((state: RootState): ConfigState => state.config);
  const dispatch = useDispatch();

  const updateId = (evt: React.ChangeEvent<HTMLInputElement>) => dispatch(updateUserId(evt.target.value));

  const login = async () => {
    try {
      await LoginMfaAction(tenantState, loginState, configState);

      dispatch(hideMfaLogin());
      dispatch(showSuccessMessage('MFA login successful'));
    } catch (err: any) {
      dispatch(hideMfaLogin());
      dispatch(showErrorMessage(err.message));
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={() => dispatch(showMfaLogin())}>
        Login
      </Button>

      <Modal size="lg" show={loginState.showModal} onHide={() => dispatch(hideMfaLogin())} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Passkey Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FloatingLabel label="ID" controlId="login-user-id" className="mb-3">
            <Form.Control value={loginState.userId} onChange={updateId} />
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={async () => await login()}>
            Login
          </Button>
          <Button variant="secondary" onClick={() => dispatch(hideMfaLogin())}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginMfa;
