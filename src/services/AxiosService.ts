import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

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
}: AxiosServiceOptions): Promise<ApiResponse<T>> {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers,
  };

  try {
    const response: AxiosResponse<T> = await axios(config);
    return { data: response.data };
  } catch (error: any) {
    return { error };
  }
}

export default AxiosService;
