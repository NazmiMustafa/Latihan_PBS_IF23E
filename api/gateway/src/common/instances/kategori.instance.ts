import { HttpException } from '@nestjs/common';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// buat variabel untuk endpoint kategori
export const kategori_api = axios.create({
  baseURL: 'http://localhost:3001/api/kategori',
  timeout: 1000,
});

// buat interceptor untuk request
kategori_api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // sesuaikan nama header dan isi header dengan resource (3001)
    config.headers['x-internal-secret'] = 'rahasia';

    return config;
  },
  (error) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error))),
);

// buat interceptor untuk response
kategori_api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = error.response?.data;
    const status = error.response?.status;

    // jika terbaca status error
    if (status && message) {
      throw new HttpException(message, status);
    }

    // jika tidak terbaca status error
    throw new HttpException('Internal Error', 500);
  },
);
