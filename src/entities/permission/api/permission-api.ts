import { API_ENDPOINT } from "@/shared/api/api-endpoint";
import { fetchFactory } from "@/shared/api/fetch-factory";
import type { ApiResponse } from "@/shared/api/types";
import type { PermissionDefinition } from "@/entities/workspace/model/types";

const axiosInstance = fetchFactory.getInstance();

export const permissionApi = {
    getAllPermissions: async <T = PermissionDefinition[]>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.permission.getAllPermissions, { withCredentials: true });
        return res.data;
    }
};
