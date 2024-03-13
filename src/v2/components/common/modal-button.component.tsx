/** @format */
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalButton = ({
  title,
  modalTitle,
  modalAction,
  variant,
  children,
}: {
  title: string;
  modalTitle: string;
  modalAction: () => void;
  variant: string;
  children: any;
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant={variant} onClick={() => setShow(true)}>
        {title}
      </Button>

      <Modal size="lg" show={show} onHide={() => setShow(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{children}</Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => modalAction()}>
            {title}
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalButton;
