import { useParams } from "react-router";
import { useCommonStore } from "@/shared/stores/commonStore";
import { WorkspaceProvider } from "@/features/workspace/shared/workspace-context";
import { useState } from "react";
import WorkspaceDisplay from "@/features/workspace/ui/workspace-display";
import { CreateBoardDialog } from "@/features/dashboard/ui/create-board-dialog";
import SearchInput from "@/features/workspace/ui/search-input";

export default function WorkspacePage() {
    const { id } = useParams<{ id: string }>();
    const { boards, workspaces } = useCommonStore();
    const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);

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
                <WorkspaceDisplay
                    setIsCreateBoardOpen={setIsCreateBoardOpen}
                />

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