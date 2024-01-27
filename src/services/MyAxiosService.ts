import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { JWTCookie } from '../config/app/CookiesConfig';
import URLS from '../config/constants/URLS';

export interface IMyAPIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type TMyAxiosServiceResponse<T> = Promise<IMyAPIResponse<T> | null>;

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
}: AxiosServiceOptions): TMyAxiosServiceResponse<T> {
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
    if (response.data.success) toast.success(response.data.message);

    const responseData = response.data;
    return responseData;
  } catch (err: any) {
    const axiosError = err as AxiosError<IMyAPIResponse<undefined>>;
    toast.error(axiosError.response?.data.message);

    return null;
  }
}
