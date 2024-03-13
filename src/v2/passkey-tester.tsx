/** @format */

import React, { useReducer } from 'react';
import { Badge, Button, ButtonGroup, CloseButton, Col, Container, ListGroup, Row } from 'react-bootstrap';
import MessageViewComponent from './components/messages/view.component';
import RegisterPasskeyComponent from './components/passkeys/register.component';
import TenantViewComponent from './components/tenants/view.component';
import MessageReducer from './state/reducers/messages.reducer';
import TenantViewReducer from './state/reducers/tenant-view.reducer';
import { RootState } from './types/passkey-tester.types';
import * as UUID from 'uuid';

const rootState: RootState = {
  message: {
    message: '',
    type: 'success',
  },

  tenant: {
    id: '',
    apiKey: '',
  },

  user: {
    id: UUID.v4(),
  },

  config: {
    adminUrl: 'http://localhost:8001',
    publicUrl: 'http://localhost:8000',
  },
};

const PasskeyTesterComponent = () => {
  const [alert, alertDispatcher] = useReducer(MessageReducer, rootState.message);
  const [tenant, tenantDispatcher] = useReducer(TenantViewReducer, rootState.tenant);
  const [config] = useReducer((state) => state, rootState.config);

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
        <Row>
          <Col className="d-grid gap-2">
            <TenantViewComponent
              config={config}
              tenant={tenant}
              tenantDispatcher={tenantDispatcher}
              alertDispatcher={alertDispatcher}
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="d-grid gap-2" sm={6}>
            <h4 className="h4">Passkey</h4>

            <ButtonGroup size="lg">
              <RegisterPasskeyComponent />
              <Button variant="secondary">Login</Button>
              <Button variant="info">Transaction</Button>
            </ButtonGroup>
          </Col>

          <Col className="d-grid gap-2" sm={6}>
            <h4 className="h4">MFA</h4>

            <ButtonGroup size="lg">
              <Button variant="primary">Register</Button>
              <Button variant="secondary">Login</Button>
            </ButtonGroup>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col sm={6}>
            <h4 className="h4">Messages</h4>

            <MessageViewComponent message={alert} dispatcher={alertDispatcher} />
          </Col>

          <Col className="d-grid gap-2" sm={6}>
            <h4 className={'h4'}>Credentials</h4>

            <ListGroup as="ul">
              <ListGroup.Item as="li" action className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    Lorem
                    <Button variant="outline-danger" size="sm">
                      <CloseButton variant="danger" />
                    </Button>
                  </div>
                  ID: Ipsum
                </div>

                <Badge bg="primary" pill>
                  passkey
                </Badge>
              </ListGroup.Item>

              <ListGroup.Item as="li" action className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    Magna
                    <Button variant="outline-danger" size="sm">
                      <CloseButton variant="danger" />
                    </Button>
                  </div>
                  ID: Corpus
                </div>

                <Badge bg="info" pill>
                  mfa
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PasskeyTesterComponent;
