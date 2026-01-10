import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import { Plus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import type { WorkspaceRole, PermissionDefinition } from "@/shared/types/workspace/type";

interface RoleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    role: WorkspaceRole | null;
    permissions: PermissionDefinition[];
    onSave: (roleData: any) => void;
    onCreatePermission: (action: string, description: string) => void;
}

export function RoleDialog({ open, onOpenChange, role, permissions, onSave, onCreatePermission }: RoleDialogProps) {
    const [roleName, setRoleName] = useState("");
    const [roleDescription, setRoleDescription] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    // Inline Permission Creation State
    const [isCreatingPermission, setIsCreatingPermission] = useState(false);
    const [newPermAction, setNewPermAction] = useState("");
    const [newPermDesc, setNewPermDesc] = useState("");

    useEffect(() => {
        if (role) {
            setRoleName(role.name);
            setRoleDescription(role.description);
            setSelectedPermissions(role.permissions);
        } else {
            setRoleName("");
            setRoleDescription("");
            setSelectedPermissions([]);
        }
        setIsCreatingPermission(false);
        setNewPermAction("");
        setNewPermDesc("");
    }, [role, open]);

    const handleSave = () => {
        onSave({
            id: role?.id,
            name: roleName,
            description: roleDescription,
            permissions: selectedPermissions,
        });
        onOpenChange(false);
    };

    const togglePermission = (permission: string) => {
        setSelectedPermissions(prev =>
            prev.includes(permission)
                ? prev.filter(p => p !== permission)
                : [...prev, permission]
        );
    };

    const handleCreatePermissionSubmit = () => {
        if (!newPermAction.trim() || !newPermDesc.trim()) return;
        onCreatePermission(newPermAction, newPermDesc);
        setNewPermAction("");
        setNewPermDesc("");
        setIsCreatingPermission(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{role ? 'Edit Role' : 'Create New Role'}</DialogTitle>
                    <DialogDescription>
                        Define the role name, description, and assigned permissions.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="role-name">Role Name</Label>
                        <Input
                            id="role-name"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder="e.g. Project Manager"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role-desc">Description</Label>
                        <Input
                            id="role-desc"
                            value={roleDescription}
                            onChange={(e) => setRoleDescription(e.target.value)}
                            placeholder="Brief description of the role"
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Permissions</Label>
                            {!isCreatingPermission ? (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-6 text-xs"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsCreatingPermission(true);
                                    }}
                                >
                                    <Plus className="w-3 h-3 mr-1" />
                                    New Permission
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 text-xs text-muted-foreground"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsCreatingPermission(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>

                        {isCreatingPermission && (
                            <div className="p-3 border rounded-md bg-muted/30 space-y-3 mb-3 animate-in fade-in slide-in-from-top-1">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label htmlFor="new-perm-action" className="text-xs">Action</Label>
                                        <Input
                                            id="new-perm-action"
                                            value={newPermAction}
                                            onChange={(e) => setNewPermAction(e.target.value)}
                                            placeholder="e.g. view:analytics"
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new-perm-desc" className="text-xs">Description</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="new-perm-desc"
                                                value={newPermDesc}
                                                onChange={(e) => setNewPermDesc(e.target.value)}
                                                placeholder="Validation description"
                                                className="h-8 text-xs"
                                            />
                                            <Button size="sm" className="h-8 w-8 px-0" onClick={handleCreatePermissionSubmit}>
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <ScrollArea className="h-[300px] border rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-4">
                                {permissions.map((perm) => (
                                    <div key={perm.id} className="flex items-start space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`perm-${perm.id}`}
                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            checked={selectedPermissions.includes(perm.action)}
                                            onChange={() => togglePermission(perm.action)}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <label
                                                htmlFor={`perm-${perm.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                            >
                                                {perm.action.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                            </label>
                                            <p className="text-[10px] text-muted-foreground">
                                                {perm.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save Role</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
