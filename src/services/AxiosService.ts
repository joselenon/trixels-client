import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

interface AxiosServiceOptions {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  data?: any;
  headers?: Record<string, string>;
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
    const response: AxiosResponse<T> = await axios(config);

    const data = response.data;
    if (!data || data === undefined) throw new Error('something');

    return data;
  } catch (error: any) {
    toast.error(error);
  }
}

export { AxiosService };
