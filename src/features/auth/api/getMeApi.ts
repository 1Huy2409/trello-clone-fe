import { api } from "@/shared/api"

export async function getMe() {
    const response = await api.user.getMe()
    return response.responseObject
}
