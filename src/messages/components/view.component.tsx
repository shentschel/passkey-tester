/** @format */

import React from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/default.store';
import { hideMessage, MessageState } from '../slices/message.slice';

const Message = () => {
  const { show, type, message } = useSelector((state: RootState): MessageState => state.message);
  const dispatch = useDispatch();

  return (
    <Alert
      show={show}
      variant={type.toLowerCase()}
      onClose={() => dispatch(hideMessage())}
      className="mb-3 mt-3"
      dismissible>
      <p>{message}</p>
    </Alert>
  );
};

export default Message;
