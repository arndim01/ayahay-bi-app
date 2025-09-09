import axios, { AxiosInstance, AxiosError } from "axios"
import { API_ENDPOINTS, AYAHAY_API_URL } from "@/constants"
import type { AuthUser, AuthCredentials, AuthRegister, AuthResponse, AuthSuccessResponse } from "@/types/auth"
import { InternalAxiosRequestConfig } from "axios"

interface AxiosRequestWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean
}

class AuthService {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      withCredentials: true, // cookies sent automatically
      baseURL: AYAHAY_API_URL,
      headers: { "Content-Type": "application/json" }
    })

    this.axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        console.error("API Error:", error)

        const originalRequest = error.config as AxiosRequestWithRetry
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          originalRequest.url !== API_ENDPOINTS.AUTH.REFRESH_TOKEN &&
          originalRequest.url !== API_ENDPOINTS.AUTH.LOGOUT
        ) {
          originalRequest._retry = true
          try {
            await this.axios.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN)
            return this.axios(originalRequest)
          } catch (refreshError) {
            this.clearUser()
            throw refreshError
          }
        }
        throw error
      }
    )
  }

  async register(data: AuthRegister): Promise<AuthResponse> {
    const response = await this.axios.post(API_ENDPOINTS.AUTH.REGISTER, data)
    this.storeUser(response.data.user)
    return response.data
  }

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await this.axios.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
    this.storeUser(response.data.user)
    console.log("Logged in user:", response)
    return response.data
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await this.axios.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN)
    this.storeUser(response.data.user)
    return response.data
  }

  async forgotPassword(email: string): Promise<AuthSuccessResponse> {
    const response = await this.axios.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email
    })
    return response.data
  }

  async resetPassword(token: string, new_password: string): Promise<AuthSuccessResponse> {
    const response = await this.axios.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      new_password
    })
    return response.data
  }

  async verifyEmail(token: string): Promise<AuthSuccessResponse> {
    const response = await this.axios.get(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
      params: { token }
    })
    return response.data
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const response = await this.axios.get(API_ENDPOINTS.AUTH.ME)
      this.storeUser(response.data)
      return response.data
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) return null
      throw error
    }
  }

  async changePassword(current_password: string, new_password: string): Promise<AuthSuccessResponse> {
    const response = await this.axios.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      current_password,
      new_password
    })
    return response.data
  }

  async logout(): Promise<AuthSuccessResponse> {
    const response = await this.axios.post(API_ENDPOINTS.AUTH.LOGOUT)
    this.clearUser()
    return response.data
  }

  async verifyToken(): Promise<{ valid: boolean; user: AuthUser }> {
    const response = await this.axios.get(API_ENDPOINTS.AUTH.VERIFY_TOKEN)
    return response.data
  }

  // --- User Storage Only ---
  private storeUser(user: AuthUser) {
    if (user) localStorage.setItem("user", JSON.stringify(user))
  }

  getStoredUser(): AuthUser | null {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }

  private clearUser() {
    localStorage.removeItem("user")
  }
}

export const authService = new AuthService()
