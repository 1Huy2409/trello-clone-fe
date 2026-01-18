import { Button } from "@/shared/components/ui/button";
import { Tag, CheckSquare, UserPlus } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Input } from "@/shared/components/ui/input";
import { useState } from "react";
import { useCreateChecklist } from "@/entities/checklist/api/use-checklists";
// Actually CardQuickActions is inside CardSettingDialog which knows the card. 
// We should probably accept `cardId` as a prop or context.

interface CardQuickActionsProps {
    cardId: string;
}

export const CardQuickActions = ({ cardId }: CardQuickActionsProps) => {
    const [checklistName, setChecklistName] = useState("Checklist");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { mutate: createChecklist } = useCreateChecklist();

    const handleCreateChecklist = () => {
        if (!checklistName.trim()) return;
        createChecklist({ cardId, data: { name: checklistName } }, {
            onSuccess: () => {
                setIsPopoverOpen(false);
                setChecklistName("Checklist");
            }
        });
    };

    return (
        <div className="flex items-center gap-3 mb-6">
            <Button variant="outline" size="sm" className="h-9 px-3 text-sm font-medium rounded-md shadow-sm">
                <Tag className="h-4 w-4 mr-2" />
                Add tags
            </Button>

            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 px-3 text-sm font-medium rounded-md shadow-sm">
                        <CheckSquare className="h-4 w-4 mr-2" />
                        Add todo
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-80 p-3 pt-2">
                    <div className="space-y-3">
                        <div className="text-center text-sm font-semibold border-b pb-2">
                            Add checklist
                        </div>
                        <div className="space-y-1.5">
                            <h4 className="text-xs font-semibold text-muted-foreground">Title</h4>
                            <Input
                                value={checklistName}
                                onChange={(e) => setChecklistName(e.target.value)}
                                placeholder="Checklist"
                                autoFocus
                            />
                        </div>
                        <Button className="w-full" size="sm" onClick={handleCreateChecklist}>
                            Add
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            <Button variant="outline" size="sm" className="h-9 px-3 text-sm font-medium rounded-md shadow-sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add member
            </Button>
        </div>
    );
};
