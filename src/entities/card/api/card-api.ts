import { API_ENDPOINT } from "@/shared/api/api-endpoint";
import { fetchFactory } from "@/shared/api/fetch-factory";
import type { ApiResponse } from "@/shared/api/types";
import type { AssignMember, Card, CopyCard, MoveCard, ReorderCard, UpdateCard, CreateCard } from "../model/types";
import type { CreateChecklist } from "@/entities/checklist/model/types";

const axiosInstance = fetchFactory.getInstance();

export const cardApi = {
    getArchiveCards: async <T = Card[]>(listId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.card.getArchiveCards.replace(':listId', listId);
        const res = await axiosInstance.get<ApiResponse<T>>(url, { withCredentials: true });
        return res.data;
    },
    createCard: async <T = any>(listId: string, data: CreateCard): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.list.createCard.replace(':listId', listId);
        const res = await axiosInstance.post<ApiResponse<T>>(url, data, { withCredentials: true });
        return res.data;
    },
    getCardByListId: async <T = Card[]>(listId: string, params?: any): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.card.getCardByListId.replace(':listId', listId);
        const res = await axiosInstance.get<ApiResponse<T>>(url, { params, withCredentials: true });
        return res.data;
    },
    reopenCard: async <T = any>(cardId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.card.reopen.replace(':id', cardId);
        const res = await axiosInstance.patch<ApiResponse<T>>(url, {}, { withCredentials: true });
        return res.data;
    },
    getCardMembers: async <T = any>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.card.getCardMembers, { withCredentials: true });
        return res.data;
    },
    getChecklists: async <T = any>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.card.getChecklists, { withCredentials: true });
        return res.data;
    },
    assignMember: async <T = any>(data: AssignMember): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.card.assignMember, data, { withCredentials: true });
        return res.data;
    },
    createChecklist: async <T = any>(data: CreateChecklist): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.card.createChecklist, data, { withCredentials: true });
        return res.data;
    },
    removeMember: async <T = any>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.delete<ApiResponse<T>>(API_ENDPOINT.card.removeMember, { withCredentials: true });
        return res.data;
    },
    updateCard: async <T = any>(id: string, data: UpdateCard): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.card.updateCard.replace(':id', id);
        const res = await axiosInstance.patch<ApiResponse<T>>(url, data, { withCredentials: true });
        return res.data;
    },
    archive: async <T = any>(cardId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.card.archive.replace(':id', cardId);
        const res = await axiosInstance.patch<ApiResponse<T>>(url, {}, { withCredentials: true });
        return res.data;
    },
    reopen: async <T = any>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.card.reopen, { withCredentials: true });
        return res.data;
    },
    reorder: async <T = any>(data: ReorderCard): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.card.reorder, data, { withCredentials: true });
        return res.data;
    },
    copy: async <T = any>(data: CopyCard): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.card.copy, data, { withCredentials: true });
        return res.data;
    },
    move: async <T = any>(data: MoveCard): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.card.move, data, { withCredentials: true });
        return res.data;
    },
};
