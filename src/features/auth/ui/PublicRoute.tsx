import { useSessionStore } from "@/entities/session";
import { Navigate, Outlet } from "react-router";
import { useEffect, useState, useRef } from "react";
import { getMe } from "../api/getMeApi";
import { PageLoader } from "@/shared/components/ui/page-loader";

export const PublicRoute = () => {
    const { accessToken, user, setUser, logout } = useSessionStore();
    const [isChecking, setIsChecking] = useState(!!accessToken && !user);
    const verifyingRef = useRef(false);

    useEffect(() => {
        const verifySession = async () => {
            if (accessToken && !user) {
                if (verifyingRef.current) return;
                verifyingRef.current = true;

                try {
                    const userData = await getMe();
                    setUser(userData);
                } catch (error) {
                    // console.error("Session verification failed in PublicRoute:", error);
                    logout();
                } finally {
                    setIsChecking(false);
                    verifyingRef.current = false;
                }
            } else {
                setIsChecking(false);
            }
        };

        verifySession();
    }, [accessToken, user, setUser, logout]);

    if (isChecking) {
        return <PageLoader />;
    }

    if (accessToken && user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
