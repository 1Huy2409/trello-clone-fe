import { API_ENDPOINT } from "@/shared/api/api-endpoint";
import { fetchFactory } from "@/shared/api/fetch-factory";
import type { ApiResponse } from "@/shared/api/types";
import type { UpdateProfileSchema, User } from "../model/types";

const axiosInstance = fetchFactory.getInstance();

export const userApi = {
    getMe: async <T = User>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.user.getMe, { withCredentials: true });
        return res.data;
    },
    updateProfile: async <T = any>(data: UpdateProfileSchema): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.user.updateProfile, data, { withCredentials: true });
        return res.data;
    },
    uploadAvatar: async <T = any>(data: FormData): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.user.uploadAvatar, data, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        });
        return res.data;
    }
};
