import type { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { useSessionStore } from "../model/store";
import { refreshAccessToken } from "../api/token-refresh";

// Type for queued requests
interface FailedRequest {
    resolve: (token: string) => void;
    reject: (error: any) => void;
}

// State variables for queue management
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

export const setupAuthInterceptor = (instance: AxiosInstance) => {
    // Request Interceptor: Attach Token
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = useSessionStore.getState().accessToken;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response Interceptor: Handle 401
    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

            if (error.response?.status === 401 && !originalRequest._retry) {
                // Skip token refresh for login requests
                if (originalRequest.url?.includes('/auth/login')) {
                    return Promise.reject(error);
                }

                if (isRefreshing) {
                    // Queue the request if refreshing is already in progress
                    return new Promise<void>((resolve, reject) => {
                        failedQueue.push({
                            resolve: (token: string) => {
                                if (originalRequest.headers) {
                                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                                }
                                resolve(instance(originalRequest) as any);
                            },
                            reject: (err) => {
                                reject(err);
                            },
                        });
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const response = await refreshAccessToken();
                    const newAccessToken = response.responseObject.accessToken;

                    // Update store
                    useSessionStore.getState().setAccessToken(newAccessToken);

                    // Process queue with new token
                    processQueue(null, newAccessToken);
                    isRefreshing = false;

                    // Retry original request
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    }
                    return instance(originalRequest);

                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    processQueue(refreshError, null);
                    isRefreshing = false;

                    useSessionStore.getState().logout();
                    // window.location.href = '/#/auth/login'; // internal routing handles this via store subscription

                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
};
