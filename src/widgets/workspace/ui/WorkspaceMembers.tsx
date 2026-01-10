import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { useCommonStore } from "@/shared/stores/commonStore";
import { MoreHorizontal, Shield, User } from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface WorkspaceMembersProps {
    workspace: { id: string; title: string };
}

export function WorkspaceMembers({ workspace }: WorkspaceMembersProps) {
    const { workspaceMembers } = useCommonStore();
    const [searchQuery, setSearchQuery] = useState("");

    // Filter members for this workspace
    const members = workspaceMembers.filter(m => m.workspaceId === workspace.id);

    // Filter by search query
    const filteredMembers = members.filter(m =>
        m.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium">Workspace Members: {workspace.title}</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage who has access to this workspace.
                    </p>
                </div>
                <Button>Invite Member</Button>
            </div>

            <Separator />

            <div className="md:w-1/3">
                <Input
                    placeholder="Filter by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                    Workspace Members ({members.length})
                </h3>

                <div className="space-y-3">
                    {filteredMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={`https://github.com/shadcn.png`} />
                                    <AvatarFallback>{member.fullname.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium text-sm">{member.fullname}</p>
                                    <p className="text-xs text-muted-foreground">@{member.fullname.toLowerCase().replace(/\s/g, '')}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center text-sm text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                                    {member.roleName === 'owner' ? <Shield className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                                    <span className="capitalize">{member.roleName}</span>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="w-4 h-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Change Role...</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                                            Remove from Workspace
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}

                    {filteredMembers.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No members found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
