export interface List {
    id: string;
    title: string;
    position: string;
    isArchived: boolean;
    boardId: string;
}
export interface CreateList {
    title: string;
}
export interface UpdateList {
    title?: string;
}
export interface ReorderList {
    listId: string;
    beforeListId: string;
    afterListId: string;
}
export interface MoveList {
    listId: string;
    targetBoardId: string;
    beforeListId: string;
    afterListId: string;
}
export interface CopyList {
    listId: string;
    targetBoardId?: string;
    title?: string;
}