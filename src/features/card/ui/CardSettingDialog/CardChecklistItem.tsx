
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Button } from "@/shared/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { ChecklistItem as ChecklistItemType } from "@/entities/checklist";
import { useUpdateChecklistItemContent, useUpdateChecklistItemStatus, useDeleteChecklistItem } from "@/entities/checklist/api/use-checklist-items";
import { toast } from "sonner";
import { Input } from "@/shared/components/ui/input";

interface CardChecklistItemProps {
    item: ChecklistItemType;
}

export const CardChecklistItem = ({ item }: CardChecklistItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(item.content);
    const inputRef = useRef<HTMLInputElement>(null);

    const { mutate: updateStatus } = useUpdateChecklistItemStatus();
    const { mutate: updateContent } = useUpdateChecklistItemContent();
    const { mutate: deleteItem } = useDeleteChecklistItem();

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleCheckedChange = (checked: boolean) => {
        updateStatus({ itemId: item.id, data: { isCompleted: checked } });
    };

    const handleContentBlur = () => {
        setIsEditing(false);
        if (content !== item.content) {
            updateContent({ itemId: item.id, data: { content } }, {
                onError: () => setContent(item.content)
            });
        }
    };

    const handleDelete = () => {
        deleteItem(item.id, {
            onSuccess: () => toast.success("Item deleted"),
            onError: () => toast.error("Failed to delete item")
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleContentBlur();
        }
    };

    return (
        <div className="group flex items-center gap-3 py-1.5 min-h-[32px] hover:bg-muted/50 rounded-md -mx-2 px-2 transition-colors">
            <Checkbox
                checked={item.isCompleted}
                onCheckedChange={handleCheckedChange}
                className="h-4 w-4 mt-0.5"
            />

            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <Input
                        ref={inputRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onBlur={handleContentBlur}
                        onKeyDown={handleKeyDown}
                        className="h-8 px-2 py-1 text-sm bg-background"
                    />
                ) : (
                    <div
                        onClick={() => setIsEditing(true)}
                        className={`text-sm cursor-text break-words ${item.isCompleted ? 'line-through text-muted-foreground' : ''}`}
                    >
                        {item.content}
                    </div>
                )}
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
                <Trash2 className="h-3.5 w-3.5" />
            </Button>
        </div>
    );
};
