import { HttpException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

// buat variabel untuk endpoint kategori
export const kategori_api = axios.create({
  baseURL: 'http://localhost:3001/api/kategori',
  timeout: 1000,
});

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
    throw new HttpException('Kategori Error', 500);
  },
);
