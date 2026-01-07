
import { create } from 'zustand';
import { WorkspaceStatus, BoardVisibility, BoardStatus } from "../lib/types";
import type { User, Workspace, Board } from "../lib/types";

interface CommonStore {
    workspaces: Workspace[];
    boards: Board[];
    currentUser: User | null;
}

export const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    fullname: 'Test User',
    avatarUrl: 'https://github.com/shadcn.png',
    description: 'Short bio or about me',
    isActive: true,
};

const mockWorkspaces: Workspace[] = [
    {
        id: 'ws-1',
        title: 'Trello Workspace',
        description: 'Main workspace for Trello Clone project',
        visibility: true,
        status: WorkspaceStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'ws-2',
        title: 'Personal Workspace',
        description: 'My personal projects',
        visibility: false,
        status: WorkspaceStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

const mockBoards: Board[] = [
    {
        id: 'b-1',
        title: 'Project Alpha',
        description: 'Trello Clone Frontend',
        coverUrl: 'https://images.unsplash.com/photo-1736890730626-d6216a70a84d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        visibility: BoardVisibility.WORKSPACE,
        ownerId: '1',
        status: BoardStatus.ACTIVE,
        workspaceId: 'ws-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'b-2',
        title: 'Project Beta',
        description: 'Backend API Development',
        coverUrl: 'https://images.unsplash.com/photo-1736890730626-d6216a70a84d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        visibility: BoardVisibility.PRIVATE,
        ownerId: '1',
        status: BoardStatus.ACTIVE,
        workspaceId: 'ws-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'b-3',
        title: 'Ideas',
        description: 'Random ideas',
        coverUrl: 'https://images.unsplash.com/photo-1736890730626-d6216a70a84d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        visibility: BoardVisibility.PUBLIC,
        ownerId: '1',
        status: BoardStatus.ACTIVE,
        workspaceId: 'ws-2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

export const useCommonStore = create<CommonStore>((set) => ({
    currentUser: mockUser,
    workspaces: mockWorkspaces,
    boards: mockBoards,
}));