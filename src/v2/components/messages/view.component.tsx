/** @format */

import React from 'react';
import { Alert } from 'react-bootstrap';
import { MessageActionType, MessageProps } from '../../types/message.types';

const MessageViewComponent = ({ message, dispatcher }: MessageProps) => {
  const close = () =>
    dispatcher({
      type: MessageActionType.HIDE,
    });

  return (
    <Alert show={!!message.message} variant={message.type} dismissible onClose={close} className="mb-3 mt-3">
      <p>{message.message}</p>
    </Alert>
  );
};

export default MessageViewComponent;
