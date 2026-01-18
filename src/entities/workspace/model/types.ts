import type { Permission } from "@/entities/permission/model/types";

export const WorkspaceStatus = {
    ACTIVE: 'active',
    ARCHIVED: 'archived',
} as const;
export type WorkspaceStatus = (typeof WorkspaceStatus)[keyof typeof WorkspaceStatus];
export const RoleScope = {
    GLOBAL: 'global',
    WORKSPACE: 'workspace',
    BOARD: 'board'
} as const;
export type RoleScope = (typeof RoleScope)[keyof typeof RoleScope];

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
export const WorkspacePermission = {
    MANAGE_WORKSPACE: 'manage_workspace',
    MANAGE_MEMBERS: 'manage_members',
    MANAGE_ROLES: 'manage_roles',
    CREATE_BOARD: 'create_board',
    MANAGE_BOARD: 'manage_board',
} as const;

export type WorkspacePermission = (typeof WorkspacePermission)[keyof typeof WorkspacePermission];

export interface WorkspaceRole {
    id: string;
    name: string;
    scope: RoleScope;
    description: string;
    isSystemRole: boolean;
    permissions: Permission[];
    workspaceId: string;
}

export interface PermissionDefinition {
    id: string;
    action: string;
    description: string;
    isSystem: boolean;
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
