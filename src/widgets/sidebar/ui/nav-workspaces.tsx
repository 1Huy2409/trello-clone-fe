import { Link, useLocation } from 'react-router';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/shared/components/ui/sidebar';
import type { Workspace } from '@/entities/workspace';
import { KanbanSquare, MoreHorizontal, Settings, Users } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface NavWorkspacesProps {
    workspaces: Workspace[];
}

export function NavWorkspaces({ workspaces }: NavWorkspacesProps) {
    const location = useLocation();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
            <SidebarMenu>
                {workspaces.map((workspace) => (
                    <SidebarMenuItem key={workspace.id}>
                        <SidebarMenuButton asChild isActive={location.pathname === `/workspace/${workspace.id}`}>
                            <Link to={`/workspace/${workspace.id}`}>
                                <KanbanSquare className="w-4 h-4" />
                                <span>{workspace.title}</span>
                            </Link>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction showOnHover>
                                    <MoreHorizontal className="w-4 h-4" />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48" side="bottom" align="end">
                                <DropdownMenuItem asChild>
                                    <Link to={`/workspace/${workspace.id}/members`}>
                                        <Users className="w-4 h-4 mr-2" />
                                        <span>Members</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to={`/workspace/${workspace.id}/settings`}>
                                        <Settings className="w-4 h-4 mr-2" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
