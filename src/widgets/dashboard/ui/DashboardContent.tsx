import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useWorkspaces } from "@/entities/workspace/api/use-workspaces";
import { useBoardsByWorkspace, useBoardById } from "@/entities/board/api/use-boards";
import type { Workspace } from "@/entities/workspace";
import type { Board } from "@/entities/board";
import { PageLoader } from "@/shared/components/ui/page-loader";

// Entities
import { WorkspaceCard } from "@/entities/workspace/ui/WorkspaceCard";
import { BoardCard } from "@/entities/board/ui/BoardCard";

// Features
import { CreateBoardDialog } from "@/features/board/ui/CreateBoardDialog";
import { CreateWorkspaceDialog } from "@/features/workspace/ui/CreateWorkspaceDialog";
import { EditBoardDialog } from "@/features/board/ui/EditBoardDialog";
import { DeleteBoardAlertDialog } from "@/features/board/ui/DeleteBoardAlertDialog";

// Shared Context
import { SetIsEditDialogOpenContext, SetSelectedBoardIdContext } from "@/features/dashboard/shared/context";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";


export function DashboardContent() {
    const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
    const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedWorkspaceForBoard, setSelectedWorkspaceForBoard] = useState<string | null>(null);
    const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
    const [boardToDelete, setBoardToDelete] = useState<string | null>(null);

    const { data: workspaces = [], isLoading: isLoadingWorkspaces } = useWorkspaces();

    if (isLoadingWorkspaces) {
        return <PageLoader />;
    }

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">Manage your workspaces and boards</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={() => setIsCreateWorkspaceOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Workspace
                    </Button>
                </div>
            </div>

            {workspaces.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold">No workspaces yet</h3>
                        <p className="text-muted-foreground">Create your first workspace to get started</p>
                    </div>
                    <Button onClick={() => setIsCreateWorkspaceOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Workspace
                    </Button>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Context Providers currently needed for BoardCard actions which are injected below */}
                    <SetIsEditDialogOpenContext.Provider value={setIsEditDialogOpen}>
                        <SetSelectedBoardIdContext.Provider value={setSelectedBoardId}>
                            {workspaces.map((workspace: Workspace) => (
                                <DashboardWorkspaceItem
                                    key={workspace.id}
                                    workspace={workspace}
                                    onAddBoard={() => {
                                        setSelectedWorkspaceForBoard(workspace.id);
                                        setIsCreateBoardOpen(true);
                                    }}
                                    setSelectedBoardId={setSelectedBoardId}
                                    setIsEditDialogOpen={setIsEditDialogOpen}
                                    setBoardToDelete={setBoardToDelete}
                                />
                            ))}
                        </SetSelectedBoardIdContext.Provider>
                    </SetIsEditDialogOpenContext.Provider>
                </div>
            )}

            {/* Dialogs */}
            {selectedBoardId && (
                <EditBoardContainer
                    boardId={selectedBoardId}
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                />
            )}

            <CreateBoardDialog
                open={isCreateBoardOpen}
                onOpenChange={(open) => {
                    setIsCreateBoardOpen(open);
                    if (!open) setSelectedWorkspaceForBoard(null);
                }}
                workspaceId={selectedWorkspaceForBoard}
            />

            <CreateWorkspaceDialog
                open={isCreateWorkspaceOpen}
                onOpenChange={setIsCreateWorkspaceOpen}
            />

            <DeleteBoardAlertDialog
                open={!!boardToDelete}
                onOpenChange={(open) => !open && setBoardToDelete(null)}
                boardId={boardToDelete}
            />
        </div>
    );
}

function EditBoardContainer({ boardId, open, onOpenChange }: { boardId: string, open: boolean, onOpenChange: (open: boolean) => void }) {
    const { data: board } = useBoardById(boardId);

    if (!board) return null; // Or loader

    return (
        <EditBoardDialog
            board={board}
            open={open}
            onOpenChange={onOpenChange}
        />
    );
}

// Sub-component to handle per-workspace data fetching
function DashboardWorkspaceItem({
    workspace,
    onAddBoard,
    setSelectedBoardId,
    setIsEditDialogOpen,
    setBoardToDelete
}: {
    workspace: Workspace;
    onAddBoard: () => void;
    setSelectedBoardId: (id: string) => void;
    setIsEditDialogOpen: (open: boolean) => void;
    setBoardToDelete: (id: string) => void;
}) {
    const { data: boards = [] } = useBoardsByWorkspace(workspace.id);

    return (
        <WorkspaceCard
            workspace={workspace}
            boardCount={boards.length}
            onCreateBoard={onAddBoard}
            action={
                boards.length > 0 ? (
                    <Button variant="outline" onClick={onAddBoard}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Board
                    </Button>
                ) : null
            }
        >
            {boards.map((board: Board) => (
                <BoardCard
                    key={board.id}
                    board={board}
                    actions={
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedBoardId(board.id);
                                        setIsEditDialogOpen(true);
                                    }}
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Board
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setBoardToDelete(board.id);
                                    }}
                                    className="text-destructive focus:text-destructive"
                                >
                                    <Trash className="w-4 h-4 mr-2" />
                                    Delete Board
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                />
            ))}
        </WorkspaceCard>
    );
}

