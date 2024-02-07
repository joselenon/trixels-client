import React from 'react';
import styled from 'styled-components';

interface IModalProps {
  children: JSX.Element;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

interface IModalContainerProps {
  $show: 'true' | 'false';
}

export const ModalContainer = styled.div<IModalContainerProps>`
  display: ${({ $show }) => ($show === 'true' ? 'flex' : 'none')};
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 10;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  padding: var(--default-pdn);
`;

const ModalBackground = styled.div`
  z-index: 1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  z-index: 2;
  max-width: 500px;
  width: 100%;
  background-color: var(--primary-bg-color);
  padding: var(--default-pdn);
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Modal({ children, setShowModal, showModal }: IModalProps) {
  const toggleModal = () => {
    if (setShowModal) {
      setShowModal((prev) => !prev);
    }
  };

  return (
    <ModalContainer $show={showModal ? 'true' : 'false'}>
      <ModalBackground onClick={() => toggleModal()} />
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
}
