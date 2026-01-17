import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listKeys } from "./query-keys";
import { api } from "@/shared/api";
import type { List, CreateList } from "@/shared/lib/types";

export const useListsByBoard = (boardId: string) => {
    return useQuery({
        queryKey: listKeys.byBoard(boardId),
        queryFn: async () => {
            const response = await api.board.getBoardLists<List[]>(boardId);
            return response.responseObject;
        },
        enabled: !!boardId,
    });
};

export const useCreateList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ boardId, data }: { boardId: string; data: CreateList }) => {
            return api.list.createList(boardId, data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: listKeys.byBoard(variables.boardId) });
        },
    });
};

export const useUpdateList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ listId, data }: { listId: string; data: import("@/shared/lib/types").UpdateList }) => {
            return api.list.editListName(listId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: listKeys.all });
        },
    });
};

export const useReorderList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: import("@/shared/lib/types").ReorderList) => {
            return api.list.reorderList(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: listKeys.all });
        },
    });
};

export const useCopyList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: import("@/shared/lib/types").CopyList) => {
            return api.list.copyList(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: listKeys.all });
        },
    });
};

