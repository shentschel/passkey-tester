/** @format */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import React, { useState } from 'react';
import './App.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import * as UUID from 'uuid';
import { DeleteCredentialsAction } from './actions/delete-credentials.action';
import { DeleteTenantAction } from './actions/delete-tenant.action';
import { GetCredentialsAction } from './actions/get-credentials.action';
import ApiSection from './components/sections/api.section';
import CredentialSection from './components/sections/credential.section';
import AlertSection from './components/sections/message.section';
import MFASection from './components/sections/mfa.section';
import PasskeySection from './components/sections/passkey.section';
import TenantSection from './components/sections/tenant.section';
import ErrorHelper from './helper/error.helper';
import { RootState } from './types/passkey-tester.types';

const rootState: RootState = {
  alert: {
    type: 'success',
    message: '',
    show: false,
  },

  api: {
    admin: 'http://localhost:8001',
    public: 'http://localhost:8000',
  },

  user: {
    id: UUID.v4(),
  },

  tenant: {
    apiKey: '',
    id: '',
  },

  credentials: [],
};

const App = () => {
  const [tenant, setTenant] = useState(rootState.tenant);
  const [api, setApi] = useState(rootState.api);
  const [alert, setAlert] = useState(rootState.alert);
  const [userId, setUserId] = useState(rootState.user.id);
  const [credentials, setCredentials] = useState(rootState.credentials);

  const onRegister = async () => {
    const credentials = await GetCredentialsAction(tenant, api.public, userId);

    try {
      console.log('Lorem');
      setCredentials(credentials);
    } catch (err: any) {
      ErrorHelper.ShowErrorAlert(err, setAlert);
    }
  };

  const resetUI = () => {
    setTenant(rootState.tenant);
    setApi(rootState.api);
    setUserId(rootState.user.id);
    setCredentials(rootState.credentials);
  };

  const deleteCredential = async (credId: string) => {
    try {
      await DeleteCredentialsAction(tenant, api.public, userId, credId);

      setCredentials(credentials.filter((cred) => cred.id !== credId));

      setAlert({
        show: true,
        message: 'Credential removal was successful',
        type: 'success',
      });
    } catch (err) {
      ErrorHelper.ShowErrorAlert(err, setAlert);
    }
  };

  const deleteTenant = async () => {
    try {
      await DeleteTenantAction(tenant, api.admin);

      setTenant(rootState.tenant);

      setAlert({
        show: true,
        message: 'Tenant removal was successful',
        type: 'success',
      });
    } catch (err) {
      ErrorHelper.ShowErrorAlert(err, setAlert);
    }
  };

  return (
    <>
      <Container className="app">
        <Row>
          <Col className="d-grid gap-2 justify-content-center">
            <h1>Passkey API Tester</h1>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="align-top">
          <Col className="d-grid gap-2" sm={6}>
            <ApiSection api={api} onChange={setApi} />
            <Button variant={'outline-dark'} onClick={resetUI}>
              Reset
            </Button>
          </Col>
          <Col className="d-grid gap-2" sm={6}>
            <TenantSection tenant={tenant} api={api} onChange={setTenant} onAlert={setAlert} onDelete={deleteTenant} />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="d-grid gap-2" sm={6}>
            <PasskeySection
              tenant={tenant}
              api={api}
              userId={userId}
              onUserChange={setUserId}
              onRegister={onRegister}
              alertHandler={setAlert}
            />
          </Col>

          <Col className="d-grid gap-2" sm={6}>
            <MFASection
              tenant={tenant}
              api={api}
              userId={userId}
              onUserChange={setUserId}
              onRegister={onRegister}
              alertHandler={setAlert}
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col sm={6}>
            <AlertSection alert={alert} onClose={setAlert} />
          </Col>

          <Col className="d-grid gap-2" sm={6}>
            <CredentialSection credentials={credentials} onDelete={deleteCredential} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
