
import { CheckSquare, Trash2, Plus, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { Input } from "@/shared/components/ui/input";
import { useState } from "react";
import type { Checklist } from "@/shared/types/checklist/type";
import { useChecklistItems, useCreateChecklistItem } from "@/entities/checklist/api/use-checklist-items";
import { useDeleteChecklist, useUpdateChecklist } from "@/entities/checklist/api/use-checklists";
import { CardChecklistItem } from "./CardChecklistItem";
import { toast } from "sonner";

interface CardChecklistProps {
    checklist: Checklist;
}

export const CardChecklist = ({ checklist }: CardChecklistProps) => {
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [newItemContent, setNewItemContent] = useState("");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState(checklist.name);

    const { data: items = [] } = useChecklistItems(checklist.id);
    const { mutate: createItem } = useCreateChecklistItem();
    const { mutate: deleteChecklist } = useDeleteChecklist();
    const { mutate: updateChecklist } = useUpdateChecklist();

    const progress = items.length > 0
        ? Math.round((items.filter(i => i.isCompleted).length / items.length) * 100)
        : 0;

    const handleAddItem = () => {
        if (!newItemContent.trim()) return;
        createItem({ checklistId: checklist.id, data: { content: newItemContent } }, {
            onSuccess: () => {
                setNewItemContent("");
                setIsAddingItem(true); // Keep adding mode open specifically for multiple entries? User "Image 1" has "Thêm một mục" which opens a textarea and buttons.
                // Usually standard behavior is to keep focus or reset.
                toast.success("Item added");
            },
            onError: () => toast.error("Failed to add item")
        });
    };

    const handleDeleteChecklist = () => {
        deleteChecklist(checklist.id, {
            onSuccess: () => toast.success("Checklist deleted"),
            onError: () => toast.error("Failed to delete checklist")
        });
    };

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
        if (title !== checklist.name) {
            updateChecklist({ checklistId: checklist.id, data: { name: title } }, {
                onError: () => setTitle(checklist.name)
            });
        }
    };

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                    <CheckSquare className="h-5 w-5 text-purple-500 mt-0.5" />
                    {isEditingTitle ? (
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleTitleBlur}
                            autoFocus
                            className="h-8 font-semibold text-base py-1 px-2"
                        />
                    ) : (
                        <h3
                            className="font-semibold text-base cursor-pointer hover:bg-muted/50 px-2 py-0.5 rounded -ml-2"
                            onClick={() => setIsEditingTitle(true)}
                        >
                            {checklist.name}
                        </h3>
                    )}
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDeleteChecklist}
                    className="bg-secondary/50 hover:bg-secondary/80 text-muted-foreground hover:text-foreground h-8"
                >
                    Delete
                </Button>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium w-8 text-right text-muted-foreground">{progress}%</span>
                <Progress value={progress} className="h-2 flex-1" />
            </div>

            <div className="space-y-1 mb-3">
                {items.map(item => (
                    <CardChecklistItem key={item.id} item={item} />
                ))}
            </div>

            {!isAddingItem ? (
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsAddingItem(true)}
                    className="ml-0 bg-secondary/50 hover:bg-secondary text-foreground"
                >
                    Add an item
                </Button>
            ) : (
                <div className="space-y-2">
                    <Input
                        value={newItemContent}
                        onChange={(e) => setNewItemContent(e.target.value)}
                        placeholder="Add an item"
                        className="bg-background"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                    />
                    <div className="flex items-center gap-2">
                        <Button size="sm" onClick={handleAddItem}>Add</Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsAddingItem(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
