import React from 'react';

import useRegister from '../../../hooks/useRegister';
import { ICreateInput } from '../../../interfaces/IRHF';
import isUsernameValid from '../../../utils/isUsernameValid';
import Form from '../../Form';
import TrixelsButton from '../../TrixelsButton';

export default function RegisterForm() {
  const handleEnterButtonClick = useRegister();

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

  const confirmPasswordInput: ICreateInput = {
    componentKey: 'confirmPassword',
    id: 'confirmPassword',
    options: { type: 'password', required: true },
    label: 'Confirm Password',
    rhfConfig: {
      rhfValidationFn: (value: string, getValues) => {
        const password = getValues?.('password');
        if (value !== password) return { valid: false, errorMsg: "Doesn't match the password" };
        return { valid: true, errorMsg: '' };
      },
    },
  };

  const registerButton = <TrixelsButton btnType={'BLUE'} label={'REGISTER'} attributes={{ type: 'submit' }} />;

  return (
    <Form
      inputArray={[usernameInput, passwordInput, confirmPasswordInput]}
      axiosCallHook={handleEnterButtonClick}
      submitButton={registerButton}
    />
  );
}
