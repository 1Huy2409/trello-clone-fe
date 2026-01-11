import { WorkspaceStatus } from "@/shared/lib/types";
import type { Workspace, WorkspaceMember } from "@/shared/lib/types";

// workspace
export { WorkspaceStatus };
export type { Workspace, WorkspaceMember };

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

export interface UpdateWorkspaceMemberRole {
    roleId: string;
}