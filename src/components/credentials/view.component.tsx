/** @format */

import React from 'react';
import { Badge, Button } from 'react-bootstrap';

type CredentialsViewProps = {
  credential: Credential;
  onDelete: (credId: string) => void;
};

type Credential = {
  id: string;
  name: string;
  isMFA: boolean;
};

const CredentialsView = ({ credential, onDelete }: CredentialsViewProps) => {
  return (
    <>
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          <Badge bg={credential.isMFA ? 'info' : 'primary'} pill>
            {credential.isMFA ? 'MFA' : 'Pass'}
          </Badge>{' '}
          {credential.name}
        </div>

        <div className={'small'}>ID: {credential.id}</div>
      </div>

      <Button variant={'danger'} size={'sm'} className={'float-end'} onClick={() => onDelete(credential.id)}>
        <i className="bi-trash-fill" />
      </Button>
    </>
  );
};

export default CredentialsView;
