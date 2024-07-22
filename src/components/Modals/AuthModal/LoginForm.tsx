import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import google_icon_white from '../../../assets/images/google_icon_white.jpg';
import useLogin from '../../../hooks/useLogin';
import useLoginThroughGoogle from '../../../hooks/useLoginThroughGoogle';
import { ICreateInput } from '../../../interfaces/IRHF';
import { IUserToFrontEnd } from '../../../interfaces/IUser';
import AuthService from '../../../services/AuthService';
import isUsernameValid from '../../../utils/isUsernameValid';
import Form from '../../Form';
import TrixelsButton from '../../TrixelsButton';

const LoginFormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  form {
    width: 100%;
  }
`;

export interface IGoogleAuthResponse {
  success: boolean;
  data: { userCredentials: IUserToFrontEnd; state: string; accessToken: string; refreshToken: string };
}

const LoginForm = () => {
  const reduxDispatch = useDispatch();

  const handleEnterButtonClick = useLogin();

  const { initiateGoogleAuth } = useLoginThroughGoogle({
    onMessageReceived: (googleAuthResponse: IGoogleAuthResponse) => {
      const { data } = googleAuthResponse;
      if (!data) return toast.error('Something went wrong');

      return AuthService.applyUserCredentials(reduxDispatch, { userCredentials: data.userCredentials });
    },
  });

  const usernameInput: ICreateInput = {
    componentKey: 'username',
    id: 'username',
    options: { type: 'text', required: true },
    label: 'Username',
    rhfConfig: {
      rhfValidationFn: (value: string) => {
        if (!isUsernameValid(value)) {
          return { valid: false, errorMsg: 'Minimum of 5 characters. No symbols, spaces or special characters' };
        }
        return { valid: true, errorMsg: '' };
      },
    },
  };

  const passwordInput: ICreateInput = {
    componentKey: 'password',
    id: 'password',
    options: { type: 'password', required: true },
    label: 'Password',
  };

  return (
    <LoginFormContainer>
      <Form
        inputArray={[usernameInput, passwordInput]}
        axiosCallHook={handleEnterButtonClick}
        buttonConfig={{ btnType: 'CTA', label: 'LOGIN' }}
      />

      <TrixelsButton
        btnType="CTA"
        width="100%"
        element={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
            <img src={google_icon_white} alt="google_icon" width={20} style={{ borderRadius: '4px' }} />
            <h4 style={{ color: 'white' }}>Login through Google</h4>
          </div>
        }
        attributes={{
          onClick: initiateGoogleAuth,
        }}
      />
    </LoginFormContainer>
  );
};

export default LoginForm;
