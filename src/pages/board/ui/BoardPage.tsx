import { useParams } from "react-router";
import { useBoardById } from "@/entities/board/api/use-boards";
import { BoardCanvas } from "@/widgets/board/ui/BoardCanvas";
import { BoardMenu } from "@/widgets/board/ui/BoardMenu";

export default function BoardPage() {
    const { id: boardId } = useParams<{ id: string }>();
    const { data: board, isLoading } = useBoardById(boardId || "");

    if (isLoading) {
        return <div className="p-8">Loading board...</div>;
    }

    if (!board || !boardId) {
        return <div className="p-8">Board not found</div>;
    }

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between bg-white/50 backdrop-blur-sm">
                <h1 className="text-xl font-bold">{board.title}</h1>
                <BoardMenu boardId={boardId} />
            </div>
            <BoardCanvas boardId={boardId} />
        </div>
    );
}
