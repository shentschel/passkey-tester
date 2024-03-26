/** @format */

import * as React from 'react';
import { WebauthnData } from './passkey-tester.types';

export type PasskeySettingsProps = {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export type PasskeySettingsDialogProps = {
  title: string;
  data: WebauthnData;
  handler: (newState: WebauthnData) => void;
};
