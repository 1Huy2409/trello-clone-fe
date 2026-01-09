import { Button } from "@/shared/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import type { List } from "@/shared/lib/types";
import { ChevronLeft, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";

interface ListOptionsProps {
    list: List;
}

type ViewType = "main" | "move" | "copy" | "archive" | "sort";

export const ListOptions = ({ list }: ListOptionsProps) => {
    const [view, setView] = useState<ViewType>("main");
    const [open, setOpen] = useState(false);



    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            setTimeout(() => setView("main"), 300); // Reset view after closing animation
        }
    };

    const Header = ({ title, showBack = true }: { title: string; showBack?: boolean }) => (
        <div className="flex items-center justify-between mb-2 relative py-1 border-b pb-2">
            {showBack ? (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute left-0"
                    onClick={() => setView("main")}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            ) : null}
            <span className="text-sm font-semibold w-full text-center">
                {title}
            </span>
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 absolute right-0"
                onClick={() => setOpen(false)}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    );

    const MainView = () => (
        <div className="flex flex-col space-y-1">
            <Header title="List Actions" showBack={false} />
            <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm font-normal"
                onClick={() => alert("Add card clicked")}
            >
                Add card
            </Button>
            <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm font-normal"
                onClick={() => alert("Copy list clicked")}
            >
                Copy list
            </Button>
            <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm font-normal"
                onClick={() => setView("move")}
            >
                Move list
            </Button>
            <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm font-normal"
                onClick={() => alert("Archive list clicked")}
            >
                Archive list
            </Button>
        </div>
    );

    const MoveListView = () => (
        <div className="flex flex-col space-y-3">
            <Header title="Move List" />

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

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-transparent">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 px-2 py-2" align="start" side="bottom">
                {view === "main" && <MainView />}
                {view === "move" && <MoveListView />}
                {/* Other views can be added here */}
            </PopoverContent>
        </Popover>
    );
};
