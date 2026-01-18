import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cardKeys } from "./query-keys";
import { cardApi } from "./card-api";
import type { Card, UpdateCard, ReorderCard, CreateCard } from "../model/types";

export const useArchivedCards = (listId: string) => {
    return useQuery({
        queryKey: [...cardKeys.byList(listId), 'archived'],
        queryFn: async () => {
            const response = await cardApi.getArchiveCards<Card[]>(listId);
            return response.responseObject;
        },
        enabled: !!listId,
    });
};

export const useReopenCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (cardId: string) => {
            return cardApi.reopenCard(cardId);
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
            const response = await cardApi.getCardByListId<Card[]>(listId);
            return response.responseObject;
        },
        enabled: !!listId,
    });
};

export const useCreateCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ listId, data }: { listId: string; data: CreateCard }) => {
            return cardApi.createCard(listId, data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: cardKeys.byList(variables.listId) });
        },
    });
};

export const useReorderCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: ReorderCard) => {
            return cardApi.reorder(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cardKeys.all });
        },
    });
};

export const useUpdateCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateCard }) => {
            return cardApi.updateCard(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cardKeys.all });
        },
    });
};
export const useArchiveCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (cardId: string) => {
            return cardApi.archive(cardId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cardKeys.all });
        },
    });
};

