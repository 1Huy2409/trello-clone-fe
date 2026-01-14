import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workspaceKeys } from "./query-keys";
import { boardKeys } from "@/entities/board/api/query-keys";
import { api } from "@/shared/api";
import type { CreateWorkspace, UpdateWorkspace, AddWorkspaceMember, Workspace, WorkspaceRole, WorkspaceMember, PermissionDefinition, CreateWorkspaceRole, UpdateWorkspaceRole } from "@/shared/types/workspace/type";

export const useWorkspaces = () => {
    return useQuery({
        queryKey: workspaceKeys.lists(),
        queryFn: async () => {
            const response = await api.workspace.getWorkspaces<Workspace[]>();
            return response.responseObject;
        },
    });
};

export const useWorkspace = (id: string | undefined) => {
    return useQuery({
        queryKey: workspaceKeys.detail(id!),
        queryFn: async () => {
            const response = await api.workspace.getWorkspaceById<Workspace>(id!);
            return response.responseObject;
        },
        enabled: !!id,
    });
};

export const useWorkspaceBoards = (id: string | undefined) => {
    return useQuery({
        queryKey: boardKeys.byWorkspace(id!),
        queryFn: async () => {
            const response = await api.board.getBoardsByWorkspaceId(id!);
            return response.responseObject;
        },
        enabled: !!id,
    });
};

export const useWorkspaceMembers = (workspaceId: string) => {
    return useQuery({
        queryKey: workspaceKeys.members(workspaceId),
        queryFn: async () => {
            const response = await api.workspace.getWorkspaceMembers<WorkspaceMember[]>(workspaceId);
            return response.responseObject;
        },
        enabled: !!workspaceId,
    });
};

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateWorkspace) => {
            const response = await api.workspace.createWorkspace(data);
            return response.responseObject;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
        },
    });
};

export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateWorkspace }) => {
            const response = await api.workspace.updateWorkspace(id, data);
            return response.responseObject;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.detail(data.id) });
            queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
        },
    });
};

export const useAddWorkspaceMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: AddWorkspaceMember }) => {
            const response = await api.workspace.addWorkspaceMember(id, data);
            return response.responseObject;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.members(variables.id) });
        },
    });
};

export const useRemoveWorkspaceMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ workspaceId, userId }: { workspaceId: string; userId: string }) => {
            const response = await api.workspace.deleteWorkspaceMember(workspaceId, userId);
            return response.responseObject;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.members(variables.workspaceId) });
        },
    });
};

export const useWorkspaceRoles = (workspaceId: string) => {
    return useQuery({
        queryKey: workspaceKeys.roles(workspaceId),
        queryFn: async () => {
            const response = await api.workspace.getWorkspaceRoles<WorkspaceRole[]>(workspaceId);
            return response.responseObject;
        },
        enabled: !!workspaceId,
    });
};

export const useAllPermissions = () => {
    return useQuery({
        queryKey: ['permissions'], // TODO: Add to query-keys if needed
        queryFn: async () => {
            const response = await api.permission.getAllPermissions<PermissionDefinition[]>();
            return response.responseObject;
        },
    });
};

export const useCreateWorkspaceRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ workspaceId, data }: { workspaceId: string; data: CreateWorkspaceRole }) => {
            const response = await api.workspace.createWorkspaceRole(workspaceId, data);
            return response.responseObject;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.roles(variables.workspaceId) });
        },
    });
};

export const useUpdateWorkspaceRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ workspaceId, roleId, data }: { workspaceId: string; roleId: string; data: UpdateWorkspaceRole }) => {
            const response = await api.workspace.updateWorkspaceRole(workspaceId, roleId, data);
            return response.responseObject;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.roles(variables.workspaceId) });
        },
    });
};

export const useDeleteWorkspaceRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ workspaceId, roleId }: { workspaceId: string; roleId: string }) => {
            const response = await api.workspace.deleteWorkspaceRole(workspaceId, roleId);
            return response.responseObject;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.roles(variables.workspaceId) });
        },
    });
};

export const useArchiveWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await api.workspace.archiveWorkspace(id);
            return response.responseObject;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
            queryClient.invalidateQueries({ queryKey: ['archived-workspaces'] });
        },
    });
};

export const useArchivedWorkspaces = () => {
    return useQuery({
        queryKey: ['archived-workspaces'], // TODO: Add to query-keys
        queryFn: async () => {
            const response = await api.workspace.getArchivedWorkspaces<Workspace[]>();
            return response.responseObject;
        },
    });
};

export const useReopenWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await api.workspace.reopenWorkspace(id);
            return response.responseObject;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
            queryClient.invalidateQueries({ queryKey: ['archived-workspaces'] });
        },
    });
};

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await api.workspace.deleteWorkspace(id);
            return response.responseObject;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
        },
    });
};
