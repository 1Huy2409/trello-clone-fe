import type { Workspace } from "@/shared/lib/types";
import { Kanban, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

interface WorkspaceCardProps {
    workspace: Workspace;
    boardCount: number;
    action?: React.ReactNode;
    children?: React.ReactNode;
    onCreateBoard?: () => void;
}

export function WorkspaceCard({
    workspace,
    boardCount,
    action,
    children, // This will be the grid of BoardCards
    onCreateBoard
}: WorkspaceCardProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Link to={`/workspace/${workspace.id}`}>
                        <h3 className="text-xl font-semibold flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Kanban className="w-4 h-4 text-white" />
                            </div>
                            {workspace.title}
                        </h3>
                    </Link>
                    {workspace.description && (
                        <p className="text-sm text-muted-foreground">
                            {workspace.description}
                        </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                        {boardCount} board
                        {boardCount !== 1 ? "s" : ""}
                    </p>
                </div>
                {action}
            </div>

            {boardCount === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-8">
                        <Kanban className="h-8 w-8 text-muted-foreground mb-2" />
                        <h4 className="text-sm font-medium mb-1">
                            No boards in this workspace
                        </h4>
                        <p className="text-xs text-muted-foreground text-center mb-3">
                            Create your first board to start organizing your
                            projects
                        </p>
                        <Button
                            size="sm"
                            onClick={onCreateBoard}
                        >
                            <Plus className="mr-2 h-3 w-3" />
                            Create Board
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {children}
                </div>
            )}
        </div>
    );
}
