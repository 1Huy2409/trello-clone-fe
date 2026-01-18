import { API_ENDPOINT } from "@/shared/api/api-endpoint";
import { fetchFactory } from "@/shared/api/fetch-factory";
import type { ApiResponse } from "@/shared/api/types";
import type {
    Checklist, CreateChecklist, UpdateChecklist,
    ChecklistItem, CreateChecklistItem, UpdateItemStatus, UpdateItemContent
} from "../model/types";

const axiosInstance = fetchFactory.getInstance();

export const checklistApi = {
    createChecklist: async <T = any>(cardId: string, data: CreateChecklist): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.checklist.createChecklist.replace(':id', cardId);
        const res = await axiosInstance.post<ApiResponse<T>>(url, data, { withCredentials: true });
        return res.data;
    },
    getChecklistsByCardId: async <T = Checklist[]>(cardId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.checklist.getChecklistsByCardId.replace(':id', cardId);
        const res = await axiosInstance.get<ApiResponse<T>>(url, { withCredentials: true });
        return res.data;
    },
    updateChecklist: async <T = any>(checklistId: string, data: UpdateChecklist): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.checklist.updateChecklist.replace(':checklistId', checklistId);
        const res = await axiosInstance.patch<ApiResponse<T>>(url, data, { withCredentials: true });
        return res.data;
    },
    deleteChecklist: async <T = any>(checklistId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.checklist.deleteChecklist.replace(':checklistId', checklistId);
        const res = await axiosInstance.delete<ApiResponse<T>>(url, { withCredentials: true });
        return res.data;
    },
};

export const checklistItemApi = {
    createChecklistItem: async <T = any>(checklistId: string, data: CreateChecklistItem): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.checklistItem.createChecklistItem.replace(':checklistId', checklistId);
        const res = await axiosInstance.post<ApiResponse<T>>(url, data, { withCredentials: true });
        return res.data;
    },
    getChecklistItems: async <T = ChecklistItem[]>(checklistId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.checklistItem.getChecklistItems.replace(':checklistId', checklistId);
        const res = await axiosInstance.get<ApiResponse<T>>(url, { withCredentials: true });
        return res.data;
    },
    updateStatus: async <T = any>(itemId: string, data: UpdateItemStatus): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.checklistItem.updateStatus.replace(':itemId', itemId);
        const res = await axiosInstance.patch<ApiResponse<T>>(url, data, { withCredentials: true });
        return res.data;
    },
    updateContent: async <T = any>(itemId: string, data: UpdateItemContent): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.checklistItem.updateContent.replace(':itemId', itemId);
        const res = await axiosInstance.patch<ApiResponse<T>>(url, data, { withCredentials: true });
        return res.data;
    },
    delete: async <T = any>(itemId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.checklistItem.delete.replace(':itemId', itemId);
        const res = await axiosInstance.delete<ApiResponse<T>>(url, { withCredentials: true });
        return res.data;
    },
};
