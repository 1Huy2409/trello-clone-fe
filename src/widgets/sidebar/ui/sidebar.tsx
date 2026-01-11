import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/shared/components/ui/sidebar"
import { useCommonStore } from "@/shared/stores/commonStore";
import { useSessionStore } from "@/entities/session";
import {
  Layout,
  Kanban,
} from 'lucide-react';
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { NavWorkspaces } from "./nav-workspaces";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { workspaces } = useCommonStore()
  const user = useSessionStore((state) => state.user)

  const navMain = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Layout,
      isActive: true
    },
  ]

  const userData = user ? {
    name: user.fullname || "User",
    email: user.email,
    avatar: user.avatarUrl || "https://github.com/shadcn.png"
  } : {
    name: 'Guest',
    email: 'guest@example.com',
    avatar: 'https://github.com/shadcn.png'
  }
  const allWorkspaces = Object.values(workspaces)
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Kanban className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 group-data-[collapsible=icon]:hidden">Trello</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavWorkspaces workspaces={allWorkspaces} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}