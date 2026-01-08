import { useContext } from 'react';
import { WorkspaceContext } from '../shared/context';
import { BoardCard } from '@/features/dashboard/ui/board-card';
import { Button } from '@/shared/components/ui/button';
import { Plus, Kanban } from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';

interface WorkspaceDisplayProps {
    setIsCreateBoardOpen: (value: boolean) => void;
}

export default function WorkspaceDisplay({ setIsCreateBoardOpen }: WorkspaceDisplayProps) {
    const { boards, viewMode } = useContext(WorkspaceContext);

    if (boards.length === 0) {
        return (
            <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-8">
                    <Kanban className="h-8 w-8 text-muted-foreground mb-2" />
                    <h4 className="text-sm font-medium mb-1">
                        No boards found
                    </h4>
                    <p className="text-xs text-muted-foreground text-center mb-3">
                        Create your first board or try a different search
                    </p>
                    <Button
                        size="sm"
                        onClick={() => setIsCreateBoardOpen(true)}
                    >
                        <Plus className="mr-2 h-3 w-3" />
                        Create Board
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const CreateBoardTile = () => (
        <div
            className="group relative flex h-[100px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50 transition-all cursor-pointer"
            onClick={() => setIsCreateBoardOpen(true)}
            role="button"
            tabIndex={0}
        >
            <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-foreground">
                <Plus className="h-6 w-6" />
                <p className="font-medium text-sm">Create Board</p>
            </div>
        </div>
    );

    return (
        <div className={viewMode === 'grid'
            ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "flex flex-col gap-4"
        }>
            {boards.map((board) => (
                <BoardCard key={board.id} board={board} />
            ))}
            <CreateBoardTile />
        </div>
    );
}