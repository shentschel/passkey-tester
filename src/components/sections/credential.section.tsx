/** @format */

import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Credentials } from '../../types/passkey-tester.types';
import CredentialsView from '../credentials/view.component';

type credentialSectionProps = {
  credentials: Credentials;
  onDelete: (credId: string) => void;
};

const CredentialSection = ({ credentials, onDelete }: credentialSectionProps) => {
  return (
    <>
      <h4 className={'h4'}>Credentials</h4>

      <ListGroup as="ul">
        {credentials.map((credential) => (
          <ListGroup.Item
            key={credential.id}
            as="li"
            action
            className="d-flex justify-content-between align-items-start">
            <CredentialsView credential={credential} onDelete={onDelete} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default CredentialSection;
