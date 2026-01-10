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
import type { Board } from '@/shared/lib/types';


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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // if (!title.trim() || !board) return;

        // updateBoard(board.id, {
        //     title: title.trim(),
        //     description: description.trim(),
        // });
        console.log('Submit edit board!')
        onOpenChange && onOpenChange(false);
    };

    const handleCancel = () => {
        // Reset form to original values
        // if (board) {
        //     setTitle(board.title);
        //     setDescription(board.description || '');
        // }
        console.log('Cancel edit board!')
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
                        <Button type="submit" disabled={!title.trim()}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
