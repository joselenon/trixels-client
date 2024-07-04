/* THE MODAL IS AT "index.js" */

import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from '../../Modal';
import SectionSelector, { ISection } from '../../SectionSelector';
import TrixelsButton from '../../TrixelsButton';
import TrixelsLogo from '../../TrixelsLogo';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModalContainer = styled.div`
  width: 100%;
  background-color: var(--primary-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;

  h4 {
    font-size: 14px;
    color: var(--default-black);
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  padding: var(--default-pdn);
  display: flex;
  flex-direction: column;
`;

const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AuthModal = () => {
  const [showModal, setShowModal] = useState(false);

  const sections: ISection[] = [
    { id: 'login', label: 'Login', content: <LoginForm />, color: 'var(--default-green)' },
    { id: 'register', label: 'Register', content: <RegisterForm />, color: 'var(--default-blue)' },
  ];

  return (
    <div>
      <TrixelsButton
        btnType="CTA"
        label={'Enter'}
        attributes={{
          onClick: () => setShowModal && setShowModal(true),
        }}
      />

      <Modal contentBackground="var(--default-brown)" title="Enter" setShowModal={setShowModal} showModal={showModal}>
        <AuthModalContainer>
          <ModalContent>
            <ModalHeaderContainer>
              <div>
                <TrixelsLogo />
              </div>

              <SectionSelector sections={sections} />
            </ModalHeaderContainer>
          </ModalContent>
        </AuthModalContainer>
      </Modal>
    </div>
  );
};

export default AuthModal;
