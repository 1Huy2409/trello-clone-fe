import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import { useState } from "react";

interface PermissionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (action: string, description: string) => void;
}

export function PermissionDialog({ open, onOpenChange, onSave }: PermissionDialogProps) {
    const [newPermAction, setNewPermAction] = useState("");
    const [newPermDesc, setNewPermDesc] = useState("");

    const handleCreatePermission = () => {
        if (!newPermAction.trim() || !newPermDesc.trim()) return;

        onSave(newPermAction, newPermDesc);

        setNewPermAction("");
        setNewPermDesc("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Permission</DialogTitle>
                    <DialogDescription>Add a new permission that can be assigned to roles.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="perm-action">Permission Action</Label>
                        <Input
                            id="perm-action"
                            value={newPermAction}
                            onChange={(e) => setNewPermAction(e.target.value)}
                            placeholder="e.g. DELETE_BOARD"
                        />
                        <p className="text-[10px] text-muted-foreground">Unique identifier (uppercase snake_case recommended).</p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="perm-desc">Description</Label>
                        <Input
                            id="perm-desc"
                            value={newPermDesc}
                            onChange={(e) => setNewPermDesc(e.target.value)}
                            placeholder="What does this permission allow?"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleCreatePermission}>Create Permission</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
