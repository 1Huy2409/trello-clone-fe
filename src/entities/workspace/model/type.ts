
import { WorkspaceStatus } from "@/shared/lib/types";
import type { Workspace } from "@/shared/lib/types";

// workspace
export { WorkspaceStatus };
export type { Workspace };

export interface CreateWorkspace {
    title: string;
    description?: string;
    visibility?: boolean;
}
export interface UpdateWorkspace {
    title?: string;
    description?: string;
    visibility?: boolean;
}

// workspace member
export interface WorkspaceMember {
    id: string;
    userId: string;
    fullname: string;
    workspaceId: string;
    roleName: string;
    createdAt: string;
    updatedAt: string;
}
export interface UpdateWorkspaceMemberRole {
    roleId: string;
}