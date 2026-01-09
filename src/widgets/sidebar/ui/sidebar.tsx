import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/shared/components/ui/sidebar"
import { mockUser, useCommonStore } from "@/shared/stores/commonStore";
import {
  Layout,
  Kanban,
} from 'lucide-react';
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { NavWorkspaces } from "./nav-workspaces";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { workspaces } = useCommonStore()
  const navMain = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Layout,
      isActive: true
    },
  ]
  const userData = mockUser ? {
    name: mockUser.fullname,
    email: mockUser.email,
    avatar: mockUser.avatarUrl
  } : {
    name: 'Guest',
    email: 'nhathuy2409@gmail.com',
    avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdienmaycholon.com%2Fkinh-nghiem-mua-sam%2Favatar-cute&psig=AOvVaw1G9v8zFL9xfy9V33sTLBxe&ust=1764321428093000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOiBodf_kZEDFQAAAAAdAAAAABAE'
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