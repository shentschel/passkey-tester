/** @format */

import React from 'react';
import { Form } from 'react-bootstrap';
import { TenantViewActionType, TenantViewProps } from '../../types/tenant.types';
import TenantCreateComponent from './create.component';

const TenantViewComponent = ({ config, tenant, tenantDispatcher, alertDispatcher }: TenantViewProps) => {
  const updateId = (e: React.ChangeEvent<HTMLInputElement>) => {
    tenantDispatcher({
      type: TenantViewActionType.UPDATE,
      tenant: {
        id: e.target.value,
      },
    });
  };
  const updateApiKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    tenantDispatcher({
      type: TenantViewActionType.UPDATE,
      tenant: {
        apiKey: e.target.value,
      },
    });
  };

  return (
    <>
      <h4 className="h4">Tenant</h4>

      <Form.Group controlId="tenant-view-id" className="mb-3 pl-3">
        <Form.Label>Tenant ID</Form.Label>
        <Form.Control type="text" value={tenant.id} onChange={updateId} />
      </Form.Group>

      <Form.Group controlId="tenant-view-api-key" className="mb-3">
        <Form.Label>API Key</Form.Label>
        <Form.Control as="textarea" value={tenant.apiKey} onChange={updateApiKey} style={{ resize: 'none' }} />
      </Form.Group>

      <TenantCreateComponent
        adminUrl={config.adminUrl}
        tenantDispatcher={tenantDispatcher}
        alertDispatcher={alertDispatcher}
      />
    </>
  );
};

export default TenantViewComponent;
