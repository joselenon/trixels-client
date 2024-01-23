import React from 'react';

import { useAuthModalContext } from '../../contexts/AuthModalContext';
import * as styles from './styles';

interface IModalProps {
  children: JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Modal({ children }: IModalProps) {
  const { showModal, setShowModal } = useAuthModalContext();

  const toggleModal = () => {
    if (setShowModal) {
      setShowModal((prev) => !prev);
    }
  };

  return (
    <styles.ModalContainer $show={showModal ? 'true' : 'false'}>
      <styles.ModalBackground onClick={() => toggleModal()} />
      <styles.ModalContent>{children}</styles.ModalContent>
    </styles.ModalContainer>
  );
}
