/** @format */

import { Message, MessageAction, MessageActionType } from '../../types/message.types';

const MessageReducer = (state: Message, action: MessageAction): Message => {
  switch (action.type) {
    case MessageActionType.SHOW:
      return {
        ...state,
        ...action.message,
      };
    case MessageActionType.HIDE:
      return {
        ...state,
        message: '',
        type: 'success',
      };
    default:
      throw new Error('Unknown message action');
  }
};

export default MessageReducer;
