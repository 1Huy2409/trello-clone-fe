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
      <div className="flex h-screen bg-gray-50 w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-hidden">
              <Suspense key={location.pathname} fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}