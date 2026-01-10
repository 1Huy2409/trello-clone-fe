import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/shared/types/user/type";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    clearAccessToken: () => void;
    logout: () => void;
}

export const useSessionStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            user: null,

            setAccessToken: (token) => set({ accessToken: token }),
            setUser: (user) => set({ user }),
            clearAccessToken: () => set({ accessToken: null }),

            logout: () => set({ accessToken: null, user: null }),
        }),
        {
            name: "accessToken",
            partialize: (state) => ({ accessToken: state.accessToken }),
        }
    )
);
