import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workspaceKeys } from "./query-keys";
import { api } from "@/shared/api";
import type { CreateWorkspace } from "@/shared/types/workspace/type";

export const useWorkspaces = () => {
    return useQuery({
        queryKey: workspaceKeys.lists(),
        queryFn: async () => {
            const response = await api.workspace.getWorkspaces();
            return response.responseObject;
        },
    });
};

export const useWorkspace = (id: string | undefined) => {
    return useQuery({
        queryKey: workspaceKeys.detail(id!),
        queryFn: async () => {
            const response = await api.workspace.getWorkspaceById(id!);
            return response.responseObject;
        },
        enabled: !!id,
    });
};

export const useWorkspaceBoards = (id: string | undefined) => {
    return useQuery({
        queryKey: [...workspaceKeys.detail(id || ''), 'boards'], // TODO: Define strict key in query-keys.ts
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
            const response = await api.workspace.getWorkspaceMembers(workspaceId);
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
