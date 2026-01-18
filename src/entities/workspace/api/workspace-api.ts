import { API_ENDPOINT } from "@/shared/api/api-endpoint";
import { fetchFactory } from "@/shared/api/fetch-factory";
import type { ApiResponse } from "@/shared/api/types";
import type {
    Workspace, CreateWorkspace, UpdateWorkspace,
    AddWorkspaceMember, CreateWorkspaceRole, UpdateWorkspaceRole, WorkspaceRole
} from "../model/types";

const axiosInstance = fetchFactory.getInstance();

export const workspaceApi = {
    getWorkspaces: async <T = Workspace[]>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.workspace.getAllWorkspaces, { withCredentials: true });
        return res.data;
    },
    getArchivedWorkspaces: async <T = Workspace[]>(): Promise<ApiResponse<T>> => {
        const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.workspace.getArchivedWorkspaces, { withCredentials: true });
        return res.data;
    },
    getWorkspaceById: async <T = Workspace>(id: string): Promise<ApiResponse<T>> => {
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
    getWorkspaceRoles: async <T = WorkspaceRole[]>(workspaceId: string): Promise<ApiResponse<T>> => {
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
};
