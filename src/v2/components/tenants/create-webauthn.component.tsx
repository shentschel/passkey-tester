/** @format */

import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { TenantCreateActionType, TenantWebauthnProps } from '../../types/tenant.types';

const TenantWebauthnComponent = ({ title, webauthn, dispatcher, isMfa }: TenantWebauthnProps) => {
  const getType = () => {
    return isMfa ? TenantCreateActionType.UPDATE_PASSKEY : TenantCreateActionType.UPDATE_MFA;
  };

  const updateUserVerification = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatcher({
      type: getType(),
      webauthn: { userVerification: e.target.value as UserVerificationRequirement },
    });

  const updateAttachment = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatcher({
      type: getType(),
      webauthn: { attachment: e.target.value as AuthenticatorAttachment | 'none' },
    });

  const updateAttestation = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatcher({
      type: getType(),
      webauthn: { attestation: e.target.value as AttestationConveyancePreference },
    });

  const updateResidentKey = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatcher({
      type: getType(),
      webauthn: { residentKey: e.target.value as ResidentKeyRequirement },
    });

  return (
    <>
      <div className="h5 mb-4 mt-5">{title}</div>

      <FloatingLabel label="User Verification" controlId="create-uv" className="mb-3">
        <Form.Select defaultValue={webauthn.userVerification} onChange={updateUserVerification}>
          <option value="discouraged">Discouraged</option>
          <option value="preferred">Preferred</option>
          <option value="required">Required</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel label="Authenticator Attachment" controlId="create-att" className="mb-3">
        <Form.Select defaultValue={webauthn.attachment} onChange={updateAttachment}>
          <option value="none">None</option>
          <option value="platform">Platform</option>
          <option value="cross-platform">Cross Platform</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel label="Attestation Conveyance Preference" controlId="create-acp" className="mb-3">
        <Form.Select defaultValue={webauthn.attestation} onChange={updateAttestation}>
          <option value="direct">Direct</option>
          <option value="enterprise">Enterprise</option>
          <option value="indirect">Indirect</option>
          <option value="none">None</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel label="Resident Key Requirement" controlId="create-rkr" className="mb-3">
        <Form.Select defaultValue={webauthn.residentKey} onChange={updateResidentKey}>
          <option value="discouraged">Discouraged</option>
          <option value="preferred">Preferred</option>
          <option value="required">Required</option>
        </Form.Select>
      </FloatingLabel>
    </>
  );
};

export default TenantWebauthnComponent;
