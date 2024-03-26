/** @format */
import React, { useState } from 'react';
import ErrorHelper from '../../helper/error.helper';
import { TransactionPasskeyAction, TransactionPasskeyOptions } from '../../actions/transaction-passkey.action';
import { Alert, API, Tenant } from '../../types/passkey-tester.types';
import ButtonModal from '../common/button-modal';
import { FloatedLabelInput } from '../common/labeled-input';
import * as UUID from 'uuid';

type TransactionPasskeyProps = {
  tenant: Tenant;
  userId: string;
  api: API;
  onAlert: (newAlert: Alert) => void;
};

const TransactionPasskey = (props: TransactionPasskeyProps) => {
  const [transactionId, setTransactionId] = useState(UUID.v4());
  const [payload, setPayload] = useState('');
  const [userId, setUserId] = useState(props.userId);

  const execute = async () => {
    try {
      const options: TransactionPasskeyOptions = {
        tenant: props.tenant,
        transaction: {
          user_id: userId,
          transaction_id: transactionId,
          transaction_data: {
            payload,
          },
        },
      };

      await TransactionPasskeyAction(options, props.api.public);

      props.onAlert({
        show: true,
        message: `Passkey transaction successful`,
        type: 'success',
      });
    } catch (err) {
      props.onAlert({
        show: true,
        message: ErrorHelper.CreateErrorResponse(err),
        type: 'danger',
      });
    }

    props.onAlert({
      show: true,
      message: 'Passkey transaction successful',
      type: 'success',
    });
  };

  return (
    <ButtonModal title={'Transaction'} variant={'info'} handler={execute}>
      <FloatedLabelInput
        id={'transaction-user-id'}
        label={'Transaction User ID'}
        value={userId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
      />

      <FloatedLabelInput
        id={'transaction-id'}
        label={'Transaction ID'}
        value={transactionId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransactionId(e.target.value)}
      />

      <FloatedLabelInput
        id={'transaction-payload'}
        label={'Transaction Payload'}
        value={payload}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPayload(e.target.value)}
      />
    </ButtonModal>
  );
};

export default TransactionPasskey;
