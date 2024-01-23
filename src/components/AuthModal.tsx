import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { JWTCookie } from '../config/app/CookiesConfig';
import { useAuthModalContext } from '../contexts/AuthModalContext';
import { useUserContext } from '../contexts/UserContext';
import { MyAxiosService } from '../services/MyAxiosService';
import Button from './Button';

const AuthModalContainer = styled.div`
  background: white;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  padding: var(--default-pdn);
  h3 {
    color: black;
  }
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

const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export default function AuthModal() {
  const { isLogged } = useUserContext();
  const { setShowModal } = useAuthModalContext();
  const [usernameValue, setUsernameValue] = useState('');

  const finishEnteringProcess = (token: string) => {
    try {
      if (setShowModal && token) {
        Cookies.set(JWTCookie.key, token, JWTCookie.config);

        setShowModal(false);
        toast.success("You're logged.");
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  const handleEnterButtonClick = async () => {
    try {
      if (isLogged) return toast.error("You're already logged.");

      const response = await MyAxiosService<{ token: string }>({
        endpoint: '/auth/username',
        method: 'post',
        data: { username: usernameValue },
      });

      if (response && response.api.success && response.api.data?.token) {
        finishEnteringProcess(response.api.data.token);
      } else {
        toast.error('Something went wrong.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <AuthModalContainer>
      <ModalHeaderContainer>
        <h3>LOGO</h3>
        <h3>ENTER</h3>
      </ModalHeaderContainer>

      <label htmlFor="username">
        <h4>Username</h4>
        <input onChange={(e) => setUsernameValue(e.target.value)} type="text" />
      </label>

      <Button
        attributes={{ onClick: handleEnterButtonClick }}
        btnType="CTA"
        label={'Enter'}
      />
    </AuthModalContainer>
  );
}
