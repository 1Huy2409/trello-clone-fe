import { Button } from "@/shared/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import {
    ArrowRight,
    Copy,
    Archive,
    Share2,
    Eye,
    LayoutTemplate,
    UserPlus
} from "lucide-react";

interface CardActionsMenuProps {
    children: React.ReactNode;
}

export const CardActionsMenu = ({ children }: CardActionsMenuProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            {/* 
                Wait, looking closely at Image 2. 
                The 3 dots button is in the HEADER of the dialog.
                The popover shows: Join, Move, Copy, Make Template, Watch, Share, Archive.
                So this is NOT a sidebar item, but a header menu.
            */}
            <PopoverContent align="end" className="w-[304px] p-0" sideOffset={8}>
                <div className="relative pt-3 pb-2 px-4 text-center border-b">
                    <span className="text-sm font-semibold text-muted-foreground">Actions</span>
                </div>
                <div className="p-2 space-y-1">
                    <Button variant="ghost" className="w-full justify-start h-8 text-sm font-normal">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join
                    </Button>
                    <Button variant="ghost" className="w-full justify-start h-8 text-sm font-normal">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Move
                    </Button>
                    <Button variant="ghost" className="w-full justify-start h-8 text-sm font-normal">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                    </Button>
                    <Button variant="ghost" className="w-full justify-start h-8 text-sm font-normal">
                        <LayoutTemplate className="h-4 w-4 mr-2" />
                        Make template
                    </Button>
                    <Button variant="ghost" className="w-full justify-start h-8 text-sm font-normal">
                        <Eye className="h-4 w-4 mr-2" />
                        Watch
                    </Button>
                    <div className="my-1 h-px bg-muted" />
                    <Button variant="ghost" className="w-full justify-start h-8 text-sm font-normal">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                    </Button>
                    <div className="my-1 h-px bg-muted" />
                    <Button variant="ghost" className="w-full justify-start h-8 text-sm font-normal">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
