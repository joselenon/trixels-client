import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { IReduxStore } from '../../../interfaces/IRedux';
import TrixelsLogo from '../../TrixelsLogo';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModalContainer = styled.div`
  background-color: var(--primary-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  padding: var(--default-pdn);

  h4 {
    font-size: 14px;
    color: black;
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
  background-color: var(--secondary-bg-color);
  padding: var(--default-pdn);
  display: flex;
  flex-direction: column;
`;

const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SectionSelectionContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  margin: 20px 0;
  border: 2px solid var(--primary-bg-color);
`;

interface ISectionItemProps {
  isSelected: boolean;
  sectionColor: string;
}

export const SectionItem = styled.div<ISectionItemProps>`
  cursor: pointer;
  background: ${({ isSelected }) =>
    isSelected ? 'var(--primary-bg-color)' : 'var(--secondary-bg-color)'};
  display: flex;
  gap: 12px;
  height: 100%;
  align-items: center;
  padding: 20px;
  white-space: nowrap;
  transition: all 0.15s;

  h4 {
    color: ${({ isSelected, sectionColor }) => (isSelected ? sectionColor : '#8e8e99')};
  }
  svg {
    fill: #8e8e99;
  }

  &:hover {
    h4 {
      color: ${({ sectionColor }) => sectionColor};
    }
    svg {
      fill: #6b8dbd;
    }
  }
`;

const AuthModal = () => {
  const auth = useSelector<IReduxStore, IReduxStore['auth']>((state) => state.auth);

  const [section, setSection] = useState<'login' | 'register'>('login');

  const handleToggleSection = (section: 'login' | 'register') => {
    setSection(section);
  };

  return (
    <AuthModalContainer>
      <ModalContent>
        <ModalHeaderContainer>
          <div>
            <TrixelsLogo />
          </div>

          <SectionSelectionContainer>
            <SectionItem
              sectionColor="#6b8dbd"
              isSelected={section === 'register'}
              onClick={() => handleToggleSection('register')}
            >
              <h4>Register</h4>
            </SectionItem>

            <SectionItem
              sectionColor="#4bb03f"
              isSelected={section === 'login'}
              onClick={() => handleToggleSection('login')}
            >
              <h4>Login</h4>
            </SectionItem>
          </SectionSelectionContainer>
        </ModalHeaderContainer>

        {section === 'login' && <LoginForm />}
        {section === 'register' && <RegisterForm />}
      </ModalContent>
    </AuthModalContainer>
  );
};

export default AuthModal;
