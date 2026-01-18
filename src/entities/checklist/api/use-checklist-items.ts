
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checklistItemApi } from "./checklist-api";
import type { CreateChecklistItem, UpdateItemContent, UpdateItemStatus, ChecklistItem } from "../model/types";

export const checklistItemKeys = {
    all: ['checklistItems'] as const,
    byChecklist: (checklistId: string) => [...checklistItemKeys.all, 'checklist', checklistId] as const,
};

export const useChecklistItems = (checklistId: string) => {
    return useQuery({
        queryKey: checklistItemKeys.byChecklist(checklistId),
        queryFn: async () => {
            const res = await checklistItemApi.getChecklistItems<ChecklistItem[]>(checklistId);
            return res.responseObject;
        },
        enabled: !!checklistId,
    });
};

export const useCreateChecklistItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ checklistId, data }: { checklistId: string; data: CreateChecklistItem }) => {
            return checklistItemApi.createChecklistItem(checklistId, data);
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
            return checklistItemApi.updateStatus(itemId, data);
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
            return checklistItemApi.updateContent(itemId, data);
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
            return checklistItemApi.delete(itemId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: checklistItemKeys.all });
        },
    });
};

