import { authApi } from "./auth-api";

export async function logout() {
    const data = await authApi.logout()
    return data
}
