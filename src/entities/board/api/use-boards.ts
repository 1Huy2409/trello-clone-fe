import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { boardKeys } from "./query-keys";
import { api } from "@/shared/api";
import type { UpdateBoard, Board } from "@/shared/lib/types";
import { workspaceKeys } from "@/entities/workspace/api/query-keys";

export const useBoardsByWorkspace = (workspaceId: string) => {
    return useQuery({
        queryKey: boardKeys.byWorkspace(workspaceId),
        queryFn: async () => {
            const response = await api.board.getBoardsByWorkspaceId<Board[]>(workspaceId);
            return response.responseObject;
        },
        enabled: !!workspaceId,
    });
};

export const useBoardById = (boardId: string) => {
    return useQuery({
        queryKey: boardKeys.detail(boardId),
        queryFn: async () => {
            const response = await api.board.getBoardById<Board>(boardId);
            return response.responseObject;
        },
        enabled: !!boardId,
    });
};

export const useUpdateBoard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateBoard }) => {
            const response = await api.board.updateBoard(id, data);
            return response.responseObject;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: boardKeys.detail(data.id) });
            queryClient.invalidateQueries({ queryKey: boardKeys.all }); // Invalidate list queries
        },
    });
};

export const useDeleteBoard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (boardId: string) => {
            const response = await api.board.deleteBoard(boardId);
            return response.responseObject;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: boardKeys.all });
            // Also invalidate workspace boards if we can infer the workspace ID, 
            // but broad invalidation of 'boards' keys should cover it.
            // Or better, invalidate all workspace boards queries.
            queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
        },
    });
};

