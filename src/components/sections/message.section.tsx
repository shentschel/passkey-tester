/** @format */

import React from 'react';
import { Alert } from '../../types/passkey-tester.types';
import AlertView from '../alerts/view.component';

type AlertProps = {
  alert: Alert;
  onClose: (newAlert: Alert) => void;
};

const AlertSection = (props: AlertProps) => {
  return (
    <>
      <h4 className="h4">Messages</h4>

      <AlertView
        show={props.alert.show}
        type={props.alert.type}
        message={props.alert.message}
        onClose={() => props.onClose({ ...props.alert, show: false })}
      />
    </>
  );
};

export default AlertSection;
