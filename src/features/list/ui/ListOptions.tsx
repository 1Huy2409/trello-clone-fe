import { Button } from "@/shared/components/ui/button";
import { useArchiveList } from "@/entities/list/api/use-lists";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover";
import type { List } from "@/entities/list";
import { MoreHorizontal, X } from "lucide-react";
import { useState } from "react";
import { CopyList } from "./CopyList";
import { MoveList } from "./MoveList";

interface ListOptionsProps {
    list: List;
    onAddCard?: () => void;
}

type ViewType = "main" | "move" | "copy" | "archive" | "sort";

export const ListOptions = ({ list, onAddCard }: ListOptionsProps) => {
    const [view, setView] = useState<ViewType>("main");
    const [open, setOpen] = useState(false);
    const { mutate: archiveList } = useArchiveList();

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            setTimeout(() => {
                setView("main");
            }, 300);
        }
    };

    const MainView = () => (
        <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between mb-2 relative py-1 border-b pb-2">
                <span className="text-sm font-semibold w-full text-center">
                    List Actions
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

            <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm font-normal"
                onClick={() => {
                    setOpen(false);
                    onAddCard?.();
                }}
            >
                Add card
            </Button>
            <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm font-normal"
                onClick={() => setView("copy")}
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
                onClick={() => {
                    archiveList(list.id);
                    setOpen(false);
                }}
            >
                Archive list
            </Button>
        </div>
    );

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer hover:bg-gray-200/50">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 px-2 py-2" align="start" side="bottom">
                {view === "main" && <MainView />}
                {view === "move" && <MoveList list={list} onBack={() => setView("main")} onClose={() => setOpen(false)} />}
                {view === "copy" && <CopyList listId={list.id} boardId={list.boardId} listTitle={list.title} onBack={() => setView("main")} onClose={() => setOpen(false)} />}
            </PopoverContent>
        </Popover>
    );
};
