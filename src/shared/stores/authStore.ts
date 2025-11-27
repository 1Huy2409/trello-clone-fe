import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    clearAccessToken: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,

            setAccessToken: (token) => set({ accessToken: token }),
            clearAccessToken: () => set({ accessToken: null }),

            logout: () => set({ accessToken: null }),
        }),
        {
            name: "accessToken",
            partialize: (state) => ({ accessToken: state.accessToken }),
        }
    )
);
