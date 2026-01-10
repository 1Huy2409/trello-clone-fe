import { useSessionStore } from "@/entities/session";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
    const accessToken = useSessionStore((state) => state.accessToken);

    if (!accessToken) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};
