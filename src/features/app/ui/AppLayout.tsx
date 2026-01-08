import { SidebarProvider, SidebarInset } from "@/shared/components/ui/sidebar";
import { AppSidebar } from "./SideBar";
import Header from "./Header";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { PageLoader } from "@/shared/components/ui/page-loader";

export function AppLayout() {
  const location = useLocation();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            <Suspense key={location.pathname} fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}