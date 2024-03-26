/** @format */

import { Alert } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/types';

export type AlertProps = {
  show: boolean;
  type: Variant;
  message: string;
  onClose: () => void;
};

const AlertView = (props: AlertProps) => {
  return (
    <Alert show={props.show} variant={props.type} onClose={props.onClose} className="mt-3" dismissible>
      {props.message}
    </Alert>
  );
};

export default AlertView;
