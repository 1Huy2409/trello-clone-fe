import { api } from "@/shared/api";

export async function logout() {
    const data = await api.auth.logout()
    return data
}
