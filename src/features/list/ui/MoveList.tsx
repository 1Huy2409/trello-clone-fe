import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { ChevronLeft, X } from "lucide-react";
import type { List } from "@/entities/list";
import { useBoardById, useBoardsByWorkspace } from "@/entities/board/api/use-boards";
import { useListsByBoard, useMoveList } from "@/entities/list/api/use-lists";

interface MoveListProps {
    list: List;
    onBack: () => void;
    onClose: () => void;
}

export const MoveList = ({ list, onBack, onClose }: MoveListProps) => {
    const { data: currentBoard } = useBoardById(list.boardId);

    const { data: boards } = useBoardsByWorkspace(currentBoard?.workspaceId || "");

    const [selectedBoardId, setSelectedBoardId] = useState(list.boardId);
    const [selectedPosition, setSelectedPosition] = useState(list.position.toString());

    const { data: targetBoardLists } = useListsByBoard(selectedBoardId);

    const { mutate: moveList, isPending } = useMoveList();

    useEffect(() => {
        if (selectedBoardId !== list.boardId) {
            setSelectedPosition("1");
        } else {
            setSelectedPosition(list.position.toString());
        }
    }, [selectedBoardId, list.boardId, list.position]);


    const handleMove = () => {
        const lists = targetBoardLists || [];
        const isSameBoard = selectedBoardId === list.boardId;
        const currentPos = parseInt(list.position);
        const targetPos = parseInt(selectedPosition);

        let beforeListId: string | null = null;
        let afterListId: string | null = null;

        if (isSameBoard && targetPos === currentPos) {
            onClose();
            return;
        }

        const sortedLists = [...lists].sort((a, b) => Number(a.position) - Number(b.position));

        const otherLists = sortedLists.filter(l => l.id !== list.id);

        const index = targetPos - 1;

        if (index === 0) {
            beforeListId = null;
            afterListId = otherLists.length > 0 ? otherLists[0].id : null;
        } else if (index >= otherLists.length) {
            beforeListId = otherLists.length > 0 ? otherLists[otherLists.length - 1].id : null;
            afterListId = null;
        } else {
            beforeListId = otherLists[index - 1].id;
            afterListId = otherLists[index].id;
        }

        moveList({
            listId: list.id,
            targetBoardId: selectedBoardId,
            beforeListId,
            afterListId
        }, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    const availablePositions = () => {
        if (!targetBoardLists) return [];

        let count = targetBoardLists.length;
        if (selectedBoardId !== list.boardId) {
            count += 1;
        }

        return Array.from({ length: count }, (_, i) => i + 1);
    };

    return (
        <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between mb-2 relative py-1 border-b pb-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute left-0"
                    onClick={onBack}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-semibold w-full text-center">
                    Move List
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute right-0"
                    onClick={onClose}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Board</span>
                <Select value={selectedBoardId} onValueChange={setSelectedBoardId}>
                    <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select board" />
                    </SelectTrigger>
                    <SelectContent>
                        {boards?.map((board) => (
                            <SelectItem key={board.id} value={board.id}>
                                {board.title} {board.id === list.boardId && "(current)"}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Position</span>
                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                    <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                        {availablePositions().map((pos) => (
                            <SelectItem key={pos} value={pos.toString()}>
                                {pos} {selectedBoardId === list.boardId && pos.toString() === list.position && "(current)"}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Button className="w-full mt-2" onClick={handleMove} disabled={isPending}>
                Move
            </Button>
        </div>
    );
};
