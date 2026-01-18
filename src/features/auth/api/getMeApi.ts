import { userApi } from "@/entities/user/api/user-api"

export async function getMe() {
    const response = await userApi.getMe()
    return response.responseObject
}
