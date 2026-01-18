
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import type { CreateChecklistItem, UpdateItemContent, UpdateItemStatus } from "@/shared/types/checklist/type";

export const checklistItemKeys = {
    all: ['checklistItems'] as const,
    byChecklist: (checklistId: string) => [...checklistItemKeys.all, 'checklist', checklistId] as const,
};

export const useChecklistItems = (checklistId: string) => {
    return useQuery({
        queryKey: checklistItemKeys.byChecklist(checklistId),
        queryFn: async () => {
            const res = await api.checklistItem.getChecklistItems<import("@/shared/types/checklist/type").ChecklistItem[]>(checklistId);
            return res.responseObject;
        },
        enabled: !!checklistId,
    });
};

export const useCreateChecklistItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ checklistId, data }: { checklistId: string; data: CreateChecklistItem }) => {
            return api.checklistItem.createChecklistItem(checklistId, data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: checklistItemKeys.byChecklist(variables.checklistId) });
        },
    });
};

export const useUpdateChecklistItemStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ itemId, data }: { itemId: string; data: UpdateItemStatus }) => {
            return api.checklistItem.updateStatus(itemId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: checklistItemKeys.all });
        },
    });
};

export const useUpdateChecklistItemContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ itemId, data }: { itemId: string; data: UpdateItemContent }) => {
            return api.checklistItem.updateContent(itemId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: checklistItemKeys.all });
        },
    });
};

export const useDeleteChecklistItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (itemId: string) => {
            return api.checklistItem.delete(itemId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: checklistItemKeys.all });
        },
    });
};
