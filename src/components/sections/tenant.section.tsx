/** @format */

import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Alert, API, Tenant } from '../../types/passkey-tester.types';
import { LabeledInput } from '../common/labeled-input';
import CreateTenantDialog from '../tenants/create-tenant-dialog';

type TenantSectionProps = {
  tenant: Tenant;
  api: API;
  onChange: (newTenantState: Tenant) => void;
  onDelete: () => void;
  onAlert: (newAlert: Alert) => void;
};

const TenantSection = ({ tenant, api, onChange, onAlert, onDelete }: TenantSectionProps) => {
  return (
    <>
      <h4 className="h4">Passkey</h4>
      <LabeledInput
        id="tenant-view-id"
        label="Tenant ID"
        onChange={(e) =>
          onChange({
            ...tenant,
            id: e.target.value,
          })
        }
        value={tenant.id}
      />

      <LabeledInput
        id={'tenant-view-api-key'}
        label={'API Key'}
        value={tenant.apiKey}
        onChange={(e) => {
          onChange({
            ...tenant,
            apiKey: e.target.value,
          });
        }}
      />

      <ButtonGroup size="lg">
        <CreateTenantDialog api={api} onChange={onChange} onAlert={onAlert} />
        <Button variant={'danger'} onClick={onDelete}>
          Delete Tenant
        </Button>
      </ButtonGroup>
    </>
  );
};

export default TenantSection;
