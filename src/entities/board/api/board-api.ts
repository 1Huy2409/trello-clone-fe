import { API_ENDPOINT } from "@/shared/api/api-endpoint";
import { fetchFactory } from "@/shared/api/fetch-factory";
import type { ApiResponse } from "@/shared/api/types";
import type { Board, CreateBoard, UpdateBoard } from "../model/types";

const axiosInstance = fetchFactory.getInstance();

export const boardApi = {
    getBoardsByWorkspaceId: async <T = Board[]>(workspaceId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.board.getBoardsByWorkspaceId.replace(':id', workspaceId);
        const res = await axiosInstance.get<ApiResponse<T>>(url, { withCredentials: true });
        return res.data;
    },
    getBoardById: async <T = Board>(boardId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.board.getBoardById.replace(':boardId', boardId);
        const res = await axiosInstance.get<ApiResponse<T>>(url, { withCredentials: true });
        return res.data;
    },
    createBoardFromWorkspace: async <T = any>(workspaceId: string, data: CreateBoard): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.board.createBoardFromWorkspace.replace(':id', workspaceId);
        const res = await axiosInstance.post<ApiResponse<T>>(url, data, { withCredentials: true });
        return res.data;
    },
    updateBoard: async <T = any>(boardId: string, data: UpdateBoard): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.board.updateBoard.replace(':boardId', boardId);
        const res = await axiosInstance.patch<ApiResponse<T>>(url, data, { withCredentials: true });
        return res.data;
    },
    deleteBoard: async <T = any>(boardId: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.board.deleteBoard.replace(':boardId', boardId);
        const res = await axiosInstance.delete<ApiResponse<T>>(url, { withCredentials: true });
        return res.data;
    },
    reopenBoard: async <T = any>(id: string): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.board.reopenBoard.replace(':id', id);
        const res = await axiosInstance.delete<ApiResponse<T>>(url, { withCredentials: true });
        return res.data;
    },
    joinBoardByLink: async <T = any>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.board.joinBoardByLink, { withCredentials: true });
        return res.data;
    },
    createBoardJoinLink: async <T = any>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.board.createBoardJoinLink, { withCredentials: true });
        return res.data;
    },
    revokeBoardJoinLink: async <T = any>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.delete<ApiResponse<T>>(API_ENDPOINT.board.revokeBoardJoinLink, { withCredentials: true });
        return res.data;
    },
    inviteByEmail: async <T = any>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.board.inviteByEmail, { withCredentials: true });
        return res.data;
    },
    getBoardMembers: async <T = any>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.board.getBoardMembers, { withCredentials: true });
        return res.data;
    },
    getBoardLists: async <T = any>(boardId: string, params?: any): Promise<ApiResponse<T>> => {
        const url = API_ENDPOINT.board.getBoardLists.replace(':id', boardId);
        const res = await axiosInstance.get<ApiResponse<T>>(url, { params, withCredentials: true });
        return res.data;
    },
    changeOwnerBoard: async <T = any>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.put<ApiResponse<T>>(API_ENDPOINT.board.changeOwnerBoard, { withCredentials: true });
        return res.data;
    },
};
