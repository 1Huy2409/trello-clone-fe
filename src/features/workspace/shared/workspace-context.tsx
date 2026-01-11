import { useMemo, useState } from "react";
import type { SortOption, ViewMode } from "./types";
import { WorkspaceContext, WorkspaceDisplayContext } from "./context";
import type { Board } from "@/shared/lib/types";

interface WorkspaceProviderProps {
    children: React.ReactNode;
    boards: Board[];
}

export function WorkspaceProvider({ children, boards }: WorkspaceProviderProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("recent");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    const filteredAndSortedBoards = useMemo(() => {
        const filtered = boards.filter(
            (board) =>
                board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                board.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );

        switch (sortBy) {
            case "az":
                return filtered.sort((a, b) => a.title.localeCompare(b.title));
            case "za":
                return filtered.sort((a, b) => b.title.localeCompare(a.title));
            case "recent":
                return filtered.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
            case "oldest":
                return filtered.sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                );
            default:
                return filtered;
        }
    }, [boards, searchQuery, sortBy]);

    const state = useMemo(() => ({
        searchQuery,
        sortBy,
        viewMode,
        boards: filteredAndSortedBoards,
    }), [searchQuery, sortBy, viewMode, filteredAndSortedBoards])

    const dispatch = useMemo(() => ({
        setSearchQuery,
        setSortBy,
        setViewMode,
    }), [setSearchQuery, setSortBy, setViewMode])

    return (
        <WorkspaceContext.Provider value={state}>
            <WorkspaceDisplayContext.Provider value={dispatch}>
                {children}
            </WorkspaceDisplayContext.Provider>
        </WorkspaceContext.Provider>
    )
}