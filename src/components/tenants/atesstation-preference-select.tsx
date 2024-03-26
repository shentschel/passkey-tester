/** @format */

import * as React from 'react';
import { PasskeySettingsProps } from '../../types/passkey-settings.types';
import { FloatedLabelSelect } from '../common/labeled-input';

const AttestationPreferenceSelect = (props: PasskeySettingsProps) => (
  <FloatedLabelSelect
    id={'tenant-attestation-preference'}
    label={'Attestation Conveyance Preference'}
    value={props.value}
    onChange={props.onChange}>
    <option value="direct">Direct</option>
    <option value="enterprise">Enterprise</option>
    <option value="indirect">Indirect</option>
    <option value="none">None</option>
  </FloatedLabelSelect>
);

export default AttestationPreferenceSelect;
