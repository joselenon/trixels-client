import React from 'react';
import { useDispatch } from 'react-redux';

import AuthService from '../services/AuthService';

const useLogin = () => {
  const reduxDispatch = useDispatch();

  const handleEnterButtonClick = async (payload: { username: string; password: string }) => {
    await AuthService.login(reduxDispatch, payload);
  };

  return handleEnterButtonClick;
};

export default useLogin;
