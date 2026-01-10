import { useSessionStore } from "@/entities/session";
import { Navigate, Outlet } from "react-router";

export const PublicRoute = () => {
    const accessToken = useSessionStore((state) => state.accessToken);

    if (accessToken) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
