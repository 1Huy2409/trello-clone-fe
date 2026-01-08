import type { LoginSchema, RegisterSchema, VerifyOTPSchema, CreateWorkspace, UpdateWorkspace, CreateBoard, UpdateBoard, CreateList, ReorderList, CopyList, MoveList, UpdateList, AssignMember, UpdateCard, ReorderCard, CopyCard, MoveCard } from "../lib/types";
import type { CreateChecklist, UpdateChecklist } from "../types/checklist/type";
import { API_ENDPOINT } from "./api-endpoint";
import { FetchFactory, fetchFactory } from "./fetch-factory";


export { API_ENDPOINT, FetchFactory, fetchFactory };
export const axiosInstance = fetchFactory.getInstance();

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    responseObject: T;
    statusCode: number;
}
export interface ApiError {
    name: string;
    message: string;
    statusCode: number;
    code?: string;
}
export const api = {
    auth: {
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
        refreshToken: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.refreshToken, {}, { withCredentials: true });
            return res.data;
        },
        logout: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.logout, {}, { withCredentials: true });
            return res.data;
        }
    },
    workspace: {
        getWorkspaces: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.workspace.getAllWorkspaces, { withCredentials: true });
            return res.data;
        },
        createWorkspace: async <T = any>(data: CreateWorkspace): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.workspace.createWorkspace, data, { withCredentials: true });
            return res.data;
        },
        updateWorkspace: async <T = any>(data: UpdateWorkspace): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.put<ApiResponse<T>>(API_ENDPOINT.workspace.updateWorkspace, data, { withCredentials: true });
            return res.data;
        },
        deleteWorkspace: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.delete<ApiResponse<T>>(API_ENDPOINT.workspace.deleteWorkspace, { withCredentials: true });
            return res.data;
        },
        archiveWorkspace: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.delete<ApiResponse<T>>(API_ENDPOINT.workspace.archiveWorkspace, { withCredentials: true });
            return res.data;
        },
        reopenWorkspace: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.delete<ApiResponse<T>>(API_ENDPOINT.workspace.reopenWorkspace, { withCredentials: true });
            return res.data;
        },
        getWorkspaceMembers: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.workspace.getWorkspaceMembers, { withCredentials: true });
            return res.data;
        },
        deleteWorkspaceMember: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.delete<ApiResponse<T>>(API_ENDPOINT.workspace.deleteWorkspaceMember, { withCredentials: true });
            return res.data;
        },
        getWorkspaceRoles: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.workspace.getWorkspaceRoles, { withCredentials: true });
            return res.data;
        },
        createWorkspaceRole: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.workspace.createWorkspaceRole, { withCredentials: true });
            return res.data;
        },
        updateWorkspaceRole: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.put<ApiResponse<T>>(API_ENDPOINT.workspace.updateWorkspaceRole, { withCredentials: true });
            return res.data;
        },
        deleteWorkspaceRole: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.delete<ApiResponse<T>>(API_ENDPOINT.workspace.deleteWorkspaceRole, { withCredentials: true });
            return res.data;
        },
        updateMemberRole: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.put<ApiResponse<T>>(API_ENDPOINT.workspace.updateMemberRole, { withCredentials: true });
            return res.data;
        },
    },
    board: {
        getBoardsByWorkspaceId: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.board.getBoardsByWorkspaceId, { withCredentials: true });
            return res.data;
        },
        createBoardFromWorkspace: async <T = any>(data: CreateBoard): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.board.createBoardFromWorkspace, data, { withCredentials: true });
            return res.data;
        },
        updateBoard: async <T = any>(data: UpdateBoard): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.put<ApiResponse<T>>(API_ENDPOINT.board.updateBoard, data, { withCredentials: true });
            return res.data;
        },
        deleteBoard: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.delete<ApiResponse<T>>(API_ENDPOINT.board.deleteBoard, { withCredentials: true });
            return res.data;
        },
        reopenBoard: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.delete<ApiResponse<T>>(API_ENDPOINT.board.reopenBoard, { withCredentials: true });
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
        getBoardLists: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.board.getBoardLists, { withCredentials: true });
            return res.data;
        },
        changeOwnerBoard: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.put<ApiResponse<T>>(API_ENDPOINT.board.changeOwnerBoard, { withCredentials: true });
            return res.data;
        },
    },
    list: {
        createList: async <T = any>(data: CreateList): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.board.createList, data, { withCredentials: true });
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
        editListName: async <T = any>(data: UpdateList): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.list.editListName, data, { withCredentials: true });
            return res.data;
        },
        archiveList: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.list.archive, { withCredentials: true });
            return res.data;
        },
        reopenList: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.list.reopen, { withCredentials: true });
            return res.data;
        },
    },
    card: {
        createCard: async <T = any>(data: any): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.list.createCard, data, { withCredentials: true });
            return res.data;
        },
        getCardByListId: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.list.createCard, { withCredentials: true });
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
        updateCard: async <T = any>(data: UpdateCard): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.card.updateCard, data, { withCredentials: true });
            return res.data;
        },
        archive: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.patch<ApiResponse<T>>(API_ENDPOINT.card.archive, { withCredentials: true });
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

    }
}