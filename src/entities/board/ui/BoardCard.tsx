import type { Board } from "@/shared/lib/types";
import { Link } from "react-router";
import { Kanban, Users } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { useCommonStore } from "@/shared/stores/commonStore";

interface BoardCardProps {
    board: Board;
    actions?: React.ReactNode;
}

export function BoardCard({ board, actions }: BoardCardProps) {
    const { lists, boardMembers } = useCommonStore();
    const boardLists = lists.filter((list) => list.boardId === board.id);
    const membersEachBoard = boardMembers.filter((member) => member.boardId === board.id);

    return (
        <Card className="cursor-pointer hover:shadow-md transition-shadow group relative">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                {actions}
            </div>

            <Link to={`/board/${board.id}`}>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 pr-8">
                        <Kanban className="h-4 w-4" />
                        {board.title}
                    </CardTitle>
                    {board.description && (
                        <CardDescription className="text-sm">
                            {board.description}
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{boardLists.length} lists</span>
                        <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{membersEachBoard.length}</span>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
}
