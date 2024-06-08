import React from 'react';

import useLogin from '../../../hooks/useLogin';
import { ICreateInput } from '../../../interfaces/IRHF';
import Form from '../../Form';
import TrixelsButton from '../../TrixelsButton';

export default function LoginForm() {
  const handleEnterButtonClick = useLogin();

  const usernameInput: ICreateInput = {
    componentKey: 'username',
    id: 'username',
    options: { type: 'text', required: true },
    label: 'Username',
  };

  const passwordInput: ICreateInput = {
    componentKey: 'password',
    id: 'password',
    options: { type: 'password', required: true },
    label: 'Password',
  };

  const loginButton = <TrixelsButton btnType={'CTA'} label={'LOGIN'} attributes={{ type: 'submit' }} />;

  return (
    <Form
      inputArray={[usernameInput, passwordInput]}
      axiosCallHook={handleEnterButtonClick}
      submitButton={loginButton}
    />
  );
}
