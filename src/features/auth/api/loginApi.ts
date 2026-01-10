import { api } from "@/shared/api";

export async function login(username: string, password: string) {
    const data = await api.auth.login({ username, password })
    return data
}