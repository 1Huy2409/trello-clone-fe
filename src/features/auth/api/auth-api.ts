import { API_ENDPOINT } from "@/shared/api/api-endpoint";
import { fetchFactory } from "@/shared/api/fetch-factory";
import type { ApiResponse } from "@/shared/api/types";
import type { LoginSchema, RegisterSchema, VerifyOTPSchema } from "../model/types";
import type { ChangePasswordSchema } from "@/entities/user/model/types";

const axiosInstance = fetchFactory.getInstance();

export const authApi = {
    login: async <T = any>(data: LoginSchema): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.login, data);
        return res.data;
    },
    register: async <T = any>(data: RegisterSchema): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.register, data);
        return res.data;
    },
    verifyOTP: async <T = any>(data: VerifyOTPSchema): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.verifyOTP, data);
        return res.data;
    },
    resendOTP: async <T = any>(data: { email: string }): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.requestOTP, data);
        return res.data;
    },
    refreshToken: async <T = any>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.refreshToken, {}, { withCredentials: true });
        return res.data;
    },
    changePassword: async <T = any>(data: ChangePasswordSchema): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.changePassword, data, { withCredentials: true });
        return res.data;
    },
    logout: async <T = any>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.logout, {}, { withCredentials: true });
        return res.data;
    },
};
