
import { BoardVisibility, BoardStatus } from "@/shared/lib/types";
import type { Board } from "@/shared/lib/types";

export { BoardVisibility, BoardStatus };
export type { Board };

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