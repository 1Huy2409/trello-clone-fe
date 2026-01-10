import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useCommonStore } from "@/shared/stores/commonStore";

// Entities
import { WorkspaceCard } from "@/entities/workspace/ui/WorkspaceCard";
import { BoardCard } from "@/entities/board/ui/BoardCard";

// Features
import { CreateBoardDialog } from "@/features/board/ui/CreateBoardDialog";
import { CreateWorkspaceDialog } from "@/features/workspace/ui/CreateWorkspaceDialog";
import { EditBoardDialog } from "@/features/board/ui/EditBoardDialog";

// Shared Context (keeping this as is for now, though it should probably be prop drilled or local state in widget)
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

    const { boards, workspaces } = useCommonStore();
    const allWorkspaces = Object.values(workspaces);

    const getWorkspaceBoards = (workspaceId: string) =>
        boards.filter((board) => board.workspaceId === workspaceId);

    const selectedBoard = boards.find((board) => board.id === selectedBoardId) || null;

    const handleDeleteBoard = (boardId: string) => {
        alert('Delete board with ID: ' + boardId);
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

            {allWorkspaces.length === 0 ? (
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
                            {allWorkspaces.map((workspace) => {
                                const workspaceBoards = getWorkspaceBoards(workspace.id);

                                return (
                                    <WorkspaceCard
                                        key={workspace.id}
                                        workspace={workspace}
                                        boardCount={workspaceBoards.length}
                                        onCreateBoard={() => {
                                            setSelectedWorkspaceForBoard(workspace.id);
                                            setIsCreateBoardOpen(true);
                                        }}
                                        action={
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedWorkspaceForBoard(workspace.id);
                                                    setIsCreateBoardOpen(true);
                                                }}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Board
                                            </Button>
                                        }
                                    >
                                        {workspaceBoards.map((board) => (
                                            <BoardCard
                                                key={board.id}
                                                board={board}
                                                actions={
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                onClick={(e) => {
                                                                    e.preventDefault(); // Prevent navigation
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
                                                                    handleDeleteBoard(board.id);
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
                            })}
                        </SetSelectedBoardIdContext.Provider>
                    </SetIsEditDialogOpenContext.Provider>
                </div>
            )}

            <EditBoardDialog
                board={selectedBoard}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
            />

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
        </div>
    );
}
