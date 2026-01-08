
import { BoardVisibility, BoardStatus } from "@/shared/lib/types";
import type { Board, BoardMember } from "@/shared/lib/types";

export { BoardVisibility, BoardStatus };
export type { Board, BoardMember };

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