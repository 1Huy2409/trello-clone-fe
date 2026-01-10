import { api } from "@/shared/api"

export async function uploadAvatar(file: File) {
    const formData = new FormData()
    formData.append("avatar", file)

    const response = await api.user.uploadAvatar(formData)
    return response.responseObject
}
