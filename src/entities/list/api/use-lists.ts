import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listKeys } from "./query-keys";
import { listApi } from "./list-api";
import { boardApi } from "@/entities/board/api/board-api";
import type { List, CreateList, UpdateList, ReorderList, CopyList, MoveList } from "../model/types";

export const useListsByBoard = (boardId: string) => {
    return useQuery({
        queryKey: listKeys.byBoard(boardId),
        queryFn: async () => {
            // This API call is technically on the board controller usually, but returns Lists
            const response = await boardApi.getBoardLists<List[]>(boardId);
            return response.responseObject;
        },
        enabled: !!boardId,
    });
};

export const useCreateList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ boardId, data }: { boardId: string; data: CreateList }) => {
            return listApi.createList(boardId, data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: listKeys.byBoard(variables.boardId) });
        },
    });
};

export const useUpdateList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ listId, data }: { listId: string; data: UpdateList }) => {
            return listApi.editListName(listId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: listKeys.all });
        },
    });
};

export const useReorderList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: ReorderList) => {
            return listApi.reorderList(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: listKeys.all });
        },
    });
};

export const useCopyList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CopyList) => {
            return listApi.copyList(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: listKeys.all });
        },
    });
};

export const useMoveList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: MoveList) => {
            return listApi.moveList(data);
        },
        onSuccess: () => {
            // Invalidate all list queries to ensure both source and target boards are updated
            queryClient.invalidateQueries({ queryKey: listKeys.all });
        },
    });
};

export const useArchiveList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (listId: string) => {
            return listApi.archiveList(listId);
        },
        onSuccess: () => {
            // Invalidate all list queries to ensure the archived list is removed from the board
            queryClient.invalidateQueries({ queryKey: listKeys.all });
        },
    });
};

export const useArchivedLists = (boardId: string) => {
    return useQuery({
        queryKey: [...listKeys.byBoard(boardId), 'archived'],
        queryFn: async () => {
            const response = await listApi.getArchiveLists<List[]>(boardId);
            return response.responseObject;
        },
        enabled: !!boardId,
    });
};

export const useReopenList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (listId: string) => {
            return listApi.reopenList(listId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: listKeys.all });
        },
    });
};
