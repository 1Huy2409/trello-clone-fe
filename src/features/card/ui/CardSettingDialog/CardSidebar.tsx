import { Button } from "@/shared/components/ui/button";
import { User, Tag, CheckSquare, Clock, Paperclip, ImageIcon, ArrowRight, Copy, LayoutTemplate, Archive, Share2 } from "lucide-react";

export const CardSidebar = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xs font-semibold text-muted-foreground mb-2">Add to card</h3>
                <div className="space-y-2">
                    <SidebarButton icon={<User className="h-4 w-4 mr-2" />} label="Members" />
                    <SidebarButton icon={<Tag className="h-4 w-4 mr-2" />} label="Labels" />
                    <SidebarButton icon={<CheckSquare className="h-4 w-4 mr-2" />} label="Checklist" />
                    <SidebarButton icon={<Clock className="h-4 w-4 mr-2" />} label="Dates" />
                    <SidebarButton icon={<Paperclip className="h-4 w-4 mr-2" />} label="Attachment" />
                    <SidebarButton icon={<ImageIcon className="h-4 w-4 mr-2" />} label="Cover" />
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground mb-2">Actions</h3>
                <div className="space-y-2">
                    <SidebarButton icon={<ArrowRight className="h-4 w-4 mr-2" />} label="Move" />
                    <SidebarButton icon={<Copy className="h-4 w-4 mr-2" />} label="Copy" />
                    <SidebarButton icon={<LayoutTemplate className="h-4 w-4 mr-2" />} label="Make template" />
                    <div className="my-1 h-px bg-muted" />
                    <SidebarButton icon={<Archive className="h-4 w-4 mr-2" />} label="Archive" />
                    <SidebarButton icon={<Share2 className="h-4 w-4 mr-2" />} label="Share" />
                </div>
            </div>
        </div>
    );
};

const SidebarButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <Button variant="secondary" className="w-full justify-start h-8 px-3 text-sm font-normal bg-secondary/50 hover:bg-secondary transition-colors">
        {icon} {label}
    </Button>
);
