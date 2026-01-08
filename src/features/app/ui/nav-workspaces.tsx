import { Link, useLocation } from 'react-router';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/shared/components/ui/sidebar';
import type { Workspace } from '@/shared/lib/types';
import { KanbanSquare } from 'lucide-react';

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
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
