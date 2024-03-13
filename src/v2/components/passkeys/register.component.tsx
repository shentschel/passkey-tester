/** @format */
import ModalButton from '../common/modal-button.component';

const RegisterPasskeyComponent = () => {
  return (
    <>
      <ModalButton
        title="Register"
        modalTitle="Register Passkey"
        modalAction={() => console.log('yay')}
        variant="primary">
        Hello
      </ModalButton>
    </>
  );
};

export default RegisterPasskeyComponent;
