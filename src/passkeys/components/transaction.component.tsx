/** @format */

import React from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from '../../messages/slices/message.slice';
import { RootState } from '../../store/default.store';
import { ConfigState } from '../../store/slices/config.slice';
import { Tenant } from '../../tenants/slices/tenant.slice';
import { TransactionPasskeyAction } from '../actions/transaction.action';
import {
  hideTransaction,
  showTransaction,
  TransactionPasskeyState,
  updateTransactionData,
  updateTransactionId,
  updateUserId,
} from '../slices/transaction-passkey.slice';

const TransactionPasskey = () => {
  const tenantState = useSelector((state: RootState): Tenant => state.tenant);
  const transactionState = useSelector((state: RootState): TransactionPasskeyState => state.transactionPasskey);
  const configState = useSelector((state: RootState): ConfigState => state.config);
  const dispatch = useDispatch();

  const updateTransactionUserId = (evt: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateUserId(evt.target.value));
  const updateTransactionIdEvt = (evt: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateTransactionId(evt.target.value));
  const updateTransactionDataEvt = (evt: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateTransactionData(evt.target.value));

  const transact = async () => {
    try {
      await TransactionPasskeyAction(tenantState, transactionState, configState);

      dispatch(hideTransaction());
      dispatch(showSuccessMessage('Passkey Transaction successful'));
    } catch (err: any) {
      dispatch(hideTransaction());
      dispatch(showErrorMessage(err.message));
    }
  };

  return (
    <>
      <Button variant="info" onClick={() => dispatch(showTransaction())}>
        Transaction
      </Button>

      <Modal size="lg" show={transactionState.showModal} onHide={() => dispatch(hideTransaction())} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Passkey Transaction</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FloatingLabel label="ID" controlId="transaction-user-id" className="mb-3">
            <Form.Control value={transactionState.userId} onChange={updateTransactionUserId} />
          </FloatingLabel>

          <FloatingLabel label="Transaction ID" controlId="transaction-id" className="mb-3">
            <Form.Control value={transactionState.transactionId} onChange={updateTransactionIdEvt} />
          </FloatingLabel>

          <FloatingLabel label="Transaction Payload" controlId="transaction-data" className="mb-3">
            <Form.Control value={transactionState.transactionData} onChange={updateTransactionDataEvt} />
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={async () => await transact()}>
            Transact
          </Button>
          <Button variant="secondary" onClick={() => dispatch(hideTransaction())}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransactionPasskey;
