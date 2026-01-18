import { authApi } from "@/features/auth/api/auth-api";

export const refreshAccessToken = async () => {
    return authApi.refreshToken()
};
