import { useParams } from "react-router";
import { useCommonStore } from "@/shared/stores/commonStore";
import { BoardCanvas } from "@/widgets/board/ui/BoardCanvas";

export default function BoardPage() {
    const { id: boardId } = useParams<{ id: string }>();
    const { boards } = useCommonStore();
    const board = boards.find(b => b.id === boardId);

    if (!board || !boardId) {
        return <div className="p-8">Board not found</div>;
    }

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between bg-white/50 backdrop-blur-sm">
                <h1 className="text-xl font-bold">{board.title}</h1>
            </div>
            <BoardCanvas boardId={boardId} />
        </div>
    );
}
