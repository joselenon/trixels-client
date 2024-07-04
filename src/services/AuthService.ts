import { Dispatch } from 'redux';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

import { JWTCookie } from '../config/app/CookiesConfig';
import { IAuthResponse, setToken } from '../redux/features/authSlice';
import MyAxiosServiceInstance from './MyAxiosService';
import CookiesService from './CookiesService';
import { IUserToFrontEnd } from '../interfaces/IUser';

class AuthService {
  applyUserCredentials(reduxDispatch: Dispatch, payload: IAuthResponse) {
    const { token, userCredentials } = payload;
    if (!token) return;

    const tokena = CookiesService.get(JWTCookie.key);
    console.log('tokena', tokena);
    if (!tokena) return console.log('Token undefined viado...');
    const bearerToken = `Bearer ${tokena}`;

    console.log('Setting cookies config... TYPE 1');
    MyAxiosServiceInstance.setHeaders({ Authorization: bearerToken });
    /* CookiesService.set(JWTCookie.key, bearerToken.replace('Bearer ', ''), JWTCookie.config); */

    reduxDispatch(setToken({ userCredentials, token: bearerToken }));
  }

  async getUserCredentials(reduxDispatch: Dispatch): Promise<void> {
    const tokenInCookies = CookiesService.get(JWTCookie.key);
    if (!tokenInCookies) {
      return;
    }

    const bearerToken = `Bearer ${tokenInCookies}`;
    MyAxiosServiceInstance.setHeaders({ Authorization: bearerToken });

    const authResponse = await MyAxiosServiceInstance.request<IUserToFrontEnd>({
      endpoint: '/user',
      method: 'get',
      data: null,
    });

    console.log('Setting cookies config... TYPE 2');
    if (authResponse && authResponse.data) {
      CookiesService.set(JWTCookie.key, bearerToken.replace('Bearer ', ''), JWTCookie.config);
      reduxDispatch(setToken({ userCredentials: authResponse.data, token: bearerToken }));
    }
  }

  async login(reduxDispatch: Dispatch, payload: { username: string; password: string }) {
    const response = await MyAxiosServiceInstance.request<IAuthResponse>({
      endpoint: '/auth/login',
      method: 'post',
      data: { ...payload },
    });

    if (!response || !response.data) throw new Error('No response'); /* FIX */

    const { data } = response;
    const bearerToken = `Bearer ${data.token}`;

    console.log('Setting cookies config... TYPE 3');
    MyAxiosServiceInstance.setHeaders({ Authorization: bearerToken });
    CookiesService.set(JWTCookie.key, bearerToken.replace('Bearer ', ''), JWTCookie.config);
    reduxDispatch(setToken({ userCredentials: data.userCredentials, token: bearerToken }));
  }

  logout(reduxDispatch: Dispatch) {
    CookiesService.remove(JWTCookie.key);

    MyAxiosServiceInstance.setHeaders({ Authorization: '' });
    reduxDispatch(setToken(undefined));
    toast.success('You have been logged out.');

    console.log('LOGGED OUT');
    window.location.href = '/'; /* FIX */
  }
}

export default new AuthService();
