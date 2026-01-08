import { useMemo, useState } from "react";
import type { SortOption, ViewMode } from "./types";
import { useParams } from "react-router";
import { useCommonStore } from "@/shared/stores/commonStore";
import { WorkspaceContext, WorkspaceDisplayContext } from "./context";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("recent");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    const { id } = useParams<{ id: string }>();
    const { boards } = useCommonStore();

    const workspaceBoards = boards.filter(
        (board) => board.workspaceId === id
    );
    const filteredAndSortedBoards = useMemo(() => {
        const filtered = workspaceBoards.filter(
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
    }, [workspaceBoards, searchQuery, sortBy]);
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