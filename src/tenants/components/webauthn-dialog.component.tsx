/** @format */

import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { CreateWebauthnState } from '../slices/tenant-create.slice';

const TenantCreateWebauthnDialog = (props: {
  title: string;
  webauthn: CreateWebauthnState;
  updateAction: Function;
}) => {
  const { webauthn, updateAction } = props;
  const dispatch = useDispatch();

  const updateUV = (evt: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(updateAction({ userVerification: evt.target.value as UserVerificationRequirement }));
  const updateAttachment = (evt: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(updateAction({ attachment: evt.target.value as AuthenticatorAttachment | 'none' }));
  const updateAttestationPreference = (evt: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(updateAction({ attestationPreference: evt.target.value as AttestationConveyancePreference }));
  const updateResidentKeyRequirement = (evt: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(updateAction({ residentKeyRequirement: evt.target.value as ResidentKeyRequirement }));

  return (
    <>
      <div className="h5 mb-4 mt-5">{props.title}</div>

      <FloatingLabel label="User Verification" controlId="create-uv" className="mb-3">
        <Form.Select defaultValue={webauthn.userVerification} onChange={updateUV}>
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
        <Form.Select defaultValue={webauthn.attestationPreference} onChange={updateAttestationPreference}>
          <option value="direct">Direct</option>
          <option value="enterprise">Enterprise</option>
          <option value="indirect">Indirect</option>
          <option value="none">None</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel label="Resident Key Requirement" controlId="create-rkr" className="mb-3">
        <Form.Select defaultValue={webauthn.residentKeyRequirement} onChange={updateResidentKeyRequirement}>
          <option value="discouraged">Discouraged</option>
          <option value="preferred">Preferred</option>
          <option value="required">Required</option>
        </Form.Select>
      </FloatingLabel>
    </>
  );
};

export default TenantCreateWebauthnDialog;
