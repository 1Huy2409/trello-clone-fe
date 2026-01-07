export const BoardVisibility = {
    PRIVATE: 'private',
    WORKSPACE: 'workspace',
    PUBLIC: 'public'
} as const;
export type BoardVisibility = (typeof BoardVisibility)[keyof typeof BoardVisibility];

export const BoardStatus = {
    ACTIVE: 'active',
    ARCHIVED: 'archived'
} as const;
export type BoardStatus = (typeof BoardStatus)[keyof typeof BoardStatus];

// board
export interface Board {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
    visibility: BoardVisibility;
    ownerId: string;
    status: BoardStatus;
    workspaceId: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateBoard {
    title: string;
    description?: string;
    coverUrl?: string;
    visibility?: BoardVisibility;
    workspaceId?: string;
}
export interface UpdateBoard {
    title?: string;
    description?: string;
    coverUrl?: string;
    visibility?: BoardVisibility;
}

// board member
export interface BoardMember {
    id: string;
    userId: string;
    boardId: string;
    roleName: string;
    createdAt: string;
    updatedAt: string;
}