import React, { useEffect, useState, useCallback } from 'react';
import useLogin from '../../../hooks/useLogin';
import { ICreateInput } from '../../../interfaces/IRHF';
import Form from '../../Form';
import TrixelsButton from '../../TrixelsButton';
import URLS from '../../../config/constants/URLS';
import MyAxiosServiceInstance from '../../../services/MyAxiosService';
import AuthService from '../../../services/AuthService';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { IUserToFrontEnd } from '../../../interfaces/IUser';

export interface IGoogleAuthResponse {
  userCredentials: IUserToFrontEnd;
  token: string;
  state: string;
}

export default function LoginForm() {
  const reduxDispatch = useDispatch();
  const handleEnterButtonClick = useLogin();

  const [popup, setPopup] = useState<Window | null>(null);
  /* state - Unique identifier for a secure communication between windows events */
  const [state, setState] = useState<string | null>(null);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (event.origin === 'http://localhost:3000' && event.data.state === state) {
        console.log(event);

        const data = event.data as IGoogleAuthResponse;
        AuthService.applyUserCredentials(reduxDispatch, data);
      }
    },
    [popup, reduxDispatch],
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  const auth = async () => {
    const stateAuth = v4();
    setState(stateAuth);

    const res = await MyAxiosServiceInstance.request<{ authorizeUrl: string }>({
      method: 'post',
      endpoint: URLS.ENDPOINTS.AUTH.GOOGLE_LOGIN.initial,
      data: { stateAuth },
    });

    if (res && res.data) {
      const newPopup = window.open(res.data.authorizeUrl, '_blank', 'width=600,height=400');

      if (newPopup) {
        newPopup.focus();
        setPopup(newPopup);
      }
    }
  };

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
    <>
      <Form
        inputArray={[usernameInput, passwordInput]}
        axiosCallHook={handleEnterButtonClick}
        submitButton={loginButton}
      />

      <TrixelsButton
        btnType="CTA"
        label="Login through Google"
        attributes={{
          onClick: auth,
        }}
      />
    </>
  );
}
