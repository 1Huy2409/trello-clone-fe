export interface Card {
    id: string;
    title: string;
    description: string;
    cardMembers: CardMember[];
    position: string;
    coverUrl: string;
    priority: string;
    dueDate: string;
    boardId: string;
    listId: string;
}
export interface CreateCard {
    title: string;
    description: string;
    coverUrl: string;
    priority: string;
    dueDate: string;
}
export interface UpdateCard {
    title?: string;
    description?: string;
    coverUrl?: string;
    priority?: string;
    dueDate?: string;
}
export interface MoveCard {
    cardId: string;
    targetBoardId: string;
    targetListId: string;
    beforeCardId: string;
    afterCardId: string;
}
export interface CopyCard extends CreateCard {
    title: string;
}
export interface ReorderCard {
    cardId: string;
    targetListId: string;
    beforeCardId: string;
    afterCardId: string;
}

export interface CardMember {
    id: string;
    userId: string;
    fullname: string;
    avatarUrl: string;
    cardId: string;
}
export interface AssignMember {
    userId: string;
}
export interface removeMember {
    userId: string;
}
