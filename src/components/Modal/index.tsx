import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

import { useScreenConfig } from '../../contexts/ScreenConfigContext';
import Reveal from '../Reveal';

interface IModalProps {
  children: JSX.Element;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  title: string;
  width?: number;
}

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

const ModalContent = styled.div`
  z-index: 2;
  max-width: 600px;
  width: 100%;
  max-height: 800px;
  padding: var(--default-halfpdn);
  background-color: var(--primary-bg-color);
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  margin-top: 10px;
  justify-content: flex-start;
`;

const Body = styled.div`
  background-color: white;
  padding: var(--default-halfpdn);
`;

export default function Modal({ children, setShowModal, showModal, title }: IModalProps) {
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

      <Reveal width="100%">
        <ModalContent>
          <Header>
            <h3>{title}</h3>
          </Header>

          <Body>
            <div>{children}</div>
          </Body>
        </ModalContent>
      </Reveal>
    </ModalContainer>
  );
}
