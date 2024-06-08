import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { JWTCookie } from '../config/app/CookiesConfig';
import URLS from '../config/constants/URLS';

export interface IRequestProps {
  endpoint: string;
  method: 'get' | 'post' | 'put';
  data: any;
  showToastMessage?: boolean;
}

export interface IMyAPIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type TMyAxiosServiceResponse<T> = Promise<IMyAPIResponse<T> | null>;

class MyAxiosServiceClass {
  private tokenCookie: string | undefined;
  private headers: Record<string, string> = {};

  constructor() {
    this.tokenCookie = Cookies.get(JWTCookie.key);
  }

  setHeaders(headers: Record<string, string>): void {
    this.headers = headers;
  }

  async request<T>({
    endpoint,
    method = 'get',
    data,
    showToastMessage = false,
  }: IRequestProps): TMyAxiosServiceResponse<T> {
    try {
      const response: AxiosResponse<IMyAPIResponse<T>> = await axios({
        url: `${URLS.MAIN_URLS.API_URL}${endpoint}`,
        method,
        data,
        headers: {
          ...(this.tokenCookie && { Authorization: `Bearer ${this.tokenCookie}` }),
          ...this.headers,
        },
      });

      if (response.data.success && showToastMessage) toast.success(response.data.message);
      return response.data;
    } catch (err: any) {
      const axiosError = err as AxiosError<IMyAPIResponse<undefined>>;
      toast.error(axiosError.response?.data.message);

      return null;
    }
  }
}

// Uso da classe
const MyAxiosServiceInstance = new MyAxiosServiceClass();

// Exemplo de como mudar os headers após o usuário se autenticar
/* const authHeaders = {
  'Custom-Header': 'value',
  // Adicione outros headers conforme necessário
};

myAxiosService.setHeaders(authHeaders);
*/

export default MyAxiosServiceInstance;
