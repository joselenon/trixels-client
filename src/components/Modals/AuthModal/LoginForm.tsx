import React from 'react';
import { useDispatch } from 'react-redux';

import useLogin from '../../../hooks/useLogin';
import useLoginThroughGoogle from '../../../hooks/useLoginThroughGoogle';
import { ICreateInput } from '../../../interfaces/IRHF';
import { IUserToFrontEnd } from '../../../interfaces/IUser';
import AuthService from '../../../services/AuthService';
import isUsernameValid from '../../../utils/isUsernameValid';
import Form from '../../Form';
import TrixelsButton from '../../TrixelsButton';

export interface IGoogleAuthResponse {
  userCredentials: IUserToFrontEnd;
  state: string;
  accessToken: string;
  refreshToken: string;
}

const LoginForm = () => {
  const reduxDispatch = useDispatch();

  const handleEnterButtonClick = useLogin();

  const { initiateGoogleAuth } = useLoginThroughGoogle({
    onMessageReceived: (data: IGoogleAuthResponse) => {
      AuthService.applyUserCredentials(reduxDispatch, { userCredentials: data.userCredentials });
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
    <>
      <Form
        inputArray={[usernameInput, passwordInput]}
        axiosCallHook={handleEnterButtonClick}
        buttonConfig={{ btnType: 'CTA', label: 'LOGIN' }}
      />

      <TrixelsButton
        btnType="CTA"
        label="Login through Google"
        attributes={{
          onClick: initiateGoogleAuth,
        }}
      />
    </>
  );
};

export default LoginForm;
