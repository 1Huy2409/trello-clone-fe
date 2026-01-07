import { api } from "@/shared/api";

export const refreshAccessToken = async () => {
    return api.auth.refreshToken()
};
