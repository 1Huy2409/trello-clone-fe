
export interface User {
    id: string;
    email: string;
    fullname: string;
    avatarUrl: string;
    description: string;
    isActive: boolean;
}

// --- Status & Enums ---
export const WorkspaceStatus = {
    ACTIVE: 'active',
    ARCHIVED: 'archived',
} as const;
export type WorkspaceStatus = (typeof WorkspaceStatus)[keyof typeof WorkspaceStatus];

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


// --- Interfaces ---

export interface Workspace {
    id: string;
    title: string;
    description: string;
    visibility: boolean;
    status: WorkspaceStatus;
    createdAt: string;
    updatedAt: string;
}

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