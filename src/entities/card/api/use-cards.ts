import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cardKeys } from "./query-keys";
import { api } from "@/shared/api";
import type { Card } from "@/shared/lib/types";

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
