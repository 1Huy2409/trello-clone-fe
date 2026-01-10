import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import type { Workspace, WorkspaceRole } from "@/shared/lib/types";
import { AlertTriangle, Plus, Save, Shield, MoreHorizontal, Pencil, Trash, Archive } from "lucide-react";
import { useState } from "react";
import { useCommonStore } from "@/shared/stores/commonStore";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { RoleDialog } from "@/features/workspace/ui/RoleDialog";

interface WorkspaceSettingsProps {
    workspace: Workspace;
}

export function WorkspaceSettings({ workspace }: WorkspaceSettingsProps) {
    const { workspaceRoles, permissions } = useCommonStore();
    const [title, setTitle] = useState(workspace.title);
    const [description, setDescription] = useState(workspace.description || "");
    const [isLoading, setIsLoading] = useState(false);

    // Role Management State
    const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<WorkspaceRole | null>(null);

    const allWorkspaceRoles = workspaceRoles.filter(r => r.workspaceId === workspace.id);

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log("Saved workspace settings:", { title, description });
        }, 1000);
    };

    const handleOpenRoleDialog = (role?: WorkspaceRole) => {
        setEditingRole(role || null);
        setIsRoleDialogOpen(true);
    };

    const handleCreatePermission = (action: string, description: string) => {
        console.log("Create Permission:", {
            action: action.toUpperCase().replace(/\s+/g, '_'),
            description: description,
            isSystem: false
        });
        // In a real app, you would call an action here
    };

    const handleSaveRole = (roleData: any) => {
        console.log("Save Role:", {
            ...roleData,
            workspaceId: workspace.id
        });
        setIsRoleDialogOpen(false);
    };

    const handleDeleteRole = (roleId: string) => {
        console.log("Delete Role:", roleId);
    };

    const handleArchive = () => {
        console.log("Archive Workspace option clicked");
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-medium">Workspace Settings: {workspace.title}</h2>
                <p className="text-sm text-muted-foreground">
                    Manage your workspace preferences and visibility.
                </p>
            </div>

            <Separator />

            {/* General Settings */}
            <div className="space-y-4">
                <div className="grid gap-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="workspace-name">
                        Workspace Name
                    </label>
                    <Input
                        id="workspace-name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="max-w-md"
                    />
                    <p className="text-xs text-muted-foreground">
                        This is the name of your company, team, or organization.
                    </p>
                </div>

                <div className="grid gap-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="workspace-desc">
                        Description (Optional)
                    </label>
                    <textarea
                        id="workspace-desc"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-md"
                    />
                    <p className="text-xs text-muted-foreground">
                        Get your members on board with a few words about your Workspace.
                    </p>
                </div>

                <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading && <span className="mr-2 animate-spin">⏳</span>}
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                </Button>
            </div>

            <Separator />

            {/* Role Management */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium">Roles & Permissions</h3>
                        <p className="text-sm text-muted-foreground">
                            Manage roles and their permissions within this workspace.
                        </p>
                    </div>
                    <Button onClick={() => handleOpenRoleDialog()} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Role
                    </Button>
                </div>

                <div className="border rounded-lg divide-y">
                    {allWorkspaceRoles.map((role) => (
                        <div key={role.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-primary/10 p-2 rounded-full">
                                    <Shield className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium flex items-center gap-2">
                                        {role.name}
                                        {role.isDefault && (
                                            <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded font-normal text-secondary-foreground">Default</span>
                                        )}
                                    </h4>
                                    <p className="text-sm text-muted-foreground mb-1">{role.description}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {role.permissions.map((p) => (
                                            <span key={p} className="text-[10px] border px-1.5 py-0.5 rounded text-muted-foreground bg-background">
                                                {p.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleOpenRoleDialog(role)}>
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit Role
                                    </DropdownMenuItem>
                                    {!role.isDefault && (
                                        <DropdownMenuItem
                                            className="text-destructive focus:text-destructive"
                                            onClick={() => handleDeleteRole(role.id)}
                                        >
                                            <Trash className="w-4 h-4 mr-2" />
                                            Delete Role
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))}
                    {allWorkspaceRoles.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                            No custom roles defined.
                        </div>
                    )}
                </div>
            </div>

            <RoleDialog
                open={isRoleDialogOpen}
                onOpenChange={setIsRoleDialogOpen}
                role={editingRole}
                permissions={permissions}
                onSave={handleSaveRole}
                onCreatePermission={handleCreatePermission}
            />

            <Separator />

            {/* Archive Workspace */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-medium">Archive Workspace</h3>
                    <p className="text-sm text-muted-foreground">
                        Archive this workspace to hide it from your dashboard. You can unarchive it anytime.
                    </p>
                </div>
                <Button variant="outline" onClick={handleArchive}>
                    <Archive className="w-4 h-4 mr-2" />
                    Archive Workspace
                </Button>
            </div>

            <Separator />

            <div className="border border-destructive/50 rounded-lg p-4 bg-destructive/5 space-y-4">
                <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    <h3 className="font-semibold">Danger Zone</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                    Deleting a workspace is permanent and cannot be undone. All boards and cards within this workspace will be deleted.
                </p>
                <Button variant="destructive">
                    Delete Workspace
                </Button>
            </div>
        </div>
    );
}
