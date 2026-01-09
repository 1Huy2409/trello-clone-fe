import type { Board } from "@/entities/board";
import type { SortOption, ViewMode } from "./types";
import { createContext } from "react";

export type WorkspaceContextType = {
    searchQuery: string;
    sortBy: SortOption;
    viewMode: ViewMode;
    boards: Board[]
};

export type WorkspaceDisplayContextType = {
    setSearchQuery: (query: string) => void;
    setSortBy: (option: SortOption) => void;
    setViewMode: (mode: ViewMode) => void;
};

export const WorkspaceContext = createContext<WorkspaceContextType>({
    searchQuery: '',
    sortBy: 'az',
    viewMode: 'grid',
    boards: [],
});
export const WorkspaceDisplayContext = createContext<WorkspaceDisplayContextType>({
    setSearchQuery: () => { },
    setSortBy: () => { },
    setViewMode: () => { },
});