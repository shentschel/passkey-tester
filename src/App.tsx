/** @format */

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import { ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import './App.css';
import Message from './messages/components/view.component';
import LoginMfa from './mfa/components/login.component';
import RegisterMfa from './mfa/components/register.component';
import LoginPasskey from './passkeys/components/login.component';
import RegisterPasskey from './passkeys/components/register.component';
import TransactionPasskey from './passkeys/components/transaction.component';
import TenantView from './tenants/components/view.component';

const App = () => {
  return (
    <>
      <Container className="app">
        <Row>
          <Col></Col>
          <Col>
            <h1>Passkey API Tester</h1>
          </Col>
          <Col></Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col className="d-grid gap-2">
            <h4 className={'h4'}>Tenant</h4>
            <TenantView />
          </Col>
        </Row>

        <Row>
          <Col>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col className="d-grid gap-2" sm={6}>
            <h4 className="h4">Passkey</h4>

            <ButtonGroup>
              <RegisterPasskey />
              <LoginPasskey />
              <TransactionPasskey />
            </ButtonGroup>
          </Col>

          <Col className="d-grid gap-2" sm={6}>
            <h4 className="h4">MFA</h4>

            <ButtonGroup>
              <RegisterMfa />
              <LoginMfa />
            </ButtonGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col className="d-grid gap-2" sm={6}>
            <h4 className={'h4'}>Result</h4>

            <Message />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
