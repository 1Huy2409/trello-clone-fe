
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checklistApi } from "./checklist-api";
import type { CreateChecklist, UpdateChecklist, Checklist } from "../model/types";

export const checklistKeys = {
    all: ['checklists'] as const,
    byCard: (cardId: string) => [...checklistKeys.all, 'card', cardId] as const,
};

export const useChecklistsByCard = (cardId: string) => {
    return useQuery({
        queryKey: checklistKeys.byCard(cardId),
        queryFn: async () => {
            const res = await checklistApi.getChecklistsByCardId<Checklist[]>(cardId);
            return res.responseObject;
        },
        enabled: !!cardId,
    });
};

export const useCreateChecklist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ cardId, data }: { cardId: string; data: CreateChecklist }) => {
            return checklistApi.createChecklist(cardId, data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: checklistKeys.byCard(variables.cardId) });
        },
    });
};

export const useUpdateChecklist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ checklistId, data }: { checklistId: string; data: UpdateChecklist }) => {
            return checklistApi.updateChecklist(checklistId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: checklistKeys.all });
        },
    });
};

export const useDeleteChecklist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (checklistId: string) => {
            return checklistApi.deleteChecklist(checklistId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: checklistKeys.all });
        },
    });
};

