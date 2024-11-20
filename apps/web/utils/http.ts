import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
}

axios.defaults.baseURL = "http://localhost:4000/";

class Http {
  private instance: AxiosInstance;

  constructor(options: AxiosRequestConfig) {
    this.instance = axios.create(options);
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // 请求拦截
    this.instance.interceptors.request.use((requestConfig) => {
      const token = window.localStorage.getItem("token");
      if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }
      return requestConfig;
    });
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<T>(config)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const http = new Http({
  timeout: 30000,
});
export { http };
