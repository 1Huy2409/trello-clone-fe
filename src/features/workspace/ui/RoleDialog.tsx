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
import { useState, useEffect } from "react";
import type { WorkspaceRole, PermissionDefinition } from "@/entities/workspace";

interface RoleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    role: WorkspaceRole | null;
    permissions: PermissionDefinition[];
    onSave: (roleData: any) => void;
}

import { toast } from "sonner";

export function RoleDialog({ open, onOpenChange, role, permissions, onSave }: RoleDialogProps) {
    const [roleName, setRoleName] = useState("");
    const [roleDescription, setRoleDescription] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    useEffect(() => {
        if (role) {
            setRoleName(role.name);
            setRoleDescription(role.description);
            setSelectedPermissions(role.permissions.map(p => p.action));
        } else {
            setRoleName("");
            setRoleDescription("");
            setSelectedPermissions([]);
        }
    }, [role, open]);

    const handleSave = () => {
        if (!roleName.trim()) {
            toast.error("Role name is required");
            return;
        }
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
                        </div>

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
