import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/shared/components/ui/sidebar"
import { mockUser } from "@/shared/stores/commonStore";
import { 
  Layout,
  Kanban,
} from 'lucide-react';
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
export function AppSidebar() {
  const navMain = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Layout,
      isActive: true
    }
  ]
  const userData = mockUser ? {
    name: mockUser.username,
    email: mockUser.email,
    avatar: mockUser.avatarUrl
  } : {
    name: 'Guest',
    email: 'nhathuy2409@gmail.com',
    avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdienmaycholon.com%2Fkinh-nghiem-mua-sam%2Favatar-cute&psig=AOvVaw1G9v8zFL9xfy9V33sTLBxe&ust=1764321428093000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOiBodf_kZEDFQAAAAAdAAAAABAE'
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Kanban className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Trello</h1>
          </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}