import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, X } from "lucide-react";

interface CopyListProps {
    listTitle: string;
    onBack: () => void;
    onClose: () => void;
}

export const CopyList = ({ listTitle, onBack, onClose }: CopyListProps) => {
    const [copyTitle, setCopyTitle] = useState(listTitle);

    const handleCopyList = () => {
        alert(copyTitle);
        onClose();
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
                    Copy List
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
                <span className="text-xs font-medium text-muted-foreground">Name</span>
                <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    value={copyTitle}
                    onChange={(e) => setCopyTitle(e.target.value)}
                />
            </div>
            <Button className="w-full mt-2" onClick={handleCopyList}>
                Create List
            </Button>
        </div>
    );
};
