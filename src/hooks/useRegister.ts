import React from 'react';

import { useAuthContext } from '../contexts/AuthContext';

const useRegister = () => {
  const { registerFn } = useAuthContext();

  return registerFn;
};

export default useRegister;
