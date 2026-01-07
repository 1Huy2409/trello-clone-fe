import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

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
        });

        // Interceptors are now setup externally (e.g., in app/providers or main.tsx)
        // using the setupAuthInterceptor from entities/session
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