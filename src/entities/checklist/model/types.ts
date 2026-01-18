export interface Checklist {
    id: string;
    name: string;
    cardId: string;
    position: string;
}
export interface CreateChecklist {
    name: string;
}
export interface UpdateChecklist {
    name: string;
}
export interface ReorderChecklist {
    beforeChecklistId: string;
    afterChecklistId: string;
}
export interface CopyChecklist {
    cardId: string;
    name: string;
}

export interface ChecklistItem {
    id: string;
    content: string;
    isCompleted: boolean;
    position: string;
    checklistId: string;
}
export interface CreateChecklistItem {
    content: string;
}
export interface UpdateItemContent {
    content?: string;
}
export interface UpdateItemStatus {
    isCompleted?: boolean;
}
