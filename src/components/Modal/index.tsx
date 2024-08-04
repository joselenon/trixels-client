import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

import Reveal from '../Reveal';

interface IModalContainerProps {
  $show: 'true' | 'false';
}

const ModalBackground = styled.div<{ $showModal: boolean }>`
  z-index: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ $showModal }) => ($showModal ? 1 : 0)};
  transition: opacity 0.5s;
`;

const ModalContainer = styled(motion.div)<IModalContainerProps>`
  width: 100vw;
  height: 100vh;
  width: 100%;
  display: ${({ $show }) => ($show === 'true' ? 'flex' : 'none')};
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 10;
  top: 0;
  right: 0;
  padding: 6px;
`;

const ModalContent = styled.div<{ $contentBackground?: string }>`
  background-color: ${({ $contentBackground }) =>
    $contentBackground || '#d43636'}; /* Receive prop or default to black */
  max-width: 600px;
  width: 100%;
  max-height: 800px;
  padding: var(--default-halfpdn);
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  border-radius: var(--default-br);
`;

const ModalHeader = styled.div`
  margin-top: 10px;
  justify-content: flex-start;
`;

const ModalBody = styled.div`
  padding: 0.5rem;
  background-color: var(--default-lightgrey);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

interface IModalProps {
  children: JSX.Element;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  title: string;
  contentMaxWidth?: number;
  contentBackground?: string; // New prop for content background color
}

export default function Modal({
  children,
  setShowModal,
  showModal,
  title,
  contentMaxWidth = 550,
  contentBackground = 'black',
}: IModalProps) {
  const toggleModal = () => {
    if (setShowModal) {
      setShowModal((prev) => !prev);

      if (!showModal) setShowModal(true);
      if (showModal) setShowModal(false);
    }
  };

  return (
    <ModalContainer key="modal" exit={{ opacity: 0 }} $show={showModal ? 'true' : 'false'}>
      <ModalBackground $showModal={showModal} onClick={() => toggleModal()} />

      <div style={{ maxWidth: contentMaxWidth, width: '100%', display: 'flex' }}>
        <Reveal width="100%">
          <ModalContent $contentBackground={contentBackground}>
            <ModalHeader>
              <h4 style={{ color: 'white' }}>{title}</h4>
            </ModalHeader>

            <ModalBody>{children}</ModalBody>
          </ModalContent>
        </Reveal>
      </div>
    </ModalContainer>
  );
}
