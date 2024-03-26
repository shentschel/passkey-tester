/** @format */

import * as React from 'react';
import { PasskeySettingsProps } from '../../types/passkey-settings.types';
import { FloatedLabelSelect } from '../common/labeled-input';

const UserVerificationSelect = (props: PasskeySettingsProps) => (
  <FloatedLabelSelect
    id={'tenant-user-verification'}
    label={'User Verification'}
    value={props.value}
    onChange={props.onChange}>
    <option value="discouraged">Discouraged</option>
    <option value="preferred">Preferred</option>
    <option value="required">Required</option>
  </FloatedLabelSelect>
);

export default UserVerificationSelect;
