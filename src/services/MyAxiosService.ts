import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { JWTCookie } from '../config/app/CookiesConfig';
import URLS from '../config/constants/URLS';

interface IMyAxiosService<T> {
  api: IMyAPIResponse<T>;
  axios: AxiosResponse<IMyAPIResponse<T>>;
}

export interface IMyAPIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface AxiosServiceOptions {
  endpoint: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  data?: any;
  headers?: Record<string, string>;
}

const MyAxiosConfig = axios.create({
  baseURL: URLS.MAIN_URLS.API_URL,
  timeout: 10000,
} as AxiosRequestConfig);

export async function MyAxiosService<T>({
  endpoint,
  method = 'get',
  data,
  headers,
}: AxiosServiceOptions): Promise<IMyAxiosService<T | undefined>> {
  /* REFATORAR PARA NÃO FICAR PEGANDO COOKIE TODA HORA */
  const tokenCookie = Cookies.get(JWTCookie.key);

  try {
    const response: AxiosResponse<IMyAPIResponse<T>> = await MyAxiosConfig({
      url: endpoint,
      method,
      data,
      headers: {
        ...(tokenCookie && { Authorization: `Bearer ${tokenCookie}` }), // Adiciona o token aos cabeçalhos se existir
        ...headers,
      },
    });

    const responseData = response.data;

    if (!responseData.success) {
      throw new Error(responseData.message);
    }

    return { api: responseData, axios: response };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<IMyAPIResponse<T>>;

      if (axiosError.response) {
        toast.error(axiosError.response.data.message);
      } else if (axiosError.request) {
        toast.error('No response received from the server.');
      } else {
        toast.error('Error in making the request.');
      }
    } else {
      toast.error('An unexpected error occurred.');
    }

    throw error;
  }
}
