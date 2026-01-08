import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Separator } from "@/shared/components/ui/separator";
import { useLocation } from "react-router";
import { useMemo } from "react";

export default function Header() {
    const location = useLocation();

    const title = useMemo(() => {
        const path = location.pathname;

        if (path.startsWith('/workspace/')) {
            return 'Workspace';
        }

        if (path.startsWith('/board/')) {
            return 'Board';
        }

        return 'Dashboard';
    }, [location.pathname]);

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">{title}</h1>
        </header>
    )
}