import { Button } from "@/shared/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { ArchivedItems } from "@/features/board/ui/ArchivedItems";

interface BoardMenuProps {
    boardId: string;
}

export const BoardMenu = ({ boardId }: BoardMenuProps) => {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState<"main" | "archived">("main");

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            setTimeout(() => setView("main"), 300);
        }
    };

    const MainView = () => (
        <div className="space-y-1">
            <div className="flex items-center justify-between mb-2 relative py-1 border-b pb-2">
                <span className="text-sm font-semibold w-full text-center">
                    Menu
                </span>
            </div>
            <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm font-normal"
                onClick={() => setView("archived")}
            >
                Archived items
            </Button>
            {/* Can add more menu items here like "Change background", "Filter", etc. */}
        </div>
    );

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 px-2 py-2" align="end" side="bottom">
                {view === "main" && <MainView />}
                {view === "archived" && (
                    <ArchivedItems
                        boardId={boardId}
                        onBack={() => setView("main")}
                        onClose={() => setOpen(false)}
                    />
                )}
            </PopoverContent>
        </Popover>
    );
};
