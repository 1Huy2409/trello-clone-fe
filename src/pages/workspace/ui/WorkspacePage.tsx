import { useParams } from "react-router";
import { useCommonStore } from "@/shared/stores/commonStore";
import { WorkspaceProvider } from "@/features/workspace/shared/workspace-context";
import { useState } from "react";
import WorkspaceDisplay from "@/features/workspace/ui/workspace-display";
import { CreateBoardDialog } from "@/features/dashboard/ui/create-board-dialog";
import SearchInput from "@/features/workspace/ui/search-input";
import { EditBoardDialog } from "@/features/dashboard/ui/edit-board-dialog";
import { SetIsEditDialogOpenContext, SetSelectedBoardIdContext } from "@/features/dashboard/shared/context";

export default function WorkspacePage() {
    const { id } = useParams<{ id: string }>();
    const { boards, workspaces } = useCommonStore();
    const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

    const selectedBoard =
        boards.find((board) => board.id === selectedBoardId) || null;


    const currentWorkspace = Object.values(workspaces).find((workspace) => workspace.id === id);
    const workspaceBoards = boards.filter((board) => board.workspaceId === id);
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
        <WorkspaceProvider>
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
                        <WorkspaceDisplay
                            setIsCreateBoardOpen={setIsCreateBoardOpen}
                        />
                    </SetSelectedBoardIdContext.Provider>
                </SetIsEditDialogOpenContext.Provider>
                <EditBoardDialog board={selectedBoard} open={isEditDialogOpen} onOpenChange={
                    (value) => setIsEditDialogOpen(value)
                } />
                {/* Create Board Dialog */}
                <CreateBoardDialog
                    open={isCreateBoardOpen}
                    onOpenChange={setIsCreateBoardOpen}
                    workspaceId={id}
                />
            </div>
        </WorkspaceProvider>
    )
}