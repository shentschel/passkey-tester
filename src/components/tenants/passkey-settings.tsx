/** @format */
import * as React from 'react';
import { PasskeySettingsDialogProps } from '../../types/passkey-settings.types';
import AttestationPreferenceSelect from './atesstation-preference-select';
import AuthenticatorAttachmentSelect from './authenticator-attachment-select';
import ResidentKeySelect from './resident-key-requirement-select';
import UserVerificationSelect from './user-verification-select';

export const PasskeySettings = (props: PasskeySettingsDialogProps) => (
  <>
    <div className="h5 mb-4 mt-5">{props.title}</div>

    <UserVerificationSelect
      value={props.data.userVerification}
      onChange={(e) =>
        props.handler({
          ...props.data,
          userVerification: e.target.value as UserVerificationRequirement,
        })
      }
    />

    <AuthenticatorAttachmentSelect
      value={props.data.attachment}
      onChange={(e) =>
        props.handler({
          ...props.data,
          attachment: e.target.value as AuthenticatorAttachment | 'none',
        })
      }
    />

    <AttestationPreferenceSelect
      value={props.data.attestationPreference}
      onChange={(e) =>
        props.handler({
          ...props.data,
          attestationPreference: e.target.value as AttestationConveyancePreference,
        })
      }
    />

    <ResidentKeySelect
      value={props.data.residentKeyRequirement}
      onChange={(e) =>
        props.handler({
          ...props.data,
          residentKeyRequirement: e.target.value as ResidentKeyRequirement,
        })
      }
    />
  </>
);
