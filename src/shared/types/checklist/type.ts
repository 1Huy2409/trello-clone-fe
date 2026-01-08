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