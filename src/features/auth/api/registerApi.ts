import { authApi } from "./auth-api"
import type { RegisterSchema } from "../model/types"

export async function register(data: RegisterSchema) {
    const response = await authApi.register(data)
    return response
}