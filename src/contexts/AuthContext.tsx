import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { JWTCookie } from '../config/app/CookiesConfig';
import URLS from '../config/constants/URLS';
import { IUserToFrontEnd } from '../interfaces/IUser';
import { IAuthResponse, setToken } from '../redux/features/authSlice';
import CookiesService from '../services/CookiesService';
import TrixelsAxiosServiceInstance from '../services/TrixelsAxiosService';

interface AuthContextType {
  isAuthenticated: boolean;
  userCredentials: IUserToFrontEnd | undefined;
  loginFn: (userData: any) => Promise<void>;
  logoutFn: () => Promise<void>;
  applyUserCredentials: (payload: IAuthResponse) => void;
  registerFn: (payload: { username: string; password: string }) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userCredentials: undefined,
  loginFn: () => {
    throw new Error('loginFn not implemented');
  },
  logoutFn: () => {
    throw new Error('logoutFn not implemented');
  },
  applyUserCredentials: () => {
    throw new Error('applyUserCredentials not implemented');
  },
  registerFn: () => {
    throw new Error('registerFn not implemented');
  },
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const reduxDispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCredentials, setUserCredentials] = useState<IUserToFrontEnd | undefined>(undefined);

  const getUserCredentials = async (): Promise<void> => {
    const token = CookiesService.get(JWTCookie.key);

    if (token) {
      await TrixelsAxiosServiceInstance.request<null>({
        requestConfig: { url: URLS.ENDPOINTS.AUTH.VALIDATE_ACCESS_TOKEN, method: 'get', data: null },
      });

      const userCredentialsRes = await TrixelsAxiosServiceInstance.request<IUserToFrontEnd>({
        requestConfig: { url: URLS.ENDPOINTS.USER.GET_USER_CREDENTIALS, method: 'get', data: null },
      });

      if (userCredentialsRes && userCredentialsRes.data) {
        reduxDispatch(setToken({ userCredentials: userCredentialsRes.data }));
        setUserCredentials(userCredentialsRes.data);
        setIsAuthenticated(true);
      }
    }
  };

  useEffect(() => {
    getUserCredentials();
  }, []);

  const loginFn = async (payload: { username: string; password: string }) => {
    const response = await TrixelsAxiosServiceInstance.request<IAuthResponse>({
      requestConfig: { url: URLS.ENDPOINTS.AUTH.LOGIN, method: 'post', data: { ...payload } },
      showSuccessErrorToast: [true, true],
    });

    if (!response || !response.data) throw new Error('No response');

    const { data } = response;
    reduxDispatch(setToken({ userCredentials: data.userCredentials }));
    setUserCredentials(data.userCredentials);
    setIsAuthenticated(true);
  };

  const logoutFn = async () => {
    try {
      await TrixelsAxiosServiceInstance.request<void>({
        requestConfig: {
          url: `${URLS.ENDPOINTS.AUTH.LOGOUT}`,
          method: 'post',
        },
      });
      reduxDispatch(setToken({ userCredentials: undefined }));
      setUserCredentials(undefined);
      setIsAuthenticated(false);
    } catch (err: unknown) {
      console.error('Failed to refresh token:', err);
    }
    toast.success('You have been logged out.');
  };

  const applyUserCredentials = (payload: IAuthResponse) => {
    const { userCredentials } = payload;
    reduxDispatch(setToken({ userCredentials }));
    setIsAuthenticated(true);
  };

  const registerFn = async (payload: { username: string; password: string }) => {
    if (isAuthenticated) {
      toast.error("You're already logged.");
      return;
    }

    const response = await TrixelsAxiosServiceInstance.request<IAuthResponse>({
      requestConfig: { url: URLS.ENDPOINTS.AUTH.REGISTER, method: 'post', data: { ...payload } },
      showSuccessErrorToast: [true, true],
    });

    if (response && response.data) {
      applyUserCredentials(response.data);
    } else {
      toast.error('Something went wrong.');
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userCredentials, registerFn, loginFn, logoutFn, applyUserCredentials }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
