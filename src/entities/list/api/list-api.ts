import { API_ENDPOINT } from "@/shared/api/api-endpoint";
import { fetchFactory } from "@/shared/api/fetch-factory";
import type { ApiResponse } from "@/shared/api/types";
import type { CreateList, CopyList, MoveList, ReorderList, UpdateList, List } from "../model/types";

const axiosInstance = fetchFactory.getInstance();

export const listApi = {
    getArchiveLists: async <T = List[]>(boardId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.board.getArchiveLists.replace(':boardId', boardId);
        const res = await axiosInstance.get<ApiResponse<T>>(url, { withCredentials: true });
        return res.data;
    },
    createList: async <T = any>(boardId: string, data: CreateList): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.board.createList.replace(':id', boardId);
        const res = await axiosInstance.post<ApiResponse<T>>(url, data, { withCredentials: true });
        return res.data;
    },
    reorderList: async <T = any>(data: ReorderList): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.list.reorder, data, { withCredentials: true });
        return res.data;
    },
    copyList: async <T = any>(data: CopyList): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.list.copy, data, { withCredentials: true });
        return res.data;
    },
    moveList: async <T = any>(data: MoveList): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.list.move, data, { withCredentials: true });
        return res.data;
    },
    editListName: async <T = any>(listId: string, data: UpdateList): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.list.editListName.replace(':listId', listId);
        const res = await axiosInstance.patch<ApiResponse<T>>(url, data, { withCredentials: true });
        return res.data;
    },
    archiveList: async <T = any>(listId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.list.archive.replace(':listId', listId);
        const res = await axiosInstance.patch<ApiResponse<T>>(url, {}, { withCredentials: true });
        return res.data;
    },
    reopenList: async <T = any>(listId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.list.reopen.replace(':listId', listId);
        const res = await axiosInstance.patch<ApiResponse<T>>(url, {}, { withCredentials: true });
        return res.data;
    },
};
