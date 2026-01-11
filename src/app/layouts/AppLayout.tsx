import { SidebarProvider, SidebarInset } from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/widgets/sidebar";
import { Header } from "@/widgets/header";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { PageLoader } from "@/shared/components/ui/page-loader";
import { useSessionStore } from "@/entities/session";
import { getMe } from "@/features/auth/api/getMeApi";

export function AppLayout() {
  const location = useLocation();
  const { accessToken, user, setUser } = useSessionStore();

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken && !user) {
        try {
          const userData = await getMe();
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };
    fetchUser();
  }, [accessToken, user, setUser]);

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