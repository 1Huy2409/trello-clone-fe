import type { LoginSchema, RegisterSchema, VerifyOTPSchema, CreateWorkspace, UpdateWorkspace, CreateBoard, UpdateBoard, CreateList, ReorderList, CopyList, MoveList, UpdateList, AssignMember, UpdateCard, ReorderCard, CopyCard, MoveCard, UpdateProfileSchema, ChangePasswordSchema, AddWorkspaceMember } from "../lib/types";
import type { CreateChecklist } from "../types/checklist/type";
import type { CreateWorkspaceRole, UpdateWorkspaceRole } from "../types/workspace/type";
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
        }
    },
    user: {
        getMe: async <T = any>(): Promise<ApiResponse<T>> => {
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
    },
    workspace: {
        getWorkspaces: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.workspace.getAllWorkspaces, { withCredentials: true });
            return res.data;
        },
        getArchivedWorkspaces: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.workspace.getArchivedWorkspaces, { withCredentials: true });
            return res.data;
        },
        getWorkspaceById: async <T = any>(id: string): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.getWorkspaceById.replace(':id', id);
            const res = await axiosInstance.get<ApiResponse<T>>(url, { withCredentials: true });
            return res.data;
        },
        createWorkspace: async <T = any>(data: CreateWorkspace): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.workspace.createWorkspace, data, { withCredentials: true });
            return res.data;
        },
        updateWorkspace: async <T = any>(id: string, data: UpdateWorkspace): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.updateWorkspace.replace(':id', id);
            const res = await axiosInstance.patch<ApiResponse<T>>(url, data, { withCredentials: true });
            return res.data;
        },
        deleteWorkspace: async <T = any>(id: string): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.deleteWorkspace.replace(':id', id);
            const res = await axiosInstance.delete<ApiResponse<T>>(url, { withCredentials: true });
            return res.data;
        },
        archiveWorkspace: async <T = any>(id: string): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.archiveWorkspace.replace(':id', id);
            const res = await axiosInstance.patch<ApiResponse<T>>(url, { withCredentials: true });
            return res.data;
        },
        reopenWorkspace: async <T = any>(id: string): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.reopenWorkspace.replace(':id', id);
            const res = await axiosInstance.patch<ApiResponse<T>>(url, { withCredentials: true });
            return res.data;
        },
        getWorkspaceMembers: async <T = any>(workspaceId: string): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.getWorkspaceMembers.replace(':id', workspaceId);
            const res = await axiosInstance.get<ApiResponse<T>>(url, { withCredentials: true });
            return res.data;
        },
        addWorkspaceMember: async <T = any>(workspaceId: string, data: AddWorkspaceMember): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.addWorkspaceMember.replace(':id', workspaceId);
            const res = await axiosInstance.post<ApiResponse<T>>(url, data, { withCredentials: true });
            return res.data;
        },
        deleteWorkspaceMember: async <T = any>(workspaceId: string, userId: string): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.deleteWorkspaceMember.replace(':id', workspaceId).replace(':userId', userId);
            const res = await axiosInstance.delete<ApiResponse<T>>(url, { withCredentials: true });
            return res.data;
        },
        getWorkspaceRoles: async <T = any>(workspaceId: string): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.getWorkspaceRoles.replace(':id', workspaceId);
            const res = await axiosInstance.get<ApiResponse<T>>(url, { withCredentials: true });
            return res.data;
        },
        createWorkspaceRole: async <T = any>(workspaceId: string, data: CreateWorkspaceRole): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.createWorkspaceRole.replace(':id', workspaceId);
            const res = await axiosInstance.post<ApiResponse<T>>(url, data, { withCredentials: true });
            return res.data;
        },
        updateWorkspaceRole: async <T = any>(workspaceId: string, roleId: string, data: UpdateWorkspaceRole): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.updateWorkspaceRole.replace(':id', workspaceId).replace(':roleId', roleId);
            const res = await axiosInstance.patch<ApiResponse<T>>(url, data, { withCredentials: true });
            return res.data;
        },
        deleteWorkspaceRole: async <T = any>(workspaceId: string, roleId: string): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.deleteWorkspaceRole.replace(':id', workspaceId).replace(':roleId', roleId);
            const res = await axiosInstance.delete<ApiResponse<T>>(url, { withCredentials: true });
            return res.data;
        },
        updateMemberRole: async <T = any>(workspaceId: string, userId: string): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.workspace.updateMemberRole.replace(':id', workspaceId).replace(':userId', userId);
            const res = await axiosInstance.put<ApiResponse<T>>(url, {}, { withCredentials: true });
            return res.data;
        },
    },
    board: {
        getBoardsByWorkspaceId: async <T = any>(workspaceId: string): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.board.getBoardsByWorkspaceId.replace(':id', workspaceId);
            const res = await axiosInstance.get<ApiResponse<T>>(url, { withCredentials: true });
            return res.data;
        },
        getBoardById: async <T = any>(boardId: string): Promise<ApiResponse<T>> => {
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
    },
    list: {
        getArchiveLists: async <T = any>(boardId: string): Promise<ApiResponse<T>> => {
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
    },
    card: {
        getArchiveCards: async <T = any>(listId: string): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.card.getArchiveCards.replace(':listId', listId);
            const res = await axiosInstance.get<ApiResponse<T>>(url, { withCredentials: true });
            return res.data;
        },
        createCard: async <T = any>(listId: string, data: any): Promise<ApiResponse<T>> => {
            const url = API_ENDPOINT.list.createCard.replace(':listId', listId);
            const res = await axiosInstance.post<ApiResponse<T>>(url, data, { withCredentials: true });
            return res.data;
        },
        getCardByListId: async <T = any>(listId: string, params?: any): Promise<ApiResponse<T>> => {
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
    },
    permission: {
        getAllPermissions: async<T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.permission.getAllPermissions, { withCredentials: true });
            return res.data;
        }
    }
}