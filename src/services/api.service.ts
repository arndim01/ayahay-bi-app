// src/services/api.service.ts
import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { AYAHAY_API_URL } from "@/constants";

interface AxiosRequestWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

class ApiService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: AYAHAY_API_URL,
      withCredentials: true, // ✅ include cookies
      headers: { "Content-Type": "application/json" },
    });

    // optional refresh token handling (like your AuthService)
    this.axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        console.error("API Error:", error);
        const originalRequest = error.config as AxiosRequestWithRetry;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          // Example: refresh silently
          try {
            await this.axios.post("/auth/refresh-token");
            return this.axios(originalRequest);
          } catch (refreshError) {
            throw refreshError;
          }
        }
        throw error;
      }
    );
  }

  async get<T, P extends Record<string, unknown> = Record<string, unknown>>(
    url: string,
    params?: P
  ): Promise<T> {
    const response = await this.axios.get<T>(url, { params });
    return response.data;
  }

  async post<T, D extends Record<string, unknown> = Record<string, unknown>>(
    url: string,
    data?: D
  ): Promise<T> {
    const response = await this.axios.post<T>(url, data);
    return response.data;
  }
}

export const apiService = new ApiService();
