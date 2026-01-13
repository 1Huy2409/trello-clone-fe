import { useState } from 'react';
// import { useNavigate } from 'react-router';
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
import { useCreateBoard } from '@/entities/board/api/use-boards';

interface CreateBoardDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    workspaceId?: string | null;
}

export function CreateBoardDialog({ open, onOpenChange, workspaceId }: CreateBoardDialogProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { mutateAsync: createBoard, isPending } = useCreateBoard();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !workspaceId) return;

        try {
            await createBoard({
                workspaceId,
                data: {
                    title: title.trim(),
                    description: description.trim(),
                },
            });
            setTitle('');
            setDescription('');
            onOpenChange(false);
        } catch (error) {
            console.error('Failed to create board:', error);
            // Ideally add toast notification here
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Board</DialogTitle>
                    <DialogDescription>
                        Create a new board to organize your project tasks and collaborate with your team.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Board Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter board title"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description (optional)</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter board description"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!title.trim() || isPending}>
                            {isPending ? 'Creating...' : 'Create Board'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
