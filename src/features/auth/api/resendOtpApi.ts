import { authApi } from "./auth-api"

export async function resendOTP(email: string) {
    const response = await authApi.resendOTP({ email })
    return response
}
