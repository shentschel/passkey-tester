/** @format */

import * as React from 'react';
import { PasskeySettingsProps } from '../../types/passkey-settings.types';
import { FloatedLabelSelect } from '../common/labeled-input';

const ResidentKeySelect = (props: PasskeySettingsProps) => (
  <FloatedLabelSelect
    id={'tenant-resident-key-requirement'}
    label={'Resident Key Requirement'}
    value={props.value}
    onChange={props.onChange}>
    <option value="discouraged">Discouraged</option>
    <option value="preferred">Preferred</option>
    <option value="required">Required</option>
  </FloatedLabelSelect>
);

export default ResidentKeySelect;
