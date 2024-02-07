import React from 'react';

import useRegister from '../../../hooks/useRegister';
import { ICreateInput } from '../../../interfaces/IRHF';
import Button from '../../Button';
import Form from '../../Form';

export default function RegisterForm() {
  const handleEnterButtonClick = useRegister();

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

  const confirmPasswordInput: ICreateInput = {
    componentKey: 'confirm-password',
    id: 'confirm-password',
    options: { type: 'password', required: true },
    label: 'Confirm Password',
  };

  const loginButton = <Button btnType={'BLUE'} label={'REGISTER'} />;

  return (
    <Form
      inputArray={[usernameInput, passwordInput, confirmPasswordInput]}
      axiosCallHook={handleEnterButtonClick}
      submitButton={loginButton}
    />
  );
}
