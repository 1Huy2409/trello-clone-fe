
import { create } from 'zustand';
import { WorkspaceStatus, BoardVisibility, BoardStatus } from "../lib/types";
import type { User, Workspace, Board, WorkspaceMember, BoardMember, List } from "../lib/types";

interface CommonStore {
    workspaces: Workspace[];
    boards: Board[];
    workspaceMembers: WorkspaceMember[];
    boardMembers: BoardMember[];
    lists: List[];
    currentUser: User | null;
}

export const mockUser: User = {
    id: '1',
    email: 'hath@example.com',
    fullname: 'Huy Nguyen',
    avatarUrl: 'https://github.com/shadcn.png',
    description: 'Fullstack Developer',
    isActive: true,
};

const mockWorkspaces: Workspace[] = [
    {
        id: 'ws-1',
        title: 'Trello Clone Team',
        description: 'Engineering team workspace for Trello Clone project',
        visibility: true,
        status: WorkspaceStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'ws-2',
        title: 'Personal Projects',
        description: 'My personal side projects and experiments',
        visibility: false,
        status: WorkspaceStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'ws-3',
        title: 'Marketing',
        description: 'Marketing campaigns and content calendar',
        visibility: true,
        status: WorkspaceStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

const mockWorkspaceMembers: WorkspaceMember[] = [
    {
        id: 'wm-1',
        userId: '1',
        fullname: 'Huy Nguyen',
        workspaceId: 'ws-1',
        roleName: 'owner',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'wm-2',
        userId: '2',
        fullname: 'Alice Johnson',
        workspaceId: 'ws-1',
        roleName: 'member',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'wm-3',
        userId: '1',
        fullname: 'Huy Nguyen',
        workspaceId: 'ws-2',
        roleName: 'owner',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'wm-4',
        userId: '1',
        fullname: 'Huy Nguyen',
        workspaceId: 'ws-3',
        roleName: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'wm-5',
        userId: '3',
        fullname: 'Bob Smith',
        workspaceId: 'ws-3',
        roleName: 'member',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

const mockBoards: Board[] = [
    {
        id: 'b-1',
        title: 'Frontend Development',
        description: 'Tasks related to the React frontend',
        coverUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D',
        visibility: BoardVisibility.WORKSPACE,
        ownerId: '1',
        status: BoardStatus.ACTIVE,
        workspaceId: 'ws-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'b-2',
        title: 'Backend API',
        description: 'Node.js and Database tasks',
        coverUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
        visibility: BoardVisibility.WORKSPACE,
        ownerId: '1',
        status: BoardStatus.ACTIVE,
        workspaceId: 'ws-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'b-3',
        title: 'Home Renovation',
        description: 'Planning for the new house',
        coverUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
        visibility: BoardVisibility.PRIVATE,
        ownerId: '1',
        status: BoardStatus.ACTIVE,
        workspaceId: 'ws-2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'b-4',
        title: 'Reading List 2026',
        description: 'Books to read this year',
        coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D',
        visibility: BoardVisibility.PUBLIC,
        ownerId: '1',
        status: BoardStatus.ACTIVE,
        workspaceId: 'ws-2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'b-5',
        title: 'Q1 Launch',
        description: 'Marketing strategy for Q1',
        coverUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbXdvcmt8ZW58MHx8MHx8fDA%3D',
        visibility: BoardVisibility.WORKSPACE,
        ownerId: '3',
        status: BoardStatus.ACTIVE,
        workspaceId: 'ws-3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

const mockBoardMembers: BoardMember[] = [
    { id: 'bm-1', userId: '1', boardId: 'b-1', roleName: 'owner', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'bm-2', userId: '2', boardId: 'b-1', roleName: 'member', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'bm-3', userId: '1', boardId: 'b-2', roleName: 'owner', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'bm-4', userId: '1', boardId: 'b-3', roleName: 'owner', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'bm-5', userId: '1', boardId: 'b-4', roleName: 'owner', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'bm-6', userId: '3', boardId: 'b-5', roleName: 'owner', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'bm-7', userId: '1', boardId: 'b-5', roleName: 'observer', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const mockLists: List[] = [
    // Board 1: Frontend
    { id: 'l-1', title: 'Backlog', position: '1', isArchived: false, boardId: 'b-1' },
    { id: 'l-2', title: 'In Progress', position: '2', isArchived: false, boardId: 'b-1' },
    { id: 'l-3', title: 'Code Review', position: '3', isArchived: false, boardId: 'b-1' },
    { id: 'l-4', title: 'Done', position: '4', isArchived: false, boardId: 'b-1' },

    // Board 2: Backend
    { id: 'l-5', title: 'API Design', position: '1', isArchived: false, boardId: 'b-2' },
    { id: 'l-6', title: 'Implementation', position: '2', isArchived: false, boardId: 'b-2' },

    // Board 3: Home Reno
    { id: 'l-7', title: 'Ideas', position: '1', isArchived: false, boardId: 'b-3' },
    { id: 'l-8', title: 'Contractors', position: '2', isArchived: false, boardId: 'b-3' },
    { id: 'l-9', title: 'Purchases', position: '3', isArchived: false, boardId: 'b-3' },

    // Board 5: Marketing
    { id: 'l-10', title: 'Social Media', position: '1', isArchived: false, boardId: 'b-5' },
    { id: 'l-11', title: 'Email Campaign', position: '2', isArchived: false, boardId: 'b-5' },
];

export const useCommonStore = create<CommonStore>((set) => ({
    currentUser: mockUser,
    workspaces: mockWorkspaces,
    boards: mockBoards,
    workspaceMembers: mockWorkspaceMembers,
    boardMembers: mockBoardMembers,
    lists: mockLists,
}));