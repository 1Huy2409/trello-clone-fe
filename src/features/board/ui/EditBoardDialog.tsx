import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import type { Board } from '@/entities/board';
import { useUpdateBoard } from "@/entities/board/api/use-boards";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";


interface EditBoardDialogProps {
    board: Board | null;
    open: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function EditBoardDialog({ board, open, onOpenChange }: EditBoardDialogProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    // Update local state when board changes or dialog opens
    useEffect(() => {
        if (open && board) {
            setTitle(board.title);
            setDescription(board.description || '');
        }
    }, [open, board]);

    const { mutate: updateBoard, isPending: isUpdating } = useUpdateBoard();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !board) return;

        updateBoard({
            id: board.id,
            data: {
                title: title.trim(),
                description: description.trim(),
            }
        }, {
            onSuccess: () => {
                toast.success("Board updated successfully");
                onOpenChange && onOpenChange(false);
            },
            onError: (error) => {
                toast.error("Failed to update board");
                console.error("Update board error:", error);
            }
        });
    };

    const handleCancel = () => {
        onOpenChange && onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Board</DialogTitle>
                    <DialogDescription>
                        Update your board title and description.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-title">Board Title</Label>
                            <Input
                                id="edit-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter board title"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">Description (optional)</Label>
                            <Input
                                id="edit-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter board description"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!title.trim() || isUpdating}>
                            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
