/** @format */

import React, { ReactNode, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/types';

export type ButtonModalProps = {
  title: string;
  children?: ReactNode;
  variant: Variant;
  className?: string;
  handler?: () => void;
  size?: 'sm' | 'lg' | 'xl';
  buttonSize?: 'sm' | 'lg';
  backdrop?: true | false | 'static';
};

const ButtonModal = (props: ButtonModalProps) => {
  const [show, setShow] = useState(false);

  const execute = () => {
    if (props.handler !== undefined) {
      props.handler();
    }
    setShow(false);
  };

  return (
    <>
      <Button variant={props.variant} className={props.className} size={props.buttonSize} onClick={() => setShow(true)}>
        {props.title}
      </Button>

      <Modal size={props.size ?? 'lg'} show={show} onHide={() => setShow(false)} backdrop={props.backdrop ?? 'static'}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{props.children}</Modal.Body>

        <Modal.Footer className="clear-fix">
          <div className="float-start">
            <Button variant="primary" onClick={execute}>
              {props.title}
            </Button>
          </div>

          <div className="float-end">
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ButtonModal;
