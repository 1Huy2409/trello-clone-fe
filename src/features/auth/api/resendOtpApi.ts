import { api } from "@/shared/api"

export async function resendOTP(email: string) {
    const response = await api.auth.resendOTP({ email })
    return response
}
