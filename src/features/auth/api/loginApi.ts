import { authApi } from "./auth-api";

export async function login(username: string, password: string) {
    const data = await authApi.login({ username, password })
    return data
}