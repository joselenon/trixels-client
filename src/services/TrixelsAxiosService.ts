import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import URLS from '../config/constants/URLS';
import AuthService from './AuthService';

export interface IRequestProps {
  requestConfig: AxiosRequestConfig;
  showSuccessErrorToast?: boolean[];
}

export interface IMyAPIResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
}

class TrixelsAxiosServiceClass {
  private trixelsAPI: AxiosInstance;
  private headers: Record<string, string> = {};
  private isRefreshing = false;
  private failedRequests: Array<() => void> = [];

  constructor() {
    this.trixelsAPI = axios.create({
      baseURL: `${URLS.MAIN_URLS.API_URL}`,
      withCredentials: true,
      headers: { ...this.headers },
    });

    this.trixelsAPI.interceptors.response.use(
      (response) => response,
      async (error) => await this.handleResponseError(error),
      { synchronous: true },
    );
  }

  setHeaders(headers: Record<string, string>): void {
    this.headers = headers;
  }

  async request<T>(requestProps: IRequestProps): Promise<IMyAPIResponse<T | null>> {
    const { requestConfig, showSuccessErrorToast } = requestProps;
    const [showSuccessToast = false, showErrorToast = false] = showSuccessErrorToast || [];

    try {
      const response: AxiosResponse<IMyAPIResponse<T>> = await this.trixelsAPI.request({
        ...requestConfig,
      });

      if (showSuccessToast) {
        toast.success(response.data.message);
      }

      return response.data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<IMyAPIResponse>;

      console.error('Axios Error:', axiosError);
      if (axiosError.response && showErrorToast) {
        console.error('Response Data:', axiosError.response.data);
        toast.error(axiosError.response.data.message);
      }

      throw err;
    }
  }

  private async handleResponseError(error: AxiosError): Promise<AxiosResponse | void> {
    const { config } = error;
    if (!config) {
      return Promise.reject(error);
    }

    const { method, data, url } = config;
    const originalRequest = { method, data: data && JSON.parse(data), url };

    if (error.response?.status === 401 && originalRequest) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;

        try {
          await AuthService.refreshAccessToken();
          this.isRefreshing = false;
          this.failedRequests.forEach((callback) => callback());
          this.failedRequests = [];

          const res = await this.trixelsAPI({ ...originalRequest });
          return res;
        } catch (err: unknown) {
          const axiosError = err as AxiosError<unknown, any>;

          if (axiosError.response?.status === 401) {
            toast.error('Failed to refresh token. Please login again.');
            this.isRefreshing = false;
            this.failedRequests = [];
            AuthService.logout();
          }

          return Promise.reject(err);
        }
      } else {
        return new Promise((resolve) => {
          this.failedRequests.push(() => {
            resolve(this.trixelsAPI(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
}

const TrixelsAxiosServiceInstance = new TrixelsAxiosServiceClass();

export default TrixelsAxiosServiceInstance;
