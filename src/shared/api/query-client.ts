import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // Customize detailed config
            retry: 1, // Fail fast
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});
