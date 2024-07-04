import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { JWTCookie } from '../config/app/CookiesConfig';
import URLS from '../config/constants/URLS';

export interface IRequestProps {
  endpoint: string;
  method: 'get' | 'post' | 'put';
  data: unknown;
  showToastMessage?: boolean;
}

export interface IMyAPIResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
}

class MyAxiosServiceClass {
  private tokenCookie: string | undefined;
  private headers: Record<string, string> = {};

  constructor() {
    const CookiesInstance = new Cookies();
    this.tokenCookie = CookiesInstance.get(JWTCookie.key);
  }

  setHeaders(headers: Record<string, string>): void {
    this.headers = headers;
  }

  async request<T>({
    endpoint,
    method = 'get',
    data,
    showToastMessage = false,
  }: IRequestProps): Promise<IMyAPIResponse<T | null> | null> {
    try {
      const response: AxiosResponse<IMyAPIResponse<T>> = await axios({
        url: `${URLS.MAIN_URLS.API_URL}${endpoint}`,
        method,
        data,
        headers: {
          ...this.headers,
        },
      });

      if (response.data.success && showToastMessage) toast.success(response.data.message);
      return response.data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<IMyAPIResponse>;
      if (axiosError.response) {
        return axiosError.response.data;
      }

      toast.error('You connection may have dropped...');
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
