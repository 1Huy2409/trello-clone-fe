import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const getAccessToken = () => localStorage.getItem('accessToken');
const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);
const clearAccessToken = () => localStorage.removeItem('accessToken');

export interface FetchFactoryConfig extends AxiosRequestConfig { }
export class FetchFactory {
    private instance: AxiosInstance;
    constructor(config?: FetchFactoryConfig) {
        this.instance = axios.create({
            baseURL: API_BASE_URL,
            withCredentials: true,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            ...config,
        })
        this.setupInterceptors();
    }
    private setupInterceptors() {
        this.instance.interceptors.request.use(
            (config) => {
                const token = getAccessToken();
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    clearAccessToken();
                    try {
                        const response = await axios.post(`${API_BASE_URL}/auth/processNewToken`, {}, { withCredentials: true });
                        const newAccessToken = response.data.responseObject.accessToken;
                        setAccessToken(newAccessToken);
                        if (originalRequest.headers) {
                            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        }
                        return this.instance(originalRequest);
                    }
                    catch (refreshError) {
                        console.error('Token refresh failed:', refreshError);
                        window.location.href = '/#/login';
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    }
    public getInstance(): AxiosInstance {
        return this.instance;
    }
    public get<T>(url: string, config?: AxiosRequestConfig) {
        return this.instance.get<T>(url, config);
    }
    public post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.post<T>(url, data, config);
    }
    public put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.put<T>(url, data, config);
    }
    public patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.patch<T>(url, data, config);
    }
    public delete<T>(url: string, config?: AxiosRequestConfig) {
        return this.instance.delete<T>(url, config);
    }
}
export const fetchFactory = new FetchFactory();