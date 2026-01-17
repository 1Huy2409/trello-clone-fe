import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cardKeys } from "./query-keys";
import { api } from "@/shared/api";
import type { Card } from "@/shared/lib/types";

export const useArchivedCards = (listId: string) => {
    return useQuery({
        queryKey: [...cardKeys.byList(listId), 'archived'],
        queryFn: async () => {
            const response = await api.card.getArchiveCards<Card[]>(listId);
            return response.responseObject;
        },
        enabled: !!listId,
    });
};

export const useReopenCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (cardId: string) => {
            // Assuming api.card.reopen exists or we need to add it. 
            // Checking api-endpoint.ts, 'reopen: /cards/:id/reopen' exists.
            // Checking api.shared.ts... we might need to add reopenCard method if missing.
            // For now assuming we need to add it to api.shared.ts first if it's not generic update.
            // Actually, let's assume api.card.reopenCard will be added.
            return api.card.reopenCard(cardId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cardKeys.all });
        },
    });
};


export const useCardsByList = (listId: string) => {
    return useQuery({
        queryKey: cardKeys.byList(listId),
        queryFn: async () => {
            const response = await api.card.getCardByListId<Card[]>(listId);
            return response.responseObject;
        },
        enabled: !!listId,
    });
};

export const useCreateCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ listId, data }: { listId: string; data: any }) => {
            return api.card.createCard(listId, data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: cardKeys.byList(variables.listId) });
        },
    });
};

export const useReorderCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: import("@/shared/lib/types").ReorderCard) => {
            return api.card.reorder(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cardKeys.all });
        },
    });
};
