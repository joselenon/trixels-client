import { toast } from 'react-toastify';
import { Dispatch } from 'redux';

import { JWTCookie } from '../config/app/CookiesConfig';
import URLS from '../config/constants/URLS';
import { IAuthResponse } from '../interfaces/IAuth';
import { IUserToFrontEnd } from '../interfaces/IUser';
import { setToken } from '../redux/features/authSlice';
import CookiesService from './CookiesService';
import MyAxiosServiceInstance from './MyAxiosService';

class AuthService {
  async refreshAccessToken(): Promise<void> {
    try {
      await MyAxiosServiceInstance.request<void>({
        requestConfig: {
          url: `${URLS.ENDPOINTS.AUTH.REFRESH_ACCESS_TOKEN}`,
          method: 'post',
        },
      });
      await MyAxiosServiceInstance.request<void>({
        requestConfig: {
          url: `${URLS.ENDPOINTS.AUTH.VALIDATE_ACCESS_TOKEN}`,
          method: 'get',
        },
      });
    } catch (err) {
      toast.error('Failed to refresh token. Please login again.');
      throw err;
    }
  }

  applyUserCredentials(reduxDispatch: Dispatch, payload: IAuthResponse) {
    const { accessToken, userCredentials } = payload;
    if (!accessToken) return;

    reduxDispatch(setToken({ userCredentials }));
  }

  async getUserCredentials(reduxDispatch: Dispatch): Promise<void> {
    const token = CookiesService.get(JWTCookie.key);

    if (token) {
      await MyAxiosServiceInstance.request<null>({
        requestConfig: { url: URLS.ENDPOINTS.AUTH.VALIDATE_ACCESS_TOKEN, method: 'get', data: null },
      });

      const userCredentialsRes = await MyAxiosServiceInstance.request<IUserToFrontEnd>({
        requestConfig: { url: URLS.ENDPOINTS.USER.GET_USER_CREDENTIALS, method: 'get', data: null },
      });

      if (userCredentialsRes && userCredentialsRes.data) {
        reduxDispatch(setToken({ userCredentials: userCredentialsRes.data }));
      }
    }
  }

  async login(reduxDispatch: Dispatch, payload: { username: string; password: string }) {
    const response = await MyAxiosServiceInstance.request<IAuthResponse>({
      requestConfig: { url: URLS.ENDPOINTS.AUTH.LOGIN, method: 'post', data: { ...payload } },
      showToastMessage: true,
    });

    if (!response || !response.data) throw new Error('No response'); /* FIX */

    const { data } = response;
    reduxDispatch(setToken({ userCredentials: data.userCredentials }));
  }

  async logout() {
    try {
      await MyAxiosServiceInstance.request<void>({
        requestConfig: {
          url: `${URLS.ENDPOINTS.AUTH.LOGOUT}`,
          method: 'post',
        },
      });

      window.location.href = '/'; /* Arrumar isso já que não tem como puxar o redux pra ca */
    } catch (err: unknown) {
      console.error('Failed to refresh token:', err);
    }

    toast.success('You have been logged out.');
  }
}

export default new AuthService();
