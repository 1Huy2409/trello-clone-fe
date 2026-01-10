import { Button } from "@/shared/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { ChevronLeft, X } from "lucide-react";
import type { List } from "@/shared/lib/types";

interface MoveListProps {
    list: List;
    onBack: () => void;
    onClose: () => void;
}

export const MoveList = ({ list, onBack, onClose }: MoveListProps) => {
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
                <Select defaultValue="current">
                    <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select board" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="current">Current Board</SelectItem>
                        <SelectItem value="board2">Project Alpha</SelectItem>
                        <SelectItem value="board3">Personal Tasks</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Position</span>
                <Select defaultValue={list.position.toString()}>
                    <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3 (current)</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button className="w-full mt-2" onClick={() => alert("Move action triggered")}>
                Move
            </Button>
        </div>
    );
};
