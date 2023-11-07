/** @format */

import React from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from '../../messages/slices/message.slice';
import { RootState } from '../../store/default.store';
import { ConfigState } from '../../store/slices/config.slice';
import { Tenant } from '../../tenants/slices/tenant.slice';
import { LoginPasskeyAction } from '../actions/login.action';
import { hideLogin, LoginPasskeyState, showLogin, updateLogin, updateUserId } from '../slices/login-passkey.slice';

const LoginPasskey = () => {
  const tenantState = useSelector((state: RootState): Tenant => state.tenant);
  const loginState = useSelector((state: RootState): LoginPasskeyState => state.loginPasskey);
  const configState = useSelector((state: RootState): ConfigState => state.config);
  const dispatch = useDispatch();

  const updateId = (evt: React.ChangeEvent<HTMLInputElement>) => dispatch(updateUserId(evt.target.value));
  const updateWithUserId = (evt: React.ChangeEvent<HTMLInputElement>) => dispatch(updateLogin(evt.target.checked));

  const login = async () => {
    try {
      await LoginPasskeyAction(tenantState, loginState, configState);

      dispatch(hideLogin());
      dispatch(showSuccessMessage('Passkey login successful'));
    } catch (err: any) {
      dispatch(hideLogin());
      dispatch(showErrorMessage(err.message));
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={() => dispatch(showLogin())}>
        Login
      </Button>

      <Modal size="lg" show={loginState.showModal} onHide={() => dispatch(hideLogin())} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Passkey Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FloatingLabel label="ID" controlId="login-user-id" className="mb-3">
            <Form.Control
              value={loginState.userId}
              onChange={updateId}
              disabled={!loginState.withUserId}
              readOnly={!loginState.withUserId}
            />
          </FloatingLabel>

          <Form.Check
            type="switch"
            checked={loginState.withUserId}
            onChange={updateWithUserId}
            id="login-with-userid"
            label="Login with User ID"
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={async () => await login()}>
            Login
          </Button>
          <Button variant="secondary" onClick={() => dispatch(hideLogin())}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginPasskey;
