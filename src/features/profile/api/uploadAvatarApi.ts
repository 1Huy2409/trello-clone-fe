import { userApi } from "@/entities/user/api/user-api"

export async function uploadAvatar(file: File) {
    const formData = new FormData()
    formData.append("avatar", file)

    const response = await userApi.uploadAvatar(formData)
    return response.responseObject
}
