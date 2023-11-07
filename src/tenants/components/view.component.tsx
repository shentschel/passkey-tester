/** @format */

import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/default.store';
import { Tenant, updateTenant } from '../slices/tenant.slice';
import TenantCreate from './create.component';

const TenantView = () => {
  const { id, apiKey } = useSelector((state: RootState): Tenant => state.tenant);
  const dispatch = useDispatch();

  const updateApiKey = (evt: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateTenant({ apiKey: evt.target.value }));
  const updateId = (evt: React.ChangeEvent<HTMLInputElement>) => dispatch(updateTenant({ id: evt.target.value }));

  return (
    <>
      <Form.Group controlId="tenant-view-id" className="mb-3 pl-3">
        <Form.Label>Tenant ID</Form.Label>
        <Form.Control type="text" value={id} onChange={updateId} />
      </Form.Group>

      <Form.Group controlId="tenant-view-api-key" className="mb-3">
        <Form.Label>API Key</Form.Label>
        <Form.Control as="textarea" value={apiKey} onChange={updateApiKey} style={{ resize: 'none' }} />
      </Form.Group>

      <TenantCreate />
    </>
  );
};
export default TenantView;
