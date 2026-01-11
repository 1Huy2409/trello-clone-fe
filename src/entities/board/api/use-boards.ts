import { useQuery } from "@tanstack/react-query";
import { boardKeys } from "./query-keys";
import { api } from "@/shared/api";

export const useBoardsByWorkspace = (workspaceId: string) => {
    return useQuery({
        queryKey: boardKeys.byWorkspace(workspaceId),
        queryFn: async () => {
            const response = await api.board.getBoardsByWorkspaceId(workspaceId);
            return response.responseObject;
        },
        enabled: !!workspaceId,
    });
};

export const useBoardById = (boardId: string) => {
    return useQuery({
        queryKey: boardKeys.detail(boardId),
        queryFn: async () => {
            // TODO: Add getBoardById to api.shared and use it here
            return null;
        },
        enabled: !!boardId,
    });
};

