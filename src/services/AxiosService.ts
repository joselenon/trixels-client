import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

interface AxiosServiceOptions {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  data?: any;
  headers?: Record<string, string>;
}

interface ApiResponse<T = any> {
  data?: T;
  error?: AxiosError;
}

async function AxiosService<T = any>({
  url,
  method = 'get',
  data,
  headers,
}: AxiosServiceOptions): Promise<T | undefined> {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers,
  };

  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios(config);

    const data = response.data;
    if (!data || data === undefined) throw new Error('something');

    return data;
  } catch (error: any) {
    toast.error(error);
  }
}

async function MyApiAxiosService<T = any>({
  url,
  method = 'get',
  data,
  headers,
}: AxiosServiceOptions): Promise<T | undefined> {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers,
  };

  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios(config);

    const responseData = response.data;
    if (!responseData) {
      throw new Error('Resposta vazia ou sem dados.');
    }

    return responseData.data;
  } catch (error: any) {
    toast.error(error);
    return undefined;
  }
}

export { AxiosService, MyApiAxiosService };
