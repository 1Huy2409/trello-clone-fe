import { SidebarProvider, SidebarInset } from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/widgets/sidebar";
import { Header } from "@/widgets/header";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { PageLoader } from "@/shared/components/ui/page-loader";

export function AppLayout() {
  const location = useLocation();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <Suspense key={location.pathname} fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}