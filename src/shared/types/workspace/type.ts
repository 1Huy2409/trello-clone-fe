export const WorkspaceStatus = {
    ACTIVE: 'active',
    ARCHIVED: 'archived',
} as const;
export type WorkspaceStatus = (typeof WorkspaceStatus)[keyof typeof WorkspaceStatus];

export interface Workspace {
    id: string;
    title: string;
    description: string;
    visibility: boolean;
    status: WorkspaceStatus;
    createdAt: string;
    updatedAt: string;
}

export interface WorkspaceMember {
    id: string;
    userId: string;
    fullname: string;
    workspaceId: string;
    roleName: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateWorkspace {
    title: string;
    description: string;
    visibility?: boolean;
}
export interface UpdateWorkspace {
    title?: string;
    description?: string;
    visibility?: boolean;
}
export interface AddWorkspaceMember {
    userId: string;
    roleId: string;
}
export interface UpdateWorkspaceMember {
    roleId: string;
}
export interface CreateWorkspaceRole {
    name: string;
    description: string;
    permissions: string[];
}
export interface UpdateWorkspaceRole {
    name?: string;
    description?: string;
    permissions?: string[];
}
