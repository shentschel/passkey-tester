/** @format */

import React from 'react';
import { API } from '../../types/passkey-tester.types';
import { LabeledInput } from '../common/labeled-input';

type ApiSectionProps = {
  api: API;
  onChange: (newAPI: API) => void;
};

const ApiSection = ({ api, onChange }: ApiSectionProps) => {
  return (
    <>
      <h4 className="h4">Passkey</h4>
      <LabeledInput
        id="api-view-public"
        label="Public URL"
        onChange={(e) =>
          onChange({
            ...api,
            public: e.target.value,
          })
        }
        value={api.public}
      />

      <LabeledInput
        id={'tenant-view-admin'}
        label="Admin URL"
        value={api.admin}
        onChange={(e) => {
          onChange({
            ...api,
            admin: e.target.value,
          });
        }}
      />
    </>
  );
};

export default ApiSection;
