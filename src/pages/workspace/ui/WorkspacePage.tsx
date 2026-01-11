import { useParams } from "react-router";
import { useWorkspace, useWorkspaceBoards } from "@/entities/workspace/api/use-workspaces";
import { WorkspaceProvider } from "@/features/workspace/shared/workspace-context";
import { useState } from "react";
import type { Board } from "@/shared/lib/types";
// Widgets & Features
import { WorkspaceBoardList } from "@/widgets/workspace/ui/WorkspaceBoardList";
import SearchInput from "@/features/workspace/ui/SearchInput";
import { CreateBoardDialog } from "@/features/board/ui/CreateBoardDialog";
import { EditBoardDialog } from "@/features/board/ui/EditBoardDialog";
// Context
import { SetIsEditDialogOpenContext, SetSelectedBoardIdContext } from "@/features/dashboard/shared/context";
import { PageLoader } from "@/shared/components/ui/page-loader";

export default function WorkspacePage() {
    const { id } = useParams<{ id: string }>();
    const { data: currentWorkspace, isLoading: isLoadingWorkspace } = useWorkspace(id);
    const { data: workspaceBoards = [], isLoading: isLoadingBoards } = useWorkspaceBoards(id);

    const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

    const selectedBoard =
        workspaceBoards.find((board: Board) => board.id === selectedBoardId) || null;

    if (isLoadingWorkspace || isLoadingBoards) {
        return <PageLoader />;
    }

    if (!currentWorkspace) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Workspace not found
                    </h2>
                    <p className="text-gray-600">
                        The workspace you're looking for doesn't exist.
                    </p>
                </div>
            </div>
        );
    }
    return (
        <WorkspaceProvider boards={workspaceBoards}>
            <div className="flex-1 space-y-6 p-8 pt-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {currentWorkspace.title}
                    </h1>
                    {currentWorkspace.description && (
                        <p className="text-muted-foreground">
                            {currentWorkspace.description}
                        </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                        {workspaceBoards.length} board
                        {workspaceBoards.length !== 1 ? "s" : ""} total
                    </p>
                </div>
                <SearchInput />
                <SetIsEditDialogOpenContext.Provider value={setIsEditDialogOpen}>
                    <SetSelectedBoardIdContext.Provider value={setSelectedBoardId}>
                        <WorkspaceBoardList
                            setIsCreateBoardOpen={setIsCreateBoardOpen}
                        />
                    </SetSelectedBoardIdContext.Provider>
                </SetIsEditDialogOpenContext.Provider>
                <EditBoardDialog board={selectedBoard} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
                {/* Create Board Dialog */}
                <CreateBoardDialog
                    open={isCreateBoardOpen}
                    onOpenChange={setIsCreateBoardOpen}
                    workspaceId={id!}
                />
            </div>
        </WorkspaceProvider>
    )
}
