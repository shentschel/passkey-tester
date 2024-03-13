/** @format */
import React from 'react';

export type MessageType = 'info' | 'success' | 'warning' | 'danger';

export enum MessageActionType {
  HIDE,
  SHOW,
}

export type Message = {
  message: string | undefined;
  type: MessageType;
};

export type MessageAction = {
  message?: Partial<Message>;
  type: MessageActionType;
};

export type MessageProps = {
  message: Message;
  dispatcher: React.Dispatch<MessageAction>;
};
