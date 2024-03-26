/** @format */

import * as React from 'react';
import { PasskeySettingsProps } from '../../types/passkey-settings.types';
import { FloatedLabelSelect } from '../common/labeled-input';

const AuthenticatorAttachmentSelect = (props: PasskeySettingsProps) => (
  <FloatedLabelSelect
    id={'tenant-authenticator-attachment'}
    label={'Authenticator Attachment'}
    value={props.value}
    onChange={props.onChange}>
    <option value="none">None</option>
    <option value="platform">Platform</option>
    <option value="cross-platform">Cross Platform</option>
  </FloatedLabelSelect>
);

export default AuthenticatorAttachmentSelect;
