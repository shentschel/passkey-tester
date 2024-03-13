/** @format */

import { Badge, Button, CloseButton, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage } from '../../messages/slices/message.slice';
import { RootState } from '../../store/default.store';
import { GetCredentialsAction } from '../actions/get-credentials.action';
import { reset, set } from '../slices/credentials.slice';
import { Credentials } from '../types/credentials.type';

const CredentialView = () => {
  const tenant = useSelector((state: RootState) => state.tenant);
  const config = useSelector((state: RootState) => state.config);
  const passkeyState = useSelector((state: RootState) => state.registerPasskey);
  const mfaState = useSelector((state: RootState) => state.registerMfa);
  const credentialState = useSelector((state: RootState) => state.credentials);
  const dispatch = useDispatch();

  const getCredentials = async (): Promise<Credentials> => {
    const passkeyCredentials = await GetCredentialsAction(tenant, config, passkeyState);
    const mfaCredentials = await GetCredentialsAction(tenant, config, mfaState, true);

    return [...passkeyCredentials, ...mfaCredentials];
  };

  if (credentialState.hasNew) {
    getCredentials()
      .then((credentials) => {
        if (credentials.length > 0) {
          dispatch(set(credentials));
          dispatch(reset());
        }
      })
      .catch((error) => {
        dispatch(showErrorMessage(error.message));
        dispatch(reset());
      });
  }

  return (
    <ListGroup as="ul">
      {credentialState.credentials.map((credential) => (
        <ListGroup.Item
          key={`passkey-${credential.id}`}
          as="li"
          className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              {credential.name}{' '}
              <Button variant="outline-danger" size="sm">
                <CloseButton variant="danger" />
              </Button>
            </div>
            ID: {credential.id}
          </div>

          <Badge bg="primary" pill>
            {credential.type}
          </Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CredentialView;
